import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "partnersTicker",
  title: "Partners Ticker",
  type: "object",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: 'e.g. "Businesses & Partners"',
      initialValue: "Businesses & Partners",
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      options: { modal: { type: "popover", width: 0 } },
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
          ],
          preview: {
            select: { title: "name" },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { partners: "partners" },
    prepare({ partners }) {
      return {
        title: "Partners Ticker",
        subtitle: `Partners Ticker — ${partners?.length ?? 0} partners`,
      };
    },
  },
});
