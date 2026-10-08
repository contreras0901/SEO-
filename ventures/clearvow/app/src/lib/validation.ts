import { z } from "zod";

export const ROLES = ["COUPLE", "VENDOR", "ADMIN"] as const;
export const VENDOR_STATUSES = ["DRAFT", "PENDING", "LIVE", "SUSPENDED"] as const;
export const INQUIRY_STATUSES = ["PENDING_VERIFICATION", "DELIVERED", "UNLOCKED", "REPLIED", "CLOSED"] as const;
export const PLAN_NAMES = ["FREE", "PRO", "PREFERRED"] as const;
export const PRICE_UNITS = ["EVENT", "HOUR", "GUEST", "SITE_FEE"] as const;

export const PRONOUN_OPTIONS = ["", "she/her", "he/him", "they/them", "she/they", "he/they", "other"] as const;

export const BUDGET_BANDS: { label: string; low: number; high: number | null }[] = [
  { label: "Under $1,000", low: 0, high: 1000 },
  { label: "$1,000 to $2,500", low: 1000, high: 2500 },
  { label: "$2,500 to $5,000", low: 2500, high: 5000 },
  { label: "$5,000 to $10,000", low: 5000, high: 10000 },
  { label: "$10,000 to $20,000", low: 10000, high: 20000 },
  { label: "$20,000+", low: 20000, high: null },
];

const email = z.string().trim().toLowerCase().email().max(200);
const password = z.string().min(10, "Use at least 10 characters").max(200);

export const signUpSchema = z.object({
  email,
  password,
  role: z.enum(["COUPLE", "VENDOR"]).default("COUPLE"),
});

export const signInSchema = z.object({ email, password: z.string().min(1).max(200) });

export const coupleOnboardingSchema = z.object({
  partnerAName: z.string().trim().min(1, "Add a first name").max(60),
  partnerAPronouns: z.string().trim().max(30).optional().default(""),
  partnerBName: z.string().trim().min(1, "Add a first name").max(60),
  partnerBPronouns: z.string().trim().max(30).optional().default(""),
  metroSlug: z.string().trim().min(1),
  weddingDate: z.string().trim().optional().default(""),
  guestCount: z.coerce.number().int().min(1).max(2000).optional(),
  budgetTotal: z.coerce.number().int().min(500).max(2_000_000).optional(),
});

export const inquirySchema = z.object({
  vendorSlug: z.string().trim().min(1),
  eventDate: z.string().trim().optional().default(""),
  venueName: z.string().trim().max(120).optional().default(""),
  guestCount: z.coerce.number().int().min(1).max(2000).optional(),
  budgetBand: z.coerce.number().int().min(0).max(BUDGET_BANDS.length - 1),
  message: z.string().trim().max(600).optional().default(""),
  needs: z.record(z.string(), z.string().max(200)).optional().default({}),
  phone: z.string().trim().min(7).max(25).optional().default(""),
});

export const vendorProfileSchema = z.object({
  name: z.string().trim().min(2).max(100),
  tagline: z.string().trim().max(120).optional().default(""),
  description: z.string().trim().max(3000).optional().default(""),
  serviceArea: z.string().trim().max(200).optional().default(""),
  website: z.string().trim().max(200).optional().default(""),
  instagram: z.string().trim().max(60).optional().default(""),
  contactEmail: z.string().trim().max(200).optional().default(""),
  contactPhone: z.string().trim().max(30).optional().default(""),
  categorySlug: z.string().trim().min(1),
  metroSlug: z.string().trim().min(1),
  styleTags: z.string().trim().max(200).optional().default(""),
});

export const vendorPricingSchema = z
  .object({
    startingPrice: z.coerce.number().int().min(1, "Starting price is required").max(1_000_000),
    typicalLow: z.coerce.number().int().min(1).max(1_000_000),
    typicalHigh: z.coerce.number().int().min(1).max(1_000_000),
    siteFeeFrom: z.coerce.number().int().min(0).max(1_000_000).optional(),
    perGuestFrom: z.coerce.number().int().min(0).max(100_000).optional(),
    capacity: z.coerce.number().int().min(0).max(10_000).optional(),
    packageName: z.string().trim().min(1, "Add at least one package").max(80),
    packagePrice: z.coerce.number().int().min(1).max(1_000_000),
    packageDescription: z.string().trim().max(1000).optional().default(""),
  })
  .refine((v) => v.typicalLow <= v.typicalHigh, { message: "Typical low must be at or below typical high", path: ["typicalHigh"] })
  .refine((v) => v.startingPrice <= v.typicalHigh, { message: "Starting price cannot exceed the typical high", path: ["startingPrice"] });

export const realWeddingSchema = z.object({
  title: z.string().trim().min(5).max(140),
  venueName: z.string().trim().min(2).max(120),
  eventDate: z.string().trim().optional().default(""),
  partnerAName: z.string().trim().min(1).max(60),
  partnerBName: z.string().trim().min(1).max(60),
  story: z.string().trim().min(40, "Tell the story in at least a few sentences").max(6000),
  coverUrl: z.string().trim().url().max(500).optional().or(z.literal("")).default(""),
  guestCount: z.coerce.number().int().min(1).max(2000).optional(),
  budgetBand: z.string().trim().max(40).optional().default(""),
  consentConfirmed: z.literal("on", { message: "You must confirm the couple's consent and your rights to the images" }),
  // credits: lines of "Role | Vendor name"
  credits: z.string().trim().max(4000).optional().default(""),
});

export const replySchema = z.object({ inquiryId: z.string().min(1), body: z.string().trim().min(1).max(4000) });

export const quoteFeedbackSchema = z.object({
  inquiryId: z.string().min(1),
  matched: z.enum(["yes", "no"]),
  quotedPrice: z.coerce.number().int().min(0).max(1_000_000).optional(),
});

export const reviewSchema = z.object({
  vendorSlug: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().trim().min(20).max(2000),
});

export const budgetSchema = z.object({
  items: z.array(z.object({ categorySlug: z.string(), planned: z.coerce.number().int().min(0), actual: z.coerce.number().int().min(0) })),
});

export type FieldErrors = Record<string, string>;

export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of err.issues) {
    const key = issue.path.join(".") || "_";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

/** Vendor "go live" gate: the Price-Honest rule. A profile cannot be listed without prices and a package. */
export function vendorGoLiveProblems(v: {
  startingPrice: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  pledgeSignedAt: Date | null;
  description: string;
  packages: { id: string }[];
  images: { id: string }[];
}): string[] {
  const p: string[] = [];
  if (!v.startingPrice) p.push("Add a starting price");
  if (!v.typicalLow || !v.typicalHigh) p.push("Add a typical price range");
  if (v.packages.length === 0) p.push("Add at least one package");
  if (!v.pledgeSignedAt) p.push("Sign the Welcomes Every Couple pledge");
  if (v.description.trim().length < 80) p.push("Write a description of at least 80 characters");
  if (v.images.length < 1) p.push("Add at least one portfolio image");
  return p;
}
