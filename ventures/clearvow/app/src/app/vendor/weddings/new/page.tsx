import { requireVendor } from "@/lib/vendor-context";
import { submitRealWedding } from "@/lib/actions/vendor";
import { ActionForm, Field } from "@/components/ActionForm";

export const metadata = { title: "Submit a real wedding", robots: { index: false } };

export default async function NewWeddingPage() {
  const { vendor } = await requireVendor();
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold">Submit a real wedding</h2>
      <p className="text-[14px] text-ink-2 mt-1">Name the venue in the title; that is what couples search. Credit everyone. Uncredited vendors get an unclaimed profile and an invitation.</p>
      <div className="card p-6 mt-4">
        <ActionForm action={submitRealWedding} submitLabel="Submit for review">
          <Field name="title" label="Title" hint='e.g. "A Garden Wedding at Park Hyatt Aviara in Carlsbad"' required>
            <input id="title" name="title" className="input" required />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="venueName" label="Venue name" required>
              <input id="venueName" name="venueName" className="input" required />
            </Field>
            <Field name="eventDate" label="Wedding date">
              <input id="eventDate" name="eventDate" type="date" className="input" />
            </Field>
            <Field name="partnerAName" label="Partner one, first name" required>
              <input id="partnerAName" name="partnerAName" className="input" required />
            </Field>
            <Field name="partnerBName" label="Partner two, first name" required>
              <input id="partnerBName" name="partnerBName" className="input" required />
            </Field>
            <Field name="guestCount" label="Guest count">
              <input id="guestCount" name="guestCount" type="number" min={1} className="input" />
            </Field>
            <Field name="budgetBand" label="Approximate total budget" hint="Optional, with the couple's blessing">
              <select id="budgetBand" name="budgetBand" className="input" defaultValue="">
                <option value="">Not shared</option>
                {["Under $15k", "$15k to $30k", "$30k to $50k", "$50k to $100k", "$100k+"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field name="coverUrl" label="Cover image URL">
            <input id="coverUrl" name="coverUrl" className="input" placeholder="https://" />
          </Field>
          <Field name="story" label="The story" hint="What the couple wanted, what the team made, what mattered on the day. Blank lines separate paragraphs." required>
            <textarea id="story" name="story" className="input" rows={8} required />
          </Field>
          <Field name="credits" label="Vendor credits" hint={`One per line as "Role | Business name". ${vendor.name} is credited automatically.`}>
            <textarea id="credits" name="credits" className="input font-mono text-[13px]" rows={6} placeholder={"Photographer | Harbor Light Studio\nFlorist | Bella Mia Exclusive Events\nDJ | Coastline Sound"} />
          </Field>
          <label className="flex gap-2 items-start text-[13px]">
            <input type="checkbox" name="consentConfirmed" className="mt-1" />
            <span>I hold the rights to these images and have the couple&apos;s consent to publish their first names and this story. They can request removal at any time.</span>
          </label>
        </ActionForm>
      </div>
    </div>
  );
}
