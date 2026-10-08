import { requireVendor } from "@/lib/vendor-context";
import { signPledge, updateVendorProfile } from "@/lib/actions/vendor";
import { ActionForm, Field } from "@/components/ActionForm";
import { listCategories, listMetros } from "@/lib/queries";
import { Notice } from "@/components/ui";
import { PLEDGE_TEXT } from "@/lib/pledge";
import { completenessScore } from "@/lib/ranking";

export const metadata = { title: "Vendor profile", robots: { index: false } };

export default async function VendorProfilePage({ searchParams }: { searchParams: Promise<{ pledge?: string; claimed?: string }> }) {
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const [cats, metros] = await Promise.all([listCategories(), listMetros()]);
  const completeness = Math.round(completenessScore({ ...vendor, credits: [] }) * 100);
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="card p-6">
        {sp.claimed ? <Notice kind="ok">Profile claimed. Review every field; it may have been created from a real-wedding credit.</Notice> : null}
        {sp.pledge === "signed" ? <Notice kind="ok">Pledge signed. Thank you.</Notice> : null}
        {sp.pledge === "required" ? <Notice kind="warn">Tick the box to sign the pledge.</Notice> : null}
        <ActionForm action={updateVendorProfile} submitLabel="Save profile">
          <input type="hidden" name="vendorId" value={vendor.id} />
          <Field name="name" label="Business name" required>
            <input id="name" name="name" className="input" defaultValue={vendor.name} required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="categorySlug" label="Category" hint="Changing it on a live profile triggers a quick re-review">
              <select id="categorySlug" name="categorySlug" className="input" defaultValue={vendor.category.slug}>
                {cats.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field name="metroSlug" label="Home city">
              <select id="metroSlug" name="metroSlug" className="input" defaultValue={vendor.metro.slug}>
                {metros.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name}, {m.state}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field name="tagline" label="Tagline">
            <input id="tagline" name="tagline" className="input" defaultValue={vendor.tagline ?? ""} maxLength={120} />
          </Field>
          <Field name="description" label="About" hint="At least 80 characters. Paragraphs separated by a blank line.">
            <textarea id="description" name="description" className="input" rows={6} defaultValue={vendor.description} maxLength={3000} />
          </Field>
          <Field name="serviceArea" label="Service area" hint="e.g. San Diego County, Temecula, Orange County">
            <input id="serviceArea" name="serviceArea" className="input" defaultValue={vendor.serviceArea} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="website" label="Website">
              <input id="website" name="website" className="input" defaultValue={vendor.website ?? ""} />
            </Field>
            <Field name="instagram" label="Instagram">
              <input id="instagram" name="instagram" className="input" defaultValue={vendor.instagram ?? ""} />
            </Field>
            <Field name="contactEmail" label="Inquiry email">
              <input id="contactEmail" name="contactEmail" type="email" className="input" defaultValue={vendor.contactEmail ?? ""} />
            </Field>
            <Field name="contactPhone" label="Phone">
              <input id="contactPhone" name="contactPhone" className="input" defaultValue={vendor.contactPhone ?? ""} />
            </Field>
          </div>
          <Field name="styleTags" label="Style tags" hint="Comma separated">
            <input id="styleTags" name="styleTags" className="input" defaultValue={vendor.styleTags} />
          </Field>
          <Field name="imageUrls" label="Portfolio image URLs" hint="One per line, up to 6. Direct upload ships in the next release; for now paste hosted image links (your site, Instagram CDN, Dropbox direct links).">
            <textarea id="imageUrls" name="imageUrls" className="input font-mono text-[13px]" rows={4} defaultValue={vendor.images.map((i) => i.url).join("\n")} />
          </Field>
        </ActionForm>
      </div>
      <aside className="space-y-4">
        <div className="card p-4 text-[14px]">
          <div className="font-semibold">Profile completeness</div>
          <div className="h-2 rounded bg-sage mt-2 overflow-hidden" role="progressbar" aria-valuenow={completeness} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full bg-teal" style={{ width: `${completeness}%` }} />
          </div>
          <div className="text-[12px] text-ink-3 mt-1 tnum">{completeness}%. Completeness is 15% of your ranking score.</div>
        </div>
        <div className="card p-4 text-[14px]">
          <div className="font-semibold">Welcomes Every Couple pledge</div>
          {vendor.pledgeSignedAt ? (
            <p className="text-ink-2 mt-1">Signed {vendor.pledgeSignedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}. Shown on your profile.</p>
          ) : (
            <form action={signPledge} className="mt-2 space-y-3">
              <input type="hidden" name="vendorId" value={vendor.id} />
              <ol className="text-[13px] text-ink-2 space-y-1 list-decimal pl-4">
                {PLEDGE_TEXT.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
              <label className="flex gap-2 items-start text-[13px]">
                <input type="checkbox" name="agree" className="mt-1" />
                <span>I sign this pledge on behalf of {vendor.name}.</span>
              </label>
              <button className="btn btn-primary btn-sm" type="submit">
                Sign the pledge
              </button>
            </form>
          )}
        </div>
      </aside>
    </div>
  );
}
