import { defineType, defineField, defineArrayMember } from "sanity";
import { StarIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "incentivesGrid",
  title: "Incentives Grid",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      validation: (rule) => rule.max(3),
      of: [{ type: "ctaButton" }],
    }),
    defineField({
      name: "incentives",
      title: "Incentives",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Finance / TIF", value: "finance" },
                  { title: "People / Attraction", value: "people" },
                  { title: "Building / Development", value: "building" },
                  { title: "Map / Resources", value: "map" },
                  { title: "Shield / Protection", value: "shield" },
                  { title: "Document / Permits", value: "document" },
                ],
              },
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
              rows: 4,
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(4),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", incentives: "incentives" },
    prepare({ title, incentives }) {
      return {
        title: title || "Incentives Grid",
        subtitle: `Incentives Grid — ${incentives?.length ?? 0} incentives`,
      };
    },
  },
});
