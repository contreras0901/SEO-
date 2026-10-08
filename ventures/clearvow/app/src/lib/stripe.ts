import "server-only";
import Stripe from "stripe";

let client: Stripe | null = null;

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function stripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Stripe is not configured (STRIPE_SECRET_KEY missing)");
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}

export function priceIds() {
  return {
    proMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY || "",
    proAnnual: process.env.STRIPE_PRICE_PRO_ANNUAL || "",
    unlock: process.env.STRIPE_PRICE_UNLOCK || "",
  };
}

export function appUrl(path = ""): string {
  const base = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  return base + path;
}
