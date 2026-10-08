import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of service" };
export default function TermsPage() {
  return (
    <div className="container-x py-10 max-w-3xl prose-cv text-[15px]">
      <h1 className="text-3xl font-semibold">Terms of service</h1>
      <p className="text-ink-3 mt-2">Draft for counsel review before launch. Not yet legal advice.</p>
      <h2 className="text-xl font-semibold mt-6">1. What Clearvow is</h2>
      <p>Clearvow is a marketplace that lists wedding vendors and delivers inquiries from couples to vendors. Clearvow is not a party to any contract between a couple and a vendor and does not guarantee availability, quality, or final price.</p>
      <h2 className="text-xl font-semibold mt-6">2. Published prices</h2>
      <p>Prices on vendor profiles are published and confirmed by the vendor. A vendor represents that published prices are accurate as of the confirmation date. Final quotes may differ based on scope; couples may report whether a quote fell within the published range, and that feedback affects the vendor&apos;s Price-Honest status.</p>
      <h2 className="text-xl font-semibold mt-6">3. Inquiries and verification</h2>
      <p>Couples agree to verify an email address and mobile number and consent to receive transactional email and SMS about their inquiries. Vendors agree to use couple contact details only to respond to the inquiry.</p>
      <h2 className="text-xl font-semibold mt-6">4. Vendor plans and unlocks</h2>
      <p>Plans renew monthly or annually and may be canceled at any time, effective at the end of the paid period. Inquiry unlocks are refunded automatically if the couple does not reply within 7 days of the vendor&apos;s first reply.</p>
      <h2 className="text-xl font-semibold mt-6">5. Content and consent</h2>
      <p>Vendors submitting real weddings confirm they hold the rights to the images and the couple&apos;s consent to publish names. Couples may request removal at any time.</p>
      <h2 className="text-xl font-semibold mt-6">6. Related businesses and vendor contact</h2>
      <p>Clearvow&apos;s founders operate Bella Mia Exclusive Events, Ethereal Luxury Restrooms, and Atelier Launch Co. Bella Mia and Ethereal are listed on Clearvow under the same terms, pricing rules, and ranking as every other vendor, are excluded from paid placements, and are identified by a disclosure on their profiles. By claiming or creating a vendor profile you agree that Atelier Launch Co. may contact you once, using the business contact details you provide, to offer its services. You may decline at any time, declining has no effect on your listing or ranking, and couple contact details and inquiry contents are never used for this purpose.</p>
      <h2 className="text-xl font-semibold mt-6">7. Conduct</h2>
      <p>Vendors agree to the Welcomes Every Couple pledge. Abuse, discrimination, or fraudulent inquiries result in removal.</p>
    </div>
  );
}
