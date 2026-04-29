export interface CTALink {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

import type { PortableTextBlock } from "@portabletext/react";

export interface CTAProps {
  _type: "cta";
  _key: string;
  heading: string;
  body?: PortableTextBlock[];
  primaryButton?: CTALink;
  secondaryButton?: CTALink;
  backgroundColor?: "default" | "primary" | "surface";
}
