"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { audit } from "../analytics";
import { sendEmail } from "../notify";
import { appUrl } from "../stripe";
import { PLAN_NAMES, VENDOR_STATUSES } from "../validation";

async function requireAdmin() {
  const u = await getCurrentUser();
  if (!u || u.role !== "ADMIN") redirect("/sign-in?next=/admin");
  return u;
}

export async function adminSetVendorStatus(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("vendorId") || "");
  const status = String(formData.get("status") || "");
  if (!(VENDOR_STATUSES as readonly string[]).includes(status)) return;
  const v = await db.vendor.findUnique({ where: { id }, include: { owner: true } });
  if (!v) return;
  await db.vendor.update({ where: { id }, data: { status } });
  await audit(admin.id, "admin.vendor.status", "Vendor", id, { from: v.status, to: status });
  if (status === "LIVE" && v.owner?.email) {
    await sendEmail(v.owner.email, "Your Clearvow profile is live", `Couples can now find ${v.name} with your published prices: ${appUrl(`/vendors/${v.slug}`)}`);
  }
  revalidatePath("/admin/vendors");
  revalidatePath(`/vendors/${v.slug}`);
  revalidatePath("/vendors");
}

export async function adminSetPlan(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("vendorId") || "");
  const plan = String(formData.get("plan") || "");
  if (!(PLAN_NAMES as readonly string[]).includes(plan)) return;
  const v = await db.vendor.findUnique({ where: { id } });
  if (!v) return;
  await db.vendor.update({ where: { id }, data: { plan } });
  await audit(admin.id, "admin.vendor.plan", "Vendor", id, { from: v.plan, to: plan, note: "manual override" });
  revalidatePath("/admin/vendors");
}

export async function adminSetWeddingStatus(formData: FormData): Promise<void> {
  const admin = await requireAdmin();
  const id = String(formData.get("weddingId") || "");
  const status = String(formData.get("status") || "");
  if (!["PUBLISHED", "REJECTED", "PENDING"].includes(status)) return;
  const w = await db.realWedding.findUnique({ where: { id }, include: { credits: { include: { vendor: { include: { owner: true } } } } } });
  if (!w) return;
  await db.realWedding.update({ where: { id }, data: { status, publishedAt: status === "PUBLISHED" ? new Date() : null } });
  await audit(admin.id, "admin.wedding.status", "RealWedding", id, { from: w.status, to: status });
  if (status === "PUBLISHED") {
    for (const c of w.credits) {
      const to = c.vendor.owner?.email || c.vendor.contactEmail;
      if (!to) continue;
      await sendEmail(to, `${w.title} is live, and you are credited`, `Your work as ${c.role} is credited on ${appUrl(`/real-weddings/${w.slug}`)}. ${c.vendor.isClaimed ? "" : `Claim your free profile: ${appUrl("/claim")}`}`);
    }
  }
  revalidatePath("/admin/weddings");
  revalidatePath("/real-weddings");
  revalidatePath(`/real-weddings/${w.slug}`);
}
