import { defineType, defineField } from "sanity";

export default defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startTime",
      title: "Start time",
      description: 'e.g. "14:00"',
      type: "string",
    }),
    defineField({
      name: "endTime",
      title: "End time",
      description: 'e.g. "17:00"',
      type: "string",
    }),
    defineField({
      name: "time",
      title: "Time (legacy)",
      description: 'Legacy free-form string, e.g. "14:00 – 17:00". Prefer startTime / endTime above.',
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (EUR)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "maxParticipants",
      title: "Max. participants",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "spotsRemaining",
      title: "Spots remaining",
      description: "Falls back to maxParticipants if not set.",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "skillLevel",
      title: "Skill level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "All levels", value: "all-levels" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "includes",
      title: "What's included",
      description: "Bullet list of what attendees get / what they'll make.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bring",
      title: "What to bring",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "instructor",
      title: "Instructor",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "bio", title: "Bio", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "image",
      title: "Image (legacy)",
      description: "Single image, kept for backward compatibility. Prefer 'images' above.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
