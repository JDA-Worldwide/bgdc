import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons";
import { anchorSlugField } from "./_anchorSlugField";

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
      name: "mapCenterAddress",
      title: "Map Center — Location",
      type: "string",
      description:
        'Address or place name for the primary pin, e.g. "Bargersville, IN". Leave blank to use the default.',
    }),
    defineField({
      name: "mapCenterLabel",
      title: "Map Center — Pin Label",
      type: "string",
      description: "Label shown on the primary pin popup.",
    }),
    defineField({
      name: "zoom",
      title: "Map Zoom Level",
      type: "number",
      description: "1 (world) – 20 (street level). Default: 9.",
      initialValue: 9,
      validation: (rule) => rule.min(1).max(20),
    }),
    defineField({
      name: "destinations",
      title: "Travel Times",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
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
              title: "Destination Label",
              type: "string",
              description: "Display name shown in the travel-times list.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "address",
              title: "Location",
              type: "string",
              description:
                'Address or place name used to plot the map marker, e.g. "Indianapolis International Airport, IN". Leave blank to omit the pin.',
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
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Map Section", subtitle: "Map Section" };
    },
  },
});
