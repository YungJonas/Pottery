export type SkillLevel = "beginner" | "intermediate" | "all-levels";

export interface Workshop {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  startTime?: string;
  endTime?: string;
  time: string; // resolved display string
  location: string;
  price: number;
  maxParticipants: number;
  spotsRemaining: number;
  skillLevel?: SkillLevel;
  includes: string[];
  bring: string[];
  instructor?: { name: string; bio?: string };
  images: string[];
  imageUrl?: string;
}

function todayMidnight(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function isUpcoming(dateIso: string): boolean {
  return new Date(dateIso + "T00:00:00") >= todayMidnight();
}

export function isPast(dateIso: string): boolean {
  return new Date(dateIso + "T00:00:00") < todayMidnight();
}

function resolveTime(raw: any): string {
  if (raw.startTime && raw.endTime) return `${raw.startTime} – ${raw.endTime}`;
  if (raw.startTime) return raw.startTime;
  return raw.time || "";
}

export function mapSanityWorkshop(raw: any): Workshop {
  const max = typeof raw.maxParticipants === "number" ? raw.maxParticipants : 0;
  const remaining =
    typeof raw.spotsRemaining === "number" ? raw.spotsRemaining : max;

  return {
    id: raw._id,
    slug: raw.slug || "",
    title: raw.title,
    description: raw.description || "",
    date: raw.date,
    startTime: raw.startTime || undefined,
    endTime: raw.endTime || undefined,
    time: resolveTime(raw),
    location: raw.location,
    price: raw.price,
    maxParticipants: max,
    spotsRemaining: remaining,
    skillLevel: raw.skillLevel || undefined,
    includes: Array.isArray(raw.includes) ? raw.includes : [],
    bring: Array.isArray(raw.bring) ? raw.bring : [],
    instructor:
      raw.instructor && raw.instructor.name
        ? { name: raw.instructor.name, bio: raw.instructor.bio }
        : undefined,
    images: Array.isArray(raw.imageUrls)
      ? raw.imageUrls.filter(Boolean)
      : raw.imageUrl
        ? [raw.imageUrl]
        : [],
    imageUrl: raw.imageUrl || (Array.isArray(raw.imageUrls) ? raw.imageUrls[0] : undefined),
  };
}
