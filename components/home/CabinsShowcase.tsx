import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Cabin } from "@/data/cabins";
import { Reveal } from "@/components/ui/Reveal";
import { CabinTile } from "@/components/ui/CabinTile";

/** The six cabins previewed on the homepage: a mix of studios, the two-bedroom and a pet-friendly cabin. */
const FEATURED = ["silver-bell", "forget-me-not", "mountain-laurel", "pine-needle", "golden-glow", "sweetbriar"];

/**
 * Homepage cabins preview, in the same language as the hero and "Inside every cabin": heading left /
 * intro right on the shared left edge, six featured cabin tiles, and a link to the full list.
 */
export function CabinsShowcase({ cabins, prices }: { cabins: Cabin[]; prices: Record<number, number> }) {
  const shown = FEATURED.map((slug) => cabins.find((c) => c.slug === slug)).filter((c): c is Cabin => !!c);

  return (
    <section className="bg-paper-deep/60">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> The cabins
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl">
              Twelve hideaways,
              <em className="block text-blossom-500">each its own wildflower.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">
              Eleven studios built for two, and one two-bedroom log cabin for a few more. Each is named for a flower that grows on the mountain.
            </p>
          </Reveal>
        </div>

        {/* Tiles */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.06}>
              <CabinTile cabin={c} fromPrice={prices[c.webrezId]} />
            </Reveal>
          ))}
        </div>

        {/* View all: the full list lives on /cabins */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <Link
            href="/cabins"
            className="group inline-flex items-center gap-3 rounded-full bg-heather-900 py-2 pr-2 pl-7 font-semibold text-paper transition hover:bg-heather-700"
          >
            View all {cabins.length} cabins
            <span className="grid size-10 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
          <p className="text-sm text-ink-600">Compare every cabin, with live rates and availability</p>
        </div>
      </div>
    </section>
  );
}
