import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { isStripeConfigured, stripe } from "@/lib/stripe";
import { track } from "@/lib/analytics";

export const runtime = "nodejs";

export async function POST(req: Request): Promise<Response> {
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(body, sig ?? "", process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return NextResponse.json({ error: `Invalid signature: ${String(e)}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const kind = session.metadata?.kind;
      if (kind === "unlock" && session.metadata?.inquiryId) {
        const inq = await db.inquiry.findUnique({ where: { id: session.metadata.inquiryId } });
        if (inq && inq.status === "DELIVERED") {
          await db.inquiry.update({
            where: { id: inq.id },
            data: { status: "UNLOCKED", unlockedAt: new Date(), unlockPaymentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null },
          });
          await track("inquiry_unlocked", {}, null, inq.vendorId);
        }
      }
      if (kind === "pro" && session.metadata?.vendorId) {
        const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null;
        await db.vendor.update({ where: { id: session.metadata.vendorId }, data: { plan: "PRO", stripeSubId: subId } });
        await track("pro_activated", {}, null, session.metadata.vendorId);
      }
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      const vendorId = sub.metadata?.vendorId;
      if (!vendorId) break;
      const active = sub.status === "active" || sub.status === "trialing" || sub.status === "past_due";
      const periodEnd = sub.items.data[0]?.current_period_end;
      await db.vendor.update({
        where: { id: vendorId },
        data: { plan: active && event.type !== "customer.subscription.deleted" ? "PRO" : "FREE", planRenewsAt: periodEnd ? new Date(periodEnd * 1000) : null, stripeSubId: active ? sub.id : null },
      });
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object;
      const inquiryId = charge.metadata?.inquiryId;
      if (inquiryId) await db.inquiry.update({ where: { id: inquiryId }, data: { unlockRefundedAt: new Date() } }).catch(() => undefined);
      break;
    }
    default:
      break;
  }
  return NextResponse.json({ received: true });
}
