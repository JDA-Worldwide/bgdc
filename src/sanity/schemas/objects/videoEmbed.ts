import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "videoEmbed",
  icon: PlayIcon,
  title: "Video Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "Video URL",
      type: "url",
      description: "YouTube or Vimeo URL",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      description: "Custom thumbnail (optional — falls back to provider default)",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    colorSchemeField,
  ],
  preview: {
    select: { url: "url" },
    prepare({ url }) {
      return { title: "Video Embed", subtitle: url ? `Video Embed — ${url}` : "Video Embed" };
    },
  },
});
