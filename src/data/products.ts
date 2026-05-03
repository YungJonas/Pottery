export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  shape: "Totem" | "Amphora" | "Bottle" | "Donut" | "Handle" | "Wavy" | "Goblet" | "Bowl" | "Plate" | "Cup" | "Jug" | "Spiral";
  color: "terra" | "navy" | "olive" | "sage" | "sand" | "cream" | "charcoal";
  price: number;
  year: string;
  edition: string;
  description: string;
  imageUrl?: string;
}

const SHAPE_MAP: Record<string, Product["shape"]> = {
  Cups: "Cup",
  Bowls: "Bowl",
  Vases: "Amphora",
  Plates: "Plate",
  Jugs: "Jug",
};

export function mapSanityProduct(raw: any, index: number): Product {
  const category = raw.category || "Uncategorized";
  return {
    id: raw._id,
    slug: raw.slug || "",
    name: raw.title,
    category,
    shape: SHAPE_MAP[category] || "Bottle",
    color: "terra",
    price: raw.price,
    year: "2026",
    edition: "open",
    description: raw.description || "",
    imageUrl: raw.imageUrl || undefined,
  };
}

export const COLOR_MAP: Record<string, string> = {
  terra: "#B5532A",
  navy: "#22364A",
  olive: "#5C6233",
  sage: "#8FA17A",
  sand: "#A8916C",
  cream: "#E9DEC9",
  charcoal: "#2A2925",
};

export function frameBg(color: string): string {
  const dark = ["navy", "charcoal", "olive"];
  if (dark.includes(color)) return "#F6F1E6";
  if (color === "cream" || color === "sand") return "#8FA17A";
  if (color === "sage") return "#E9DEC9";
  return "#E9DEC9";
}
