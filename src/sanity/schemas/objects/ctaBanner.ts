import { defineType, defineField } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "ctaBanner",
  title: "CTA Banner",
  type: "object",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "callout",
      title: "Callout",
      type: "string",
      description: 'Italic accent text, e.g. "Let\'s Talk"',
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
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
      return { title: title ? `CTA Banner — ${title}` : "CTA Banner", subtitle: "CTA Banner" };
    },
  },
});
