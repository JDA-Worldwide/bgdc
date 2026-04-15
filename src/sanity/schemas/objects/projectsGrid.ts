import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "projectsGrid",
  title: "Projects Grid",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
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
      name: "ctaButton",
      title: "CTA Button",
      type: "link",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "tag",
              title: "Tag Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "tagColor",
              title: "Tag Color",
              type: "string",
              options: {
                list: [
                  { title: "Active (Green)", value: "active" },
                  { title: "Planned (Blue)", value: "planned" },
                  { title: "Residential (Gold)", value: "residential" },
                  { title: "Commercial (Steel)", value: "commercial" },
                ],
                layout: "radio",
              },
              initialValue: "active",
            }),
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
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
              description: "Leave empty to show 'Details coming soon'",
            }),
          ],
          preview: {
            select: { title: "title", tag: "tag" },
            prepare({ title, tag }) {
              return { title, subtitle: tag };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    { ...colorSchemeField, initialValue: "surface" },
  ],
  preview: {
    select: { title: "heading", projects: "projects" },
    prepare({ title, projects }) {
      return {
        title: title || "Projects Grid",
        subtitle: `Projects Grid — ${projects?.length ?? 0} projects`,
      };
    },
  },
});
