import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "./db";

const COOKIE = "cv_session";
const SESSION_DAYS = 30;

function hashToken(token: string): string {
  return createHash("sha256").update(token + (process.env.SESSION_SECRET ?? "")).digest("hex");
}

export async function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 12);
}

export async function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400_000);
  await db.session.create({ data: { userId, tokenHash: hashToken(token), expiresAt } });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  jar.delete(COOKIE);
}

export type CurrentUser = {
  id: string;
  email: string;
  role: string;
  name: string | null;
  phone: string | null;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt < new Date()) return null;
  const u = session.user;
  return {
    id: u.id,
    email: u.email,
    role: u.role,
    name: u.name,
    phone: u.phone,
    emailVerifiedAt: u.emailVerifiedAt,
    phoneVerifiedAt: u.phoneVerifiedAt,
  };
}

export async function requireUser(role?: "COUPLE" | "VENDOR" | "ADMIN"): Promise<CurrentUser> {
  const u = await getCurrentUser();
  if (!u) throw new AuthError("sign-in");
  if (role && u.role !== role && u.role !== "ADMIN") throw new AuthError("forbidden");
  return u;
}

export class AuthError extends Error {
  constructor(public kind: "sign-in" | "forbidden") {
    super(kind);
  }
}

/** Six-digit verification code helpers (email and SMS). */
export function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashCode(code: string): string {
  return createHash("sha256").update(code + (process.env.SESSION_SECRET ?? "")).digest("hex");
}
