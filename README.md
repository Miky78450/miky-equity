# Miky Equity — Institutional Trading Platform

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Tests-24%20pass-6da13f?logo=vitest)
![CI](https://github.com/Miky78450/miky-equity/actions/workflows/ci.yml/badge.svg)

> **Disclaimer:** Miky Equity is a fictional company created for educational and portfolio demonstration purposes. All performance data is derived from a real backtest of an ICT/NQ Futures strategy but presented in a fictional fund context. No real investment advice is provided.

**Live demo:** [miky-equity.vercel.app](https://miky-equity.vercel.app)  
**Design system:** Stitch AI — institutional dark mode, Newsreader + Inter, 0px radius, hairline borders

---

## Overview

A high-fidelity institutional web platform for Miky Equity, a fictional quantitative hedge fund specializing in NQ Futures trading via ICT (Inner Circle Trader) methodology.

Built to demonstrate production-grade frontend engineering: financial data visualization, server/client component architecture, SEO, accessibility (WCAG AA), and editorial design systems.

---

## Stack

| Layer      | Technology                     | Why                                                                  |
| ---------- | ------------------------------ | -------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)        | SSG/SSR by default, file-based routing, built-in OG image generation |
| Language   | TypeScript (strict)            | Compile-time safety on financial data structures                     |
| Styling    | Tailwind CSS v4 + shadcn/ui    | Design tokens, zero-runtime, utility-first                           |
| Charts     | Recharts                       | Composable, responsive, SSR-safe                                     |
| Animation  | Framer Motion 12               | Scroll-triggered fade-ins, count-up, stagger                         |
| Content    | @next/mdx                      | SSG MDX articles bundled at build time (no runtime parsing)          |
| Forms      | React Hook Form + Zod          | Client-side schema validation, a11y error binding                    |
| Fonts      | Newsreader + Inter (next/font) | Zero layout shift, self-hosted subsets                               |
| Analytics  | Vercel Analytics               | Privacy-friendly, zero config                                        |
| Tests      | Vitest                         | 24 unit tests on pure finance functions                              |
| CI         | GitHub Actions                 | Lint + build on every push to main                                   |
| Deployment | Vercel (Hobby)                 | Edge CDN, automatic preview deployments                              |

---

## Performance Highlights

| Metric        | Value                           |
| ------------- | ------------------------------- |
| Period        | Jan 2018 → May 2026 (8.2 years) |
| Total Return  | **+1,417%**                     |
| CAGR          | **39.0%**                       |
| Sharpe Ratio  | **3.20**                        |
| Sortino Ratio | **5.12**                        |
| Max Drawdown  | **-25.5%**                      |
| Win Rate      | **59.3%** (953 / 1,607 trades)  |

---

## Financial Calculations

All metrics are computed from raw backtest data in `lib/finance.ts` using pure functions with no external dependencies:

| Function                   | Formula                                                                           |
| -------------------------- | --------------------------------------------------------------------------------- |
| `calcCAGR`                 | `(finalEquity / 100000)^(1/years) - 1`                                            |
| `calcSharpe`               | `(meanReturn × 12) / annualizedVol` — risk-free rate = 0                          |
| `calcSortino`              | `(meanReturn × 12) / downsideDev` — downside deviation from negative returns only |
| `calcMaxDrawdown`          | Peak-to-trough over the full equity curve                                         |
| `calcAnnualizedVolatility` | `stddev(monthlyReturns) × √12`                                                    |
| `calcWinRate`              | `totalWins / totalTrades` summed across all 101 months                            |

All 6 functions are covered by 24 Vitest unit tests (`npm test`).

---

## Project Structure

```
├── app/                        # Next.js App Router
│   ├── page.tsx                # Homepage — hero, KPIs, equity preview, insights
│   ├── performance/page.tsx    # Dashboard — equity curve, heatmap, drawdown, S&P comparison
│   ├── portefeuille/           # Portfolio list (searchParams filters) + [slug] detail pages
│   ├── analyses/               # MDX blog list + [slug] article pages
│   ├── strategie/              # ICT strategy editorial page
│   ├── a-propos/               # About, timeline, values
│   ├── equipe/                 # Team profiles
│   ├── contact/                # Server + ContactForm client component
│   ├── opengraph-image.tsx     # Dynamic OG image (Satori) — global
│   ├── sitemap.ts              # 19-URL sitemap auto-generated
│   └── robots.ts               # Allow all + sitemap pointer
├── components/
│   ├── charts/                 # EquityCurve, DrawdownChart, MonthlyHeatmap, ComparisonChart
│   ├── layout/                 # Navbar (ticker, mobile drawer), Footer
│   ├── mdx/                    # <Callout> MDX component
│   ├── sections/               # ContactForm, PortfolioFilters, TableOfContents
│   └── ui/                     # FadeIn/StaggerChildren, CountUp, typography, button
├── lib/
│   ├── finance.ts              # Pure financial metric functions (tested)
│   ├── finance.test.ts         # 24 Vitest unit tests
│   └── articles.ts             # Single source of truth for MDX metadata
├── data/
│   ├── backtest.json           # 101 months aggregated (Jan 2018 – May 2026)
│   ├── sp500.json              # S&P 500 normalized to $100k for comparison
│   ├── trades.json             # 1,607 individual trade records
│   └── portfolio.json          # 5 portfolio companies with MOIC/IRR
├── content/analyses/           # 3 MDX articles
├── design/                     # Stitch AI exports — HTML + PNG per page
└── scripts/
    └── process_backtest.py     # CSV → JSON transformation script
```

---

## Pages

| Page                  | Route                  | Type                   |
| --------------------- | ---------------------- | ---------------------- |
| Homepage              | `/`                    | Static                 |
| Performance Dashboard | `/performance`         | Static                 |
| Portfolio             | `/portefeuille`        | Dynamic (searchParams) |
| Portfolio Detail      | `/portefeuille/[slug]` | SSG × 5                |
| Strategy              | `/strategie`           | Static                 |
| About                 | `/a-propos`            | Static                 |
| Team                  | `/equipe`              | Static                 |
| Insights              | `/analyses`            | Static                 |
| Article               | `/analyses/[slug]`     | SSG × 3                |
| Contact               | `/contact`             | Static                 |

---

## Key Technical Decisions

**App Router server/client split** — pages are Server Components (metadata, data fetching) with isolated `"use client"` leaf components only where interactivity requires it (charts, forms, filters, animations).

**MDX via @next/mdx with static contentMap** — dynamic `import(variable)` fails with Turbopack (MODULE_NOT_FOUND at runtime). Solution: a static `contentMap` object with literal import paths, fully bundleable at compile time.

**Portfolio filters via URL searchParams** — state lives in the URL (`?secteur=&statut=&vintage=`), not in React state. The Server Component reads and filters before render — shareable, bookmarkable, SSR-correct.

**Satori OG images** — every page and every article has a generated 1200×630 Open Graph image. Satori requires `display: flex` on all multi-child divs; no JSX text node literals.

**Framer Motion 12 tuple typing** — `ease` arrays must be typed `as [number, number, number, number]` to satisfy stricter generic constraints in v12.

---

## Getting Started

```bash
git clone https://github.com/Miky78450/miky-equity.git
cd miky-equity
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
npm test        # Run 24 Vitest unit tests
npm run build   # Production build (25 pages)
npm run lint    # ESLint
```

---

## Data & Methodology

Performance data is generated from a real backtest on `nq_ict_backtest_results.csv` — NQ Futures (NASDAQ-100 E-mini) intraday 1-minute data, ICT methodology. The script `scripts/process_backtest.py` transforms the raw CSV into typed JSON consumed at build time.

**Risk model:** 1% fixed risk per trade (1R = $1,000 on $100k capital). No leverage. Commissions and slippage not modeled — figures represent gross strategy performance.

Portfolio companies (Nexum Logistics, BioSynth Pharma, Elara Systems, Ventara Energy, Aether Analytics) are entirely fictional. MOIC and IRR are calculated from backtest equity growth during each company's simulated investment window.

---

_Fictional platform for educational and portfolio demonstration purposes only — not a real financial product._
