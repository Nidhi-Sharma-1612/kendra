import { cabins } from "@/data/cabins";
import { getSiteAvailability } from "@/lib/webrez";

/** GET /api/availability?start=yyyy-mm-dd → every cabin's bookable nights for ~2 months (search calendar). */
export async function GET(request: Request) {
  const start = new URL(request.url).searchParams.get("start") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    return Response.json({ error: "start (yyyy-mm-dd) is required" }, { status: 400 });
  }
  const nights = await getSiteAvailability(
    cabins.map((c) => c.webrezId),
    start,
  );
  return Response.json({ nights }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
}
