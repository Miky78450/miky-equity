interface BacktestMonth {
  date: string;
  monthly_r: number;
}

interface Props {
  data: BacktestMonth[];
}

interface YearRow {
  year: string;
  months: (number | null)[];
  ytd: number;
}

const MONTHS_FR = [
  "JANV",
  "FÉVR",
  "MARS",
  "AVRI",
  "MAI",
  "JUIN",
  "JUIL",
  "AOÛT",
  "SEPT",
  "OCT",
  "NOV",
  "DÉC",
];

function cellClass(val: number | null): string {
  if (val === null) return "bg-white/5 text-muted-foreground";
  if (val >= 5) return "bg-[#1e4d36] text-gold";
  if (val > 0) return "bg-[#152e24] text-gold";
  if (val >= -2) return "bg-[#3d1014]/40 text-red-400";
  return "bg-[#3d1014]/70 text-red-400";
}

function buildRows(data: BacktestMonth[]): YearRow[] {
  const byYear: Record<string, (number | null)[]> = {};
  for (const d of data) {
    const parts = d.date.split("-");
    const year = parts[0] as string;
    const monthIdx = parseInt(parts[1] as string) - 1;
    if (!byYear[year]) byYear[year] = Array(12).fill(null) as null[];
    const row = byYear[year];
    if (row) row[monthIdx] = d.monthly_r;
  }

  return Object.keys(byYear)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => {
      const months: (number | null)[] =
        byYear[year] ?? (Array(12).fill(null) as null[]);
      let ytdFactor = 1;
      for (const v of months) {
        if (v !== null) ytdFactor *= 1 + v / 100;
      }
      return { year, months, ytd: ytdFactor * 100 - 100 };
    });
}

export function MonthlyHeatmap({ data }: Props) {
  const rows = buildRows(data);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-border border-b">
            <th className="text-label-caps text-muted-foreground w-20 py-4 text-left">
              ANNÉE
            </th>
            {MONTHS_FR.map((m) => (
              <th
                key={m}
                className="text-label-caps text-muted-foreground py-4 text-center"
              >
                {m}
              </th>
            ))}
            <th className="text-label-caps text-muted-foreground bg-surface-low py-4 text-center">
              YTD
            </th>
          </tr>
        </thead>
        <tbody className="font-mono text-[13px]">
          {rows.map(({ year, months, ytd }) => (
            <tr key={year} className="border-border h-14 border-b">
              <td className="text-label-caps text-foreground">{year}</td>
              {months.map((val, i) => (
                <td
                  key={i}
                  className={`text-center tabular-nums ${cellClass(val)}`}
                >
                  {val !== null ? val.toFixed(1) : "—"}
                </td>
              ))}
              <td className="bg-surface-low text-gold text-center font-bold tabular-nums">
                {ytd.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
