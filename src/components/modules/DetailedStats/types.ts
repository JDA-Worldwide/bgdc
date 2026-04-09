export interface StatItem {
  _key: string;
  value: string;
  label: string;
}

export interface StatCategory {
  _key: string;
  categoryName: string;
  stats?: StatItem[];
}

export interface DetailedStatsProps {
  _type: "detailedStats";
  _key: string;
  heading?: string;
  introText?: string;
  categories?: StatCategory[];
}
