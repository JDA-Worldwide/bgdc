import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChartIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "statsCounter",
  icon: BarChartIcon,
  title: "Stats Counter",
  type: "object",
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "number",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
              description: 'e.g. "$"',
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: 'e.g. "+", "%", "K"',
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              number: "number",
              prefix: "prefix",
              suffix: "suffix",
              label: "label",
            },
            prepare({ number, prefix, suffix, label }) {
              return {
                title: `${prefix ?? ""}${number}${suffix ?? ""}`,
                subtitle: label,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { stats: "stats" },
    prepare({ stats }) {
      return {
        title: "Stats Counter",
        subtitle: `Stats Counter — ${stats?.length ?? 0} stats`,
      };
    },
  },
});
