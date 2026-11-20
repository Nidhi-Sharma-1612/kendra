import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Footprints, Trees, Waves } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    icon: Footprints,
    title: "Leave from your cabin",
    body: "Hand-carved signs mark the way.",
    src: "/images/mountain-laurel/12.jpg",
    alt: "A hand-carved Mountain Laurel sign beside a gravel trail in the woods",
  },
  {
    icon: Trees,
    title: `Through ${site.acres} acres of hardwoods`,
    body: "Gold and copper every October.",
    src: "/images/property/08.jpg",
    alt: "Tall hardwood trees in red and gold fall color",
  },
  {
    icon: Waves,
    title: "Swim at the river bend",
    body: "A deep, quiet pool all to yourselves.",
    src: "/images/property/06.jpg",
    alt: "A quiet bend in the river with gold fall trees along the bank",
  },
];

/**
 * "The River Path": the walk from cabin to river as a visual journey. Three photo tiles, one per
 * stage, joined on desktop by a dotted trail line with numbered markers.
 */
export function RiverPath() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
      {/* Header */}
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <Reveal>
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden /> The River Path
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-balance text-heather-900 sm:text-6xl">
            A trail through the woods,
            <em className="block text-blossom-500">down to the water.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:pb-2">
          <p className="max-w-md text-lg leading-relaxed text-ink-600">
            A private trail winds from the cabins to a bend in the river: {site.riverFrontageFt} ft of riverbank, a swimming hole, and nobody else.
          </p>
          <Link
            href="/the-property"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-heather-900 py-2 pr-2 pl-6 text-sm font-semibold text-paper transition hover:bg-heather-700"
          >
            Explore the property
            <span className="grid size-9 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>

      {/* The trail: dotted line with numbered markers over each tile (desktop) */}
      <div className="relative mt-16 hidden lg:block" aria-hidden>
        <div className="absolute top-1/2 right-[16.66%] left-[16.66%] border-t-2 border-dashed border-sage-500/40" />
        <div className="relative grid grid-cols-3">
          {STEPS.map((s, i) => (
            <span key={s.title} className="mx-auto grid size-11 place-items-center rounded-full border border-sage-500/40 bg-paper font-display text-lg text-heather-900">
              0{i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Journey tiles */}
      <ol className="mt-12 grid gap-4 sm:grid-cols-3 lg:mt-8">
        {STEPS.map(({ icon: Icon, title, body, src, alt }, i) => (
          <Reveal key={title} delay={i * 0.1} className={i === 1 ? "sm:mt-10" : ""}>
            <li className="group relative isolate aspect-[4/3] overflow-hidden sm:aspect-[3/4] rounded-[1.75rem] bg-heather-950">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.7)_0%,transparent_50%)]" aria-hidden />
              <span className="absolute top-4 left-4 rounded-full border border-paper/25 bg-paper/10 px-3 py-1 text-xs font-medium text-paper backdrop-blur-md lg:hidden">
                Step 0{i + 1}
              </span>
              <div className="absolute inset-x-3 bottom-3 flex items-start gap-3.5 rounded-[1.25rem] border border-paper/15 bg-heather-950/55 p-4 text-paper backdrop-blur-md">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blossom-300/20 text-blossom-300">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-xl leading-tight">{title}</span>
                  <span className="mt-0.5 block text-sm text-paper/75">{body}</span>
                </span>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
