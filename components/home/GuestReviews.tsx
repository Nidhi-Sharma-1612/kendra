import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { reviews, reviewStats } from "@/data/reviews";
import { ReviewCard, Stars } from "@/components/reviews/ReviewCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Homepage guest reviews. Renders nothing until data/reviews.ts holds at least three real reviews,
 * so the section appears on its own once Kendra's reviews are added.
 */
export function GuestReviews() {
  if (reviews.length < 3) return null;
  const { average, total } = reviewStats();
  const featured = [...reviews].sort((a, b) => b.stars - a.stars).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <Reveal>
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Guest reviews
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl">
            In our guests&apos;
            <em className="block text-blossom-500">own words.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:pb-2">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl leading-none text-heather-900">{average!.toFixed(1)}</span>
            <span>
              <Stars value={average!} className="size-5" />
              <span className="mt-1 block text-sm text-ink-600">from {total} guest reviews</span>
            </span>
          </div>
          <Link
            href="/reviews"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-heather-900 py-2 pr-2 pl-6 text-sm font-semibold text-paper transition hover:bg-heather-700"
          >
            Read all reviews
            <span className="grid size-9 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {featured.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.08}>
            <li className="h-full">
              <ReviewCard review={r} />
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
