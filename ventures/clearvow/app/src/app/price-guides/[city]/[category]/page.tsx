import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getMetro, searchVendors } from "@/lib/queries";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money, percentile } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui";
import { VendorCard } from "@/components/VendorCard";
import { appUrl } from "@/lib/stripe";

export const revalidate = 3600;
type Params = { city: string; category: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, category } = await params;
  const [metro, cat] = await Promise.all([getMetro(city), getCategory(category)]);
  if (!metro || !cat) return {};
  const s = await metroCategoryPriceStats(metro.id, cat.id);
  return { title: `What a ${metro.name} wedding ${cat.singular.toLowerCase()} costs (${new Date().getFullYear()})`, description: s.count ? `Median starting price ${money(s.medianStart)} across ${s.count} ${metro.name} ${cat.name.toLowerCase()} with published prices. Typical ${money(s.medianLow)} to ${money(s.medianHigh)}.` : undefined, alternates: { canonical: appUrl(`/price-guides/${metro.slug}/${cat.slug}`) } };
}

function histogram(values: number[], bins = 6): { label: string; count: number }[] {
  if (values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = Math.max(1, Math.ceil((max - min + 1) / bins));
  const out = Array.from({ length: bins }, (_, i) => ({ label: `${money(min + i * width)} to ${money(min + (i + 1) * width - 1)}`, count: 0 }));
  for (const v of values) out[Math.min(bins - 1, Math.floor((v - min) / width))].count++;
  return out;
}

export default async function PriceGuidePage({ params }: { params: Promise<Params> }) {
  const { city, category } = await params;
  const [metro, cat] = await Promise.all([getMetro(city), getCategory(category)]);
  if (!metro || !cat) notFound();
  const [s, top] = await Promise.all([metroCategoryPriceStats(metro.id, cat.id), searchVendors({ metro: metro.slug, category: cat.slug }, 6)]);
  const p25 = percentile(s.starts, 25);
  const p75 = percentile(s.starts, 75);
  const bars = histogram(s.starts);
  const maxCount = Math.max(1, ...bars.map((b) => b.count));
  const faq = s.count
    ? [
        { q: `How much does a wedding ${cat.singular.toLowerCase()} cost in ${metro.name}?`, a: `The median published starting price is ${money(s.medianStart)}. Half of listed ${cat.name.toLowerCase()} start between ${money(p25)} and ${money(p75)}. Typical total spend, as published by vendors, runs ${money(s.medianLow)} to ${money(s.medianHigh)}.` },
        { q: "Where do these numbers come from?", a: `From ${s.count} ${cat.name.toLowerCase()} who publish and confirm prices on their Clearvow profiles. Prices older than 180 days are flagged and excluded from Price-Honest status. This is not a survey.` },
        { q: "What is the cheapest option listed?", a: `The lowest published starting price in ${metro.name} is currently ${money(s.minStart)}, and the highest is ${money(s.maxStart)}.` },
      ]
    : [];
  const jsonLd = faq.length ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) } : null;
  return (
    <div className="container-x py-8">
      {jsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> : null}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Price guides", href: "/price-guides" }, { label: `${metro.name} ${cat.name.toLowerCase()}` }]} />
      <h1 className="text-3xl md:text-5xl font-semibold max-w-4xl">
        What a {metro.name} wedding {cat.singular.toLowerCase()} costs
      </h1>
      {s.count === 0 ? (
        <p className="text-ink-2 mt-4">No {cat.name.toLowerCase()} have published prices in {metro.name} yet. This guide fills in automatically as they do.</p>
      ) : (
        <>
          <p className="text-lg text-ink-2 mt-4 max-w-3xl tnum">
            Across <strong>{s.count}</strong> {metro.name} {cat.name.toLowerCase()} with published prices, the median starting price is <span className="price text-xl">{money(s.medianStart)}</span>. Half start between {money(p25)} and {money(p75)}. Typical total spend runs {money(s.medianLow)} to {money(s.medianHigh)}.
          </p>
          <section className="card p-5 mt-6">
            <h2 className="text-lg font-semibold">Distribution of starting prices</h2>
            <ul className="mt-4 space-y-2" aria-label="Histogram of starting prices">
              {bars.map((b) => (
                <li key={b.label} className="grid grid-cols-[180px_1fr_40px] items-center gap-3 text-[13px] tnum">
                  <span className="text-ink-3">{b.label}</span>
                  <span className="h-4 rounded bg-sage overflow-hidden">
                    <span className="block h-full bg-teal" style={{ width: `${(b.count / maxCount) * 100}%` }} />
                  </span>
                  <span className="text-right">{b.count}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Questions couples ask</h2>
            <dl className="mt-3 space-y-4">
              {faq.map((f) => (
                <div key={f.q} className="card p-4">
                  <dt className="font-semibold">{f.q}</dt>
                  <dd className="text-ink-2 mt-1 text-[14px]">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="mt-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold">Top-ranked {cat.name.toLowerCase()} in {metro.name}</h2>
              <Link href={`/${metro.slug}/${cat.slug}`} className="btn btn-secondary btn-sm">
                See all {s.count}
              </Link>
            </div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {top.items.map((v) => (
                <li key={v.slug}>
                  <VendorCard v={v} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
