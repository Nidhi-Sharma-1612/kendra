import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
} from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, text or email ${site.name} with questions about a stay.`,
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="label flex items-center gap-3 text-sage-700">
      <span className="h-px w-8 bg-sage-500/60" aria-hidden /> {children}
    </p>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-10 lg:px-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">
              We&apos;d love to
              <em className="block text-blossom-500">hear from you.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">
              Questions about a cabin, a celebration or your reservation? Call,
              text or email, and a real person will help.
            </p>
          </Reveal>
        </div>

        {/* One dark "talk to us" panel (left) beside the light form (right), equal height */}
        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-6">
          <Reveal delay={0.1} className="h-full">
            <div className="paper relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-heather-900 p-7 text-paper sm:p-9">
              <div
                className="pointer-events-none absolute -top-28 -right-28 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.25),transparent)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(111_90_124/0.4),transparent)]"
                aria-hidden
              />

              <div className="relative">
                <p className="label text-blossom-300">Call or text</p>
                <a
                  href={site.phoneHref}
                  className="mt-3 block font-display text-[2.6rem] leading-none hover:text-blossom-100 sm:text-5xl"
                >
                  {site.phone}
                </a>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-heather-900 transition hover:bg-blossom-100"
                  >
                    <Phone className="size-4" aria-hidden /> Call
                  </a>
                  <a
                    href={site.smsHref}
                    className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-5 py-2.5 text-sm font-semibold transition hover:bg-paper/20"
                  >
                    <MessageSquare className="size-4" aria-hidden /> Text
                  </a>
                </div>
              </div>

              <ul className="relative mt-9 divide-y divide-paper/15 border-y border-paper/15">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-center gap-4 py-5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blossom-300/20 text-blossom-300">
                      <Mail className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label block !text-[0.62rem] text-paper/55">
                        Email
                      </span>
                      {/* Wraps only after the @ on narrow screens. */}
                      <span className="mt-1 block font-display text-lg leading-tight sm:text-xl">
                        {site.email.split("@")[0]}@<wbr />
                        {site.email.split("@")[1]}
                      </span>
                      <span className="block text-sm text-paper/60">
                        Best for longer questions or booking changes
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-paper/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center gap-4 py-5"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blossom-300/20 text-blossom-300">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label block !text-[0.62rem] text-paper/55">
                        Find us
                        <span className="hidden sm:inline"> · {site.place}</span>
                      </span>
                      <span className="mt-1 block font-display text-xl leading-tight">
                        {site.address.street}
                      </span>
                      <span className="block text-sm text-paper/60">
                        {site.address.city}, {site.address.region}{" "}
                        {site.address.zip}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-paper/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              </ul>

              {/* Photo fills the spare height beside the form on desktop */}
              <figure className="relative mt-8 hidden min-h-40 flex-1 overflow-hidden rounded-[1.25rem] lg:block">
                <Image
                  src="/images/property/01.jpg"
                  alt="Cabin roofs among trees in fall color, with a bright red tree beside them"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </figure>

              <p className="relative mt-auto flex items-start gap-2.5 pt-8 text-sm leading-relaxed text-paper/65 lg:mt-0 lg:pt-6">
                <Navigation
                  className="mt-0.5 size-4 shrink-0 text-blossom-300"
                  aria-hidden
                />
                The address marks the start of the private drive. Arrival
                directions are sent after you book, so please don&apos;t rely on
                GPS past that point.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Answers live on Good to know, so Contact stays focused on getting in touch */}
      <section className="border-t border-vellum bg-paper-deep/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-14">
          <div>
            <h2 className="font-display text-3xl leading-tight font-medium text-heather-900 sm:text-4xl">
              Most answers are in{" "}
              <em className="text-blossom-500">Good to know.</em>
            </h2>
            <p className="mt-2 text-ink-600">
              Check-in times, children, pets, mountain roads and booking terms.
            </p>
          </div>
          <Link
            href="/policies"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-heather-900 py-2 pr-2 pl-6 text-sm font-semibold text-paper transition hover:bg-heather-700 md:self-auto"
          >
            Good to know
            <span className="grid size-9 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
