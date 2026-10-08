import type { Metadata } from "next";
import { RANKING_WEIGHTS } from "@/lib/ranking";

export const metadata: Metadata = { title: "Trust and ranking rules", description: "How Clearvow verifies inquiries, ranks vendors, earns the Price-Honest mark, and handles reviews and reports." };

export default function TrustPage() {
  return (
    <div className="container-x py-10 max-w-3xl prose-cv">
      <h1 className="text-3xl md:text-4xl font-semibold">Trust and ranking rules</h1>
      <p className="text-ink-2 mt-3">These rules are the product. They are written down so couples and vendors can hold us to them.</p>

      <h2 className="text-2xl font-semibold mt-10">1. Published prices are required</h2>
      <p>A vendor cannot appear in the directory without a starting price, a typical range, and at least one package. Prices carry the date they were last confirmed. Prices older than 180 days are flagged on the profile and in search. Prices older than 90 days trigger a reminder to the vendor.</p>

      <h2 className="text-2xl font-semibold mt-8">2. Inquiries are verified before delivery</h2>
      <p>A couple verifies their email and mobile number once. Until both are verified, an inquiry is held and the vendor does not see it. Inquiries are structured: date, venue, guest count, budget band, category questions, and an optional message. Couples may send up to 15 inquiries a day and one open inquiry per vendor. Free-tier vendors read the full brief before paying to reveal contact details. If the couple never replies within 7 days of the vendor&apos;s first reply, the unlock is refunded automatically.</p>

      <h2 className="text-2xl font-semibold mt-8">3. Ranking that money cannot buy</h2>
      <p>Within a category and city, vendors are ordered by a score. The plan a vendor pays for is not an input. The weights are:</p>
      <ul className="list-disc pl-6 text-ink-2">
        <li>Response rate: {Math.round(RANKING_WEIGHTS.responseRate * 100)}%</li>
        <li>Quote-match rate (did quotes fall inside the published range): {Math.round(RANKING_WEIGHTS.quoteMatchRate * 100)}%</li>
        <li>Profile completeness: {Math.round(RANKING_WEIGHTS.completeness * 100)}%</li>
        <li>Price freshness: {Math.round(RANKING_WEIGHTS.priceFreshness * 100)}%</li>
        <li>Real-wedding credits: {Math.round(RANKING_WEIGHTS.credits * 100)}%</li>
      </ul>
      <p>New vendors with fewer than three inquiries get neutral defaults so they are not buried. The only paid placement is Spotlight: at most three per category and city, always labeled &quot;Sponsored,&quot; always above the ranked list, never mixed into it.</p>

      <h2 className="text-2xl font-semibold mt-8">4. Price-Honest mark</h2>
      <p>Earned when a vendor has published prices confirmed in the last 180 days and at least three couples have reported on quotes, with 90% or more falling inside the published range. It cannot be purchased. It is removed automatically when the rate drops below 90%.</p>

      <h2 className="text-2xl font-semibold mt-8">5. Reviews</h2>
      <p>Only couples who had a replied inquiry with a vendor through Clearvow can review that vendor, one review per couple, editable. Vendors cannot pay to remove reviews. Reviews that violate the terms (harassment, off-platform disputes with no inquiry) are hidden with a note.</p>

      <h2 className="text-2xl font-semibold mt-8">6. Real weddings</h2>
      <p>Submitted by vendors who confirm they hold rights to the images and the couple&apos;s consent to publish names. Reviewed before publishing. Every credited vendor is linked. Couples may request removal of their wedding at any time by emailing us; removal is completed within two business days.</p>

      <h2 className="text-2xl font-semibold mt-8">7. Reporting</h2>
      <p>Every profile, inquiry, and wedding can be reported. Reports go to a human. Vendors who send abusive replies or couples who send abusive inquiries are removed.</p>
    </div>
  );
}
