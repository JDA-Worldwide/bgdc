import { notFound } from "next/navigation";
import ChartGrid from "@/components/modules/ChartGrid";
import type { ChartGridSeries } from "@/components/modules/ChartGrid/types";
import type { PropertyTaxChartPreset } from "@/lib/propertyTaxRateSampleData";
import {
  bargersvilleUnionTaxRates,
  bargersvilleWhiteRiverTaxRates,
} from "@/lib/propertyTaxRateSampleData";

function seriesFromPreset(key: string, preset: PropertyTaxChartPreset): ChartGridSeries {
  return {
    _key: key,
    title: preset.title,
    chartType: preset.chartType,
    totalLabel: preset.totalLabel,
    totalValue: preset.totalValue,
    items: preset.items.map((row, i) => ({
      _key: `${key}-row-${i}`,
      label: row.label,
      value: row.value,
    })),
  };
}

export default function ChartPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="py-10">
      <ChartGrid
        heading="Property tax rates (local preview)"
        introText="This route only exists in development. Use the Chart grid module in Sanity for production pages."
        charts={[
          seriesFromPreset("wrt", bargersvilleWhiteRiverTaxRates),
          seriesFromPreset("ut", bargersvilleUnionTaxRates),
        ]}
      />
    </div>
  );
}
