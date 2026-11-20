/** Parses and validates ?checkin=&checkout=&guests= search params (shared by /cabins and cabin pages). */
export type StaySearch = { checkin: string; checkout: string; guests: number };

const ISO = /^\d{4}-\d{2}-\d{2}$/;

export function parseSearch(sp: Record<string, string | string[] | undefined>): StaySearch | null {
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k]![0] : sp[k]) ?? "";
  const checkin = get("checkin");
  const checkout = get("checkout");
  if (!ISO.test(checkin) || !ISO.test(checkout) || checkout <= checkin) return null;
  if (checkin < new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)) return null;
  const guests = Math.min(6, Math.max(1, parseInt(get("guests") || "2", 10) || 2));
  return { checkin, checkout, guests };
}

export const searchQuery = (s: StaySearch) => `?checkin=${s.checkin}&checkout=${s.checkout}&guests=${s.guests}`;
