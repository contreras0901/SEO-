/**
 * Creates or updates the two founder-operated vendor profiles as DRAFTS.
 *
 * Founder decision 2026-10-08: list Bella Mia Exclusive Events and Ethereal Luxury
 * Restrooms on Clearvow under identical rules, excluded from Spotlight, with a
 * disclosure on their profiles.
 *
 * Deliberately NOT set here: prices, packages, images, and the pledge signature.
 * Prices are a Founder decision (CEG rule: no pricing without Ledger/Founder), so
 * the profiles stay DRAFT and fail the go-live checklist until the Founder enters
 * them in /vendor/pricing and signs the pledge in /vendor/profile.
 *
 * Facts used are FOUNDER-CONFIRMED in this repository (fixes/04, analysis/reconciliation):
 * Bella Mia: office in Mission Valley, San Diego; info@bellamiaexclusiveevents.com;
 * 619.248.0786; services = full-service, partial, florals, styling, rentals.
 * Ethereal: name only. Everything else is left for the Founder to fill.
 *
 * Run: npx tsx scripts/list-house-vendors.ts [owner-email]
 * The owner email (default vendor-owner@clearvow.example) must be an existing user; the
 * Founder should pass their real Clearvow account email so both profiles land in their dashboard.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const ownerEmail = process.argv[2] || "vendor-owner@clearvow.example";
  const owner = await db.user.findUnique({ where: { email: ownerEmail } });
  if (!owner) throw new Error(`No user with email ${ownerEmail}. Sign up first, then rerun with that email.`);
  const metro = await db.metro.findUnique({ where: { slug: "san-diego" } });
  if (!metro) throw new Error("San Diego metro missing; run the seed first.");
  const planners = await db.category.findUnique({ where: { slug: "planners" } });
  const trailers = await db.category.findUnique({ where: { slug: "restroom-trailers" } });
  if (!planners || !trailers) throw new Error("Categories missing; run the seed first.");

  const bella = await db.vendor.upsert({
    where: { slug: "bella-mia-exclusive-events" },
    update: { isHouseVendor: true, ownerId: owner.id, isClaimed: true },
    create: {
      slug: "bella-mia-exclusive-events",
      name: "Bella Mia Exclusive Events",
      metroId: metro.id,
      categoryId: planners.id,
      ownerId: owner.id,
      isClaimed: true,
      isHouseVendor: true,
      status: "DRAFT",
      tagline: "Wedding planning, floral design, styling, and rentals in San Diego.",
      description:
        "Full-service and partial wedding planning, floral design, event styling, and rental packages for San Diego weddings. Office in Mission Valley, by appointment.\n\nFOUNDER: replace this paragraph with your own words before going live, then add prices and packages under Prices and sign the pledge under Profile.",
      serviceArea: "San Diego County",
      website: "https://bellamiaexclusiveevents.com",
      contactEmail: "info@bellamiaexclusiveevents.com",
      contactPhone: "619.248.0786",
      styleTags: "full service, partial planning, florals, rentals",
    },
  });
  const ethereal = await db.vendor.upsert({
    where: { slug: "ethereal-luxury-restrooms" },
    update: { isHouseVendor: true, ownerId: owner.id, isClaimed: true },
    create: {
      slug: "ethereal-luxury-restrooms",
      name: "Ethereal Luxury Restrooms",
      metroId: metro.id,
      categoryId: trailers.id,
      ownerId: owner.id,
      isClaimed: true,
      isHouseVendor: true,
      status: "DRAFT",
      tagline: "Luxury restroom trailers for weddings and events.",
      description:
        "Climate-controlled luxury restroom trailers for weddings and private events in San Diego County.\n\nFOUNDER: replace this paragraph with your own words, confirm the service area, add prices and packages under Prices, and sign the pledge under Profile before going live.",
      serviceArea: "San Diego County",
      styleTags: "restroom trailer, estate weddings, outdoor events",
    },
  });
  console.log(`Created or updated as DRAFT (prices, pledge, and images still required to go live):\n  /vendors/${bella.slug}\n  /vendors/${ethereal.slug}\nOwner: ${ownerEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
