import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { claimOrCreateVendor } from "@/lib/actions/vendor";
import { ActionForm, Field } from "@/components/ActionForm";
import { listCategories, listMetros } from "@/lib/queries";

export const metadata: Metadata = { title: "Claim your vendor profile", robots: { index: false } };

export default async function ClaimPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-up?role=VENDOR&next=/claim");
  const existing = await db.vendor.findFirst({ where: { ownerId: user.id } });
  if (existing) redirect("/vendor");
  const [cats, metros] = await Promise.all([listCategories(), listMetros()]);
  const matches = q ? await db.vendor.findMany({ where: { isClaimed: false, name: { contains: q } }, include: { category: true, metro: true, credits: { select: { id: true } } }, take: 10 }) : [];
  return (
    <div className="container-x py-10 max-w-2xl">
      <h1 className="text-3xl font-semibold">Claim or create your profile</h1>
      <p className="text-ink-2 mt-2 text-[14px]">If a real wedding already credited your business, an unclaimed profile is waiting. Search for it first.</p>
      <form method="get" className="mt-4 flex gap-2">
        <label className="sr-only" htmlFor="q">
          Business name
        </label>
        <input id="q" name="q" className="input" placeholder="Your business name" defaultValue={q ?? ""} />
        <button className="btn btn-secondary" type="submit">
          Search
        </button>
      </form>
      {q ? (
        <ul className="mt-4 space-y-2">
          {matches.length === 0 ? <li className="text-[14px] text-ink-2">No unclaimed profile matches &quot;{q}&quot;. Create one below.</li> : null}
          {matches.map((m) => (
            <li key={m.id} className="card p-4 flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{m.name}</div>
                <div className="text-[13px] text-ink-3">
                  {m.category.singular} · {m.metro.name} · credited on {m.credits.length} {m.credits.length === 1 ? "wedding" : "weddings"}
                </div>
              </div>
              <ActionForm action={claimOrCreateVendor} submitLabel="This is my business" submitVariant="primary">
                <input type="hidden" name="claimId" value={m.id} />
              </ActionForm>
            </li>
          ))}
        </ul>
      ) : null}
      <h2 className="text-xl font-semibold mt-10">Create a new profile</h2>
      <div className="card p-6 mt-3">
        <ActionForm action={claimOrCreateVendor} submitLabel="Create profile and set prices">
          <Field name="name" label="Business name" required>
            <input id="name" name="name" className="input" required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="categorySlug" label="Category" required>
              <select id="categorySlug" name="categorySlug" className="input">
                {cats.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field name="metroSlug" label="Home city" required>
              <select id="metroSlug" name="metroSlug" className="input">
                {metros.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}, {m.state}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field name="tagline" label="One-line tagline">
            <input id="tagline" name="tagline" className="input" maxLength={120} />
          </Field>
          <Field name="description" label="About your work" hint="At least 80 characters before you can go live">
            <textarea id="description" name="description" className="input" rows={4} maxLength={3000} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="website" label="Website">
              <input id="website" name="website" className="input" placeholder="https://" />
            </Field>
            <Field name="instagram" label="Instagram handle">
              <input id="instagram" name="instagram" className="input" placeholder="@" />
            </Field>
          </div>
          <Field name="styleTags" label="Style tags" hint="Comma separated, e.g. documentary, garden, bilingual">
            <input id="styleTags" name="styleTags" className="input" />
          </Field>
          <p className="text-[12px] text-ink-3">
            Next you will add prices and sign the{" "}
            <Link href="/pledge" className="underline">
              Welcomes Every Couple pledge
            </Link>
            . Both are required to be listed.
          </p>
        </ActionForm>
      </div>
    </div>
  );
}
