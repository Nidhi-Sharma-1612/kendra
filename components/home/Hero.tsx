import Image from "next/image";
import { site } from "@/data/site";
import { HeroSearch } from "@/components/booking/HeroSearch";

/** Photos that cross-fade in the hero (4 slides × 6s; see .hero-slide in globals.css). */
const SLIDES = [
  { src: "/images/property/01.jpg", alt: "Aerial view of a cabin among red and gold fall trees" },
  { src: "/images/mountain-laurel/01.jpg", alt: "Mountain Laurel log cabin in fall color" },
  { src: "/images/property/03.jpg", alt: "The river in fall, gold trees reflected in still water" },
  { src: "/images/mountain-mint/02.jpg", alt: "Rocking chairs before a stone fireplace" },
];

// Slide i starts (i*6 - 1.5)s into the shared 24s cycle, so slide 1 is fully visible on load.
const delay = (i: number) => ({ animationDelay: `${i * 6 - 1.5}s` });

/**
 * Full-bleed hero: the photo slideshow fills the full width and the screen height below the navbar, with the
 * headline on it and the availability search, the page's main action, floating at its bottom.
 */
export function Hero() {
  return (
    // z-10 so the search popovers sit above the sections that follow.
    <section className="relative z-10">
      {/* Full-bleed: edge to edge, filling the whole screen below the navbar (4.5rem). */}
      <div className="relative isolate h-[calc(100svh-4.5rem)] min-h-[38rem]">
        {/* Photos and fades are clipped here, so the search popovers aren't. */}
        <div className="absolute inset-0 overflow-hidden bg-heather-950">
          {SLIDES.map((s, i) => (
            <Image key={s.src} src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className="hero-slide object-cover" style={delay(i)} />
          ))}

          {/* Legibility: deep fade from the bottom-left where the text sits, light vignette at the top */}
          <div className="absolute inset-0 z-[4] bg-[linear-gradient(to_top,rgb(42_32_48/0.85)_0%,rgb(42_32_48/0.35)_45%,transparent_70%)]" aria-hidden />
          <div className="absolute inset-0 z-[4] bg-[linear-gradient(to_right,rgb(42_32_48/0.55),transparent_60%)]" aria-hidden />
          <div className="absolute inset-x-0 top-0 z-[4] h-32 bg-gradient-to-b from-heather-950/40 to-transparent" aria-hidden />
        </div>

        {/* One content column on a shared left edge: text block, then a bottom row with the search
            (left) and the slide counter (right) on the same baseline. */}
        {/* pb-24 on phones leaves room under the search for the chat bubble. */}
        <div className="relative z-[5] mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-24 sm:px-10 sm:pb-12 lg:px-14">
          {/* Same line-and-label eyebrow as every other page */}
          <p className="rise label flex items-center gap-3 text-paper [text-shadow:0_1px_3px_rgb(0_0_0/0.5)]">
            <span className="h-px w-8 bg-blossom-300" aria-hidden />
            {site.place}
            <span className="hidden text-paper/80 sm:inline">· near Gatlinburg, Tennessee</span>
          </p>

          <h1 className="rise mt-5 max-w-4xl font-display font-medium text-paper" style={{ animationDelay: "80ms" }}>
            <span className="block text-[2.75rem] leading-none tracking-[-0.01em] sm:text-6xl lg:text-7xl">Stay among the</span>
            <em className="mt-1 block text-[4.25rem] leading-[0.95] tracking-[-0.02em] text-blossom-300 sm:text-[7rem] lg:text-[8.5rem]">wildflowers.</em>
          </h1>

          <p className="rise mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg" style={{ animationDelay: "160ms" }}>
            Twelve rustic cabins on a thirty-acre preserve in the Smokies, designed and built for nature and romance.
          </p>

          {/* Search widget: the main action, larger with a soft glow. Popovers open upward to stay on screen. */}
          <div className="rise mt-8 w-full max-w-[56rem] rounded-[2rem] shadow-[0_0_0_8px_rgb(247_242_234/0.18),0_30px_70px_-20px_rgb(0_0_0/0.6)] sm:mt-10 sm:rounded-full" style={{ animationDelay: "240ms" }}>
            <HeroSearch placement="top" featured />
          </div>
        </div>
      </div>
    </section>
  );
}
