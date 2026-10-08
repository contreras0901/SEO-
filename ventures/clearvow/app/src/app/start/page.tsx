import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { completeCoupleOnboarding } from "@/lib/actions/couple";
import { ActionForm, Field } from "@/components/ActionForm";
import { PRONOUN_OPTIONS } from "@/lib/validation";
import { listMetros } from "@/lib/queries";

export const metadata: Metadata = { title: "Start planning", robots: { index: false } };

export default async function StartPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect(`/sign-up?next=${encodeURIComponent(next ? `/start?next=${next}` : "/start")}`);
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (couple && next && next.startsWith("/")) redirect(next);
  const metros = await listMetros();
  return (
    <div className="container-x py-12 max-w-2xl">
      <h1 className="text-3xl font-semibold">{couple ? "Update your wedding" : "Tell us about your wedding"}</h1>
      <p className="text-ink-2 mt-2 text-[14px]">Two partners, no assumptions. Pronouns are optional and are shared with vendors so nobody has to guess.</p>
      <div className="card p-6 mt-6">
        <ActionForm action={completeCoupleOnboarding} submitLabel={couple ? "Save" : "Continue"}>
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="partnerAName" label="Partner one, first name" required>
              <input id="partnerAName" name="partnerAName" className="input" defaultValue={couple?.partnerAName ?? ""} required />
            </Field>
            <Field name="partnerAPronouns" label="Pronouns (optional)">
              <select id="partnerAPronouns" name="partnerAPronouns" className="input" defaultValue={couple?.partnerAPronouns ?? ""}>
                {PRONOUN_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p || "Prefer not to say"}
                  </option>
                ))}
              </select>
            </Field>
            <Field name="partnerBName" label="Partner two, first name" required>
              <input id="partnerBName" name="partnerBName" className="input" defaultValue={couple?.partnerBName ?? ""} required />
            </Field>
            <Field name="partnerBPronouns" label="Pronouns (optional)">
              <select id="partnerBPronouns" name="partnerBPronouns" className="input" defaultValue={couple?.partnerBPronouns ?? ""}>
                {PRONOUN_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p || "Prefer not to say"}
                  </option>
                ))}
              </select>
            </Field>
            <Field name="metroSlug" label="Where is the wedding?" required>
              <select id="metroSlug" name="metroSlug" className="input" defaultValue={metros[0]?.slug}>
                {metros.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}, {m.state}
                  </option>
                ))}
              </select>
            </Field>
            <Field name="weddingDate" label="Date (optional)">
              <input id="weddingDate" name="weddingDate" type="date" className="input" defaultValue={couple?.weddingDate ? couple.weddingDate.toISOString().slice(0, 10) : ""} />
            </Field>
            <Field name="guestCount" label="Estimated guests">
              <input id="guestCount" name="guestCount" type="number" min={1} className="input" defaultValue={couple?.guestCount ?? ""} />
            </Field>
            <Field name="budgetTotal" label="Total budget (USD)" hint="We suggest a split by category you can edit anytime">
              <input id="budgetTotal" name="budgetTotal" type="number" min={500} step={500} className="input" defaultValue={couple?.budgetTotal ?? ""} />
            </Field>
          </div>
        </ActionForm>
      </div>
    </div>
  );
}
