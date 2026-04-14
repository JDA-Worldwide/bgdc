import { defineField } from "sanity";

export const colorSchemeField = defineField({
  name: "colorScheme",
  title: "Color Scheme",
  type: "string",
  options: {
    list: [
      { title: "Light (default)", value: "light" },
      { title: "Surface (warm off-white)", value: "surface" },
      { title: "Dark (navy)", value: "dark" },
    ],
    layout: "radio",
  },
  initialValue: "light",
  description: "Override the section background color.",
});
