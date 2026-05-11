import { defineType, defineField, defineArrayMember } from "sanity";
import { ChartUpwardIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "chartGrid",
  icon: ChartUpwardIcon,
  title: "Chart grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "charts",
      title: "Charts",
      type: "array",
      validation: (rule) => rule.min(1).error("Add at least one chart"),
      of: [
        defineArrayMember({
          type: "object",
          title: "Chart",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "title",
              title: "Chart title",
              type: "string",
            }),
            defineField({
              name: "chartType",
              title: "Chart type",
              type: "string",
              options: {
                list: [
                  { title: "Horizontal bars (good for comparing many labels)", value: "horizontalBar" },
                  { title: "Vertical bars", value: "bar" },
                  { title: "Pie", value: "pie" },
                  { title: "Line", value: "line" },
                  { title: "Area", value: "area" },
                ],
                layout: "radio",
              },
              initialValue: "horizontalBar",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "totalLabel",
              title: "Summary label",
              description: 'Optional, e.g. "Total property tax rate"',
              type: "string",
            }),
            defineField({
              name: "totalValue",
              title: "Summary value",
              type: "number",
            }),
            defineField({
              name: "items",
              title: "Data rows",
              type: "array",
              validation: (rule) => rule.min(1).error("Add at least one row"),
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "value",
                      title: "Value",
                      type: "number",
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: { label: "label", value: "value" },
                    prepare({ label, value }) {
                      return {
                        title: label ?? "Row",
                        subtitle: value != null ? String(value) : "",
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", chartType: "chartType" },
            prepare({ title, chartType }) {
              return {
                title: title || "Chart",
                subtitle: chartType ? String(chartType) : "",
              };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "Chart grid", subtitle: "Charts" };
    },
  },
});
