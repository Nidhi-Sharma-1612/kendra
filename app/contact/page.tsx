import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { title: "Contact", description: `Call or email ${site.name} with questions about a stay.` };

const FAQ = [
  { q: "Can we bring children?", a: `Our cabins are romantic retreats for adults; guests must be ${site.minAge} or older.` },
  { q: "Can we bring our dog?", a: "Pine Needle and Teaberry are pet-friendly by arrangement. Please call us before booking." },
  { q: "Do we need a 4-wheel-drive?", a: "Most of the year, no. The roads are steep and winding gravel, so in winter weather a 4WD vehicle or chains may be needed." },
  { q: "Is there firewood?", a: "Each cabin has a wood-burning fireplace. Ask us about firewood when you book." },
  { q: "Can you help with a proposal or anniversary?", a: "We'd love to. Ask about roses, chocolates or an in-cabin couples massage." },
];

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
        <Reveal>
          <p className="label text-sage-700">Contact</p>
          <h1 className="mt-4 font-display text-5xl leading-none font-medium text-heather-900 sm:text-6xl">We&apos;d love to hear from you.</h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">Questions about a cabin, a special occasion or your reservation? Call or email and a real person will help.</p>
          <ul className="mt-10 space-y-4">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-5 rounded-3xl border border-vellum bg-white/60 p-5 transition hover:border-heather-500">
                <span className="grid size-12 place-items-center rounded-full bg-blossom-100 text-blossom-500"><Phone className="size-5" aria-hidden /></span>
                <span><span className="label block text-ink-400">Call</span><span className="font-display text-2xl font-semibold text-heather-900">{site.phone}</span></span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-5 rounded-3xl border border-vellum bg-white/60 p-5 transition hover:border-heather-500">
                <span className="grid size-12 place-items-center rounded-full bg-blossom-100 text-blossom-500"><Mail className="size-5" aria-hidden /></span>
                <span><span className="label block text-ink-400">Email</span><span className="font-display text-2xl font-semibold text-heather-900">{site.email}</span></span>
              </a>
            </li>
            <li className="flex items-center gap-5 rounded-3xl border border-vellum bg-white/60 p-5">
              <span className="grid size-12 place-items-center rounded-full bg-blossom-100 text-blossom-500"><MapPin className="size-5" aria-hidden /></span>
              <span><span className="label block text-ink-400">Where</span><span className="text-heather-900">{site.place}, near {site.address.city}, TN. Directions sent after booking.</span></span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="arch plate relative hidden aspect-[4/5] lg:block">
          <Image src="/images/forget-me-not/01.jpg" alt="Forget Me Not cabin in the treetops" fill sizes="40vw" className="object-cover" />
        </Reveal>
      </section>

      <section className="border-t border-vellum bg-paper-deep">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-4xl font-medium text-heather-900">Questions we hear often</h2>
          <div className="mt-8 divide-y divide-vellum border-y border-vellum">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold text-heather-900">
                  {f.q}
                  <span className="text-2xl text-blossom-500 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
