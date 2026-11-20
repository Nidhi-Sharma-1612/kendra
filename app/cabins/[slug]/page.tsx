import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Check, ChevronRight, Clock, MapPin, PawPrint, Sparkles, Users } from "lucide-react";
import { amenitiesFor, cabins, cover, getCabin, photos } from "@/data/cabins";
import { policies, site } from "@/data/site";
import { getFromPrices } from "@/lib/webrez";
import { parseSearch } from "@/lib/search";
import { iconFor, nearbyByDistance } from "@/lib/places";
import { Gallery } from "@/components/cabin/Gallery";
import { StayProvider } from "@/components/booking/Stay";
import { RateCalendar } from "@/components/booking/RateCalendar";
import { MobileReserveBar, ReserveCard } from "@/components/booking/ReserveCard";
import { CabinTile } from "@/components/ui/CabinTile";

export const revalidate = 3600;

export function generateStaticParams() {
  return cabins.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cabins/[slug]">): Promise<Metadata> {
  const cabin = getCabin((await params).slug);
  if (!cabin) return {};
  return {
    title: `${cabin.name} · ${cabin.tagline}`,
    description: cabin.story[0],
    openGraph: { images: [cover(cabin)] },
  };
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "availability", label: "Rates & dates" },
  { id: "amenities", label: "Amenities" },
  { id: "know", label: "Good to know" },
  { id: "location", label: "Location" },
];

