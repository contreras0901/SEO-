import { db } from "@/lib/db";
import { requireVendor } from "@/lib/vendor-context";
import { Stat } from "@/components/ui";
import { completenessScore, isPriceHonest, rankScore } from "@/lib/ranking";
import { searchVendors } from "@/lib/queries";

export const metadata = { title: "Analytics", robots: { index: false } };

export default async function VendorAnalyticsPage() {
  const { vendor } = await requireVendor();
  const since = new Date(Date.now() - 30 * 86400_000);
  const [views, saves, inquiries30, credits, ranked] = await Promise.all([
    db.analyticsEvent.count({ where: { vendorId: vendor.id, name: "vendor_profile_view", createdAt: { gt: since } } }),
    db.savedVendor.count({ where: { vendorId: vendor.id } }),
    db.inquiry.count({ where: { vendorId: vendor.id, createdAt: { gt: since }, status: { not: "PENDING_VERIFICATION" } } }),
    db.realWeddingCredit.findMany({ where: { vendorId: vendor.id }, select: { id: true } }),
    searchVendors({ metro: vendor.metro.slug, category: vendor.category.slug }, 500),
  ]);
  const position = ranked.items.findIndex((v) => v.slug === vendor.slug);
  const score = rankScore({ ...vendor, credits });
  const responseRate = vendor.inquiryCount ? Math.round((vendor.replyCount / vendor.inquiryCount) * 100) : null;
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Profile views, 30 days" value={String(views)} hint="Tracked server-side on public profile loads" />
        <Stat label="Inquiries, 30 days" value={String(inquiries30)} />
        <Stat label="Saved by couples" value={String(saves)} />
        <Stat label="Position in category" value={position >= 0 ? `#${position + 1} of ${ranked.total}` : vendor.status === "LIVE" ? "Unranked" : "Not live"} hint="Sorted by the published ranking rules" />
      </div>
      <h2 className="text-lg font-semibold mt-8">Your ranking inputs</h2>
      <p className="text-[13px] text-ink-3">Plan is not an input. These are.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mt-3">
        <Stat label="Response rate (40%)" value={responseRate === null ? "No history" : `${responseRate}%`} hint={`${vendor.replyCount} of ${vendor.inquiryCount} replied`} />
        <Stat label="Quote-match (25%)" value={vendor.quoteMatchRate === null ? "Need 3 reports" : `${Math.round(vendor.quoteMatchRate * 100)}%`} hint={isPriceHonest(vendor) ? "Price-Honest earned" : "90%+ earns Price-Honest"} />
        <Stat label="Completeness (15%)" value={`${Math.round(completenessScore({ ...vendor, credits }) * 100)}%`} />
        <Stat label="Price freshness (10%)" value={vendor.priceConfirmedAt ? `${Math.round((Date.now() - vendor.priceConfirmedAt.getTime()) / 86400_000)}d ago` : "Never confirmed"} hint="Full credit within 90 days" />
        <Stat label="Real-wedding credits (10%)" value={String(credits.length)} hint="Full credit at 5" />
      </div>
      <p className="text-[13px] text-ink-3 mt-4 tnum">Composite score {score.toFixed(3)} · Median first reply {vendor.medianReplyHours === null ? "no history" : `${Math.round(vendor.medianReplyHours)}h`}</p>
    </div>
  );
}
