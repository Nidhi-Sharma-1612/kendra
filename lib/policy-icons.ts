import { CalendarCheck, KeyRound, Mountain, PawPrint, type LucideIcon } from "lucide-react";

/** Icon per Good to Know group, shared by the group headings (server) and the sticky index (client). */
export const GROUP_ICONS: Record<string, LucideIcon> = {
  stay: KeyRound,
  pets: PawPrint,
  mountain: Mountain,
  booking: CalendarCheck,
};
