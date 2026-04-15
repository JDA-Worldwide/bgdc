import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "callout",
      title: "Callout",
      type: "string",
      description: 'Italic accent text above the heading, e.g. "Connected & Growing"',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(3),
      options: { modal: { type: "popover", width: 0 } },
      of: [
        {
          type: "object",
          name: "ctaButton",
          title: "Button",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "isExternal",
              title: "Open in New Tab",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "variant",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Primary (Filled)", value: "primary" },
                  { title: "Outline", value: "outline" },
                ],
                layout: "radio",
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "variant" },
          },
        },
      ],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Decorative background image — no alt text needed.",
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title ? `Homepage Hero — ${title}` : "Homepage Hero", subtitle: "Hero Section" };
    },
  },
});
