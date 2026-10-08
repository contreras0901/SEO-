export type Plan = "FREE" | "PRO" | "PREFERRED";

export const PLANS: Record<
  Plan,
  {
    name: string;
    monthly: number;
    annual: number;
    weddingSubmissionsPerYear: number | null; // null = unlimited
    unlimitedInquiries: boolean;
    features: string[];
  }
> = {
  FREE: {
    name: "Free",
    monthly: 0,
    annual: 0,
    weddingSubmissionsPerYear: 3,
    unlimitedInquiries: false,
    features: [
      "Listed in the directory with your published prices",
      "Receive every verified inquiry and read the full brief",
      "Unlock contact details for $15 per inquiry, refunded if the couple never replies",
      "Submit up to 3 real weddings a year",
      "Profile analytics",
    ],
  },
  PRO: {
    name: "Pro",
    monthly: 59,
    annual: 590,
    weddingSubmissionsPerYear: 10,
    unlimitedInquiries: true,
    features: [
      "Everything in Free",
      "Reply to unlimited verified inquiries, no unlock fees",
      "Price-Honest badge once your quote-match rate is 90% or higher",
      "Submit up to 10 real weddings a year",
      "Cancel anytime, monthly or annual",
    ],
  },
  PREFERRED: {
    name: "Preferred",
    monthly: 149,
    annual: 1490,
    weddingSubmissionsPerYear: null,
    unlimitedInquiries: true,
    features: [
      "Everything in Pro",
      "Unlimited real-wedding submissions with expedited review",
      "Eligible for capped Spotlight placements (sold separately, max 3 per category)",
      "Featured in metro email digests to couples",
      "Priority support",
    ],
  },
};

export const UNLOCK_PRICE_USD = 15;
export const SPOTLIGHT_PRICE_USD = 249;
export const SPOTLIGHT_CAP_PER_CATEGORY = 3;

export function planCanReplyFree(plan: string): boolean {
  return plan === "PRO" || plan === "PREFERRED";
}
