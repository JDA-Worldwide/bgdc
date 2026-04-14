import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "columns",
      title: "Link Columns",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column Title",
              type: "string",
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [{ type: "link" }],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        }),
      ],
    }),
    defineField({
      name: "useGlobalSocialLinks",
      title: "Use Global Social Links",
      description: "Pull social icons from Global Settings. Disable to override with custom links below.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      description: "Only used when 'Use Global Social Links' is disabled.",
      type: "array",
      hidden: ({ document }) => !!document?.useGlobalSocialLinks,
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