/** Content section with the site's eyebrow + heading pattern. */
function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-vellum py-14">
      <p className="label flex items-center gap-3 text-sage-700">
        <span className="h-px w-8 bg-sage-500/60" aria-hidden /> {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-heather-900">{title}</h2>
      {intro && <p className="mt-3 max-w-xl text-ink-600">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default async function CabinPage({ params, searchParams }: PageProps<"/cabins/[slug]">) {
  const cabin = getCabin((await params).slug);
  if (!cabin) notFound();
  // Dates carried over from the availability search.
  const search = parseSearch(await searchParams);
  const prices = await getFromPrices(cabins.map((c) => c.webrezId));
  const fromPrice = prices[cabin.webrezId];
  const others = cabins.filter((c) => c.slug !== cabin.slug).sort((a, b) => ((a.no - cabin.no + 12) % 12) - ((b.no - cabin.no + 12) % 12)).slice(0, 3);

  const facts = [
    { icon: Users, label: `Sleeps ${cabin.sleeps}` },
    { icon: BedDouble, label: cabin.kind === "two-bedroom" ? `${cabin.bedrooms} bedrooms · ${cabin.bed}` : cabin.bed },
    { icon: Bath, label: `${cabin.baths} bath${cabin.baths > 1 ? "s" : ""}` },
    ...(cabin.pets ? [{ icon: PawPrint, label: "Pet-friendly" }] : []),
  ];

  return (
    <StayProvider slug={cabin.slug} name={cabin.name} initialCheckin={search?.checkin} initialCheckout={search?.checkout}>
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-10 lg:px-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/cabins" className="hover:text-heather-700">
            Cabins
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-heather-700">{cabin.name}</span>
        </nav>

        {/* Header: eyebrow + name + rose-italic tagline; facts and the plant on the right */}
        <header className="mt-8 mb-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="label flex items-center gap-3 text-sage-700">
              <span className="h-px w-8 bg-sage-500/60" aria-hidden />
              {cabin.kind === "two-bedroom" ? "Two-bedroom log cabin" : "Studio cabin for two"}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">{cabin.name}</h1>
            <p className="mt-3 max-w-xl font-display text-2xl leading-snug text-blossom-500 italic sm:text-3xl">{cabin.tagline}</p>
          </div>
          <div className="lg:pb-2">
            <ul className="flex flex-wrap gap-2">
              {facts.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 rounded-full border border-heather-700/15 bg-paper px-3.5 py-1.5 text-sm text-heather-900">
                  <Icon className="size-4 text-blossom-500" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">
              <span className="font-display text-base text-heather-900 italic">{cabin.botanical.latin}</span> · {cabin.botanical.note}
            </p>
          </div>
        </header>

        <Gallery photos={photos(cabin)} alts={cabin.photoAlts} name={cabin.name} />
      </div>

      {/* Sticky section nav */}
      <div className="sticky top-[4.5rem] z-30 mt-10 border-y border-vellum bg-paper/92 backdrop-blur">
        <nav aria-label="Sections" className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-4 text-sm font-medium whitespace-nowrap text-ink-600 sm:px-10 lg:px-14">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="border-b-2 border-transparent py-3.5 transition hover:border-blossom-500 hover:text-heather-900">
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-28 sm:px-10 lg:grid-cols-[1fr_22rem] lg:px-14 xl:grid-cols-[1fr_24rem] xl:gap-16">
        <div className="min-w-0">
          {/* Overview */}
          <section id="overview" className="scroll-mt-36 py-14">
            <div className="space-y-5 text-lg leading-relaxed text-ink-600">
              {cabin.story.map((p, i) => (
                <p key={i} className={i === 0 ? "font-display text-[1.75rem] leading-snug text-heather-900" : ""}>
                  {p}
                </p>
              ))}
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {cabin.highlights.map((h) => (
                <li key={h} className="rounded-[1.25rem] border border-vellum bg-paper-deep/60 p-5">
                  <span className="grid size-10 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <p className="mt-4 font-display text-xl leading-snug text-heather-900">{h}</p>
                </li>
              ))}
            </ul>
          </section>

          <Section id="availability" eyebrow="Rates & dates" title="Live rates & availability" intro="Nightly rates straight from our booking system. Choose a check-in date, then a checkout date.">
            <div className="overflow-x-auto rounded-[1.75rem] border border-vellum bg-paper p-4 sm:p-6">
              <RateCalendar />
            </div>
          </Section>

          <Section id="amenities" eyebrow="Amenities" title="What's inside">
            <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
              {amenitiesFor(cabin).map((a) => (
                <li key={a} className="flex items-center gap-3 text-ink-600">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-sage-200/70 text-sage-700">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="know" eyebrow="Before you go" title="Good to know">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-heather-900 p-5 text-paper">
                <Clock className="size-5 text-blossom-300" aria-hidden />
                <p className="mt-3 font-display text-xl">Check-in after {site.checkIn}</p>
                <p className="text-sm text-paper/70">Checkout by {site.checkOut}</p>
              </div>
              {policies.items
                .filter((p) => p.title !== "Check-in & checkout" && (p.title !== "Pets" || cabin.pets) && (p.title !== "Adults only" || cabin.kind === "studio"))
                .slice(0, 3)
                .map((p) => (
                  <div key={p.title} className="rounded-[1.25rem] border border-vellum bg-paper p-5">
                    <p className="font-display text-xl text-heather-900">{p.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.body}</p>
                  </div>
                ))}
            </div>
            <p className="mt-5 text-sm text-ink-600">
              {policies.cancellation}{" "}
              <Link href="/policies" className="font-semibold text-heather-700 hover:underline">
                All policies →
              </Link>
            </p>
          </Section>

          <Section id="location" eyebrow="Location" title="Where you'll be">
            <p className="flex items-start gap-3 text-ink-600">
              <MapPin className="mt-1 size-5 shrink-0 text-blossom-500" aria-hidden />
              On {site.place}, near {site.address.city}, Tennessee. Exact directions are sent after booking; the last stretch is a winding mountain road.
            </p>
            <ul className="mt-6 divide-y divide-vellum border-y border-vellum">
              {nearbyByDistance().map((n) => {
                const Icon = iconFor(n.place);
                return (
                  <li key={n.place} className="flex items-center gap-4 py-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-blossom-100 text-blossom-500">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg leading-tight text-heather-900">{n.place}</span>
                      <span className="block text-sm text-ink-600">{n.note}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-heather-900 px-3.5 py-1.5 text-xs font-semibold text-paper">{n.time}</span>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-36 pt-14">
            <ReserveCard fromPrice={fromPrice} />
            <p className="mt-4 text-center text-sm text-ink-600">
              Questions about {cabin.name}?{" "}
              <a href={site.phoneHref} className="font-semibold text-heather-700 hover:underline">
                {site.phone}
              </a>
            </p>
          </div>
        </aside>
      </div>

      <section className="border-t border-vellum bg-paper-deep/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-10 lg:px-14">
          <p className="label flex items-center gap-3 text-sage-700">
            <span className="h-px w-8 bg-sage-500/60" aria-hidden /> Keep wandering
          </p>
          <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
            More cabins
            <em className="block text-blossom-500">on the mountain.</em>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <CabinTile key={c.slug} cabin={c} fromPrice={prices[c.webrezId]} />
            ))}
          </div>
        </div>
      </section>

      <MobileReserveBar fromPrice={fromPrice} />
    </StayProvider>
  );
}
