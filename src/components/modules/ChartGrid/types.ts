import type { DataChartType } from "@/components/charts/DataChart/types";

export interface ChartGridDatum {
  _key: string;
  label: string;
  value: number;
}

export interface ChartGridSeries {
  _key: string;
  title?: string;
  chartType?: DataChartType | string;
  totalLabel?: string;
  totalValue?: number;
  items?: ChartGridDatum[];
}

export interface ChartGridProps {
  heading?: string;
  introText?: string;
  charts?: ChartGridSeries[];
}
