/**
 * End-to-end smoke test against a running server (default http://localhost:3100).
 * Drives the real UI with headless Chromium: couple sign-up, onboarding, inquiry,
 * email + SMS verification (codes read from the server log in console mode),
 * vendor reply, couple quote feedback, admin pages.
 *
 *   PORT=3100 npx next start -p 3100 > server.log &
 *   SMOKE_LOG=server.log npm run smoke
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const BASE = process.env.SMOKE_BASE || "http://localhost:3100";
const LOG = process.env.SMOKE_LOG || "server.log";
const EXE = process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const PW = "password1234";
const stamp = Date.now();
const coupleEmail = `smoke-${stamp}@clearvow.example`;

/** Click the submit button of the form that contains `sel` (the header has its own sign-out submit button). */
async function submitFormWith(page: import("playwright-core").Page, sel: string) {
  await page.locator("form", { has: page.locator(sel) }).locator("button[type=submit]").first().click();
}

function assert(cond: unknown, msg: string): asserts cond {
  if (!cond) throw new Error("ASSERT: " + msg);
}

function latestCode(channel: "email" | "sms"): string {
  const log = readFileSync(LOG, "utf8");
  const re = channel === "email" ? /Your code is (\d{6})/g : /Clearvow code: (\d{6})/g;
  let m: RegExpExecArray | null;
  let last = "";
  while ((m = re.exec(log))) last = m[1];
  assert(last, `no ${channel} code found in ${LOG}`);
  return last;
}

