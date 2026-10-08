import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { appUrl } from "@/lib/stripe";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [metros, cats, vendors, weddings] = await Promise.all([
    db.metro.findMany({ where: { isActive: true } }),
    db.category.findMany(),
    db.vendor.findMany({ where: { status: "LIVE" }, select: { slug: true, updatedAt: true } }),
    db.realWedding.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);
  const staticPages = ["/", "/vendors", "/real-weddings", "/price-guides", "/for-vendors", "/for-vendors/pricing", "/pledge", "/trust", "/about"].map((p) => ({ url: appUrl(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 }));
  const cityCat = metros.flatMap((m) => cats.flatMap((c) => [
    { url: appUrl(`/${m.slug}/${c.slug}`), changeFrequency: "daily" as const, priority: 0.9 },
    { url: appUrl(`/price-guides/${m.slug}/${c.slug}`), changeFrequency: "weekly" as const, priority: 0.8 },
  ]));
  return [
    ...staticPages,
    ...cityCat,
    ...vendors.map((v) => ({ url: appUrl(`/vendors/${v.slug}`), lastModified: v.updatedAt, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...weddings.map((w) => ({ url: appUrl(`/real-weddings/${w.slug}`), lastModified: w.updatedAt, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
