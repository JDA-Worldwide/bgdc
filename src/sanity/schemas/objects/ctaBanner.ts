import { defineType, defineField } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "callout",
      title: "Callout",
      type: "string",
      description: 'Italic accent text, e.g. "Let\'s Talk"',
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
      name: "ctas",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [{ type: "ctaButton" }],
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      description: "Decorative background — no alt text required.",
      type: "image",
      options: { hotspot: true },
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "CTA Banner", subtitle: "CTA Banner" };
    },
  },
});
