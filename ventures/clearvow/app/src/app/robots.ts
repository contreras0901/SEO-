import type { MetadataRoute } from "next";
import { appUrl } from "@/lib/stripe";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/dashboard", "/vendor", "/admin", "/inquire", "/api", "/sign-in", "/sign-up", "/start", "/claim"] }],
    sitemap: appUrl("/sitemap.xml"),
  };
}
