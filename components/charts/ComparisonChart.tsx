"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface DataPoint {
  date: string;
  equity: number;
}

interface Props {
  mikyData: DataPoint[];
  sp500Data: DataPoint[];
}

interface MergedPoint {
  date: string;
  miky: number;
  sp500: number;
}

function formatEquity(v: number) {
  return v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(2)}M`
    : `$${(v / 1_000).toFixed(0)}k`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1a1c1b",
        border: "1px solid rgba(228,194,120,0.3)",
        padding: "10px 14px",
        fontSize: 11,
      }}
    >
      <p
        style={{
          color: "#6b7280",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: 6,
        }}
      >
        {label}
      </p>
      {payload.map(
        (entry: { name: string; value: number; color: string }, i: number) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: entry.color,
              }}
            />
            <span style={{ color: entry.color, fontWeight: 600 }}>
              {formatEquity(entry.value)}
            </span>
            <span
              style={{
                color: "#6b7280",
                fontSize: 9,
                textTransform: "uppercase",
              }}
            >
              {entry.name}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export function ComparisonChart({ mikyData, sp500Data }: Props) {
  // Merge by date index (both arrays same length = 101 months)
  const merged: MergedPoint[] = mikyData.map((d, i) => ({
    date: d.date.slice(0, 7),
    miky: Math.round(d.equity),
    sp500: sp500Data[i]?.equity ?? 0,
  }));

  const finalMiky = merged[merged.length - 1]?.miky ?? 0;
  const finalSP500 = merged[merged.length - 1]?.sp500 ?? 0;
  const mikyReturn = (((finalMiky - 100000) / 100000) * 100).toFixed(0);
  const sp500Return = (((finalSP500 - 100000) / 100000) * 100).toFixed(0);

  return (
    <div>
      {/* Return comparison badges */}
      <div className="mb-6 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="bg-gold inline-block h-3 w-3 shrink-0" />
          <div>
            <p className="text-label-caps text-muted-foreground">MIKY EQUITY</p>
            <p className="text-headline-md text-gold">+{mikyReturn}%</p>
          </div>
        </div>
        <div className="text-muted-foreground/30 hidden text-2xl md:block">
          vs
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 shrink-0 bg-[#6b7280]" />
          <div>
            <p className="text-label-caps text-muted-foreground">S&amp;P 500</p>
            <p className="text-headline-md text-muted-foreground">
              +{sp500Return}%
            </p>
          </div>
        </div>
        <div className="border-border ml-auto hidden border-l pl-6 md:block">
          <p className="text-label-caps text-muted-foreground">ALPHA GÉNÉRÉ</p>
          <p className="text-headline-md text-gold">
            +
            {(parseInt(mikyReturn) - parseInt(sp500Return)).toLocaleString(
              "fr-FR"
            )}{" "}
            pts
          </p>
        </div>
      </div>

      <div className="border-border bg-surface-low border">
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={merged}
            margin={{ top: 16, right: 24, bottom: 8, left: 16 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255,255,255,0.04)"
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
              tickFormatter={formatEquity}
              width={76}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="square"
              iconSize={8}
              wrapperStyle={{
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                paddingTop: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="miky"
              name="Miky Equity"
              stroke="#e4c278"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, fill: "#e4c278", strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="sp500"
              name="S&P 500"
              stroke="#4b5563"
              strokeWidth={1.5}
              strokeDasharray="6 3"
              dot={false}
              activeDot={{ r: 4, fill: "#4b5563", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-label-caps text-muted-foreground/40 mt-3 text-[9px] leading-relaxed tracking-widest">
        Comparaison illustrative — données S&amp;P 500 basées sur les rendements
        annuels historiques, normalisées à $100 000 au 31 jan. 2018. Les
        performances passées ne préjugent pas des résultats futurs.
      </p>
    </div>
  );
}
