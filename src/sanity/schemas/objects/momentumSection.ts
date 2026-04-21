import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "momentumSection",
  title: "Momentum Section",
  type: "object",
  icon: RocketIcon,
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
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [{ type: "ctaButton" }],
    }),
    { ...colorSchemeField, initialValue: "sky" },
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", projects: "projects" },
    prepare({ title, projects }) {
      return {
        title: title || "Momentum Section",
        subtitle: `Momentum Section — ${projects?.length ?? 0} projects`,
      };
    },
  },
});
