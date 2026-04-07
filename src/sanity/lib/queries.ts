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
    items[] {
      label,
      url,
      isExternal,
      children[] {
        label,
        url,
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
    seo,
    "hero": modules[_type == "homepageHero"][0] {
      callout,
      heading,
      body,
      ctas[] { _key, label, url, isExternal, variant },
      backgroundImage
    },
    "stats": modules[_type == "statsBar"][0] {
      heading,
      stats[] { value, label }
    },
    "community": modules[_type == "communitySection"][0] {
      heading,
      leadText,
      body,
      images[] { ..., alt }
    },
    "valueProps": modules[_type == "valueProps"][0] {
      heading,
      cards[] { icon, title, body }
    },
    "map": modules[_type == "mapSection"][0] {
      heading,
      body,
      mapImage,
      destinations[] { time, label }
    },
    "industries": modules[_type == "industriesGrid"][0] {
      heading,
      body,
      industries[] { name, image, link },
      cta
    },
    "momentum": modules[_type == "momentumSection"][0] {
      heading,
      body,
      projects[] { title, description, link },
      cta
    },
    "ctaBanner": modules[_type == "ctaBanner"][0] {
      callout,
      heading,
      body,
      cta,
      backgroundImage
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
