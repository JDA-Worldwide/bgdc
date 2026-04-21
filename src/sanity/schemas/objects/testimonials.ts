import { defineType, defineField, defineArrayMember } from "sanity";
import { CommentIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "testimonials",
  icon: CommentIcon,
  title: "Testimonials",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Carousel", value: "carousel" },
        ],
        layout: "radio",
      },
      initialValue: "grid",
    }),
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title / Company",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "title", media: "photo" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", items: "items" },
    prepare({ title, items }) {
      return {
        title: title || "Testimonials",
        subtitle: `Testimonials — ${items?.length ?? 0} items`,
      };
    },
  },
});
