import { requireVendor } from "@/lib/vendor-context";
import { openBillingPortal, startProCheckout } from "@/lib/actions/billing";
import { Notice } from "@/components/ui";
import { PLANS } from "@/lib/plans";
import { isStripeConfigured, priceIds } from "@/lib/stripe";

export const metadata = { title: "Billing", robots: { index: false } };

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const sp = await searchParams;
  const { vendor } = await requireVendor();
  const configured = isStripeConfigured() && Boolean(priceIds().proMonthly);
  return (
    <div className="max-w-2xl space-y-4">
      {sp.success ? <Notice kind="ok">Payment received. Your plan updates within a minute once Stripe confirms it.</Notice> : null}
      {sp.error === "billing-not-configured" ? <Notice kind="bad">Payments are not configured on this deployment. Set the Stripe environment variables, or an administrator can set your plan manually.</Notice> : null}
      <div className="card p-5">
        <div className="text-[13px] text-ink-3">Current plan</div>
        <div className="text-2xl font-semibold">{PLANS[vendor.plan as keyof typeof PLANS]?.name ?? vendor.plan}</div>
        {vendor.planRenewsAt ? <div className="text-[13px] text-ink-3">Renews {vendor.planRenewsAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</div> : null}
        {vendor.stripeCustomerId ? (
          <form action={openBillingPortal} className="mt-3">
            <button className="btn btn-secondary btn-sm" type="submit">
              Manage subscription, invoices, or cancel
            </button>
          </form>
        ) : null}
      </div>
      {vendor.plan === "FREE" ? (
        <div className="card p-5">
          <div className="font-semibold text-lg">Go Pro</div>
          <ul className="mt-2 text-[14px] text-ink-2 space-y-1">
            {PLANS.PRO.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <form action={startProCheckout}>
              <input type="hidden" name="interval" value="monthly" />
              <button className="btn btn-primary" type="submit" disabled={!configured}>
                ${PLANS.PRO.monthly}/month
              </button>
            </form>
            <form action={startProCheckout}>
              <input type="hidden" name="interval" value="annual" />
              <button className="btn btn-secondary" type="submit" disabled={!configured || !priceIds().proAnnual}>
                ${PLANS.PRO.annual}/year (2 months free)
              </button>
            </form>
          </div>
          {!configured ? <p className="text-[12px] text-ink-3 mt-2">Payments are not configured on this deployment.</p> : <p className="text-[12px] text-ink-3 mt-2">No contract. Cancel anytime from this page; you keep Pro until the end of the paid period.</p>}
        </div>
      ) : null}
      <div className="card p-5 text-[14px]">
        <div className="font-semibold">Preferred ({`$${PLANS.PREFERRED.monthly}/mo`}) and Spotlight</div>
        <p className="text-ink-2 mt-1">Sold by a person during launch so we can cap Spotlight slots honestly. Email vendors@clearvow.example with your category.</p>
      </div>
    </div>
  );
}
