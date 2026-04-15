import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "ctaButton",
  title: "Button",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageRef",
      title: "Page",
      description: "Link to an internal page. Leave blank for an external URL.",
      type: "reference",
      to: [{ type: "page" }],
      weak: true,
    }),
    defineField({
      name: "url",
      title: "External URL",
      description: "Only used when linking outside the site.",
      type: "string",
    }),
    defineField({
      name: "isExternal",
      title: "Open in New Tab",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "variant",
      title: "Style",
      type: "string",
      options: {
        list: [
          { title: "Dark Blue (filled)", value: "blue-dark" },
          { title: "Dark Blue (filled, white hover)", value: "blue-dark-alt" },
          { title: "Dark Blue (outline)", value: "blue-dark-outline" },
          { title: "Light Blue (filled)", value: "blue-light" },
          { title: "Light Blue (filled, white hover)", value: "blue-light-alt" },
          { title: "Light Blue (outline)", value: "blue-light-outline" },
        ],
        layout: "dropdown",
      },
      initialValue: "blue-dark",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "variant" },
  },
});
