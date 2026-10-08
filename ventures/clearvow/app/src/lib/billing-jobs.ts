import "server-only";
import { db } from "./db";
import { isStripeConfigured, stripe } from "./stripe";
import { sendEmail } from "./notify";

/** Refund rule for unlocks: if the couple never replies within 7 days of the vendor's first reply, refund. Called by the cron route. */
export async function processUnlockRefunds(): Promise<number> {
  if (!isStripeConfigured()) return 0;
  const cutoff = new Date(Date.now() - 7 * 86400_000);
  const candidates = await db.inquiry.findMany({
    where: { unlockPaymentId: { not: null }, unlockRefundedAt: null, firstReplyAt: { lt: cutoff } },
    include: { messages: { where: { senderRole: "COUPLE" }, select: { id: true, createdAt: true } }, couple: { include: { user: true } }, vendor: { include: { owner: true } } },
  });
  let refunded = 0;
  for (const inq of candidates) {
    const coupleRepliedAfter = inq.messages.some((m) => inq.firstReplyAt && m.createdAt > inq.firstReplyAt);
    if (coupleRepliedAfter) continue;
    try {
      await stripe().refunds.create({ payment_intent: inq.unlockPaymentId as string, metadata: { inquiryId: inq.id } });
      await db.inquiry.update({ where: { id: inq.id }, data: { unlockRefundedAt: new Date() } });
      const to = inq.vendor.owner?.email || inq.vendor.contactEmail;
      if (to) await sendEmail(to, "Unlock refunded", `The couple did not reply within 7 days, so your $15 unlock for the ${inq.venueName || "inquiry"} has been refunded.`);
      refunded++;
    } catch (e) {
      console.error("[refund] failed", inq.id, e);
    }
  }
  return refunded;
}
