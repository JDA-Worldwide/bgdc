/**
 * Example property tax rate breakdowns for Bargersville.
 * Paste into Sanity “Chart grid” or import when composing pages in code.
 */

export interface PropertyTaxChartPreset {
  title: string;
  totalLabel: string;
  totalValue: number;
  chartType: "pie" | "horizontalBar" | "bar" | "line" | "area";
  items: { label: string; value: number }[];
}

export const bargersvilleWhiteRiverTaxRates: PropertyTaxChartPreset = {
  title: "Bargersville / White River Township",
  totalLabel: "Total property tax rate",
  totalValue: 2.5938,
  chartType: "pie",
  items: [
    { label: "Bargersville", value: 0.6335 },
    { label: "Johnson County", value: 0.2899 },
    { label: "WRT", value: 0.0028 },
    { label: "CGSC", value: 1.1043 },
    { label: "Library", value: 0.0587 },
    { label: "Fire", value: 0.4973 },
    { label: "Solid Waste", value: 0.0073 },
  ],
};

export const bargersvilleUnionTaxRates: PropertyTaxChartPreset = {
  title: "Bargersville / Union Township",
  totalLabel: "Total property tax rate",
  totalValue: 2.4941,
  chartType: "pie",
  items: [
    { label: "Bargersville", value: 0.6335 },
    { label: "Johnson County", value: 0.2899 },
    { label: "UT", value: 0.0028 },
    { label: "FCS", value: 1.0046 },
    { label: "Library", value: 0.0587 },
    { label: "Fire", value: 0.4973 },
    { label: "Solid Waste", value: 0.0073 },
  ],
};
