"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { addDays, differenceInCalendarDays, format, parseISO, startOfMonth } from "date-fns";
import type { Night } from "@/lib/webrez";

/**
 * Shared booking state for one cabin page: the live nights from /api/rates (loaded a two-month
 * window at a time), the guest's chosen dates and party. The booking panel (desktop card, mobile bar
 * and sheet) reads from here.
 */

type Stay = {
  slug: string;
  name: string;
  sleeps: number;
  petsAllowed: boolean;
  guests: number;
  dogs: number;
  setGuests: (n: number) => void;
  setDogs: (n: number) => void;
  nights: Map<string, Night>;
  /** True once at least one window loaded; false if the feed is down (prices are then hidden). */
  live: boolean;
  loading: boolean;
  checkin?: string;
  checkout?: string;
  setRange: (checkin?: string, checkout?: string) => void;
  ensureMonth: (month: Date) => void;
  total: number | null;
  nightCount: number;
};

const Ctx = createContext<Stay | null>(null);

export const iso = (d: Date) => format(d, "yyyy-MM-dd");

type ProviderProps = {
  slug: string;
  name: string;
  sleeps: number;
  petsAllowed: boolean;
  initialCheckin?: string;
  initialCheckout?: string;
  initialGuests?: number;
  children: React.ReactNode;
};

export function StayProvider({ slug, name, sleeps, petsAllowed, initialCheckin, initialCheckout, initialGuests, children }: ProviderProps) {
  const [guests, setGuests] = useState(Math.min(Math.max(initialGuests ?? 2, 1), sleeps));
  const [dogs, setDogs] = useState(0);
  const [nights, setNights] = useState<Map<string, Night>>(new Map());
  const [live, setLive] = useState(false);
  const [pending, setPending] = useState(0);
  const [checkin, setCheckin] = useState<string | undefined>(initialCheckin);
  const [checkout, setCheckout] = useState<string | undefined>(initialCheckout);
  const requested = useRef(new Set<string>());

  const ensureMonth = useCallback(
    (month: Date) => {
      // Each request covers ~2 months, so fetch this month and the one after it if not loaded.
      const start = iso(startOfMonth(month));
      if (requested.current.has(start)) return;
      requested.current.add(start);
      requested.current.add(iso(startOfMonth(addDays(startOfMonth(month), 32))));
      setPending((p) => p + 1);
      fetch(`/api/rates?cabin=${slug}&start=${start}`)
        .then((r) => (r.ok ? r.json() : { nights: [] }))
        .then(({ nights: list }: { nights: Night[] }) => {
          if (!list.length) return;
          setLive(true);
          setNights((prev) => {
            const next = new Map(prev);
            for (const n of list) next.set(n.date, n);
            return next;
          });
        })
        .catch(() => {})
        .finally(() => setPending((p) => p - 1));
    },
    [slug],
  );

  useEffect(() => {
    ensureMonth(new Date());
  }, [ensureMonth]);

  const value = useMemo<Stay>(() => {
    let total: number | null = null;
    let nightCount = 0;
    if (checkin && checkout) {
      nightCount = differenceInCalendarDays(parseISO(checkout), parseISO(checkin));
      let sum = 0;
      for (let i = 0; i < nightCount; i++) {
        const p = nights.get(iso(addDays(parseISO(checkin), i)))?.price;
        if (p == null) {
          sum = NaN;
          break;
        }
        sum += p;
      }
      total = Number.isFinite(sum) ? sum : null;
    }
    return {
      slug,
      name,
      sleeps,
      petsAllowed,
      guests,
      dogs,
      setGuests,
      setDogs,
      nights,
      live,
      loading: pending > 0,
      checkin,
      checkout,
      setRange: (a, b) => {
        setCheckin(a);
        setCheckout(b);
      },
      ensureMonth,
      total,
      nightCount,
    };
  }, [slug, name, sleeps, petsAllowed, guests, dogs, nights, live, pending, checkin, checkout, ensureMonth]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStay() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStay must be used inside StayProvider");
  return ctx;
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
export const prettyDate = (d?: string) => (d ? format(parseISO(d), "EEE, MMM d") : "");
