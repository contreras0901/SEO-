export function money(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—";
  return "$" + n.toLocaleString("en-US");
}

export function priceUnitLabel(unit: string): string {
  switch (unit) {
    case "HOUR":
      return "per hour";
    case "GUEST":
      return "per guest";
    case "SITE_FEE":
      return "site fee";
    default:
      return "per event";
  }
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(d: Date | null | undefined): string {
  if (!d) return "Date to be decided";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function formatMonth(d: Date | null | undefined): string {
  if (!d) return "Date to be decided";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", timeZone: "UTC" });
}

export function relative(d: Date): string {
  const ms = Date.now() - d.getTime();
  const h = Math.round(ms / 3600_000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  const days = Math.round(h / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function median(nums: number[]): number | null {
  if (nums.length === 0) return null;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

export function percentile(nums: number[], p: number): number | null {
  if (nums.length === 0) return null;
  const s = [...nums].sort((a, b) => a - b);
  const idx = Math.min(s.length - 1, Math.max(0, Math.round((p / 100) * (s.length - 1))));
  return s[idx];
}

export function parseStyleTags(s: string): string[] {
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
