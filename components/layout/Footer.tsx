import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "./Navbar";

const EXPLORE = [
  { href: "/cabins", label: "The cabins" },
  { href: "/the-property", label: "The mountain & river trail" },
  { href: "/#explore", label: "Explore the Smokies" },
  { href: "/policies", label: "Good to know" },
  { href: "/contact", label: "Contact us" },
];

const STAY = [
  `Check-in after ${site.checkIn}`,
  `Checkout by ${site.checkOut}`,
  `Adults only (${site.minAge}+)`,
  "Pet-friendly: Pine Needle & Teaberry",
];

/** Column heading in the site's eyebrow style. */
function Heading({ children }: { children: React.ReactNode }) {
  return <p className="label text-blossom-300">{children}</p>;
}

/** Four-column footer (brand, explore, your stay, contact) with a thin bottom bar. Compact by design. */
export function Footer() {
  return (
    <footer className="paper relative bg-heather-950 text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-10 lg:px-14">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              Twelve rustic, romantic cabins on {site.acres} wooded acres near Gatlinburg, with a private trail down to the river.
            </p>
          </div>

          <div>
            <Heading>Explore</Heading>
            <ul className="mt-4 space-y-2 text-sm">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-paper/70 transition hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Your stay</Heading>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              {STAY.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div>
            <Heading>Contact</Heading>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 transition hover:text-paper">
                  <Phone className="size-4 text-blossom-300" aria-hidden /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition hover:text-paper">
                  <Mail className="size-4 text-blossom-300" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blossom-300" aria-hidden />
                <span>
                  Near {site.address.city}, {site.address.region}
                  <span className="block text-paper/45">Directions sent after booking</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-paper/10 py-5 text-xs text-paper/45">
          <p>
            © {new Date().getFullYear()} {site.name} · Website by{" "}
            <a href="https://designbydial.com" className="underline-offset-2 hover:text-paper hover:underline">
              Design by Dial
            </a>
          </p>
          <a href="#" className="grid size-9 place-items-center rounded-full border border-paper/20 text-paper/80 transition hover:bg-paper hover:text-heather-900" aria-label="Back to top">
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
