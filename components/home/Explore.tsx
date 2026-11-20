import Image from "next/image";
import { Mountain, Navigation } from "lucide-react";
import { iconFor, nearbyByDistance } from "@/lib/places";
import { Reveal } from "@/components/ui/Reveal";

/**
 * "Explore the Smokies": a light, split layout so it reads differently from the full-bleed photo
 * "Book direct" panel that follows. Left: heading and drive times on paper. Right: a portrait
 * photo tile of the ridges seen from the property.
 */
export function Explore() {
  const places = nearbyByDistance();

  return (
    <section id="explore" className="scroll-mt-20 bg-paper-deep/60">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-32">
        {/* Text + drive times */}
        <div>
          <Reveal>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Explore the Smokies
            </p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl lg:text-[3.3rem] xl:text-[3.6rem]">
              Quiet on the mountain,
              <em className="block text-blossom-500">close to everything.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
              Spend the day on the trails or the Parkway, then come home to a hot tub in the trees.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="label mt-10 text-ink-400">From your cabin</p>
            <ul className="mt-3 divide-y divide-vellum border-y border-vellum">
              {places.map((n) => {
                const Icon = iconFor(n.place);
                return (
                  <li key={n.place} className="flex items-center gap-4 py-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                      <Icon className="size-[1.1rem]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl leading-tight text-heather-900">{n.place}</span>
                      <span className="block text-sm text-ink-600">{n.note}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-heather-900 px-3.5 py-1.5 text-xs font-semibold text-paper">{n.time}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-600">
              <Navigation className="mt-0.5 size-4 shrink-0 text-blossom-500" aria-hidden />
              Directions arrive after you book. The last stretch is a winding mountain road; 4WD or chains may be needed in winter.
            </p>
          </Reveal>
        </div>

        {/* Portrait photo tile */}
        <Reveal delay={0.1}>
          <figure className="group relative isolate aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-heather-950">
            <Image
              src="/images/property/05.jpg"
              alt="Layers of Smoky Mountain ridges in fall color, seen from the property"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.55),transparent_40%)]" aria-hidden />
            <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-heather-950/40 px-3.5 py-1.5 text-sm text-paper backdrop-blur-md">
              <Mountain className="size-4" aria-hidden /> The view from here
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
