import { defineType, defineField, defineArrayMember } from "sanity";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "resourceHub",
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
          fields: [
            defineField({
              name: "icon",
              title: "Icon (emoji)",
              type: "string",
              description: "Use an emoji, e.g. 🗺️ or 📄",
            }),
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
              name: "linkLabel",
              title: "Link Label",
              type: "string",
              initialValue: "View Resource",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Leave blank to show a 'coming soon' state",
            }),
            defineField({
              name: "isExternal",
              title: "Open in New Tab",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "title", url: "url" },
            prepare({ title, url }) {
              return { title: title || "Resource", subtitle: url || "Link coming soon" };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading", resources: "resources" },
    prepare({ heading, resources }) {
      return {
        title: heading || "Resource Hub",
        subtitle: `${resources?.length ?? 0} resources`,
      };
    },
  },
});
