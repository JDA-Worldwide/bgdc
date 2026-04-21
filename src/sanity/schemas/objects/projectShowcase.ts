import { defineType, defineField, defineArrayMember } from "sanity";
import { CaseIcon } from "@sanity/icons";
import { colorSchemeField } from "./_colorSchemeField";
import { anchorSlugField } from "./_anchorSlugField";

export default defineType({
  name: "projectShowcase",
  icon: CaseIcon,
  title: "Project Showcase",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "tagLabel",
              title: "Tag Label",
              type: "string",
              description: 'e.g. "Major Initiative | Planning & Development"',
            }),
            defineField({
              name: "title",
              title: "Project Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "status",
              title: "Status",
              type: "string",
              options: {
                list: [
                  { title: "In Progress", value: "In Progress" },
                  { title: "Now Selling", value: "Now Selling" },
                  { title: "Upcoming", value: "Upcoming" },
                  { title: "Planning", value: "Planning" },
                  { title: "Under Construction", value: "Under Construction" },
                  { title: "Approved", value: "Approved" },
                  { title: "Coming Soon", value: "Coming Soon" },
                ],
              },
            }),
            defineField({
              name: "body",
              title: "Body Copy",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H3", value: "h3" },
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
                            validation: (rule) => rule.uri({ allowRelative: true }),
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
            defineField({
              name: "highlights",
              title: "Vision Highlights",
              type: "array",
              of: [{ type: "string" }],
              description: "Bullet points summarizing key project features",
            }),
            defineField({
              name: "images",
              title: "Project Images / Renderings",
              type: "array",
              of: [
                defineArrayMember({
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
                }),
              ],
            }),
            defineField({
              name: "cta",
              title: "Call to Action",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({
                  name: "url",
                  title: "URL",
                  type: "string",
                  description: "Use a relative path (e.g. /contact) or full URL for external links",
                }),
                defineField({
                  name: "isExternal",
                  title: "Open in New Tab",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", status: "status" },
            prepare({ title, status }) {
              return { title: title || "Project", subtitle: status };
            },
          },
        }),
      ],
    }),
    colorSchemeField,
    anchorSlugField,
  ],
  preview: {
    select: { heading: "heading", projects: "projects" },
    prepare({ heading, projects }) {
      return {
        title: heading || "Project Showcase",
        subtitle: `Project Showcase — ${projects?.length ?? 0} projects`,
      };
    },
  },
});
