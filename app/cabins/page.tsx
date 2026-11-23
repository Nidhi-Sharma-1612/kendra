import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CookingPot,
  Flame,
  Heart,
  Phone,
  Users,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { site } from "@/data/site";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { cabins } from "@/data/cabins";
import { checkStay, getFromPrices, type StayCheck } from "@/lib/webrez";
import { parseSearch, searchQuery, type StaySearch } from "@/lib/search";
import { HeroSearch } from "@/components/booking/HeroSearch";
import { CabinsGrid, type GridItem } from "@/components/cabins/CabinsGrid";
import type { TileResult } from "@/components/ui/CabinTile";

export const revalidate = 3600;

/** Features every cabin shares (confirmed by the owner: same floor plan and amenities). */
const INCLUDED = [
  { icon: Waves, label: "Private hot tub" },
  { icon: Heart, label: "Heart-shaped jacuzzi" },
  { icon: Flame, label: "Wood-burning fireplace" },
  { icon: BedDouble, label: "King bed" },
  { icon: CookingPot, label: "Full kitchen" },
  { icon: Wifi, label: "Wi-Fi" },
];

export const metadata: Metadata = {
  title: "The Cabins",
  description:
    "Eleven romantic studio cabins for two and one two-bedroom log cabin, each with a private hot tub, jacuzzi and wood-burning fireplace.",
};

function toResult(check: StayCheck): TileResult {
  if (check.status === "unavailable")
    return { ok: false, label: "Not available", detail: check.reason };
  if (check.status === "unknown")
    return { ok: true, label: "Check dates", detail: "Live rates unavailable" };
  return {
    ok: true,
    label:
      check.total != null
        ? `$${check.total.toLocaleString("en-US")}`
        : "Available",
    detail: `${check.nights} night${check.nights > 1 ? "s" : ""}, before taxes`,
  };
}

/** Cabins that sleep the party and can be booked for the whole stay, cheapest total first. */
async function freeCabins(search: StaySearch) {
  const fits = cabins.filter((c) => c.sleeps >= search.guests);
  const checked = await Promise.all(
    fits.map(async (cabin) => ({
      cabin,
      check: await checkStay(cabin.webrezId, search.checkin, search.checkout),
    })),
  );
  const total = (c: StayCheck) =>
    c.status === "available" && c.total != null ? c.total : Infinity;
  return checked
    .filter(({ check }) => check.status !== "unavailable")
    .sort((a, b) => total(a.check) - total(b.check));
}

/** Same-length stays starting up to 3 days earlier or later that have cabins free (best 4). */
async function nearbyDates(search: StaySearch) {
  const length = differenceInCalendarDays(
    parseISO(search.checkout),
    parseISO(search.checkin),
  );
  const today = format(new Date(), "yyyy-MM-dd");
  const options = await Promise.all(
    [-3, -2, -1, 1, 2, 3].map(async (shift) => {
      const checkin = format(
        addDays(parseISO(search.checkin), shift),
        "yyyy-MM-dd",
      );
      if (checkin < today) return null;
      const s: StaySearch = {
        checkin,
        checkout: format(addDays(parseISO(checkin), length), "yyyy-MM-dd"),
        guests: search.guests,
      };
      const free = (await freeCabins(s)).filter(
        ({ check }) => check.status === "available",
      );
      return free.length ? { search: s, count: free.length } : null;
    }),
  );
  return options
    .filter((o): o is { search: StaySearch; count: number } => Boolean(o))
    .slice(0, 4);
}

/** Eyebrow + heading pattern shared by the homepage sections. */
function SectionTitle({
  eyebrow,
  title,
  accent,
}: {
  eyebrow: string;
  title: string;
  accent: string;
}) {
  return (
    <div>
      <p className="label flex items-center gap-3 text-sage-700">
        <span className="h-px w-8 bg-sage-500/60" aria-hidden /> {eyebrow}
      </p>
      <h2 className="mt-5 font-display text-4xl leading-[1.02] font-medium text-heather-900 sm:text-5xl">
        {title}
        <em className="block text-blossom-500">{accent}</em>
      </h2>
    </div>
  );
}

