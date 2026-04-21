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
          type: "reference",
          to: [{ type: "teamMember" }],
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
