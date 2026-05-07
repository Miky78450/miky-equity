"use client";

import {
  AreaChart,
  Area,
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

function computeDrawdown(
  data: DataPoint[]
): { date: string; drawdown: number }[] {
  let peak = 100_000;
  return data.map((d) => {
    if (d.equity > peak) peak = d.equity;
    return {
      date: d.date.slice(0, 7),
      drawdown: parseFloat((((d.equity - peak) / peak) * 100).toFixed(2)),
    };
  });
}

export function DrawdownChart({ data }: Props) {
  const chartData = computeDrawdown(data);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart
        data={chartData}
        margin={{ top: 16, right: 24, bottom: 8, left: 16 }}
      >
        <defs>
          <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93000a" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#93000a" stopOpacity={0} />
          </linearGradient>
        </defs>
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
          tickFormatter={(v: number) => `${v.toFixed(0)}%`}
          width={48}
        />
        <Tooltip
          contentStyle={{
            background: "#1a1c1b",
            border: "1px solid #93000a",
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
          formatter={(value) =>
            typeof value === "number"
              ? [`${value.toFixed(2)}%`, "Drawdown"]
              : [String(value), "Drawdown"]
          }
        />
        <Area
          type="monotone"
          dataKey="drawdown"
          stroke="#ffb4ab"
          strokeWidth={1.5}
          fill="url(#ddGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#ffb4ab", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
