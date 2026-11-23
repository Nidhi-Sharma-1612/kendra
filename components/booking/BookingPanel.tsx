"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, ChevronDown, Minus, PawPrint, Plus, ShieldCheck, Users, X } from "lucide-react";
import { bookingUrl } from "@/lib/booking";
import { site } from "@/data/site";

const DOG_FEE = site.pets.feePerDog;
import { RateCalendar } from "./RateCalendar";
import { money, prettyDate, useStay } from "./Stay";

type Panel = "dates" | "guests" | null;

function Stepper({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-9 place-items-center rounded-full border border-vellum text-heather-900 transition hover:border-heather-700 disabled:cursor-not-allowed disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function GuestPicker() {
  const { sleeps, petsAllowed, guests, dogs, setGuests, setDogs } = useStay();
  const rows = [
    { label: "Guests", hint: `This cabin sleeps ${sleeps}`, value: guests, set: setGuests, min: 1, max: sleeps, show: true },
    { label: "Dogs", hint: `$${DOG_FEE} each, up to ${site.pets.maxDogs}`, value: dogs, set: setDogs, min: 0, max: site.pets.maxDogs, show: petsAllowed },
  ];
  return (
    <div className="divide-y divide-vellum">
      {rows
        .filter((r) => r.show)
        .map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-6 py-4 first:pt-0 last:pb-0">
            <div>
              <p className="font-semibold text-heather-900">{r.label}</p>
              <p className="text-sm text-ink-600">{r.hint}</p>
            </div>
            <div className="flex items-center gap-3">
              <Stepper label={`Fewer ${r.label.toLowerCase()}`} disabled={r.value <= r.min} onClick={() => r.set(r.value - 1)}>
                <Minus className="size-4" />
              </Stepper>
              <span className="w-5 text-center font-semibold tabular-nums" aria-live="polite">
                {r.value}
              </span>
              <Stepper label={`More ${r.label.toLowerCase()}`} disabled={r.value >= r.max} onClick={() => r.set(r.value + 1)}>
                <Plus className="size-4" />
              </Stepper>
            </div>
          </div>
        ))}
      {!petsAllowed && <p className="pt-4 text-sm text-ink-600">This cabin is pet-free. Dogs are welcome in Pine Needle, Teaberry, Mountain Camellia and Sweetbriar.</p>}
    </div>
  );
}

