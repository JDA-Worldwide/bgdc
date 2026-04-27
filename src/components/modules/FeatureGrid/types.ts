export interface Feature {
  _key: string;
  title: string;
  description?: string;
}

export interface FeatureGridProps {
  _type: "featureGrid";
  _key: string;
  heading?: string;
  features: Feature[];
}
