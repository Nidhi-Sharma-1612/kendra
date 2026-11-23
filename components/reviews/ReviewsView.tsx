import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { cabins } from "@/data/cabins";
import { reviewStats, type GuestReview } from "@/data/reviews";
import { ReviewCard, Stars } from "@/components/reviews/ReviewCard";
import { Reveal } from "@/components/ui/Reveal";
import { BookDirect } from "@/components/home/BookDirect";

/** Renders the reviews page from a given list; the route passes data/reviews.ts. */
export function ReviewsView({ reviews, cabinSlug }: { reviews: GuestReview[]; cabinSlug?: string }) {
  const reviewed = cabins.filter((c) => reviews.some((r) => r.cabinSlug === c.slug));
  const active = cabinSlug && reviewed.some((c) => c.slug === cabinSlug) ? cabinSlug : undefined;
  const shown = active ? reviews.filter((r) => r.cabinSlug === active) : reviews;
  const { total, average } = reviewStats(reviews);

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-10 lg:px-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Guest reviews
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">
              In our guests&apos;
              <em className="block text-blossom-500">own words.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            {average !== null ? (
              <div className="inline-flex items-center gap-5 rounded-[1.75rem] border border-vellum bg-paper-deep/60 px-6 py-5">
                <span className="font-display text-6xl leading-none text-heather-900">{average.toFixed(1)}</span>
                <span>
                  <Stars value={average} className="size-5" />
                  <span className="mt-1.5 block text-sm text-ink-600">
                    from {total} guest review{total === 1 ? "" : "s"}
                  </span>
                </span>
              </div>
            ) : (
              <p className="max-w-md text-lg leading-relaxed text-ink-600">Stories from guests who stayed on the mountain.</p>
            )}
          </Reveal>
        </div>

        {reviewed.length > 1 && (
          <Reveal delay={0.1}>
            <nav aria-label="Filter reviews by cabin" className="mt-10 flex flex-wrap gap-2">
              {[undefined, ...reviewed.map((c) => c.slug)].map((slug) => {
                const on = slug === active;
                return (
                  <Link
                    key={slug ?? "all"}
                    href={slug ? `/reviews?cabin=${slug}` : "/reviews"}
                    scroll={false}
                    aria-current={on ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      on ? "bg-heather-900 text-paper" : "border border-vellum bg-paper text-heather-900 hover:border-heather-700/40"
                    }`}
                  >
                    {slug ? cabins.find((c) => c.slug === slug)?.name : "All cabins"}
                  </Link>
                );
              })}
            </nav>
          </Reveal>
        )}
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-10 lg:px-14 lg:pb-32">
        {shown.length > 0 ? (
          <ul className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {shown.map((r) => (
              <li key={r.id} className="mb-4 break-inside-avoid">
                <ReviewCard review={r} showCabin={!active} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-lg rounded-[1.75rem] border border-dashed border-vellum px-6 py-14 text-center">
            <p className="font-display text-3xl text-heather-900">Guest reviews are on their way</p>
            <p className="mt-2 text-ink-600">Stayed with us? We&apos;d love to hear how it went.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper hover:bg-heather-700">
              <MessageSquare className="size-4" aria-hidden /> Tell us about your stay
            </Link>
          </div>
        )}
      </section>

      <BookDirect />
    </>
  );
}
