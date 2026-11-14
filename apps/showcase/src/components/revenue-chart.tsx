import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@nawet/ui/components/card";
import {
  Chart,
  areaY,
  chartColor,
  defineChart,
  lineY,
  scaleBand,
  scaleLinear,
  tooltip,
} from "@nawet/ui/components/chart";

interface RevenuePoint {
  month: string;
  revenue: number;
  target: number;
}

const data: RevenuePoint[] = [
  { month: "Jan", revenue: 4200, target: 4400 },
  { month: "Feb", revenue: 4800, target: 4600 },
  { month: "Mar", revenue: 4600, target: 4900 },
  { month: "Apr", revenue: 5400, target: 5200 },
  { month: "May", revenue: 6100, target: 5600 },
  { month: "Jun", revenue: 6800, target: 6100 },
  { month: "Jul", revenue: 7200, target: 6500 },
];

const currency = new Intl.NumberFormat("en-US", {
  currency: "USD",
  maximumFractionDigits: 0,
  style: "currency",
});

const definition = defineChart({
  marks: [
    areaY(data, {
      fill: chartColor(0),
      fillOpacity: 0.12,
      x: "month",
      y: "revenue",
    }),
    lineY(data, {
      points: true,
      stroke: chartColor(0),
      strokeWidth: 2.5,
      x: "month",
      y: "revenue",
    }),
    lineY(data, {
      points: true,
      stroke: chartColor(2),
      strokeDasharray: "6 4",
      strokeWidth: 2,
      x: "month",
      y: "target",
    }),
  ],
  scales: {
    x: {
      axis: { label: "Month" },
      scale: () => scaleBand<string>().padding(0.2),
    },
    y: {
      axis: {
        label: "Revenue",
        ticks: { format: (value) => currency.format(value) },
      },
      grid: true,
      nice: true,
      scale: scaleLinear,
    },
  },
  tooltip,
});

const series = [
  { color: chartColor(0), label: "Revenue" },
  { color: chartColor(2), label: "Target" },
];

export const RevenueChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Revenue</CardTitle>
      <CardDescription>
        Monthly revenue against target for the last seven months.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
        {series.map((item) => (
          <span key={item.label} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-2 rounded-[2px]"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>
      <Chart
        ariaLabel="Monthly revenue compared to target"
        definition={definition}
        height={320}
      />
    </CardContent>
  </Card>
);
