"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid2x2, X } from "lucide-react";

/** Arched lead photo + mosaic, opening a full-screen lightbox. */
export function Gallery({ photos, alts, name }: { photos: string[]; alts: string[]; name: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i == null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const alt = (i: number) => alts[i] ?? `${name} photo ${i + 1}`;

  return (
    <>
      {/* Bento: one large photo + four smaller, rounded like the rest of the site */}
      <div className="relative">
        <div className="grid gap-3 md:h-[min(72vh,600px)] md:grid-cols-4 md:grid-rows-2 md:gap-4">
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-heather-950 md:col-span-2 md:row-span-2 md:aspect-auto"
          >
            <Image src={photos[0]} alt={alt(0)} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]" />
          </button>
          {photos.slice(1, 5).map((src, i) => (
            <button key={src} type="button" onClick={() => setIndex(i + 1)} className="group relative hidden overflow-hidden rounded-[1.75rem] bg-heather-950 md:block">
              <Image src={src} alt={alt(i + 1)} fill sizes="25vw" className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.06]" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex(0)}
          className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-paper/95 px-4 py-2.5 text-sm font-semibold text-heather-900 shadow-lift backdrop-blur transition hover:bg-paper"
        >
          <Grid2x2 className="size-4" aria-hidden /> View all {photos.length} photos
        </button>
      </div>

      <AnimatePresence>
        {index != null && (
          <motion.div role="dialog" aria-modal="true" aria-label={`${name} photos`} className="fixed inset-0 z-[100] flex flex-col bg-heather-950/97" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="flex items-center justify-between px-4 py-4 text-paper/80 sm:px-6">
              <p className="text-sm">{index + 1} / {photos.length} · {alt(index)}</p>
              <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full hover:bg-paper/10" aria-label="Close photos"><X className="size-6" /></button>
            </div>
            <div className="relative flex-1">
              <Image key={photos[index]} src={photos[index]} alt={alt(index)} fill sizes="100vw" className="object-contain" />
              <button type="button" onClick={() => step(-1)} className="absolute top-1/2 left-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 sm:left-6" aria-label="Previous photo"><ChevronLeft className="size-6" /></button>
              <button type="button" onClick={() => step(1)} className="absolute top-1/2 right-2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-paper/10 text-paper hover:bg-paper/20 sm:right-6" aria-label="Next photo"><ChevronRight className="size-6" /></button>
            </div>
            <div className="flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center">
              {photos.map((src, i) => (
                <button key={src} type="button" onClick={() => setIndex(i)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md transition ${i === index ? "ring-2 ring-blossom-300" : "opacity-50 hover:opacity-90"}`} aria-label={`Photo ${i + 1}`}>
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
