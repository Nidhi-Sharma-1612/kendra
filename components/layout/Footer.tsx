import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { reviews } from "@/data/reviews";
import { Botanical } from "@/components/ui/Botanical";
import { Logo } from "./Navbar";

/** Site pages. Policies live on /policies (Good to Know) and are linked, not repeated, here. */
const EXPLORE = [
  { href: "/cabins", label: "The cabins" },
  { href: "/the-property", label: "The Preserve & River Path" },
  { href: "/specials", label: "Specials & add-ons" },
  { href: "/smoky-mountain-guide", label: "Smoky Mountain Guide" },
  // Shown once there are real reviews in data/reviews.ts.
  ...(reviews.length ? [{ href: "/reviews", label: "Guest reviews" }] : []),
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact us" },
];

const link = "text-paper/70 transition hover:text-paper";

/** Column heading in the site's eyebrow style. */
function Heading({ children }: { children: React.ReactNode }) {
  return <p className="label text-blossom-300">{children}</p>;
}

/** Footer: brand, site links and contact, over a faint botanical drawing. */
export function Footer() {
  return (
    <footer className="paper relative overflow-hidden bg-heather-950 text-paper">
      {/* Field-guide touch: a large, faint line drawing behind the columns */}
      <Botanical motif="five" className="pointer-events-none absolute -top-10 right-[-3rem] h-[30rem] w-80 text-paper/[0.04]" strokeWidth={0.6} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-10 lg:px-14">
        <div className="grid gap-10 py-16 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Twelve rustic cabins on a {site.acres}-acre preserve in the Smokies, designed and built for nature and romance.
            </p>
          </div>

          <div>
            <Heading>Explore</Heading>
            <ul className="mt-4 space-y-2 text-sm">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Contact</Heading>
            <ul className="mt-4 space-y-3 text-sm text-paper/70">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-paper">
                  <Phone className="size-4 text-blossom-300" aria-hidden /> {site.phone}
                  <span className="text-paper/45">· call or text</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition hover:text-paper">
                  <Mail className="size-4 shrink-0 text-blossom-300" aria-hidden /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener" className="flex items-start gap-2 transition hover:text-paper">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-blossom-300" aria-hidden />
                  <span>
                    {site.address.street}
                    <span className="block">
                      {site.address.city}, {site.address.region} {site.address.zip}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/10 py-5 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · on {site.place}, {site.address.city}, {site.address.region}
          </p>
          <div className="flex items-center gap-5">
            <p>
              Website by{" "}
              <a href="https://designbydial.com" className="underline-offset-2 hover:text-paper hover:underline">
                Design by Dial
              </a>
            </p>
            <a href="#" className="grid size-9 place-items-center rounded-full border border-paper/20 text-paper/80 transition hover:bg-paper hover:text-heather-900" aria-label="Back to top">
              <ArrowUp className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
