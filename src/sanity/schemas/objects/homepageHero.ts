import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'Small uppercase label above the heading, e.g. "Connected & Growing"',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'Full heading text, e.g. "Grow Where Access Meets Opportunity"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "accentPhrase",
      title: "Accent Phrase",
      type: "string",
      description:
        "The portion of the heading to highlight in gold. Must match text within the heading exactly.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "link",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Link",
      type: "link",
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value",
              type: "string",
              description: 'Main number or text, e.g. "11", "25", "I", "Pro"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: 'Unit or modifier, e.g. "K+", "mi", "-69", "+"',
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", description: "description" },
            prepare({ value, suffix, description }) {
              return {
                title: `${value}${suffix || ""}`,
                subtitle: description,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "backgroundImage",
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
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Homepage Hero", subtitle: "Homepage Hero" };
    },
  },
});
