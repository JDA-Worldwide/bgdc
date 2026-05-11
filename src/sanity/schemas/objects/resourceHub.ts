import { defineType, defineField, defineArrayMember } from "sanity";
import { BookIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "resourceHub",
  icon: BookIcon,
  title: "Resource Hub",
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
      rows: 2,
    }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "title",
              title: "Resource Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              description: "One or more buttons for this card. When set, the single URL fields below are ignored.",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "linkLabel",
                      title: "Link Label",
                      type: "string",
                      initialValue: "View Resource",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "isExternal",
                      title: "Open in New Tab",
                      type: "boolean",
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: { linkLabel: "linkLabel", url: "url" },
                    prepare({ linkLabel, url }) {
                      return {
                        title: linkLabel || "Link",
                        subtitle: url || "",
                      };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: "linkLabel",
              title: "Link Label (single link)",
              type: "string",
              description: "Used only when Links is empty.",
              initialValue: "View Resource",
            }),
            defineField({
              name: "url",
              title: "URL (single link)",
              type: "string",
              description: "Used only when Links is empty. Leave blank to show a “coming soon” state.",
            }),
            defineField({
              name: "isExternal",
              title: "Open in New Tab (single link)",
              type: "boolean",
              description: "Used only when Links is empty.",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "title", url: "url", links: "links" },
            prepare({ title, url, links }) {
              const linkCount = Array.isArray(links)
                ? links.filter((l: { url?: string } | undefined) => !!l?.url).length
                : 0;
              let subtitle: string;
              if (linkCount > 0) {
                subtitle =
                  linkCount === 1 ? `${linkCount} link` : `${linkCount} links`;
              } else if (url) {
                subtitle = url;
              } else {
                subtitle = "Link coming soon";
              }
              return { title: title || "Resource", subtitle };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading", resources: "resources" },
    prepare({ heading, resources }) {
      return {
        title: heading || "Resource Hub",
        subtitle: `Resource Hub — ${resources?.length ?? 0} resources`,
      };
    },
  },
});
