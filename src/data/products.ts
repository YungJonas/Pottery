export type ProductStatus = "open" | "sold" | "reserved";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category?: string;
  shape: "Totem" | "Amphora" | "Bottle" | "Donut" | "Handle" | "Wavy" | "Goblet" | "Bowl" | "Plate" | "Cup" | "Jug" | "Spiral";
  color: "terra" | "navy" | "olive" | "sage" | "sand" | "cream" | "charcoal";
  price: number;
  year: string;
  edition: string;
  shortDescription?: string;
  description: string;
  care?: string;
  dimensions?: { h?: number; w?: number };
  status: ProductStatus;
  imageUrl?: string;
  images?: string[];
}

const SHAPE_MAP: Record<string, Product["shape"]> = {
  Cups: "Cup",
  Bowls: "Bowl",
  Vases: "Amphora",
  Plates: "Plate",
  Jugs: "Jug",
};

function deriveStatus(raw: any): ProductStatus {
  if (raw.status === "open" || raw.status === "sold" || raw.status === "reserved") {
    return raw.status;
  }
  // Legacy fallback
  return raw.available === false ? "sold" : "open";
}

export function mapSanityProduct(raw: any, index: number): Product {
  const category = raw.category || undefined;
  return {
    id: raw._id,
    slug: raw.slug || "",
    name: raw.title,
    category,
    shape: (category && SHAPE_MAP[category]) || "Bottle",
    color: "terra",
    price: raw.price,
    year: "2026",
    edition: "open",
    shortDescription: raw.shortDescription || undefined,
    description: raw.description || "",
    care: raw.care || undefined,
    dimensions: raw.dimensions
      ? { h: raw.dimensions.height, w: raw.dimensions.width }
      : undefined,
    status: deriveStatus(raw),
    imageUrl: raw.imageUrl || undefined,
    images: Array.isArray(raw.imageUrls) ? raw.imageUrls : undefined,
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
