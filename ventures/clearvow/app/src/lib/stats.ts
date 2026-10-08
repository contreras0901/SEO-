import "server-only";
import { db } from "./db";
import { median } from "./format";

/** Recompute a vendor's cached accountability stats from inquiries and feedback. */
export async function recomputeVendorStats(vendorId: string): Promise<void> {
  const inquiries = await db.inquiry.findMany({
    where: { vendorId },
    select: { createdAt: true, firstReplyAt: true, feedback: { select: { matched: true } } },
  });
  const inquiryCount = inquiries.length;
  const replied = inquiries.filter((i) => i.firstReplyAt);
  const replyHours = replied.map((i) => (i.firstReplyAt!.getTime() - i.createdAt.getTime()) / 3600_000);
  const fb = inquiries.map((i) => i.feedback).filter((f): f is { matched: boolean } => Boolean(f));
  const quoteMatchRate = fb.length >= 3 ? fb.filter((f) => f.matched).length / fb.length : null;
  await db.vendor.update({
    where: { id: vendorId },
    data: {
      inquiryCount,
      replyCount: replied.length,
      medianReplyHours: median(replyHours.map((h) => Math.round(h * 10) / 10)),
      quoteMatchRate,
    },
  });
}

export async function metroCategoryPriceStats(metroId: string, categoryId: string) {
  const vendors = await db.vendor.findMany({
    where: { metroId, categoryId, status: "LIVE", startingPrice: { not: null } },
    select: { startingPrice: true, typicalLow: true, typicalHigh: true },
  });
  const starts = vendors.map((v) => v.startingPrice as number);
  const lows = vendors.map((v) => v.typicalLow).filter((n): n is number => n !== null);
  const highs = vendors.map((v) => v.typicalHigh).filter((n): n is number => n !== null);
  return {
    count: vendors.length,
    medianStart: median(starts),
    medianLow: median(lows),
    medianHigh: median(highs),
    minStart: starts.length ? Math.min(...starts) : null,
    maxStart: starts.length ? Math.max(...starts) : null,
    starts,
  };
}
