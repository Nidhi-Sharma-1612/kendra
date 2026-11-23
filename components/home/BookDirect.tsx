import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Closing "Book direct" panel: echoes the hero (photo, heather fade, paper heading with a rose
 * italic accent), with the reasons to book direct and a link to all cabins.
 */
export function BookDirect() {
  const perks = [
    "No booking-site fees",
    "Live rates & availability",
    <>
      Real people: call or text{" "}
      <a href={site.phoneHref} className="underline decoration-paper/40 underline-offset-2 hover:decoration-paper">
        {site.phone}
      </a>
    </>,
  ];

  return (
    // Full-bleed: the photo spans the viewport width; the content stays on the site's container and left edge.
    <section>
      <Reveal>
        <div className="group relative isolate">
          <div className="absolute inset-0 -z-10 overflow-hidden bg-heather-950">
            <Image
              src="/images/golden-glow/02.jpg"
              alt="Firelight in a stacked-stone fireplace, with the hot tub glowing beyond the glass doors"
              fill
              sizes="100vw"
              className="object-cover object-[70%_50%] transition duration-[1.8s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-heather-950/45" aria-hidden />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(42_32_48/0.75),transparent_70%)]" aria-hidden />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-20 text-paper sm:px-10 lg:px-14 lg:py-24">
            <p className="label flex items-center gap-3 text-blossom-300">
              <span className="h-px w-8 bg-blossom-300/60" aria-hidden /> Book direct
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[1.02] font-medium text-balance sm:text-6xl">
              Your cabin is waiting
              <em className="block text-blossom-300">on the mountain.</em>
            </h2>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/85">
              {perks.map((p, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="grid size-5 place-items-center rounded-full bg-blossom-300/20 text-blossom-300">
                    <Check className="size-3" aria-hidden />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <Link
              href="/cabins"
              className="group/btn mt-10 inline-flex items-center gap-3 rounded-full bg-paper py-2 pr-2 pl-7 font-semibold text-heather-900 transition hover:bg-blossom-100"
            >
              Find your cabin
              <span className="grid size-10 place-items-center rounded-full bg-heather-900 text-paper transition-transform group-hover/btn:translate-x-0.5">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
