/**
 * Arrival guide content: the private page sent to confirmed guests.
 *
 * TODO(client): EVERYTHING marked [PLACEHOLDER] comes from Kendra's arrival booklet (not yet received).
 * Replace each step's text, add a photo of each turn (public/images/arrival/step-NN.jpg, then set
 * `photo`), and fill in the door code process, Wi-Fi and house notes. Steps can be added or removed.
 */

/** The page lives at /<ARRIVAL_PATH>. Not linked anywhere, not in the sitemap, and noindex. Change it to rotate the link. */
export const ARRIVAL_PATH = "arrival-wf7k2m";

/** The landmark after which GPS goes wrong, used in the warning banner. */
export const gpsLandmark = "[PLACEHOLDER: the last turn or landmark]";

export type ArrivalStep = {
  title: string;
  body: string;
  /** Optional photo of this turn, e.g. "/images/arrival/step-01.jpg". */
  photo?: string;
  /** Short callout, e.g. distance or what to look for. */
  look?: string;
  warn?: boolean;
};

export const steps: ArrivalStep[] = [
  {
    title: "Head for the start of the private drive",
    body: "Set your maps app to the address below. It takes you to the start of the Wildflower Wilderness private drive. From there, stop using GPS and follow these steps.",
    look: "1717 Locust Ridge Rd, Sevierville",
  },
  {
    title: "[PLACEHOLDER] First turn",
    body: "[PLACEHOLDER: describe the turn, e.g. which direction, the road name and what guests will see just before it.]",
    look: "[PLACEHOLDER: landmark or distance]",
  },
  {
    title: "[PLACEHOLDER] Where GPS goes wrong",
    body: "[PLACEHOLDER: explain the route GPS suggests, why it's impassable, and which way to go instead.]",
    look: "[PLACEHOLDER: what to look for]",
    warn: true,
  },
  {
    title: "[PLACEHOLDER] Up the gravel road",
    body: "[PLACEHOLDER: describe the climb, any forks and which way to keep. Mention driving slowly and staying to the right on blind curves.]",
    look: "[PLACEHOLDER: distance]",
  },
  {
    title: "[PLACEHOLDER] Find your cabin's sign",
    body: "[PLACEHOLDER: describe the hand-carved signs and where each cabin's lane turns off. Your cabin's name is on your confirmation.]",
    look: "Hand-carved sign with your cabin's name",
  },
  {
    title: "[PLACEHOLDER] Park and head up",
    body: "[PLACEHOLDER: where to park, and the stairs up to the deck and front door.]",
  },
];

/** Getting in, and the house notes guests ask about. */
export const checkIn = [
  { title: "Your door code", body: "[PLACEHOLDER: how and when the door code is sent, e.g. by text on the morning of arrival.]" },
  { title: "Wi-Fi", body: "[PLACEHOLDER: network name and password, or where they're posted in the cabin.]" },
  { title: "Cell signal", body: "[PLACEHOLDER: what signal is like on the mountain, and which carriers work best.]" },
];

export const houseNotes = [
  { title: "Hot tub", body: "[PLACEHOLDER: cover, temperature and any rules.]" },
  { title: "Fireplace", body: "[PLACEHOLDER: firewood, how to light it safely and the damper.]" },
  { title: "Trash & wildlife", body: "[PLACEHOLDER: where trash goes. Bears live here, so never leave food or trash outside.]" },
  { title: "Checkout", body: "[PLACEHOLDER: checkout checklist, e.g. dishes, towels, hot tub cover, lock up.]" },
];
