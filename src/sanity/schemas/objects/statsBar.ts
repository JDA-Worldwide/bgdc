import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChartIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "statsBar",
  title: "Stats Bar",
  type: "object",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'e.g. "Bargersville by the Numbers"',
    }),
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
              description: "Numeric value for count-up animation (e.g. 13000, 15.1, 438900)",
            }),
            defineField({
              name: "prefix",
              title: "Prefix",
              type: "string",
              description: 'Text before the number, e.g. "$"',
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: 'Text after the number, e.g. "+", "%"',
            }),
            defineField({
              name: "textValue",
              title: "Text Value (override)",
              type: "string",
              description:
                'Use instead of number for non-numeric stats, e.g. "Top 10". Overrides the count-up animation.',
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
              textValue: "textValue",
              label: "label",
            },
            prepare({ number, prefix, suffix, textValue, label }) {
              const display =
                textValue || `${prefix ?? ""}${number ?? ""}${suffix ?? ""}`;
              return { title: display, subtitle: label };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    { ...colorSchemeField, initialValue: "dark" },
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading", stats: "stats" },
    prepare({ heading, stats }) {
      return {
        title: heading || "Stats Bar",
        subtitle: `Stats Bar — ${stats?.length ?? 0} stats`,
      };
    },
  },
});
