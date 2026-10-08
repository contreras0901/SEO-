import Link from "next/link";
import { PriceBadge, TrustMark } from "./ui";
import { priceUnitLabel, parseStyleTags } from "@/lib/format";
import { isPriceHonest, isPriceStale, respondsFast } from "@/lib/ranking";

export type VendorCardData = {
  slug: string;
  name: string;
  tagline: string | null;
  startingPrice: number | null;
  typicalLow: number | null;
  typicalHigh: number | null;
  priceConfirmedAt: Date | null;
  pledgeSignedAt: Date | null;
  quoteMatchRate: number | null;
  medianReplyHours: number | null;
  inquiryCount: number;
  styleTags: string;
  serviceArea: string;
  category: { name: string; singular: string; priceUnit: string; slug: string };
  metro: { name: string; slug: string };
  images: { url: string; alt: string }[];
  sponsored?: boolean;
};

export function VendorCard({ v }: { v: VendorCardData }) {
  const img = v.images[0];
  const tags = parseStyleTags(v.styleTags).slice(0, 2);
  return (
    <article className="card overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link href={`/vendors/${v.slug}`} className="img-frame aspect-[4/3] block" aria-label={`${v.name} profile`}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img.url} alt={img.alt || `${v.name} portfolio`} loading="lazy" width={640} height={480} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-3 text-sm">No photos yet</div>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex flex-wrap gap-1">
          {v.sponsored ? <TrustMark kind="sponsored" /> : null}
          {isPriceHonest(v) ? <TrustMark kind="price-honest" /> : null}
          {v.pledgeSignedAt ? <TrustMark kind="pledge" /> : null}
          {respondsFast(v.medianReplyHours) ? <TrustMark kind="fast" /> : null}
          {isPriceStale(v.priceConfirmedAt) && v.startingPrice ? <TrustMark kind="stale" /> : null}
          {v.inquiryCount < 3 && !v.sponsored ? <TrustMark kind="new" /> : null}
        </div>
        <h3 className="text-lg font-semibold leading-tight">
          <Link href={`/vendors/${v.slug}`} className="hover:underline">
            {v.name}
          </Link>
        </h3>
        <p className="text-[13px] text-ink-3">
          {v.category.singular} · {v.serviceArea || v.metro.name}
        </p>
        {v.tagline ? <p className="text-[14px] text-ink-2 line-clamp-2">{v.tagline}</p> : null}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <PriceBadge amount={v.startingPrice} unit={priceUnitLabel(v.category.priceUnit)} />
          {tags.length ? <span className="text-[12px] text-ink-3 truncate">{tags.join(" · ")}</span> : null}
        </div>
        {v.typicalLow && v.typicalHigh ? (
          <p className="text-[12px] text-ink-3 tnum">
            Typical ${v.typicalLow.toLocaleString()} to ${v.typicalHigh.toLocaleString()}
          </p>
        ) : null}
      </div>
    </article>
  );
}
