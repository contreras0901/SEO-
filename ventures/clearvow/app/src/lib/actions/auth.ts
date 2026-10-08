"use server";

import { redirect } from "next/navigation";
import { db } from "../db";
import { createSession, destroySession, generateCode, hashCode, hashPassword, verifyPassword } from "../auth";
import { signInSchema, signUpSchema, flattenErrors } from "../validation";
import { sendEmail } from "../notify";
import { track } from "../analytics";
import type { ActionState } from "./types";

function safeNext(next: unknown): string | null {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) return null;
  return next;
}

export async function signUp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role") || "COUPLE",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const { email, password, role } = parsed.data;
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return { ok: false, errors: { email: "An account with this email already exists. Sign in instead." } };
  const user = await db.user.create({ data: { email, passwordHash: await hashPassword(password), role } });
  await createSession(user.id);
  await issueEmailCode(user.id, email);
  await track("sign_up", { role }, user.id);
  const next = safeNext(formData.get("next"));
  redirect(next ?? (role === "VENDOR" ? "/claim" : "/start"));
}

export async function signIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signInSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const user = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, errors: { _: "That email and password do not match." } };
  }
  await createSession(user.id);
  await track("sign_in", {}, user.id);
  const next = safeNext(formData.get("next"));
  redirect(next ?? (user.role === "ADMIN" ? "/admin" : user.role === "VENDOR" ? "/vendor" : "/dashboard"));
}

export async function signOut(): Promise<void> {
  await destroySession();
  redirect("/");
}

export async function issueEmailCode(userId: string, email: string): Promise<void> {
  const code = generateCode();
  await db.verificationCode.create({
    data: { userId, channel: "EMAIL", codeHash: hashCode(code), expiresAt: new Date(Date.now() + 30 * 60_000) },
  });
  await sendEmail(email, "Your Clearvow verification code", `Your code is ${code}. It expires in 30 minutes.`);
}

export async function issueSmsCode(userId: string, phone: string): Promise<void> {
  const code = generateCode();
  await db.verificationCode.create({
    data: { userId, channel: "SMS", codeHash: hashCode(code), expiresAt: new Date(Date.now() + 10 * 60_000) },
  });
  const { sendSms } = await import("../notify");
  await sendSms(phone, `Clearvow code: ${code}`);
}

/** Verifies a code for the signed-in user; on success, marks the channel verified and releases pending inquiries. */
export async function verifyCode(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { getCurrentUser } = await import("../auth");
  const user = await getCurrentUser();
  if (!user) return { ok: false, errors: { _: "Sign in first." } };
  const channel = String(formData.get("channel")) === "SMS" ? "SMS" : "EMAIL";
  const code = String(formData.get("code") || "").trim();
  if (!/^\d{6}$/.test(code)) return { ok: false, errors: { code: "Enter the 6-digit code." } };
  const rec = await db.verificationCode.findFirst({
    where: { userId: user.id, channel, codeHash: hashCode(code), consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!rec) return { ok: false, errors: { code: "That code is wrong or expired. Request a new one." } };
  await db.verificationCode.update({ where: { id: rec.id }, data: { consumedAt: new Date() } });
  await db.user.update({ where: { id: user.id }, data: channel === "SMS" ? { phoneVerifiedAt: new Date() } : { emailVerifiedAt: new Date() } });
  const { releasePendingInquiries } = await import("./inquiries");
  await releasePendingInquiries(user.id);
  await track("verify_" + channel.toLowerCase(), {}, user.id);
  return { ok: true, message: channel === "SMS" ? "Phone verified." : "Email verified." };
}

export async function resendCode(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { getCurrentUser } = await import("../auth");
  const user = await getCurrentUser();
  if (!user) return { ok: false, errors: { _: "Sign in first." } };
  const channel = String(formData.get("channel")) === "SMS" ? "SMS" : "EMAIL";
  const recent = await db.verificationCode.count({ where: { userId: user.id, channel, createdAt: { gt: new Date(Date.now() - 10 * 60_000) } } });
  if (recent >= 3) return { ok: false, errors: { _: "Too many codes requested. Wait 10 minutes." } };
  if (channel === "SMS") {
    const phone = String(formData.get("phone") || user.phone || "").trim();
    if (phone.length < 7) return { ok: false, errors: { phone: "Enter a mobile number." } };
    await db.user.update({ where: { id: user.id }, data: { phone } });
    await issueSmsCode(user.id, phone);
  } else {
    await issueEmailCode(user.id, user.email);
  }
  return { ok: true, message: "Code sent." };
}
