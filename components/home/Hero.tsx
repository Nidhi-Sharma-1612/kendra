import Image from "next/image";
import { MapPin } from "lucide-react";
import { HeroSearch } from "@/components/booking/HeroSearch";

/** Photos that cross-fade in the hero (4 slides × 6s; see .hero-slide in globals.css). */
const SLIDES = [
  { src: "/images/property/01.jpg", alt: "Aerial view of a cabin among red and gold fall trees", caption: "Fall on the mountain" },
  { src: "/images/mountain-laurel/01.jpg", alt: "Mountain Laurel log cabin in fall color", caption: "Mountain Laurel" },
  { src: "/images/property/03.jpg", alt: "The river in fall, gold trees reflected in still water", caption: "The River Path" },
  { src: "/images/mountain-mint/02.jpg", alt: "Rocking chairs before a stone fireplace", caption: "Fireside evenings" },
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
        <div className="relative z-[5] mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 sm:px-10 sm:pb-12 lg:px-14">
          <p className="rise inline-flex w-fit items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-paper backdrop-blur-md">
            <MapPin className="size-3.5" aria-hidden /> Near Gatlinburg, Tennessee
          </p>

          <h1 className="rise mt-5 max-w-4xl font-display font-medium text-paper" style={{ animationDelay: "80ms" }}>
            <span className="block text-[2.75rem] leading-none tracking-[-0.01em] sm:text-6xl lg:text-7xl">Stay among the</span>
            <em className="mt-1 block text-[4.25rem] leading-[0.95] tracking-[-0.02em] text-blossom-300 sm:text-[7rem] lg:text-[8.5rem]">wildflowers.</em>
          </h1>

          <p className="rise mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg" style={{ animationDelay: "160ms" }}>
            Twelve rustic, romantic cabins on thirty wooded acres, each with a private hot tub, a heart-shaped jacuzzi and a wood-burning fireplace.
          </p>

          <div className="rise mt-8 flex items-end justify-between gap-10 sm:mt-10" style={{ animationDelay: "240ms" }}>
            {/* Search widget: the main action, larger with a soft glow. Popovers open upward to stay on screen. */}
            <div className="w-full max-w-[56rem] rounded-[2rem] shadow-[0_0_0_8px_rgb(247_242_234/0.18),0_30px_70px_-20px_rgb(0_0_0/0.6)] sm:rounded-full">
              <HeroSearch placement="top" featured />
            </div>

            {/* Slide counter: current caption + progress lines (wide screens, beside the search) */}
            <div className="hidden shrink-0 pb-2 xl:block" aria-hidden>
              <div className="relative h-6 w-56 text-right">
                {SLIDES.map((s, i) => (
                  <p key={s.caption} className="hero-caption absolute inset-0 font-display text-lg text-paper italic" style={delay(i)}>
                    <span className="mr-2 font-sans text-xs not-italic tracking-[0.2em] text-paper/60">0{i + 1} / 0{SLIDES.length}</span>
                    {s.caption}
                  </p>
                ))}
              </div>
              <div className="mt-3 flex justify-end gap-1.5">
                {SLIDES.map((s, i) => (
                  <span key={s.src} className="h-0.5 w-10 overflow-hidden rounded-full bg-paper/25">
                    <span className="hero-progress block h-full w-full origin-left bg-paper" style={delay(i)} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
