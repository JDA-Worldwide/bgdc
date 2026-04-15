import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

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
      options: { modal: { type: "popover", width: 0 } },
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text (Company Name)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
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
