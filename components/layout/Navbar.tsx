"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { Botanical } from "@/components/ui/Botanical";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${light ? "text-paper" : "text-heather-900"}`} aria-label={`${site.name}, home`}>
      <Botanical motif="five" className="h-9 w-6 text-blossom-500 transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.6} />
      <span className="leading-none">
        <span className="block font-display text-[1.2rem] font-semibold tracking-tight whitespace-nowrap min-[420px]:text-[1.45rem]">{site.name}</span>
        <span className={`label mt-1 block !text-[0.58rem] ${light ? "text-paper/70" : "text-sage-700"}`}>on {site.place}</span>
      </span>
    </Link>
  );
}

/** "Find your cabin" in the site's pill-with-arrow style. */
function FindCabin({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/cabins"
      className={`group items-center gap-2.5 rounded-full bg-heather-900 py-1.5 pl-5 ${compact ? "pr-5 xl:pr-1.5" : "pr-1.5"} text-sm font-semibold whitespace-nowrap text-paper transition hover:bg-heather-700 ${className}`}
    >
      Find your cabin
      <span className={`size-8 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5 ${compact ? "hidden xl:grid" : "grid"}`}>
        <ArrowRight className="size-3.5" aria-hidden />
      </span>
    </Link>
  );
}

/**
 * Sticky header on the same container as the page sections, so the logo lines up with the content.
 * Desktop: centred links with a rose underline that draws in on hover and stays under the current
 * page. Phones: a full-height menu with large serif links, numbered like the field guide.
 */
export function Navbar() {
  const pathname = usePathname();
  // The menu is open for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggle = () => setOpenOn(open ? null : pathname);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // No page scroll behind the open phone menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background,box-shadow] duration-300 ${
        open ? "bg-paper shadow-[0_1px_0_rgb(75_58_85/0.12)]" : scrolled ? "bg-paper/95 shadow-[0_1px_0_rgb(75_58_85/0.12)] backdrop-blur-md" : "bg-paper"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-10 lg:px-14 xl:gap-6">
        <Logo />

        <nav className="hidden flex-1 justify-center lg:flex" aria-label="Main">
          <ul className="flex items-center xl:gap-3">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block px-2 py-2 text-[0.9rem] xl:px-2.5 xl:text-[0.92rem] font-medium whitespace-nowrap transition-colors ${
                      active ? "text-heather-900" : "text-ink-600 hover:text-heather-900"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-2 bottom-0.5 xl:inset-x-2.5 h-px origin-left bg-blossom-500 transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <FindCabin compact className="hidden h-11 sm:inline-flex" />
          <button
            type="button"
            onClick={toggle}
            className="grid size-11 place-items-center rounded-full text-heather-900 transition hover:bg-paper-deep lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-vellum bg-paper lg:hidden"
          >
            <Botanical motif="five" className="pointer-events-none absolute right-[-2rem] bottom-8 h-72 w-48 text-blossom-500/10" strokeWidth={0.8} />
            <div className="relative flex min-h-full flex-col px-4 pt-6 pb-10 sm:px-10">
              <ul>
                {nav.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.li key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-4 border-b border-vellum py-4"
                      >
                        <span className="w-6 font-display text-sm text-ink-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className={`font-display text-3xl ${active ? "text-blossom-500 italic" : "text-heather-900"}`}>{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <FindCabin className="mt-8 flex justify-between self-stretch py-2 pl-6 text-base" />
              <p className="label mt-auto pt-10 text-sage-700">
                {site.place} · near Gatlinburg, Tennessee
              </p>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
