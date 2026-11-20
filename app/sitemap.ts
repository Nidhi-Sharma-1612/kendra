import type { MetadataRoute } from "next";
import { cabins } from "@/data/cabins";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cabins", "/the-property", "/policies", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...cabins.map((c) => ({ url: `${site.url}/cabins/${c.slug}`, changeFrequency: "daily" as const, priority: 0.9 })),
  ];
}
