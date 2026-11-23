import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MessageSquare, Phone } from "lucide-react";
import { site } from "@/data/site";
import { addOns, specials } from "@/data/specials";
import { Reveal } from "@/components/ui/Reveal";
import { BookDirect } from "@/components/home/BookDirect";

export const metadata: Metadata = {
  title: "Specials",
  description: "Honeymoon itineraries, anniversary and proposal touches, Smokies adventures and in-cabin add-ons like couples massage and a private chef.",
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? "text-blossom-300" : "text-sage-700"}`}>
      <span className={`h-px w-8 ${dark ? "bg-blossom-300/60" : "bg-sage-500/60"}`} aria-hidden /> {children}
    </p>
  );
}

export default function SpecialsPage() {
  return (
    <>
      {/* Hero: full-bleed photo, heading bottom-left */}
      <section className="relative isolate flex min-h-[70svh] items-end">
        <div className="absolute inset-0 -z-10 overflow-hidden bg-heather-950">
          <Image src="/images/passion-flower/02.jpg" alt="A cabin bed facing a lit stone fireplace, with a red jacuzzi beside it" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-heather-950/40" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(42_32_48/0.85),transparent_65%)]" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_32_48/0.6),transparent_65%)]" aria-hidden />
        </div>
        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-12 text-paper sm:px-10 sm:pb-16 lg:px-14">
          <div className="rise max-w-3xl">
            <Eyebrow dark>Specials &amp; add-ons</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-balance sm:text-7xl">
              Make your stay
              <em className="block text-blossom-300">a little more special.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/80">
              Honeymoons, anniversaries and mountain adventures. Tell us what you&apos;re planning, and we&apos;ll take care of the details.
            </p>
          </div>
        </div>
      </section>

      {/* Packages: three cards side by side, scannable at a glance */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>Packages</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl">
              Three ways to
              <em className="block text-blossom-500">make it yours.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">Each one starts with a conversation. Tell us your dates and what you have in mind, and we&apos;ll plan the rest.</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {specials.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <article id={s.id} className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border border-vellum bg-paper-deep/60">
                <figure className="group relative isolate aspect-[4/3] overflow-hidden bg-heather-950">
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    style={s.image.position ? { objectPosition: s.image.position } : undefined}
                    className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.5),transparent_45%)]" aria-hidden />
                  <span className="absolute top-4 left-4 grid size-10 place-items-center rounded-full border border-paper/25 bg-heather-950/45 font-display text-base text-paper backdrop-blur-md">
                    0{i + 1}
                  </span>
                  {s.note && (
                    <figcaption className="absolute bottom-4 left-4 rounded-full border border-paper/20 bg-heather-950/50 px-3.5 py-1 font-display text-sm text-paper italic backdrop-blur-md">
                      {s.note}
                    </figcaption>
                  )}
                </figure>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="label text-sage-700">{s.eyebrow}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight font-medium text-heather-900">
                    {s.title} <em className="text-blossom-500">{s.accent}</em>
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-600">{s.body}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-heather-900">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                          <Check className="size-3" aria-hidden />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="group mt-7 inline-flex items-center gap-3 self-start rounded-full bg-heather-900 py-2 pr-2 pl-6 text-sm font-semibold text-paper transition hover:bg-heather-700"
                  >
                    Ask about this
                    <span className="grid size-9 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Add-ons: a light "menu" card beside the roses photo */}
      <section id="add-ons" className="scroll-mt-20 border-t border-vellum bg-paper-deep/60">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-4 py-24 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:px-14 lg:py-32">
          <Reveal className="h-full">
            <figure className="relative isolate aspect-[4/3] h-full overflow-hidden rounded-[1.75rem] bg-heather-950 lg:aspect-auto">
              <Image
                src="/images/passion-flower/11.jpg"
                alt="A rose in a vase, a lit candle and two place settings on a table by the fire"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="-z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.5),transparent_40%)]" aria-hidden />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-paper/20 bg-heather-950/50 px-4 py-1.5 font-display text-base text-paper italic backdrop-blur-md">
                Waiting when you arrive
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <Eyebrow>Add-ons</Eyebrow>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] font-medium text-heather-900 sm:text-6xl lg:text-[3.3rem]">
              Little extras,
              <em className="block text-blossom-500">waiting in the cabin.</em>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-600">Add any of these to your stay. Prices on request; just ask when you book.</p>

            {/* Menu: name, dotted leader, note */}
            <ul className="mt-8 space-y-3.5">
              {addOns.map((a) => (
                <li key={a.title} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="shrink-0 font-display text-xl leading-tight text-heather-900">{a.title}</span>
                  <span className="hidden min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-heather-700/30 sm:block" aria-hidden />
                  <span className="text-sm text-ink-600 sm:shrink-0 sm:text-right">{a.body}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-heather-700">
                <Phone className="size-4" aria-hidden /> Call {site.phone}
              </a>
              <a href={site.smsHref} className="inline-flex items-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50">
                <MessageSquare className="size-4" aria-hidden /> Text us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BookDirect />
    </>
  );
}
