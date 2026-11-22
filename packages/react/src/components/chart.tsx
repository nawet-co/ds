import { cn } from "@nawet/ds-core/utils";
import type { ChartValue } from "@tanstack/charts";
import type { ChartProps as TanStackChartProps } from "@tanstack/charts/react/tooltip";
import { Chart as TanStackChart } from "@tanstack/charts/react/tooltip";

/**
 * Design-token palette shared by every chart.
 *
 * Use `chartColor(index)` when a mark needs an explicit paint, or pass a
 * `color` channel and let TanStack Charts cycle through the palette.
 */
const CHART_PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

/** Returns a chart palette color by index, wrapping around the palette. */
const chartColor = (index: number): string => {
  const position =
    ((index % CHART_PALETTE.length) + CHART_PALETTE.length) %
    CHART_PALETTE.length;

  return CHART_PALETTE[position] ?? CHART_PALETTE[0];
};

type ChartProps<
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = TanStackChartProps<TDatum, TXValue, TYValue>;

/**
 * TanStack Charts `Chart` with the design-system theme applied.
 *
 * Define charts with `defineChart` and pass the result through `definition`.
 * The `--ts-chart-*` tokens are declared in `globals.css`, so light and dark
 * mode follow the app theme automatically.
 */
const Chart = <
  TDatum,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>({
  className,
  ...props
}: ChartProps<TDatum, TXValue, TYValue>) => (
  <TanStackChart
    className={cn("text-foreground text-xs", className)}
    {...props}
  />
);

export {
  areaX,
  areaY,
  barX,
  barY,
  crosshair,
  defineChart,
  dot,
  lineX,
  lineY,
  ruleX,
  ruleY,
  text,
  tickX,
  tickY,
} from "@tanstack/charts";
export { scaleBand } from "@tanstack/charts/scales/band";
export { scaleLinear } from "@tanstack/charts/scales/linear";
export { scaleOrdinal } from "@tanstack/charts/scales/ordinal";
export { scalePoint } from "@tanstack/charts/scales/point";
export { tooltip } from "@tanstack/charts/tooltip";
export type { ChartDefinition, ChartPoint } from "@tanstack/charts";
export type { ChartTooltipBodyRenderContext } from "@tanstack/charts/react/tooltip";
export { CHART_PALETTE, chartColor, Chart };
export type { ChartProps };
