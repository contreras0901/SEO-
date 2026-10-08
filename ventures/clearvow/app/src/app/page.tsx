import Link from "next/link";
import { db } from "@/lib/db";
import { listCategories, listMetros, platformStats } from "@/lib/queries";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money } from "@/lib/format";
import { Section, TrustMark } from "@/components/ui";
import { BUDGET_BANDS } from "@/lib/validation";
import { appUrl } from "@/lib/stripe";

export const revalidate = 600;

export default async function HomePage() {
  const [cats, metros, stats] = await Promise.all([listCategories(), listMetros(), platformStats()]);
  const metro = metros.find((m) => m.slug === "san-diego") ?? metros[0];
  const medians = metro
    ? await Promise.all(cats.map(async (c) => ({ c, s: await metroCategoryPriceStats(metro.id, c.id) })))
    : [];
  const weddings = metro
    ? await db.realWedding.findMany({ where: { metroId: metro.id, status: "PUBLISHED" }, orderBy: { publishedAt: "desc" }, take: 4, include: { credits: { select: { id: true } } } })
    : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Clearvow",
    url: appUrl("/"),
    potentialAction: { "@type": "SearchAction", target: `${appUrl("/vendors")}?q={search_term_string}`, "query-input": "required name=search_term_string" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-x pt-12 pb-10 md:pt-20 md:pb-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-[1.05]">See the price before you ask.</h1>
          <p className="text-lg md:text-xl text-ink-2 mt-4 max-w-2xl">
            Wedding vendors in {metro?.name ?? "your city"} with published prices, verified inquiries, and a promise to welcome every couple.
          </p>
        </div>
        <form action="/vendors" method="get" className="card mt-8 p-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]" role="search" aria-label="Find vendors">
          <label className="sr-only" htmlFor="category">
            Category
          </label>
          <select id="category" name="category" className="input" defaultValue="">
            <option value="">All categories</option>
            {cats.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="metro">
            City
          </label>
          <select id="metro" name="metro" className="input" defaultValue={metro?.slug}>
            {metros.map((m) => (
              <option key={m.id} value={m.slug}>
                {m.name}, {m.state}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="budget">
            Budget for this category
          </label>
          <select id="budget" name="budget" className="input" defaultValue="">
            <option value="">Any budget</option>
            {BUDGET_BANDS.map((b, i) => (
              <option key={b.label} value={i}>
                {b.label}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" type="submit">
            Find vendors
          </button>
        </form>
        <p className="text-[14px] text-ink-2 mt-3">
          Are you a vendor?{" "}
          <Link href="/claim" className="underline">
            List for free with your prices.
          </Link>
        </p>
      </section>

      <section className="border-y border-line bg-paper-2">
        <div className="container-x py-6 grid gap-4 md:grid-cols-3 text-[14px]">
          <div className="flex gap-3 items-start">
            <TrustMark kind="price-honest" />
            <p className="text-ink-2">Every listed vendor publishes a starting price, a typical range, and at least one package. No exceptions.</p>
          </div>
          <div className="flex gap-3 items-start">
            <TrustMark kind="verified" />
            <p className="text-ink-2">Inquiries carry a verified email and phone, a date, a venue, a guest count, and a budget. Vendors see the whole brief.</p>
          </div>
          <div className="flex gap-3 items-start">
            <TrustMark kind="pledge" />
            <p className="text-ink-2">
              Vendors sign the{" "}
              <Link href="/pledge" className="underline">
                Welcomes Every Couple pledge
              </Link>
              . Filter by it in one tap.
            </p>
          </div>
        </div>
      </section>

      {metro ? (
        <Section title={`Browse ${metro.name} by category`} subtitle="Median starting prices are computed live from published listings.">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {medians.map(({ c, s }) => (
              <li key={c.id}>
                <Link href={`/${metro.slug}/${c.slug}`} className="card p-4 block hover:shadow-md transition-shadow h-full">
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-[13px] text-ink-3 mt-1 tnum">
                    {s.count > 0 ? (
                      <>
                        {s.count} listed · from <span className="price">{money(s.medianStart)}</span> median
                      </>
                    ) : (
                      "Be the first to list"
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {weddings.length ? (
        <Section title={`Real weddings in ${metro?.name}`} subtitle="Every wedding credits the full vendor team, with their prices." action={<Link href="/real-weddings" className="btn btn-secondary btn-sm">All real weddings</Link>}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weddings.map((w) => (
              <li key={w.id} className="card overflow-hidden">
                <Link href={`/real-weddings/${w.slug}`} className="img-frame aspect-[4/3] block">
                  {w.coverUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={w.coverUrl} alt={`${w.partnerAName} and ${w.partnerBName} at ${w.venueName}`} loading="lazy" width={640} height={480} />
                  ) : null}
                </Link>
                <div className="p-4">
                  <div className="font-semibold leading-tight">
                    <Link href={`/real-weddings/${w.slug}`} className="hover:underline">
                      {w.partnerAName} &amp; {w.partnerBName}
                    </Link>
                  </div>
                  <div className="text-[13px] text-ink-3 mt-1">
                    {w.venueName} · {w.credits.length} vendors credited
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title="How it works for couples">
        <ol className="grid gap-4 md:grid-cols-3">
          {[
            ["Search by budget", "Pick a category and a budget band. Only vendors whose published starting price fits are shown."],
            ["Send one structured inquiry", "Date, venue, guest count, budget, and your questions. No blank 'tell me more' emails."],
            ["Track every reply in one place", "See who replied, how fast, and whether their quote matched their published range."],
          ].map(([t, b], i) => (
            <li key={t} className="card p-5">
              <div className="text-[12px] text-ink-3 font-semibold">STEP {i + 1}</div>
              <div className="font-semibold text-lg mt-1">{t}</div>
              <p className="text-ink-2 text-[14px] mt-1">{b}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6">
          <Link href="/start" className="btn btn-primary">
            Start planning, free
          </Link>
        </div>
      </Section>

      <section className="bg-ink text-paper">
        <div className="container-x py-12 md:py-16 grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-semibold">Inquiries, not leads.</h2>
            <p className="mt-3 text-paper/80">
              Read the full brief before you pay a cent. No contracts. Cancel anytime. Ranking that money cannot buy. Live numbers, not marketing claims:
            </p>
            <dl className="grid grid-cols-3 gap-4 mt-6 tnum">
              <div>
                <dt className="text-[12px] text-paper/70">Listed vendors</dt>
                <dd className="text-2xl font-semibold">{stats.liveVendors}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-paper/70">Verified inquiries</dt>
                <dd className="text-2xl font-semibold">{stats.deliveredInquiries}</dd>
              </div>
              <div>
                <dt className="text-[12px] text-paper/70">Median first reply</dt>
                <dd className="text-2xl font-semibold">{stats.medianReplyHours === null ? "—" : `${Math.round(stats.medianReplyHours)}h`}</dd>
              </div>
            </dl>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href="/claim" className="btn btn-clay">
              Claim your free profile
            </Link>
            <Link href="/for-vendors" className="btn btn-secondary !text-paper !border-paper/40">
              How it works for vendors
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
