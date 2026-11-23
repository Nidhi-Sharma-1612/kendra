/**
 * Business details, confirmed by the owner (Nov 2026). Everything the site shows about the business
 * comes from here, so a change is a one-line edit.
 */
export const site = {
  name: "Gatlinburg Adventure Cabins",
  /** The 30-acre preserve the cabins are built on; its trail runs down to the river bend. */
  place: "Wildflower Wilderness",
  url: "https://agatlinburgcabin.com",
  tagline: "Twelve hideaway cabins on the Wildflower Wilderness preserve",
  /** Call or text for bookings. */
  phone: "865-686-8200",
  phoneHref: "tel:+18656868200",
  smsHref: "sms:+18656868200",
  email: "stay@agatlinburgcabin.com",
  /** For maps: the start of the Wildflower Wilderness private drive. Check-in is electronic. */
  address: { street: "1717 Locust Ridge Rd", city: "Sevierville", region: "TN", zip: "37876" },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1717+Locust+Ridge+Rd%2C+Sevierville%2C+TN+37876",
  checkIn: "4:00 PM",
  checkOut: "11:00 AM",
  /** Applies to the primary renter on the booking. */
  minAge: 18,
  acres: 30,
  riverFrontageFt: 700,
  pets: { feePerDog: 50, maxDogs: 2 },
  social: { facebook: "", instagram: "" },
};

export const webrez = {
  hotelId: 2784,
  locationId: 1261,
};

export const nav = [
  { href: "/cabins", label: "The Cabins" },
  { href: "/the-property", label: "The Preserve" },
  { href: "/specials", label: "Specials" },
  { href: "/smoky-mountain-guide", label: "Smokies Guide" },
  { href: "/contact", label: "Contact" },
];

/** Drive times are approximate from the property. TODO(client): confirm. */
export const nearby = [
  { place: "Gatlinburg & the Parkway", time: "25 min", note: "Shops, dining and the Space Needle" },
  { place: "Pigeon Forge", time: "25 min", note: "Dollywood, shows and attractions" },
  { place: "Great Smoky Mountains NP", time: "20 min", note: "Hiking, waterfalls and wildlife" },
  { place: "Knoxville airport (TYS)", time: "1 hr", note: "The nearest airport" },
];

const petLine = `$${site.pets.feePerDog} per dog, up to ${site.pets.maxDogs} dogs. Need an exception? Just ask us.`;

export const policies = {
  cancellation: "Cancellation terms depend on your dates and are shown when you book.",
  pets: petLine,
  items: [
    {
      title: "Check-in & checkout",
      body: `Check in after ${site.checkIn}; check out by ${site.checkOut}. Check-in is electronic, and your arrival details are sent before your stay.`,
    },
    {
      title: "Age & families",
      body: `The primary renter must be ${site.minAge} or older. Mountain Laurel, our two-bedroom family cabin, welcomes children.`,
    },
    { title: "Pets", body: `Pine Needle, Teaberry, Mountain Camellia and Sweetbriar welcome dogs: ${petLine}` },
    { title: "No smoking", body: "All cabins are non-smoking, inside and on the decks." },
    { title: "Mountain roads", body: "The cabins sit up steep, winding gravel roads. In winter, a 4-wheel-drive vehicle or chains may be needed." },
    { title: "Stairs", body: "Most cabins are reached by wooden stairs to the deck." },
  ],
};
