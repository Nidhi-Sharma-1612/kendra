/**
 * The twelve cabins at location 1261 in WebRezPro.
 *
 * Facts (guests, bedrooms, baths, pets, amenities, WebRez IDs) come from the WebRezPro booking
 * page (webrez-export/cabins.json). Taglines and stories are draft copy written from the photos
 * and WebRez captions; the owner is sending one or two unique details per cabin to refine them.
 * Photos are curated from the owner's Dropbox (scripts/photo-picks.json → public/images/<slug>).
 */

export type Motif = "bell" | "ray" | "five" | "berry" | "sprig" | "needle" | "spike";

export type Cabin = {
  slug: string;
  name: string;
  /** Field-guide plate number shown on cards (№ 01–12). */
  no: number;
  /** WebRezPro room type (invtype_id); keys the live rate feed. */
  webrezId: number;
  kind: "studio" | "two-bedroom";
  sleeps: number;
  bedrooms: number;
  baths: number;
  bed: string;
  pets: boolean;
  botanical: { latin: string; motif: Motif; note: string };
  tagline: string;
  story: string[];
  highlights: string[];
  /** Number of photos in public/images/<slug>/ (01.jpg is the cover). */
  photoCount: number;
  /** Alt text for the photos, in order. */
  photoAlts: string[];
};

const STUDIO_AMENITIES = [
  "Heart-shaped jacuzzi for two",
  "Private outdoor hot tub",
  "Wood-burning stone fireplace",
  "King bed",
  "Full kitchen with oven & stovetop",
  "Microwave & full-size fridge",
  "Coffee maker",
  "Air conditioning & heat",
  "Wi-Fi",
  "Smart TV",
  "Porch swing & rocking chairs",
  "Charcoal grill",
  "Plush robes",
  "Non-smoking",
];

export const amenitiesFor = (c: Cabin): string[] =>
  c.kind === "two-bedroom"
    ? [
        "Two bedrooms: king suite upstairs, queen downstairs",
        "Heart-shaped jacuzzi in the king suite",
        "Private hot tub under a gazebo",
        "Wood-burning stone fireplace",
        "Wrap-around covered porch with rockers",
        "Full kitchen with dishwasher",
        "Dining for six",
        "Two full bathrooms",
        "Washer & dryer",
        "Air conditioning & heat",
        "Wi-Fi",
        "Smart TV",
        "Charcoal grill",
        "Non-smoking",
      ]
    : [...STUDIO_AMENITIES, ...(c.pets ? ["Pet-friendly (by arrangement)"] : [])];

const studioStoryTail =
  "Inside, the whole cabin is one warm, knotty-pine room: a king bed facing the fireplace, a heart-shaped jacuzzi a few steps away, and a full kitchen for slow breakfasts. Outside, your own hot tub waits on the deck, with nothing but forest beyond the railing.";

