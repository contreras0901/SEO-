/**
 * Directory ranking. Published on /trust. Plan is deliberately NOT an input.
 *
 * score = 0.40 * responseRate + 0.25 * quoteMatchRate + 0.15 * completeness
 *       + 0.10 * priceFreshness + 0.10 * creditSignal
 * Vendors with no history get neutral defaults so new vendors are not buried.
 */

export type RankableVendor = {
  inquiryCount: number;
  replyCount: number;
  quoteMatchRate: number | null;
  description: string;
  priceConfirmedAt: Date | null;
  pledgeSignedAt: Date | null;
  images: unknown[];
  packages: unknown[];
  credits: unknown[];
  startingPrice: number | null;
};

export const RANKING_WEIGHTS = {
  responseRate: 0.4,
  quoteMatchRate: 0.25,
  completeness: 0.15,
  priceFreshness: 0.1,
  credits: 0.1,
} as const;

export function completenessScore(v: RankableVendor): number {
  let s = 0;
  if (v.description.length >= 80) s += 0.25;
  if (v.images.length >= 3) s += 0.25;
  else if (v.images.length >= 1) s += 0.12;
  if (v.packages.length >= 1) s += 0.2;
  if (v.startingPrice) s += 0.2;
  if (v.pledgeSignedAt) s += 0.1;
  return Math.min(1, s);
}

export function priceFreshness(v: RankableVendor, now = new Date()): number {
  if (!v.priceConfirmedAt) return 0;
  const days = (now.getTime() - v.priceConfirmedAt.getTime()) / 86400_000;
  if (days <= 90) return 1;
  if (days <= 180) return 0.6;
  return 0.2;
}

export function isPriceStale(priceConfirmedAt: Date | null, now = new Date()): boolean {
  if (!priceConfirmedAt) return true;
  return (now.getTime() - priceConfirmedAt.getTime()) / 86400_000 > 180;
}

export function rankScore(v: RankableVendor, now = new Date()): number {
  const responseRate = v.inquiryCount >= 3 ? v.replyCount / v.inquiryCount : 0.7; // neutral prior
  const quoteMatch = v.quoteMatchRate ?? 0.85; // neutral prior
  const credits = Math.min(1, v.credits.length / 5);
  return (
    RANKING_WEIGHTS.responseRate * responseRate +
    RANKING_WEIGHTS.quoteMatchRate * quoteMatch +
    RANKING_WEIGHTS.completeness * completenessScore(v) +
    RANKING_WEIGHTS.priceFreshness * priceFreshness(v, now) +
    RANKING_WEIGHTS.credits * credits
  );
}

export function isPriceHonest(v: { quoteMatchRate: number | null; startingPrice: number | null; priceConfirmedAt: Date | null }): boolean {
  if (!v.startingPrice || isPriceStale(v.priceConfirmedAt)) return false;
  return v.quoteMatchRate !== null && v.quoteMatchRate >= 0.9;
}

export function respondsFast(medianReplyHours: number | null): boolean {
  return medianReplyHours !== null && medianReplyHours <= 24;
}
