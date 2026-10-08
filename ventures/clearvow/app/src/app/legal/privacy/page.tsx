import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy policy" };
export default function PrivacyPage() {
  return (
    <div className="container-x py-10 max-w-3xl prose-cv text-[15px]">
      <h1 className="text-3xl font-semibold">Privacy policy</h1>
      <p className="text-ink-3 mt-2">Draft for counsel review before launch (CCPA/CPRA applicability to be confirmed).</p>
      <h2 className="text-xl font-semibold mt-6">What we collect</h2>
      <p>Account email and password hash; for couples, partner first names, optional pronouns, wedding date, city, guest count, budget, and a mobile number used for verification; for vendors, business details and published prices; inquiry contents; product usage events tied to your account id.</p>
      <h2 className="text-xl font-semibold mt-6">How we use it</h2>
      <p>To deliver inquiries to the vendors you choose, to compute public accountability stats (response times, quote-match rates), to send transactional email and SMS, and to improve the product. We do not sell personal information and we do not share couple contact details with any vendor you did not contact.</p>
      <h2 className="text-xl font-semibold mt-6">Your choices</h2>
      <p>Export or delete your account from Settings. Unsubscribe links appear in every marketing email. SMS is used only for verification and inquiry notifications.</p>
      <h2 className="text-xl font-semibold mt-6">Processors</h2>
      <p>Hosting, database, email, SMS, payments (Stripe), and error monitoring providers process data on our behalf under contract.</p>
    </div>
  );
}
