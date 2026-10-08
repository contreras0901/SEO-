import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "./db";
import { getCurrentUser } from "./auth";

export const ACTIVE_VENDOR_COOKIE = "cv_vendor";

/** Resolves the signed-in vendor user and their vendor record, redirecting as needed. */
export async function requireVendor() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor");
  if (user.role === "COUPLE") redirect("/dashboard");
  const include = { category: true, metro: true, packages: { orderBy: { sortOrder: "asc" as const } }, images: { orderBy: { sortOrder: "asc" as const } } };
  const owned = await db.vendor.findMany({ where: { ownerId: user.id }, include, orderBy: { createdAt: "asc" } });
  if (owned.length === 0) redirect("/claim");
  const jar = await cookies();
  const activeId = jar.get(ACTIVE_VENDOR_COOKIE)?.value;
  const vendor = owned.find((v) => v.id === activeId) ?? owned[0];
  return { user, vendor, owned };
}
