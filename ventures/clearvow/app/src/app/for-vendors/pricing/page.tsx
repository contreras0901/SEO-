import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, SPOTLIGHT_CAP_PER_CATEGORY, SPOTLIGHT_PRICE_USD, UNLOCK_PRICE_USD } from "@/lib/plans";

export const metadata: Metadata = { title: "Vendor pricing", description: "Free, Pro $59/mo, Preferred $149/mo. No contracts. Inquiry unlocks $15 with a no-reply refund. Spotlight placements capped at 3 per category." };

export default function VendorPricingPage() {
  const rows: [string, string, string, string][] = [
    ["Directory listing with published prices", "Yes", "Yes", "Yes"],
    ["Read every verified inquiry brief", "Yes", "Yes", "Yes"],
    ["Reply to inquiries", `$${UNLOCK_PRICE_USD} per unlock, refunded if no reply in 7 days`, "Unlimited", "Unlimited"],
    ["Real-wedding submissions per year", "3", "10", "Unlimited, expedited"],
    ["Profile analytics", "Yes", "Yes", "Yes"],
    ["Price-Honest badge (earned, not bought)", "Yes", "Yes", "Yes"],
    ["Spotlight eligibility", "No", "No", `Yes, $${SPOTLIGHT_PRICE_USD}/mo per slot, max ${SPOTLIGHT_CAP_PER_CATEGORY} per category`],
    ["Metro email digest features", "No", "No", "Yes"],
    ["Contract", "None", "None, cancel anytime", "None, cancel anytime"],
  ];
  return (
    <div className="container-x py-10">
      <h1 className="text-3xl md:text-4xl font-semibold">Vendor pricing</h1>
      <p className="text-ink-2 mt-2 max-w-2xl">Published, like yours. No sales call needed.</p>
      <div className="overflow-x-auto mt-8">
        <table className="w-full text-[14px] min-w-[640px]">
          <thead>
            <tr className="text-left">
              <th className="py-3 pr-4"></th>
              {(["FREE", "PRO", "PREFERRED"] as const).map((k) => (
                <th key={k} className="py-3 pr-4">
                  <div className="font-semibold text-lg">{PLANS[k].name}</div>
                  <div className="tnum text-2xl font-semibold">
                    ${PLANS[k].monthly}
                    <span className="text-[13px] font-normal text-ink-3">/mo</span>
                  </div>
                  {PLANS[k].annual ? <div className="text-[12px] text-ink-3 tnum">${PLANS[k].annual}/yr</div> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r[0]}>
                <td className="py-3 pr-4 font-medium">{r[0]}</td>
                <td className="py-3 pr-4 text-ink-2">{r[1]}</td>
                <td className="py-3 pr-4 text-ink-2">{r[2]}</td>
                <td className="py-3 pr-4 text-ink-2">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex gap-3">
        <Link href="/claim" className="btn btn-primary">
          Claim your free profile
        </Link>
        <Link href="/trust" className="btn btn-secondary">
          Read the ranking rules
        </Link>
      </div>
    </div>
  );
}
