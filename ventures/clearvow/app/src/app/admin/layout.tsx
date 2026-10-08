import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/sign-in?next=/admin");
  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <nav className="flex gap-1" aria-label="Admin">
          <Link href="/admin" className="btn btn-secondary btn-sm">
            Overview
          </Link>
          <Link href="/admin/vendors" className="btn btn-secondary btn-sm">
            Vendors
          </Link>
          <Link href="/admin/weddings" className="btn btn-secondary btn-sm">
            Real weddings
          </Link>
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
