// Curated product catalog + palette presets for Lesley / Ceramics.

const PRODUCTS = [
  { id: "p01", name: "Hestia Vessel",     category: "Vases",  shape: "Amphora", color: "terracotta", price: 184, year: "2024", edition: "1 of 12", desc: "Wide-shoulder amphora, hand-thrown in iron-rich clay. Wood-fired, unglazed exterior." },
  { id: "p02", name: "Tide Bottle No. 04",category: "Vases",  shape: "Bottle",  color: "navy",       price: 162, year: "2024", edition: "1 of 8",  desc: "Long-neck bottle vase. Slip-poured rim, cobalt under matte glaze." },
  { id: "p03", name: "Mossbloom",         category: "Vases",  shape: "Donut",   color: "olive",      price: 220, year: "2025", edition: "1 of 6",  desc: "Hollow-belly silhouette. Sculpted then closed at the top. Olive ash glaze." },
  { id: "p04", name: "Two-Hand Pot",      category: "Pots",   shape: "Handle",  color: "sand",       price: 245, year: "2024", edition: "1 of 9",  desc: "Twin-loop garden pot. Drainage hole. Holds a 24cm root ball." },
  { id: "p05", name: "Spine Column",      category: "Vases",  shape: "Wavy",    color: "cream",      price: 198, year: "2025", edition: "1 of 5",  desc: "Five-bulb tower in white stoneware. Stacked, never poured." },
  { id: "p06", name: "Goblet of Hours",   category: "Cups",   shape: "Goblet",  color: "charcoal",   price: 88,  year: "2025", edition: "open",    desc: "Wide-foot goblet. Unglazed foot, satin black glaze inside." },
  { id: "p07", name: "Low Bowl 02",       category: "Bowls",  shape: "Bowl",    color: "terracotta", price: 76,  year: "2024", edition: "open",    desc: "Cereal-sized everyday bowl. Iron speckle, food-safe." },
  { id: "p08", name: "Plain Plate",       category: "Plates", shape: "Plate",   color: "cream",      price: 64,  year: "2024", edition: "open",    desc: "26cm dinner plate. Soft cream glaze, dishwasher-safe." },
  { id: "p09", name: "Morning Cup",       category: "Cups",   shape: "Cup",     color: "sage",       price: 52,  year: "2025", edition: "open",    desc: "320ml mug, wide-handle. Sage celadon. Stacks of four." },
  { id: "p10", name: "Carafe Calla",      category: "Vases",  shape: "Jug",     color: "terracotta", price: 168, year: "2025", edition: "1 of 7",  desc: "Pulled-spout carafe. Doubles as a slim vase for stems." },
  { id: "p11", name: "Stoa Totem",        category: "Sculpt", shape: "Totem",   color: "sand",       price: 310, year: "2025", edition: "1 of 4",  desc: "Decorative double-bulb totem. Solid hand-built form." },
  { id: "p12", name: "Deep Bowl 04",      category: "Bowls",  shape: "Bowl",    color: "navy",       price: 92,  year: "2024", edition: "open",    desc: "Pasta / serving bowl. Indigo dip-glaze, raw rim." },
];

// Earth palette — drawn from moodboard 5
const PALETTES = {
  earth: {
    name: "Earth",
    bg: "#EFE7DA",        // sand / paper
    ink: "#1C1B17",        // near-black
    paper: "#F6F1E6",      // hero panel
    terracotta: "#B5532A",
    navy: "#22364A",
    olive: "#5C6233",
    sage: "#8FA17A",
    sand: "#A8916C",
    cream: "#E9DEC9",
    charcoal: "#2A2925",
    rust: "#C76B3A",
  },
  cool: {
    name: "Editorial",
    bg: "#F2EEE7",
    ink: "#0F0F0E",
    paper: "#FAF7F0",
    terracotta: "#D8552B",
    navy: "#1B2D3F",
    olive: "#454B25",
    sage: "#8FA17A",
    sand: "#B7A07A",
    cream: "#E5DECF",
    charcoal: "#1A1A18",
    rust: "#D8552B",
  },
  warm: {
    name: "Clay",
    bg: "#E8D9C2",
    ink: "#221813",
    paper: "#F4E8D5",
    terracotta: "#A24323",
    navy: "#2B2418",
    olive: "#6B5A2E",
    sage: "#9C9268",
    sand: "#B0936A",
    cream: "#EAD9B8",
    charcoal: "#2B2418",
    rust: "#B5532A",
  },
};

const CATEGORIES = [
  { key: "Vases",  count: 5, shape: "Amphora", swatch: "terracotta" },
  { key: "Pots",   count: 1, shape: "Handle",  swatch: "sand" },
  { key: "Bowls",  count: 2, shape: "Bowl",    swatch: "navy" },
  { key: "Plates", count: 1, shape: "Plate",   swatch: "olive" },
  { key: "Cups",   count: 2, shape: "Cup",     swatch: "sage" },
  { key: "Sculpt", count: 1, shape: "Totem",   swatch: "charcoal" },
];

// map shape color tokens → palette keys
function colorOf(p, P) { return P[p.color] || P.terracotta; }

window.PRODUCTS = PRODUCTS;
window.PALETTES = PALETTES;
window.CATEGORIES = CATEGORIES;
window.colorOf = colorOf;
