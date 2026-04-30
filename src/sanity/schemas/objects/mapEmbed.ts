import { defineType, defineField } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "mapEmbed",
  icon: EarthGlobeIcon,
  title: "Map Embed",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Map Type",
      type: "string",
      options: {
        list: [
          { title: "Embed (iframe)", value: "embed" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "embed",
    }),
    defineField({
      name: "embedUrl",
      title: "Embed URL",
      type: "url",
      description: "iframe src URL (e.g. Google Maps embed link)",
      hidden: ({ parent }) => parent?.type !== "embed",
    }),
    defineField({
      name: "image",
      title: "Map Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      hidden: ({ parent }) => parent?.type !== "image",
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      options: {
        list: [
          { title: "Content width", value: "content" },
          { title: "Full width", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "content",
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { type: "type", embedUrl: "embedUrl" },
    prepare({ type, embedUrl }) {
      return {
        title: "Map Embed",
        subtitle: type === "embed" ? embedUrl ?? "No URL set" : "Image",
      };
    },
  },
});
