import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/components/SiteChrome";
import { appUrl } from "@/lib/stripe";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl()),
  title: { default: "Clearvow: wedding vendors with published prices", template: "%s | Clearvow" },
  description: "See the price before you ask. Wedding vendors in San Diego with published prices, verified inquiries, and a promise to welcome every couple.",
  openGraph: { siteName: "Clearvow", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
