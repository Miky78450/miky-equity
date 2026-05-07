import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";
import backtestData from "@/data/backtest.json";
import { calcAllMetrics } from "@/lib/finance";
import { EquityCurve } from "@/components/charts/EquityCurve";
import { DrawdownChart } from "@/components/charts/DrawdownChart";
import { MonthlyHeatmap } from "@/components/charts/MonthlyHeatmap";

export const metadata: Metadata = { title: "Performance" };

export default function PerformancePage() {
  const metrics = calcAllMetrics(backtestData);

  const KPIs = [
    { label: "CAGR ANNUEL", value: `+${(metrics.cagr * 100).toFixed(1)}%` },
    { label: "SHARPE RATIO", value: metrics.sharpe.toFixed(2) },
    { label: "SORTINO RATIO", value: metrics.sortino.toFixed(2) },
    {
      label: "MAX DRAWDOWN",
      value: `${(metrics.maxDrawdown * 100).toFixed(1)}%`,
    },
    {
      label: "VOLATILITÉ (ANN)",
      value: `${(metrics.annualizedVolatility * 100).toFixed(1)}%`,
    },
    {
      label: "TAUX DE RÉUSSITE",
      value: `${(metrics.winRate * 100).toFixed(1)}%`,
    },
  ];

  const totalTrades = backtestData.reduce((a, d) => a + d.trades, 0);

  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-4 border-b pt-32 pb-16">
        <div className="col-span-12 md:col-span-8">
          <Eyebrow className="mb-4">Performance Institutionnelle</Eyebrow>
          <h1 className="text-headline-lg text-foreground leading-none">
            Analyses de Performance &amp; Alpha Historique.
          </h1>
        </div>
      </section>

      {/* ── KPI Strip ────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b">
        <div className="border-border grid grid-cols-2 border-t md:grid-cols-3 lg:grid-cols-6">
          {KPIs.map((kpi, i) => (
            <div
              key={kpi.label}
              className={[
                "border-border py-12",
                i < 5 ? "border-r" : "",
                i === 0 ? "pr-4" : "px-4",
              ].join(" ")}
            >
              <p className="text-label-caps text-muted-foreground mb-2">
                {kpi.label}
              </p>
              <p className="text-headline-md text-gold">{kpi.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Equity Curve ─────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-headline-md text-foreground">
            Croissance de l&apos;Equity
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-gold inline-block h-3 w-3" />
            <span className="text-label-caps text-muted-foreground">
              MIKY EQUITY
            </span>
          </div>
        </div>
        <div className="border-border bg-surface-low border">
          <EquityCurve data={backtestData} />
        </div>
        <p className="text-label-caps text-muted-foreground mt-4">
          $100 000 → $1 517 071 &middot; {backtestData.length} mois &middot;{" "}
          {totalTrades} trades exécutés
        </p>
      </section>

      {/* ── Monthly Heatmap ──────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-b py-16">
        <h2 className="text-headline-md text-foreground mb-8">
          Heatmap des Rendements Mensuels (%)
        </h2>
        <MonthlyHeatmap data={backtestData} />
      </section>

      {/* ── Drawdown ─────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-8 border-b py-16">
        <div className="col-span-12 md:col-span-5">
          <h3 className="text-headline-md text-foreground mb-6">
            Profil de Risque &amp; Drawdown
          </h3>
          <p className="text-body-md text-muted-foreground mb-8 max-w-md">
            Notre stratégie privilégie la préservation du capital. La discipline
            du sizing constant à 1% par trade maintient le drawdown maximal
            observé à {(metrics.maxDrawdown * 100).toFixed(1)}% sur 8.2 ans
            d&apos;exécution.
          </p>
          <div className="space-y-0">
            {[
              {
                label: "MAX DRAWDOWN",
                value: `${(metrics.maxDrawdown * 100).toFixed(1)}%`,
              },
              {
                label: "VOLATILITÉ ANNUALISÉE",
                value: `${(metrics.annualizedVolatility * 100).toFixed(1)}%`,
              },
              {
                label: "SHARPE / SORTINO",
                value: `${metrics.sharpe.toFixed(2)} / ${metrics.sortino.toFixed(2)}`,
              },
              {
                label: "TOTAL TRADES",
                value: totalTrades.toLocaleString("fr-FR"),
              },
            ].map((row) => (
              <div
                key={row.label}
                className="border-border flex justify-between border-b py-4"
              >
                <span className="text-label-caps text-muted-foreground">
                  {row.label}
                </span>
                <span className="text-data-tabular text-foreground tabular-nums">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-border bg-surface-low col-span-12 self-center border md:col-span-7">
          <DrawdownChart data={backtestData} />
        </div>
      </section>

      {/* ── Méthodologie ─────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-16">
        <Eyebrow className="mb-4">Méthodologie</Eyebrow>
        <h2 className="text-headline-md text-foreground mb-12">
          Hypothèses du backtest.
        </h2>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <h4 className="text-body-lg text-foreground mb-3 font-medium">
              Instrument &amp; marché
            </h4>
            <p className="text-body-md text-muted-foreground">
              NQ Futures (NASDAQ-100 E-mini) sur données intraday 1 minute.
              Période : janvier 2018 à mai 2026 — 8.2 ans incluant plusieurs
              cycles de marché (haussier 2019–2021, baissier 2022, reprise
              2023–2025).
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <h4 className="text-body-lg text-foreground mb-3 font-medium">
              Paramètres d&apos;exécution
            </h4>
            <p className="text-body-md text-muted-foreground">
              Capital initial de $100 000. Risque fixe à 1% par trade ($1 000 à
              l&apos;ouverture). Aucun levier additionnel. Frais de courtage et
              slippage non modélisés — les chiffres représentent la performance
              brute de la stratégie.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <h4 className="text-body-lg text-foreground mb-3 font-medium">
              Métriques calculées
            </h4>
            <p className="text-body-md text-muted-foreground">
              CAGR calculé sur 8.2 ans (101 mois). Sharpe et Sortino annualisés
              depuis les rendements mensuels, taux sans risque = 0. Drawdown
              mesuré pic-à-creux sur l&apos;equity curve complète.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divulgation ──────────────────────────────────────────────────── */}
      <section className="px-gutter py-12">
        <p className="text-label-caps text-muted-foreground/40 max-w-4xl text-[10px] leading-relaxed tracking-widest uppercase">
          Divulgation méthodologique : les données de performance présentées
          sont issues d&apos;un backtest systématique sur données historiques.
          Les performances passées ne sont pas indicatives des résultats futurs.
          Ce document est fourni à titre informatif uniquement et ne constitue
          pas une offre d&apos;investissement.
        </p>
      </section>
    </main>
  );
}
