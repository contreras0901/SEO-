import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Clearvow", description: "Why we built a wedding marketplace that publishes prices and verifies inquiries." };

export default function AboutPage() {
  return (
    <div className="container-x py-10 max-w-3xl prose-cv text-[16px]">
      <h1 className="text-3xl md:text-4xl font-semibold">About Clearvow</h1>
      <p className="mt-4">Clearvow was started by people who work in weddings in San Diego: planning, florals, rentals, and the unglamorous logistics. We watched couples send the same blank &quot;tell me more&quot; email to twenty vendors because nobody would publish a price, and we watched vendors pay for leads that never answered.</p>
      <p>So the rules here are simple. Vendors publish prices. Couples verify who they are. Inquiries carry the facts a vendor needs. Nobody pays to jump the line, and we write down how ranking works.</p>
      <p>We launch one city at a time, starting with San Diego, because a directory with three vendors in your category is not useful to anyone.</p>
      <h2 className="text-2xl font-semibold mt-8">A note on our own businesses</h2>
      <p>The founders also operate wedding vendors in San Diego. Those businesses are listed on Clearvow under the same rules as everyone else: same published prices, same ranking score, no Spotlight slots. We say this plainly because trust is the whole product.</p>
    </div>
  );
}
