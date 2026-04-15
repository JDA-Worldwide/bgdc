import { defineType, defineField, defineArrayMember } from "sanity";
import { BlockContentIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "whyPillars",
  title: "Why Pillars",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'e.g. "Why Bargersville?"',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Location / Crosshair", value: "location" },
                  { title: "Building / Place", value: "place" },
                  { title: "Handshake / Business", value: "business" },
                  { title: "Growth / Chart", value: "growth" },
                  { title: "Shield / Trust", value: "shield" },
                  { title: "People / Community", value: "people" },
                ],
              },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    colorSchemeField,
  ],
  preview: {
    select: { title: "heading", pillars: "pillars" },
    prepare({ title, pillars }) {
      return {
        title: title || "Why Pillars",
        subtitle: `Why Pillars — ${pillars?.length ?? 0} pillars`,
      };
    },
  },
});
