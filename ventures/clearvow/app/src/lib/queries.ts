import "server-only";
import { db } from "./db";
import { rankScore } from "./ranking";
import { BUDGET_BANDS } from "./validation";
import type { VendorCardData } from "@/components/VendorCard";

export const vendorCardInclude = {
  category: { select: { name: true, singular: true, priceUnit: true, slug: true } },
  metro: { select: { name: true, slug: true } },
  images: { orderBy: { sortOrder: "asc" as const }, take: 1, select: { url: true, alt: true } },
  packages: { select: { id: true } },
  credits: { select: { id: true } },
} as const;

export type SearchParams = {
  metro?: string;
  category?: string;
  budget?: string; // index into BUDGET_BANDS
  pledge?: string; // "1"
  month?: string; // not used for availability yet; reserved
  q?: string;
  page?: string;
};

export async function searchVendors(params: SearchParams, pageSize = 24): Promise<{ items: VendorCardData[]; total: number; page: number; pages: number }> {
  const page = Math.max(1, Number(params.page || 1));
  const where: Record<string, unknown> = { status: "LIVE", startingPrice: { not: null } };
  if (params.metro) where.metro = { slug: params.metro };
  if (params.category) where.category = { slug: params.category };
  if (params.pledge === "1") where.pledgeSignedAt = { not: null };
  if (params.budget !== undefined && params.budget !== "") {
    const band = BUDGET_BANDS[Number(params.budget)];
    if (band) {
      // Vendor fits the band if their starting price is within the band's high.
      where.startingPrice = band.high ? { lte: band.high, not: null } : { gte: band.low };
    }
  }
  if (params.q) where.OR = [{ name: { contains: params.q } }, { tagline: { contains: params.q } }, { styleTags: { contains: params.q } }];

  const all = await db.vendor.findMany({ where, include: vendorCardInclude });

  // Spotlight slots first (sponsored, labeled), then ranking score.
  const now = new Date();
  const spot = await db.spotlightSlot.findMany({ where: { startsAt: { lte: now }, endsAt: { gte: now } }, select: { vendorId: true, categoryId: true, metroId: true } });
  const spotIds = new Set(spot.map((s) => s.vendorId));
  const scored = all.map((v) => ({ v, score: rankScore(v, now), sponsored: spotIds.has(v.id) && !v.isHouseVendor }));
  scored.sort((a, b) => Number(b.sponsored) - Number(a.sponsored) || b.score - a.score || a.v.name.localeCompare(b.v.name));
  const total = scored.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const items = scored.slice((page - 1) * pageSize, page * pageSize).map(({ v, sponsored }) => ({ ...v, sponsored }));
  return { items, total, page, pages };
}

export async function getMetro(slug: string) {
  return db.metro.findUnique({ where: { slug } });
}

export async function getCategory(slug: string) {
  return db.category.findUnique({ where: { slug } });
}

export async function listCategories() {
  return db.category.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function listMetros() {
  return db.metro.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
}

export async function platformStats() {
  const [liveVendors, deliveredInquiries, replied, pledged] = await Promise.all([
    db.vendor.count({ where: { status: "LIVE" } }),
    db.inquiry.count({ where: { status: { in: ["DELIVERED", "UNLOCKED", "REPLIED", "CLOSED"] } } }),
    db.inquiry.findMany({ where: { firstReplyAt: { not: null } }, select: { createdAt: true, firstReplyAt: true }, take: 500, orderBy: { createdAt: "desc" } }),
    db.vendor.count({ where: { status: "LIVE", pledgeSignedAt: { not: null } } }),
  ]);
  const hours = replied.map((r) => (r.firstReplyAt!.getTime() - r.createdAt.getTime()) / 3600_000).sort((a, b) => a - b);
  const medianReplyHours = hours.length ? hours[Math.floor(hours.length / 2)] : null;
  return { liveVendors, deliveredInquiries, medianReplyHours, pledged };
}
