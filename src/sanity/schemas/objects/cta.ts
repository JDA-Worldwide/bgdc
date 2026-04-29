import { defineType, defineField } from "sanity";
import { ArrowRightIcon } from "@sanity/icons";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "cta",
  icon: ArrowRightIcon,
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({ name: "href", title: "URL", type: "url", validation: (rule) => rule.uri({ allowRelative: true }) }),
                  defineField({ name: "blank", title: "Open in New Tab", type: "boolean", initialValue: false }),
                ],
              },
            ],
          },
        },
      ],
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
    defineField({
      name: "backgroundColor",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Brand Primary", value: "primary" },
          { title: "Surface", value: "surface" },
        ],
      },
      initialValue: "default",
    }),
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Call to Action", subtitle: "Call to Action" };
    },
  },
});
