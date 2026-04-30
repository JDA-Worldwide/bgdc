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
            defineField({
              name: "showOnMap",
              title: "Show on Map?",
              type: "boolean",
              description: "Plot this location as a marker on the map.",
              initialValue: true,
              hidden: ({ parent }) => !parent?.address,
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              description: "Optional note shown beneath the label in the sidebar list. Never shown on the map.",
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
