import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Botanical } from "@/components/ui/Botanical";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  CalendarX2,
  ChevronRight,
  Coffee,
  CookingPot,
  Flame,
  Heart,
  House,
  KeyRound,
  MapPin,
  Mountain,
  Navigation,
  PawPrint,
  Phone,
  ScrollText,
  Snowflake,
  Sofa,
  Sparkles,
  Star,
  Tv,
  Users,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { amenitiesFor, cabins, cover, getCabin, photos, type Cabin } from "@/data/cabins";
import { policies, site } from "@/data/site";
import { reviews, reviewStats } from "@/data/reviews";
import { getFromPrices } from "@/lib/webrez";
import { parseSearch } from "@/lib/search";
import { nearbyByDistance } from "@/lib/places";
import { Gallery } from "@/components/cabin/Gallery";
import { SectionNav } from "@/components/cabin/SectionNav";
import { StayProvider } from "@/components/booking/Stay";
import { BookingPanel } from "@/components/booking/BookingPanel";
import { CabinTile } from "@/components/ui/CabinTile";
import { ReviewCard } from "@/components/reviews/ReviewCard";

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

/** Icon for an amenity line, matched by keyword. */
function amenityIcon(a: string): LucideIcon {
  if (/jacuzzi/i.test(a)) return Heart;
  if (/hot tub/i.test(a)) return Waves;
  if (/fireplace/i.test(a)) return Flame;
  if (/bed|bedroom/i.test(a)) return BedDouble;
  if (/kitchen|dining|grill/i.test(a)) return CookingPot;
  if (/coffee|microwave|fridge/i.test(a)) return Coffee;
  if (/air conditioning|heat/i.test(a)) return Snowflake;
  if (/wi-fi/i.test(a)) return Wifi;
  if (/tv/i.test(a)) return Tv;
  if (/porch|swing|rocker/i.test(a)) return Sofa;
  if (/bath|washer/i.test(a)) return Bath;
  if (/dog|pet/i.test(a)) return PawPrint;
  return Sparkles;
}

/** Index of the first photo whose alt text matches, so cards can show the cabin's own photo. */
function photoFor(cabin: Cabin, match: RegExp, avoid?: RegExp): string | undefined {
  const i = cabin.photoAlts.findIndex((a) => match.test(a) && !(avoid && avoid.test(a)));
  return i >= 0 ? photos(cabin)[i] : undefined;
}

/** Beds and baths, from the confirmed WebRez facts, each with the cabin's own photo when there is one. */
function sleeping(cabin: Cabin) {
  if (cabin.kind === "two-bedroom") {
    return [
      { icon: BedDouble, title: "King bed", note: "Upstairs suite, with a heart-shaped jacuzzi", photo: photoFor(cabin, /king suite/i) },
      { icon: BedDouble, title: "Queen bed", note: "Downstairs bedroom", photo: photoFor(cabin, /queen/i) },
      { icon: Bath, title: `${cabin.baths} bathrooms`, note: "Both full bathrooms", photo: photoFor(cabin, /bathroom/i) },
    ];
  }
  return [
    { icon: BedDouble, title: cabin.bed, note: "Facing the stone fireplace", photo: photoFor(cabin, /bed/i, /jacuzzi|fireplace|bedroom/i) },
    { icon: Heart, title: "Heart-shaped jacuzzi", note: "For two, a few steps from the bed", photo: photoFor(cabin, /jacuzzi/i, /bed/i) },
    { icon: Bath, title: `${cabin.baths} bathroom`, note: "Private, inside the cabin", photo: photoFor(cabin, /bathroom/i) },
  ];
}

