import { groq } from "next-sanity";

// --- Global ---

export const settingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteTitle,
    siteUrl,
    logo,
    defaultSeo,
    socialLinks
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    "ctaLabel": coalesce(ctaLabel, ctaPage->title),
    "ctaUrl": "/" + ctaPage->slug.current,
    items[] {
      "label": coalesce(label, pageRef->title),
      "url": select(isExternal == true => url, "/" + pageRef->slug.current),
      isExternal,
      children[] {
        "label": coalesce(label, pageRef->title),
        "url": select(isExternal == true => url, "/" + pageRef->slug.current),
        isExternal
      }
    }
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0] {
    columns[] {
      title,
      links[] {
        label,
        url,
        isExternal
      }
    },
    socialLinks,
    copyrightText
  }
`;

// --- Pages ---

export const allPagesQuery = groq`
  *[_type == "page"] {
    "slug": slug.current
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    seo,
    modules[] {
      ...,
      _type == "hero" => {
        ...,
        "backgroundImage": image
      },
      _type == "teamGrid" => {
        heading,
        members[]-> {
          _id,
          name,
          jobTitle,
          photo,
          bio
        }
      }
    }
  }
`;

export const homepageQuery = groq`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    "slug": slug.current,
    seo,
    modules[] {
      ...,
      _type == "hero" => {
        ...,
        "backgroundImage": image
      },
      _type == "teamGrid" => {
        heading,
        members[]-> {
          _id,
          name,
          jobTitle,
          photo,
          bio
        }
      }
    }
  }
`;

export const homepageDataQuery = groq`
  *[_type == "page" && slug.current == "home"][0] {
    title,
    "slug": slug.current,
    seo,
    modules[] {
      ...,
      _type == "hero" => {
        ...,
        "backgroundImage": image
      },
      _type == "teamGrid" => {
        heading,
        members[]-> {
          _id,
          name,
          jobTitle,
          photo,
          bio
        }
      }
    }
  }
`;

// --- Blog ---

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    featuredImage
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    author,
    publishedAt,
    excerpt,
    body,
    featuredImage,
    seo
  }
`;
