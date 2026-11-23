"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, type DayButtonProps, type Matcher } from "react-day-picker";
import { addDays, addMonths, format, isAfter, isBefore, isSameDay, parseISO, startOfDay, startOfMonth } from "date-fns";
import { CalendarDays, Loader2, Minus, Plus, Search, Users } from "lucide-react";
import "react-day-picker/style.css";
import { cabins } from "@/data/cabins";
import type { OpenNight } from "@/lib/webrez";

const iso = (d: Date) => format(d, "yyyy-MM-dd");

type Field = "checkin" | "checkout" | "guests";
type Initial = { checkin: string; checkout: string; guests: number } | null;

/**
 * Availability search: one shared calendar fills both dates (check-in first, then checkout), and
 * checkout must be at least one night after check-in. Submits to /cabins?checkin=…&checkout=…&guests=…
 */
type Props = {
  initial?: Initial;
  /** Open popovers above the bar (for a bar at the bottom of the screen). */
  placement?: "top" | "bottom";
  /** Larger, more prominent version for the homepage hero. */
  featured?: boolean;
};

export function HeroSearch({ initial, placement = "bottom", featured = false }: Props) {
  // Popovers open below the bar by default, or above it when the bar sits at the bottom of the screen.
  const pop = placement === "top" ? "bottom-full mb-3" : "top-full mt-3";
  const router = useRouter();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [checkin, setCheckin] = useState<string | undefined>(initial?.checkin);
  const [checkout, setCheckout] = useState<string | undefined>(initial?.checkout);
  const [guests, setGuests] = useState(initial?.guests ?? 2);
  const [active, setActive] = useState<Field | null>(null);
  const [wide, setWide] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    const away = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setActive(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.addEventListener("mousedown", away);
    document.addEventListener("keydown", esc);
    return () => {
      mq.removeEventListener("change", on);
      document.removeEventListener("mousedown", away);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  const from = checkin ? parseISO(checkin) : undefined;
  const to = checkout ? parseISO(checkout) : undefined;
  const datesOpen = active === "checkin" || active === "checkout";
  const pretty = (d?: Date) => (d ? format(d, "EEE, MMM d") : "Add date");

  // ---- Live availability across all cabins (loaded a two-month window at a time) ----
  const [nights, setNights] = useState<Map<string, OpenNight[]>>(new Map());
  const [live, setLive] = useState(false);
  const [pending, setPending] = useState(0);
  const [month, setMonth] = useState(() => startOfMonth(from ?? today));
  const requested = useRef(new Set<string>());

  const ensureMonth = useCallback((m: Date) => {
    const start = iso(startOfMonth(m));
    if (requested.current.has(start)) return;
    requested.current.add(start);
    requested.current.add(iso(startOfMonth(addMonths(m, 1))));
    setPending((p) => p + 1);
    fetch(`/api/availability?start=${start}`)
      .then((r) => (r.ok ? r.json() : { nights: [] }))
      .then(({ nights: list }: { nights: { date: string; open: OpenNight[] }[] }) => {
        if (!list.length) return;
        setLive(true);
        setNights((prev) => {
          const next = new Map(prev);
          for (const n of list) next.set(n.date, n.open);
          return next;
        });
      })
      .catch(() => {})
      .finally(() => setPending((p) => p - 1));
  }, []);

  useEffect(() => {
    if (!datesOpen) return;
    ensureMonth(month);
    ensureMonth(addMonths(month, 1));
  }, [datesOpen, month, ensureMonth]);

  // Only cabins that sleep this many guests count (3+ guests: Mountain Laurel only).
  const eligible = useMemo(() => new Set(cabins.filter((c) => c.sleeps >= guests).map((c) => c.webrezId)), [guests]);
  const openOn = useCallback((d: Date) => (nights.get(iso(d)) ?? []).filter((n) => eligible.has(n.id)), [nights, eligible]);
  const known = (d: Date) => nights.has(iso(d));

  /** Cabins that can be booked from `start` to `end` (every night free, min stay met, rules allow it). */
  const bookable = useCallback(
    (start: Date, end: Date) => {
      const first = openOn(start).filter((n) => !n.noArrival);
      return first.filter((c) => {
        const count = Math.round((end.getTime() - start.getTime()) / 86_400_000);
        if (count < c.minStay) return false;
        for (let d = addDays(start, 1); d < end; d = addDays(d, 1)) {
          if (!openOn(d).some((n) => n.id === c.id)) return false;
        }
        const out = nights.get(iso(end))?.find((n) => n.id === c.id);
        return !out?.noDeparture;
      });
    },
    [openOn, nights],
  );

  // Fully booked: we have data for the date and no fitting cabin is free that night.
  const soldOut = (d: Date) => live && known(d) && !isBefore(d, today) && openOn(d).length === 0;

  // A day can start a stay if some fitting cabin is free that night and allows arrivals.
  const canCheckIn = (d: Date) => !known(d) || openOn(d).some((n) => !n.noArrival);
  // A day can end the stay from `from` if some fitting cabin is free every night in between.
  // Nights we haven't loaded yet are left selectable; the results page checks them.
  const canCheckOut = (start: Date, end: Date) => {
    for (let d = start; d < end; d = addDays(d, 1)) if (!known(d)) return true;
    return bookable(start, end).length > 0;
  };

  const disabled: Matcher[] = [{ before: today }];
  if (active === "checkout" && from) {
    disabled.push(from); // no same-day stays
    if (live) {
      disabled.push((d: Date) => (isAfter(d, from) ? !canCheckOut(from, d) : !isSameDay(d, from) && !canCheckIn(d)));
    }
  } else if (live) {
    disabled.push((d: Date) => !canCheckIn(d));
  }

  /** Day cell: the date, then the lowest nightly price, or "2 left" when only one or two cabins remain. */
  function AvailabilityDay({ day, modifiers, children, ...props }: DayButtonProps) {
    const open = live && !modifiers.outside && !isBefore(day.date, today) ? openOn(day.date) : [];
    const prices = open.map((n) => n.price).filter((p): p is number => p != null);
    const low = open.length > 0 && open.length <= 2 && eligible.size > 2;
    return (
      <button {...props}>
        <span>{children}</span>
        {open.length > 0 && !modifiers.disabled && (
          <span className={low ? "wf-price wf-few" : "wf-price"}>{low ? `${open.length} left` : prices.length ? `$${Math.min(...prices)}` : ""}</span>
        )}
      </button>
    );
  }

  function pick(day: Date) {
    if (active === "checkout" && from && isAfter(day, from)) {
      setCheckout(iso(day));
      setActive(null);
      return;
    }
    // Choosing check-in (or a day before the current check-in): start over from this day.
    setCheckin(iso(day));
    if (!to || !isAfter(to, day)) setCheckout(undefined);
    setActive("checkout");
  }

  function openField(field: "checkin" | "checkout") {
    if (field === "checkout" && !checkin) field = "checkin";
    setActive(active === field ? null : field);
  }

  function submit() {
    if (!checkin) return setActive("checkin");
    if (!checkout) return setActive("checkout");
    router.push(`/cabins?checkin=${checkin}&checkout=${checkout}&guests=${guests}#results`);
  }

  // `divider`: a thin line on the left (wide layout only), so the three fields read as equal segments.
  const fieldClass = (on: boolean, divider = false) =>
    `relative flex min-w-0 items-center gap-3 rounded-full text-left transition hover:bg-paper ${featured ? "px-4 py-3 sm:px-5 sm:py-3.5" : "px-4 py-2.5"} ${
      on ? "bg-paper ring-1 ring-heather-700/25" : ""
    } ${divider ? "sm:before:absolute sm:before:top-1/2 sm:before:-left-0.5 sm:before:h-8 sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-vellum" : ""}`;
  // Featured: icons sit in soft rose circles and values are a size larger.
  const iconClass = featured
    ? "hidden size-10 shrink-0 rounded-full bg-blossom-100 p-2.5 text-blossom-500 sm:block"
    : "hidden size-5 shrink-0 text-blossom-500 sm:block";
  const valueSize = featured ? "text-[0.95rem]" : "text-sm";

  return (
    <div ref={box} className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={`grid grid-cols-2 gap-1 rounded-[1.75rem] bg-white sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center sm:rounded-full ${
          featured ? "p-2" : "border border-vellum p-1.5 shadow-lift"
        }`}
        aria-label="Search availability"
      >
        {(["checkin", "checkout"] as const).map((k) => {
          const value = k === "checkin" ? from : to;
          return (
            <button key={k} type="button" onClick={() => openField(k)} className={fieldClass(active === k, k === "checkout")} aria-expanded={active === k}>
              <CalendarDays className={iconClass} aria-hidden />
              <span>
                <span className="label block !text-[0.6rem] text-ink-400">{k === "checkin" ? "Check-in" : "Checkout"}</span>
                <span className={`block ${valueSize} font-semibold whitespace-nowrap ${value ? "text-heather-900" : "text-ink-600"}`}>{pretty(value)}</span>
              </span>
            </button>
          );
        })}
        <button type="button" onClick={() => setActive(active === "guests" ? null : "guests")} className={fieldClass(active === "guests", true)} aria-expanded={active === "guests"}>
          <Users className={iconClass} aria-hidden />
          <span>
            <span className="label block !text-[0.6rem] text-ink-400">Guests</span>
            <span className={`block ${valueSize} font-semibold whitespace-nowrap text-heather-900`}>{guests} guest{guests > 1 ? "s" : ""}</span>
          </span>
        </button>
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 rounded-full bg-heather-700 font-semibold whitespace-nowrap text-paper transition hover:bg-heather-900 ${
            featured ? "px-5 py-4 text-base sm:px-8 sm:py-5" : "px-6 py-3.5"
          }`}
        >
          <Search className={featured ? "size-5" : "size-4"} aria-hidden />
          {featured ? (
            <>
              {/* Short label on phones, where the button shares a row with Guests. */}
              <span className="sm:hidden">Search</span>
              <span className="hidden sm:inline">Search cabins</span>
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {datesOpen && (
        <div className={`absolute ${pop} left-0 z-50 w-max max-w-[calc(100vw-2rem)] rounded-3xl border border-vellum bg-white p-4 shadow-lift sm:p-6`}>
          <p className="mb-3 text-sm font-semibold text-heather-900">
            {active === "checkin" ? "Select your check-in date" : `Select your checkout date${from ? ` (after ${format(from, "MMM d")})` : ""}`}
          </p>
          <DayPicker
            mode="range"
            numberOfMonths={wide ? 2 : 1}
            month={month}
            onMonthChange={setMonth}
            selected={{ from, to }}
            disabled={disabled}
            excludeDisabled={false}
            // While choosing checkout, a booked night that is still a valid checkout morning isn't crossed out.
            modifiers={{ booked: (d: Date) => soldOut(d) && !(active === "checkout" && from && isAfter(d, from) && canCheckOut(from, d)) }}
            modifiersClassNames={{ booked: "wf-booked" }}
            components={{ DayButton: AvailabilityDay }}
            startMonth={today}
            endMonth={addMonths(today, 18)}
            onSelect={(_, day) => pick(day)}
            className="wf-calendar"
          />

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-vellum pt-4 text-xs text-ink-600" aria-live="polite">
            {pending > 0 && !live ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin text-blossom-500" aria-hidden /> Checking availability…
              </span>
            ) : live ? (
              <>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-sage-700">$</span> Available · lowest nightly rate
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-blossom-500">2 left</span> Almost full
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block h-3.5 w-5 rounded bg-[repeating-linear-gradient(135deg,rgb(201_138_134/0.35)_0_3px,transparent_3px_6px)]" aria-hidden />
                  Fully booked
                </span>
                {guests > 2 && <span className="text-heather-700">Showing dates for {guests} guests (Mountain Laurel)</span>}
              </>
            ) : (
              <span>Live availability is unavailable right now; we&apos;ll check your dates on the next step.</span>
            )}
            {from && to && (
              <span className="ml-auto font-semibold text-heather-900">
                {Math.round((to.getTime() - from.getTime()) / 86_400_000)} nights · {format(from, "MMM d")} → {format(to, "MMM d")}
              </span>
            )}
          </div>
        </div>
      )}

      {active === "guests" && (
        <div className={`absolute ${pop} right-0 z-50 w-72 rounded-3xl border border-vellum bg-white p-5 shadow-lift`}>
          <div className="flex items-center justify-between">
            <span>
              <span className="block font-semibold text-heather-900">Guests</span>
              <span className="text-xs text-ink-600">Adults and children</span>
            </span>
            <span className="flex items-center gap-3">
              <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} className="grid size-9 place-items-center rounded-full border border-vellum text-heather-700 disabled:opacity-30" aria-label="Fewer guests"><Minus className="size-4" /></button>
              <span className="w-4 text-center font-semibold" aria-live="polite">{guests}</span>
              <button type="button" onClick={() => setGuests((g) => Math.min(6, g + 1))} disabled={guests >= 6} className="grid size-9 place-items-center rounded-full border border-vellum text-heather-700 disabled:opacity-30" aria-label="More guests"><Plus className="size-4" /></button>
            </span>
          </div>
          <p className="mt-4 border-t border-vellum pt-3 text-xs leading-relaxed text-ink-600">Our studios sleep 2. For 3–6 guests or families with children, Mountain Laurel has two bedrooms.</p>
        </div>
      )}
    </div>
  );
}
