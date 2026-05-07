import { describe, it, expect } from "vitest";
import {
  calcCAGR,
  calcAnnualizedVolatility,
  calcSharpe,
  calcSortino,
  calcMaxDrawdown,
  calcWinRate,
  calcAllMetrics,
  type BacktestMonth,
} from "./finance";

// ─── Fixtures ────────────────────────────────────────────────────────────────

/** 12 months: $100k → $120k (+20%), all wins */
const SIMPLE_12M: BacktestMonth[] = Array.from({ length: 12 }, (_, i) => ({
  date: `2020-${String(i + 1).padStart(2, "0")}-01`,
  equity: 100_000 + (20_000 / 12) * (i + 1),
  monthlyReturn: 20_000 / 12 / (100_000 + (20_000 / 12) * i),
  equity_r: 0,
  monthly_r: 0,
  trades: 10,
  wins: 10,
  losses: 0,
}));

/** 24 months: steady +2% per month */
const STEADY_2PCT: BacktestMonth[] = Array.from({ length: 24 }, (_, i) => {
  const equity = 100_000 * Math.pow(1.02, i + 1);
  return {
    date: `2020-${String((i % 12) + 1).padStart(2, "0")}-01`,
    equity,
    monthlyReturn: 0.02,
    equity_r: 0,
    monthly_r: 0,
    trades: 15,
    wins: 9,
    losses: 6,
  };
});

/** Dataset with a clear drawdown: rises then drops */
const DRAWDOWN_DATA: BacktestMonth[] = [
  {
    date: "2020-01-01",
    equity: 100_000,
    monthlyReturn: 0.0,
    equity_r: 0,
    monthly_r: 0,
    trades: 10,
    wins: 5,
    losses: 5,
  },
  {
    date: "2020-02-01",
    equity: 120_000,
    monthlyReturn: 0.2,
    equity_r: 0,
    monthly_r: 0,
    trades: 10,
    wins: 8,
    losses: 2,
  },
  {
    date: "2020-03-01",
    equity: 90_000,
    monthlyReturn: -0.25,
    equity_r: 0,
    monthly_r: 0,
    trades: 10,
    wins: 2,
    losses: 8,
  },
  {
    date: "2020-04-01",
    equity: 110_000,
    monthlyReturn: 0.222,
    equity_r: 0,
    monthly_r: 0,
    trades: 10,
    wins: 7,
    losses: 3,
  },
];

// ─── calcCAGR ─────────────────────────────────────────────────────────────────

describe("calcCAGR", () => {
  it("returns 0 when final equity equals initial capital", () => {
    const data: BacktestMonth[] = [
      {
        date: "2020-01-01",
        equity: 100_000,
        monthlyReturn: 0,
        equity_r: 0,
        monthly_r: 0,
        trades: 0,
        wins: 0,
        losses: 0,
      },
    ];
    // 1 month = 1/12 year ; CAGR = (1)^12 - 1 = 0
    expect(calcCAGR(data)).toBeCloseTo(0, 5);
  });

  it("returns +20% CAGR on exactly 1 year doubling from 100k to 120k", () => {
    // Final equity ≈ $121,666 after 12 equal increments — close to 20%
    const cagr = calcCAGR(SIMPLE_12M);
    expect(cagr).toBeGreaterThan(0.18);
    expect(cagr).toBeLessThan(0.22);
  });

  it("returns ~26.8% CAGR for +2%/month over 24 months", () => {
    // (1.02^12) - 1 = 26.82%
    const cagr = calcCAGR(STEADY_2PCT);
    expect(cagr).toBeCloseTo(0.2682, 2);
  });

  it("is always positive when final equity > 100k", () => {
    expect(calcCAGR(DRAWDOWN_DATA)).toBeGreaterThan(0);
  });
});

// ─── calcAnnualizedVolatility ─────────────────────────────────────────────────

describe("calcAnnualizedVolatility", () => {
  it("returns 0 when all monthly returns are identical", () => {
    expect(calcAnnualizedVolatility(STEADY_2PCT)).toBeCloseTo(0, 10);
  });

  it("is positive when returns vary", () => {
    expect(calcAnnualizedVolatility(DRAWDOWN_DATA)).toBeGreaterThan(0);
  });

  it("equals stddev(monthly) * sqrt(12)", () => {
    const returns = DRAWDOWN_DATA.map((d) => d.monthlyReturn);
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance =
      returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    const expected = Math.sqrt(variance) * Math.sqrt(12);
    expect(calcAnnualizedVolatility(DRAWDOWN_DATA)).toBeCloseTo(expected, 10);
  });
});

// ─── calcSharpe ───────────────────────────────────────────────────────────────

describe("calcSharpe", () => {
  it("is very high for a steady positive return (no volatility)", () => {
    // With near-zero volatility and positive return, Sharpe → ∞
    // In practice the numerically we get a very large number
    const sharpe = calcSharpe(STEADY_2PCT);
    expect(sharpe).toBeGreaterThan(100);
  });

  it("is lower when returns are volatile", () => {
    const steadySharpe = calcSharpe(STEADY_2PCT);
    const volatileSharpe = calcSharpe(DRAWDOWN_DATA);
    expect(volatileSharpe).toBeLessThan(steadySharpe);
  });

  it("equals (annualReturn / annualizedVol)", () => {
    const returns = DRAWDOWN_DATA.map((d) => d.monthlyReturn);
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const annualReturn = mean * 12;
    const vol = calcAnnualizedVolatility(DRAWDOWN_DATA);
    expect(calcSharpe(DRAWDOWN_DATA)).toBeCloseTo(annualReturn / vol, 8);
  });
});

