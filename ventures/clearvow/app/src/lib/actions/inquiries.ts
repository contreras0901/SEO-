"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { BUDGET_BANDS, flattenErrors, inquirySchema, replySchema } from "../validation";
import { sendEmail } from "../notify";
import { track } from "../analytics";
import { draftBrief } from "../ai";
import { planCanReplyFree, UNLOCK_PRICE_USD } from "../plans";
import { isStripeConfigured, priceIds, stripe, appUrl } from "../stripe";
import { recomputeVendorStats } from "../stats";
import { formatDate } from "../format";
import { issueEmailCode, issueSmsCode } from "./auth";
import type { ActionState } from "./types";

const DAILY_INQUIRY_LIMIT = 15;

export async function createInquiry(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  const vendorSlug = String(formData.get("vendorSlug") || "");
  if (!user) redirect(`/sign-up?next=/inquire/${vendorSlug}`);
  const couple = await db.couple.findUnique({ where: { userId: user.id } });
  if (!couple) redirect(`/start?next=/inquire/${vendorSlug}`);

  const needs: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (k.startsWith("need_") && typeof v === "string") needs[k.slice(5)] = v.slice(0, 200);
  }
  const parsed = inquirySchema.safeParse({
    vendorSlug,
    eventDate: formData.get("eventDate") || "",
    venueName: formData.get("venueName") || "",
    guestCount: formData.get("guestCount") || undefined,
    budgetBand: formData.get("budgetBand"),
    message: formData.get("message") || "",
    needs,
    phone: formData.get("phone") || "",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;

  const vendor = await db.vendor.findUnique({ where: { slug: d.vendorSlug }, include: { category: true, owner: true } });
  if (!vendor || vendor.status !== "LIVE") return { ok: false, errors: { _: "This vendor is not accepting inquiries right now." } };

  const since = new Date(Date.now() - 86400_000);
  const todayCount = await db.inquiry.count({ where: { coupleId: couple.id, createdAt: { gt: since } } });
  if (todayCount >= DAILY_INQUIRY_LIMIT) return { ok: false, errors: { _: "You have reached today's inquiry limit. Try again tomorrow." } };

  const dup = await db.inquiry.findFirst({ where: { coupleId: couple.id, vendorId: vendor.id, status: { not: "CLOSED" } } });
  if (dup) return { ok: false, errors: { _: "You already have an open inquiry with this vendor." }, redirectTo: `/dashboard/inquiries/${dup.id}` };

  const band = BUDGET_BANDS[d.budgetBand];
  const eventDate = d.eventDate ? new Date(d.eventDate + "T00:00:00Z") : couple.weddingDate;

  // Phone: store if provided and not yet on file.
  if (d.phone && !user.phone) await db.user.update({ where: { id: user.id }, data: { phone: d.phone } });
  const phoneOnFile = d.phone || user.phone;

  const emailVerified = Boolean(user.emailVerifiedAt);
  const phoneVerified = Boolean(user.phoneVerifiedAt);
  const status = emailVerified && phoneVerified ? "DELIVERED" : "PENDING_VERIFICATION";

  const brief = await draftBrief({
    categoryName: vendor.category.singular,
    eventDate: eventDate ? formatDate(eventDate) : "",
    venueName: d.venueName,
    guestCount: d.guestCount ?? couple.guestCount ?? undefined,
    budgetLabel: band.label,
    needs: d.needs,
    message: d.message,
    partnerAName: couple.partnerAName,
    partnerBName: couple.partnerBName,
  });

  const inquiry = await db.inquiry.create({
    data: {
      coupleId: couple.id,
      vendorId: vendor.id,
      categoryId: vendor.categoryId,
      eventDate: eventDate ?? null,
      venueName: d.venueName || null,
      guestCount: d.guestCount ?? couple.guestCount ?? null,
      budgetLow: band.low,
      budgetHigh: band.high,
      needsJson: JSON.stringify({ ...d.needs, _brief: brief.text, _briefSource: brief.source }),
      message: d.message,
      status,
      verifiedEmail: emailVerified,
      verifiedPhone: phoneVerified,
    },
  });
  await track("inquiry_created", { status, budgetBand: band.label, category: vendor.category.slug }, user.id, vendor.id);

  if (status === "DELIVERED") {
    await notifyVendorOfInquiry(inquiry.id);
    await recomputeVendorStats(vendor.id);
    revalidatePath("/dashboard/inquiries");
    redirect(`/dashboard/inquiries/${inquiry.id}?sent=1`);
  }
  // Kick off verification and send the couple to the verify screen.
  if (!emailVerified) await issueEmailCode(user.id, user.email);
  if (!phoneVerified && phoneOnFile) await issueSmsCode(user.id, phoneOnFile);
  redirect(`/dashboard/verify?next=/dashboard/inquiries/${inquiry.id}`);
}

/** Called after a couple verifies: delivers every inquiry that was waiting on verification. */
export async function releasePendingInquiries(userId: string): Promise<void> {
  const user = await db.user.findUnique({ where: { id: userId }, include: { couple: true } });
  if (!user?.couple || !user.emailVerifiedAt || !user.phoneVerifiedAt) return;
  const pending = await db.inquiry.findMany({ where: { coupleId: user.couple.id, status: "PENDING_VERIFICATION" } });
  for (const inq of pending) {
    await db.inquiry.update({ where: { id: inq.id }, data: { status: "DELIVERED", verifiedEmail: true, verifiedPhone: true } });
    await notifyVendorOfInquiry(inq.id);
    await recomputeVendorStats(inq.vendorId);
  }
}

async function notifyVendorOfInquiry(inquiryId: string): Promise<void> {
  const inq = await db.inquiry.findUnique({ where: { id: inquiryId }, include: { vendor: { include: { owner: true } }, category: true } });
  if (!inq) return;
  const to = inq.vendor.owner?.email || inq.vendor.contactEmail;
  if (!to) return;
  const budget = inq.budgetHigh ? `$${inq.budgetLow?.toLocaleString()} to $${inq.budgetHigh.toLocaleString()}` : `$${inq.budgetLow?.toLocaleString()}+`;
  await sendEmail(
    to,
    `New verified inquiry: ${formatDate(inq.eventDate)}, ${inq.venueName || "venue TBD"}, ${inq.guestCount ?? "?"} guests`,
    `A verified couple sent you an inquiry on Clearvow.\n\nDate: ${formatDate(inq.eventDate)}\nVenue: ${inq.venueName || "to be decided"}\nGuests: ${inq.guestCount ?? "to be decided"}\nBudget for ${inq.category.name.toLowerCase()}: ${budget}\n\nRead the full brief and reply: ${appUrl(`/vendor/inquiries/${inq.id}`)}`,
  );
}

export async function replyToInquiry(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, errors: { _: "Sign in first." } };
  const parsed = replySchema.safeParse({ inquiryId: formData.get("inquiryId"), body: formData.get("body") });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const inq = await db.inquiry.findUnique({
    where: { id: parsed.data.inquiryId },
    include: { vendor: { include: { owner: true } }, couple: { include: { user: true } } },
  });
  if (!inq) return { ok: false, errors: { _: "Inquiry not found." } };

  const isVendor = inq.vendor.ownerId === user.id || user.role === "ADMIN";
  const isCouple = inq.couple.userId === user.id;
  if (!isVendor && !isCouple) return { ok: false, errors: { _: "Not your inquiry." } };

  if (isVendor && !isCouple) {
    const canReply = planCanReplyFree(inq.vendor.plan) || inq.status === "UNLOCKED" || inq.status === "REPLIED";
    if (!canReply) return { ok: false, errors: { _: "Unlock this inquiry or upgrade to Pro to reply." } };
    if (inq.status === "PENDING_VERIFICATION") return { ok: false, errors: { _: "This inquiry is waiting on the couple's verification." } };
  }

  await db.inquiryMessage.create({ data: { inquiryId: inq.id, senderRole: isVendor && !isCouple ? "VENDOR" : "COUPLE", body: parsed.data.body } });
  if (isVendor && !isCouple) {
    const data: { status: string; firstReplyAt?: Date } = { status: "REPLIED" };
    if (!inq.firstReplyAt) data.firstReplyAt = new Date();
    await db.inquiry.update({ where: { id: inq.id }, data });
    await recomputeVendorStats(inq.vendorId);
    await sendEmail(inq.couple.user.email, `${inq.vendor.name} replied to your inquiry`, `${parsed.data.body}\n\nReply: ${appUrl(`/dashboard/inquiries/${inq.id}`)}`);
    await track("vendor_replied", {}, user.id, inq.vendorId);
  } else {
    const to = inq.vendor.owner?.email || inq.vendor.contactEmail;
    if (to) await sendEmail(to, `New message from ${inq.couple.partnerAName} & ${inq.couple.partnerBName}`, `${parsed.data.body}\n\nReply: ${appUrl(`/vendor/inquiries/${inq.id}`)}`);
  }
  revalidatePath(`/vendor/inquiries/${inq.id}`);
  revalidatePath(`/dashboard/inquiries/${inq.id}`);
  return { ok: true, message: "Sent." };
}

