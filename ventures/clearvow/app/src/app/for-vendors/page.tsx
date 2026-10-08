import type { Metadata } from "next";
import Link from "next/link";
import { platformStats } from "@/lib/queries";
import { PLANS, UNLOCK_PRICE_USD } from "@/lib/plans";
import { Section, Stat } from "@/components/ui";

export const revalidate = 300;
export const metadata: Metadata = { title: "For vendors: inquiries, not leads", description: "List for free with your prices. Read every verified inquiry before you pay. No contracts, cancel anytime, and ranking that money cannot buy." };

export default async function ForVendorsPage() {
  const s = await platformStats();
  return (
    <>
      <section className="container-x pt-12 pb-8 md:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05]">Inquiries, not leads.</h1>
          <p className="text-lg text-ink-2 mt-4">
            Every inquiry on Clearvow comes from a couple with a verified email and phone, and it arrives with the date, venue, guest count, budget band, and their questions. You read the whole brief before you decide to pay anything. There are no contracts and no sales calls.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/claim" className="btn btn-primary">
              Claim your free profile
            </Link>
            <Link href="/for-vendors/pricing" className="btn btn-secondary">
              See plans
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 mt-10 max-w-3xl">
          <Stat label="Listed vendors" value={String(s.liveVendors)} hint="Live now, from the database" />
          <Stat label="Verified inquiries delivered" value={String(s.deliveredInquiries)} hint="All time" />
          <Stat label="Median first reply" value={s.medianReplyHours === null ? "—" : `${Math.round(s.medianReplyHours)}h`} hint="Across all vendors" />
        </div>
      </section>
      <Section title="Why vendors switch">
        <ul className="grid gap-4 md:grid-cols-2">
          {[
            ["You see the brief before you pay", `Free profiles read every inquiry in full. Contact details unlock for $${UNLOCK_PRICE_USD}, refunded automatically if the couple never replies within 7 days. Pro replies to unlimited inquiries with no unlock fees.`],
            ["Ranking money cannot buy", "Directory order is response rate, quote accuracy, profile completeness, price freshness, and real-wedding credits. Plan is not an input. Only capped, labeled Spotlight slots are sold."],
            ["No contracts", "Monthly or annual. Cancel from your billing page; no retention calls. Your profile drops to Free, it is never deleted."],
            ["Published prices filter out mismatches", "Couples see your starting price before they contact you. Vendors who publish prices tell us the inquiries they get are smaller in number and far more serious."],
            ["Real weddings credit everyone", "Submit a wedding and every vendor on the team gets a credited link back to their profile. Uncredited vendors get an invitation to claim."],
            ["Welcomes Every Couple", "Signing the pledge is required to list. It is one checkbox and it is public on your profile."],
          ].map(([t, b]) => (
            <li key={t} className="card p-5">
              <div className="font-semibold text-lg">{t}</div>
              <p className="text-ink-2 text-[14px] mt-1">{b}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section title="Plans">
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(PLANS) as (keyof typeof PLANS)[]).map((k) => (
            <div key={k} className={`card p-5 ${k === "PRO" ? "border-teal" : ""}`}>
              <div className="font-semibold text-lg">{PLANS[k].name}</div>
              <div className="text-3xl font-semibold tnum mt-1">
                ${PLANS[k].monthly}
                <span className="text-[14px] text-ink-3 font-normal">/mo</span>
              </div>
              {PLANS[k].annual ? <div className="text-[13px] text-ink-3 tnum">or ${PLANS[k].annual}/yr (2 months free)</div> : <div className="text-[13px] text-ink-3">forever</div>}
              <ul className="mt-4 space-y-2 text-[14px] text-ink-2">
                {PLANS[k].features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-[13px] text-ink-3 mt-4">Founding-vendor rate: the first 50 vendors in each metro lock Pro at $39/mo for life. Ask when you claim.</p>
      </Section>
    </>
  );
}
