import type { SanityImageSource } from "@/components/ui/SanityImage/types";

export interface ProjectCTA {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

export interface ProjectImage extends SanityImageSource {
  _key: string;
  caption?: string;
}

export interface Project {
  _key: string;
  tagLabel?: string;
  title: string;
  status?: string;
  body?: unknown[];
  highlights?: string[];
  images?: ProjectImage[];
  cta?: ProjectCTA;
}

export interface ProjectShowcaseProps {
  _type: "projectShowcase";
  _key: string;
  heading?: string;
  introText?: string;
  projects?: Project[];
}
