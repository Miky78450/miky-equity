export interface BacktestMonth {
  date: string;
  equity: number;
  monthlyReturn: number;
  equity_r: number;
  monthly_r: number;
  trades: number;
  wins: number;
  losses: number;
}

const INITIAL_CAPITAL = 100_000;

function mean(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stddev(arr: number[], avg?: number): number {
  const m = avg ?? mean(arr);
  const variance = arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / arr.length;
  return Math.sqrt(variance);
}

/** CAGR from $100k initial to last equity value */
export function calcCAGR(data: BacktestMonth[]): number {
  const final = data[data.length - 1].equity;
  const years = data.length / 12;
  return Math.pow(final / INITIAL_CAPITAL, 1 / years) - 1;
}

/** Annualized volatility: std dev of monthly returns * sqrt(12) */
export function calcAnnualizedVolatility(data: BacktestMonth[]): number {
  const returns = data.map((d) => d.monthlyReturn);
  return stddev(returns) * Math.sqrt(12);
}

/** Sharpe ratio (risk-free rate = 0) */
export function calcSharpe(data: BacktestMonth[]): number {
  const returns = data.map((d) => d.monthlyReturn);
  const avgMonthly = mean(returns);
  const vol = calcAnnualizedVolatility(data);
  return (avgMonthly * 12) / vol;
}

/** Sortino ratio (downside deviation only) */
export function calcSortino(data: BacktestMonth[]): number {
  const returns = data.map((d) => d.monthlyReturn);
  const avgMonthly = mean(returns);
  const negReturns = returns.filter((r) => r < 0);
  const downsideVariance =
    negReturns.reduce((a, b) => a + Math.pow(b, 2), 0) / returns.length;
  const downsideVol = Math.sqrt(downsideVariance) * Math.sqrt(12);
  return (avgMonthly * 12) / downsideVol;
}

/** Max drawdown as a negative decimal (e.g. -0.255 = -25.5%) */
export function calcMaxDrawdown(data: BacktestMonth[]): number {
  let peak = INITIAL_CAPITAL;
  let maxDd = 0;
  for (const d of data) {
    if (d.equity > peak) peak = d.equity;
    const dd = (d.equity - peak) / peak;
    if (dd < maxDd) maxDd = dd;
  }
  return maxDd;
}

/** Win rate as a decimal (e.g. 0.593 = 59.3%) */
export function calcWinRate(data: BacktestMonth[]): number {
  const totalWins = data.reduce((a, d) => a + d.wins, 0);
  const totalTrades = data.reduce((a, d) => a + d.trades, 0);
  return totalWins / totalTrades;
}

/** Compute all metrics in one call */
export function calcAllMetrics(data: BacktestMonth[]) {
  return {
    cagr: calcCAGR(data),
    sharpe: calcSharpe(data),
    sortino: calcSortino(data),
    maxDrawdown: calcMaxDrawdown(data),
    winRate: calcWinRate(data),
    annualizedVolatility: calcAnnualizedVolatility(data),
  };
}
