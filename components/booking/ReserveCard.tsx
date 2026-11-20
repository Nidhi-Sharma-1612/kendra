"use client";

import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { bookingUrl } from "@/lib/booking";
import { money, prettyDate, useStay } from "./Stay";

/**
 * Sticky sidebar summary in deep heather (the site's dark accent): live price, chosen dates, total,
 * and the hand-off to WebRezPro.
 */
export function ReserveCard({ fromPrice }: { fromPrice?: number }) {
  const { name, checkin, checkout, total, nightCount, live } = useStay();
  const ready = Boolean(checkin && checkout);

  return (
    <div className="paper relative overflow-hidden rounded-[1.75rem] bg-heather-900 p-7 text-paper shadow-lift">
      <p className="label text-blossom-300">Reserve {name}</p>
      <p className="mt-3 font-display text-4xl leading-none">
        {fromPrice ? (
          <>
            <span className="text-2xl text-paper/70 italic">from </span>
            {money(fromPrice)}
            <span className="font-sans text-base text-paper/60"> / night</span>
          </>
        ) : (
          "Live rates"
        )}
      </p>

      <a href="#availability" className="mt-6 grid grid-cols-2 overflow-hidden rounded-[1.25rem] border border-paper/15 bg-paper/[0.07] text-left transition hover:border-paper/35">
        <span className="border-r border-paper/15 p-3.5">
          <span className="label block !text-[0.6rem] text-paper/55">Check-in</span>
          <span className="mt-1 block text-sm font-semibold">{prettyDate(checkin) || "Add date"}</span>
        </span>
        <span className="p-3.5">
          <span className="label block !text-[0.6rem] text-paper/55">Checkout</span>
          <span className="mt-1 block text-sm font-semibold">{prettyDate(checkout) || "Add date"}</span>
        </span>
      </a>

      {ready && (
        <div className="mt-4 flex items-baseline justify-between border-b border-dashed border-paper/20 pb-4 text-sm">
          <span className="text-paper/70">
            {nightCount} night{nightCount === 1 ? "" : "s"}
          </span>
          <span className="font-display text-2xl">{total != null && live ? `${money(total)}*` : "See rates"}</span>
        </div>
      )}

      <a
        href={ready ? bookingUrl(checkin, checkout) : "#availability"}
        target={ready ? "_blank" : undefined}
        rel={ready ? "noopener" : undefined}
        className="group mt-6 flex w-full items-center justify-between gap-3 rounded-full bg-paper py-2 pr-2 pl-6 font-semibold text-heather-900 transition hover:bg-blossom-100"
      >
        {ready ? "Continue to secure booking" : "Choose your dates"}
        <span className="grid size-10 place-items-center rounded-full bg-heather-900 text-paper transition-transform group-hover:translate-x-0.5">
          {ready ? <ArrowUpRight className="size-4" aria-hidden /> : <ArrowRight className="size-4" aria-hidden />}
        </span>
      </a>

      <p className="mt-5 flex gap-2 text-xs leading-relaxed text-paper/65">
        <ShieldCheck className="mt-px size-4 shrink-0 text-blossom-300" aria-hidden />
        {ready ? `You'll finish on our secure WebRezPro booking page. Select ${name} there to confirm.` : "Book direct with the owners. No booking-site service fees."}
      </p>
      {ready && total != null && live && <p className="mt-2 text-[0.7rem] text-paper/50">*Nightly rates only; taxes and fees are added at checkout.</p>}
    </div>
  );
}

/** Bottom bar on small screens, in the same deep heather. */
export function MobileReserveBar({ fromPrice }: { fromPrice?: number }) {
  const { checkin, checkout, total, live } = useStay();
  const ready = Boolean(checkin && checkout);
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/10 bg-heather-950/95 px-4 py-3 text-paper backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="text-sm">
          {ready ? (
            <>
              <p className="font-semibold">
                {prettyDate(checkin)} → {prettyDate(checkout)}
              </p>
              <p className="text-paper/65">{total != null && live ? `${money(total)} before taxes` : "Rates on next step"}</p>
            </>
          ) : (
            <p>
              {fromPrice ? (
                <>
                  from <span className="font-display text-xl">{money(fromPrice)}</span> / night
                </>
              ) : (
                "Live rates & dates"
              )}
            </p>
          )}
        </div>
        <a
          href={ready ? bookingUrl(checkin, checkout) : "#availability"}
          target={ready ? "_blank" : undefined}
          rel={ready ? "noopener" : undefined}
          className="shrink-0 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-heather-900"
        >
          {ready ? "Book these dates" : "Choose dates"}
        </a>
      </div>
    </div>
  );
}
