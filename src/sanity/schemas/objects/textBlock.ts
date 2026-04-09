import { defineType, defineField } from "sanity";

export default defineType({
  name: "textBlock",
  title: "Text Block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      description: "Optional heading displayed above the body text",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true }),
                  }),
                  defineField({
                    name: "blank",
                    title: "Open in New Tab",
                    type: "boolean",
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: "heading", body: "body" },
    prepare({ heading, body }) {
      const text = heading ?? body?.[0]?.children?.[0]?.text ?? "Text Block";
      return { title: text };
    },
  },
});
