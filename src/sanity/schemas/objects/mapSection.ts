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
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.uri({ allowRelative: true }) }),
                  defineField({ name: "blank", title: "Open in New Tab", type: "boolean", initialValue: false }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "mapImage",
      title: "Map Image",
      type: "image",
      description: "Static corridor / regional map (replaces interactive Mapbox on the site).",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
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
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "Optional note beneath the destination in the sidebar list.",
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
