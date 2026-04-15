interface SanityImageField {
  asset?: { _ref: string };
  hotspot?: { x: number; y: number };
  alt?: string;
}

export interface TextBlockProps {
  _type: "textBlock";
  _key: string;
  heading?: string;
  body: unknown[];
  image?: SanityImageField;
  imagePlacement?: "left" | "right";
}
