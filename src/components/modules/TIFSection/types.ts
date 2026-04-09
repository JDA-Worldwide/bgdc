import type { SanityImageSource } from "@/components/ui/SanityImage/types";

export interface TIFDistrict {
  _key: string;
  name: string;
  eligibleUses?: string;
  contact?: string;
}

export interface TIFCTA {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

export interface TIFSectionProps {
  _type: "tifSection";
  _key: string;
  heading?: string;
  introText?: string;
  howItWorks?: string;
  districts?: TIFDistrict[];
  mapImage?: SanityImageSource;
  cta?: TIFCTA;
}
