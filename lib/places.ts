import { FerrisWheel, Mountain, Navigation, Plane, ShoppingBag, type LucideIcon } from "lucide-react";
import { nearby } from "@/data/site";

/** Icon per nearby place, matched by name; falls back to a compass. */
export function iconFor(place: string): LucideIcon {
  if (/gatlinburg/i.test(place)) return ShoppingBag;
  if (/smoky|national/i.test(place)) return Mountain;
  if (/pigeon/i.test(place)) return FerrisWheel;
  if (/airport|tys/i.test(place)) return Plane;
  return Navigation;
}

/** "20 min" → 20, "1 hr" → 60. */
const minutes = (time: string) => {
  const n = parseFloat(time);
  return /hr|hour/i.test(time) ? n * 60 : n;
};

/** Nearby places, nearest first. */
export const nearbyByDistance = () => [...nearby].sort((a, b) => minutes(a.time) - minutes(b.time));
