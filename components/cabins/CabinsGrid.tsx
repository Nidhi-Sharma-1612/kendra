"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Cabin } from "@/data/cabins";
import { CabinTile, type TileResult } from "@/components/ui/CabinTile";

export type GridItem = { cabin: Cabin; fromPrice?: number; result?: TileResult; query?: string };

const FILTERS = [
  { id: "all", label: "All cabins", test: () => true },
  { id: "studio", label: "Studios for two", test: (c: Cabin) => c.kind === "studio" },
  { id: "pets", label: "Pet-friendly", test: (c: Cabin) => c.pets },
  { id: "two-bedroom", label: "Two bedrooms", test: (c: Cabin) => c.kind === "two-bedroom" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

/** Filter pills + cabin tiles. Tiles fade out/in and slide into place when the filter changes. */
export function CabinsGrid({ items }: { items: GridItem[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const active = FILTERS.find((f) => f.id === filter)!;
  const shown = items.filter((i) => active.test(i.cabin));

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter cabins">
        {FILTERS.map((f) => {
          const count = items.filter((i) => f.test(i.cabin)).length;
          const on = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={on}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                on ? "bg-heather-900 text-paper" : "border border-heather-700/20 bg-paper text-heather-900 hover:border-heather-700/50"
              }`}
            >
              {f.label}
              <span className={`rounded-full px-1.5 text-xs ${on ? "bg-paper/15 text-paper" : "bg-paper-deep text-ink-600"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((item, i) => (
            <motion.div
              key={item.cabin.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <CabinTile cabin={item.cabin} fromPrice={item.fromPrice} result={item.result} query={item.query} priority={i < 3} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
