import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { vendorCardInclude } from "@/lib/queries";
import { VendorCard } from "@/components/VendorCard";
import { Empty } from "@/components/ui";

export const metadata = { title: "Saved vendors", robots: { index: false } };

export default async function SavedPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect("/start");
  const saved = await db.savedVendor.findMany({ where: { coupleId: couple.id }, include: { vendor: { include: vendorCardInclude } }, orderBy: { createdAt: "desc" } });
  if (saved.length === 0) return <Empty title="Nothing saved yet" body="Save vendors from their profiles to compare prices side by side." action={<Link href="/vendors" className="btn btn-primary">Find vendors</Link>} />;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {saved.map((s) => (
        <li key={s.vendorId}>
          <VendorCard v={s.vendor} />
        </li>
      ))}
    </ul>
  );
}
