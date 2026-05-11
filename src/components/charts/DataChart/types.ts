export type DataChartType = "bar" | "horizontalBar" | "pie" | "line" | "area";

export interface ChartDatum {
  label: string;
  value: number;
}

export interface DataChartProps {
  title?: string;
  /** How values are plotted */
  chartType: DataChartType | string;
  data: ChartDatum[];
  /** Optional summary line (e.g. total property tax rate) */
  summaryLabel?: string;
  summaryValue?: number;
  /** Chart height in pixels */
  height?: number;
  className?: string;
  /** Override default numeric formatting */
  valueFormatter?: (value: number) => string;
}
