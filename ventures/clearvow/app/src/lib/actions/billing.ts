"use server";

import { redirect } from "next/navigation";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { appUrl, isStripeConfigured, priceIds, stripe } from "../stripe";
import { track } from "../analytics";

export async function startProCheckout(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/billing");
  const vendor = await db.vendor.findFirst({ where: { ownerId: user.id } });
  if (!vendor) redirect("/claim");
  const interval = String(formData.get("interval") || "monthly");
  const price = interval === "annual" ? priceIds().proAnnual : priceIds().proMonthly;
  if (!isStripeConfigured() || !price) redirect("/vendor/billing?error=billing-not-configured");
  const s = stripe();
  let customerId = vendor.stripeCustomerId;
  if (!customerId) {
    const c = await s.customers.create({ email: user.email, name: vendor.name, metadata: { vendorId: vendor.id } });
    customerId = c.id;
    await db.vendor.update({ where: { id: vendor.id }, data: { stripeCustomerId: customerId } });
  }
  const session = await s.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: appUrl("/vendor/billing?success=1"),
    cancel_url: appUrl("/vendor/billing"),
    metadata: { kind: "pro", vendorId: vendor.id },
    subscription_data: { metadata: { kind: "pro", vendorId: vendor.id } },
  });
  await track("pro_checkout_started", { interval }, user.id, vendor.id);
  redirect(session.url as string);
}

export async function openBillingPortal(): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/billing");
  const vendor = await db.vendor.findFirst({ where: { ownerId: user.id } });
  if (!vendor?.stripeCustomerId || !isStripeConfigured()) redirect("/vendor/billing?error=billing-not-configured");
  const portal = await stripe().billingPortal.sessions.create({ customer: vendor.stripeCustomerId, return_url: appUrl("/vendor/billing") });
  redirect(portal.url);
}
