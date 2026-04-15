import { defineType, defineField, defineArrayMember } from "sanity";
import { ThListIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "featureGrid",
  icon: ThListIcon,
  title: "Feature Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
  ],
  preview: {
    select: { title: "heading", features: "features" },
    prepare({ title, features }) {
      return {
        title: title || "Feature Grid",
        subtitle: `Feature Grid — ${features?.length ?? 0} features`,
      };
    },
  },
});
