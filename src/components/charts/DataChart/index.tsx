"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipPayload,
} from "recharts";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import type { ChartDatum, DataChartProps, DataChartType } from "./types";

/** Accessible on white chart surfaces (≥4.5:1 non-text contrast). */
const FILL_SEQUENCE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
] as const;

const VALID_TYPES: DataChartType[] = ["bar", "horizontalBar", "pie", "line", "area"];

function normalizeChartType(raw: string | undefined): DataChartType {
  if (raw && VALID_TYPES.includes(raw as DataChartType)) {
    return raw as DataChartType;
  }
  return "horizontalBar";
}

function defaultFormat(value: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);
}

function tooltipFormatValue(
  raw: unknown,
  format: (n: number) => string,
): string {
  if (typeof raw === "number" && !Number.isNaN(raw)) {
    return format(raw);
  }
  if (typeof raw === "string" && raw !== "") {
    const n = Number(raw);
    if (!Number.isNaN(n)) {
      return format(n);
    }
  }
  return "—";
}

/** High-contrast label styling on white chart surfaces (not on bar fills). */
const VALUE_LABEL_FILL = "var(--color-brand-charcoal)";
const VALUE_LABEL_FONT_SIZE = 12;
const VALUE_LABEL_FONT_WEIGHT = 500;

function valueLabelFormatter(
  v: unknown,
  format: (n: number) => string,
): string {
  return tooltipFormatValue(v, format);
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string | number;
  valueFormatter: (value: number) => string;
}

function ChartTooltipContent({ active, payload, label, valueFormatter }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  const datum = entry.payload as ChartDatum | undefined;
  const rawLabel = datum?.label ?? label ?? entry.name ?? "";
  const categoryLabel = stegaClean(String(rawLabel));
  const formattedValue = tooltipFormatValue(entry.value, valueFormatter);

  return (
    <div className="max-w-[min(20rem,90vw)] rounded-md border border-brand-border bg-white px-3 py-2 text-xs text-brand-charcoal shadow-sm">
      <p className="font-medium leading-snug wrap-break-word">{categoryLabel}</p>
      <p className="mt-0.5 tabular-nums">{formattedValue}</p>
    </div>
  );
}

