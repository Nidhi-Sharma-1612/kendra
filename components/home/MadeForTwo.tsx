import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/** Occasions as a plain list (not chips), each with one line about how we help. */
const OCCASIONS = [
  { title: "Honeymoons", body: "Start married life by your own fire." },
  { title: "Anniversaries", body: "A quiet night to celebrate the years." },
  { title: "Proposals", body: "Tell us the plan and we'll help set the scene." },
  { title: "Just because", body: "No reason needed. Just the two of you." },
];

// TODO(client): confirm these are still offered, and how guests request them (from the old Packages page).
const EXTRAS = "Roses, chocolates or an in-cabin couples massage";

// TODO(client): add one real guest review about a honeymoon or anniversary stay (Airbnb, VRBO or
// Google), rendered as a short quote under the occasions. Never use an invented review.

/**
 * "Celebrations": deep-heather band. One strong photo (bed, heart-shaped jacuzzi and fire in one
 * frame) stretched to the text column's height; text with the occasions as a plain list, a single
 * "we can arrange" line and a specific CTA.
 */
export function MadeForTwo() {
  return (
    <section className="paper relative overflow-hidden bg-heather-900 text-paper">
      {/* Soft rose glow for depth */}
      <div className="pointer-events-none absolute -top-40 left-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.2),transparent)]" aria-hidden />
      <div className="pointer-events-none absolute right-[-8%] bottom-[-12rem] size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(111_90_124/0.35),transparent)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-stretch gap-14 px-4 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-32">
        {/* One strong photo, filling the text column's height on desktop */}
        <Reveal className="h-full">
          <figure className="group relative isolate aspect-[4/3] h-full overflow-hidden rounded-[1.75rem] bg-heather-950 lg:aspect-auto">
            <Image
              src="/images/pine-needle/02.jpg"
              alt="A king bed facing a stone fireplace, with a heart-shaped jacuzzi beside it and tall windows onto the forest"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              // Portrait crop on desktop: shift right so the fire and the heart-shaped jacuzzi stay in frame.
              className="-z-10 object-cover object-[68%_50%] transition duration-[1.6s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.6),transparent_40%)]" aria-hidden />
            <figcaption className="absolute bottom-4 left-4 rounded-full border border-paper/20 bg-heather-950/50 px-4 py-1.5 font-display text-base italic backdrop-blur-md">
              Pine Needle · bed, fire &amp; jacuzzi for two
            </figcaption>
          </figure>
        </Reveal>

        {/* Text */}
        <div className="lg:py-2">
          <Reveal>
            <p className="label flex items-center gap-3 text-blossom-300">
              <span className="h-px w-8 bg-blossom-300/60" aria-hidden /> Celebrations
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium sm:text-6xl lg:text-[3.1rem] xl:text-[3.5rem]">
              Honeymoons, anniversaries,
              <em className="block text-balance text-blossom-300">and no particular reason.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/75">
              Tell us what you&apos;re celebrating, and we&apos;ll have the cabin ready for the two of you.
            </p>
          </Reveal>

          {/* Occasions: a plain two-column list, not buttons */}
          <Reveal delay={0.1}>
            <dl className="mt-9 grid gap-x-8 gap-y-5 border-t border-paper/15 pt-7 sm:grid-cols-2">
              {OCCASIONS.map((o) => (
                <div key={o.title}>
                  <dt className="font-display text-2xl leading-tight">{o.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-paper/65">{o.body}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 flex items-start gap-2.5 border-t border-paper/15 pt-6 text-sm leading-relaxed text-paper/80">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-blossom-300" aria-hidden />
              <span>
                <span className="font-semibold text-paper">We can arrange:</span> {EXTRAS}. Just mention it when you book.
              </span>
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-paper py-2 pr-2 pl-7 font-semibold text-heather-900 transition hover:bg-blossom-100"
              >
                Plan a celebration
                <span className="grid size-10 place-items-center rounded-full bg-heather-900 text-paper transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-sm font-medium text-paper/80 hover:text-paper">
                <Phone className="size-4" aria-hidden /> or call {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
