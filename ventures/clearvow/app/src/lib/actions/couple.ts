"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { coupleOnboardingSchema, flattenErrors, quoteFeedbackSchema, reviewSchema } from "../validation";
import { track } from "../analytics";
import { recomputeVendorStats } from "../stats";
import type { ActionState } from "./types";

// Default allocation of a total budget across categories (ASSUMPTION, tuned from The Knot's
// published category averages; shown to couples as a starting point, fully editable).
const DEFAULT_ALLOCATION: Record<string, number> = {
  venues: 0.3,
  catering: 0.22,
  photographers: 0.09,
  videographers: 0.04,
  florists: 0.08,
  "djs-and-bands": 0.05,
  planners: 0.07,
  "rentals-and-decor": 0.05,
  "cakes-and-desserts": 0.02,
  beauty: 0.02,
  stationery: 0.02,
  officiants: 0.01,
  transportation: 0.02,
  "restroom-trailers": 0.01,
};

export async function completeCoupleOnboarding(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-up?next=/start");
  const parsed = coupleOnboardingSchema.safeParse({
    partnerAName: formData.get("partnerAName"),
    partnerAPronouns: formData.get("partnerAPronouns") || "",
    partnerBName: formData.get("partnerBName"),
    partnerBPronouns: formData.get("partnerBPronouns") || "",
    metroSlug: formData.get("metroSlug"),
    weddingDate: formData.get("weddingDate") || "",
    guestCount: formData.get("guestCount") || undefined,
    budgetTotal: formData.get("budgetTotal") || undefined,
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;
  const metro = await db.metro.findUnique({ where: { slug: d.metroSlug } });
  if (!metro) return { ok: false, errors: { metroSlug: "Pick a city we serve." } };
  const weddingDate = d.weddingDate ? new Date(d.weddingDate + "T00:00:00Z") : null;
  const data = {
    partnerAName: d.partnerAName,
    partnerAPronouns: d.partnerAPronouns || null,
    partnerBName: d.partnerBName,
    partnerBPronouns: d.partnerBPronouns || null,
    metroId: metro.id,
    weddingDate,
    guestCount: d.guestCount ?? null,
    budgetTotal: d.budgetTotal ?? null,
  };
  const couple = await db.couple.upsert({ where: { userId: user.id }, create: { userId: user.id, ...data }, update: data });
  await db.user.update({ where: { id: user.id }, data: { name: `${d.partnerAName} & ${d.partnerBName}` } });
  if (d.budgetTotal) {
    const cats = await db.category.findMany();
    for (const c of cats) {
      const share = DEFAULT_ALLOCATION[c.slug] ?? 0;
      await db.budgetItem.upsert({
        where: { coupleId_categoryId: { coupleId: couple.id, categoryId: c.id } },
        create: { coupleId: couple.id, categoryId: c.id, planned: Math.round(d.budgetTotal * share) },
        update: {},
      });
    }
  }
  await track("couple_onboarded", { metro: metro.slug, hasBudget: Boolean(d.budgetTotal) }, user.id);
  const next = formData.get("next");
  redirect(typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard");
}

export async function toggleSaveVendor(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  const vendorSlug = String(formData.get("vendorSlug") || "");
  if (!user) redirect(`/sign-up?next=/vendors/${vendorSlug}`);
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect("/start");
  const vendor = await db.vendor.findUnique({ where: { slug: vendorSlug } });
  if (!vendor) return;
  const existing = await db.savedVendor.findUnique({ where: { coupleId_vendorId: { coupleId: couple.id, vendorId: vendor.id } } });
  if (existing) {
    await db.savedVendor.delete({ where: { coupleId_vendorId: { coupleId: couple.id, vendorId: vendor.id } } });
  } else {
    await db.savedVendor.create({ data: { coupleId: couple.id, vendorId: vendor.id } });
    await track("vendor_saved", { vendor: vendor.slug }, user.id, vendor.id);
  }
  revalidatePath(`/vendors/${vendorSlug}`);
  revalidatePath("/dashboard/saved");
}

export async function updateBudget(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/dashboard/budget");
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect("/start");
  const cats = await db.category.findMany();
  for (const c of cats) {
    const planned = Math.max(0, Math.round(Number(formData.get(`planned_${c.slug}`) || 0)));
    const actual = Math.max(0, Math.round(Number(formData.get(`actual_${c.slug}`) || 0)));
    await db.budgetItem.upsert({
      where: { coupleId_categoryId: { coupleId: couple.id, categoryId: c.id } },
      create: { coupleId: couple.id, categoryId: c.id, planned, actual },
      update: { planned, actual },
    });
  }
  const total = Number(formData.get("budgetTotal") || 0);
  if (total > 0) await db.couple.update({ where: { id: couple.id }, data: { budgetTotal: Math.round(total) } });
  revalidatePath("/dashboard/budget");
  return { ok: true, message: "Budget saved." };
}

export async function submitQuoteFeedback(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, errors: { _: "Sign in first." } };
  const parsed = quoteFeedbackSchema.safeParse({
    inquiryId: formData.get("inquiryId"),
    matched: formData.get("matched"),
    quotedPrice: formData.get("quotedPrice") || undefined,
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  const inquiry = await db.inquiry.findUnique({ where: { id: parsed.data.inquiryId } });
  if (!couple || !inquiry || inquiry.coupleId !== couple.id) return { ok: false, errors: { _: "Not your inquiry." } };
  if (!inquiry.firstReplyAt) return { ok: false, errors: { _: "You can rate the quote after the vendor replies." } };
  await db.quoteFeedback.upsert({
    where: { inquiryId: inquiry.id },
    create: { inquiryId: inquiry.id, matched: parsed.data.matched === "yes", quotedPrice: parsed.data.quotedPrice ?? null },
    update: { matched: parsed.data.matched === "yes", quotedPrice: parsed.data.quotedPrice ?? null },
  });
  await recomputeVendorStats(inquiry.vendorId);
  await track("quote_feedback", { matched: parsed.data.matched }, user.id, inquiry.vendorId);
  revalidatePath(`/dashboard/inquiries/${inquiry.id}`);
  return { ok: true, message: "Thanks. This feeds the vendor's Price-Honest signal." };
}

export async function submitReview(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, errors: { _: "Sign in first." } };
  const parsed = reviewSchema.safeParse({ vendorSlug: formData.get("vendorSlug"), rating: formData.get("rating"), body: formData.get("body") });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  const vendor = await db.vendor.findUnique({ where: { slug: parsed.data.vendorSlug } });
  if (!couple || !vendor) return { ok: false, errors: { _: "Complete onboarding first." } };
  // Trust rule: only couples who had a replied inquiry with this vendor can review.
  const eligible = await db.inquiry.findFirst({ where: { coupleId: couple.id, vendorId: vendor.id, firstReplyAt: { not: null } } });
  if (!eligible) return { ok: false, errors: { _: "Reviews are limited to couples who had a replied inquiry with this vendor." } };
  await db.review.upsert({
    where: { vendorId_coupleId: { vendorId: vendor.id, coupleId: couple.id } },
    create: { vendorId: vendor.id, coupleId: couple.id, rating: parsed.data.rating, body: parsed.data.body },
    update: { rating: parsed.data.rating, body: parsed.data.body },
  });
  revalidatePath(`/vendors/${vendor.slug}`);
  return { ok: true, message: "Review published." };
}
