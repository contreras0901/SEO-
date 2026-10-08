import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate, money } from "@/lib/format";
import { Breadcrumbs, PriceBadge } from "@/components/ui";
import { appUrl } from "@/lib/stripe";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = await db.realWedding.findUnique({ where: { slug }, include: { metro: true } });
  if (!w || w.status !== "PUBLISHED") return {};
  return { title: w.title, description: `${w.partnerAName} and ${w.partnerBName}'s wedding at ${w.venueName}, ${w.metro.name}, with the full vendor team and their published prices.`, alternates: { canonical: appUrl(`/real-weddings/${w.slug}`) }, openGraph: w.coverUrl ? { images: [w.coverUrl] } : undefined };
}

export default async function RealWeddingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = await db.realWedding.findUnique({
    where: { slug },
    include: { metro: true, images: { orderBy: { sortOrder: "asc" } }, credits: { include: { vendor: { include: { category: true } } } }, venueVendor: true },
  });
  if (!w || w.status !== "PUBLISHED") notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: w.title, image: [w.coverUrl, ...w.images.map((i) => i.url)].filter(Boolean), datePublished: w.publishedAt?.toISOString(), about: w.venueName, publisher: { "@type": "Organization", name: "Clearvow" } };
  const teamTotal = w.credits.reduce((a, c) => a + (c.vendor.startingPrice ?? 0), 0);
  return (
    <article className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Real weddings", href: "/real-weddings" }, { label: `${w.partnerAName} & ${w.partnerBName}` }]} />
      <h1 className="text-3xl md:text-5xl font-semibold max-w-4xl">{w.title}</h1>
      <p className="text-ink-2 mt-3">
        {w.partnerAName} &amp; {w.partnerBName} · {formatDate(w.eventDate)} · {w.venueVendor ? <Link href={`/vendors/${w.venueVendor.slug}`} className="underline">{w.venueName}</Link> : w.venueName}, {w.metro.name}
        {w.guestCount ? ` · ${w.guestCount} guests` : ""}
        {w.budgetBand ? ` · ${w.budgetBand}` : ""}
      </p>
      {w.coverUrl ? (
        <div className="img-frame aspect-[16/9] rounded-xl mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.coverUrl} alt={`${w.partnerAName} and ${w.partnerBName} at ${w.venueName}`} width={1600} height={900} />
        </div>
      ) : null}
      <div className="grid gap-8 md:grid-cols-[1fr_360px] mt-8">
        <div className="prose-cv text-[16px] text-ink-2 max-w-2xl">
          {w.story.split(/\n{2,}/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {w.images.length ? (
            <ul className="grid gap-3 sm:grid-cols-2 mt-6">
              {w.images.map((img) => (
                <li key={img.id} className="img-frame aspect-[4/5] rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={img.alt || `${w.venueName} wedding detail`} loading="lazy" width={800} height={1000} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <aside className="card p-5 self-start md:sticky md:top-20">
          <h2 className="text-xl font-semibold">The vendor team</h2>
          <p className="text-[13px] text-ink-3 mt-1 tnum">{w.credits.length} credited. Listed starting prices add up to {money(teamTotal)}; actual spend varies.</p>
          <ul className="mt-4 divide-y divide-line">
            {w.credits.map((c) => (
              <li key={c.id} className="py-3">
                <div className="text-[12px] text-ink-3">{c.role}</div>
                {c.vendor.status === "LIVE" ? (
                  <Link href={`/vendors/${c.vendor.slug}`} className="font-semibold hover:underline">
                    {c.vendor.name}
                  </Link>
                ) : (
                  <span className="font-semibold">
                    {c.vendor.name} <span className="text-[12px] text-ink-3 font-normal">(not yet listed)</span>
                  </span>
                )}
                <div className="mt-1">{c.vendor.status === "LIVE" ? <PriceBadge amount={c.vendor.startingPrice} /> : <span className="text-[12px] text-ink-3">Unclaimed profile</span>}</div>
              </li>
            ))}
          </ul>
          <Link href={`/real-weddings?venue=${encodeURIComponent(w.venueName)}`} className="btn btn-secondary w-full mt-4">
            More weddings at {w.venueName}
          </Link>
        </aside>
      </div>
    </article>
  );
}
