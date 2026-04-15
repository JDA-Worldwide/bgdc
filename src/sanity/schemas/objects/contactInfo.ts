import { defineType, defineField, defineArrayMember } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "contactInfo",
  icon: InfoOutlineIcon,
  title: "Contact Information",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "fax",
      title: "Fax",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Office Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "hours",
      title: "Office Hours",
      type: "string",
    }),
    defineField({
      name: "useGlobalSocialLinks",
      title: "Use Global Social Links",
      description: "Pull social icons from Global Settings instead of entering them manually below.",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      description: "Only used when 'Use Global Social Links' is disabled.",
      type: "array",
      hidden: ({ parent }) => !!parent?.useGlobalSocialLinks,
      of: [
        defineArrayMember({
          type: "object",
          options: { collapsed: false },
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Twitter / X", value: "twitter" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
          preview: {
            select: { platform: "platform", url: "url" },
            prepare({ platform, url }) {
              return { title: platform || "Social Link", subtitle: url };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "Contact Information", subtitle: "Contact Information" };
    },
  },
});
