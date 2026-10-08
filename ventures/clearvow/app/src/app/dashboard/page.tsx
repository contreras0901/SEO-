import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { listCategories } from "@/lib/queries";
import { money } from "@/lib/format";
import { StatusChip } from "@/components/ui";

export const metadata = { title: "Vendor team", robots: { index: false } };

export default async function DashboardHome() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const couple = await db.couple.findUnique({
    where: { userId: user.id },
    include: { metro: true, budgetItems: true, saved: { include: { vendor: { include: { category: true } } } }, inquiries: { include: { vendor: { include: { category: true } } }, orderBy: { createdAt: "desc" } } },
  });
  if (!couple) redirect("/start");
  const cats = await listCategories();
  return (
    <div>
      <p className="text-ink-2 text-[14px]">
        {couple.metro?.name ?? "City to be decided"} · {couple.weddingDate ? couple.weddingDate.toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" }) : "date to be decided"} · {couple.guestCount ?? "?"} guests · budget {money(couple.budgetTotal)}
      </p>
      <h2 className="text-xl font-semibold mt-6">Your vendor team</h2>
      <p className="text-[13px] text-ink-3">One slot per category. Save vendors from any profile; inquiries show up here with their status.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c) => {
          const budget = couple.budgetItems.find((b) => b.categoryId === c.id);
          const inqs = couple.inquiries.filter((i) => i.categoryId === c.id && i.status !== "CLOSED");
          const saved = couple.saved.filter((s) => s.vendor.categoryId === c.id);
          const booked = inqs.find((i) => i.status === "REPLIED");
          return (
            <li key={c.id} className="card p-4">
              <div className="flex justify-between items-baseline">
                <div className="font-semibold">{c.name}</div>
                <div className="text-[12px] text-ink-3 tnum">planned {money(budget?.planned ?? 0)}</div>
              </div>
              {booked ? (
                <div className="mt-2 text-[14px]">
                  <Link href={`/dashboard/inquiries/${booked.id}`} className="underline font-medium">
                    {booked.vendor.name}
                  </Link>{" "}
                  <StatusChip status={booked.status} />
                </div>
              ) : inqs.length ? (
                <div className="mt-2 text-[14px]">
                  {inqs.length} open {inqs.length === 1 ? "inquiry" : "inquiries"} ·{" "}
                  <Link href="/dashboard/inquiries" className="underline">
                    view
                  </Link>
                </div>
              ) : saved.length ? (
                <div className="mt-2 text-[14px]">
                  {saved.length} saved ·{" "}
                  <Link href={`/dashboard/saved`} className="underline">
                    compare
                  </Link>
                </div>
              ) : (
                <div className="mt-2 text-[14px]">
                  <Link href={`/${couple.metro?.slug ?? "san-diego"}/${c.slug}`} className="underline">
                    Find {c.name.toLowerCase()} in budget
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
