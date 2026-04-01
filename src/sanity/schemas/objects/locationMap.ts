import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons";

export default defineType({
  name: "locationMap",
  title: "Location Map",
  type: "object",
  icon: PinIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'e.g. "Access & Infrastructure"',
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
      name: "reachItems",
      title: "Reach Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "time",
              title: "Time / Distance",
              type: "string",
              description: 'e.g. "25 min", "60 min"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "place",
              title: "Destination",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { time: "time", place: "place" },
            prepare({ time, place }) {
              return { title: `${time} — ${place}` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "extraLine",
      title: "Extra Line",
      type: "string",
      description: 'Freeform line, e.g. "Active rail line with freight access"',
    }),
    defineField({
      name: "ctaButton",
      title: "CTA Button",
      type: "link",
    }),
    defineField({
      name: "mapImage",
      title: "Map Image",
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
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Location Map", subtitle: "Location Map" };
    },
  },
});
