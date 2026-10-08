import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { replyToInquiry, closeInquiry } from "@/lib/actions/inquiries";
import { submitQuoteFeedback, submitReview } from "@/lib/actions/couple";
import { ActionForm, Field } from "@/components/ActionForm";
import { Notice, StatusChip } from "@/components/ui";
import { formatDate, money, relative } from "@/lib/format";

export const metadata = { title: "Inquiry", robots: { index: false } };

export default async function CoupleInquiryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ sent?: string }> }) {
  const { id } = await params;
  const { sent } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect("/start");
  const inq = await db.inquiry.findUnique({ where: { id }, include: { vendor: { include: { category: true } }, messages: { orderBy: { createdAt: "asc" } }, feedback: true } });
  if (!inq || inq.coupleId !== couple.id) notFound();
  const needs = JSON.parse(inq.needsJson || "{}") as Record<string, string>;
  const existingReview = await db.review.findUnique({ where: { vendorId_coupleId: { vendorId: inq.vendorId, coupleId: couple.id } } });
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div>
        {sent ? <Notice kind="ok">Inquiry delivered. {inq.vendor.name} was notified by email.</Notice> : null}
        {inq.status === "PENDING_VERIFICATION" ? (
          <Notice kind="warn">
            This inquiry is held until you{" "}
            <Link href={`/dashboard/verify?next=/dashboard/inquiries/${inq.id}`} className="underline">
              verify your email and phone
            </Link>
            . Vendors only see verified inquiries.
          </Notice>
        ) : null}
        <div className="flex items-center justify-between gap-3 mt-4">
          <h2 className="text-xl font-semibold">
            <Link href={`/vendors/${inq.vendor.slug}`} className="underline">
              {inq.vendor.name}
            </Link>
          </h2>
          <StatusChip status={inq.status} />
        </div>
        <p className="text-[13px] text-ink-3 mt-1 tnum">
          Published starting price {money(inq.vendor.startingPrice)} · your budget band {money(inq.budgetLow)}{inq.budgetHigh ? ` to ${money(inq.budgetHigh)}` : "+"}
        </p>
        <div className="card p-4 mt-4 text-[14px]">
          <div className="font-semibold mb-2">Your brief</div>
          <p className="whitespace-pre-line text-ink-2">{needs._brief}</p>
        </div>
        <ul className="mt-4 space-y-3">
          {inq.messages.map((m) => (
            <li key={m.id} className={`card p-4 text-[14px] ${m.senderRole === "COUPLE" ? "ml-8" : "mr-8"}`}>
              <div className="text-[12px] text-ink-3 mb-1">
                {m.senderRole === "COUPLE" ? "You" : inq.vendor.name} · {relative(m.createdAt)}
              </div>
              <p className="whitespace-pre-line">{m.body}</p>
            </li>
          ))}
        </ul>
        {inq.status !== "CLOSED" && inq.status !== "PENDING_VERIFICATION" ? (
          <div className="card p-4 mt-4">
            <ActionForm action={replyToInquiry} submitLabel="Send message">
              <input type="hidden" name="inquiryId" value={inq.id} />
              <Field name="body" label="Message to the vendor">
                <textarea id="body" name="body" className="input" rows={3} required />
              </Field>
            </ActionForm>
          </div>
        ) : null}
      </div>
      <aside className="space-y-4">
        <div className="card p-4 text-[14px]">
          <div className="font-semibold">Details sent</div>
          <dl className="mt-2 space-y-1 text-ink-2">
            <div>Date: {formatDate(inq.eventDate)}</div>
            <div>Venue: {inq.venueName || "to be decided"}</div>
            <div>Guests: {inq.guestCount ?? "to be decided"}</div>
            {Object.entries(needs)
              .filter(([k, v]) => !k.startsWith("_") && v)
              .map(([k, v]) => (
                <div key={k}>
                  {k}: {v}
                </div>
              ))}
          </dl>
        </div>
        {inq.firstReplyAt ? (
          <div className="card p-4 text-[14px]">
            <div className="font-semibold">Did the quote match their published range?</div>
            <p className="text-[12px] text-ink-3 mt-1">Your answer feeds the vendor&apos;s Price-Honest signal. Nothing else about you is shared.</p>
            {inq.feedback ? (
              <p className="mt-2">You answered: {inq.feedback.matched ? "Yes, it matched." : "No, it did not."}</p>
            ) : (
              <div className="mt-3">
                <ActionForm action={submitQuoteFeedback} submitLabel="Submit" submitVariant="secondary">
                  <input type="hidden" name="inquiryId" value={inq.id} />
                  <Field name="matched" label="Answer">
                    <select id="matched" name="matched" className="input" defaultValue="yes">
                      <option value="yes">Yes, within range</option>
                      <option value="no">No, outside range</option>
                    </select>
                  </Field>
                  <Field name="quotedPrice" label="Quoted price (optional)">
                    <input id="quotedPrice" name="quotedPrice" type="number" min={0} className="input" />
                  </Field>
                </ActionForm>
              </div>
            )}
          </div>
        ) : null}
        {inq.firstReplyAt ? (
          <div className="card p-4 text-[14px]">
            <div className="font-semibold">{existingReview ? "Edit your review" : "Leave a review"}</div>
            <div className="mt-3">
              <ActionForm action={submitReview} submitLabel={existingReview ? "Update review" : "Publish review"} submitVariant="secondary">
                <input type="hidden" name="vendorSlug" value={inq.vendor.slug} />
                <Field name="rating" label="Rating">
                  <select id="rating" name="rating" className="input" defaultValue={existingReview?.rating ?? 5}>
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} / 5
                      </option>
                    ))}
                  </select>
                </Field>
                <Field name="body" label="Review" hint="At least 20 characters">
                  <textarea id="body" name="body" className="input" rows={3} defaultValue={existingReview?.body ?? ""} />
                </Field>
              </ActionForm>
            </div>
          </div>
        ) : null}
        {inq.status !== "CLOSED" ? (
          <form action={closeInquiry}>
            <input type="hidden" name="inquiryId" value={inq.id} />
            <button className="btn btn-ghost btn-sm" type="submit">
              Close this inquiry
            </button>
          </form>
        ) : null}
      </aside>
    </div>
  );
}
