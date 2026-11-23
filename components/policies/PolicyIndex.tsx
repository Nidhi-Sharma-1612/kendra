"use client";

import { useEffect, useState } from "react";
import { GROUP_ICONS } from "@/lib/policy-icons";

/** Sticky index beside the policy groups; the group in view is highlighted. */
export function PolicyIndex({ groups }: { groups: { id: string; title: string }[] }) {
  const [active, setActive] = useState(groups[0]?.id);

  // The active group is the last one whose top has scrolled past the header (plus a little room).
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(g.id)).filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= 160) current = el.id;
      // At the very bottom of the page, the last group is the one being read.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els.at(-1)?.id ?? current;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [groups]);

  return (
    <nav aria-label="Policy sections" className="hidden lg:block">
      <div className="sticky top-28">
        <p className="label text-ink-400">On this page</p>
        <ul className="mt-4 space-y-1">
          {groups.map((g) => {
            const Icon = GROUP_ICONS[g.id];
            const on = active === g.id;
            return (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`flex items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 text-sm transition ${
                    on ? "bg-paper-deep font-semibold text-heather-900" : "text-ink-600 hover:text-heather-900"
                  }`}
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-full transition ${on ? "bg-heather-900 text-paper" : "bg-paper-deep text-blossom-500"}`}>
                    {Icon && <Icon className="size-4" aria-hidden />}
                  </span>
                  {g.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
