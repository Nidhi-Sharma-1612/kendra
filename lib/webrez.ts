import "server-only";

import { webrez } from "@/data/site";

/**
 * Live nightly rates and availability from WebRezPro's public rate calendar, the same feed behind
 * the "Room calendar" pop-up on the WebRezPro booking page. One request returns about two months of
 * every room type on the account, so it's cached for an hour and shared by all twelve cabins.
 *
 * It's an undocumented endpoint, so everything here fails soft: on any error the site simply
 * hides prices and the guest picks dates on WebRezPro itself. If WebRezPro grants official API
 * access later, swap the fetch below and keep the same return shape.
 */

export type Night = {
  /** yyyy-mm-dd */
  date: string;
  price: number | null;
  minStay: number;
  available: boolean;
  noArrival: boolean;
  noDeparture: boolean;
};

type FeedDay = {
  cost?: number | null;
  min_booking_length?: number | null;
  num_avail?: number | null;
  closed_to_arrival?: number | null;
  closed_to_departure?: number | null;
  closed_to_web?: number | null;
  flag_by_phone_only?: number | null;
  past_date?: number | null;
};

type Feed = { date_data?: Record<string, Record<string, FeedDay>> };

const FEED = "https://secure.webrez.com/Bookings105/activity-edit.html";

const compact = (iso: string) => iso.replaceAll("-", "");
const dashed = (yyyymmdd: string) => `${yyyymmdd.slice(0, 4)}-${yyyymmdd.slice(4, 6)}-${yyyymmdd.slice(6, 8)}`;

async function fetchWindow(startISO: string): Promise<Feed | null> {
  const params = new URLSearchParams({
    table: "hotels",
    listing_id: String(webrez.hotelId),
    mode: "ajax",
    command: "unit_type_availability_calendar_html_29",
    hotel_id: String(webrez.hotelId),
    merchant_id: String(webrez.hotelId),
    // Any room type works; the feed returns the whole account.
    invtype_id: "38592",
    date_start: compact(startISO),
  });
  try {
    const res = await fetch(`${FEED}?${params}`, {
      headers: { Accept: "application/json", "User-Agent": "AGatlinburgCabin-Website" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as Feed;
  } catch {
    return null;
  }
}

/** Nights for one cabin, from `startISO` for roughly two months. Empty if the feed is unavailable. */
export async function getNights(webrezId: number, startISO: string): Promise<Night[]> {
  const feed = await fetchWindow(startISO);
  const days = feed?.date_data ?? {};
  return Object.keys(days)
    .sort()
    .flatMap((key) => {
      const d = days[key]?.[String(webrezId)];
      if (!d || d.past_date) return [];
      const bookable = (d.num_avail ?? 0) > 0 && !d.closed_to_web && !d.flag_by_phone_only;
      return [{
        date: dashed(key),
        price: typeof d.cost === "number" ? Math.round(d.cost) : null,
        minStay: Math.max(1, d.min_booking_length ?? 1),
        available: bookable,
        noArrival: Boolean(d.closed_to_arrival),
        noDeparture: Boolean(d.closed_to_departure),
      }];
    })
    .filter((n) => n.date >= startISO);
}

const todayISO = () => new Date().toISOString().slice(0, 10);

export type StayCheck =
  | { status: "available"; nights: number; total: number | null }
  | { status: "unavailable"; nights: number; reason: string }
  | { status: "unknown"; nights: number };

/** Can this cabin be booked from checkin to checkout? Applies booked nights, arrival/departure rules and minimum stay. */
export async function checkStay(webrezId: number, checkin: string, checkout: string): Promise<StayCheck> {
  const nightsCount = Math.round((Date.parse(checkout) - Date.parse(checkin)) / 86_400_000);
  const list = await getNights(webrezId, checkin);
  if (!list.length) return { status: "unknown", nights: nightsCount };
  const byDate = new Map(list.map((n) => [n.date, n]));
  const first = byDate.get(checkin);
  if (!first) return { status: "unknown", nights: nightsCount };
  if (!first.available) return { status: "unavailable", nights: nightsCount, reason: "Booked on these dates" };
  if (first.noArrival) return { status: "unavailable", nights: nightsCount, reason: "No check-ins that day" };
  if (nightsCount < first.minStay) return { status: "unavailable", nights: nightsCount, reason: `${first.minStay}-night minimum for these dates` };
  let total = 0;
  for (let i = 0; i < nightsCount; i++) {
    const date = new Date(Date.parse(checkin) + i * 86_400_000).toISOString().slice(0, 10);
    const n = byDate.get(date);
    if (!n) return { status: "unknown", nights: nightsCount };
    if (!n.available) return { status: "unavailable", nights: nightsCount, reason: "Booked on these dates" };
    total += n.price ?? NaN;
  }
  if (byDate.get(checkout)?.noDeparture) return { status: "unavailable", nights: nightsCount, reason: "No checkouts that day" };
  return { status: "available", nights: nightsCount, total: Number.isFinite(total) ? total : null };
}

/** Lowest available nightly rate per cabin over the next ~2 months, keyed by WebRez ID. */
export async function getFromPrices(ids: number[]): Promise<Record<number, number>> {
  const feed = await fetchWindow(todayISO());
  const days = feed?.date_data ?? {};
  const out: Record<number, number> = {};
  for (const key of Object.keys(days)) {
    for (const id of ids) {
      const d = days[key]?.[String(id)];
      if (!d || d.past_date || !(d.num_avail && d.num_avail > 0) || typeof d.cost !== "number") continue;
      out[id] = Math.min(out[id] ?? Infinity, Math.round(d.cost));
    }
  }
  return out;
}
