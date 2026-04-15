import { defineType, defineField, defineArrayMember } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "developmentAreaShowcase",
  icon: EarthGlobeIcon,
  title: "Development Area Showcase",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "areas",
      title: "Development Areas",
      type: "array",
      options: { modal: { type: "popover", width: 0 } },
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "areaLabel",
              title: "Area Label",
              type: "string",
              description: 'e.g. "High-Visibility | Interstate Access | Commercial & Industrial"',
            }),
            defineField({
              name: "title",
              title: "Area Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body Copy",
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
                          defineField({
                            name: "href",
                            title: "URL",
                            type: "url",
                            validation: (rule) => rule.uri({ allowRelative: true }),
                          }),
                          defineField({
                            name: "blank",
                            title: "Open in New Tab",
                            type: "boolean",
                            initialValue: false,
                          }),
                        ],
                      },
                    ],
                  },
                },
              ],
            }),
            defineField({
              name: "opportunities",
              title: "Available Opportunities",
              type: "array",
              of: [{ type: "string" }],
              description: "Bullet list of available parcels, zoning, utilities, etc.",
            }),
            defineField({
              name: "mapImage",
              title: "Parcel / Area Map",
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
                defineField({
                  name: "url",
                  title: "URL",
                  type: "string",
                }),
                defineField({
                  name: "isExternal",
                  title: "Open in New Tab",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", areaLabel: "areaLabel" },
            prepare({ title, areaLabel }) {
              return { title: title || "Development Area", subtitle: areaLabel };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading", areas: "areas" },
    prepare({ heading, areas }) {
      return {
        title: heading || "Development Area Showcase",
        subtitle: `${areas?.length ?? 0} areas`,
      };
    },
  },
});
