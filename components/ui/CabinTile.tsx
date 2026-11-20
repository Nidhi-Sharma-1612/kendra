import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, PawPrint, Users } from "lucide-react";
import { cover, type Cabin } from "@/data/cabins";

/** Availability for a searched stay, shown in place of the "from" price. */
export type TileResult = { ok: boolean; label: string; detail?: string };

/**
 * Cabin tile used across the site: rounded photo with a heather fade, special tags, and the name and
 * essentials on a frosted panel so they stay legible over any photo. With a search `result`, the
 * panel shows the stay total (or why it's unavailable) and unavailable tiles are dimmed.
 */
export function CabinTile({
  cabin,
  fromPrice,
  result,
  query = "",
  priority = false,
}: {
  cabin: Cabin;
  fromPrice?: number;
  result?: TileResult;
  query?: string;
  priority?: boolean;
}) {
  const dim = result && !result.ok;
  return (
    <Link
      href={`/cabins/${cabin.slug}${query}`}
      className={`group relative isolate block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-heather-950 transition ${
        dim ? "opacity-60 grayscale-[40%] hover:opacity-100 hover:grayscale-0" : ""
      }`}
    >
      <Image
        src={cover(cabin)}
        alt={`${cabin.name} cabin`}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="-z-10 object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(42_32_48/0.75)_0%,rgb(42_32_48/0.2)_40%,transparent_60%)]" aria-hidden />

      {/* Top row: special tags, and a "view" arrow on hover */}
      <div className="flex items-start justify-between p-4">
        <div className="flex flex-wrap gap-1.5">
          {cabin.pets && (
            <span className="inline-flex items-center gap-1 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-sage-700 shadow-sm">
              <PawPrint className="size-3.5" aria-hidden /> Pet-friendly
            </span>
          )}
          {cabin.kind === "two-bedroom" && (
            <span className="rounded-full bg-honey-300 px-3 py-1 text-xs font-semibold text-heather-950 shadow-sm">2 bedrooms</span>
          )}
        </div>
        <span className="grid size-10 translate-y-1 place-items-center rounded-full bg-paper text-heather-900 opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>

      {/* Frosted info panel */}
      <div className="absolute inset-x-3 bottom-3 rounded-[1.25rem] border border-paper/15 bg-heather-950/55 px-5 py-4 text-paper backdrop-blur-md [text-shadow:0_1px_2px_rgb(0_0_0/0.25)]">
        <p className="font-display text-sm text-paper/85 italic">{cabin.botanical.latin}</p>
        <h3 className="font-display text-[1.8rem] leading-tight font-medium">{cabin.name}</h3>
        <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-paper/20 pt-2.5 text-sm">
          <span className="flex items-center gap-3.5 text-paper/90">
            <span className="flex items-center gap-1.5"><Users className="size-4" aria-hidden />{cabin.sleeps}</span>
            <span className="flex items-center gap-1.5"><BedDouble className="size-4" aria-hidden />{cabin.bed}</span>
          </span>
          {result ? (
            <span className="shrink-0 text-right leading-tight">
              <span className={`block font-semibold ${result.ok ? "text-paper" : "text-blossom-300"}`}>{result.label}</span>
              {result.detail && <span className="block text-xs text-paper/70">{result.detail}</span>}
            </span>
          ) : fromPrice ? (
            <span className="shrink-0 text-paper/90">
              from <span className="font-semibold text-paper">${fromPrice}</span>
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
