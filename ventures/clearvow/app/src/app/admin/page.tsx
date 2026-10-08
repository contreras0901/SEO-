import { db } from "@/lib/db";
import { Stat } from "@/components/ui";

export default async function AdminHome() {
  const since7 = new Date(Date.now() - 7 * 86400_000);
  const [pendingVendors, liveVendors, paid, pendingWeddings, inquiries7, couples, events7, unverified] = await Promise.all([
    db.vendor.count({ where: { status: "PENDING" } }),
    db.vendor.count({ where: { status: "LIVE" } }),
    db.vendor.count({ where: { plan: { not: "FREE" } } }),
    db.realWedding.count({ where: { status: "PENDING" } }),
    db.inquiry.count({ where: { createdAt: { gt: since7 }, status: { not: "PENDING_VERIFICATION" } } }),
    db.couple.count(),
    db.analyticsEvent.groupBy({ by: ["name"], _count: { _all: true }, where: { createdAt: { gt: since7 } } }),
    db.inquiry.count({ where: { status: "PENDING_VERIFICATION" } }),
  ]);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Vendors awaiting review" value={String(pendingVendors)} />
        <Stat label="Live vendors" value={String(liveVendors)} />
        <Stat label="Paying vendors" value={String(paid)} />
        <Stat label="Weddings awaiting review" value={String(pendingWeddings)} />
        <Stat label="Verified inquiries, 7 days" value={String(inquiries7)} />
        <Stat label="Inquiries held for verification" value={String(unverified)} />
        <Stat label="Couple accounts" value={String(couples)} />
      </div>
      <h2 className="text-lg font-semibold mt-8">Events, last 7 days</h2>
      <table className="mt-3 text-[14px] tnum">
        <tbody className="divide-y divide-line">
          {events7
            .sort((a, b) => b._count._all - a._count._all)
            .map((e) => (
              <tr key={e.name}>
                <td className="py-1 pr-6 font-mono text-[13px]">{e.name}</td>
                <td className="py-1">{e._count._all}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
