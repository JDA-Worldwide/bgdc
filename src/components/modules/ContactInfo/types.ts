export interface SocialLink {
  _key: string;
  platform: "facebook" | "instagram" | "linkedin" | "twitter";
  url: string;
}

export interface GlobalSocialLink {
  platform: string;
  url: string;
}

export interface ContactInfoProps {
  _type: "contactInfo";
  _key: string;
  heading?: string;
  body?: string;
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
  address?: string;
  hours?: string;
  useGlobalSocialLinks?: boolean;
  socialLinks?: SocialLink[];
  globalSocialLinks?: GlobalSocialLink[];
}
