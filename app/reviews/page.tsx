import type { Metadata } from "next";
import { site } from "@/data/site";
import { reviews } from "@/data/reviews";
import { ReviewsView } from "@/components/reviews/ReviewsView";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description: `What guests say about their stays at ${site.name} on ${site.place}.`,
  // Hidden from search engines until there are real reviews to show.
  robots: reviews.length ? undefined : { index: false, follow: true },
};

export default async function ReviewsPage({ searchParams }: PageProps<"/reviews">) {
  const { cabin } = await searchParams;
  return <ReviewsView reviews={reviews} cabinSlug={typeof cabin === "string" ? cabin : undefined} />;
}