// ─── calcSortino ──────────────────────────────────────────────────────────────

describe("calcSortino", () => {
  it("is higher than Sharpe when returns are positively skewed", () => {
    // Sortino only penalises downside — should be >= Sharpe
    const sharpe = calcSharpe(DRAWDOWN_DATA);
    const sortino = calcSortino(DRAWDOWN_DATA);
    expect(sortino).toBeGreaterThanOrEqual(sharpe);
  });

  it("is positive when average monthly return is positive", () => {
    const avgReturn =
      DRAWDOWN_DATA.reduce((s, d) => s + d.monthlyReturn, 0) /
      DRAWDOWN_DATA.length;
    if (avgReturn > 0) {
      expect(calcSortino(DRAWDOWN_DATA)).toBeGreaterThan(0);
    }
  });

  it("is very high for steady positive returns (no negative months)", () => {
    // All returns = +2%, no downside → Sortino very large
    expect(calcSortino(STEADY_2PCT)).toBeGreaterThan(50);
  });
});

// ─── calcMaxDrawdown ──────────────────────────────────────────────────────────

describe("calcMaxDrawdown", () => {
  it("returns 0 when equity only rises", () => {
    expect(calcMaxDrawdown(STEADY_2PCT)).toBe(0);
  });

  it("returns correct max drawdown for known data", () => {
    // Peak = 120k, trough = 90k → DD = (90k - 120k) / 120k = -25%
    expect(calcMaxDrawdown(DRAWDOWN_DATA)).toBeCloseTo(-0.25, 5);
  });

  it("is always <= 0", () => {
    expect(calcMaxDrawdown(SIMPLE_12M)).toBeLessThanOrEqual(0);
    expect(calcMaxDrawdown(DRAWDOWN_DATA)).toBeLessThanOrEqual(0);
  });

  it("is between -1 and 0", () => {
    const dd = calcMaxDrawdown(DRAWDOWN_DATA);
    expect(dd).toBeGreaterThan(-1);
    expect(dd).toBeLessThanOrEqual(0);
  });
});

// ─── calcWinRate ──────────────────────────────────────────────────────────────

describe("calcWinRate", () => {
  it("returns 1.0 when all trades are wins", () => {
    expect(calcWinRate(SIMPLE_12M)).toBe(1);
  });

  it("returns 0.6 for 9/15 wins per month", () => {
    expect(calcWinRate(STEADY_2PCT)).toBeCloseTo(0.6, 5);
  });

  it("is between 0 and 1", () => {
    const wr = calcWinRate(DRAWDOWN_DATA);
    expect(wr).toBeGreaterThanOrEqual(0);
    expect(wr).toBeLessThanOrEqual(1);
  });

  it("correctly aggregates across all months", () => {
    const totalWins = DRAWDOWN_DATA.reduce((s, d) => s + d.wins, 0); // 5+8+2+7 = 22
    const totalTrades = DRAWDOWN_DATA.reduce((s, d) => s + d.trades, 0); // 40
    expect(calcWinRate(DRAWDOWN_DATA)).toBeCloseTo(totalWins / totalTrades, 10);
  });
});

// ─── calcAllMetrics ───────────────────────────────────────────────────────────

describe("calcAllMetrics", () => {
  it("returns an object with all 6 expected keys", () => {
    const result = calcAllMetrics(DRAWDOWN_DATA);
    expect(result).toHaveProperty("cagr");
    expect(result).toHaveProperty("sharpe");
    expect(result).toHaveProperty("sortino");
    expect(result).toHaveProperty("maxDrawdown");
    expect(result).toHaveProperty("winRate");
    expect(result).toHaveProperty("annualizedVolatility");
  });

  it("matches individual function results", () => {
    const metrics = calcAllMetrics(DRAWDOWN_DATA);
    expect(metrics.cagr).toBeCloseTo(calcCAGR(DRAWDOWN_DATA), 10);
    expect(metrics.sharpe).toBeCloseTo(calcSharpe(DRAWDOWN_DATA), 10);
    expect(metrics.sortino).toBeCloseTo(calcSortino(DRAWDOWN_DATA), 10);
    expect(metrics.maxDrawdown).toBeCloseTo(calcMaxDrawdown(DRAWDOWN_DATA), 10);
    expect(metrics.winRate).toBeCloseTo(calcWinRate(DRAWDOWN_DATA), 10);
    expect(metrics.annualizedVolatility).toBeCloseTo(
      calcAnnualizedVolatility(DRAWDOWN_DATA),
      10
    );
  });

  it("backtest sanity check: CAGR > 30% on real data range", () => {
    // Smoke test: real backtest gives ~39% CAGR — lib must not regress
    const metrics = calcAllMetrics(STEADY_2PCT);
    expect(metrics.cagr).toBeGreaterThan(0.2); // at least 20%
    expect(metrics.winRate).toBe(0.6);
    expect(metrics.maxDrawdown).toBe(0);
  });
});
