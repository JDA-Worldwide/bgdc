import { defineType, defineField, defineArrayMember } from "sanity";
import { TagIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "incentiveCards",
  icon: TagIcon,
  title: "Incentive Program Cards",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "programs",
      title: "Incentive Programs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "icon",
              title: "Icon (emoji or text)",
              type: "string",
              description: "Use an emoji, e.g. 💰 or 🏗️",
            }),
            defineField({
              name: "name",
              title: "Program Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "eligibility",
              title: "Who It's For",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "What It Offers",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "cta",
              title: "Call to Action",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "url", title: "URL", type: "string" }),
                defineField({
                  name: "isExternal",
                  title: "Open in New Tab",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: { name: "name", eligibility: "eligibility" },
            prepare({ name, eligibility }) {
              return { title: name || "Program", subtitle: eligibility };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading", programs: "programs" },
    prepare({ heading, programs }) {
      return {
        title: heading || "Incentive Cards",
        subtitle: `Incentive Cards — ${programs?.length ?? 0} programs`,
      };
    },
  },
});
