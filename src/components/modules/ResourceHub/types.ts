export interface Resource {
  _key: string;
  icon?: string;
  title: string;
  description?: string;
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