/** Free-tier unlock: Stripe Checkout one-time payment. The webhook marks the inquiry UNLOCKED. */
export async function unlockInquiry(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor");
  const inquiryId = String(formData.get("inquiryId") || "");
  const inq = await db.inquiry.findUnique({ where: { id: inquiryId }, include: { vendor: true } });
  if (!inq || (inq.vendor.ownerId !== user.id && user.role !== "ADMIN")) redirect("/vendor");
  if (inq.status !== "DELIVERED") redirect(`/vendor/inquiries/${inq.id}`);
  if (!isStripeConfigured() || !priceIds().unlock) {
    redirect(`/vendor/inquiries/${inq.id}?error=billing-not-configured`);
  }
  const s = stripe();
  let customerId = inq.vendor.stripeCustomerId;
  if (!customerId) {
    const c = await s.customers.create({ email: user.email, name: inq.vendor.name, metadata: { vendorId: inq.vendor.id } });
    customerId = c.id;
    await db.vendor.update({ where: { id: inq.vendor.id }, data: { stripeCustomerId: customerId } });
  }
  const session = await s.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    line_items: [{ price: priceIds().unlock, quantity: 1 }],
    success_url: appUrl(`/vendor/inquiries/${inq.id}?unlocked=1`),
    cancel_url: appUrl(`/vendor/inquiries/${inq.id}`),
    metadata: { kind: "unlock", inquiryId: inq.id, vendorId: inq.vendor.id },
    payment_intent_data: { metadata: { kind: "unlock", inquiryId: inq.id, vendorId: inq.vendor.id }, description: `Clearvow inquiry unlock ($${UNLOCK_PRICE_USD})` },
  });
  await track("unlock_started", {}, user.id, inq.vendor.id);
  redirect(session.url as string);
}

export async function closeInquiry(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const inquiryId = String(formData.get("inquiryId") || "");
  const inq = await db.inquiry.findUnique({ where: { id: inquiryId }, include: { vendor: true, couple: true } });
  if (!inq) return;
  const allowed = inq.couple.userId === user.id || inq.vendor.ownerId === user.id || user.role === "ADMIN";
  if (!allowed) return;
  await db.inquiry.update({ where: { id: inq.id }, data: { status: "CLOSED" } });
  revalidatePath(`/dashboard/inquiries/${inq.id}`);
  revalidatePath(`/vendor/inquiries/${inq.id}`);
}
