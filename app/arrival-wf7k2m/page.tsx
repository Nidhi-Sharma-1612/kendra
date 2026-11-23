import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Camera, Clock, KeyRound, MapPin, MessageSquare, Phone, TriangleAlert } from "lucide-react";
import { site } from "@/data/site";
import { checkIn, gpsLandmark, houseNotes, steps } from "@/data/arrival";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Private arrival guide for confirmed guests. Not linked anywhere, not in the sitemap, and noindex.
 * Built phone-first: guests read it in the car. The route folder name must match ARRIVAL_PATH in
 * data/arrival.ts.
 */
export const metadata: Metadata = {
  title: "Your arrival guide",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`label flex items-center gap-3 ${dark ? "text-blossom-300" : "text-sage-700"}`}>
      <span className={`h-px w-8 ${dark ? "bg-blossom-300/60" : "bg-sage-500/60"}`} aria-hidden /> {children}
    </p>
  );
}

export default function ArrivalGuidePage() {
  const address = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}`;

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-10 sm:px-10 lg:pt-20">
        <Reveal>
          <Eyebrow>Your arrival guide</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">
            Welcome,
            <em className="block text-blossom-500">you&apos;re almost here.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            The last few miles are mountain roads, and phone maps often get them wrong. Keep this page open and follow it step by step.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            <div className="rounded-[1.5rem] border border-vellum bg-paper-deep/60 p-5">
              <Clock className="size-5 text-blossom-500" aria-hidden />
              <dt className="mt-4 text-sm text-ink-600">Check-in from</dt>
              <dd className="font-display text-3xl leading-tight text-heather-900">{site.checkIn}</dd>
            </div>
            <div className="rounded-[1.5rem] border border-vellum bg-paper-deep/60 p-5">
              <Clock className="size-5 text-blossom-500" aria-hidden />
              <dt className="mt-4 text-sm text-ink-600">Checkout by</dt>
              <dd className="font-display text-3xl leading-tight text-heather-900">{site.checkOut}</dd>
            </div>
            <div className="paper relative col-span-2 overflow-hidden rounded-[1.5rem] bg-heather-900 p-5 text-paper sm:col-span-1">
              <Phone className="size-5 text-blossom-300" aria-hidden />
              <dt className="mt-4 text-sm text-paper/70">Lost? Call or text</dt>
              <dd>
                <a href={site.phoneHref} className="font-display text-3xl leading-tight hover:text-blossom-100">
                  {site.phone}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      {/* GPS warning */}
      <section className="mx-auto max-w-5xl px-4 sm:px-10">
        <Reveal>
          <div className="flex items-start gap-4 rounded-[1.75rem] bg-blossom-100 p-6 sm:p-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blossom-500 text-paper">
              <TriangleAlert className="size-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-3xl leading-tight text-heather-900 sm:text-4xl">Don&apos;t follow your GPS past {gpsLandmark}.</p>
              <p className="mt-2 leading-relaxed text-heather-900/80">
                GPS apps often send guests up a road that isn&apos;t passable. Use maps to reach the start of the private drive, then switch to these directions.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Start point */}
      <section className="mx-auto max-w-5xl px-4 pt-6 sm:px-10">
        <Reveal>
          <a href={site.mapsUrl} target="_blank" rel="noopener" className="group flex items-center gap-4 rounded-[1.5rem] border border-vellum bg-paper p-4 pr-5 transition hover:border-heather-700/40">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-heather-900 text-paper">
              <MapPin className="size-[1.1rem]" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="label block text-ink-400">Set your maps app to</span>
              <span className="mt-1 block font-display text-xl leading-tight text-heather-900">{address}</span>
            </span>
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-heather-900 text-paper transition group-hover:bg-heather-700 sm:hidden">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
            <span className="hidden shrink-0 rounded-full bg-heather-900 px-4 py-2 text-sm font-semibold text-paper transition group-hover:bg-heather-700 sm:inline-flex">Open maps</span>
          </a>
        </Reveal>
      </section>

      {/* Step-by-step */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-10 lg:py-24">
        <Reveal>
          <Eyebrow>Step by step</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
            From the drive
            <em className="block text-blossom-500">to your front door.</em>
          </h2>
        </Reveal>

        <ol className="relative mt-12 space-y-10">
          {/* Trail line joining the step numbers */}
          <span className="absolute top-2 bottom-2 left-[1.375rem] border-l-2 border-dashed border-sage-500/40" aria-hidden />
          {steps.map((s, i) => (
            <Reveal key={i}>
              <li className="relative grid grid-cols-[2.75rem_1fr] gap-4 sm:gap-6">
                <span
                  className={`relative z-10 grid size-11 place-items-center rounded-full font-display text-lg ${
                    s.warn ? "bg-blossom-500 text-paper" : "border border-sage-500/40 bg-paper text-heather-900"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid gap-5 pt-1.5 md:grid-cols-[1fr_16rem] md:items-start">
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-heather-900 sm:text-[1.7rem]">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-600">{s.body}</p>
                    {s.look && (
                      <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${s.warn ? "bg-blossom-100 text-heather-900" : "bg-sage-200/60 text-sage-700"}`}>
                        {s.warn ? <TriangleAlert className="size-4 text-blossom-500" aria-hidden /> : <MapPin className="size-4" aria-hidden />}
                        {s.look}
                      </p>
                    )}
                  </div>
                  {s.photo ? (
                    <figure className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-heather-950 md:aspect-[4/3]">
                      <Image src={s.photo} alt={s.title} fill sizes="(min-width: 768px) 16rem, 90vw" className="object-cover" />
                    </figure>
                  ) : (
                    <div className="grid aspect-[16/10] place-items-center md:aspect-[4/3] rounded-[1.25rem] border-2 border-dashed border-vellum bg-paper-deep/50 text-center text-ink-400">
                      <span className="flex flex-col items-center gap-2 text-xs font-medium">
                        <Camera className="size-5" aria-hidden /> Photo of this turn
                      </span>
                    </div>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Getting in */}
      <section className="paper relative overflow-hidden bg-heather-900 text-paper">
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.2),transparent)]" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-10 lg:py-24">
          <Reveal>
            <Eyebrow dark>Getting in</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium sm:text-5xl">
              No office, no keys.
              <em className="block text-blossom-300">Just your code.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-4 md:grid-cols-3">
              {checkIn.map((c, i) => (
                <div key={c.title} className="rounded-[1.5rem] border border-paper/15 bg-paper/5 p-6">
                  {i === 0 && <KeyRound className="mb-4 size-5 text-blossom-300" aria-hidden />}
                  <dt className="font-display text-2xl leading-tight">{c.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-paper/70">{c.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* House notes */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-10 lg:py-24">
        <Reveal>
          <Eyebrow>While you&apos;re here</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
            A few <em className="text-blossom-500">cabin notes.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="mt-10 divide-y divide-vellum border-y border-vellum">
            {houseNotes.map((n) => (
              <div key={n.title} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="font-display text-xl leading-snug text-heather-900">{n.title}</dt>
                <dd className="leading-relaxed text-ink-600">{n.body}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Help */}
        <Reveal>
          <div className="mt-12 flex flex-col gap-5 rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-3xl leading-tight text-heather-900">Stuck on the way up?</p>
              <p className="mt-1 text-ink-600">Pull over somewhere safe and call or text. We&apos;ll talk you in.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-heather-700">
                <Phone className="size-4" aria-hidden /> Call
              </a>
              <a href={site.smsHref} className="inline-flex items-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50">
                <MessageSquare className="size-4" aria-hidden /> Text
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
