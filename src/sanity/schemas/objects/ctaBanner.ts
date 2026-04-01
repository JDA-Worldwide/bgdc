import { defineType, defineField } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

export default defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'e.g. "Let\'s Talk"',
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
      rows: 3,
    }),
    defineField({
      name: "primaryButton",
      title: "Primary Button",
      type: "link",
    }),
    defineField({
      name: "secondaryButton",
      title: "Secondary Button",
      type: "link",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "CTA Banner", subtitle: "CTA Banner" };
    },
  },
});
