import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rdtax-platform.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/portal", "/api", "/login", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