async function main() {
  const browser = await chromium.launch({ executablePath: EXE, headless: true });
  const ctx = await browser.newContext({ baseURL: BASE, viewport: { width: 390, height: 844 } }); // mobile-first
  const page = await ctx.newPage();
  const steps: string[] = [];
  const ok = (s: string) => {
    steps.push(s);
    console.log("✓", s);
  };

  // 1. Public pages render prices.
  await page.goto("/san-diego/photographers");
  assert((await page.locator("h1").textContent())?.includes("photographers"), "category H1");
  const firstPrice = await page.locator("article .price").first().textContent();
  assert(firstPrice && /\$\d/.test(firstPrice), "vendor card shows a price");
  ok(`category page shows prices (${firstPrice?.trim()})`);

  await page.goto("/vendors?pledge=1&category=planners");
  assert((await page.locator("article").count()) > 0, "pledge filter returns vendors");
  ok("pledge filter works");

  await page.goto("/vendors/harbor-light-studio-sample");
  assert((await page.locator("h1").textContent())?.includes("Harbor Light"), "profile H1");
  assert(await page.locator("text=Send a verified inquiry").first().isVisible(), "inquiry CTA");
  ok("vendor profile renders with inquiry CTA");

  // 2. Couple signs up from the inquiry CTA, onboards, sends an inquiry.
  await page.click("text=Send a verified inquiry");
  await page.waitForURL(/\/sign-up/);
  await page.fill("#email", coupleEmail);
  await page.fill("#password", PW);
  await submitFormWith(page, "#email");
  await page.waitForURL(/\/start/);
  ok("sign-up redirects to onboarding with next preserved");

  await page.fill("#partnerAName", "Alex");
  await page.selectOption("#partnerAPronouns", "they/them");
  await page.fill("#partnerBName", "Jordan");
  await page.fill("#guestCount", "110");
  await page.fill("#budgetTotal", "40000");
  await submitFormWith(page, "#partnerAName");
  await page.waitForURL(/\/inquire\/harbor-light-studio-sample$/);
  ok("onboarding saved; returned to inquiry");

  await page.fill("#venueName", "The Olive Grove Estate (sample)");
  await page.fill("#need_hours", "8");
  await page.fill("#message", "Candid over posed, please.");
  await page.fill("#phone", "+16195550123");
  await submitFormWith(page, "#venueName");
  await page.waitForURL(/\/dashboard\/verify/);
  ok("inquiry held pending verification; redirected to verify");

  // 3. Verify email and SMS using codes from the console transport.
  await page.fill("#code", latestCode("email"));
  await page.locator("form", { has: page.locator("#code") }).locator("button[type=submit]").click();
  await page.waitForSelector("text=Email verified.");
  ok("email verified");
  await page.fill("#code-sms", latestCode("sms"));
  await page.locator("form", { has: page.locator("#code-sms") }).locator("button[type=submit]").click();
  await page.waitForSelector("text=Phone verified.");
  ok("phone verified");

  await page.goto("/dashboard/inquiries");
  await page.waitForSelector("text=Delivered, awaiting reply");
  ok("inquiry released to DELIVERED after verification");
  const inquiryHref = await page.locator("a[href^='/dashboard/inquiries/']").first().getAttribute("href");
  assert(inquiryHref, "inquiry link");

  // 4. Vendor (Pro) sees the brief and replies.
  await page.click("text=Sign out");
  await page.goto("/sign-in");
  await page.fill("#email", "vendor@clearvow.example");
  await page.fill("#password", PW);
  await submitFormWith(page, "#email");
  await page.waitForURL(/\/vendor$/);
  await page.waitForSelector("text=Alex & Jordan");
  ok("vendor dashboard lists the new inquiry");
  await page.click("text=Alex & Jordan");
  await page.waitForSelector("text=The brief");
  const brief = await page.locator("text=Alex and Jordan are looking for").first().textContent();
  assert(brief, "structured brief rendered");
  assert(await page.locator("text=they/them").first().isVisible(), "pronouns shown to vendor");
  await page.fill("#body", "Thanks Alex and Jordan. Eight hours documentary coverage is $3,200. Holding your date for 72 hours.");
  await submitFormWith(page, "#body");
  await page.waitForSelector("text=Sent.");
  ok("vendor replied (Pro plan, no unlock needed)");

  // 5. Couple sees the reply and rates the quote.
  await page.click("text=Sign out");
  await page.goto("/sign-in");
  await page.fill("#email", coupleEmail);
  await page.fill("#password", PW);
  await submitFormWith(page, "#email");
  await page.waitForURL(/\/dashboard$/);
  await page.goto(inquiryHref);
  await page.waitForSelector("text=Holding your date");
  await page.selectOption("#matched", "yes");
  await page.fill("#quotedPrice", "3200");
  await page.locator("form", { has: page.locator("#matched") }).locator("button[type=submit]").click();
  await page.waitForSelector("text=You answered: Yes");
  ok("couple submitted quote-match feedback");

  // 6. Budget page saves.
  await page.goto("/dashboard/budget");
  await page.fill("#planned_photographers", "3400");
  await submitFormWith(page, "#planned_photographers");
  await page.waitForSelector("text=Budget saved.");
  ok("budget saved");

  // 7. Admin pages load.
  await page.click("text=Sign out");
  await page.goto("/sign-in");
  await page.fill("#email", "admin@clearvow.example");
  await page.fill("#password", PW);
  await submitFormWith(page, "#email");
  await page.waitForURL(/\/admin$/);
  await page.goto("/admin/vendors?status=LIVE");
  assert((await page.locator("li").count()) > 10, "admin vendor list");
  await page.goto("/admin/weddings");
  assert(await page.locator("text=Publish").first().isVisible(), "admin wedding queue");
  ok("admin review pages render");

  // 8. Accessibility sanity: every page visited has exactly one h1 and a main landmark.
  for (const p of ["/", "/vendors", "/san-diego/venues", "/real-weddings", "/pledge", "/for-vendors/pricing"]) {
    await page.goto(p);
    assert((await page.locator("h1").count()) === 1, `${p} has one h1`);
    assert((await page.locator("main#main").count()) === 1, `${p} has main landmark`);
  }
  ok("one h1 and a main landmark on public pages");

  await browser.close();
  console.log(`\nSMOKE PASSED: ${steps.length} checks`);
}

main().catch(async (e) => {
  console.error("SMOKE FAILED:", e);
  process.exit(1);
});
