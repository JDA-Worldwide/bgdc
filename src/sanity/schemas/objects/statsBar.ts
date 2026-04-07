import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChartIcon } from "@sanity/icons";

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
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'Display value, e.g. "13,000+", "$438,900", "Top 10"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", label: "label" },
            prepare({ value, label }) {
              return { title: value, subtitle: label };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { heading: "heading", stats: "stats" },
    prepare({ heading, stats }) {
      return {
        title: heading || "Stats Bar",
        subtitle: `${stats?.length ?? 0} stats`,
      };
    },
  },
});
