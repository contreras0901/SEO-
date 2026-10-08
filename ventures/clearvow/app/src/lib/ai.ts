import "server-only";

/**
 * Single entry point for model calls. Feature-flagged by ANTHROPIC_API_KEY, with a
 * crude daily cost cap. Every function has a deterministic fallback so the product
 * works with no key and no budget.
 */

const DAILY_BUDGET = Number(process.env.AI_DAILY_BUDGET_USD || "5");
let spentToday = 0;
let dayKey = new Date().toISOString().slice(0, 10);

function budgetOk(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    spentToday = 0;
  }
  return spentToday < DAILY_BUDGET;
}

export function isAiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

type Brief = {
  categoryName: string;
  eventDate: string;
  venueName: string;
  guestCount?: number;
  budgetLabel: string;
  needs: Record<string, string>;
  message: string;
  partnerAName: string;
  partnerBName: string;
};

/** Deterministic brief used when the model is unavailable. Also used as the model's reference. */
export function draftBriefFallback(b: Brief): string {
  const lines = [
    `${b.partnerAName} and ${b.partnerBName} are looking for a ${b.categoryName.toLowerCase()}.`,
    `Date: ${b.eventDate || "to be decided"}. Venue: ${b.venueName || "to be decided"}. Guests: ${b.guestCount ?? "to be decided"}. Budget for this category: ${b.budgetLabel}.`,
  ];
  const needs = Object.entries(b.needs).filter(([, v]) => v);
  if (needs.length) lines.push("Needs: " + needs.map(([k, v]) => `${k}: ${v}`).join("; ") + ".");
  if (b.message) lines.push(`In their words: "${b.message}"`);
  return lines.join("\n");
}

export async function draftBrief(b: Brief): Promise<{ text: string; source: "model" | "fallback" }> {
  const fallback = draftBriefFallback(b);
  if (!isAiConfigured() || !budgetOk()) return { text: fallback, source: "fallback" };
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY as string,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-5-5",
        max_tokens: 300,
        system:
          "You rewrite a structured wedding inquiry into a short, plain brief for a vendor. Keep every fact exactly as given. Do not add facts. Keep the couple's own message as a direct quote. Two to four sentences. No greetings, no sign-off.",
        messages: [{ role: "user", content: fallback }],
      }),
    });
    if (!res.ok) return { text: fallback, source: "fallback" };
    const json = (await res.json()) as { content?: { type: string; text?: string }[]; usage?: { input_tokens: number; output_tokens: number } };
    const text = json.content?.find((c) => c.type === "text")?.text?.trim();
    const usage = json.usage;
    if (usage) spentToday += (usage.input_tokens * 1 + usage.output_tokens * 5) / 1_000_000; // rough $/MTok
    if (!text) return { text: fallback, source: "fallback" };
    return { text, source: "model" };
  } catch {
    return { text: fallback, source: "fallback" };
  }
}
