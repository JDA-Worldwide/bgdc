import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { anchorSlugField } from "./_anchorSlugField";

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
      type: "text",
      rows: 3,
      description: "Use Enter/Return to add line breaks in the rendered heading.",
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
      type: "image",
      options: { hotspot: true },
      description: "Decorative background image — no alt text needed.",
    }),
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Homepage Hero", subtitle: "Hero Section" };
    },
  },
});
