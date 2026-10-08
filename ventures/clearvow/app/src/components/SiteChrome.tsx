import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth";
import { db } from "@/lib/db";

export async function Header() {
  const user = await getCurrentUser();
  const dash = user?.role === "ADMIN" ? "/admin" : user?.role === "VENDOR" ? "/vendor" : "/dashboard";
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur sticky top-0 z-40">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-x flex items-center justify-between h-16 gap-4">
        <Link href="/" className="serif text-2xl font-semibold tracking-tight" aria-label="Clearvow home">
          Clearvow
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-[14px] font-medium">
          <Link href="/vendors" className="hover:underline">
            Find vendors
          </Link>
          <Link href="/san-diego/venues" className="hover:underline">
            Venues
          </Link>
          <Link href="/real-weddings" className="hover:underline">
            Real weddings
          </Link>
          <Link href="/price-guides" className="hover:underline">
            Price guides
          </Link>
          <Link href="/for-vendors" className="hover:underline">
            For vendors
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href={dash} className="btn btn-secondary btn-sm">
                {user.role === "ADMIN" ? "Admin" : user.role === "VENDOR" ? "Vendor dashboard" : "My planning"}
              </Link>
              <form action={signOut}>
                <button className="btn btn-ghost btn-sm" type="submit">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost btn-sm">
                Sign in
              </Link>
              <Link href="/start" className="btn btn-primary btn-sm">
                Start planning
              </Link>
            </>
          )}
        </div>
      </div>
      <nav aria-label="Primary mobile" className="md:hidden border-t border-line">
        <div className="container-x flex gap-4 overflow-x-auto py-2 text-[13px] font-medium whitespace-nowrap">
          <Link href="/vendors">Find vendors</Link>
          <Link href="/san-diego/venues">Venues</Link>
          <Link href="/real-weddings">Real weddings</Link>
          <Link href="/price-guides">Price guides</Link>
          <Link href="/for-vendors">For vendors</Link>
        </div>
      </nav>
    </header>
  );
}

export async function Footer() {
  const cats = await db.category.findMany({ orderBy: { sortOrder: "asc" } });
  const metros = await db.metro.findMany({ where: { isActive: true } });
  return (
    <footer className="border-t border-line mt-16">
      <div className="container-x py-12 grid gap-8 md:grid-cols-4 text-[14px]">
        <div>
          <div className="serif text-xl font-semibold">Clearvow</div>
          <p className="text-ink-2 mt-2">See the price before you ask. Wedding vendors with published prices, verified inquiries, and a promise to welcome every couple.</p>
        </div>
        {metros.map((m) => (
          <div key={m.id}>
            <div className="font-semibold mb-2">{m.name} vendors</div>
            <ul className="space-y-1 text-ink-2">
              {cats.map((c) => (
                <li key={c.id}>
                  <Link href={`/${m.slug}/${c.slug}`} className="hover:underline">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="font-semibold mb-2">Company</div>
          <ul className="space-y-1 text-ink-2">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/trust" className="hover:underline">
                Trust and ranking rules
              </Link>
            </li>
            <li>
              <Link href="/pledge" className="hover:underline">
                Welcomes Every Couple pledge
              </Link>
            </li>
            <li>
              <Link href="/for-vendors/pricing" className="hover:underline">
                Vendor pricing
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:underline">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:underline">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Vendors</div>
          <ul className="space-y-1 text-ink-2">
            <li>
              <Link href="/claim" className="hover:underline">
                Claim your free profile
              </Link>
            </li>
            <li>
              <Link href="/for-vendors" className="hover:underline">
                Inquiries, not leads
              </Link>
            </li>
            <li>
              <Link href="/vendor/weddings/new" className="hover:underline">
                Submit a real wedding
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x pb-8 text-[12px] text-ink-3">© {new Date().getFullYear()} Clearvow. Prices are published by vendors and confirmed by them; Clearvow is not a party to any booking.</div>
    </footer>
  );
}
