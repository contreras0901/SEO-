import Link from "next/link";
import { db } from "@/lib/db";
import { adminSetWeddingStatus } from "@/lib/actions/admin";
import { StatusChip } from "@/components/ui";

export default async function AdminWeddingsPage() {
  const weddings = await db.realWedding.findMany({ orderBy: [{ status: "asc" }, { createdAt: "desc" }], include: { credits: { include: { vendor: true } }, submittedBy: true }, take: 200 });
  return (
    <ul className="divide-y divide-line card">
      {weddings.map((w) => (
        <li key={w.id} className="p-4 grid gap-2 md:grid-cols-[1fr_auto]">
          <div className="text-[14px]">
            <div className="font-semibold">
              {w.title} <StatusChip status={w.status} />
            </div>
            <div className="text-ink-2">
              {w.venueName} · submitted by {w.submittedBy?.name ?? "admin"} · {w.credits.length} credits ({w.credits.filter((c) => !c.vendor.isClaimed).length} unclaimed) · consent {w.consentConfirmed ? "confirmed" : "missing"}
            </div>
            <p className="text-[13px] text-ink-3 mt-1 line-clamp-2">{w.story}</p>
            {w.status === "PUBLISHED" ? (
              <Link href={`/real-weddings/${w.slug}`} className="underline text-[13px]">
                View
              </Link>
            ) : null}
          </div>
          <div className="flex gap-2">
            {["PUBLISHED", "REJECTED", "PENDING"].map((s) => (
              <form key={s} action={adminSetWeddingStatus}>
                <input type="hidden" name="weddingId" value={w.id} />
                <input type="hidden" name="status" value={s} />
                <button className={`btn btn-sm ${s === "PUBLISHED" ? "btn-primary" : "btn-secondary"}`} type="submit" disabled={w.status === s}>
                  {s === "PUBLISHED" ? "Publish" : s === "REJECTED" ? "Reject" : "Back to pending"}
                </button>
              </form>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
