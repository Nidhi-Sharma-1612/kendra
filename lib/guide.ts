import { format, parseISO } from "date-fns";
import { posts, type GuidePost } from "@/data/guide";

/** Newest first. */
export const allPosts = (): GuidePost[] => [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatPostDate = (date: string) => format(parseISO(date), "MMMM d, yyyy");

/** Section headings double as the table of contents; ids come from their text. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** `## ` headings, in order, for the "In this guide" index. */
export const extractHeadings = (markdown: string) => Array.from(markdown.matchAll(/^##\s+(.+)$/gm)).map((m) => m[1].trim());

/** About 200 words a minute, at least 1. */
export const readMinutes = (markdown: string) => Math.max(1, Math.round(markdown.trim().split(/\s+/).length / 200));

/** Other posts, same category first. */
export function relatedPosts(post: GuidePost, count = 2) {
  const others = allPosts().filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, count);
}
