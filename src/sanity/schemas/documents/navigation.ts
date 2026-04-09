import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      description: "Optional — defaults to the linked page title if left blank.",
      type: "string",
    }),
    defineField({
      name: "ctaPage",
      title: "CTA Button Page",
      description: "The page the CTA button links to.",
      type: "reference",
      to: [{ type: "page" }],
      weak: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              description: "Optional — defaults to the linked page title if left blank.",
              type: "string",
            }),
            defineField({
              name: "pageRef",
              title: "Page",
              description: "Link to an internal page. Leave blank for external URLs.",
              type: "reference",
              to: [{ type: "page" }],
              weak: true,
            }),
            defineField({
              name: "url",
              title: "External URL",
              description: "Only used when linking to an external site.",
              type: "string",
            }),
            defineField({
              name: "isExternal",
              title: "Open in New Tab",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              of: [{ type: "link" }],
            }),
          ],
          validation: (rule) =>
            rule.custom((value: { pageRef?: unknown; url?: string } | undefined) => {
              if (!value) return true;
              if (!value.pageRef && !value.url) {
                return "Either a page reference or an external URL is required.";
              }
              return true;
            }),
          preview: {
            select: {
              label: "label",
              pageTitle: "pageRef.title",
              url: "url",
            },
            prepare({ label, pageTitle, url }) {
              return {
                title: label || pageTitle || url || "Untitled",
                subtitle: pageTitle ? `→ ${pageTitle}` : url,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Main Navigation" };
    },
  },
});
