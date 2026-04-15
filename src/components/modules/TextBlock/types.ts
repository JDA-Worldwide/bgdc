import type { SanityImageSource } from "@/components/ui/SanityImage/types";

type SanityImageField = SanityImageSource;

export interface TextBlockProps {
  _type: "textBlock";
  _key: string;
  heading?: string;
  body: unknown[];
  image?: SanityImageField;
  imagePlacement?: "left" | "right";
}
