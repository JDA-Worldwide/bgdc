import { defineField } from "sanity";

export const colorSchemeField = defineField({
  name: "colorScheme",
  title: "Color Scheme",
  type: "string",
  options: {
    list: [
      { title: "Light (default)", value: "light" },
      { title: "Dark", value: "dark" },
    ],
    layout: "radio",
  },
  initialValue: "light",
  description: "Override the section background. Dark uses the navy brand color.",
  group: "settings",
});
