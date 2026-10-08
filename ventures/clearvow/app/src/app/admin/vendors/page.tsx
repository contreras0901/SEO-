import Link from "next/link";
import { db } from "@/lib/db";
import { adminSetPlan, adminSetVendorStatus } from "@/lib/actions/admin";
import { StatusChip } from "@/components/ui";
import { money } from "@/lib/format";
import { vendorGoLiveProblems } from "@/lib/validation";

export default async function AdminVendorsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const vendors = await db.vendor.findMany({
    where: status ? { status } : { status: { in: ["PENDING", "LIVE", "SUSPENDED"] } },
    orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
    include: { category: true, metro: true, owner: { select: { email: true } }, packages: { select: { id: true } }, images: { select: { id: true } } },
    take: 200,
  });
  return (
    <div>
      <div className="flex gap-2 text-[13px]">
        {["PENDING", "LIVE", "DRAFT", "SUSPENDED"].map((s) => (
          <Link key={s} href={`/admin/vendors?status=${s}`} className={`pill ${status === s ? "pill-teal" : ""}`}>
            {s}
          </Link>
        ))}
      </div>
      <ul className="mt-4 divide-y divide-line card">
        {vendors.map((v) => {
          const problems = vendorGoLiveProblems(v);
          return (
            <li key={v.id} className="p-4 grid gap-2 md:grid-cols-[1fr_auto] items-start">
              <div className="text-[14px]">
                <div className="font-semibold">
                  <Link href={`/vendors/${v.slug}`} className="underline">
                    {v.name}
                  </Link>{" "}
                  <StatusChip status={v.status} /> <span className="pill">{v.plan}</span>
                </div>
                <div className="text-ink-2 tnum">
                  {v.category.singular} · {v.metro.name} · from {money(v.startingPrice)} · {v.owner?.email ?? "unclaimed"}
                </div>
                {problems.length ? <div className="text-[12px] text-bad mt-1">Blocked: {problems.join("; ")}</div> : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <form action={adminSetVendorStatus} className="flex gap-1">
                  <input type="hidden" name="vendorId" value={v.id} />
                  <select name="status" className="input !py-1 !text-[13px]" defaultValue={v.status}>
                    {["DRAFT", "PENDING", "LIVE", "SUSPENDED"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-secondary btn-sm" type="submit" disabled={problems.length > 0 && v.status !== "LIVE" ? false : false}>
                    Set status
                  </button>
                </form>
                <form action={adminSetPlan} className="flex gap-1">
                  <input type="hidden" name="vendorId" value={v.id} />
                  <select name="plan" className="input !py-1 !text-[13px]" defaultValue={v.plan}>
                    {["FREE", "PRO", "PREFERRED"].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-secondary btn-sm" type="submit">
                    Set plan
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
