import { defineType, defineField, defineArrayMember } from "sanity";
import { BarChartIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "detailedStats",
  icon: BarChartIcon,
  title: "Detailed Statistics Panel",
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
      rows: 3,
    }),
    defineField({
      name: "categories",
      title: "Stat Categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "categoryName",
              title: "Category Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "stats",
              title: "Statistics",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  options: { collapsed: false },
                  fields: [
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "string",
                      description: 'e.g. "13,000+", "$438,900", "97%"',
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
            }),
          ],
          preview: {
            select: { categoryName: "categoryName" },
            prepare({ categoryName }) {
              return { title: categoryName || "Category" };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "Detailed Statistics", subtitle: "Detailed Statistics" };
    },
  },
});
