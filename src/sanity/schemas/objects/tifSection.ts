import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "tifSection",
  title: "TIF District Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "howItWorks",
      title: "How TIF Works (Plain Language)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "districts",
      title: "TIF Districts",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "District Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "eligibleUses",
              title: "Eligible Uses",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "contact",
              title: "Contact",
              type: "string",
            }),
          ],
          preview: {
            select: { name: "name" },
            prepare({ name }) {
              return { title: name || "TIF District" };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "mapImage",
      title: "TIF District Map",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "url", title: "URL", type: "string" }),
        defineField({
          name: "isExternal",
          title: "Open in New Tab",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "TIF District Section" };
    },
  },
});
