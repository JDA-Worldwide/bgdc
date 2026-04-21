import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "contactForm",
  icon: EnvelopeIcon,
  title: "Contact Form",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "recipientEmail",
      title: "Recipient Email",
      type: "string",
      description: "Form submissions will be sent to this address",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "successMessage",
      title: "Success Message",
      type: "string",
      initialValue: "Thank you! Your message has been sent.",
    }),
    defineField({
      name: "inquiryTypes",
      title: "Inquiry Type Options",
      type: "array",
      of: [{ type: "string" }],
      description: "Options shown in the 'How can we help you?' dropdown. Leave empty to hide the dropdown.",
    }),
    defineField({
      name: "showNewsletterOptIn",
      title: "Show Newsletter Opt-In",
      type: "boolean",
      initialValue: false,
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "Contact Form", subtitle: "Contact Form" };
    },
  },
});
