/**
 * Smoky Mountain Guide posts. Bodies are Markdown (## headings build the article's index).
 *
 * TODO(client): these are a starter set drafted for launch. Kendra to review, edit or replace,
 * and send any posts of her own. Park details (closures, trail status, parking tags) change, so
 * re-check against nps.gov before publishing and once a year after.
 */

export type GuidePost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "Seasons" | "For two" | "Hiking";
  date: string; // YYYY-MM-DD
  image: { src: string; alt: string };
  /** Cabin slugs shown under the post as "Stay where the story happens". */
  cabins?: string[];
  body: string;
};

export const posts: GuidePost[] = [
  {
    slug: "fall-color-in-the-smokies",
    title: "Fall color in the Smokies: when to come and where to look",
    excerpt: "The leaves change from the top of the mountains down. Here's how to time your trip, and the drives and walks that show it off best.",
    category: "Seasons",
    date: "2026-11-20",
    image: { src: "/images/property/05.jpg", alt: "Layers of Smoky Mountain ridges in red, gold and green" },
    cabins: ["mountain-laurel", "forget-me-not"],
    body: `Fall is the busiest and most beautiful time of year in the Great Smoky Mountains. The park holds more than a hundred kinds of native trees, so instead of one color, whole ridges turn gold, copper, scarlet and plum at once.

## When the color peaks

Color starts at the highest elevations and works its way down the mountains over several weeks.

- **Late September to early October:** the high peaks and ridgelines turn first.
- **Mid-October to early November:** the peak for the middle and lower elevations, including the valleys around Gatlinburg, Pigeon Forge and Sevierville.

Every year is a little different. A dry summer or an early cold snap can shift things by a week or two, so it's worth checking a fall color report the week before you come.

## Drives worth taking

You can see a lot of color without leaving the car:

- **Newfound Gap Road** climbs from Gatlinburg over the crest of the mountains, through every elevation band in one drive.
- **Roaring Fork Motor Nature Trail** is a narrow, one-way loop just outside Gatlinburg, with old cabins, mossy streams and trailheads along the way. It closes for the winter, so go in fall.
- **Foothills Parkway** has wide, open overlooks with long views across the ridges.

Go early in the morning, especially on October weekends. The light is softer and the roads are quieter.

## Or stay right here

Some of the best color is on the mountain itself. Our 30 acres of hardwoods turn gold and red in October, and the River Path takes you down through them to the water. A slow morning on the deck, with coffee and the trees changing around you, is hard to beat.

## Good to know

- **Book early.** October is the busiest month of the year in the Smokies.
- **Bring layers.** Mornings can be cold and afternoons warm, and it's cooler at higher elevations.
- **Parking in the national park** needs a parking tag if you stop for more than 15 minutes. You can buy one online or at visitor centers.`,
  },
  {
    slug: "romantic-weekend-near-gatlinburg",
    title: "A romantic weekend near Gatlinburg: a two-day plan",
    excerpt: "Hot tubs, waterfalls, slow dinners and one very good view. A relaxed two-day plan for couples, built around your cabin.",
    category: "For two",
    date: "2026-11-12",
    image: { src: "/images/pine-needle/02.jpg", alt: "A king bed facing a stone fireplace, with a heart-shaped jacuzzi beside it" },
    cabins: ["pine-needle", "golden-glow"],
    body: `The best romantic weekends in the Smokies aren't packed with plans. This one leaves plenty of room for the fire, the hot tub and doing nothing at all.

## Day one: arrive and settle in

Check-in is from 4:00 PM, so pick up groceries and a bottle of something nice on the way. Follow the arrival directions we send, not your GPS, for the last stretch up the mountain.

Once you're in, light the fire and run the jacuzzi. Dinner at the cabin keeps the first night simple. End the night in the hot tub on the deck, listening to the woods.

## Day two: the mountains

Have a slow breakfast, then head into the national park.

- **Morning:** drive the Roaring Fork Motor Nature Trail (open spring to fall) and walk to **Grotto Falls**, an easy-to-moderate hike of about 2.6 miles round trip. The trail passes behind the waterfall.
- **Afternoon:** wander downtown Gatlinburg for a late lunch, coffee and a browse through the shops and galleries.
- **Evening:** come back up the mountain before dark for a sunset on the deck.

## Make it a little more special

If you're celebrating, tell us before you arrive. We can have roses or chocolates waiting, or arrange an in-cabin couples massage or a private chef dinner. See our [specials and add-ons](/specials) for ideas.

## Our tips for two

- **Pick a cabin with the view you want.** Every studio has a jacuzzi, a hot tub and a wood-burning fireplace. [Browse the cabins](/cabins) to choose.
- **Plan one big thing a day,** not three. The best part is the time in between.
- **Walk the River Path.** It's a private trail from the cabins down to a quiet bend in the river.`,
  },
  {
    slug: "waterfall-hikes-near-gatlinburg",
    title: "Waterfall hikes near Gatlinburg, from easy to all-day",
    excerpt: "Four waterfall walks within reach of the cabins, with distances, difficulty and the best time to go.",
    category: "Hiking",
    date: "2026-11-02",
    image: { src: "/images/property/02.jpg", alt: "A still river pool reflecting gold and orange trees" },
    body: `The Smokies get a lot of rain, and that means waterfalls everywhere. Here are four favorites near the cabins, from an easy morning stroll to a full-day climb.

## Grotto Falls (easy to moderate)

About **2.6 miles round trip** on the Trillium Gap Trail, off the Roaring Fork Motor Nature Trail. A gentle climb through old hemlock forest ends at a 25-foot waterfall you can walk behind. Best on a weekday morning. Roaring Fork closes for the winter, so this is a spring-to-fall hike.

## Hen Wallow Falls (moderate)

About **4.4 miles round trip** from the Cosby area, on the quieter northeast side of the park. The falls fan out over a wide rock face, about 90 feet tall. It's a good choice when the Gatlinburg trails are busy.

## Abrams Falls (moderate)

About **5 miles round trip** from Cades Cove. The trail follows Abrams Creek through the woods to a short, powerful waterfall that drops into a wide pool. Make a day of it with a drive around the Cades Cove loop and an eye out for deer and wild turkeys.

## Rainbow Falls (strenuous)

About **5.4 miles round trip** with a steady climb of around 1,500 feet. Rainbow Falls drops about 80 feet, and on a sunny afternoon the spray makes a rainbow. Allow most of a day and bring plenty of water.

## Before you go

- **Parking tags** are required to park in the national park for more than 15 minutes. Buy one online or at a visitor center.
- **Stay off the rocks at the top of waterfalls.** They're slippery and dangerous.
- **Check trail status** on the National Park Service website before you set out, since trails and roads close for repairs and weather.
- **Start early.** Trailhead parking fills fast in summer and fall.

After a long hike, nothing beats getting back to the cabin and into the hot tub.`,
  },
  {
    slug: "winter-in-the-smokies",
    title: "Winter in the Smokies: quiet trails, warm fires and holiday lights",
    excerpt: "Fewer crowds, clear views through bare trees and the best excuse for a fire. Why winter might be our favorite season, and how to plan for it.",
    category: "Seasons",
    date: "2026-10-24",
    image: { src: "/images/silver-bell/05.jpg", alt: "A crackling fire in a stone fireplace between two rocking chairs" },
    cabins: ["silver-bell", "passion-flower"],
    body: `Winter is the quiet season in the Smokies. The crowds thin out, the views open up through the bare trees, and a cabin with a fireplace and a hot tub feels exactly right.

## Why come in winter

- **Peace and quiet.** Trails, overlooks and restaurants are far less busy than in summer or fall.
- **Long views.** Without the leaves, you can see the shape of the mountains from the deck and the trails.
- **The occasional snow.** The high peaks often get a dusting. Watching it fall from a hot tub is something else.

## Holiday lights

From November into the new year, the towns light up. **Gatlinburg** and **Pigeon Forge** both put on their Winterfest light displays, and Dollywood's Christmas season is a favorite for many visitors. All are an easy drive from the cabins.

## Winter road tips

- **Some park roads close for the season.** The road to Kuwohi (formerly Clingmans Dome) and the Roaring Fork Motor Nature Trail close for the winter, and Newfound Gap Road can close temporarily in snow and ice.
- **Our roads are mountain roads.** The cabins sit up steep, winding gravel roads. In winter weather, a 4-wheel-drive vehicle or chains may be needed.
- **Use our directions, not your GPS,** for the last stretch to the cabin.

## Cabin days

On the coldest days, don't go anywhere. Bring a stack of books and something to cook slowly, keep the fire going, and alternate between the jacuzzi inside and the hot tub outside. That's what winter on the mountain is for.`,
  },
];
