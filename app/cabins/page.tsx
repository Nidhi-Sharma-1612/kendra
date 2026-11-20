import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cabins, type Cabin } from "@/data/cabins";
import { checkStay, getFromPrices, type StayCheck } from "@/lib/webrez";
import { parseSearch, searchQuery } from "@/lib/search";
import { HeroSearch } from "@/components/booking/HeroSearch";
import { CabinsGrid, type GridItem } from "@/components/cabins/CabinsGrid";
import type { TileResult } from "@/components/ui/CabinTile";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Cabins",
  description: "Eleven romantic studio cabins for two and one two-bedroom log cabin, each with a private hot tub, jacuzzi and wood-burning fireplace.",
};

function toResult(cabin: Cabin, check: StayCheck, guests: number): TileResult {
  if (cabin.sleeps < guests) return { ok: false, label: "Not available", detail: `Sleeps ${cabin.sleeps}` };
  if (check.status === "unavailable") return { ok: false, label: "Not available", detail: check.reason };
  if (check.status === "unknown") return { ok: true, label: "Check dates", detail: "Live rates unavailable" };
  return {
    ok: true,
    label: check.total != null ? `$${check.total.toLocaleString("en-US")}` : "Available",
    detail: `${check.nights} night${check.nights > 1 ? "s" : ""}, before taxes`,
  };
}

/** Eyebrow + heading pattern shared by the homepage sections. */
function SectionTitle({ eyebrow, title, accent }: { eyebrow: string; title: string; accent: string }) {
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

export default async function CabinsPage({ searchParams }: PageProps<"/cabins">) {
  const search = parseSearch(await searchParams);
  const prices = await getFromPrices(cabins.map((c) => c.webrezId));

  // With dates: check every cabin, available ones first, then the rest.
  const items: GridItem[] = search
    ? (
        await Promise.all(
          cabins.map(async (c) => {
            const result = toResult(c, await checkStay(c.webrezId, search.checkin, search.checkout), search.guests);
            return { cabin: c, fromPrice: prices[c.webrezId], result, query: result.ok ? searchQuery(search) : "" };
          }),
        )
      ).sort((a, b) => Number(b.result!.ok) - Number(a.result!.ok))
    : cabins.map((c) => ({ cabin: c, fromPrice: prices[c.webrezId] }));
  const availableCount = items.filter((i) => i.result?.ok).length;
  const range = search ? `${format(parseISO(search.checkin), "EEE, MMM d")} → ${format(parseISO(search.checkout), "EEE, MMM d")}` : "";

  return (
    <>
      {/* Page hero: full-bleed photo like the homepage, shorter, with the highlighted search.
          z-10 so the search popovers sit above the results. */}
      <section className="relative z-10">
        <div className="relative isolate">
          <div className="absolute inset-0 -z-10 overflow-hidden bg-heather-950">
            <Image src="/images/property/14.jpg" alt="Aerial view of the forest on the mountain in fall color" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-heather-950/40" aria-hidden />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_32_48/0.7),transparent_70%)]" aria-hidden />
          </div>
          <div className="mx-auto max-w-7xl px-4 pt-20 pb-14 text-paper sm:px-10 sm:pt-28 sm:pb-16 lg:px-14">
            <p className="label flex items-center gap-3 text-blossom-300">
              <span className="h-px w-8 bg-blossom-300/60" aria-hidden /> The cabins · {cabins.length} hideaways
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] font-medium sm:text-7xl">
              Find your <em className="text-blossom-300">wildflower.</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80">
              Every cabin has its own hot tub, a heart-shaped jacuzzi and a wood-burning fireplace. Pick your dates to see live prices.
            </p>
            <div className="mt-10 max-w-[56rem] rounded-[2rem] shadow-[0_0_0_8px_rgb(247_242_234/0.18),0_30px_70px_-20px_rgb(0_0_0/0.6)] sm:rounded-full">
              <HeroSearch initial={search} featured />
            </div>
          </div>
        </div>
      </section>

      {/* Cabins */}
      <section id="results" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-10 lg:px-14 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          {search ? (
            <div>
              <SectionTitle
                eyebrow={`${range} · ${search.guests} guest${search.guests > 1 ? "s" : ""}`}
                title={availableCount === 0 ? "No cabins free" : `${availableCount} cabin${availableCount > 1 ? "s" : ""} available,`}
                accent={availableCount === 0 ? "for those dates." : "ready for your stay."}
              />
              {availableCount === 0 && <p className="mt-3 text-ink-600">Try shifting your dates by a day or two, or give us a call and we&apos;ll help.</p>}
            </div>
          ) : (
            <SectionTitle eyebrow="All cabins" title="Twelve hideaways," accent="each its own wildflower." />
          )}
          {search && (
            <Link href="/cabins" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-heather-700/20 px-4 py-2 text-sm font-semibold text-heather-700 transition hover:border-heather-700/50">
              <X className="size-4" aria-hidden /> Clear dates
            </Link>
          )}
        </div>
        <CabinsGrid items={items} />
      </section>
    </>
  );
}
