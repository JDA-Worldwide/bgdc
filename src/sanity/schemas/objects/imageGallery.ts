import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";

export default defineType({
  name: "imageGallery",
  icon: ImagesIcon,
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      options: { modal: { type: "popover", width: 0 } },
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
  ],
  preview: {
    select: { images: "images" },
    prepare({ images }) {
      return {
        title: "Image Gallery",
        subtitle: `Image Gallery — ${images?.length ?? 0} images`,
      };
    },
  },
});
