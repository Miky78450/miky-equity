# Miky Equity — Institutional Trading Platform

> **Disclaimer:** Miky Equity is a fictional company created for educational and portfolio demonstration purposes. All performance data is derived from a real backtest of an ICT/NQ Futures strategy but presented in a fictional fund context. No real investment advice is provided.

---

## Overview

A high-fidelity institutional web platform for Miky Equity, a fictional quantitative hedge fund specializing in NQ Futures trading via ICT (Inner Circle Trader) methodology. Built to demonstrate senior-level frontend engineering skills: financial data visualization, performance, accessibility, and editorial design.

**Live demo:** _coming soon_
**Design system:** Stitch AI — institutional dark mode, Newsreader + Inter, 0px radius, hairline borders

---

## Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Framework  | Next.js 14 (App Router)        |
| Language   | TypeScript (strict)            |
| Styling    | Tailwind CSS + shadcn/ui       |
| Charts     | Recharts                       |
| Animation  | Framer Motion                  |
| Content    | MDX (next-mdx-remote)          |
| Forms      | React Hook Form + Zod          |
| Fonts      | Newsreader + Inter (next/font) |
| Deployment | Vercel                         |

---

## Performance Highlights

| Metric       | Value                           |
| ------------ | ------------------------------- |
| Period       | Jan 2018 → May 2026 (8.2 years) |
| Total Return | **+1,417%**                     |
| CAGR         | **39.0%**                       |
| Sharpe Ratio | **3.20**                        |
| Max Drawdown | **-25.5%**                      |
| Win Rate     | **59.3%** (953 / 1,607 trades)  |

---

## Project Structure

```
miky-equity/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   └── sections/           # Business logic components
├── lib/
│   └── finance.ts          # Pure financial calculation functions (tested)
├── data/
│   ├── backtest.json       # 101 months of aggregated backtest data
│   ├── trades.json         # 1,607 individual trades
│   └── portfolio.json      # 5 portfolio companies with real MOIC
├── content/                # MDX articles
├── design/                 # Stitch AI exports (HTML + PNG per page)
└── scripts/
    └── process_backtest.py # CSV → JSON transformation script
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pages

| Page                  | Route           |
| --------------------- | --------------- |
| Homepage              | `/`             |
| Performance Dashboard | `/performance`  |
| Portfolio             | `/portefeuille` |
| Strategy              | `/strategie`    |
| About                 | `/a-propos`     |
| Team                  | `/equipe`       |
| Insights              | `/analyses`     |
| Contact               | `/contact`      |

---

## Data & Methodology

All performance data is generated from a real backtest (`nq_ict_backtest_results.csv`) on NQ Futures using ICT methodology across three sessions (Asia, London, New York). Financial metrics (CAGR, Sharpe, Sortino, Max Drawdown) are calculated via pure functions in `lib/finance.ts` and unit-tested with Vitest.

**Risk model:** 1% fixed risk per trade (1R = $1,000 on $100k capital)

_Screenshots and badges will be added after deployment._
