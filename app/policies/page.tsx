import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Mail,
  MessageSquare,
  Navigation,
  PawPrint,
  Phone,
  UserCheck,
} from "lucide-react";
import { cabins } from "@/data/cabins";
import { policies, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { PolicyIndex } from "@/components/policies/PolicyIndex";
import { GROUP_ICONS } from "@/lib/policy-icons";

export const metadata: Metadata = {
  title: "Good to Know",
  description:
    "Check-in and checkout times, pet and age policies, mountain roads and booking terms for Gatlinburg Adventure Cabins.",
};

/** Policy groups, each a list of title + text rows. All values come from data/site.ts. */
const GROUPS = [
  {
    id: "stay",
    eyebrow: "Your stay",
    title: "Arriving & staying",
    rows: [
      {
        title: "Electronic check-in",
        body: "There's no office to visit. Your arrival details and door access are sent before your stay.",
      },
      {
        title: "Age & families",
        body: `The primary renter on every booking must be ${site.minAge} or older. Our studios are built for two; Mountain Laurel, our two-bedroom family cabin, welcomes children.`,
      },
      {
        title: "No smoking",
        body: "All cabins are non-smoking, inside and on the decks.",
      },
      {
        title: "Firewood",
        body: "Every cabin has a wood-burning fireplace. Ask us about firewood when you book.",
      },
    ],
  },
  {
    id: "pets",
    eyebrow: "Pets",
    title: "Bringing your dog",
    rows: [
      {
        title: "Dog-friendly cabins",
        body: "Pine Needle, Teaberry, Mountain Camellia and Sweetbriar welcome dogs. All other cabins are pet-free.",
      },
      {
        title: "Pet fee",
        body: `$${site.pets.feePerDog} per dog, with a maximum of ${site.pets.maxDogs} dogs.`,
      },
      {
        title: "Exceptions",
        body: "Need something different? Just ask us before you book and we'll do our best.",
      },
    ],
  },
  {
    id: "mountain",
    eyebrow: "On the mountain",
    title: "Getting here",
    rows: [
      {
        title: "Mountain roads",
        body: "The cabins sit up steep, winding gravel roads. In winter, a 4-wheel-drive vehicle or chains may be needed.",
      },
      {
        title: "Stairs",
        body: "Most cabins are reached by wooden stairs up to the deck.",
      },
    ],
  },
  {
    id: "booking",
    eyebrow: "Booking",
    title: "Booking & cancellation",
    rows: [
      { title: "Cancellation", body: policies.cancellation },
      {
        title: "Changes",
        body: `To change your dates, call or text ${site.phone} or email ${site.email}.`,
      },
    ],
  },
];

const KEY_FACTS = [
  { icon: UserCheck, value: `${site.minAge}+`, label: "Primary renter" },
  {
    icon: PawPrint,
    value: `$${site.pets.feePerDog}`,
    label: `Per dog · max ${site.pets.maxDogs}`,
  },
];

export default function PoliciesPage() {
  const petCabins = cabins.filter((c) => c.pets);

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-10 lg:px-14 lg:pt-24">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Good to
              know
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">
              Everything you need,
              <em className="block text-blossom-500">before you arrive.</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-ink-600">
              A few simple things that help every stay go smoothly. Anything
              else, just ask.
            </p>
            <a
              href={site.phoneHref}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-heather-700/20 bg-paper px-4 py-2 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50"
            >
              <Phone className="size-4 text-blossom-500" aria-hidden /> Call or
              text {site.phone}
            </a>
          </Reveal>
        </div>

        {/* Key facts */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <div className="paper relative col-span-2 overflow-hidden rounded-[1.75rem] bg-heather-900 p-5 text-paper sm:p-6 lg:col-span-1">
              <Clock className="size-5 text-blossom-300" aria-hidden />
              <p className="mt-5 font-display text-4xl leading-none">
                {site.checkIn}
              </p>
              <p className="mt-2 text-sm text-paper/70">
                Check-in · checkout by {site.checkOut}
              </p>
            </div>
            {KEY_FACTS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-5 sm:p-6"
              >
                <Icon className="size-5 text-blossom-500" aria-hidden />
                <p className="mt-5 font-display text-4xl leading-none text-heather-900">
                  {value}
                </p>
                <p className="mt-2 text-sm text-ink-600">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Policy groups with a sticky index */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-10 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:px-14">
        <PolicyIndex groups={GROUPS.map(({ id, title }) => ({ id, title }))} />

        <div className="min-w-0">
          {GROUPS.map((g) => {
            const Icon = GROUP_ICONS[g.id];
            return (
              <Reveal key={g.id}>
                <section
                  id={g.id}
                  className="scroll-mt-28 border-t border-vellum py-12 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="label text-sage-700">{g.eyebrow}</p>
                      <h2 className="mt-1 font-display text-4xl leading-tight font-medium text-heather-900">
                        {g.title}
                      </h2>
                    </div>
                  </div>

                  <dl className="mt-8 divide-y divide-vellum border-y border-vellum">
                    {g.rows.map((r) => (
                      <div
                        key={r.title}
                        className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-8"
                      >
                        <dt className="font-display text-xl leading-snug text-heather-900">
                          {r.title}
                        </dt>
                        <dd className="leading-relaxed text-ink-600">
                          {r.body}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {g.id === "pets" && (
                    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {petCabins.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/cabins/${c.slug}`}
                            className="group flex items-center gap-3 rounded-full border border-vellum bg-paper p-1.5 pr-4 transition hover:border-heather-700/40"
                          >
                            <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                              <Image
                                src={`/images/${c.slug}/01.jpg`}
                                alt=""
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </span>
                            <span className="font-display text-base leading-tight text-heather-900 group-hover:text-blossom-500">
                              {c.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {g.id === "mountain" && (
                    <p className="mt-6 flex items-start gap-3 rounded-[1.25rem] bg-blossom-100 p-5 text-sm leading-relaxed text-heather-900">
                      <Navigation
                        className="mt-0.5 size-4 shrink-0 text-blossom-500"
                        aria-hidden
                      />
                      <span>
                        <span className="font-semibold">
                          Don&apos;t follow your GPS past the drive.
                        </span>{" "}
                        It often suggests a route that isn&apos;t passable. For
                        maps, the private drive starts at{" "}
                        <a
                          href={site.mapsUrl}
                          target="_blank"
                          rel="noopener"
                          className="font-semibold underline-offset-2 hover:underline"
                        >
                          {site.address.street}, {site.address.city},{" "}
                          {site.address.region} {site.address.zip}
                        </a>
                        ; from there, use the arrival directions we send after
                        you book.
                      </span>
                    </p>
                  )}
                </section>
              </Reveal>
            );
          })}

          {/* Questions: a light card at the end of the content, not another dark band above the footer */}
          <Reveal>
            <div className="mt-4 flex flex-col gap-6 rounded-[1.75rem] border border-vellum bg-paper-deep/60 p-7 sm:p-9 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-display text-3xl leading-tight font-medium text-heather-900 sm:text-4xl">
                  Still wondering about something?
                  <em className="block text-blossom-500">
                    We&apos;re happy to help.
                  </em>
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-heather-700"
                >
                  <Phone className="size-4" aria-hidden /> Call {site.phone}
                </a>
                <a
                  href={site.smsHref}
                  className="inline-flex items-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50"
                >
                  <MessageSquare className="size-4" aria-hidden /> Text
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50"
                >
                  <Mail className="size-4" aria-hidden /> Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
