import { defineType, defineField, defineArrayMember } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export default defineType({
  name: "industriesGrid",
  title: "Industries Grid",
  type: "object",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "industries",
      title: "Industries",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "link",
            }),
          ],
          preview: {
            select: { title: "name", media: "image" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "link",
    }),
  ],
  preview: {
    select: { title: "heading", industries: "industries" },
    prepare({ title, industries }) {
      return {
        title: title || "Industries Grid",
        subtitle: `${industries?.length ?? 0} industries`,
      };
    },
  },
});
