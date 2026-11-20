import { getCabin } from "@/data/cabins";
import { getNights } from "@/lib/webrez";

/** GET /api/rates?cabin=<slug>&start=yyyy-mm-dd → that cabin's nights for ~2 months. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const cabin = getCabin(url.searchParams.get("cabin") ?? "");
  const start = url.searchParams.get("start") ?? "";
  if (!cabin || !/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    return Response.json({ error: "cabin and start (yyyy-mm-dd) are required" }, { status: 400 });
  }
  const nights = await getNights(cabin.webrezId, start);
  return Response.json({ nights }, { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" } });
}
