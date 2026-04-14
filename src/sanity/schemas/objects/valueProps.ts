import { defineType, defineField, defineArrayMember } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "valueProps",
  title: "Value Propositions",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 3,
      description: 'Multiline heading, e.g. "The Right Location.\\nThe Right Place.\\nThe Right Partner."',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "image",
              description: "Small icon for this card (SVG recommended)",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Leave blank for decorative icons",
                }),
              ],
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", media: "icon" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    { ...colorSchemeField, initialValue: "dark" },
  ],
  preview: {
    select: { title: "heading", cards: "cards" },
    prepare({ title, cards }) {
      return {
        title: title?.split("\n")[0] || "Value Props",
        subtitle: `${cards?.length ?? 0} cards`,
      };
    },
  },
});
