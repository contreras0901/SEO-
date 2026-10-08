import Link from "next/link";
import type { ReactNode } from "react";
import { money } from "@/lib/format";

export function Button({
  children,
  variant = "primary",
  size,
  href,
  type = "submit",
  className = "",
  disabled,
  name,
  value,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "clay";
  size?: "sm";
  href?: string;
  type?: "submit" | "button";
  className?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
}) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} name={name} value={value}>
      {children}
    </button>
  );
}

export function PriceBadge({ amount, unit, prefix = "from" }: { amount: number | null; unit?: string; prefix?: string }) {
  if (!amount) return <span className="pill">Price pending</span>;
  return (
    <span className="price text-[15px]">
      <span className="text-ink-3 font-medium text-[13px]">{prefix} </span>
      {money(amount)}
      {unit ? <span className="text-ink-3 font-medium text-[13px]"> {unit}</span> : null}
    </span>
  );
}

export function TrustMark({ kind }: { kind: "price-honest" | "verified" | "pledge" | "fast" | "stale" | "sponsored" | "new" }) {
  const map = {
    "price-honest": { label: "Price-Honest", cls: "pill-clay", title: "Published prices, confirmed in the last 180 days, with 90%+ of quotes matching the published range" },
    verified: { label: "Verified inquiries", cls: "pill-teal", title: "Every inquiry is verified by email and phone before delivery" },
    pledge: { label: "Welcomes every couple", cls: "pill-sage", title: "Signed the Welcomes Every Couple pledge" },
    fast: { label: "Replies in under 24h", cls: "pill-teal", title: "Median first reply under 24 hours" },
    stale: { label: "Prices over 180 days old", cls: "pill", title: "This vendor has not confirmed prices in 180 days" },
    sponsored: { label: "Sponsored", cls: "pill", title: "Paid Spotlight placement; limited to 3 per category" },
    new: { label: "New", cls: "pill", title: "Recently listed; not enough history for response stats" },
  } as const;
  const m = map[kind];
  return (
    <span className={`pill ${m.cls}`} title={m.title}>
      {m.label}
    </span>
  );
}

export function Section({ title, subtitle, children, action, id }: { title?: string; subtitle?: string; children: ReactNode; action?: ReactNode; id?: string }) {
  return (
    <section id={id} className="container-x py-10 md:py-14">
      {title ? (
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
            {subtitle ? <p className="text-ink-2 mt-1 max-w-2xl">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="card p-4">
      <div className="text-[13px] text-ink-3 font-medium">{label}</div>
      <div className="text-2xl font-semibold tnum mt-1">{value}</div>
      {hint ? <div className="text-[12px] text-ink-3 mt-1">{hint}</div> : null}
    </div>
  );
}

export function Empty({ title, body, action }: { title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="card p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {body ? <p className="text-ink-2 mt-2 max-w-md mx-auto">{body}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-ink-3 mb-4">
      <ol className="flex flex-wrap gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-1">
            {it.href ? (
              <Link href={it.href} className="hover:underline">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-2">
                {it.label}
              </span>
            )}
            {i < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function StatusChip({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    PENDING_VERIFICATION: { label: "Verify to send", cls: "pill-clay" },
    DELIVERED: { label: "Delivered, awaiting reply", cls: "pill" },
    UNLOCKED: { label: "Vendor unlocked", cls: "pill-teal" },
    REPLIED: { label: "Replied", cls: "pill-teal" },
    CLOSED: { label: "Closed", cls: "pill" },
    DRAFT: { label: "Draft", cls: "pill" },
    PENDING: { label: "In review", cls: "pill-clay" },
    LIVE: { label: "Live", cls: "pill-teal" },
    SUSPENDED: { label: "Suspended", cls: "pill" },
    PUBLISHED: { label: "Published", cls: "pill-teal" },
    REJECTED: { label: "Rejected", cls: "pill" },
  };
  const m = map[status] ?? { label: status, cls: "pill" };
  return <span className={`pill ${m.cls}`}>{m.label}</span>;
}

export function Notice({ kind = "info", children }: { kind?: "info" | "ok" | "warn" | "bad"; children: ReactNode }) {
  const cls = { info: "bg-teal-soft text-ink", ok: "bg-sage text-ink", warn: "bg-clay-soft text-ink", bad: "bg-clay-soft text-ink" }[kind];
  return (
    <div role={kind === "bad" ? "alert" : "status"} className={`rounded-md px-4 py-3 text-[14px] ${cls}`}>
      {children}
    </div>
  );
}
