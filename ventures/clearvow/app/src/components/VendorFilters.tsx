import { BUDGET_BANDS } from "@/lib/validation";

export function VendorFilters({
  cats,
  metros,
  current,
  action = "/vendors",
  lockCategory,
  lockMetro,
}: {
  cats: { slug: string; name: string }[];
  metros: { slug: string; name: string; state: string }[];
  current: { category?: string; metro?: string; budget?: string; pledge?: string; q?: string };
  action?: string;
  lockCategory?: boolean;
  lockMetro?: boolean;
}) {
  return (
    <form action={action} method="get" className="card p-4 grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_auto] items-end" aria-label="Filter vendors">
      {lockCategory ? (
        <input type="hidden" name="category" value={current.category} />
      ) : (
        <div>
          <label htmlFor="f-category" className="block text-[12px] font-medium text-ink-3 mb-1">
            Category
          </label>
          <select id="f-category" name="category" className="input" defaultValue={current.category ?? ""}>
            <option value="">All categories</option>
            {cats.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {lockMetro ? (
        <input type="hidden" name="metro" value={current.metro} />
      ) : (
        <div>
          <label htmlFor="f-metro" className="block text-[12px] font-medium text-ink-3 mb-1">
            City
          </label>
          <select id="f-metro" name="metro" className="input" defaultValue={current.metro ?? ""}>
            <option value="">All cities</option>
            {metros.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.name}, {m.state}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label htmlFor="f-budget" className="block text-[12px] font-medium text-ink-3 mb-1">
          Budget for this category
        </label>
        <select id="f-budget" name="budget" className="input" defaultValue={current.budget ?? ""}>
          <option value="">Any budget</option>
          {BUDGET_BANDS.map((b, i) => (
            <option key={b.label} value={i}>
              {b.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-q" className="block text-[12px] font-medium text-ink-3 mb-1">
          Style or name
        </label>
        <input id="f-q" name="q" className="input" defaultValue={current.q ?? ""} placeholder="documentary, garden, bilingual…" />
      </div>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-[13px] whitespace-nowrap">
          <input type="checkbox" name="pledge" value="1" defaultChecked={current.pledge === "1"} />
          Pledge signed
        </label>
        <button className="btn btn-primary" type="submit">
          Filter
        </button>
      </div>
    </form>
  );
}
