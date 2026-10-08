import Link from "next/link";
import { db } from "@/lib/db";
import { requireVendor } from "@/lib/vendor-context";
import { Empty, Notice, StatusChip } from "@/components/ui";
import { PLANS } from "@/lib/plans";

export const metadata = { title: "Real weddings", robots: { index: false } };

export default async function VendorWeddingsPage({ searchParams }: { searchParams: Promise<{ submitted?: string }> }) {
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const [submitted, credited] = await Promise.all([
    db.realWedding.findMany({ where: { submittedByVendorId: vendor.id }, orderBy: { createdAt: "desc" }, include: { credits: { select: { id: true } } } }),
    db.realWeddingCredit.findMany({ where: { vendorId: vendor.id, realWedding: { submittedByVendorId: { not: vendor.id } } }, include: { realWedding: true } }),
  ]);
  const limit = PLANS[vendor.plan as keyof typeof PLANS]?.weddingSubmissionsPerYear ?? 3;
  const usedThisYear = submitted.filter((w) => w.createdAt > new Date(Date.now() - 365 * 86400_000)).length;
  return (
    <div>
      {sp.submitted ? <Notice kind="ok">Submitted. We review real weddings before publishing and email every credited vendor when it goes live.</Notice> : null}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <p className="text-[14px] text-ink-2 tnum">
          {usedThisYear} of {limit === null ? "unlimited" : limit} submissions used this year on the {PLANS[vendor.plan as keyof typeof PLANS]?.name ?? "Free"} plan.
        </p>
        <Link href="/vendor/weddings/new" className="btn btn-primary btn-sm">
          Submit a real wedding
        </Link>
      </div>
      <h2 className="text-lg font-semibold mt-6">Submitted by you</h2>
      {submitted.length === 0 ? (
        <div className="mt-3">
          <Empty title="No submissions yet" body="A published wedding links every vendor on the team back to a profile, which is the single best way to earn credited inquiries." />
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-line card">
          {submitted.map((w) => (
            <li key={w.id} className="p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{w.title}</div>
                <div className="text-[13px] text-ink-3">
                  {w.venueName} · {w.credits.length} credits
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusChip status={w.status} />
                {w.status === "PUBLISHED" ? (
                  <Link href={`/real-weddings/${w.slug}`} className="underline text-[13px]">
                    View
                  </Link>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      {credited.length ? (
        <>
          <h2 className="text-lg font-semibold mt-8">Weddings crediting you</h2>
          <ul className="mt-3 divide-y divide-line card">
            {credited.map((c) => (
              <li key={c.id} className="p-4 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{c.realWedding.title}</div>
                  <div className="text-[13px] text-ink-3">Credited as {c.role}</div>
                </div>
                <StatusChip status={c.realWedding.status} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
