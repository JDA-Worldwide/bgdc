export interface BusinessIncentiveCTA {
  label?: string;
  url?: string;
  isExternal?: boolean;
  variant?: string;
}

export interface BusinessIncentiveProps {
  _type: "businessIncentive";
  _key: string;
  heading?: string;
  introText?: string;
  calloutHeading?: string;
  calloutText?: string;
  cta?: BusinessIncentiveCTA;
}
