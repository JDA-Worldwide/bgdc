import { defineType, defineField, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "communitySection",
  title: "Stacked Photos and Text",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "leadText",
      title: "Lead Text",
      type: "text",
      rows: 4,
      description: "Larger introductory paragraph",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "Supports multiple paragraphs, bold, italic, and links",
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
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) => rule.uri({ allowRelative: true }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in New Tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: "images",
      title: "Photo Collage",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true, collapsed: false },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Stacked Photos and Text", subtitle: "Stacked Photos and Text" };
    },
  },
});
