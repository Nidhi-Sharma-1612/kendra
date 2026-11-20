"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DayPicker, type Matcher } from "react-day-picker";
import { addMonths, format, isAfter, parseISO, startOfDay } from "date-fns";
import { CalendarDays, Minus, Plus, Search, Users } from "lucide-react";
import "react-day-picker/style.css";

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

  // While choosing checkout, the check-in day itself can't be picked (no same-day stays).
  const disabled: Matcher[] = [{ before: today }];
  if (active === "checkout" && from) disabled.push(from);

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

  const fieldClass = (on: boolean) =>
    `flex items-center gap-3 rounded-full text-left transition hover:bg-paper ${featured ? "px-4 py-3 sm:px-5 sm:py-3.5" : "px-4 py-2.5"} ${on ? "bg-paper ring-1 ring-heather-700/25" : ""}`;
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
        className={`grid grid-cols-2 gap-1 rounded-[1.75rem] bg-white sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center sm:rounded-full ${
          featured ? "p-2" : "border border-vellum p-1.5 shadow-lift"
        }`}
        aria-label="Search availability"
      >
        {(["checkin", "checkout"] as const).map((k) => {
          const value = k === "checkin" ? from : to;
          return (
            <button key={k} type="button" onClick={() => openField(k)} className={fieldClass(active === k)} aria-expanded={active === k}>
              <CalendarDays className={iconClass} aria-hidden />
              <span>
                <span className="label block !text-[0.6rem] text-ink-400">{k === "checkin" ? "Check-in" : "Checkout"}</span>
                <span className={`block ${valueSize} font-semibold whitespace-nowrap ${value ? "text-heather-900" : "text-ink-600"}`}>{pretty(value)}</span>
              </span>
            </button>
          );
        })}
        <button type="button" onClick={() => setActive(active === "guests" ? null : "guests")} className={fieldClass(active === "guests")} aria-expanded={active === "guests"}>
          <Users className={iconClass} aria-hidden />
          <span>
            <span className="label block !text-[0.6rem] text-ink-400">Guests</span>
            <span className={`block ${valueSize} font-semibold whitespace-nowrap text-heather-900`}>{guests} guest{guests > 1 ? "s" : ""}</span>
          </span>
        </button>
        <button
          type="submit"
          className={`flex items-center justify-center gap-2 rounded-full bg-heather-700 font-semibold text-paper transition hover:bg-heather-900 ${
            featured ? "px-8 py-4 text-base sm:py-5" : "px-6 py-3.5"
          }`}
        >
          <Search className={featured ? "size-5" : "size-4"} aria-hidden /> {featured ? "Search cabins" : "Search"}
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
            selected={{ from, to }}
            disabled={disabled}
            excludeDisabled={false}
            startMonth={today}
            endMonth={addMonths(today, 18)}
            defaultMonth={from ?? today}
            onSelect={(_, day) => pick(day)}
            className="wf-calendar"
          />
          {from && to && (
            <p className="mt-2 text-xs text-ink-600">
              {Math.round((to.getTime() - from.getTime()) / 86_400_000)} nights · {format(from, "MMM d")} → {format(to, "MMM d")}
            </p>
          )}
        </div>
      )}

      {active === "guests" && (
        <div className={`absolute ${pop} right-0 z-50 w-72 rounded-3xl border border-vellum bg-white p-5 shadow-lift`}>
          <div className="flex items-center justify-between">
            <span>
              <span className="block font-semibold text-heather-900">Guests</span>
              <span className="text-xs text-ink-600">Ages 18+</span>
            </span>
            <span className="flex items-center gap-3">
              <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} className="grid size-9 place-items-center rounded-full border border-vellum text-heather-700 disabled:opacity-30" aria-label="Fewer guests"><Minus className="size-4" /></button>
              <span className="w-4 text-center font-semibold" aria-live="polite">{guests}</span>
              <button type="button" onClick={() => setGuests((g) => Math.min(6, g + 1))} disabled={guests >= 6} className="grid size-9 place-items-center rounded-full border border-vellum text-heather-700 disabled:opacity-30" aria-label="More guests"><Plus className="size-4" /></button>
            </span>
          </div>
          <p className="mt-4 border-t border-vellum pt-3 text-xs leading-relaxed text-ink-600">Our studios sleep 2. For 3–6 guests, Mountain Laurel has two bedrooms.</p>
        </div>
      )}
    </div>
  );
}
