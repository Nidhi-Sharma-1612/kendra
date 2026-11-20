import { webrez } from "@/data/site";

/**
 * Link into the WebRezPro booking engine. Dates carry through and the search runs for them; the
 * guest then picks the cabin there. (WebRezPro's hosted page doesn't accept a room-type filter in
 * the URL, so the cabin itself can't be preselected.)
 */
export function bookingUrl(checkin?: string, checkout?: string): string {
  const params = new URLSearchParams({ location_id: String(webrez.locationId) });
  if (checkin && checkout) {
    params.set("date_from", checkin.replaceAll("-", ""));
    params.set("date_to", checkout.replaceAll("-", ""));
  }
  return `https://secure.webrez.com/hotel/${webrez.hotelId}?${params}`;
}

export const calendarUrl = () => `https://secure.webrez.com/hotel/${webrez.hotelId}/calendar/?location_id=${webrez.locationId}`;
