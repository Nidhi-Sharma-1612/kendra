import { cabins } from "@/data/cabins";
import { getFromPrices } from "@/lib/webrez";
import { Hero } from "@/components/home/Hero";
import { InsideEveryCabin } from "@/components/home/InsideEveryCabin";
import { CabinsShowcase } from "@/components/home/CabinsShowcase";
import { MadeForTwo } from "@/components/home/MadeForTwo";
import { RiverPath } from "@/components/home/RiverPath";
import { Explore } from "@/components/home/Explore";
import { BookDirect } from "@/components/home/BookDirect";

export const revalidate = 3600;

/**
 * Homepage, top to bottom: full-bleed hero with search → inside every cabin (bento) → featured
 * cabins → made for two (heather band) → the River Path → explore the Smokies → book direct.
 */
export default async function Home() {
  const prices = await getFromPrices(cabins.map((c) => c.webrezId));

  return (
    <>
      <Hero />
      <InsideEveryCabin />
      <CabinsShowcase cabins={cabins} prices={prices} />
      <MadeForTwo />
      <RiverPath />
      <Explore />
      <BookDirect />
    </>
  );
}
