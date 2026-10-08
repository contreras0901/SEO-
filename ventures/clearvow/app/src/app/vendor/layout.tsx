import Link from "next/link";
import { requireVendor } from "@/lib/vendor-context";
import { StatusChip } from "@/components/ui";

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const { vendor } = await requireVendor();
  const tabs = [
    ["/vendor", "Inquiries"],
    ["/vendor/profile", "Profile"],
    ["/vendor/pricing", "Prices"],
    ["/vendor/weddings", "Real weddings"],
    ["/vendor/analytics", "Analytics"],
    ["/vendor/billing", "Billing"],
  ];
  return (
    <div className="container-x py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">{vendor.name}</h1>
          <div className="flex items-center gap-2 mt-1 text-[13px] text-ink-2">
            <StatusChip status={vendor.status} />
            <span>{vendor.plan === "FREE" ? "Free plan" : `${vendor.plan[0]}${vendor.plan.slice(1).toLowerCase()} plan`}</span>
            {vendor.status === "LIVE" ? (
              <Link href={`/vendors/${vendor.slug}`} className="underline">
                View public profile
              </Link>
            ) : null}
          </div>
        </div>
        <nav aria-label="Vendor dashboard" className="flex gap-1 overflow-x-auto">
          {tabs.map(([href, label]) => (
            <Link key={href} href={href} className="btn btn-secondary btn-sm whitespace-nowrap">
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
