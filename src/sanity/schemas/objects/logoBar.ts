import { defineType, defineField, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "logoBar",
  icon: ImagesIcon,
  title: "Logo Bar",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text (Company Name)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", logos: "logos" },
    prepare({ title, logos }) {
      return {
        title: title || "Logo Bar",
        subtitle: `Logo Bar — ${logos?.length ?? 0} logos`,
      };
    },
  },
});
