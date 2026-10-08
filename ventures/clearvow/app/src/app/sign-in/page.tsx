import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { signIn } from "@/lib/actions/auth";
import { ActionForm, Field } from "@/components/ActionForm";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const user = await getCurrentUser();
  if (user) redirect(next && next.startsWith("/") ? next : "/dashboard");
  return (
    <div className="container-x py-12 max-w-md">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <div className="card p-6 mt-6">
        <ActionForm action={signIn} submitLabel="Sign in">
          {next ? <input type="hidden" name="next" value={next} /> : null}
          <Field name="email" label="Email" required>
            <input id="email" name="email" type="email" autoComplete="email" className="input" required />
          </Field>
          <Field name="password" label="Password" required>
            <input id="password" name="password" type="password" autoComplete="current-password" className="input" required />
          </Field>
        </ActionForm>
      </div>
      <p className="text-[14px] text-ink-2 mt-4">
        New here?{" "}
        <Link href={`/sign-up${next ? `?next=${encodeURIComponent(next)}` : ""}`} className="underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
