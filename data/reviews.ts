/**
 * Guest reviews shown on /reviews.
 *
 * Vacay pulls verified reviews from OwnerRez; WebRez has no review feed we can use, so these are
 * added by hand. TODO(client): Kendra to send real reviews she has permission to quote (Google,
 * Airbnb, VRBO, TripAdvisor or direct). Never add an invented or edited review.
 *
 * While this list is empty, /reviews shows a "coming soon" note, is hidden from search engines,
 * and the footer link and sitemap entry stay off.
 *
 * Example entry:
 * { id: "g-2026-10-a", author: "Sarah M.", stars: 5, title: "Perfect anniversary",
 *   body: "…exact text…", cabinSlug: "pine-needle", stayed: "October 2026", source: "Google" }
 */

export type GuestReview = {
  id: string;
  /** First name and last initial. */
  author: string;
  stars: number;
  title?: string;
  body: string;
  cabinSlug?: string;
  /** e.g. "October 2026" */
  stayed?: string;
  source: "Google" | "Airbnb" | "VRBO" | "TripAdvisor" | "Direct";
  /** Optional owner reply. */
  response?: string;
};

export const reviews: GuestReview[] = [];

export const reviewStats = (list: GuestReview[] = reviews) => ({
  total: list.length,
  average: list.length ? list.reduce((s, r) => s + r.stars, 0) / list.length : null,
});