export default function DataChart({
  title,
  chartType,
  data,
  summaryLabel,
  summaryValue,
  height = 340,
  className,
  valueFormatter = defaultFormat,
}: DataChartProps) {
  const kind = normalizeChartType(typeof chartType === "string" ? chartType : undefined);

  const chartData = useMemo(
    () => data.filter((d) => typeof d.value === "number" && !Number.isNaN(d.value)),
    [data],
  );

  if (!chartData.length) return null;

  const axisTickStyle = { fill: "var(--color-brand-charcoal)", fontSize: 12 };
  const axisLineStyle = { stroke: "var(--color-brand-border)" };
  const gridStroke = "var(--color-brand-border)";

  const renderTooltip = (props: { active?: boolean; payload?: TooltipPayload; label?: string | number }) => (
    <ChartTooltipContent {...props} valueFormatter={valueFormatter} />
  );

  const ariaLabel = title
    ? `${title}${summaryLabel && summaryValue != null ? `. ${summaryLabel}: ${valueFormatter(summaryValue)}.` : ""}`
    : "Data chart";

  const renderPlot = () => {
    switch (kind) {
      case "bar":
        return (
          <BarChart data={chartData} margin={{ top: 28, right: 8, left: 4, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis
              dataKey="label"
              tick={axisTickStyle}
              tickLine={false}
              axisLine={axisLineStyle}
              angle={-35}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis tick={axisTickStyle} tickLine={false} axisLine={axisLineStyle} width={48} />
            <Tooltip content={renderTooltip} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={`bar-${i}`} fill={FILL_SEQUENCE[i % FILL_SEQUENCE.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                offset={6}
                fill={VALUE_LABEL_FILL}
                fontSize={VALUE_LABEL_FONT_SIZE}
                fontWeight={VALUE_LABEL_FONT_WEIGHT}
                className="tabular-nums"
                formatter={(v: unknown) => valueLabelFormatter(v, valueFormatter)}
              />
            </Bar>
          </BarChart>
        );

      case "horizontalBar":
        return (
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 8, right: 56, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
            <XAxis type="number" tick={axisTickStyle} tickLine={false} axisLine={axisLineStyle} />
            <YAxis
              type="category"
              dataKey="label"
              width={128}
              tick={axisTickStyle}
              tickLine={false}
              axisLine={axisLineStyle}
            />
            <Tooltip content={renderTooltip} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => (
                <Cell key={`hbar-${i}`} fill={FILL_SEQUENCE[i % FILL_SEQUENCE.length]} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                fill={VALUE_LABEL_FILL}
                fontSize={VALUE_LABEL_FONT_SIZE}
                fontWeight={VALUE_LABEL_FONT_WEIGHT}
                className="tabular-nums"
                formatter={(v: unknown) => valueLabelFormatter(v, valueFormatter)}
              />
            </Bar>
          </BarChart>
        );

      case "pie":
        return (
          <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={chartData.length > 6 ? 48 : 0}
              outerRadius={112}
              paddingAngle={1}
            >
              {chartData.map((_, i) => (
                <Cell key={`slice-${i}`} fill={FILL_SEQUENCE[i % FILL_SEQUENCE.length]} />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{
                fontSize: VALUE_LABEL_FONT_SIZE,
                paddingTop: 16,
                color: VALUE_LABEL_FILL,
              }}
              formatter={(value) => {
                const row = chartData.find((d) => d.label === value);
                if (!row) return value;
                return `${value}: ${valueFormatter(row.value)}`;
              }}
            />
          </PieChart>
        );

      case "line":
        return (
          <LineChart data={chartData} margin={{ top: 28, right: 8, left: 4, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis
              dataKey="label"
              tick={axisTickStyle}
              tickLine={false}
              axisLine={axisLineStyle}
              angle={-35}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis tick={axisTickStyle} tickLine={false} axisLine={axisLineStyle} width={48} />
            <Tooltip content={renderTooltip} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={{ r: 4, fill: "var(--color-chart-2)", stroke: "var(--color-chart-1)", strokeWidth: 1 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={8}
                fill={VALUE_LABEL_FILL}
                fontSize={VALUE_LABEL_FONT_SIZE}
                fontWeight={VALUE_LABEL_FONT_WEIGHT}
                className="tabular-nums"
                formatter={(v: unknown) => valueLabelFormatter(v, valueFormatter)}
              />
            </Line>
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={chartData} margin={{ top: 28, right: 8, left: 4, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis
              dataKey="label"
              tick={axisTickStyle}
              tickLine={false}
              axisLine={axisLineStyle}
              angle={-35}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis tick={axisTickStyle} tickLine={false} axisLine={axisLineStyle} width={48} />
            <Tooltip content={renderTooltip} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              fill="var(--color-chart-3)"
              fillOpacity={0.2}
              strokeWidth={2}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={8}
                fill={VALUE_LABEL_FILL}
                fontSize={VALUE_LABEL_FONT_SIZE}
                fontWeight={VALUE_LABEL_FONT_WEIGHT}
                className="tabular-nums"
                formatter={(v: unknown) => valueLabelFormatter(v, valueFormatter)}
              />
            </Area>
          </AreaChart>
        );

      default:
        return null;
    }
  };

  return (
    <figure
      className={cn("flex min-w-0 flex-col gap-4", className)}
      aria-label={ariaLabel}
      role="group"
    >
      {(title || summaryLabel != null) && (
        <figcaption>
          {title ? (
            <h3 className="font-heading text-lg font-medium text-brand-text-heading md:text-xl">
              {title}
            </h3>
          ) : null}
          {summaryLabel != null && summaryValue != null ? (
            <p className="mt-1 text-sm text-brand-muted">
              {summaryLabel}:{" "}
              <span className="font-medium tabular-nums text-brand-text">
                {valueFormatter(summaryValue)}
              </span>
            </p>
          ) : null}
        </figcaption>
      )}
      <div className="min-h-[220px] w-full min-w-0" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderPlot()}
        </ResponsiveContainer>
      </div>
    </figure>
  );
}
