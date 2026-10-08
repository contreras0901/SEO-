import "server-only";
import { redirect } from "next/navigation";
import { db } from "./db";
import { getCurrentUser } from "./auth";

/** Resolves the signed-in vendor user and their vendor record, redirecting as needed. */
export async function requireVendor() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor");
  if (user.role === "COUPLE") redirect("/dashboard");
  const vendor = await db.vendor.findFirst({
    where: { ownerId: user.id },
    include: { category: true, metro: true, packages: { orderBy: { sortOrder: "asc" } }, images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { createdAt: "asc" },
  });
  if (!vendor) redirect("/claim");
  return { user, vendor };
}
