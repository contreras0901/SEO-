import "server-only";

/**
 * Email and SMS transport. With RESEND_API_KEY / TWILIO_* set, messages are sent.
 * Without them, messages are logged to the server console so the flows still run
 * locally. Every caller gets back { sent: boolean, provider } so UI can say which.
 */

export type SendResult = { sent: boolean; provider: "resend" | "twilio" | "console"; error?: string };

export async function sendEmail(to: string, subject: string, text: string, html?: string): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Clearvow <hello@example.com>";
  if (!key) {
    console.log(`[email:console] to=${to} subject=${JSON.stringify(subject)}\n${text}`);
    return { sent: false, provider: "console" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, html: html ?? `<pre style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(text)}</pre>` }),
    });
    if (!res.ok) return { sent: false, provider: "resend", error: `${res.status} ${await res.text()}` };
    return { sent: true, provider: "resend" };
  } catch (e) {
    return { sent: false, provider: "resend", error: String(e) };
  }
}

export async function sendSms(to: string, body: string): Promise<SendResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!sid || !token || !from) {
    console.log(`[sms:console] to=${to}\n${body}`);
    return { sent: false, provider: "console" };
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${sid}:${token}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: to, From: from, Body: body }),
    });
    if (!res.ok) return { sent: false, provider: "twilio", error: `${res.status} ${await res.text()}` };
    return { sent: true, provider: "twilio" };
  } catch (e) {
    return { sent: false, provider: "twilio", error: String(e) };
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function isNotifyConfigured(): { email: boolean; sms: boolean } {
  return {
    email: Boolean(process.env.RESEND_API_KEY),
    sms: Boolean(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER),
  };
}