export const cabins: Cabin[] = [
  {
    slug: "silver-bell",
    name: "Silver Bell",
    no: 1,
    webrezId: 38592,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Halesia tetraptera", motif: "bell", note: "Carolina silverbell, whose white bells hang from the branches each April" },
    tagline: "A steep-roofed A-frame under tall hardwoods",
    story: [
      "Silver Bell sits beneath a canopy of tall hardwoods, its peaked roof and red doors tucked into the green. A covered deck wraps the side of the cabin, with a porch swing and a hot tub looking straight into the trees.",
      studioStoryTail,
    ],
    highlights: ["Hand-crafted king tree bed", "Covered hot tub deck with porch swing", "Stone fireplace with rocking chairs"],
    photoCount: 14,
    photoAlts: ["Silver Bell cabin among tall trees", "Stone fireplace and king tree bed", "Hot tub on the covered deck", "Heart-shaped jacuzzi", "Fireplace with rocking chairs", "King tree bed", "Kitchen", "Bed and jacuzzi beside the fireplace", "Deck hot tub", "Bathroom", "Cabin and deck", "Smoky Mountain view nearby", "Silver Bell sign on the drive", "Wine by the fire"],
  },
  {
    slug: "golden-glow",
    name: "Golden Glow",
    no: 2,
    webrezId: 38597,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Rudbeckia laciniata", motif: "ray", note: "Golden glow, a tall coneflower that lights up summer clearings" },
    tagline: "Firelight, a teal jacuzzi and an open-air hot tub",
    story: [
      "Golden Glow is all about the light: late sun through the trees on its open deck, and firelight from a floor-to-ceiling stacked-stone hearth inside. The hot tub sits out in the open, so you can soak under the stars.",
      studioStoryTail,
    ],
    highlights: ["Stacked-stone fireplace", "Open-air hot tub deck", "Teal heart-shaped jacuzzi"],
    photoCount: 14,
    photoAlts: ["Golden Glow cabin in the woods", "Fireplace with deck hot tub beyond", "Open-air hot tub", "King tree bed", "Teal heart-shaped jacuzzi", "Stacked-stone fireplace", "Bed and jacuzzi", "Kitchen", "Cabin and deck", "Golden Glow sign", "Deck chairs", "Bathroom", "Smoky Mountain view nearby", "Glasses set for two"],
  },
  {
    slug: "passion-flower",
    name: "Passion Flower",
    no: 3,
    webrezId: 38586,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Passiflora incarnata", motif: "five", note: "Maypop, the native passionflower with its crown of purple filaments" },
    tagline: "Swing beside the hot tub, then fall into firelight",
    story: [
      "Passion Flower's covered deck holds a hanging porch swing right beside the hot tub, so one of you can swing while the other soaks. Fall color crowds the railing in October.",
      studioStoryTail,
    ],
    highlights: ["Porch swing beside the hot tub", "Red heart-shaped jacuzzi", "Stone fireplace with rockers"],
    photoCount: 13,
    photoAlts: ["Passion Flower cabin in fall color", "King bed with jacuzzi and fireplace", "Covered hot tub and porch swing", "Fireplace with rocking chairs", "Heart-shaped jacuzzi", "King tree bed", "Kitchen", "Porch swing and hot tub", "Passion Flower sign", "Fireplace and deck", "Roses and candles set for dinner", "Aerial view of fall color", "Bathroom"],
  },
  {
    slug: "teaberry",
    name: "Teaberry",
    no: 4,
    webrezId: 38596,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King bed",
    pets: true,
    botanical: { latin: "Gaultheria procumbens", motif: "berry", note: "Teaberry, the wintergreen groundcover with bright red berries" },
    tagline: "A pet-friendly cabin raised among the trees",
    story: [
      "Teaberry stands on tall supports among the trees, with stairs up to a deck where the hot tub sits under falling leaves. It is one of two cabins where your dog is welcome too.",
      studioStoryTail,
    ],
    highlights: ["Pet-friendly by arrangement", "Hot tub on a raised deck", "Red heart-shaped jacuzzi"],
    photoCount: 12,
    photoAlts: ["Teaberry cabin raised among the trees", "King bed by the fire", "Hot tub on the deck", "Fireplace with rocking chairs", "Heart-shaped jacuzzi", "Bed and jacuzzi", "Kitchen", "Hot tub with porch swing", "Table set by the fire", "Teaberry from the drive", "Bathroom", "Aerial view of the woods"],
  },
  {
    slug: "sweetbriar",
    name: "Sweetbriar",
    no: 5,
    webrezId: 38595,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King bed",
    pets: false,
    botanical: { latin: "Rosa rubiginosa", motif: "five", note: "Sweetbriar rose, whose leaves smell of green apples after rain" },
    tagline: "A classic Smoky Mountain A-frame with a green front door",
    story: [
      "Sweetbriar is the storybook A-frame: steep roof, green front door, and a deck with a hot tub, a swing and a charcoal grill. Inside, rocking chairs pull up to a wood-burning fire.",
      studioStoryTail,
    ],
    highlights: ["Classic A-frame cabin", "Hot tub and swing on the deck", "Wood-burning fireplace with rockers"],
    photoCount: 12,
    photoAlts: ["Sweetbriar A-frame cabin", "Bed facing the fireplace", "Hot tub on the deck", "Fireplace with rocking chairs", "Heart-shaped jacuzzi", "King bed", "Kitchen", "Table set by the fire", "Green front door", "Aerial view of the woods", "Bathroom", "Fall color on the property"],
  },
  {
    slug: "foxglove",
    name: "Foxglove",
    no: 6,
    webrezId: 38594,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Digitalis purpurea", motif: "spike", note: "Foxglove, tall spires of speckled bells beloved by bumblebees" },
    tagline: "A long deck in a sea of green",
    story: [
      "Foxglove's long deck runs out into the canopy, with a porch swing under a lattice roof and a hot tub just outside the sliding doors. From the property, the Smokies roll away in blue ridges.",
      studioStoryTail,
    ],
    highlights: ["Long deck with porch swing", "Stacked-stone fireplace", "Heart-shaped jacuzzi"],
    photoCount: 13,
    photoAlts: ["Foxglove cabin at the end of the drive", "Fireplace with rocking chairs", "Hot tub on the deck", "King tree bed", "Heart-shaped jacuzzi", "Fireplace", "Kitchen", "Porch swing on the deck", "Foxglove sign", "Bathroom", "Vintage radio", "Smoky Mountain view nearby", "Aerial view"],
  },
  {
    slug: "mountain-mint",
    name: "Mountain Mint",
    no: 7,
    webrezId: 38585,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Pycnanthemum", motif: "sprig", note: "Mountain mint, silvery and fragrant, a favorite of pollinators" },
    tagline: "Rockers by the fire, a swing by the hot tub",
    story: [
      "Mountain Mint looks out over the treetops toward ridge after ridge of forest. Its deck pairs a hot tub with a wooden swing, and inside, two rockers face a stone fireplace.",
      studioStoryTail,
    ],
    highlights: ["Hot tub with wooden swing", "Stone fireplace with rockers", "Red heart-shaped jacuzzi"],
    photoCount: 12,
    photoAlts: ["Mountain Mint cabin", "Fireplace with rocking chairs", "Hot tub and swing", "King tree bed and jacuzzi", "Heart-shaped jacuzzi", "King tree bed", "Kitchen", "Aerial view of the cabin in fall", "Carved Mountain Mint sign", "Table set by the fire", "Bathroom", "Fall ridges from above"],
  },
  {
    slug: "pine-needle",
    name: "Pine Needle",
    no: 8,
    webrezId: 38653,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: true,
    botanical: { latin: "Pinus strobus", motif: "needle", note: "Eastern white pine, soft needles in bundles of five" },
    tagline: "Pet-friendly, with a wide front porch and a covered hot tub",
    story: [
      "Pine Needle greets you with a wide front porch and a covered deck where the hot tub sits beside a hanging swing. It is one of two cabins where your dog is welcome too.",
      studioStoryTail,
    ],
    highlights: ["Pet-friendly by arrangement", "Covered hot tub with porch swing", "Stone-trimmed heart jacuzzi"],
    photoCount: 13,
    photoAlts: ["Pine Needle cabin and front porch", "Bed, jacuzzi and fireplace", "Covered hot tub and swing", "Heart-shaped jacuzzi with stone surround", "Stone fireplace", "King tree bed", "Kitchen", "Hot tub on the deck", "Porch view into the trees", "Vintage radio", "Bathroom", "Smoky Mountain view nearby", "Aerial view of the cabin"],
  },
  {
    slug: "mountain-camellia",
    name: "Mountain Camellia",
    no: 9,
    webrezId: 38593,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Stewartia ovata", motif: "five", note: "Mountain camellia, a rare native shrub with white, silk-like summer blooms" },
    tagline: "A teal jacuzzi, a stone hearth and a hand-carved sign",
    story: [
      "Mountain Camellia sits beside a walking trail in deep green woods, its name hand-carved on a sign by the door. The deck has a porch swing and a hot tub; inside, rockers face a tall stone fireplace.",
      studioStoryTail,
    ],
    highlights: ["Teal heart-shaped jacuzzi", "Tall stone fireplace", "Hot tub deck with porch swing"],
    photoCount: 12,
    photoAlts: ["Mountain Camellia cabin", "Fireplace with rocking chairs", "Hot tub deck", "Teal heart-shaped jacuzzi", "King tree bed", "Bed, jacuzzi and fireplace", "Kitchen", "Carved Mountain Camellia sign", "Mountain Camellia trail sign", "Hot tub in the trees", "Bathroom", "Cabin among the trees"],
  },
  {
    slug: "forget-me-not",
    name: "Forget Me Not",
    no: 10,
    webrezId: 38583,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Myosotis", motif: "five", note: "Forget-me-not, tiny sky-blue flowers with golden eyes" },
    tagline: "A treetop A-frame with mountain and garden views",
    story: [
      "Forget Me Not is perched high, an A-frame whose deck sits right in the treetops. The hot tub is out in the open with mountain and garden views, and string lights frame the stone fireplace inside.",
      studioStoryTail,
    ],
    highlights: ["Treetop deck with mountain views", "Fireplace framed in string lights", "Heart-shaped jacuzzi"],
    photoCount: 12,
    photoAlts: ["Forget Me Not A-frame in the treetops", "Fireplace with rocking chairs", "Hot tub on the treetop deck", "King tree bed", "Heart-shaped jacuzzi", "Bedroom", "Kitchen", "Deck swing and table", "Forget Me Not sign", "Bathroom", "Kitchen and dining", "Cabin from below"],
  },
  {
    slug: "mountain-berry",
    name: "Mountain Berry",
    no: 11,
    webrezId: 38584,
    kind: "studio",
    sleeps: 2,
    bedrooms: 0,
    baths: 1,
    bed: "King tree bed",
    pets: false,
    botanical: { latin: "Vaccinium", motif: "berry", note: "Wild mountain blueberry, ripening on the ridges in late summer" },
    tagline: "Up the stairs, into the canopy",
    story: [
      "Mountain Berry stands tall on its stilts, with a staircase up to the deck and its hot tub among the branches. In fall the whole hillside turns gold and red around it.",
      studioStoryTail,
    ],
    highlights: ["Raised deck in the canopy", "Stone fireplace with rockers", "Red heart-shaped jacuzzi"],
    photoCount: 12,
    photoAlts: ["Mountain Berry raised among fall color", "Fireplace with rocking chairs", "Hot tub on the deck", "King tree bed", "Heart-shaped jacuzzi", "Bed and jacuzzi", "Kitchen", "Roses and candles by the fire", "Carved Mountain Berry sign", "Hot tub deck", "Bathroom", "Aerial view in fall"],
  },
  {
    slug: "mountain-laurel",
    name: "Mountain Laurel",
    no: 12,
    webrezId: 38542,
    kind: "two-bedroom",
    sleeps: 6,
    bedrooms: 2,
    baths: 2,
    bed: "King + queen",
    pets: false,
    botanical: { latin: "Kalmia latifolia", motif: "five", note: "Mountain laurel, whose pink-white cups bloom across the Smokies in May" },
    tagline: "Our two-bedroom log cabin, with a gazebo hot tub",
    story: [
      "Mountain Laurel is the mountain's biggest cabin: a two-story log home with a wrap-around covered porch, rocking chairs and a hot tub under its own gazebo.",
      "Upstairs is a romantic king suite with a heart-shaped jacuzzi; downstairs there's a queen bedroom, a living room around a stone fireplace, a full kitchen and room at the table for everyone.",
    ],
    highlights: ["Two bedrooms, two baths", "Hot tub under a gazebo", "Wrap-around porch with rockers"],
    photoCount: 15,
    photoAlts: ["Mountain Laurel log cabin in fall", "Living room with stone fireplace", "Hot tub under the gazebo", "Upstairs heart-shaped jacuzzi", "King suite", "Downstairs queen bedroom", "Kitchen", "Living room", "Dining table", "Covered porch and gazebo", "Rocking chairs on the porch", "Mountain Laurel sign", "Aerial view in fall", "Stairs to the loft", "Cabin from the woods"],
  },
];

export const getCabin = (slug: string) => cabins.find((c) => c.slug === slug);

export const photo = (slug: string, i: number) => `/images/${slug}/${String(i + 1).padStart(2, "0")}.jpg`;
export const photos = (c: Cabin) => Array.from({ length: c.photoCount }, (_, i) => photo(c.slug, i));
export const cover = (c: Cabin) => photo(c.slug, 0);
