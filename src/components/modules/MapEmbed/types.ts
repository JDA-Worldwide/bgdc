import type { SanityImageSource } from "@/components/ui/SanityImage/types";

export interface MapEmbedProps {
  _type: "mapEmbed";
  _key: string;
  type?: "embed" | "image";
  embedUrl?: string;
  image?: SanityImageSource;
  width?: "content" | "full";
}
