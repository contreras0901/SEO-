import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { PLEDGE_TEXT } from "@/lib/pledge";

export const revalidate = 600;
export const metadata: Metadata = { title: "The Welcomes Every Couple pledge", description: "Every vendor listed on Clearvow signs this pledge. It is one checkbox and it is public on their profile." };

export default async function PledgePage() {
  const count = await db.vendor.count({ where: { status: "LIVE", pledgeSignedAt: { not: null } } });
  return (
    <div className="container-x py-10 max-w-3xl">
      <h1 className="text-3xl md:text-5xl font-semibold">Welcomes Every Couple</h1>
      <p className="text-ink-2 mt-3">Every vendor listed on Clearvow signs this pledge before going live. It appears on their profile and you can filter by it. {count} listed vendors have signed it so far.</p>
      <ol className="mt-8 space-y-4">
        {PLEDGE_TEXT.map((line, i) => (
          <li key={i} className="card p-4 flex gap-4">
            <span className="serif text-2xl text-teal tnum">{i + 1}</span>
            <span className="text-[16px]">{line}</span>
          </li>
        ))}
      </ol>
      <h2 className="text-2xl font-semibold mt-10">How it is enforced</h2>
      <p className="text-ink-2 mt-2">A couple who experiences a breach can report it from the vendor&apos;s profile or any inquiry. A human reviews each report. A confirmed breach suspends the listing. We also make this easy to get right: our inquiry form gives vendors each partner&apos;s name and pronouns up front, so there is nothing to guess.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/vendors?pledge=1" className="btn btn-primary">
          Browse pledged vendors
        </Link>
        <Link href="/claim" className="btn btn-secondary">
          Vendors: sign and list
        </Link>
      </div>
    </div>
  );
}
