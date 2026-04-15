import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "hero",
  icon: DocumentIcon,
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "text",
      rows: 3,
      description: "Use Enter to add a line break — each line renders on its own line in the hero.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "link",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      description: "Decorative background — no alt text required.",
      type: "image",
      options: { hotspot: true },
    }),
    colorSchemeField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Hero", subtitle: "Hero" };
    },
  },
});
