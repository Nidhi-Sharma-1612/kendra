import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Footprints, Signpost, Trees } from "lucide-react";
import { site } from "@/data/site";
import { cabins } from "@/data/cabins";
import { Reveal } from "@/components/ui/Reveal";
import { Botanical } from "@/components/ui/Botanical";
import { BookDirect } from "@/components/home/BookDirect";

export const metadata: Metadata = {
  title: "The Preserve",
  description: `${site.acres} wooded acres on ${site.place}, a private trail and ${site.riverFrontageFt} ft of riverbank with a swimming hole, just for our guests.`,
};

const STATS = [
  { value: `${site.acres}`, label: "Acres of forest" },
  { value: `${site.riverFrontageFt} ft`, label: "Of riverbank" },
  { value: `${cabins.length}`, label: "Cabins, spread apart" },
];

const FEATURES = [
  { icon: Trees, title: "Hardwood forest", body: "Tall hardwoods and pines that turn gold, red and copper every October." },
  { icon: Signpost, title: "Hand-carved signs", body: "Each cabin sits on its own lane, marked with a sign carved with its wildflower." },
  { icon: Footprints, title: "Room to wander", body: "No neighbors on your deck. Just birdsong, the river and the trees." },
];

/** River Path gallery: first photo is the large tile. */
const RIVER = [
  { src: "/images/property/15.jpg", alt: "Clear water running over smooth river rocks below fall-colored hills", caption: "The river bend" },
  { src: "/images/property/02.jpg", alt: "A still pool reflecting gold and orange trees", caption: "The swimming hole" },
  { src: "/images/property/12.jpg", alt: "A leaf-covered trail through sunlit woods", caption: "The trail down" },
  { src: "/images/property/06.jpg", alt: "The riverbank framed by trees in fall color", caption: "Riverbank in October" },
  { src: "/images/property/03.jpg", alt: "Boulders in a calm stretch of river under a blue sky", caption: "Rocks for sitting" },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? "text-blossom-300" : "text-sage-700"}`}>
      <span className={`h-px w-8 ${dark ? "bg-blossom-300/60" : "bg-sage-500/60"}`} aria-hidden /> {children}
    </p>
  );
}

export default function PropertyPage() {
  return (
    <>
      {/* Hero: full-bleed aerial, heading bottom-left, key numbers on a frosted strip */}
      <section className="relative isolate flex min-h-[78svh] items-end">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-heather-950">
          <Image src="/images/property/04.jpg" alt="Aerial view of the river curving through forest in fall color" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-heather-950/35" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(42_32_48/0.85),transparent_65%)]" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_32_48/0.55),transparent_60%)]" aria-hidden />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-10 text-paper sm:px-10 sm:pb-14 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div className="rise">
              <Eyebrow dark>
                The preserve<span className="hidden sm:inline"> · {site.place}</span>
              </Eyebrow>
              <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-balance sm:text-7xl">
                Thirty acres of woods,
                <em className="block text-blossom-300">and a river of your own.</em>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/80">
                A private mountainside in the Smokies, kept wild for our guests. Twelve cabins, one trail, and a quiet bend in the river.
              </p>
            </div>

            <dl className="rise grid grid-cols-3 divide-x divide-paper/15 rounded-[1.75rem] border border-paper/15 bg-heather-950/45 backdrop-blur-md [animation-delay:150ms]">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 py-5 sm:px-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl leading-none sm:text-4xl">{s.value}</span>
                    <span className="mt-2 block text-xs text-paper/70 sm:text-sm">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The land: text + features on the left, photo pair on the right */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-14 lg:py-32">
        <div>
          <Reveal>
            <Eyebrow>The land</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl lg:text-[3.3rem] xl:text-[3.6rem]">
              Twelve cabins,
              <em className="block text-blossom-500">scattered through the trees.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
              The cabins sit apart along gravel lanes on the mountainside. Between them is nothing but forest and, in season, the wildflowers they&apos;re named for.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 divide-y divide-vellum border-y border-vellum">
              {FEATURES.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex items-start gap-4 py-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                    <Icon className="size-[1.1rem]" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-tight text-heather-900">{title}</span>
                    <span className="mt-1 block text-ink-600">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="grid grid-cols-[1.25fr_1fr] gap-4">
          <figure className="group relative isolate row-span-2 overflow-hidden rounded-[1.75rem] bg-heather-950">
            <Image
              src="/images/property/01.jpg"
              alt="Cabin roofs among trees in fall color, with a bright red tree beside them"
              fill
              sizes="(min-width: 1024px) 26vw, 55vw"
              className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.55),transparent_40%)]" aria-hidden />
            <figcaption className="absolute bottom-3 left-3 rounded-full border border-paper/20 bg-heather-950/50 px-3.5 py-1.5 font-display text-sm text-paper italic backdrop-blur-md sm:text-base">
              Cabins in the canopy
            </figcaption>
          </figure>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-heather-950">
            <Image src="/images/property/08.jpg" alt="Looking up at tall trees in red and gold" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-heather-950">
            <Image src="/images/property/13.jpg" alt="A narrow trail through autumn woods" fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      {/* The River Path: dark band with a bento gallery */}
      <section className="paper relative overflow-hidden bg-heather-900 text-paper">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.18),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <Reveal>
              <Eyebrow dark>The River Path</Eyebrow>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl">
                From your deck
                <em className="block text-blossom-300">down to the water.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="lg:pb-2">
              <p className="max-w-md text-lg leading-relaxed text-paper/75">
                Pack a picnic and follow the trail through the woods. At the bottom, the river bends around a deep, quiet pool: perfect for a summer swim, a fishing line, or sitting on the rocks.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
            {RIVER.map((p, i) => (
              <Reveal
                key={p.src}
                delay={(i % 3) * 0.06}
                className={i === 0 ? "col-span-2 lg:row-span-2" : ""}
              >
                <figure className={`group relative isolate h-full overflow-hidden rounded-[1.75rem] bg-heather-950 ${i === 0 ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.6),transparent_45%)]" aria-hidden />
                  <figcaption className={`absolute bottom-3 left-3 rounded-full border border-paper/20 bg-heather-950/50 px-3.5 py-1.5 font-display italic backdrop-blur-md ${i === 0 ? "text-base sm:text-lg" : "text-sm"}`}>
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Field guide: the wildflowers each cabin is named for */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>A field guide to the names</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-balance text-heather-900 sm:text-6xl">
              Every cabin is named
              <em className="block text-blossom-500">for a mountain plant.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">
              Silverbells in April, laurel in May, blueberries on the ridges by late summer. Here&apos;s the plant behind each name.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {cabins.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.05}>
              <li className="h-full">
                <Link
                  href={`/cabins/${c.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-vellum bg-paper-deep/60 p-5 transition hover:border-heather-700/30 hover:bg-paper-deep sm:p-6"
                >
                  <span className="flex items-start justify-between">
                    <Botanical motif={c.botanical.motif} className="h-14 w-10 text-blossom-500 transition-transform duration-500 group-hover:-rotate-6" />
                    <span className="font-display text-sm text-ink-400 tabular-nums">{String(c.no).padStart(2, "0")}</span>
                  </span>
                  <span className="mt-4 block font-display text-sm text-sage-700 italic">{c.botanical.latin}</span>
                  <span className="mt-0.5 block font-display text-2xl leading-tight text-heather-900">{c.name}</span>
                  <span className="mt-2 block flex-1 text-sm leading-relaxed text-ink-600">{c.botanical.note}.</span>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-heather-700">
                    See the cabin <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      <BookDirect />
    </>
  );
}
