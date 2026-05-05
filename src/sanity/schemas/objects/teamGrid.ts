import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "teamGrid",
  icon: UsersIcon,
  title: "Team Grid",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "members",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "jobTitle",
              title: "Job Title",
              type: "string",
            }),
            defineField({
              name: "photo",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: "bio",
              title: "Bio",
              type: "text",
              rows: 3,
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading", members: "members" },
    prepare({ title, members }) {
      return {
        title: title || "Team Grid",
        subtitle: `Team Grid — ${members?.length ?? 0} members`,
      };
    },
  },
});
