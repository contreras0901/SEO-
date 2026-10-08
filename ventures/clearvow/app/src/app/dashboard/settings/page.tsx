import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Settings", robots: { index: false } };

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  return (
    <div className="max-w-xl space-y-4 text-[14px]">
      <div className="card p-4">
        <div className="font-semibold">Wedding details</div>
        <p className="text-ink-2 mt-1">Partner names, pronouns, date, city, guests, and budget.</p>
        <Link href="/start" className="btn btn-secondary btn-sm mt-3">
          Edit
        </Link>
      </div>
      <div className="card p-4">
        <div className="font-semibold">Verification</div>
        <p className="text-ink-2 mt-1">
          Email {user.emailVerifiedAt ? "verified" : "not verified"} · Phone {user.phoneVerifiedAt ? "verified" : "not verified"}
        </p>
        <Link href="/dashboard/verify" className="btn btn-secondary btn-sm mt-3">
          Manage
        </Link>
      </div>
      <div className="card p-4">
        <div className="font-semibold">Your data</div>
        <p className="text-ink-2 mt-1">Export or delete your account by emailing privacy@clearvow.example. Self-serve export and deletion ship before public launch (see the privacy policy).</p>
      </div>
    </div>
  );
}
