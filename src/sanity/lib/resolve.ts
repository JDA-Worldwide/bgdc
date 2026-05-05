import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  {
    route: "/",
    filter: `_type == "page" && slug.current == "home"`,
  },
  {
    route: "/:slug",
    filter: `_type == "page" && slug.current == $slug`,
  },
]);

export const locations = {
  page: defineLocations({
    select: { title: "title", slug: "slug.current" },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || "Untitled",
          href: doc?.slug === "home" ? "/" : `/${doc?.slug}`,
        },
      ],
    }),
  }),
  globalSettings: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
    resolve: () => ({
      locations: [{ title: "Home", href: "/" }],
    }),
  }),
  navigation: defineLocations({
    message: "This document is used on all pages",
    tone: "caution",
    resolve: () => ({
      locations: [{ title: "Home", href: "/" }],
    }),
  }),
};