/** Popover under the fields on desktop; closes on outside click or Escape. */
function Popover({ open, onClose, title, wide, children }: { open: boolean; onClose: () => void; title: string; wide?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (ref.current?.contains(t) || t.closest("[data-popover-trigger]")) return;
      onClose();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-label={title}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className={`absolute top-full right-0 z-40 mt-2 rounded-[1.5rem] border border-vellum bg-paper p-5 shadow-lift ${wide ? "w-max" : "w-full min-w-[20rem]"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-2xl text-heather-900">{title}</p>
            <button type="button" onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-full hover:bg-paper-deep">
              <X className="size-4" />
            </button>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const guestLabel = (guests: number, dogs: number) => `${guests} guest${guests > 1 ? "s" : ""}${dogs ? ` · ${dogs} dog${dogs > 1 ? "s" : ""}` : ""}`;

/** Dates + guests fields, live total and the hand-off to WebRezPro. `inline` shows the calendar in place (mobile sheet). */
function BookingForm({ inline = false }: { inline?: boolean }) {
  const { name, checkin, checkout, total, nightCount, live, guests, dogs } = useStay();
  const [panel, setPanel] = useState<Panel>(inline ? "dates" : null);
  const close = () => setPanel(null);
  const ready = Boolean(checkin && checkout);
  const range = ready ? `${prettyDate(checkin)} → ${prettyDate(checkout)}` : checkin ? `${prettyDate(checkin)} → Add checkout` : "Add dates";

  // Once checkout is picked, close the popover (desktop).
  const prevCheckout = useRef(checkout);
  useEffect(() => {
    if (!inline && checkout && checkout !== prevCheckout.current) setPanel(null);
    prevCheckout.current = checkout;
  }, [checkout, inline]);

  const field = "flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-paper-deep/60";

  return (
    <div>
      <div className="relative rounded-[1.25rem] border border-vellum bg-paper">
        <button type="button" data-popover-trigger onClick={() => setPanel((p) => (p === "dates" ? (inline ? p : null) : "dates"))} aria-expanded={panel === "dates"} className={`${field} rounded-t-[1.25rem]`}>
          <CalendarDays className="size-5 text-blossom-500" aria-hidden />
          <span className="flex min-w-0 flex-col">
            <span className="label !text-[0.62rem] text-ink-400">Dates</span>
            <span className={`truncate text-[0.95rem] font-semibold ${checkin ? "text-heather-900" : "text-ink-400"}`}>{range}</span>
          </span>
          {!inline && <ChevronDown className="ml-auto size-4 shrink-0 text-ink-400" aria-hidden />}
        </button>
        <div className="border-t border-vellum" />
        <button type="button" data-popover-trigger onClick={() => setPanel((p) => (p === "guests" ? null : "guests"))} aria-expanded={panel === "guests"} className={`${field} rounded-b-[1.25rem]`}>
          {dogs ? <PawPrint className="size-5 text-blossom-500" aria-hidden /> : <Users className="size-5 text-blossom-500" aria-hidden />}
          <span className="flex flex-col">
            <span className="label !text-[0.62rem] text-ink-400">Guests</span>
            <span className="text-[0.95rem] font-semibold text-heather-900">{guestLabel(guests, dogs)}</span>
          </span>
          <ChevronDown className="ml-auto size-4 shrink-0 text-ink-400" aria-hidden />
        </button>

        {!inline && (
          <>
            <Popover open={panel === "dates"} onClose={close} title="Select your dates" wide>
              <RateCalendar />
            </Popover>
            <Popover open={panel === "guests"} onClose={close} title="Guests">
              <GuestPicker />
            </Popover>
          </>
        )}
      </div>

      {inline && panel === "guests" && (
        <div className="mt-4 rounded-[1.25rem] border border-vellum bg-paper p-5">
          <GuestPicker />
        </div>
      )}
      {inline && panel === "dates" && (
        <div className="mt-4 rounded-[1.25rem] border border-vellum bg-paper p-3">
          <RateCalendar />
        </div>
      )}

      {/* Price summary from the live nightly rates */}
      {ready && (
        <dl className="mt-5 space-y-2 text-sm">
          <div className="flex justify-between text-ink-600">
            <dt>
              {nightCount} night{nightCount === 1 ? "" : "s"}
              {total != null && live && nightCount > 0 && <> · avg {money(Math.round(total / nightCount))}</>}
            </dt>
            <dd>{total != null && live ? money(total) : "On next step"}</dd>
          </div>
          {dogs > 0 && (
            <div className="flex justify-between text-ink-600">
              <dt>Pet fee · {dogs} dog{dogs > 1 ? "s" : ""}</dt>
              <dd>{money(DOG_FEE * dogs)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-dashed border-vellum pt-3 font-semibold text-heather-900">
            <dt>Before taxes &amp; fees</dt>
            <dd className="font-display text-2xl leading-none">{total != null && live ? money(total + DOG_FEE * dogs) : "-"}</dd>
          </div>
        </dl>
      )}

      {ready ? (
        <a
          href={bookingUrl(checkin, checkout)}
          target="_blank"
          rel="noopener"
          className="group mt-5 flex w-full items-center justify-between gap-3 rounded-full bg-heather-900 py-2 pr-2 pl-6 font-semibold text-paper transition hover:bg-heather-700"
        >
          Book now
          <span className="grid size-10 place-items-center rounded-full bg-paper text-heather-900 transition-transform group-hover:translate-x-0.5">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </a>
      ) : inline ? null : (
        <button
          type="button"
          data-popover-trigger
          onClick={() => setPanel("dates")}
          className="mt-5 flex w-full items-center justify-center rounded-full bg-heather-900 px-6 py-4 font-semibold text-paper transition hover:bg-heather-700"
        >
          Check {name} availability
        </button>
      )}

      <p className="mt-4 text-sm leading-relaxed text-ink-600">
        {ready
          ? `You'll finish on our secure WebRezPro booking page. Choose ${name} there to confirm; taxes are added at checkout.`
          : "Pick check-in and checkout to see live nightly rates and your total."}
      </p>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-600">
        <ShieldCheck className="mt-px size-4 shrink-0 text-sage-700" aria-hidden />
        Book direct with the owners. No booking-site service fees.
      </p>
    </div>
  );
}

