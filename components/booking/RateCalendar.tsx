"use client";

import { useEffect, useMemo, useState } from "react";
import { DayPicker, type DayButtonProps, type Matcher } from "react-day-picker";
import { addDays, addMonths, isAfter, isBefore, parseISO, startOfDay, startOfMonth } from "date-fns";
import { Loader2, RotateCcw } from "lucide-react";
import "react-day-picker/style.css";
import { iso, useStay } from "./Stay";

function useIsWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

/** Two-month calendar with each night's live WebRezPro rate; picks the check-in/checkout range. */
export function RateCalendar() {
  const { nights, live, loading, checkin, checkout, setRange, ensureMonth } = useStay();
  const wide = useIsWide();
  const today = useMemo(() => startOfDay(new Date()), []);
  const from = checkin ? parseISO(checkin) : undefined;
  const [month, setMonth] = useState(() => startOfMonth(from ?? today));
  const to = checkout ? parseISO(checkout) : undefined;

  useEffect(() => {
    ensureMonth(month);
    ensureMonth(addMonths(month, 1));
  }, [month, ensureMonth]);

  const { disabled, booked } = useMemo(() => {
    const past: Matcher = { before: today };
    if (!live) return { disabled: [past], booked: () => false };
    const night = (d: Date) => nights.get(iso(d));
    const isBooked = (d: Date) => {
      const n = night(d);
      return n ? !n.available : false;
    };
    const choosingCheckout = Boolean(from && !to);

    let firstBooked: Date | null = null;
    if (from && choosingCheckout) {
      for (let d = addDays(from, 1), i = 0; i < 120; d = addDays(d, 1), i++) {
        if (isBooked(d)) {
          firstBooked = d;
          break;
        }
      }
    }

    let rule: Matcher;
    if (!from || !choosingCheckout) {
      rule = (d: Date) => isBooked(d) || Boolean(night(d)?.noArrival);
    } else {
      const minStay = night(from)?.minStay ?? 1;
      rule = (d: Date) => {
        if (!isAfter(d, from)) return isBooked(d) || Boolean(night(d)?.noArrival);
        if (isBefore(d, addDays(from, minStay))) return true;
        if (firstBooked && isAfter(d, firstBooked)) return true;
        return Boolean(night(d)?.noDeparture);
      };
    }
    // The first booked night after check-in is still a valid checkout morning.
    const bookedShown = (d: Date) => isBooked(d) && !(firstBooked && d.getTime() === firstBooked.getTime());
    return { disabled: [past, rule], booked: bookedShown };
  }, [live, nights, from, to, today]);

  const minStayHint = from && !to && live ? nights.get(iso(from))?.minStay ?? 1 : 1;

  function PriceDay({ day, modifiers, children, ...props }: DayButtonProps) {
    const n = nights.get(iso(day.date));
    const showPrice = live && n?.available && n.price != null && !modifiers.outside && !modifiers.disabled;
    return (
      <button {...props}>
        <span>{children}</span>
        {showPrice && <span className="wf-price">${n!.price}</span>}
      </button>
    );
  }

  return (
    <div>
      <DayPicker
        mode="range"
        numberOfMonths={wide ? 2 : 1}
        month={month}
        onMonthChange={setMonth}
        selected={{ from, to }}
        disabled={disabled}
        excludeDisabled={false}
        modifiers={{ booked }}
        modifiersClassNames={{ booked: "wf-booked" }}
        startMonth={today}
        endMonth={addMonths(today, 18)}
        components={{ DayButton: PriceDay }}
        onSelect={(_, day) => {
          if (!from || to || !isAfter(day, from)) setRange(iso(day), undefined);
          else setRange(checkin, iso(day));
        }}
        className="wf-calendar"
      />

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink-600" aria-live="polite">
        {loading ? (
          <span className="flex items-center gap-2"><Loader2 className="size-3.5 animate-spin text-blossom-500" aria-hidden /> Checking live rates…</span>
        ) : live ? (
          <>
            <span className="flex items-center gap-2"><span className="font-semibold text-sage-700">$</span> Nightly rate under each date, before taxes</span>
            <span className="flex items-center gap-2"><span className="inline-block h-3.5 w-5 rounded bg-[repeating-linear-gradient(135deg,rgb(201_138_134/0.35)_0_3px,transparent_3px_6px)]" aria-hidden /> Booked</span>
            {from && !to && minStayHint > 1 && <span className="font-semibold text-heather-700">{minStayHint}-night minimum from this date</span>}
          </>
        ) : (
          <span>Live rates are unavailable right now. Pick your dates and we&apos;ll check them on the booking page.</span>
        )}
        {(checkin || checkout) && (
          <button type="button" onClick={() => setRange(undefined, undefined)} className="ml-auto flex items-center gap-1.5 font-semibold text-heather-700 hover:underline">
            <RotateCcw className="size-3.5" aria-hidden /> Clear dates
          </button>
        )}
      </div>
    </div>
  );
}
