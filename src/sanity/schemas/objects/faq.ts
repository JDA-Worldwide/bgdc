import { defineType, defineField, defineArrayMember } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "faq",
  icon: HelpCircleIcon,
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Questions & Answers",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "array",
              of: [{ type: "block" }],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "FAQ",
        subtitle: `FAQ — ${items?.length ?? 0} questions`,
      };
    },
  },
});
