export interface IncentiveCTA {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

export interface IncentiveProgram {
  _key: string;
  icon?: string;
  name: string;
  eligibility?: string;
  description?: string;
  cta?: IncentiveCTA;
}

export interface IncentiveCardsProps {
  _type: "incentiveCards";
  _key: string;
  heading?: string;
  introText?: string;
  programs?: IncentiveProgram[];
}
