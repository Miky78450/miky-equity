"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DataPoint {
  date: string;
  equity: number;
}

interface Props {
  data: DataPoint[];
}

export function EquityCurve({ data }: Props) {
  const chartData = data.map((d) => ({
    date: d.date.slice(0, 7),
    equity: d.equity,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 16, right: 24, bottom: 8, left: 16 }}
      >
        <CartesianGrid
          strokeDasharray="4 4"
          stroke="rgba(255,255,255,0.05)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: "#6b7280", fontSize: 10, letterSpacing: "0.08em" }}
          tickLine={false}
          axisLine={false}
          interval={11}
        />
        <YAxis
          tick={{ fill: "#6b7280", fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) =>
            v >= 1_000_000
              ? `$${(v / 1_000_000).toFixed(1)}M`
              : `$${(v / 1_000).toFixed(0)}k`
          }
          width={72}
        />
        <Tooltip
          contentStyle={{
            background: "#1a1c1b",
            border: "1px solid #e4c278",
            borderRadius: 0,
            fontSize: 12,
          }}
          labelStyle={{
            color: "#6b7280",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 4,
          }}
          formatter={(value) => [
            typeof value === "number"
              ? `$${value.toLocaleString("fr-FR")}`
              : String(value),
            "Equity",
          ]}
        />
        <Line
          type="monotone"
          dataKey="equity"
          stroke="#e4c278"
          strokeWidth={1.5}
          dot={false}
          activeDot={{ r: 4, fill: "#e4c278", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
