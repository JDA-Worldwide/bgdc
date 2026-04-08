import type { SanityImageSource } from "@/components/ui/SanityImage/types";

export interface AreaCTA {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

export interface DevelopmentArea {
  _key: string;
  areaLabel?: string;
  title: string;
  body?: unknown[];
  opportunities?: string[];
  mapImage?: SanityImageSource;
  cta?: AreaCTA;
}

export interface DevelopmentAreaShowcaseProps {
  _type: "developmentAreaShowcase";
  _key: string;
  heading?: string;
  introText?: string;
  areas?: DevelopmentArea[];
}
