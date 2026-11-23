/**
 * Specials (the old site's "Packages" page). Content carried over from agatlinburgcabin.com/packages.
 * TODO(client): Kendra to confirm which packages and add-ons are still offered, prices, and any
 * seasonal offers. Never publish a price or discount she hasn't confirmed.
 */

export type Special = {
  id: string;
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
  includes: string[];
  image: { src: string; alt: string; position?: string };
  /** Optional, e.g. "Best for 5–7 nights". */
  note?: string;
};

export const specials: Special[] = [
  {
    id: "honeymoon",
    eyebrow: "Honeymoon",
    title: "A honeymoon",
    accent: "planned around you.",
    body: "Tell us how you'd like to spend your first days married, and we'll build a custom itinerary around your cabin: slow mornings, mountain days and evenings by the fire.",
    includes: ["A custom honeymoon itinerary", "Add-ons waiting when you arrive", "Help booking dinners, shows and outings"],
    image: { src: "/images/mountain-mint/05.jpg", alt: "A heart-shaped red jacuzzi in a wood-paneled cabin, with roses on its edge" },
    note: "Best for 5–7 nights",
  },
  {
    id: "celebration",
    eyebrow: "Anniversaries & proposals",
    title: "Set the scene",
    accent: "for the big moment.",
    body: "Planning a proposal or marking another year together? Share the plan, and we'll have the cabin ready with flowers, chocolates or a quiet dinner by the fire.",
    includes: ["Roses and chocolates in the cabin", "A private chef dinner", "An in-cabin couples massage"],
    image: { src: "/images/mountain-mint/10.jpg", alt: "A table set with crystal glasses in front of a glowing fireplace", position: "40% 50%" },
  },
  {
    id: "adventure",
    eyebrow: "Smokies adventure",
    title: "Days out,",
    accent: "arranged for you.",
    body: "Want to get out on the mountain? We can help arrange guides and tickets, so all you need to do is show up.",
    includes: ["Hiking and fly-fishing guides", "Llama trekking and zip lining", "Show tickets, and skiing in winter"],
    image: { src: "/images/property/03.jpg", alt: "Boulders in a calm stretch of river under fall-colored hills" },
  },
];

/** In-cabin add-ons. Prices on request. */
export const addOns = [
  { title: "Couples massage", body: "In your cabin, by the fire." },
  { title: "Private chef", body: "Dinner cooked for two, at home." },
  { title: "A dozen roses", body: "Waiting when you arrive." },
  { title: "Fine chocolates", body: "A box to share." },
  { title: "Custom snack basket", body: "Filled with your favorites." },
  { title: "Whisperwood Farm herbal tea", body: "Local, for slow mornings." },
  { title: "Homemade soap", body: "Small-batch, to take home." },
];
