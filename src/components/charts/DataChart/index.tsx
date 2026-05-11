"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import type { DataChartProps, DataChartType } from "./types";

const FILL_SEQUENCE = [
  "var(--color-brand-primary)",
  "var(--color-brand-secondary)",
  "var(--color-brand-sky)",
  "var(--color-brand-prairie)",
  "var(--color-brand-soybean)",
  "var(--color-brand-limestone)",
  "var(--color-brand-muted)",
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

  const axisTickStyle = { fill: "var(--color-brand-muted)", fontSize: 11 };
  const axisLineStyle = { stroke: "var(--color-brand-border)" };
  const gridStroke = "var(--color-brand-border)";

  const tooltipContentStyle = {
    background: "var(--color-brand-background)",
    border: "1px solid var(--color-brand-border)",
    borderRadius: "6px",
    fontSize: 12,
    color: "var(--color-brand-text)",
  };

  const ariaLabel = title
    ? `${title}${summaryLabel && summaryValue != null ? `. ${summaryLabel}: ${valueFormatter(summaryValue)}.` : ""}`
    : "Data chart";

  const renderPlot = () => {
    switch (kind) {
      case "bar":
        return (
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 48 }}>
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
            <Tooltip
              formatter={(v) => [tooltipFormatValue(v, valueFormatter), ""]}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={`bar-${i}`} fill={FILL_SEQUENCE[i % FILL_SEQUENCE.length]} />
              ))}
            </Bar>
          </BarChart>
        );

      case "horizontalBar":
        return (
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
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
            <Tooltip
              formatter={(v) => [tooltipFormatValue(v, valueFormatter), ""]}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((_, i) => (
                <Cell key={`hbar-${i}`} fill={FILL_SEQUENCE[i % FILL_SEQUENCE.length]} />
              ))}
            </Bar>
          </BarChart>
        );

      case "pie":
        return (
          <PieChart>
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
            <Tooltip
              formatter={(v) => [tooltipFormatValue(v, valueFormatter), ""]}
              contentStyle={tooltipContentStyle}
            />
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ fontSize: 11, paddingTop: 16 }}
            />
          </PieChart>
        );

      case "line":
        return (
          <LineChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 48 }}>
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
            <Tooltip
              formatter={(v) => [tooltipFormatValue(v, valueFormatter), ""]}
              contentStyle={tooltipContentStyle}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-brand-primary)"
              strokeWidth={2}
              dot={{ r: 3, fill: "var(--color-brand-secondary)" }}
            />
          </LineChart>
        );

      case "area":
        return (
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 4, bottom: 48 }}>
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
            <Tooltip
              formatter={(v) => [tooltipFormatValue(v, valueFormatter), ""]}
              contentStyle={tooltipContentStyle}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-brand-primary)"
              fill="var(--color-brand-sky)"
              fillOpacity={0.35}
              strokeWidth={2}
            />
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
