/**
 * Seed: one metro (San Diego), 14 categories with inquiry questions, an admin user,
 * a demo couple, a demo vendor owner, ~40 SAMPLE vendors with plausible published
 * prices, and 4 SAMPLE real weddings with credits.
 *
 * Every vendor and wedding here is fictional ("(sample)" in the name) so the demo
 * never misrepresents a real business's prices. Venue names in weddings are real
 * public venues used as place names only.
 *
 * Run: npm run db:seed   (idempotent: upserts by slug/email)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

const CATEGORIES = [
  { slug: "venues", name: "Venues", singular: "Venue", priceUnit: "SITE_FEE", q: [{ key: "ceremony_on_site", label: "Ceremony on site?", placeholder: "yes / no / undecided" }, { key: "style", label: "Style you want", placeholder: "garden, ballroom, beach, rustic" }] },
  { slug: "planners", name: "Planners", singular: "Planner", priceUnit: "EVENT", q: [{ key: "scope", label: "Scope", placeholder: "full, partial, month-of" }, { key: "booked_so_far", label: "Vendors booked so far" }] },
  { slug: "photographers", name: "Photographers", singular: "Photographer", priceUnit: "EVENT", q: [{ key: "hours", label: "Hours of coverage", placeholder: "8" }, { key: "second_shooter", label: "Second shooter?", placeholder: "yes / no" }, { key: "style", label: "Style", placeholder: "documentary, editorial, film" }] },
  { slug: "videographers", name: "Videographers", singular: "Videographer", priceUnit: "EVENT", q: [{ key: "hours", label: "Hours of coverage" }, { key: "deliverables", label: "Deliverables", placeholder: "highlight film, full ceremony" }] },
  { slug: "florists", name: "Florists", singular: "Florist", priceUnit: "EVENT", q: [{ key: "pieces", label: "What you need", placeholder: "bouquets, ceremony arch, 12 centerpieces" }, { key: "palette", label: "Palette" }] },
  { slug: "catering", name: "Catering", singular: "Caterer", priceUnit: "GUEST", q: [{ key: "service_style", label: "Service style", placeholder: "plated, buffet, stations" }, { key: "dietary", label: "Dietary needs" }] },
  { slug: "cakes-and-desserts", name: "Cakes and desserts", singular: "Cake designer", priceUnit: "EVENT", q: [{ key: "servings", label: "Servings" }, { key: "style", label: "Style", placeholder: "tiered, dessert table, cupcakes" }] },
  { slug: "djs-and-bands", name: "DJs and bands", singular: "DJ or band", priceUnit: "EVENT", q: [{ key: "hours", label: "Hours" }, { key: "ceremony_audio", label: "Ceremony audio needed?" }, { key: "genres", label: "Must-play genres" }] },
  { slug: "officiants", name: "Officiants", singular: "Officiant", priceUnit: "EVENT", q: [{ key: "ceremony_type", label: "Ceremony type", placeholder: "secular, religious, bilingual" }] },
  { slug: "beauty", name: "Beauty", singular: "Hair and makeup artist", priceUnit: "EVENT", q: [{ key: "people", label: "Number of people", placeholder: "both partners plus 4" }, { key: "onsite", label: "On site?" }] },
  { slug: "rentals-and-decor", name: "Rentals and decor", singular: "Rentals and decor", priceUnit: "EVENT", q: [{ key: "items", label: "Items", placeholder: "lounge, chairs, linens, lighting" }] },
  { slug: "stationery", name: "Stationery", singular: "Stationer", priceUnit: "EVENT", q: [{ key: "quantity", label: "Invitation quantity" }, { key: "pieces", label: "Pieces", placeholder: "invites, day-of signage" }] },
  { slug: "transportation", name: "Transportation", singular: "Transportation", priceUnit: "EVENT", q: [{ key: "passengers", label: "Passengers" }, { key: "route", label: "Route" }] },
  { slug: "restroom-trailers", name: "Restroom trailers", singular: "Restroom trailer", priceUnit: "EVENT", q: [{ key: "guests", label: "Guest count" }, { key: "site_access", label: "Site access and power", placeholder: "paved, hookup available" }] },
];

type V = { name: string; cat: string; start: number; low: number; high: number; tagline: string; tags: string; pkg: [string, number, string][]; site?: number; guest?: number; cap?: number; desc?: string };

const IMG = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const VENDORS: V[] = [
  { name: "Harbor Light Studio (sample)", cat: "photographers", start: 3200, low: 3200, high: 5800, tagline: "Documentary wedding photography along the San Diego coast.", tags: "documentary, candid, coastal", pkg: [["Eight hours, one photographer", 3200, "Full-day coverage, online gallery within 6 weeks, print release"], ["Ten hours, two photographers", 4600, "Adds a second shooter and an engagement session"], ["Full weekend", 5800, "Rehearsal dinner plus wedding day, two photographers, album"]] },
  { name: "Golden Hour Films (sample)", cat: "videographers", start: 2800, low: 2800, high: 5200, tagline: "Short films cut to your vows, not a template.", tags: "cinematic, highlight film, drone", pkg: [["Highlight film", 2800, "Six hours, 4 to 6 minute film, licensed music"], ["Highlight plus ceremony", 3900, "Adds full ceremony and toasts edits"], ["Feature", 5200, "Ten hours, two shooters, 12 minute feature, raw footage"]] },
  { name: "Bluff and Bloom Florals (sample)", cat: "florists", start: 2500, low: 3500, high: 9000, tagline: "Garden-style florals, seasonal and local where it counts.", tags: "garden, lush, seasonal", pkg: [["Personals only", 2500, "Two bouquets, boutonnieres or corsages for 8"], ["Ceremony and personals", 4800, "Adds an arch or meadow installation"], ["Full design", 9000, "Personals, ceremony, 15 centerpieces, cake flowers, delivery and strike"]] },
  { name: "Coastline Sound (sample)", cat: "djs-and-bands", start: 1800, low: 1800, high: 3400, tagline: "DJ and MC team with a bilingual emcee on request.", tags: "bilingual, open format, latin", pkg: [["Reception, five hours", 1800, "DJ and MC, dance floor lighting, wireless mics"], ["Ceremony through send-off", 2600, "Adds ceremony audio and cocktail hour setup"], ["Band and DJ hybrid", 3400, "Adds a live percussionist and sax for two sets"]] },
  { name: "Mesa Verde Catering (sample)", cat: "catering", start: 95, low: 110, high: 185, tagline: "Baja-Mediterranean menus, plated or family style.", tags: "family style, baja, plated", pkg: [["Family style, three courses", 95, "Per guest, includes staff and standard rentals, 100 guest minimum"], ["Plated, three courses", 125, "Per guest, choice of two entrees, includes staff"], ["Stations and late-night", 150, "Per guest, five stations and a late-night taco cart"]] },
  { name: "Palomar Planning Co. (sample)", cat: "planners", start: 2400, low: 2400, high: 12000, tagline: "Month-of coordination to full planning for 60 to 250 guests.", tags: "full service, month-of, hotel weddings", pkg: [["Month-of coordination", 2400, "Starts 8 weeks out, timeline, vendor confirmations, day-of team of two"], ["Partial planning", 6500, "Design direction, vendor sourcing for 5 categories, month-of included"], ["Full planning and design", 12000, "Everything from venue search to send-off"]] },
  { name: "Torrey Pines Tented Events (sample)", cat: "rentals-and-decor", start: 1500, low: 2000, high: 15000, tagline: "Sailcloth tents, lounge, lighting, and specialty linens.", tags: "tents, lounge, lighting", pkg: [["Lounge and lighting", 1500, "Two lounge groupings and bistro lighting"], ["Tabletop package", 4200, "Chairs, tables, linens, flatware for 120"], ["Sailcloth tent, 120 guests", 15000, "Tent, flooring, lighting, sidewalls, install and strike"]] },
  { name: "Cardiff Cake House (sample)", cat: "cakes-and-desserts", start: 650, low: 650, high: 2200, tagline: "Three-tier classics and dessert tables, dairy-free on request.", tags: "tiered, dessert table, vegan option", pkg: [["Three tiers, 80 servings", 650, "Buttercream, two flavors, delivery within 20 miles"], ["Four tiers, 140 servings", 1200, "Three flavors, sugar flowers"], ["Cake and dessert table", 2200, "Cake plus 200 mini desserts, styling"]] },
  { name: "Reverend Alma Reyes (sample)", cat: "officiants", start: 550, low: 550, high: 900, tagline: "Secular, interfaith, and bilingual ceremonies written with you.", tags: "bilingual, secular, interfaith", pkg: [["Custom ceremony", 550, "Two planning meetings, custom script, rehearsal by video"], ["Custom ceremony with rehearsal", 750, "Adds in-person rehearsal"], ["Bilingual ceremony", 900, "English and Spanish, rehearsal included"]] },
  { name: "Glow Collective Beauty (sample)", cat: "beauty", start: 350, low: 900, high: 2400, tagline: "Hair and makeup for every face, every skin tone, every gender.", tags: "inclusive, airbrush, onsite", pkg: [["One person, hair and makeup", 350, "Trial not included"], ["Two partners plus four", 1500, "On site, two artists, timeline support"], ["Party of ten", 2400, "Three artists, trials for both partners"]] },
  { name: "Ink and Linen Paper (sample)", cat: "stationery", start: 900, low: 900, high: 3500, tagline: "Letterpress suites and day-of signage.", tags: "letterpress, custom, signage", pkg: [["Digital suite, 100", 900, "Invitation, details card, RSVP, envelopes"], ["Letterpress suite, 100", 2200, "Two-color letterpress, envelope liners"], ["Suite plus day-of", 3500, "Adds seating chart, menus, signage"]] },
  { name: "Bayline Shuttles (sample)", cat: "transportation", start: 650, low: 650, high: 2800, tagline: "Guest shuttles and getaway cars, downtown to North County.", tags: "shuttle, vintage car, hotel loops", pkg: [["Getaway car, 2 hours", 650, "Classic car with driver"], ["One 25-passenger shuttle, 5 hours", 1400, "Hotel to venue loop"], ["Two 40-passenger coaches, 6 hours", 2800, "Round trips and late shuttle"]] },
  { name: "Pacifica Luxury Restrooms (sample)", cat: "restroom-trailers", start: 1200, low: 1200, high: 3200, tagline: "Climate-controlled restroom trailers for estate and beach weddings.", tags: "estate, beach, attendant", pkg: [["Two-station trailer", 1200, "Up to 100 guests, delivery within 30 miles"], ["Four-station trailer", 2100, "Up to 200 guests, attendant optional"], ["Two trailers plus attendant", 3200, "300 guests, attendant for the full event"]] },
  { name: "The Olive Grove Estate (sample)", cat: "venues", start: 9500, low: 14000, high: 32000, tagline: "A private olive grove in Rancho Santa Fe with on-site ceremony lawn.", tags: "estate, garden, outdoor", site: 9500, guest: 55, cap: 180, pkg: [["Saturday site fee", 9500, "12 hours, ceremony lawn, reception terrace, tables and chairs for 150"], ["Friday or Sunday site fee", 7000, "Same inclusions"], ["Estate buyout with lodging", 18000, "Adds the main house for two nights"]] },
  { name: "Marina Ballroom at Shelter Cove (sample)", cat: "venues", start: 6000, low: 18000, high: 45000, tagline: "Waterfront ballroom for 120 to 300 with in-house catering.", tags: "ballroom, waterfront, hotel", site: 6000, guest: 145, cap: 300, pkg: [["Site fee", 6000, "Ballroom and terrace, 10 hours"], ["Food and beverage minimum", 25000, "Per event, in-house catering at $145 per guest and up"], ["Ceremony add-on", 2500, "Bayfront lawn, chairs for 200"]] },
];

// Generate more sample vendors per category to make search and price guides meaningful.
function more(): V[] {
  const out: V[] = [];
  const extra: Record<string, [string, number, number, number, string][]> = {
    photographers: [["Sunset Cliffs Photo (sample)", 2400, 2400, 4200, "film, editorial"], ["North County Candids (sample)", 1900, 1900, 3200, "candid, elopements"], ["Luma and Co. (sample)", 4800, 4800, 8500, "editorial, luxury"], ["Two Lenses Collective (sample)", 2900, 2900, 4900, "documentary, queer-owned"]],
    videographers: [["Reel Coast (sample)", 2200, 2200, 3800, "highlight film"], ["Tidewater Motion (sample)", 3600, 3600, 6500, "cinematic, feature"]],
    florists: [["Wild Fennel Floral (sample)", 1800, 2500, 6000, "wildflower, modern"], ["Studio Camellia (sample)", 4000, 6000, 18000, "luxury, installations"], ["Ranch Rose Co. (sample)", 1200, 1500, 4000, "rustic, budget-friendly"]],
    "djs-and-bands": [["The Del Mar Nine (sample)", 6500, 6500, 11000, "band, soul, motown"], ["Vinyl Vows DJ (sample)", 1400, 1400, 2400, "vinyl, indie"], ["Mariachi Sol de Oro (sample)", 1200, 1200, 2200, "mariachi, ceremony"]],
    catering: [["Taco Cartel Catering (sample)", 42, 45, 75, "tacos, casual, stations"], ["Fig and Fork (sample)", 140, 160, 240, "fine dining, plated"], ["Green Table Vegan Catering (sample)", 85, 95, 140, "vegan, plant-based"]],
    planners: [["Aisle Ready Coordination (sample)", 1800, 1800, 4000, "month-of, budget-friendly"], ["Saltwater Weddings (sample)", 4500, 4500, 15000, "destination, luxury"], ["Two Grooms Events (sample)", 3000, 3000, 9000, "LGBTQ-owned, full service"]],
    "rentals-and-decor": [["Boho Lounge Rentals (sample)", 900, 900, 4000, "boho, lounge"], ["Lumen Lighting (sample)", 1200, 1200, 6000, "lighting, uplights"]],
    "cakes-and-desserts": [["Sweet Mesa Bakery (sample)", 450, 450, 1400, "buttercream, cupcakes"], ["Churro Cart SD (sample)", 600, 600, 1200, "churros, late-night"]],
    officiants: [["Officiant Jordan Lee (sample)", 400, 400, 700, "secular, LGBTQ-affirming"], ["Rabbi Dana Klein (sample)", 800, 800, 1200, "jewish, interfaith"]],
    beauty: [["Bridal and Beyond Beauty (sample)", 300, 700, 2000, "airbrush, hair"], ["Barber and Blush (sample)", 250, 500, 1500, "grooming, all genders"]],
    stationery: [["Paper Tide (sample)", 600, 600, 2000, "digital, modern"]],
    transportation: [["Coronado Trolley Co. (sample)", 900, 900, 2400, "trolley, fun"]],
    "restroom-trailers": [["Coastal Comfort Trailers (sample)", 950, 950, 2600, "budget, beach"]],
    venues: [["Hillcrest Loft (sample)", 3500, 8000, 20000, "urban, loft, industrial"], ["Cuyamaca Ranch (sample)", 7500, 12000, 28000, "ranch, rustic, mountain"], ["Oceanside Pier House (sample)", 5000, 10000, 24000, "beach, casual"], ["La Jolla Garden Club (sample)", 4200, 9000, 22000, "garden, historic, intimate"]],
  };
  for (const [cat, rows] of Object.entries(extra)) {
    for (const [name, start, low, high, tags] of rows) {
      const isVenue = cat === "venues";
      out.push({
        name,
        cat,
        start,
        low,
        high,
        tagline: `${tags.split(",")[0].trim()} ${CATEGORIES.find((c) => c.slug === cat)!.singular.toLowerCase()} serving San Diego County.`,
        tags,
        site: isVenue ? start : undefined,
        guest: isVenue ? Math.round(low / 120) : undefined,
        cap: isVenue ? 150 + Math.round(high / 200) : undefined,
        pkg: [["Starter", start, "The entry package as published on our site."], ["Most booked", Math.round((low + high) / 2), "The package most couples choose."], ["Everything", high, "Our fullest scope."]],
      });
    }
  }
  return out;
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function main() {
  const metro = await db.metro.upsert({ where: { slug: "san-diego" }, update: {}, create: { slug: "san-diego", name: "San Diego", state: "CA" } });
  const cats: Record<string, string> = {};
  for (const [i, c] of CATEGORIES.entries()) {
    const row = await db.category.upsert({ where: { slug: c.slug }, update: { name: c.name, singular: c.singular, priceUnit: c.priceUnit, sortOrder: i, questionsJson: JSON.stringify(c.q) }, create: { slug: c.slug, name: c.name, singular: c.singular, priceUnit: c.priceUnit, sortOrder: i, questionsJson: JSON.stringify(c.q) } });
    cats[c.slug] = row.id;
  }

  const pw = await bcrypt.hash("password1234", 12);
  const admin = await db.user.upsert({ where: { email: "admin@clearvow.example" }, update: { role: "ADMIN" }, create: { email: "admin@clearvow.example", passwordHash: pw, role: "ADMIN", name: "Admin", emailVerifiedAt: new Date(), phoneVerifiedAt: new Date(), phone: "+16195550100" } });
  const vendorUser = await db.user.upsert({ where: { email: "vendor@clearvow.example" }, update: {}, create: { email: "vendor@clearvow.example", passwordHash: pw, role: "VENDOR", name: "Sample Vendor", emailVerifiedAt: new Date() } });
  const coupleUser = await db.user.upsert({ where: { email: "couple@clearvow.example" }, update: {}, create: { email: "couple@clearvow.example", passwordHash: pw, role: "COUPLE", name: "Sam & Riley", emailVerifiedAt: new Date(), phoneVerifiedAt: new Date(), phone: "+16195550199" } });
  await db.couple.upsert({ where: { userId: coupleUser.id }, update: {}, create: { userId: coupleUser.id, metroId: metro.id, partnerAName: "Sam", partnerAPronouns: "they/them", partnerBName: "Riley", partnerBPronouns: "she/her", weddingDate: new Date("2027-05-15T00:00:00Z"), guestCount: 120, budgetTotal: 45000 } });

  const all = [...VENDORS, ...more()];
  const daysAgo = (n: number) => new Date(Date.now() - n * 86400_000);
  let i = 0;
  for (const v of all) {
    const slug = slugify(v.name);
    const confirmedDaysAgo = i % 7 === 0 ? 200 : (i * 13) % 85; // a few stale on purpose
    const vendor = await db.vendor.upsert({
      where: { slug },
      update: { startingPrice: v.start, typicalLow: v.low, typicalHigh: v.high },
      create: {
        slug,
        name: v.name,
        metroId: metro.id,
        categoryId: cats[v.cat],
        ownerId: i === 0 ? vendorUser.id : null,
        isClaimed: i === 0,
        tagline: v.tagline,
        description: v.desc ?? `${v.name} is a sample listing created to demonstrate Clearvow. The prices shown are illustrative, not quotes from a real business.\n\nWe publish a starting price, a typical range, and packages because couples told us pricing is the first thing they want to know. Every inquiry we receive through Clearvow arrives with a date, venue, guest count, and budget band, so we can answer quickly and accurately.`,
        serviceArea: "San Diego County",
        startingPrice: v.start,
        typicalLow: v.low,
        typicalHigh: v.high,
        siteFeeFrom: v.site ?? null,
        perGuestFrom: v.guest ?? null,
        capacity: v.cap ?? null,
        priceConfirmedAt: daysAgo(confirmedDaysAgo),
        pledgeSignedAt: i % 9 === 4 ? null : daysAgo(30),
        plan: i % 5 === 0 ? "PRO" : "FREE",
        status: "LIVE",
        styleTags: v.tags,
        contactEmail: `${slug}@clearvow.example`,
        inquiryCount: (i * 7) % 23,
        replyCount: Math.round((((i * 7) % 23) * (60 + (i % 40))) / 100),
        medianReplyHours: i % 4 === 0 ? 5 + (i % 10) : i % 4 === 1 ? 30 + i : null,
        quoteMatchRate: i % 3 === 0 ? 0.95 : i % 3 === 1 ? 0.82 : null,
        images: { create: [0, 1, 2].map((n) => ({ url: IMG(`${slug}-${n}`), alt: `${v.name} portfolio image ${n + 1}`, sortOrder: n })) },
        packages: { create: v.pkg.map(([name, price, description], n) => ({ name, price, description, sortOrder: n })) },
      },
    });
    // Ensure the pledge/no-pledge mix holds on re-seed without clobbering real data.
    void vendor;
    i++;
  }

  const byName = async (n: string) => db.vendor.findFirst({ where: { name: n } });
  const WEDDINGS = [
    { title: "A Garden Wedding at Park Hyatt Aviara in Carlsbad (sample)", venue: "Park Hyatt Aviara", a: "Erica", b: "Patrick", guests: 140, band: "$50k to $100k", credits: [["Photographer", "Harbor Light Studio (sample)"], ["Florist", "Bluff and Bloom Florals (sample)"], ["Planner", "Palomar Planning Co. (sample)"], ["DJ", "Coastline Sound (sample)"], ["Cake", "Cardiff Cake House (sample)"], ["Rentals", "Torrey Pines Tented Events (sample)"]] },
    { title: "A Black-Tie Evening at The Westgate Hotel, Downtown San Diego (sample)", venue: "The Westgate Hotel", a: "Cherine", b: "Andy", guests: 180, band: "$50k to $100k", credits: [["Photographer", "Luma and Co. (sample)"], ["Florist", "Studio Camellia (sample)"], ["Band", "The Del Mar Nine (sample)"], ["Beauty", "Glow Collective Beauty (sample)"], ["Stationery", "Ink and Linen Paper (sample)"]] },
    { title: "Two Grooms, One Olive Grove in Rancho Santa Fe (sample)", venue: "The Olive Grove Estate (sample)", a: "Marcus", b: "Daniel", guests: 95, band: "$30k to $50k", credits: [["Photographer", "Two Lenses Collective (sample)"], ["Planner", "Two Grooms Events (sample)"], ["Officiant", "Officiant Jordan Lee (sample)"], ["Catering", "Mesa Verde Catering (sample)"], ["Restroom trailer", "Pacifica Luxury Restrooms (sample)"], ["Florist", "Wild Fennel Floral (sample)"]] },
    { title: "A Bilingual Beach Ceremony at Oceanside Pier House (sample)", venue: "Oceanside Pier House (sample)", a: "Valentina", b: "Jun", guests: 110, band: "$15k to $30k", credits: [["Photographer", "North County Candids (sample)"], ["Officiant", "Reverend Alma Reyes (sample)"], ["Music", "Mariachi Sol de Oro (sample)"], ["Catering", "Taco Cartel Catering (sample)"], ["Desserts", "Churro Cart SD (sample)"]] },
  ];
  for (const [n, w] of WEDDINGS.entries()) {
    const slug = slugify(`${w.a}-and-${w.b}-${w.venue}`);
    const venueVendor = await db.vendor.findFirst({ where: { name: w.venue } });
    const wedding = await db.realWedding.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: w.title,
        metroId: metro.id,
        venueVendorId: venueVendor?.id ?? null,
        venueName: w.venue,
        eventDate: daysAgo(60 + n * 45),
        partnerAName: w.a,
        partnerBName: w.b,
        guestCount: w.guests,
        budgetBand: w.band,
        coverUrl: IMG(`${slug}-cover`, 1600, 900),
        story: `${w.a} and ${w.b} wanted a day that felt like them: unhurried, generous with food, and loud on the dance floor. This is a sample story written to demonstrate how Clearvow presents real weddings.\n\nThe ceremony ran at golden hour. Dinner was family style. Every vendor on this page published their prices, which is how the couple built the team within budget without a single "request pricing" email.\n\nThe credited vendors below are sample listings; in production, each links to a real profile with live prices.`,
        status: "PUBLISHED",
        consentConfirmed: true,
        publishedAt: daysAgo(10 + n * 20),
        submittedByVendorId: (await byName(w.credits[0][1]))?.id ?? null,
        images: { create: [0, 1, 2, 3].map((k) => ({ url: IMG(`${slug}-${k}`, 800, 1000), alt: `${w.venue} wedding detail ${k + 1}`, sortOrder: k })) },
      },
    });
    for (const [role, name] of w.credits) {
      const vend = await byName(name);
      if (!vend) continue;
      await db.realWeddingCredit.upsert({ where: { realWeddingId_vendorId_role: { realWeddingId: wedding.id, vendorId: vend.id, role } }, update: {}, create: { realWeddingId: wedding.id, vendorId: vend.id, role } });
    }
  }

  // A sample inquiry from the demo couple to the vendor-owned sample vendor, so both dashboards have content.
  const couple = await db.couple.findUnique({ where: { userId: coupleUser.id } });
  const target = await db.vendor.findFirst({ where: { ownerId: vendorUser.id } });
  if (couple && target) {
    const existing = await db.inquiry.findFirst({ where: { coupleId: couple.id, vendorId: target.id } });
    if (!existing) {
      await db.inquiry.create({
        data: {
          coupleId: couple.id,
          vendorId: target.id,
          categoryId: target.categoryId,
          eventDate: new Date("2027-05-15T00:00:00Z"),
          venueName: "The Olive Grove Estate (sample)",
          guestCount: 120,
          budgetLow: 2500,
          budgetHigh: 5000,
          needsJson: JSON.stringify({ hours: "8", second_shooter: "yes", style: "documentary", _brief: "Sam and Riley are looking for a photographer.\nDate: May 15, 2027. Venue: The Olive Grove Estate (sample). Guests: 120. Budget for this category: $2,500 to $5,000.\nNeeds: hours: 8; second_shooter: yes; style: documentary.\nIn their words: \"We want candid photos of our friends, not posed group shots all afternoon.\"", _briefSource: "fallback" }),
          message: "We want candid photos of our friends, not posed group shots all afternoon.",
          status: "DELIVERED",
          verifiedEmail: true,
          verifiedPhone: true,
        },
      });
    }
  }
  console.log(`Seeded: ${all.length} sample vendors, ${WEDDINGS.length} sample weddings, admin ${admin.email}. Password for all demo accounts: password1234`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
