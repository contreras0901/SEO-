import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Empty, StatusChip } from "@/components/ui";
import { formatDate, relative } from "@/lib/format";

export const metadata = { title: "Inquiries", robots: { index: false } };

export default async function InquiriesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect("/start");
  const inquiries = await db.inquiry.findMany({ where: { coupleId: couple.id }, orderBy: { createdAt: "desc" }, include: { vendor: { include: { category: true } }, messages: { orderBy: { createdAt: "desc" }, take: 1 } } });
  if (inquiries.length === 0) return <Empty title="No inquiries yet" body="Find a vendor whose published price fits and send a structured inquiry." action={<Link href="/vendors" className="btn btn-primary">Find vendors</Link>} />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[14px] min-w-[640px]">
        <thead className="text-left text-[12px] text-ink-3">
          <tr>
            <th className="py-2">Vendor</th>
            <th className="py-2">Sent</th>
            <th className="py-2">Status</th>
            <th className="py-2">Last message</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {inquiries.map((i) => (
            <tr key={i.id}>
              <td className="py-3">
                <Link href={`/dashboard/inquiries/${i.id}`} className="font-medium underline">
                  {i.vendor.name}
                </Link>
                <div className="text-[12px] text-ink-3">{i.vendor.category.singular}</div>
              </td>
              <td className="py-3 text-ink-2">{relative(i.createdAt)}</td>
              <td className="py-3">
                <StatusChip status={i.status} />
              </td>
              <td className="py-3 text-ink-2 max-w-[260px] truncate">{i.messages[0]?.body ?? "—"}</td>
              <td className="py-3 text-ink-2">{formatDate(i.eventDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
