import { defineType, defineField } from "sanity";

export default defineType({
  name: "link",
  title: "Link",
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
  ],
  validation: (rule) =>
    rule.custom((value: { pageRef?: unknown; url?: string; isExternal?: boolean } | undefined) => {
      if (!value) return true;
      if (!value.pageRef && !value.url) {
        return "Either a page reference or an external URL is required.";
      }
      return true;
    }),
});
