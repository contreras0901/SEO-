import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireVendor } from "@/lib/vendor-context";
import { replyToInquiry, unlockInquiry, closeInquiry } from "@/lib/actions/inquiries";
import { ActionForm, Field } from "@/components/ActionForm";
import { Notice, StatusChip, TrustMark } from "@/components/ui";
import { formatDate, money, relative } from "@/lib/format";
import { planCanReplyFree, UNLOCK_PRICE_USD } from "@/lib/plans";
import { isStripeConfigured } from "@/lib/stripe";

export const metadata = { title: "Inquiry", robots: { index: false } };

export default async function VendorInquiryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ unlocked?: string; error?: string }> }) {
  const { id } = await params;
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const inq = await db.inquiry.findUnique({ where: { id }, include: { couple: { include: { user: true } }, messages: { orderBy: { createdAt: "asc" } }, feedback: true } });
  if (!inq || inq.vendorId !== vendor.id || inq.status === "PENDING_VERIFICATION") notFound();
  const needs = JSON.parse(inq.needsJson || "{}") as Record<string, string>;
  const canSeeContact = planCanReplyFree(vendor.plan) || inq.status === "UNLOCKED" || inq.status === "REPLIED" || inq.status === "CLOSED";
  const c = inq.couple;
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div>
        {sp.unlocked ? <Notice kind="ok">Unlocked. Contact details are below; the fee is refunded automatically if the couple never replies within 7 days.</Notice> : null}
        {sp.error === "billing-not-configured" ? <Notice kind="bad">Payments are not configured on this deployment. An administrator can set your plan manually.</Notice> : null}
        <div className="flex items-center justify-between gap-3 mt-4">
          <h2 className="text-xl font-semibold">
            {c.partnerAName}
            {c.partnerAPronouns ? <span className="text-ink-3 font-normal text-[14px]"> ({c.partnerAPronouns})</span> : null} &amp; {c.partnerBName}
            {c.partnerBPronouns ? <span className="text-ink-3 font-normal text-[14px]"> ({c.partnerBPronouns})</span> : null}
          </h2>
          <StatusChip status={inq.status} />
        </div>
        <div className="flex gap-1 mt-2">
          <TrustMark kind="verified" />
          <span className="text-[12px] text-ink-3 self-center">Email and phone verified · sent {relative(inq.createdAt)}</span>
        </div>
        <div className="card p-4 mt-4 text-[14px]">
          <div className="font-semibold mb-2">The brief</div>
          <p className="whitespace-pre-line text-ink-2">{needs._brief}</p>
          <dl className="grid grid-cols-2 gap-2 mt-3 text-[13px]">
            <div>
              <dt className="text-ink-3">Date</dt>
              <dd>{formatDate(inq.eventDate)}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Venue</dt>
              <dd>{inq.venueName || "to be decided"}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Guests</dt>
              <dd>{inq.guestCount ?? "to be decided"}</dd>
            </div>
            <div>
              <dt className="text-ink-3">Budget band for you</dt>
              <dd className="tnum">
                {money(inq.budgetLow)}
                {inq.budgetHigh ? ` to ${money(inq.budgetHigh)}` : "+"}
              </dd>
            </div>
            {Object.entries(needs)
              .filter(([k, v]) => !k.startsWith("_") && v)
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="text-ink-3">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
          {inq.message ? <blockquote className="mt-3 border-l-2 border-line pl-3 text-ink-2 italic">&quot;{inq.message}&quot;</blockquote> : null}
        </div>
        <ul className="mt-4 space-y-3">
          {inq.messages.map((m) => (
            <li key={m.id} className={`card p-4 text-[14px] ${m.senderRole === "VENDOR" ? "ml-8" : "mr-8"}`}>
              <div className="text-[12px] text-ink-3 mb-1">
                {m.senderRole === "VENDOR" ? "You" : c.partnerAName} · {relative(m.createdAt)}
              </div>
              <p className="whitespace-pre-line">{m.body}</p>
            </li>
          ))}
        </ul>
        {canSeeContact && inq.status !== "CLOSED" ? (
          <div className="card p-4 mt-4">
            <ActionForm action={replyToInquiry} submitLabel={inq.firstReplyAt ? "Send message" : "Send first reply"}>
              <input type="hidden" name="inquiryId" value={inq.id} />
              <Field name="body" label="Your reply" hint="Response time is shown on your profile. Quotes inside your published range earn the Price-Honest mark.">
                <textarea id="body" name="body" className="input" rows={5} required />
              </Field>
            </ActionForm>
          </div>
        ) : null}
      </div>
      <aside className="space-y-4">
        <div className="card p-4 text-[14px]">
          <div className="font-semibold">Contact</div>
          {canSeeContact ? (
            <dl className="mt-2 space-y-1 text-ink-2">
              <div>{c.user.email}</div>
              <div>{c.user.phone ?? "No phone"}</div>
            </dl>
          ) : (
            <>
              <p className="text-ink-2 mt-2">Email and phone are revealed when you unlock. You have read the full brief above.</p>
              <p className="text-ink-2 mt-1 blur-sm select-none" aria-hidden="true">
                partner@example.com · +1 619 555 0100
              </p>
              <form action={unlockInquiry} className="mt-3">
                <input type="hidden" name="inquiryId" value={inq.id} />
                <button className="btn btn-primary w-full" type="submit" disabled={!isStripeConfigured()}>
                  Unlock for ${UNLOCK_PRICE_USD}
                </button>
              </form>
              {!isStripeConfigured() ? <p className="text-[12px] text-ink-3 mt-2">Payments not configured on this deployment.</p> : <p className="text-[12px] text-ink-3 mt-2">Refunded automatically if the couple does not reply within 7 days of your first reply.</p>}
              <Link href="/vendor/billing" className="btn btn-secondary w-full mt-2">
                Go Pro: unlimited replies
              </Link>
            </>
          )}
        </div>
        {inq.feedback ? (
          <div className="card p-4 text-[14px]">
            <div className="font-semibold">Quote feedback</div>
            <p className="text-ink-2 mt-1">The couple reported your quote {inq.feedback.matched ? "matched" : "did not match"} your published range.</p>
          </div>
        ) : null}
        {inq.status !== "CLOSED" ? (
          <form action={closeInquiry}>
            <input type="hidden" name="inquiryId" value={inq.id} />
            <button className="btn btn-ghost btn-sm" type="submit">
              Archive
            </button>
          </form>
        ) : null}
      </aside>
    </div>
  );
}
