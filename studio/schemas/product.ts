import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Cups", value: "Cups" },
          { title: "Bowls", value: "Bowls" },
          { title: "Vases", value: "Vases" },
          { title: "Plates", value: "Plates" },
          { title: "Jugs", value: "Jugs" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Single sentence shown on cards and detail meta block.",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "price",
      title: "Price (EUR)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions (cm)",
      type: "object",
      fields: [
        defineField({ name: "height", title: "Height", type: "number" }),
        defineField({ name: "width", title: "Width", type: "number" }),
      ],
    }),
    defineField({
      name: "care",
      title: "Care instructions",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      description: "Replaces the legacy 'available' boolean once filled in.",
      type: "string",
      options: {
        list: [
          { title: "Open — for sale", value: "open" },
          { title: "Sold", value: "sold" },
          { title: "Reserved", value: "reserved" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "available",
      title: "Available (legacy)",
      description: "Kept for backward compatibility. Prefer 'status' above.",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
