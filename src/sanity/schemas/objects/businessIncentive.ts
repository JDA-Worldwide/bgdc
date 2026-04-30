import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "businessIncentive",
  icon: DocumentsIcon,
  title: "Business Incentive",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "calloutHeading",
      title: "Callout Subheading",
      type: "string",
      description: 'Short uppercase label, e.g. "How TIF Works" or "About This Program"',
    }),
    defineField({
      name: "calloutText",
      title: "Callout Body",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "cta",
      title: "Call to Action",
      type: "ctaButton",
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading" },
    prepare({ heading }) {
      return { title: heading || "Business Incentive", subtitle: "Business Incentive" };
    },
  },
});
