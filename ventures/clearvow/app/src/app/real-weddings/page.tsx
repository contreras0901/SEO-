import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Empty } from "@/components/ui";
import { formatMonth } from "@/lib/format";

export const revalidate = 600;
export const metadata: Metadata = { title: "Real weddings with full vendor credits and prices", description: "Real weddings in San Diego. Every wedding credits the full vendor team, each with published prices." };

export default async function RealWeddingsPage({ searchParams }: { searchParams: Promise<{ venue?: string }> }) {
  const sp = await searchParams;
  const weddings = await db.realWedding.findMany({
    where: { status: "PUBLISHED", ...(sp.venue ? { venueName: { contains: sp.venue } } : {}) },
    orderBy: { publishedAt: "desc" },
    include: { credits: { select: { id: true } }, metro: true },
  });
  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-semibold">Real weddings</h1>
      <p className="text-ink-2 mt-2 max-w-2xl">Every wedding here credits the whole team, and every credited vendor shows a published price. Submitted by vendors with the couple&apos;s consent and reviewed before publishing.</p>
      <form method="get" className="mt-4 flex gap-2 max-w-md">
        <label className="sr-only" htmlFor="venue">
          Filter by venue
        </label>
        <input id="venue" name="venue" className="input" placeholder="Filter by venue name" defaultValue={sp.venue ?? ""} />
        <button className="btn btn-secondary" type="submit">
          Filter
        </button>
      </form>
      {weddings.length === 0 ? (
        <div className="mt-8">
          <Empty title="No published weddings match" body="Vendors can submit real weddings from their dashboard." action={<Link href="/vendor/weddings/new" className="btn btn-secondary">Submit a wedding</Link>} />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weddings.map((w) => (
            <li key={w.id} className="card overflow-hidden">
              <Link href={`/real-weddings/${w.slug}`} className="img-frame aspect-[4/3] block">
                {w.coverUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.coverUrl} alt={`${w.partnerAName} and ${w.partnerBName} at ${w.venueName}`} loading="lazy" width={640} height={480} />
                ) : null}
              </Link>
              <div className="p-4">
                <h2 className="font-semibold text-lg leading-tight">
                  <Link href={`/real-weddings/${w.slug}`} className="hover:underline">
                    {w.partnerAName} &amp; {w.partnerBName}
                  </Link>
                </h2>
                <div className="text-[13px] text-ink-3 mt-1">
                  {w.venueName}, {w.metro.name} · {formatMonth(w.eventDate)} · {w.credits.length} vendors credited
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
