"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getCurrentUser } from "../auth";
import { flattenErrors, realWeddingSchema, vendorGoLiveProblems, vendorPricingSchema, vendorProfileSchema } from "../validation";
import { slugify } from "../format";
import { track, audit } from "../analytics";
import { PLANS } from "../plans";
import type { ActionState } from "./types";

async function ownedVendor(userId: string, role: string, vendorId?: string) {
  if (vendorId && role === "ADMIN") return db.vendor.findUnique({ where: { id: vendorId }, include: { packages: true, images: true } });
  return db.vendor.findFirst({ where: { ownerId: userId }, include: { packages: true, images: true }, orderBy: { createdAt: "asc" } });
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = slugify(base) || "vendor";
  let i = 2;
  while (await db.vendor.findUnique({ where: { slug } })) slug = `${slugify(base)}-${i++}`;
  return slug;
}

/** Claim an existing unclaimed profile (created from real-wedding credits or seed) or create a new one. */
export async function claimOrCreateVendor(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-up?role=VENDOR&next=/claim");
  if (user.role === "COUPLE") {
    await db.user.update({ where: { id: user.id }, data: { role: "VENDOR" } });
  }
  const already = await db.vendor.findFirst({ where: { ownerId: user.id } });
  if (already) redirect("/vendor/profile");

  const claimId = String(formData.get("claimId") || "");
  if (claimId) {
    const v = await db.vendor.findUnique({ where: { id: claimId } });
    if (!v || v.isClaimed) return { ok: false, errors: { _: "That profile is already claimed. Contact support if it is yours." } };
    await db.vendor.update({ where: { id: v.id }, data: { ownerId: user.id, isClaimed: true, status: v.status === "LIVE" ? "LIVE" : "DRAFT" } });
    await audit(user.id, "vendor.claim", "Vendor", v.id);
    await track("vendor_claimed", {}, user.id, v.id);
    redirect("/vendor/profile?claimed=1");
  }

  const parsed = vendorProfileSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline") || "",
    description: formData.get("description") || "",
    serviceArea: formData.get("serviceArea") || "",
    website: formData.get("website") || "",
    instagram: formData.get("instagram") || "",
    contactEmail: formData.get("contactEmail") || user.email,
    contactPhone: formData.get("contactPhone") || "",
    categorySlug: formData.get("categorySlug"),
    metroSlug: formData.get("metroSlug"),
    styleTags: formData.get("styleTags") || "",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;
  const [category, metro] = await Promise.all([db.category.findUnique({ where: { slug: d.categorySlug } }), db.metro.findUnique({ where: { slug: d.metroSlug } })]);
  if (!category) return { ok: false, errors: { categorySlug: "Pick a category." } };
  if (!metro) return { ok: false, errors: { metroSlug: "Pick a city we serve." } };
  const vendor = await db.vendor.create({
    data: {
      ownerId: user.id,
      isClaimed: true,
      metroId: metro.id,
      categoryId: category.id,
      slug: await uniqueSlug(d.name),
      name: d.name,
      tagline: d.tagline || null,
      description: d.description,
      serviceArea: d.serviceArea || metro.name,
      website: d.website || null,
      instagram: d.instagram || null,
      contactEmail: d.contactEmail || user.email,
      contactPhone: d.contactPhone || null,
      styleTags: d.styleTags,
      status: "DRAFT",
    },
  });
  await track("vendor_created", { category: category.slug }, user.id, vendor.id);
  redirect("/vendor/pricing?new=1");
}

