export interface CTALink {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

export interface CTAProps {
  _type: "cta";
  _key: string;
  heading: string;
  body?: unknown[];
  primaryButton?: CTALink;
  secondaryButton?: CTALink;
  backgroundColor?: "default" | "primary" | "surface";
}
