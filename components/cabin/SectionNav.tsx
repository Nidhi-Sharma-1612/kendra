"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

/** Sticky in-page tabs above the cabin content; the section in view is underlined in rose. */
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-150px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Cabin sections" className="sticky top-[4.5rem] z-30 -mx-4 border-b border-vellum bg-paper/95 px-4 backdrop-blur-md sm:mx-0 sm:px-0">
      <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none]">
        {items.map((item) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={`relative block px-3 py-4 text-sm font-semibold transition first:pl-0 ${active === item.id ? "text-heather-900" : "text-ink-600 hover:text-heather-900"}`}
            >
              {item.label}
              <span className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-blossom-500 transition-opacity ${active === item.id ? "opacity-100" : "opacity-0"}`} />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
