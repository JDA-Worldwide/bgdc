import { defineType, defineField, defineArrayMember } from "sanity";
import { PinIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

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
      name: "ctas",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [{ type: "ctaButton" }],
    }),
    defineField({
      name: "mapCenter",
      title: "Map Center",
      type: "object",
      description: "Longitude/latitude for the map center point. Defaults to Bargersville, IN.",
      fields: [
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
          initialValue: -86.164665,
          validation: (rule) => rule.min(-180).max(180),
        }),
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
          initialValue: 39.521121,
          validation: (rule) => rule.min(-90).max(90),
        }),
      ],
    }),
    defineField({
      name: "mapZoom",
      title: "Map Zoom Level",
      type: "number",
      description: "1 (world) – 20 (street level). Default: 9.",
      initialValue: 9,
      validation: (rule) => rule.min(1).max(20),
    }),
    defineField({
      name: "mapImage",
      title: "Map Image (Fallback)",
      type: "image",
      description: "Static fallback image shown when Mapbox token is not configured.",
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
    { ...colorSchemeField, initialValue: "dark" },
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Location Map", subtitle: "Location Map" };
    },
  },
});