export default async function CabinsPage({
  searchParams,
}: PageProps<"/cabins">) {
  const search = parseSearch(await searchParams);
  const prices = await getFromPrices(cabins.map((c) => c.webrezId));

  // With dates: only the cabins that fit the party and are free every night, cheapest first.
  let items: GridItem[] = cabins.map((c) => ({
    cabin: c,
    fromPrice: prices[c.webrezId],
  }));
  let nearby: { search: StaySearch; count: number }[] = [];
  if (search) {
    const results = await freeCabins(search);
    items = results.map(({ cabin, check }) => ({
      cabin,
      fromPrice: prices[cabin.webrezId],
      result: toResult(check),
      query: searchQuery(search),
    }));
    // Nothing free: suggest the same stay length a few days either side.
    if (!items.length) nearby = await nearbyDates(search);
  }
  const nights = search
    ? differenceInCalendarDays(
        parseISO(search.checkout),
        parseISO(search.checkin),
      )
    : 0;
  const range = search
    ? `${format(parseISO(search.checkin), "EEE, MMM d")} → ${format(parseISO(search.checkout), "EEE, MMM d")}`
    : "";

  return (
    <>
      {/* Page hero: full-bleed photo like the homepage, shorter, with the highlighted search.
          z-10 so the search popovers sit above the results. */}
      <section className="relative z-10">
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 overflow-hidden bg-heather-950">
            <Image
              src="/images/property/14.jpg"
              alt="Aerial view of the forest on the mountain in fall color"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-heather-950/40" aria-hidden />
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_32_48/0.7),transparent_70%)]"
              aria-hidden
            />
          </div>
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 text-paper sm:px-10 sm:pt-28 sm:pb-16 lg:px-14">
            <p className="label flex items-center gap-3 text-blossom-300">
              <span className="h-px w-8 bg-blossom-300/60" aria-hidden /> The
              cabins · {cabins.length} hideaways
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium sm:text-7xl">
              Find your <em className="text-blossom-300">wildflower.</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
              Eleven studios for two and one family cabin, spread across{" "}
              {site.acres} wooded acres. Pick your dates to see live prices.
            </p>
            <div
              id="search"
              className="mt-10 max-w-[56rem] scroll-mt-28 rounded-[2rem] shadow-[0_0_0_8px_rgb(247_242_234/0.18),0_30px_70px_-20px_rgb(0_0_0/0.6)] sm:rounded-full"
            >
              <HeroSearch initial={search} featured />
            </div>
          </div>
        </div>
      </section>

      {/* Shared by every studio, said once so the tiles don't have to repeat it */}
      <section className="border-b border-vellum bg-paper-deep/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-7 sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-14">
          <p className="label shrink-0 text-sage-700">Every cabin includes</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-heather-900">
            {INCLUDED.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-blossom-500" aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Cabins: everything, or with dates only the cabins free for that stay */}
      <section
        id="results"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-10 lg:px-14 lg:py-24"
      >
        {search && items.length === 0 ? (
          // No cabins free: suggest nearby dates instead of a dead end.
          <div className="mx-auto max-w-3xl text-center">
            <p className="label text-sage-700">
              {range} · {search.guests} guest{search.guests > 1 ? "s" : ""}
            </p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium text-heather-900 sm:text-5xl">
              No cabins are free
              <em className="block text-blossom-500">for those dates.</em>
            </h2>
            {search.guests > 2 && (
              <p className="mt-4 text-ink-600">
                For 3 or more guests, Mountain Laurel is the cabin that fits.
                Our studios sleep two.
              </p>
            )}
            {nearby.length > 0 ? (
              <>
                <p className="mt-8 text-ink-600">
                  These {nights}-night stays nearby have cabins free:
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {nearby.map((n) => (
                    <li key={n.search.checkin}>
                      <Link
                        href={`/cabins${searchQuery(n.search)}#results`}
                        className="group flex items-center justify-between gap-4 rounded-[1.25rem] border border-vellum bg-paper-deep/60 px-5 py-4 text-left transition hover:border-heather-700/40"
                      >
                        <span>
                          <span className="block font-display text-xl text-heather-900">
                            {format(parseISO(n.search.checkin), "EEE, MMM d")} →{" "}
                            {format(parseISO(n.search.checkout), "EEE, MMM d")}
                          </span>
                          <span className="text-sm text-sage-700">
                            {n.count} cabin{n.count > 1 ? "s" : ""} free
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 shrink-0 text-heather-700 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-6 text-ink-600">
                Try other dates, or call or text and we&apos;ll help you find a
                stay.
              </p>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#search"
                className="inline-flex items-center gap-2 rounded-full bg-heather-900 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-heather-700"
              >
                <CalendarDays className="size-4" aria-hidden /> Change dates
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 text-sm font-semibold text-heather-900 transition hover:border-heather-700/50"
              >
                <Phone className="size-4" aria-hidden /> Call or text{" "}
                {site.phone}
              </a>
            </div>
          </div>
        ) : (
          <CabinsGrid
            items={items}
            header={
              search ? (
                <div>
                  <SectionTitle
                    eyebrow="Your stay"
                    title={`${items.length} cabin${items.length > 1 ? "s" : ""} free,`}
                    accent={range + "."}
                  />
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-paper-deep px-4 py-2 text-sm font-medium text-heather-900">
                      <CalendarDays
                        className="size-4 text-blossom-500"
                        aria-hidden
                      />{" "}
                      {nights} night{nights > 1 ? "s" : ""}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-paper-deep px-4 py-2 text-sm font-medium text-heather-900">
                      <Users className="size-4 text-blossom-500" aria-hidden />{" "}
                      {search.guests} guest{search.guests > 1 ? "s" : ""}
                    </span>
                    <a
                      href="#search"
                      className="inline-flex items-center gap-1.5 rounded-full border border-heather-700/20 px-4 py-2 text-sm font-semibold text-heather-700 transition hover:border-heather-700/50"
                    >
                      Change dates
                    </a>
                    <Link
                      href="/cabins"
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-600 transition hover:text-heather-900"
                    >
                      <X className="size-4" aria-hidden /> Clear search
                    </Link>
                  </div>
                  <p className="mt-4 text-sm text-ink-600">
                    {search.guests > 2
                      ? "Only Mountain Laurel sleeps more than two. "
                      : ""}
                    Totals are nightly rates before taxes; pick a cabin to book.
                  </p>
                </div>
              ) : (
                <SectionTitle
                  eyebrow="All cabins"
                  title="Twelve hideaways,"
                  accent="each its own wildflower."
                />
              )
            }
          />
        )}
      </section>

      {/* Help choosing */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-10 lg:px-14">
        <div className="paper relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] bg-heather-900 p-7 text-paper sm:p-10 md:flex-row md:items-center md:justify-between">
          <div
            className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(201_138_134/0.25),transparent)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
              Can&apos;t decide?{" "}
              <em className="text-blossom-300">We&apos;ll help you choose.</em>
            </h2>
            <p className="mt-2 max-w-xl text-paper/75">
              The studios share the same cozy layout, so it comes down to the
              setting. Tell us what you&apos;re after and we&apos;ll suggest a
              cabin.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-wrap gap-3">
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-heather-900 transition hover:bg-blossom-100"
            >
              <Phone className="size-4" aria-hidden /> Call or text {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
