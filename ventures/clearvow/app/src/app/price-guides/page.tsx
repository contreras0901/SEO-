import type { Metadata } from "next";
import Link from "next/link";
import { listCategories, listMetros } from "@/lib/queries";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money } from "@/lib/format";

export const revalidate = 3600;
export const metadata: Metadata = { title: "Wedding price guides from published vendor prices", description: "What wedding vendors cost, computed from prices vendors publish and confirm on Clearvow. Updated continuously." };

export default async function PriceGuidesIndex() {
  const [metros, cats] = await Promise.all([listMetros(), listCategories()]);
  return (
    <div className="container-x py-8">
      <h1 className="text-3xl md:text-4xl font-semibold">Wedding price guides</h1>
      <p className="text-ink-2 mt-2 max-w-2xl">Not survey averages. These guides are computed from prices that vendors publish and confirm on their own profiles, so they move when the market moves.</p>
      {await Promise.all(
        metros.map(async (m) => {
          const rows = await Promise.all(cats.map(async (c) => ({ c, s: await metroCategoryPriceStats(m.id, c.id) })));
          return (
            <section key={m.id} className="mt-8">
              <h2 className="text-2xl font-semibold">{m.name}</h2>
              <table className="w-full mt-3 text-[14px] tnum">
                <thead className="text-left text-ink-3 text-[12px]">
                  <tr>
                    <th className="py-2">Category</th>
                    <th className="py-2">Listed</th>
                    <th className="py-2">Median start</th>
                    <th className="py-2">Typical range</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map(({ c, s }) => (
                    <tr key={c.id}>
                      <td className="py-2 font-medium">{c.name}</td>
                      <td className="py-2">{s.count}</td>
                      <td className="py-2 price">{money(s.medianStart)}</td>
                      <td className="py-2">
                        {money(s.medianLow)} to {money(s.medianHigh)}
                      </td>
                      <td className="py-2 text-right">
                        <Link href={`/price-guides/${m.slug}/${c.slug}`} className="underline">
                          Guide
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          );
        }),
      )}
    </div>
  );
}
