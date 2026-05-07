"use client";

import { useState } from "react";
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

type Range = "1A" | "3A" | "5A" | "Tout";
type Scale = "linear" | "log";

const RANGE_MONTHS: Record<Range, number> = {
  "1A": 12,
  "3A": 36,
  "5A": 60,
  Tout: Infinity,
};

function formatEquity(v: number) {
  return v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(1)}M`
    : `$${(v / 1_000).toFixed(0)}k`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1a1c1b",
        border: "1px solid #e4c278",
        borderRadius: 0,
        fontSize: 12,
        padding: "8px 12px",
      }}
    >
      <p
        style={{
          color: "#6b7280",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 4,
        }}
      >
        {label}
      </p>
      <p style={{ color: "#e4c278", fontWeight: 600 }}>
        {typeof payload[0].value === "number"
          ? `$${payload[0].value.toLocaleString("fr-FR")}`
          : String(payload[0].value)}
      </p>
    </div>
  );
}

export function EquityCurve({ data }: Props) {
  const [range, setRange] = useState<Range>("Tout");
  const [scale, setScale] = useState<Scale>("linear");

  const rangeMonths = RANGE_MONTHS[range];
  const sliced = rangeMonths === Infinity ? data : data.slice(-rangeMonths);

  const chartData = sliced.map((d) => ({
    date: d.date.slice(0, 7),
    equity: d.equity,
  }));

  const tickInterval =
    range === "1A" ? 1 : range === "3A" ? 5 : range === "5A" ? 7 : 11;

  return (
    <div>
      {/* Controls */}
      <div className="border-border flex items-center justify-between border-b px-4 py-2">
        <div
          className="flex items-center gap-0"
          role="group"
          aria-label="Période d'affichage"
        >
          {(["1A", "3A", "5A", "Tout"] as Range[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={[
                "text-label-caps border-border cursor-pointer border-r px-3 py-1.5 text-[10px] transition-colors",
                range === r
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {r}
            </button>
          ))}
        </div>

        <button
          onClick={() => setScale((s) => (s === "linear" ? "log" : "linear"))}
          aria-label={`Passer en échelle ${scale === "linear" ? "logarithmique" : "linéaire"}`}
          className="text-label-caps text-muted-foreground hover:text-gold border-border cursor-pointer border px-3 py-1.5 text-[10px] transition-colors"
        >
          {scale === "linear" ? "LOG" : "LIN"}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={380}>
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
            interval={tickInterval}
          />
          <YAxis
            scale={scale}
            domain={scale === "log" ? ["auto", "auto"] : undefined}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatEquity}
            width={72}
            allowDataOverflow={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="equity"
            stroke="#e4c278"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4, fill: "#e4c278", strokeWidth: 0 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
