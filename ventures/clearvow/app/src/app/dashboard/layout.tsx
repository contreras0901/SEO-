import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/dashboard");
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  const tabs = [
    ["/dashboard", "Vendor team"],
    ["/dashboard/inquiries", "Inquiries"],
    ["/dashboard/budget", "Budget"],
    ["/dashboard/saved", "Saved"],
    ["/dashboard/settings", "Settings"],
  ];
  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{couple ? `${couple.partnerAName} & ${couple.partnerBName}` : "Your planning"}</h1>
          {!user.emailVerifiedAt || !user.phoneVerifiedAt ? (
            <p className="text-[13px] text-ink-2 mt-1">
              <Link href="/dashboard/verify" className="underline">
                Verify your email and phone
              </Link>{" "}
              so your inquiries are delivered.
            </p>
          ) : null}
        </div>
        <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto">
          {tabs.map(([href, label]) => (
            <Link key={href} href={href} className="btn btn-secondary btn-sm whitespace-nowrap">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
