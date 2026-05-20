import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import ChartRow from "@/components/charts/ChartRow";
import DataChart from "@/components/charts/DataChart";
import type { ChartGridProps } from "./types";

export default function ChartGrid({ heading, introText, charts }: ChartGridProps) {
  if (!charts?.length && !heading) return null;

  return (
    <section aria-labelledby={heading ? "chart-grid-heading" : undefined}>
      <Container>
        {(heading || introText) && (
          <AnimateIn className="mb-10 text-center">
            {heading ? (
              <h2
                id="chart-grid-heading"
                className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]"
              >
                {heading}
              </h2>
            ) : null}
            {introText ? (
              <p className="mx-auto max-w-2xl text-base leading-7 text-brand-text lg:max-w-4xl">
                {introText}
              </p>
            ) : null}
          </AnimateIn>
        )}
      </Container>

      {charts && charts.length > 0 ? (
        <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
          <ChartRow columns={charts.length >= 3 ? 3 : 2}>
            {charts.map((chart) => {
              const items = chart.items?.map(({ label, value }) => ({ label, value })) ?? [];
              const chartTypeRaw = stegaClean(chart.chartType);
              return (
                <div
                  key={chart._key}
                  className="scheme-chart-light rounded border border-brand-border bg-white p-6 shadow-sm md:p-8"
                >
                  <DataChart
                    title={chart.title}
                    chartType={chartTypeRaw || "horizontalBar"}
                    data={items}
                    summaryLabel={chart.totalLabel}
                    summaryValue={chart.totalValue}
                  />
                </div>
              );
            })}
          </ChartRow>
        </div>
      ) : null}
    </section>
  );
}
