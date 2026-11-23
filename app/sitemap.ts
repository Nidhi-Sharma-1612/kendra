import type { MetadataRoute } from "next";
import { cabins } from "@/data/cabins";
import { posts } from "@/data/guide";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cabins", "/the-property", "/specials", "/smoky-mountain-guide", "/policies", "/contact", ...(reviews.length ? ["/reviews"] : [])];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...cabins.map((c) => ({ url: `${site.url}/cabins/${c.slug}`, changeFrequency: "daily" as const, priority: 0.9 })),
    ...posts.map((p) => ({ url: `${site.url}/smoky-mountain-guide/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
