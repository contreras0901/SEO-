import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { createInquiry } from "@/lib/actions/inquiries";
import { ActionForm, Field } from "@/components/ActionForm";
import { BUDGET_BANDS } from "@/lib/validation";
import { money, priceUnitLabel } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "Send a verified inquiry", robots: { index: false } };

export default async function InquirePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = await db.vendor.findUnique({ where: { slug }, include: { category: true, metro: true } });
  if (!v || v.status !== "LIVE") notFound();
  const user = await getCurrentUser();
  if (!user) redirect(`/sign-up?next=/inquire/${slug}`);
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect(`/start?next=/inquire/${slug}`);
  const questions = JSON.parse(v.category.questionsJson || "[]") as { key: string; label: string; placeholder?: string }[];
  // Suggest the band that contains the vendor's starting price.
  const suggested = BUDGET_BANDS.findIndex((b) => v.startingPrice !== null && v.startingPrice >= b.low && (b.high === null || v.startingPrice < b.high));
  return (
    <div className="container-x py-8 max-w-3xl">
      <Breadcrumbs items={[{ label: v.category.name, href: `/${v.metro.slug}/${v.category.slug}` }, { label: v.name, href: `/vendors/${v.slug}` }, { label: "Inquiry" }]} />
      <h1 className="text-3xl font-semibold">Inquiry to {v.name}</h1>
      <p className="text-ink-2 mt-2 tnum">
        Their published starting price is <span className="price">{money(v.startingPrice)}</span> {priceUnitLabel(v.category.priceUnit)}
        {v.typicalLow && v.typicalHigh ? `, typical ${money(v.typicalLow)} to ${money(v.typicalHigh)}` : ""}. Your inquiry is delivered with your verified email and phone, so every vendor knows it is real.
      </p>
      <div className="card p-6 mt-6">
        <ActionForm action={createInquiry} submitLabel="Send verified inquiry">
          <input type="hidden" name="vendorSlug" value={v.slug} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="eventDate" label="Wedding date" hint="Leave blank if undecided">
              <input id="eventDate" name="eventDate" type="date" className="input" defaultValue={couple.weddingDate ? couple.weddingDate.toISOString().slice(0, 10) : ""} />
            </Field>
            <Field name="guestCount" label="Guest count">
              <input id="guestCount" name="guestCount" type="number" min={1} className="input" defaultValue={couple.guestCount ?? ""} />
            </Field>
            <Field name="venueName" label="Venue (or city if undecided)">
              <input id="venueName" name="venueName" className="input" placeholder={`e.g. a hotel in ${v.metro.name}`} />
            </Field>
            <Field name="budgetBand" label={`Budget for ${v.category.name.toLowerCase()}`} required>
              <select id="budgetBand" name="budgetBand" className="input" defaultValue={suggested >= 0 ? suggested : ""}>
                {BUDGET_BANDS.map((b, i) => (
                  <option key={b.label} value={i}>
                    {b.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          {questions.length ? (
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="text-[14px] font-semibold mb-2">What you need</legend>
              {questions.map((q) => (
                <Field key={q.key} name={`need_${q.key}`} label={q.label}>
                  <input id={`need_${q.key}`} name={`need_${q.key}`} className="input" placeholder={q.placeholder} maxLength={200} />
                </Field>
              ))}
            </fieldset>
          ) : null}
          <Field name="message" label="Anything else, in your words" hint="Optional, up to 600 characters. Shown to the vendor as a direct quote.">
            <textarea id="message" name="message" className="input" rows={4} maxLength={600} />
          </Field>
          {!user.phoneVerifiedAt ? (
            <Field name="phone" label="Mobile number" hint="Used once for a verification code and shared only with vendors you contact." required>
              <input id="phone" name="phone" type="tel" className="input" defaultValue={user.phone ?? ""} placeholder="+1 619 555 0100" />
            </Field>
          ) : null}
          <p className="text-[12px] text-ink-3">
            By sending, you agree to the{" "}
            <Link href="/legal/terms" className="underline">
              terms
            </Link>{" "}
            and to receive replies by email and SMS about this inquiry.
          </p>
        </ActionForm>
      </div>
    </div>
  );
}
