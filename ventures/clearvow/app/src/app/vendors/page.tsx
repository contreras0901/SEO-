import type { Metadata } from "next";
import Link from "next/link";
import { listCategories, listMetros, searchVendors, type SearchParams } from "@/lib/queries";
import { VendorCard } from "@/components/VendorCard";
import { VendorFilters } from "@/components/VendorFilters";
import { Empty } from "@/components/ui";

export const metadata: Metadata = { title: "Find wedding vendors with published prices", description: "Search wedding vendors by category, city, and budget. Every listing shows a starting price and a typical range." };

export default async function VendorsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const [cats, metros, result] = await Promise.all([listCategories(), listMetros(), searchVendors(sp)]);
  const qs = new URLSearchParams(Object.entries(sp).filter(([k, v]) => v && k !== "page") as [string, string][]);
  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-semibold">Wedding vendors with published prices</h1>
      <p className="text-ink-2 mt-2">
        {result.total} listed{sp.metro ? ` in ${metros.find((m) => m.slug === sp.metro)?.name ?? sp.metro}` : ""}. Sorted by response rate, quote accuracy, and completeness.{" "}
        <Link href="/trust" className="underline">
          How ranking works
        </Link>
        .
      </p>
      <div className="mt-6">
        <VendorFilters cats={cats} metros={metros} current={sp} />
      </div>
      {result.items.length === 0 ? (
        <div className="mt-8">
          <Empty title="No vendors match those filters yet" body="Try a wider budget band or another category. Vendors who have not published prices are not shown." action={<Link href="/vendors" className="btn btn-secondary">Clear filters</Link>} />
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
      {result.pages > 1 ? (
        <nav className="mt-8 flex gap-2 justify-center" aria-label="Pagination">
          {Array.from({ length: result.pages }, (_, i) => i + 1).map((p) => (
            <Link key={p} href={`/vendors?${qs.toString()}&page=${p}`} className={`btn btn-sm ${p === result.page ? "btn-primary" : "btn-secondary"}`} aria-current={p === result.page ? "page" : undefined}>
              {p}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