function PriceHeading({ fromPrice }: { fromPrice?: number }) {
  const { total, live, checkin, checkout, dogs } = useStay();
  const ready = Boolean(checkin && checkout) && total != null && live;
  return (
    <p className="mb-5 font-display text-3xl leading-none text-heather-900">
      {ready ? (
        <>
          {money(total! + DOG_FEE * dogs)} <span className="font-sans text-base text-ink-600">total</span>
        </>
      ) : fromPrice ? (
        <>
          <span className="text-xl text-ink-600 italic">from </span>
          {money(fromPrice)}
          <span className="font-sans text-base text-ink-600"> / night</span>
        </>
      ) : (
        "Your stay"
      )}
    </p>
  );
}

/** Sticky booking card (desktop) + bottom bar and full-screen sheet (mobile). Same layout as Vacay's. */
export function BookingPanel({ fromPrice }: { fromPrice?: number }) {
  const { name, checkin, checkout, total, live, dogs } = useStay();
  const ready = Boolean(checkin && checkout);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  return (
    <>
      <aside id="book" aria-label={`Book ${name}`} className="sticky top-28 z-20 hidden rounded-[1.75rem] border border-vellum bg-paper p-6 shadow-lift lg:block">
        <PriceHeading fromPrice={fromPrice} />
        <BookingForm />
      </aside>

      <div data-mobile-booking-bar className="fixed inset-x-0 bottom-0 z-40 border-t border-vellum bg-paper/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            {ready && total != null && live ? (
              <p className="font-display text-xl whitespace-nowrap text-heather-900">
                {money(total + DOG_FEE * dogs)} <span className="font-sans text-sm text-ink-600">total</span>
              </p>
            ) : fromPrice ? (
              <p className="font-display text-xl whitespace-nowrap text-heather-900">
                from {money(fromPrice)} <span className="font-sans text-sm text-ink-600">/ night</span>
              </p>
            ) : (
              <p className="font-display text-xl text-heather-900">Check dates</p>
            )}
            <button type="button" onClick={() => setSheet(true)} className="block truncate text-sm text-ink-600 underline underline-offset-2">
              {ready ? `${prettyDate(checkin)} → ${prettyDate(checkout)}` : "Add dates"}
            </button>
          </div>
          {ready ? (
            <a href={bookingUrl(checkin, checkout)} target="_blank" rel="noopener" className="shrink-0 rounded-full bg-heather-900 px-5 py-3 font-semibold text-paper">
              Book now
            </a>
          ) : (
            <button type="button" onClick={() => setSheet(true)} className="shrink-0 rounded-full bg-heather-900 px-5 py-3 font-semibold text-paper">
              Check availability
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {sheet && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-paper lg:hidden"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Book ${name}`}
            data-booking-sheet
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-vellum bg-paper px-4 py-3">
              <p className="font-display text-2xl text-heather-900">{name}</p>
              <button type="button" onClick={() => setSheet(false)} aria-label="Close" className="grid size-10 place-items-center rounded-full hover:bg-paper-deep">
                <X className="size-5" />
              </button>
            </div>
            <div className="mx-auto max-w-xl px-4 py-6 pb-16">
              <PriceHeading fromPrice={fromPrice} />
              <BookingForm inline />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
