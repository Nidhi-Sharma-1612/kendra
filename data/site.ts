/**
 * Business details. Several are still being confirmed with the owner (name, phone, address,
 * policies). Everything the site shows about the business comes from here, so each answer is a
 * one-line change.
 */
export const site = {
  // TODO(client): confirm brand name. Candidates: "A Gatlinburg Cabin" (domain),
  // "Gatlinburg Adventure Cabins" (WebRezPro), "Wildflower Wilderness Mountain" (old site).
  name: "A Gatlinburg Cabin",
  place: "Wildflower Mountain",
  url: "https://agatlinburgcabin.com",
  tagline: "Twelve hideaway cabins for two on Wildflower Mountain",
  // TODO(client): confirm which number guests should call (old site lists three).
  phone: "865-453-2000",
  phoneHref: "tel:+18654532000",
  email: "stay@agatlinburgcabin.com",
  // TODO(client): WebRezPro lists this address; the old site lists a check-in office in Cosby.
  address: { street: "1717 Locust Ridge Way", city: "Sevierville", region: "TN", zip: "37876" },
  checkIn: "4:00 PM",
  checkOut: "11:00 AM",
  minAge: 18,
  acres: 30,
  riverFrontageFt: 700,
  social: { facebook: "", instagram: "" },
};

export const webrez = {
  hotelId: 2784,
  locationId: 1261,
};

export const nav = [
  { href: "/cabins", label: "The Cabins" },
  { href: "/the-property", label: "The Mountain" },
  { href: "/#explore", label: "Explore" },
  { href: "/policies", label: "Good to Know" },
  { href: "/contact", label: "Contact" },
];

/** Drive times are approximate from the property. TODO(client): confirm once the address is settled. */
export const nearby = [
  { place: "Gatlinburg & the Parkway", time: "25 min", note: "Shops, dining and the Space Needle" },
  { place: "Pigeon Forge", time: "25 min", note: "Dollywood, shows and attractions" },
  { place: "Great Smoky Mountains NP", time: "20 min", note: "Hiking, waterfalls and wildlife" },
  { place: "Knoxville airport (TYS)", time: "1 hr", note: "The nearest airport" },
];

export const policies = {
  // TODO(client): WebRezPro shows "Reservations are Non refundable"; the old site describes
  // gift-certificate credits. Showing WebRezPro's wording until confirmed.
  cancellation: "Reservations are non-refundable. Please choose your dates carefully, and consider travel insurance.",
  items: [
    { title: "Check-in & checkout", body: `Check in after ${site.checkIn}; check out by ${site.checkOut}. Please call ahead on your arrival day.` },
    { title: "Adults only", body: `Our cabins are romantic retreats for two. Guests must be ${site.minAge} or older.` },
    { title: "Pets", body: "Pine Needle and Teaberry welcome pets by arrangement. All other cabins are pet-free." },
    { title: "No smoking", body: "All cabins are non-smoking, inside and on the decks." },
    { title: "Mountain roads", body: "The cabins sit up steep, winding gravel roads. In winter, a 4-wheel-drive vehicle or chains may be needed." },
    { title: "Stairs", body: "Most cabins are reached by wooden stairs to the deck." },
  ],
};