export async function updateVendorProfile(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/profile");
  const vendor = await ownedVendor(user.id, user.role, String(formData.get("vendorId") || ""));
  if (!vendor) redirect("/claim");
  const parsed = vendorProfileSchema.safeParse({
    name: formData.get("name"),
    tagline: formData.get("tagline") || "",
    description: formData.get("description") || "",
    serviceArea: formData.get("serviceArea") || "",
    website: formData.get("website") || "",
    instagram: formData.get("instagram") || "",
    contactEmail: formData.get("contactEmail") || "",
    contactPhone: formData.get("contactPhone") || "",
    categorySlug: formData.get("categorySlug"),
    metroSlug: formData.get("metroSlug"),
    styleTags: formData.get("styleTags") || "",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;
  const [category, metro] = await Promise.all([db.category.findUnique({ where: { slug: d.categorySlug } }), db.metro.findUnique({ where: { slug: d.metroSlug } })]);
  if (!category || !metro) return { ok: false, errors: { _: "Invalid category or city." } };
  const categoryChanged = category.id !== vendor.categoryId;
  // Images: up to 6 URLs, one per line.
  const imageLines = String(formData.get("imageUrls") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//.test(s))
    .slice(0, 6);
  await db.$transaction([
    db.vendor.update({
      where: { id: vendor.id },
      data: {
        name: d.name,
        tagline: d.tagline || null,
        description: d.description,
        serviceArea: d.serviceArea || metro.name,
        website: d.website || null,
        instagram: d.instagram || null,
        contactEmail: d.contactEmail || null,
        contactPhone: d.contactPhone || null,
        categoryId: category.id,
        metroId: metro.id,
        styleTags: d.styleTags,
        // A category change on a live profile goes back to review (ranking integrity).
        status: categoryChanged && vendor.status === "LIVE" ? "PENDING" : vendor.status,
      },
    }),
    db.vendorImage.deleteMany({ where: { vendorId: vendor.id } }),
    ...imageLines.map((url, i) => db.vendorImage.create({ data: { vendorId: vendor.id, url, alt: `${d.name} portfolio image ${i + 1}`, sortOrder: i } })),
  ]);
  await audit(user.id, "vendor.profile.update", "Vendor", vendor.id, { categoryChanged });
  revalidatePath(`/vendors/${vendor.slug}`);
  revalidatePath("/vendor/profile");
  return { ok: true, message: categoryChanged && vendor.status === "LIVE" ? "Saved. Category changes are re-reviewed before going live." : "Saved." };
}

export async function updateVendorPricing(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/pricing");
  const vendor = await ownedVendor(user.id, user.role, String(formData.get("vendorId") || ""));
  if (!vendor) redirect("/claim");
  const parsed = vendorPricingSchema.safeParse({
    startingPrice: formData.get("startingPrice"),
    typicalLow: formData.get("typicalLow"),
    typicalHigh: formData.get("typicalHigh"),
    siteFeeFrom: formData.get("siteFeeFrom") || undefined,
    perGuestFrom: formData.get("perGuestFrom") || undefined,
    capacity: formData.get("capacity") || undefined,
    packageName: formData.get("packageName"),
    packagePrice: formData.get("packagePrice"),
    packageDescription: formData.get("packageDescription") || "",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;
  // Additional packages: package2Name/package2Price/package2Description, package3...
  const extra: { name: string; price: number; description: string }[] = [];
  for (const n of [2, 3]) {
    const name = String(formData.get(`package${n}Name`) || "").trim();
    const price = Number(formData.get(`package${n}Price`) || 0);
    if (name && price > 0) extra.push({ name: name.slice(0, 80), price: Math.round(price), description: String(formData.get(`package${n}Description`) || "").slice(0, 1000) });
  }
  const before = { startingPrice: vendor.startingPrice, typicalLow: vendor.typicalLow, typicalHigh: vendor.typicalHigh };
  const priceChanged = before.startingPrice !== d.startingPrice || before.typicalLow !== d.typicalLow || before.typicalHigh !== d.typicalHigh;
  await db.$transaction([
    db.vendor.update({
      where: { id: vendor.id },
      data: {
        startingPrice: d.startingPrice,
        typicalLow: d.typicalLow,
        typicalHigh: d.typicalHigh,
        siteFeeFrom: d.siteFeeFrom ?? null,
        perGuestFrom: d.perGuestFrom ?? null,
        capacity: d.capacity ?? null,
        priceConfirmedAt: new Date(),
      },
    }),
    db.package.deleteMany({ where: { vendorId: vendor.id } }),
    db.package.create({ data: { vendorId: vendor.id, name: d.packageName, price: d.packagePrice, description: d.packageDescription, sortOrder: 0 } }),
    ...extra.map((p, i) => db.package.create({ data: { vendorId: vendor.id, ...p, sortOrder: i + 1 } })),
  ]);
  await audit(user.id, "vendor.pricing.update", "Vendor", vendor.id, { before, after: { startingPrice: d.startingPrice, typicalLow: d.typicalLow, typicalHigh: d.typicalHigh } });
  await track("vendor_pricing_updated", { priceChanged }, user.id, vendor.id);
  revalidatePath(`/vendors/${vendor.slug}`);
  revalidatePath("/vendor/pricing");
  return { ok: true, message: "Prices saved and marked confirmed today." };
}

export async function signPledge(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/profile");
  const vendor = await ownedVendor(user.id, user.role, String(formData.get("vendorId") || ""));
  if (!vendor) redirect("/claim");
  if (formData.get("agree") !== "on") redirect("/vendor/profile?pledge=required");
  await db.vendor.update({ where: { id: vendor.id }, data: { pledgeSignedAt: new Date() } });
  await audit(user.id, "vendor.pledge.sign", "Vendor", vendor.id);
  await track("pledge_signed", {}, user.id, vendor.id);
  revalidatePath("/vendor/profile");
  redirect("/vendor/profile?pledge=signed");
}

export async function submitForReview(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor");
  const vendor = await ownedVendor(user.id, user.role, String(formData.get("vendorId") || ""));
  if (!vendor) redirect("/claim");
  const problems = vendorGoLiveProblems(vendor);
  if (problems.length) redirect("/vendor?incomplete=1");
  await db.vendor.update({ where: { id: vendor.id }, data: { status: "PENDING" } });
  await track("vendor_submitted_for_review", {}, user.id, vendor.id);
  redirect("/vendor?submitted=1");
}

export async function submitRealWedding(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/vendor/weddings/new");
  const vendor = await ownedVendor(user.id, user.role);
  if (!vendor) redirect("/claim");
  const parsed = realWeddingSchema.safeParse({
    title: formData.get("title"),
    venueName: formData.get("venueName"),
    eventDate: formData.get("eventDate") || "",
    partnerAName: formData.get("partnerAName"),
    partnerBName: formData.get("partnerBName"),
    story: formData.get("story"),
    coverUrl: formData.get("coverUrl") || "",
    guestCount: formData.get("guestCount") || undefined,
    budgetBand: formData.get("budgetBand") || "",
    consentConfirmed: formData.get("consentConfirmed"),
    credits: formData.get("credits") || "",
  });
  if (!parsed.success) return { ok: false, errors: flattenErrors(parsed.error) };
  const d = parsed.data;

  // Plan limit on submissions per rolling year.
  const limit = PLANS[(vendor.plan as keyof typeof PLANS) ?? "FREE"]?.weddingSubmissionsPerYear ?? 3;
  if (limit !== null) {
    const used = await db.realWedding.count({ where: { submittedByVendorId: vendor.id, createdAt: { gt: new Date(Date.now() - 365 * 86400_000) } } });
    if (used >= limit) return { ok: false, errors: { _: `Your plan allows ${limit} submissions per year. Upgrade for more.` } };
  }

  const metro = await db.metro.findUnique({ where: { id: vendor.metroId } });
  const venueVendor = await db.vendor.findFirst({ where: { name: { contains: d.venueName }, category: { slug: "venues" } } });
  const base = `${d.partnerAName}-and-${d.partnerBName}-${d.venueName}`;
  let slug = slugify(base);
  let i = 2;
  while (await db.realWedding.findUnique({ where: { slug } })) slug = `${slugify(base)}-${i++}`;

  const wedding = await db.realWedding.create({
    data: {
      slug,
      title: d.title,
      metroId: metro!.id,
      venueVendorId: venueVendor?.id ?? null,
      venueName: d.venueName,
      eventDate: d.eventDate ? new Date(d.eventDate + "T00:00:00Z") : null,
      partnerAName: d.partnerAName,
      partnerBName: d.partnerBName,
      story: d.story,
      coverUrl: d.coverUrl || null,
      guestCount: d.guestCount ?? null,
      budgetBand: d.budgetBand || null,
      status: "PENDING",
      submittedByVendorId: vendor.id,
      consentConfirmed: true,
    },
  });
  // Always credit the submitter.
  const category = await db.category.findUnique({ where: { id: vendor.categoryId } });
  await db.realWeddingCredit.create({ data: { realWeddingId: wedding.id, vendorId: vendor.id, role: category?.singular ?? "Vendor" } });
  // Credits: "Role | Vendor name" per line. Unknown vendors become unclaimed DRAFT profiles we can invite.
  for (const line of d.credits.split("\n")) {
    const [roleRaw, nameRaw] = line.split("|").map((s) => s?.trim());
    if (!roleRaw || !nameRaw) continue;
    let v = await db.vendor.findFirst({ where: { name: nameRaw, metroId: metro!.id } });
    if (!v) {
      const cat = (await db.category.findFirst({ where: { OR: [{ singular: { contains: roleRaw } }, { name: { contains: roleRaw } }] } })) ?? category!;
      v = await db.vendor.create({
        data: { metroId: metro!.id, categoryId: cat.id, slug: await uniqueSlug(nameRaw), name: nameRaw, status: "DRAFT", isClaimed: false, serviceArea: metro!.name },
      });
    }
    await db.realWeddingCredit.upsert({
      where: { realWeddingId_vendorId_role: { realWeddingId: wedding.id, vendorId: v.id, role: roleRaw } },
      create: { realWeddingId: wedding.id, vendorId: v.id, role: roleRaw },
      update: {},
    });
  }
  await track("real_wedding_submitted", {}, user.id, vendor.id);
  redirect("/vendor/weddings?submitted=1");
}
