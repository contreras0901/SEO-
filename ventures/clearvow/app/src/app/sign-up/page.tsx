import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signUp } from "@/lib/actions/auth";
import { ActionForm, Field } from "@/components/ActionForm";

export const metadata: Metadata = { title: "Create an account", robots: { index: false } };

export default async function SignUpPage({ searchParams }: { searchParams: Promise<{ next?: string; role?: string }> }) {
  const { next, role } = await searchParams;
  const user = await getCurrentUser();
  if (user) redirect(next && next.startsWith("/") ? next : "/dashboard");
  const isVendor = role === "VENDOR";
  return (
    <div className="container-x py-12 max-w-md">
      <h1 className="text-3xl font-semibold">{isVendor ? "Create a vendor account" : "Create your account"}</h1>
      <p className="text-ink-2 mt-2 text-[14px]">{isVendor ? "Free to list. Publish your prices, sign the pledge, and start receiving verified inquiries." : "Free for couples. Save vendors, send verified inquiries, and track every reply in one place."}</p>
      <div className="card p-6 mt-6">
        <ActionForm action={signUp} submitLabel="Create account">
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <input type="hidden" name="role" value={isVendor ? "VENDOR" : "COUPLE"} />
          <Field name="email" label="Email" required>
            <input id="email" name="email" type="email" autoComplete="email" className="input" required />
          </Field>
          <Field name="password" label="Password" hint="At least 10 characters" required>
            <input id="password" name="password" type="password" autoComplete="new-password" className="input" required minLength={10} />
          </Field>
          <p className="text-[12px] text-ink-3">
            By creating an account you agree to the{" "}
            <Link href="/legal/terms" className="underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </ActionForm>
      </div>
      <p className="text-[14px] text-ink-2 mt-4">
        {isVendor ? (
          <Link href={`/sign-up${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="underline">
            Planning a wedding instead?
          </Link>
        ) : (
          <Link href="/sign-up?role=VENDOR&next=/claim" className="underline">
            Are you a vendor?
          </Link>
        )}{" "}
        ·{" "}
        <Link href={`/sign-in${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
