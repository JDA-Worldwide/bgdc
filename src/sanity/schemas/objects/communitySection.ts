import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "communitySection",
  title: "Community Section",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leadText",
      title: "Lead Text",
      type: "text",
      rows: 4,
      description: "Larger introductory paragraph",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 6,
      description: "Standard body paragraph below the lead",
    }),
    defineField({
      name: "images",
      title: "Photo Collage",
      type: "array",
      options: { modal: { type: "popover", width: 0 } },
      of: [
        defineArrayMember({
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
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    colorSchemeField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Community Section", subtitle: "Community Section" };
    },
  },
});
