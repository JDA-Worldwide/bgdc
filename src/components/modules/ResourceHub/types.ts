export interface ResourceLink {
  _key: string;
  linkLabel?: string;
  url?: string;
  isExternal?: boolean;
}

export interface Resource {
  _key: string;
  title: string;
  description?: string;
  links?: ResourceLink[];
  linkLabel?: string;
  url?: string;
  isExternal?: boolean;
}

export interface ResourceHubProps {
  _type: "resourceHub";
  _key: string;
  heading?: string;
  introText?: string;
  resources?: Resource[];
}