/** Section with the site's eyebrow + heading pattern. */
function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-vellum py-14 first:border-t-0">
      <p className="label flex items-center gap-3 text-sage-700">
        <span className="h-px w-8 bg-sage-500/60" aria-hidden /> {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-heather-900">{title}</h2>
      {intro && <p className="mt-3 max-w-xl text-ink-600">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function KnowCard({ icon: Icon, title, dark = false, children }: { icon: LucideIcon; title: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col rounded-[1.5rem] p-6 ${dark ? "paper relative overflow-hidden bg-heather-900 text-paper" : "border border-vellum bg-paper-deep/60"}`}>
      <span className={`grid size-10 place-items-center rounded-full ${dark ? "bg-blossom-300/20 text-blossom-300" : "bg-blossom-100 text-blossom-500"}`}>
        <Icon className="size-[1.1rem]" aria-hidden />
      </span>
      <h3 className={`mt-4 font-display text-2xl leading-tight ${dark ? "" : "text-heather-900"}`}>{title}</h3>
      <div className={`mt-3 flex-1 text-[0.95rem] leading-relaxed ${dark ? "text-paper/75" : "text-ink-600"}`}>{children}</div>
    </div>
  );
}

export default async function CabinPage({ params, searchParams }: PageProps<"/cabins/[slug]">) {
  const cabin = getCabin((await params).slug);
  if (!cabin) notFound();
  // Dates and guests carried over from the availability search.
  const search = parseSearch(await searchParams);
  const prices = await getFromPrices(cabins.map((c) => c.webrezId));
  const fromPrice = prices[cabin.webrezId];
  const others = cabins.filter((c) => c.slug !== cabin.slug).sort((a, b) => ((a.no - cabin.no + 12) % 12) - ((b.no - cabin.no + 12) % 12)).slice(0, 3);
  const cabinReviews = reviews.filter((r) => r.cabinSlug === cabin.slug);
  const { average, total } = reviewStats(cabinReviews);
  const family = cabin.kind === "two-bedroom";
  const address = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.zip}`;

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "sleeping", label: "Sleeping" },
    { id: "amenities", label: "Amenities" },
    { id: "know", label: "Things to know" },
    { id: "location", label: "Location" },
    ...(cabinReviews.length ? [{ id: "reviews", label: "Reviews" }] : []),
  ];

  const stats = [
    { icon: Users, value: String(cabin.sleeps), label: "guests" },
    { icon: House, value: family ? `${cabin.bedrooms} bedrooms` : "Studio", label: "layout" },
    { icon: Bath, value: String(cabin.baths), label: cabin.baths === 1 ? "bathroom" : "bathrooms" },
    { icon: PawPrint, value: cabin.pets ? "Dogs OK" : "No pets", label: "pets" },
  ];

  return (
    <StayProvider
      slug={cabin.slug}
      name={cabin.name}
      sleeps={cabin.sleeps}
      petsAllowed={cabin.pets}
      initialCheckin={search?.checkin}
      initialCheckout={search?.checkout}
      initialGuests={search?.guests}
    >
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-28 sm:px-10 lg:px-14 lg:pb-20">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-ink-400">
          <Link href="/cabins" className="hover:text-heather-700">
            Cabins
          </Link>
          <ChevronRight className="size-3.5" aria-hidden />
          <span className="text-heather-700">{cabin.name}</span>
        </nav>

        {/* Header: name, rose-italic tagline, then a meta row */}
        <header className="mt-6 mb-8">
          <h1 className="font-display text-5xl leading-[1] font-medium text-heather-900 sm:text-7xl">{cabin.name}</h1>
          <p className="mt-3 max-w-2xl font-display text-2xl leading-snug text-balance text-blossom-500 italic sm:text-3xl">{cabin.tagline}</p>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-600">
            <span className="font-semibold text-heather-900">{family ? "Two-bedroom family cabin" : "Studio cabin for two"}</span>
            {average !== null && (
              <a href="#reviews" className="flex items-center gap-1 font-semibold text-heather-900 hover:underline">
                <Star className="size-4 fill-honey-500 text-honey-500" aria-hidden />
                {average.toFixed(1)} <span className="font-normal text-ink-600 underline underline-offset-2">· {total} reviews</span>
              </a>
            )}
            <a href="#location" className="flex items-center gap-1.5 hover:text-heather-900">
              <MapPin className="size-4 text-blossom-500" aria-hidden />
              {site.place} · {site.address.city}, {site.address.region}
            </a>
            {cabin.pets && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-200/70 px-2.5 py-1 text-xs font-semibold text-sage-700">
                <PawPrint className="size-3.5" aria-hidden /> Dog-friendly
              </span>
            )}
          </p>
        </header>

        <Gallery photos={photos(cabin)} alts={cabin.photoAlts} name={cabin.name} />

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-16">
          <div className="min-w-0">
            <SectionNav items={sections} />

            {/* Overview */}
            <Section id="overview" eyebrow="Overview" title="About this cabin">
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-vellum bg-vellum md:grid-cols-4">
                {stats.map(({ icon: Icon, value, label }) => (
                  <li key={label} className="flex min-w-0 items-center gap-3 bg-paper p-4 sm:p-5">
                    <Icon className="size-5 shrink-0 text-blossom-500" aria-hidden />
                    <p className="min-w-0">
                      <span className="block font-display text-xl leading-none text-heather-900">{value}</span>
                      <span className="label mt-1.5 block !text-[0.6rem] text-ink-400">{label}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
                {cabin.story.map((p, i) => (
                  <p key={i} className={i === 0 ? "font-display text-[1.6rem] leading-snug text-heather-900" : ""}>
                    {p}
                  </p>
                ))}
              </div>

              <h3 className="mt-10 font-display text-2xl text-heather-900">Highlights</h3>
              <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {cabin.highlights.map((h) => {
                  const Icon = amenityIcon(h);
                  return (
                    <li key={h} className="flex items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-heather-900 text-blossom-300">
                        <Icon className="size-[1.1rem]" aria-hidden />
                      </span>
                      <span className="font-medium text-heather-900">{h}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 flex items-center gap-5 rounded-[1.5rem] border border-vellum bg-paper-deep/60 px-5 py-4">
                <Botanical motif={cabin.botanical.motif} className="h-16 w-11 shrink-0 text-blossom-500" />
                <p className="text-sm leading-relaxed text-ink-600">
                  <span className="label block !text-[0.62rem] text-sage-700">About the name</span>
                  <span className="mt-1 block font-display text-lg text-heather-900 italic">{cabin.botanical.latin}</span>
                  {cabin.botanical.note}.
                </p>
              </div>
            </Section>

            {/* Sleeping */}
            <Section id="sleeping" eyebrow="Sleeping" title="Where you'll sleep" intro={family ? `Sleeps ${cabin.sleeps} across two bedrooms. Children are welcome.` : "Built for two."}>
              <div className="grid gap-4 sm:grid-cols-3">
                {sleeping(cabin).map(({ icon: Icon, title, note, photo }) => (
                  <figure key={title} className="relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-heather-900 p-2.5 text-paper">
                    {photo ? (
                      <>
                        <Image src={photo} alt="" fill sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 92vw" className="-z-10 object-cover" />
                        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.6),transparent_50%)]" aria-hidden />
                      </>
                    ) : (
                      <Icon className="absolute top-5 left-5 size-8 text-blossom-300" aria-hidden />
                    )}
                    <figcaption className="rounded-[1.1rem] border border-paper/15 bg-heather-950/55 px-4 py-3 backdrop-blur-md">
                      <span className="block font-display text-xl leading-tight">{title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-paper/75">{note}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Section>

            {/* Amenities */}
            <Section id="amenities" eyebrow="Amenities" title="What this cabin offers">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {amenitiesFor(cabin).map((a) => {
                  const Icon = amenityIcon(a);
                  return (
                    <li key={a} className="flex items-center gap-3 text-ink-600">
                      <Icon className="size-5 shrink-0 text-heather-500" aria-hidden />
                      {a}
                    </li>
                  );
                })}
              </ul>
            </Section>

            {/* Things to know */}
            <Section id="know" eyebrow="Before you go" title="Things to know">
              <div className="grid gap-4 md:grid-cols-3">
                <KnowCard icon={ScrollText} title="House rules" dark>
                  <ul className="space-y-2">
                    <li>Check-in after {site.checkIn}</li>
                    <li>Checkout by {site.checkOut}</li>
                    <li>Primary renter {site.minAge}+</li>
                    <li>{family ? "Children welcome" : "Built for two adults"}</li>
                    <li>{cabin.pets ? `Dogs welcome: $${site.pets.feePerDog} each, up to ${site.pets.maxDogs}` : "No pets"}</li>
                    <li>No smoking</li>
                  </ul>
                </KnowCard>
                <KnowCard icon={Mountain} title="On the mountain">
                  <ul className="space-y-2">
                    <li>
                      <KeyRound className="mr-1.5 inline size-4 text-blossom-500" aria-hidden />
                      Electronic check-in; details are sent before you arrive
                    </li>
                    <li>Steep, winding gravel roads; 4WD or chains may be needed in winter</li>
                    <li>Wooden stairs up to the deck</li>
                  </ul>
                </KnowCard>
                <KnowCard icon={CalendarX2} title="Cancellation">
                  <p>{policies.cancellation}</p>
                  <Link href="/policies" className="mt-4 inline-block font-semibold text-heather-700 underline-offset-4 hover:underline">
                    All policies →
                  </Link>
                </KnowCard>
              </div>
            </Section>

            {/* Location */}
            <Section id="location" eyebrow="Location" title="Where you'll be" intro={`On the ${site.place} preserve, near ${site.address.city}, Tennessee.`}>
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                <div className="overflow-hidden rounded-[1.5rem] border border-vellum bg-paper-deep">
                  <iframe
                    title={`Map: the start of the ${site.place} private drive`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=12&output=embed`}
                    className="h-80 w-full saturate-[0.6]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="rounded-[1.5rem] border border-vellum bg-paper-deep/60 p-6">
                  <p className="flex items-center gap-2 font-semibold text-heather-900">
                    <Navigation className="size-5 text-blossom-500" aria-hidden /> Getting around
                  </p>
                  <ul className="mt-3 divide-y divide-vellum">
                    {nearbyByDistance().map((n) => (
                      <li key={n.place} className="flex items-center justify-between gap-4 py-3">
                        <span className="text-heather-900">{n.place}</span>
                        <span className="shrink-0 rounded-full bg-heather-900 px-3 py-1 text-xs font-semibold text-paper">{n.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                The map shows the start of the private drive. GPS often suggests a route that isn&apos;t passable, so we send full arrival directions after you book.
              </p>
            </Section>

            {/* Reviews: only once there are real ones for this cabin */}
            {average !== null && (
              <Section id="reviews" eyebrow="Reviews" title="Guest reviews">
                <div className="paper relative flex items-center gap-5 overflow-hidden rounded-[1.5rem] bg-heather-900 p-6 text-paper sm:p-8">
                  <span className="font-display text-6xl leading-none">{average.toFixed(1)}</span>
                  <span>
                    <span className="flex text-honey-300" aria-label={`${average.toFixed(1)} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" aria-hidden />
                      ))}
                    </span>
                    <span className="mt-1.5 block text-sm text-paper/70">
                      {total} guest review{total === 1 ? "" : "s"}
                    </span>
                  </span>
                </div>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                  {cabinReviews.slice(0, 4).map((r) => (
                    <li key={r.id}>
                      <ReviewCard review={r} showCabin={false} />
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/reviews?cabin=${cabin.slug}`}
                  className="mt-6 inline-flex rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:bg-heather-900 hover:text-paper"
                >
                  Read all reviews
                </Link>
              </Section>
            )}

            {/* Questions */}
            <div className="paper relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-[1.5rem] bg-heather-900 p-6 text-paper sm:flex-row sm:items-center sm:p-7">
              <div className="pointer-events-none absolute -top-20 -left-16 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.25),transparent)]" aria-hidden />
              <div className="relative">
                <p className="font-display text-2xl">
                  Questions about <em className="text-blossom-300">{cabin.name}?</em>
                </p>
                <p className="text-sm text-paper/70">Ask us about pets, celebrations or anything else.</p>
              </div>
              <a
                href={site.phoneHref}
                className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-heather-900 transition hover:bg-blossom-100"
              >
                <Phone className="size-4" aria-hidden /> Call or text {site.phone}
              </a>
            </div>
          </div>

          {/* Booking widget */}
          <div className="lg:relative">
            <BookingPanel fromPrice={fromPrice} />
          </div>
        </div>
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
    </StayProvider>
  );
}
