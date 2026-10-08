import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatMonth, money, parseStyleTags, priceUnitLabel } from "@/lib/format";
import { isPriceHonest, isPriceStale, respondsFast } from "@/lib/ranking";
import { Breadcrumbs, TrustMark } from "@/components/ui";
import { toggleSaveVendor } from "@/lib/actions/couple";
import { appUrl } from "@/lib/stripe";
import { track } from "@/lib/analytics";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = await db.vendor.findUnique({ where: { slug }, include: { category: true, metro: true, images: { take: 1 } } });
  if (!v || v.status !== "LIVE") return {};
  return {
    title: `${v.name}: ${v.metro.name} wedding ${v.category.singular.toLowerCase()} from ${money(v.startingPrice)}`,
    description: v.tagline || v.description.slice(0, 155),
    alternates: { canonical: appUrl(`/vendors/${v.slug}`) },
    openGraph: v.images[0] ? { images: [v.images[0].url] } : undefined,
  };
}

export default async function VendorProfilePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = await db.vendor.findUnique({
    where: { slug },
    include: {
      category: true,
      metro: true,
      images: { orderBy: { sortOrder: "asc" } },
      packages: { orderBy: { sortOrder: "asc" } },
      credits: { include: { realWedding: true } },
      reviews: { where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" }, include: { couple: { select: { partnerAName: true, partnerBName: true } } } },
    },
  });
  const user = await getCurrentUser();
  const isOwner = Boolean(user && v && (v.ownerId === user.id || user.role === "ADMIN"));
  if (!v || (v.status !== "LIVE" && !isOwner)) notFound();
  if (!isOwner) await track("vendor_profile_view", { slug: v.slug }, user?.id ?? null, v.id);
  const couple = user ? await db.couple.findUnique({ where: { userId: user.id }, include: { saved: { where: { vendorId: v.id } } } }) : null;
  const saved = Boolean(couple?.saved.length);
  const publishedWeddings = v.credits.filter((c) => c.realWedding.status === "PUBLISHED");
  const avgRating = v.reviews.length ? v.reviews.reduce((a, r) => a + r.rating, 0) / v.reviews.length : null;
  const unit = priceUnitLabel(v.category.priceUnit);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: v.name,
    url: appUrl(`/vendors/${v.slug}`),
    image: v.images.map((i) => i.url),
    description: v.tagline || v.description.slice(0, 200),
    areaServed: v.serviceArea || v.metro.name,
    priceRange: v.typicalLow && v.typicalHigh ? `${money(v.typicalLow)} to ${money(v.typicalHigh)}` : undefined,
    aggregateRating: avgRating ? { "@type": "AggregateRating", ratingValue: avgRating.toFixed(1), reviewCount: v.reviews.length } : undefined,
  };
  return (
    <div className="container-x py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: v.metro.name, href: `/vendors?metro=${v.metro.slug}` }, { label: v.category.name, href: `/${v.metro.slug}/${v.category.slug}` }, { label: v.name }]} />
      {v.status !== "LIVE" ? <div className="mb-4 rounded-md bg-clay-soft px-4 py-3 text-[14px]">This profile is {v.status.toLowerCase()} and visible only to you.</div> : null}

      <div className="grid gap-2 grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden">
        {v.images.slice(0, 4).map((img, i) => (
          <div key={img.id} className={`img-frame ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.alt || `${v.name} portfolio image ${i + 1}`} width={800} height={600} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        {v.images.length === 0 ? <div className="col-span-4 img-frame aspect-[16/6] flex items-center justify-center text-ink-3">No photos yet</div> : null}
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_340px] mt-8">
        <div>
          <div className="flex flex-wrap gap-1 mb-2">
            {isPriceHonest(v) ? <TrustMark kind="price-honest" /> : null}
            <TrustMark kind="verified" />
            {v.pledgeSignedAt ? <TrustMark kind="pledge" /> : null}
            {respondsFast(v.medianReplyHours) ? <TrustMark kind="fast" /> : null}
            {isPriceStale(v.priceConfirmedAt) && v.startingPrice ? <TrustMark kind="stale" /> : null}
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold">{v.name}</h1>
          <p className="text-ink-2 mt-1">
            {v.category.singular} · {v.serviceArea || v.metro.name}
            {v.website ? (
              <>
                {" "}
                ·{" "}
                <a href={v.website} rel="nofollow noopener" target="_blank" className="underline">
                  Website
                </a>
              </>
            ) : null}
            {v.instagram ? (
              <>
                {" "}
                ·{" "}
                <a href={`https://instagram.com/${v.instagram.replace(/^@/, "")}`} rel="nofollow noopener" target="_blank" className="underline">
                  Instagram
                </a>
              </>
            ) : null}
          </p>
          {v.isHouseVendor ? (
            <p className="mt-3 rounded-md bg-sage px-4 py-3 text-[13px]">
              Disclosure: this business is operated by Clearvow&apos;s founders. It is listed under the same rules as every other vendor, is ranked by the same score, and is never sold a Spotlight placement.{" "}
              <Link href="/about" className="underline">
                Read our policy
              </Link>
              .
            </p>
          ) : null}
          {v.tagline ? <p className="text-lg mt-3">{v.tagline}</p> : null}
          <div className="prose-cv mt-4 text-[15px] text-ink-2">
            {v.description.split(/\n{2,}/).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {parseStyleTags(v.styleTags).length ? (
            <ul className="flex flex-wrap gap-2 mt-2">
              {parseStyleTags(v.styleTags).map((t) => (
                <li key={t} className="pill">
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Packages and prices</h2>
            <p className="text-[13px] text-ink-3 mt-1">Published by {v.name}; confirmed {v.priceConfirmedAt ? formatMonth(v.priceConfirmedAt) : "never"}. Couples report whether quotes match.</p>
            {v.category.slug === "venues" && (v.siteFeeFrom || v.perGuestFrom) ? (
              <dl className="grid grid-cols-3 gap-3 mt-4 text-[14px] tnum">
                <div className="card p-3">
                  <dt className="text-ink-3 text-[12px]">Site fee from</dt>
                  <dd className="price text-lg">{money(v.siteFeeFrom)}</dd>
                </div>
                <div className="card p-3">
                  <dt className="text-ink-3 text-[12px]">Per guest from</dt>
                  <dd className="price text-lg">{money(v.perGuestFrom)}</dd>
                </div>
                <div className="card p-3">
                  <dt className="text-ink-3 text-[12px]">Capacity</dt>
                  <dd className="text-lg font-semibold">{v.capacity ?? "—"}</dd>
                </div>
              </dl>
            ) : null}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {v.packages.map((p) => (
                <li key={p.id} className="card p-4">
                  <div className="flex justify-between items-baseline gap-3">
                    <div className="font-semibold">{p.name}</div>
                    <div className="price text-lg tnum">{money(p.price)}</div>
                  </div>
                  {p.description ? <p className="text-[14px] text-ink-2 mt-2 whitespace-pre-line">{p.description}</p> : null}
                </li>
              ))}
            </ul>
          </section>

          {publishedWeddings.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Real weddings featuring {v.name}</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {publishedWeddings.map((c) => (
                  <li key={c.id} className="card p-4">
                    <Link href={`/real-weddings/${c.realWedding.slug}`} className="font-semibold hover:underline">
                      {c.realWedding.partnerAName} &amp; {c.realWedding.partnerBName} at {c.realWedding.venueName}
                    </Link>
                    <div className="text-[13px] text-ink-3 mt-1">Credited as {c.role}</div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Reviews</h2>
            <p className="text-[13px] text-ink-3 mt-1">Only couples who had a replied inquiry with this vendor through Clearvow can review.</p>
            {v.reviews.length === 0 ? (
              <p className="text-ink-2 mt-3">No reviews yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {v.reviews.map((r) => (
                  <li key={r.id} className="card p-4">
                    <div className="flex justify-between text-[13px] text-ink-3">
                      <span>
                        {r.couple.partnerAName} &amp; {r.couple.partnerBName}
                      </span>
                      <span aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}</span>
                    </div>
                    <p className="mt-2 text-[14px]">{r.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="md:sticky md:top-20 self-start">
          <div className="card p-5">
            <div className="text-[13px] text-ink-3">Starting price</div>
            <div className="price text-3xl tnum">{money(v.startingPrice)}</div>
            <div className="text-[13px] text-ink-3 tnum">
              {unit}
              {v.typicalLow && v.typicalHigh ? ` · typical ${money(v.typicalLow)} to ${money(v.typicalHigh)}` : ""}
            </div>
            <dl className="grid grid-cols-2 gap-3 mt-4 text-[13px]">
              <div>
                <dt className="text-ink-3">Median first reply</dt>
                <dd className="font-semibold tnum">{v.medianReplyHours === null ? "No history yet" : `${Math.round(v.medianReplyHours)}h`}</dd>
              </div>
              <div>
                <dt className="text-ink-3">Quotes matched range</dt>
                <dd className="font-semibold tnum">{v.quoteMatchRate === null ? "Not enough data" : `${Math.round(v.quoteMatchRate * 100)}%`}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col gap-2">
              <Link href={`/inquire/${v.slug}`} className="btn btn-primary">
                Send a verified inquiry
              </Link>
              <form action={toggleSaveVendor}>
                <input type="hidden" name="vendorSlug" value={v.slug} />
                <button className="btn btn-secondary w-full" type="submit">
                  {saved ? "Saved ✓ (remove)" : "Save to my vendor team"}
                </button>
              </form>
            </div>
            <p className="text-[12px] text-ink-3 mt-3">Free for couples. Your email and phone are verified once, then shared with vendors only when you send an inquiry.</p>
          </div>
          {isOwner ? (
            <div className="card p-4 mt-3 text-[13px]">
              You own this profile.{" "}
              <Link href="/vendor/profile" className="underline">
                Edit
              </Link>{" "}
              ·{" "}
              <Link href="/vendor/pricing" className="underline">
                Prices
              </Link>
            </div>
          ) : null}
        </aside>
      </div>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-paper/95 backdrop-blur px-4 py-3 flex items-center justify-between gap-3" role="region" aria-label="Inquiry bar">
        <div>
          <div className="price text-lg tnum">{money(v.startingPrice)}</div>
          <div className="text-[11px] text-ink-3">starting, {unit}</div>
        </div>
        <Link href={`/inquire/${v.slug}`} className="btn btn-primary">
          Send inquiry
        </Link>
      </div>
      <div className="md:hidden h-20" aria-hidden="true" />
    </div>
  );
}
