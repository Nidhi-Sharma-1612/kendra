"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { Botanical } from "@/components/ui/Botanical";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${light ? "text-paper" : "text-heather-900"}`} aria-label={`${site.name}, home`}>
      <Botanical motif="five" className="h-9 w-6 text-blossom-500 transition-transform duration-500 group-hover:-rotate-6" strokeWidth={1.6} />
      <span className="leading-none">
        <span className="block font-display text-[1.45rem] font-semibold tracking-tight">{site.name}</span>
        <span className={`label mt-1 block !text-[0.58rem] ${light ? "text-paper/70" : "text-sage-700"}`}>on {site.place}</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  // The menu is open for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (o: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-[background,box-shadow] duration-300 ${scrolled ? "bg-paper/92 shadow-[0_1px_0_rgb(75_58_85/0.12)] backdrop-blur-md" : "bg-paper"}`}>
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = item.href !== "/#explore" && pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`relative text-[0.92rem] font-medium transition-colors hover:text-heather-700 ${active ? "text-heather-700" : "text-ink-600"}`}>
                {item.label}
                {active && <span className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-blossom-500" aria-hidden />}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 text-sm font-medium text-ink-600 hover:text-heather-700 xl:flex">
            <Phone className="size-4" aria-hidden /> {site.phone}
          </a>
          <Link href="/cabins" className="hidden rounded-full bg-heather-700 px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-heather-900 sm:inline-flex xl:ml-4">
            Find your cabin
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} className="grid size-11 place-items-center rounded-full text-heather-900 hover:bg-paper-deep lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-vellum bg-paper lg:hidden">
            <div className="flex flex-col px-4 py-4 sm:px-6">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-vellum/70 py-3.5 font-display text-2xl text-heather-900">
                  {item.label}
                </Link>
              ))}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/cabins" className="rounded-full bg-heather-700 px-5 py-3 text-center font-semibold text-paper">Find your cabin</Link>
                <a href={site.phoneHref} className="flex items-center justify-center gap-2 rounded-full border border-heather-700/25 px-5 py-3 font-semibold text-heather-700">
                  <Phone className="size-4" aria-hidden /> {site.phone}
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
