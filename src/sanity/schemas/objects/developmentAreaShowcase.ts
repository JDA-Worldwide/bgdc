import { defineType, defineField, defineArrayMember } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

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
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "areaLabel",
              title: "Area Label",
              type: "string",
              description: 'e.g. "Major Initiative | Planning & Development"',
            }),
            defineField({
              name: "statusLabel",
              title: "Status Label",
              type: "string",
              description: 'e.g. "In Progress", "Complete", "Coming Soon"',
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
              title: "Image",
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
              validation: (rule) =>
                rule.custom((cta: { label?: string; url?: string; file?: { asset?: unknown } } | undefined) => {
                  if (!cta?.label?.trim()) return true;
                  const hasUrl = Boolean(cta.url?.trim());
                  const hasFile = Boolean(cta.file?.asset);
                  if (!hasUrl && !hasFile) {
                    return "Add a URL or upload a file when the button has a label";
                  }
                  return true;
                }),
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "string",
                  description: "Internal path (e.g. /contact) or full URL. Ignored if a file is uploaded.",
                }),
                defineField({
                  name: "file",
                  title: "File",
                  type: "file",
                  description: "Optional. When set, the button downloads this file instead of using the URL.",
                }),
                defineField({
                  name: "isExternal",
                  title: "Open in New Tab",
                  type: "boolean",
                  initialValue: false,
                  description: "Applies when using URL only (not file download).",
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
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading", areas: "areas" },
    prepare({ heading, areas }) {
      return {
        title: heading || "Development Area Showcase",
        subtitle: `Dev Area Showcase — ${areas?.length ?? 0} areas`,
      };
    },
  },
});
