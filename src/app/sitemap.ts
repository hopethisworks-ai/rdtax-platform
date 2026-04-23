import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rdtax-platform.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/how-it-works", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/industries", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/industries/software", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/industries/manufacturing", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/industries/construction", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/cpa-partners", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/eligibility", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/estimator", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/south-carolina", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/methodology", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
