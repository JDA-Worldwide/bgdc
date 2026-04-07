import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons";

export default defineType({
  name: "mapSection",
  title: "Map Section",
  type: "object",
  icon: PinIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
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
    defineField({
      name: "destinations",
      title: "Travel Times",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "time",
              title: "Time",
              type: "string",
              description: 'e.g. "30 min."',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Destination",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { time: "time", label: "label" },
            prepare({ time, label }) {
              return { title: `${time} — ${label}` };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Map Section", subtitle: "Location Map" };
    },
  },
});
