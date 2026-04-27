import { defineType, defineField } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "address",
      title: "Address",
      description: "Each line of the address on a separate line.",
      type: "text",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
