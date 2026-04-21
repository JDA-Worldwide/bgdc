import { defineType, defineField, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

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
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true, collapsed: false },
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
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    colorSchemeField,
    anchorSlugField,
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
