import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { resendCode, verifyCode } from "@/lib/actions/auth";
import { ActionForm, Field } from "@/components/ActionForm";
import { Notice } from "@/components/ui";
import { isNotifyConfigured } from "@/lib/notify";

export const metadata = { title: "Verify", robots: { index: false } };

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/dashboard/verify");
  const cfg = isNotifyConfigured();
  const done = user.emailVerifiedAt && user.phoneVerifiedAt;
  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold">Verify once, then every inquiry is trusted</h2>
      <p className="text-[14px] text-ink-2 mt-1">Vendors only receive inquiries from verified couples. That is why they take yours seriously.</p>
      {done ? (
        <div className="mt-4">
          <Notice kind="ok">
            You are fully verified.{" "}
            {next ? (
              <Link href={next} className="underline">
                Continue
              </Link>
            ) : (
              <Link href="/dashboard/inquiries" className="underline">
                See your inquiries
              </Link>
            )}
          </Notice>
        </div>
      ) : null}
      {!cfg.email || !cfg.sms ? (
        <div className="mt-4">
          <Notice kind="info">Development mode: {!cfg.email ? "email" : ""}{!cfg.email && !cfg.sms ? " and " : ""}{!cfg.sms ? "SMS" : ""} delivery is not configured, so codes are printed to the server console.</Notice>
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="card p-4">
          <div className="font-semibold">Email {user.emailVerifiedAt ? "✓" : ""}</div>
          <div className="text-[13px] text-ink-3">{user.email}</div>
          {!user.emailVerifiedAt ? (
            <div className="mt-3 space-y-3">
              <ActionForm action={verifyCode} submitLabel="Verify email" submitVariant="secondary">
                <input type="hidden" name="channel" value="EMAIL" />
                <Field name="code" label="6-digit code">
                  <input id="code" name="code" inputMode="numeric" pattern="[0-9]*" maxLength={6} className="input" />
                </Field>
              </ActionForm>
              <ActionForm action={resendCode} submitLabel="Send a new email code" submitVariant="secondary">
                <input type="hidden" name="channel" value="EMAIL" />
              </ActionForm>
            </div>
          ) : null}
        </div>
        <div className="card p-4">
          <div className="font-semibold">Mobile {user.phoneVerifiedAt ? "✓" : ""}</div>
          <div className="text-[13px] text-ink-3">{user.phone ?? "No number yet"}</div>
          {!user.phoneVerifiedAt ? (
            <div className="mt-3 space-y-3">
              <ActionForm action={resendCode} submitLabel="Send SMS code" submitVariant="secondary">
                <input type="hidden" name="channel" value="SMS" />
                <Field name="phone" label="Mobile number">
                  <input id="phone" name="phone" type="tel" className="input" defaultValue={user.phone ?? ""} placeholder="+1 619 555 0100" />
                </Field>
              </ActionForm>
              <ActionForm action={verifyCode} submitLabel="Verify phone" submitVariant="secondary">
                <input type="hidden" name="channel" value="SMS" />
                <Field name="code" label="6-digit code">
                  <input id="code-sms" name="code" inputMode="numeric" pattern="[0-9]*" maxLength={6} className="input" />
                </Field>
              </ActionForm>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
