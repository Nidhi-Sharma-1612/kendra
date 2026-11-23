import Link from "next/link";
import { Star } from "lucide-react";
import { getCabin } from "@/data/cabins";
import { site } from "@/data/site";
import type { GuestReview } from "@/data/reviews";

export function Stars({ value, className = "size-4" }: { value: number; className?: string }) {
  return (
    <span className="flex text-honey-500" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${className} ${i < Math.round(value) ? "fill-current" : "text-vellum"}`} aria-hidden />
      ))}
    </span>
  );
}

/** A real guest review, quoted as given, in the site's tile style. */
export function ReviewCard({ review, showCabin = true }: { review: GuestReview; showCabin?: boolean }) {
  const cabin = review.cabinSlug ? getCabin(review.cabinSlug) : undefined;
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <Stars value={review.stars} />
        <span className="rounded-full border border-vellum bg-paper px-2.5 py-0.5 text-xs font-medium text-ink-600">{review.source}</span>
      </div>
      {review.title && <h3 className="mt-4 font-display text-2xl leading-tight text-heather-900">{review.title}</h3>}
      <blockquote className="mt-3 flex-1 leading-relaxed whitespace-pre-line text-ink-600">{review.body}</blockquote>
      {review.response && (
        <div className="mt-5 rounded-[1.25rem] bg-paper px-4 py-3 text-sm leading-relaxed text-ink-600">
          <p className="font-semibold text-heather-900">Response from {site.name}</p>
          <p className="mt-1 whitespace-pre-line">{review.response}</p>
        </div>
      )}
      <footer className="mt-6 flex items-center gap-3 border-t border-vellum pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blossom-100 font-display text-lg text-blossom-500" aria-hidden>
          {review.author.charAt(0)}
        </span>
        <p className="min-w-0 text-sm leading-tight">
          <span className="block font-semibold text-heather-900">{review.author}</span>
          <span className="text-ink-600">
            {review.stayed && <>Stayed {review.stayed}</>}
            {showCabin && cabin && (
              <>
                {review.stayed && " · "}
                <Link href={`/cabins/${cabin.slug}`} className="underline-offset-2 hover:text-heather-900 hover:underline">
                  {cabin.name}
                </Link>
              </>
            )}
          </span>
        </p>
      </footer>
    </article>
  );
}
