import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Footprints, Trees } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Botanical } from "@/components/ui/Botanical";

export const metadata: Metadata = {
  title: "The Mountain & River Path",
  description: `${site.acres} wooded acres, a private trail and about ${site.riverFrontageFt} feet of riverbank with a swimming hole, just for our guests.`,
};

const FEATURES = [
  { icon: Trees, title: `${site.acres} acres of forest`, body: "Tall hardwoods and pines that turn gold, red and copper every October." },
  { icon: Footprints, title: "The River Path", body: "A walking trail from the cabins down through the woods to the water." },
  { icon: Droplets, title: "A swimming hole", body: `A deep, quiet pool at a bend in the river, with ${site.riverFrontageFt} ft of riverbank.` },
];

const strip = ["02", "06", "15", "10", "08", "13"];

export default function PropertyPage() {
  return (
    <>
      <section className="relative h-[82vh] max-h-[860px] min-h-[560px]">
        <Image src="/images/property/04.jpg" alt="Aerial view of the river winding through fall forest" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-heather-950/85 via-heather-950/25 to-heather-950/10" aria-hidden />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-16 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl text-paper">
            <p className="label text-blossom-300">{site.place}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.98] font-medium sm:text-7xl">Thirty acres of woods, and a river all your own.</h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            label="The land"
            title={<>Twelve cabins, scattered through the <em className="text-blossom-500">trees</em>.</>}
            intro="The cabins sit apart from one another along gravel lanes on the mountainside, each marked with its own hand-carved sign. Between them is nothing but forest, birdsong and, in season, the wildflowers they're named for."
          />
          <div className="grid gap-5">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.08} className="flex gap-5 rounded-3xl border border-vellum bg-white/60 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sage-200 text-sage-700"><Icon className="size-5" aria-hidden /></span>
                <span>
                  <span className="block font-display text-2xl font-semibold text-heather-900">{title}</span>
                  <span className="mt-1 block text-ink-600">{body}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper bg-heather-900 py-24 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading tone="dark" label="The River Path" title="From your deck to the water." intro="Pack a picnic and follow the trail down through the woods. At the bottom, the river makes a slow bend around a deep pool, perfect for a summer swim, a fly-fishing line or simply sitting on the rocks." />
          <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {strip.map((n, i) => (
              <Reveal key={n} delay={(i % 3) * 0.06} className={`relative overflow-hidden ${i === 0 ? "arch row-span-2 aspect-[3/5] md:aspect-auto" : "aspect-[4/3] rounded-2xl"}`}>
                <Image src={`/images/property/${n}.jpg`} alt="The river and forest trail on the property" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Botanical motif="ray" className="mx-auto h-24 w-16 text-honey-500" />
          <h2 className="mt-6 font-display text-4xl leading-tight font-medium text-heather-900 sm:text-5xl">Come for the cabin. Stay for the mountain.</h2>
          <Link href="/cabins" className="mt-9 inline-flex items-center gap-2 rounded-full bg-heather-700 px-8 py-4 font-semibold text-paper transition hover:bg-heather-900">
            Choose your cabin <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
