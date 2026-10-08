import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { processUnlockRefunds } from "@/lib/billing-jobs";
import { sendEmail } from "@/lib/notify";
import { appUrl } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Scheduled maintenance. Protect with CRON_SECRET (Vercel Cron sends it as a bearer token).
 * Jobs: unlock refunds (7-day rule), price-confirmation reminders (90 days), quote-match prompts (14 days).
 */
export async function GET(req: Request): Promise<Response> {
  const auth = req.headers.get("authorization") || "";
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const refunded = await processUnlockRefunds();

  const ninetyDays = new Date(Date.now() - 90 * 86400_000);
  const stale = await db.vendor.findMany({ where: { status: "LIVE", priceConfirmedAt: { lt: ninetyDays } }, include: { owner: true } });
  let reminded = 0;
  for (const v of stale) {
    const to = v.owner?.email;
    if (!to) continue;
    await sendEmail(to, "Confirm your prices on Clearvow", `It has been 90 days since you confirmed prices for ${v.name}. Confirm or update them in one click: ${appUrl("/vendor/pricing")}. Prices older than 180 days are flagged to couples.`);
    reminded++;
  }

  const fourteenDays = new Date(Date.now() - 14 * 86400_000);
  const toPrompt = await db.inquiry.findMany({
    where: { firstReplyAt: { lt: fourteenDays }, feedback: null, status: { in: ["REPLIED", "UNLOCKED"] } },
    include: { couple: { include: { user: true } }, vendor: true },
    take: 200,
  });
  let prompted = 0;
  for (const inq of toPrompt) {
    await sendEmail(inq.couple.user.email, `Did ${inq.vendor.name}'s quote match their published price?`, `A one-click answer keeps prices honest for every couple: ${appUrl(`/dashboard/inquiries/${inq.id}`)}`);
    prompted++;
  }
  return NextResponse.json({ ok: true, refunded, reminded, prompted });
}
