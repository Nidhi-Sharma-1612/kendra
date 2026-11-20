import Image from "next/image";
import { Flame, Heart, Waves } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

const FEATURES = [
  {
    no: "01",
    tag: "Outdoors",
    icon: Waves,
    title: "A private hot tub",
    body: "On your own deck, with nothing but forest beyond the rail.",
    src: "/images/golden-glow/03.jpg",
    alt: "An open-air hot tub on a cabin deck in the trees",
  },
  {
    no: "02",
    tag: "Indoors",
    icon: Heart,
    title: "A heart-shaped jacuzzi",
    body: "For two, a few steps from the bed.",
    src: "/images/pine-needle/04.jpg",
    alt: "A red heart-shaped jacuzzi with a stone surround",
  },
  {
    no: "03",
    tag: "Fireside",
    icon: Flame,
    title: "A wood-burning fireplace",
    body: "Stone hearths with rockers pulled up close.",
    src: "/images/foxglove/02.jpg",
    alt: "Rocking chairs before a stacked-stone fireplace",
  },
];

const STATS = [
  { value: "12", label: "hideaway cabins" },
  { value: `${site.acres}`, label: "wooded acres" },
  { value: `${site.riverFrontageFt}`, label: "ft of riverbank" },
];

/** Photo tile in the hero's language: real photo, heather fade, frosted pill, number and title. */
function FeatureTile({ f, className = "", sizes, compact = false }: { f: (typeof FEATURES)[number]; className?: string; sizes: string; compact?: boolean }) {
  const Icon = f.icon;
  return (
    <figure className={`group relative isolate overflow-hidden rounded-[1.75rem] bg-heather-950 ${className}`}>
      <Image src={f.src} alt={f.alt} fill sizes={sizes} className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.06]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(42_32_48/0.9)_0%,rgb(42_32_48/0.35)_45%,transparent_70%)]" aria-hidden />
      <span className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-paper/10 px-3 py-1 text-xs font-medium text-paper backdrop-blur-md">
        <Icon className="size-3.5" aria-hidden /> {f.tag}
      </span>
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-paper sm:p-7">
        <span className="font-sans text-xs tracking-[0.25em] text-paper/60">{f.no}</span>
        <span className={`mt-1 block font-display leading-tight font-medium ${compact ? "text-[1.9rem] lg:text-[1.6rem]" : "text-[1.9rem]"}`}>{f.title}</span>
        <span className="mt-1.5 block max-w-xs text-sm leading-relaxed text-paper/75">{f.body}</span>
      </figcaption>
    </figure>
  );
}

/**
 * "Inside every cabin": the section right after the hero. Same visual language as the hero
 * (photography with heather fades, Cormorant heading with a rose italic accent, frosted pills),
 * arranged as a bento grid: one tall tile, two side by side, and a deep-heather fact tile.
 */
export function InsideEveryCabin() {
  return (
    <section id="inside" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
      {/* Header: heading left, intro + link right, on the hero's left edge */}
      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <Reveal>
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Inside every cabin
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl">
            Three small luxuries,
            <em className="block text-blossom-500">waiting for you.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:pb-2">
          <p className="max-w-md text-lg leading-relaxed text-ink-600">
            Whichever wildflower you choose, the evening ritual is the same: a soak under the trees, a fire in the hearth, and a jacuzzi built for two.
          </p>
        </Reveal>
      </div>

      {/* Bento grid */}
      <div className="mt-14 grid gap-4 lg:h-[40rem] lg:grid-cols-12 lg:grid-rows-2">
        <Reveal className="lg:col-span-5 lg:row-span-2">
          <FeatureTile f={FEATURES[0]} className="h-[26rem] lg:h-full" sizes="(min-width: 1024px) 40vw, 100vw" />
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-4">
          <FeatureTile f={FEATURES[1]} className="h-[22rem] lg:h-full" sizes="(min-width: 1024px) 33vw, 100vw" compact />
        </Reveal>
        <Reveal delay={0.12} className="lg:col-span-3">
          <FeatureTile f={FEATURES[2]} className="h-[22rem] lg:h-full" sizes="(min-width: 1024px) 25vw, 100vw" compact />
        </Reveal>

        {/* Fact tile: aerial river photo under a deep-heather tint, echoing the hero's tones */}
        <Reveal delay={0.16} className="lg:col-span-7">
          <div className="group relative isolate flex h-full min-h-[22rem] flex-col justify-between lg:min-h-0 gap-8 overflow-hidden rounded-[1.75rem] bg-heather-900 p-7 text-paper sm:p-9">
            <Image
              src="/images/property/04.jpg"
              alt="Aerial view of the river bending through fall forest on the property"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 -z-10 bg-heather-950/55" aria-hidden />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.85),transparent_60%)]" aria-hidden />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(42_32_48/0.6),transparent_40%)]" aria-hidden />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <p className="max-w-md font-display text-3xl leading-snug">
                Twelve cabins, <em className="whitespace-nowrap text-blossom-300">one quiet mountain.</em>
              </p>
              <span className="rounded-full border border-paper/25 bg-paper/10 px-3 py-1 text-xs font-medium text-paper/90">
                Near Gatlinburg, TN
              </span>
            </div>
            <dl className="flex gap-8 sm:gap-14">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-5xl leading-none font-medium sm:text-6xl">{s.value}</dd>
                  <dd className="mt-2 text-sm text-paper/65">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
