import { requireVendor } from "@/lib/vendor-context";
import { updateVendorPricing } from "@/lib/actions/vendor";
import { ActionForm, Field } from "@/components/ActionForm";
import { Notice } from "@/components/ui";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money, priceUnitLabel } from "@/lib/format";
import { isPriceStale } from "@/lib/ranking";

export const metadata = { title: "Prices and packages", robots: { index: false } };

export default async function VendorPricingPage({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const stats = await metroCategoryPriceStats(vendor.metroId, vendor.categoryId);
  const [p1, p2, p3] = vendor.packages;
  const isVenue = vendor.category.slug === "venues";
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_320px]">
      <div className="card p-6">
        {sp.new ? <Notice kind="info">Profile created. Published prices are required to be listed. Starting price and typical range are shown on every search result.</Notice> : null}
        {isPriceStale(vendor.priceConfirmedAt) && vendor.startingPrice ? <Notice kind="warn">Your prices were last confirmed more than 180 days ago and are flagged to couples. Saving this form confirms them today.</Notice> : null}
        <ActionForm action={updateVendorPricing} submitLabel="Save and confirm prices">
          <input type="hidden" name="vendorId" value={vendor.id} />
          <div className="grid gap-4 sm:grid-cols-3">
            <Field name="startingPrice" label={`Starting price (${priceUnitLabel(vendor.category.priceUnit)})`} required>
              <input id="startingPrice" name="startingPrice" type="number" min={1} className="input" defaultValue={vendor.startingPrice ?? ""} required />
            </Field>
            <Field name="typicalLow" label="Typical low" required>
              <input id="typicalLow" name="typicalLow" type="number" min={1} className="input" defaultValue={vendor.typicalLow ?? ""} required />
            </Field>
            <Field name="typicalHigh" label="Typical high" required>
              <input id="typicalHigh" name="typicalHigh" type="number" min={1} className="input" defaultValue={vendor.typicalHigh ?? ""} required />
            </Field>
          </div>
          {isVenue ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field name="siteFeeFrom" label="Site fee from">
                <input id="siteFeeFrom" name="siteFeeFrom" type="number" min={0} className="input" defaultValue={vendor.siteFeeFrom ?? ""} />
              </Field>
              <Field name="perGuestFrom" label="Per guest from">
                <input id="perGuestFrom" name="perGuestFrom" type="number" min={0} className="input" defaultValue={vendor.perGuestFrom ?? ""} />
              </Field>
              <Field name="capacity" label="Max capacity">
                <input id="capacity" name="capacity" type="number" min={0} className="input" defaultValue={vendor.capacity ?? ""} />
              </Field>
            </div>
          ) : null}
          <h3 className="font-semibold pt-2">Packages</h3>
          <p className="text-[13px] text-ink-3">At least one is required. Say what is included; couples compare these side by side.</p>
          {[
            ["package", p1],
            ["package2", p2],
            ["package3", p3],
          ].map(([prefix, pkg], i) => {
            const p = pkg as { name: string; price: number; description: string } | undefined;
            const pre = prefix as string;
            return (
              <div key={pre} className="card p-4 grid gap-3 sm:grid-cols-[1fr_140px] bg-paper">
                <Field name={`${pre}Name`} label={`Package ${i + 1} name`} required={i === 0}>
                  <input id={`${pre}Name`} name={`${pre}Name`} className="input" defaultValue={p?.name ?? ""} />
                </Field>
                <Field name={`${pre}Price`} label="Price" required={i === 0}>
                  <input id={`${pre}Price`} name={`${pre}Price`} type="number" min={1} className="input" defaultValue={p?.price ?? ""} />
                </Field>
                <div className="sm:col-span-2">
                  <Field name={`${pre}Description`} label="What is included">
                    <textarea id={`${pre}Description`} name={`${pre}Description`} className="input" rows={2} defaultValue={p?.description ?? ""} />
                  </Field>
                </div>
              </div>
            );
          })}
        </ActionForm>
      </div>
      <aside className="card p-4 text-[14px] self-start">
        <div className="font-semibold">
          {vendor.metro.name} {vendor.category.name.toLowerCase()}, live market
        </div>
        {stats.count ? (
          <dl className="mt-2 space-y-1 text-ink-2 tnum">
            <div>{stats.count} listed with prices</div>
            <div>Median starting price {money(stats.medianStart)}</div>
            <div>
              Typical {money(stats.medianLow)} to {money(stats.medianHigh)}
            </div>
            <div>
              Range of starts {money(stats.minStart)} to {money(stats.maxStart)}
            </div>
          </dl>
        ) : (
          <p className="text-ink-2 mt-2">You would be the first in this category to publish prices here.</p>
        )}
        <p className="text-[12px] text-ink-3 mt-3">Couples report whether your quotes fall inside your typical range. Keep it honest and wide enough to be true.</p>
      </aside>
    </div>
  );
}
