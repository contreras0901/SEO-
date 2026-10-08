import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCategory, getMetro, listCategories, listMetros, searchVendors } from "@/lib/queries";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money, percentile } from "@/lib/format";
import { VendorCard } from "@/components/VendorCard";
import { VendorFilters } from "@/components/VendorFilters";
import { Breadcrumbs, Empty } from "@/components/ui";
import { appUrl } from "@/lib/stripe";

export const revalidate = 600;

type Params = { city: string; category: string };

export async function generateStaticParams() {
  const [metros, cats] = await Promise.all([db.metro.findMany({ where: { isActive: true } }), db.category.findMany()]);
  return metros.flatMap((m) => cats.map((c) => ({ city: m.slug, category: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, category } = await params;
  const [metro, cat] = await Promise.all([getMetro(city), getCategory(category)]);
  if (!metro || !cat) return {};
  const s = await metroCategoryPriceStats(metro.id, cat.id);
  const title = `${metro.name} wedding ${cat.name.toLowerCase()} with published prices`;
  const description = s.count ? `${s.count} ${metro.name} wedding ${cat.name.toLowerCase()} listed with prices. Median starting price ${money(s.medianStart)}. Verified inquiries, no pay-to-rank.` : `${metro.name} wedding ${cat.name.toLowerCase()} with published prices and verified inquiries.`;
  return { title, description, alternates: { canonical: appUrl(`/${metro.slug}/${cat.slug}`) } };
}

export default async function CityCategoryPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<{ budget?: string; pledge?: string; q?: string; page?: string }> }) {
  const { city, category } = await params;
  const sp = await searchParams;
  const [metro, cat] = await Promise.all([getMetro(city), getCategory(category)]);
  if (!metro || !cat) notFound();
  const [cats, metros, result, stats] = await Promise.all([listCategories(), listMetros(), searchVendors({ ...sp, metro: metro.slug, category: cat.slug }), metroCategoryPriceStats(metro.id, cat.id)]);
  const p25 = percentile(stats.starts, 25);
  const p75 = percentile(stats.starts, 75);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: result.items.slice(0, 10).map((v, i) => ({ "@type": "ListItem", position: i + 1, url: appUrl(`/vendors/${v.slug}`), name: v.name })),
  };
  const faq = stats.count
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How much do wedding ${cat.name.toLowerCase()} cost in ${metro.name}?`, acceptedAnswer: { "@type": "Answer", text: `Across ${stats.count} ${metro.name} ${cat.name.toLowerCase()} with published prices on Clearvow, the median starting price is ${money(stats.medianStart)}. The middle half start between ${money(p25)} and ${money(p75)}. Typical total spend runs ${money(stats.medianLow)} to ${money(stats.medianHigh)}.` } },
        ],
      }
    : null;
  return (
    <div className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {faq ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} /> : null}
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: metro.name, href: `/vendors?metro=${metro.slug}` }, { label: cat.name }]} />
      <h1 className="text-3xl md:text-4xl font-semibold">
        {metro.name} wedding {cat.name.toLowerCase()} with published prices
      </h1>
      {stats.count ? (
        <p className="text-ink-2 mt-2 max-w-3xl tnum">
          {stats.count} listed. Median starting price <span className="price">{money(stats.medianStart)}</span>; the middle half start between {money(p25)} and {money(p75)}. Typical total {money(stats.medianLow)} to {money(stats.medianHigh)}.{" "}
          <Link href={`/price-guides/${metro.slug}/${cat.slug}`} className="underline">
            Full price guide
          </Link>
          .
        </p>
      ) : (
        <p className="text-ink-2 mt-2">No {cat.name.toLowerCase()} have published prices in {metro.name} yet.</p>
      )}
      <div className="mt-6">
        <VendorFilters cats={cats} metros={metros} current={{ ...sp, metro: metro.slug, category: cat.slug }} action={`/${metro.slug}/${cat.slug}`} lockCategory lockMetro />
      </div>
      {result.items.length === 0 ? (
        <div className="mt-8">
          <Empty title={`No ${cat.name.toLowerCase()} match yet`} body="Widen the budget band, or be the first vendor to list here with prices." action={<Link href="/claim" className="btn btn-secondary">Claim a vendor profile</Link>} />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((v) => (
            <li key={v.slug}>
              <VendorCard v={v} />
            </li>
          ))}
        </ul>
      )}
      <section className="mt-12 card p-6">
        <h2 className="text-xl font-semibold">Other {metro.name} categories</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {cats
            .filter((c) => c.slug !== cat.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link href={`/${metro.slug}/${c.slug}`} className="pill hover:border-ink-3">
                  {c.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
