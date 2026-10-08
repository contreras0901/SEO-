import Link from "next/link";
import { db } from "@/lib/db";
import { requireVendor } from "@/lib/vendor-context";
import { vendorGoLiveProblems } from "@/lib/validation";
import { submitForReview } from "@/lib/actions/vendor";
import { Empty, Notice, StatusChip } from "@/components/ui";
import { formatDate, money, relative } from "@/lib/format";
import { planCanReplyFree } from "@/lib/plans";

export const metadata = { title: "Vendor inquiries", robots: { index: false } };

export default async function VendorHome({ searchParams }: { searchParams: Promise<{ submitted?: string; incomplete?: string }> }) {
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const problems = vendorGoLiveProblems(vendor);
  const inquiries = await db.inquiry.findMany({ where: { vendorId: vendor.id, status: { not: "PENDING_VERIFICATION" } }, orderBy: { createdAt: "desc" }, include: { couple: true, messages: { orderBy: { createdAt: "desc" }, take: 1 } } });
  return (
    <div>
      {sp.submitted ? <Notice kind="ok">Submitted for review. We approve most profiles within two business days.</Notice> : null}
      {sp.incomplete ? <Notice kind="warn">Finish the checklist below before submitting.</Notice> : null}
      {vendor.status !== "LIVE" ? (
        <div className="card p-5 mt-4">
          <h2 className="text-lg font-semibold">Go-live checklist</h2>
          <p className="text-[13px] text-ink-3">Couples only see vendors with published prices and a signed pledge. That is the rule that makes their inquiries worth your time.</p>
          <ul className="mt-3 space-y-1 text-[14px]">
            {problems.length === 0 ? <li className="text-ok">Everything is in place.</li> : problems.map((p) => <li key={p}>• {p}</li>)}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/vendor/pricing" className="btn btn-secondary btn-sm">
              Prices
            </Link>
            <Link href="/vendor/profile" className="btn btn-secondary btn-sm">
              Profile and pledge
            </Link>
            {vendor.status === "DRAFT" && problems.length === 0 ? (
              <form action={submitForReview}>
                <input type="hidden" name="vendorId" value={vendor.id} />
                <button className="btn btn-primary btn-sm" type="submit">
                  Submit for review
                </button>
              </form>
            ) : null}
            {vendor.status === "PENDING" ? <span className="text-[13px] text-ink-2 self-center">In review.</span> : null}
          </div>
        </div>
      ) : null}
      <h2 className="text-xl font-semibold mt-6">Inquiries</h2>
      {!planCanReplyFree(vendor.plan) ? (
        <p className="text-[13px] text-ink-3 mt-1">
          You read every brief in full. Unlock contact details for $15, refunded if the couple never replies, or{" "}
          <Link href="/vendor/billing" className="underline">
            go Pro
          </Link>{" "}
          to reply without fees.
        </p>
      ) : null}
      {inquiries.length === 0 ? (
        <div className="mt-4">
          <Empty title="No inquiries yet" body={vendor.status === "LIVE" ? "Couples who match your published price band will find you in search. Submitting a real wedding adds credited links to your profile." : "Inquiries start once your profile is live."} />
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-line card">
          {inquiries.map((i) => (
            <li key={i.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Link href={`/vendor/inquiries/${i.id}`} className="font-semibold underline">
                  {i.couple.partnerAName} &amp; {i.couple.partnerBName}
                </Link>
                <div className="text-[13px] text-ink-2 tnum">
                  {formatDate(i.eventDate)} · {i.venueName || "venue TBD"} · {i.guestCount ?? "?"} guests · {money(i.budgetLow)}
                  {i.budgetHigh ? ` to ${money(i.budgetHigh)}` : "+"}
                </div>
                {i.messages[0] ? <div className="text-[12px] text-ink-3 truncate max-w-[480px]">{i.messages[0].body}</div> : null}
              </div>
              <div className="flex items-center gap-3 text-[13px] text-ink-3">
                <span>{relative(i.createdAt)}</span>
                <StatusChip status={i.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
