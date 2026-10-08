import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { updateBudget } from "@/lib/actions/couple";
import { ActionForm } from "@/components/ActionForm";
import { listCategories } from "@/lib/queries";
import { metroCategoryPriceStats } from "@/lib/stats";
import { money } from "@/lib/format";

export const metadata = { title: "Budget", robots: { index: false } };

export default async function BudgetPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const couple = await db.couple.findUnique({ where: { userId: user.id }, include: { budgetItems: true, metro: true } });
  if (!couple) redirect("/start");
  const cats = await listCategories();
  const medians = couple.metro ? await Promise.all(cats.map(async (c) => ({ slug: c.slug, s: await metroCategoryPriceStats(couple.metro!.id, c.id) }))) : [];
  const planned = couple.budgetItems.reduce((a, b) => a + b.planned, 0);
  const actual = couple.budgetItems.reduce((a, b) => a + b.actual, 0);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3 text-[14px]">
        <div className="card p-4">
          <div className="text-ink-3 text-[12px]">Total budget</div>
          <div className="text-2xl font-semibold tnum">{money(couple.budgetTotal)}</div>
        </div>
        <div className="card p-4">
          <div className="text-ink-3 text-[12px]">Planned across categories</div>
          <div className={`text-2xl font-semibold tnum ${couple.budgetTotal && planned > couple.budgetTotal ? "text-bad" : ""}`}>{money(planned)}</div>
        </div>
        <div className="card p-4">
          <div className="text-ink-3 text-[12px]">Spent so far</div>
          <div className="text-2xl font-semibold tnum">{money(actual)}</div>
        </div>
      </div>
      <div className="card p-4 mt-6 overflow-x-auto">
        <ActionForm action={updateBudget} submitLabel="Save budget">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto] items-end">
            <label className="text-[14px] font-medium" htmlFor="budgetTotal">
              Total budget
            </label>
            <input id="budgetTotal" name="budgetTotal" type="number" min={0} step={500} className="input max-w-[200px]" defaultValue={couple.budgetTotal ?? ""} />
          </div>
          <table className="w-full text-[14px] min-w-[560px]">
            <thead className="text-left text-[12px] text-ink-3">
              <tr>
                <th className="py-2">Category</th>
                <th className="py-2">Planned</th>
                <th className="py-2">Actual</th>
                <th className="py-2">{couple.metro?.name ?? "Market"} median start</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {cats.map((c) => {
                const item = couple.budgetItems.find((b) => b.categoryId === c.id);
                const med = medians.find((m) => m.slug === c.slug)?.s;
                return (
                  <tr key={c.id}>
                    <td className="py-2 font-medium">
                      <label htmlFor={`planned_${c.slug}`}>{c.name}</label>
                    </td>
                    <td className="py-2">
                      <input id={`planned_${c.slug}`} name={`planned_${c.slug}`} type="number" min={0} className="input max-w-[140px]" defaultValue={item?.planned ?? 0} />
                    </td>
                    <td className="py-2">
                      <input aria-label={`${c.name} actual`} name={`actual_${c.slug}`} type="number" min={0} className="input max-w-[140px]" defaultValue={item?.actual ?? 0} />
                    </td>
                    <td className="py-2 text-ink-2 tnum">{med?.count ? `${money(med.medianStart)} (${med.count} listed)` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ActionForm>
      </div>
    </div>
  );
}
