import Link from "next/link";
import { DisplayHeading, Eyebrow } from "@/components/ui/typography";
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/ui/FadeIn";
import { CountUp } from "@/components/ui/CountUp";

const PHILOSOPHIES = [
  {
    num: "01",
    title: "Structure de marché ICT",
    body: "Nous opérons exclusivement sur des zones institutionnelles confirmées — Fair Value Gaps, Order Blocks, Breakers. Chaque trade nécessite une confluence de trois signaux minimum avant exécution.",
  },
  {
    num: "02",
    title: "Gestion du risque absolue",
    body: "Le risque par trade est fixé à 1% du capital, sans exception. La préservation du capital prime sur la recherche de rendement — la capitalisation disciplinée fait le reste sur 8 ans.",
  },
  {
    num: "03",
    title: "Sessions de liquidité",
    body: "Nous opérons exclusivement pendant les sessions London Kill Zone (7h–10h CET) et NY Kill Zone (14h30–16h CET), là où les flux institutionnels sont les plus concentrés.",
  },
];

const KPI_ITEMS = [
  { label: "CAGR", value: "+39.0%" },
  { label: "Sharpe Ratio", value: "3.20" },
  { label: "Max Drawdown", value: "-25.5%" },
  { label: "Historique", value: "8.2 ans" },
];

const INSIGHTS = [
  {
    category: "LETTRE TRIMESTRIELLE",
    title: "La convexité de l'incertitude : naviguer les FVG au T4 2024.",
    slug: "convexite-incertitude-t4-2024",
    offset: "",
  },
  {
    category: "DOCUMENT DE RECHERCHE",
    title: "Pourquoi les Order Blocks sur NQ surperforment en session London.",
    slug: "order-blocks-nq-session-london",
    offset: "lg:mt-24",
  },
  {
    category: "NOTE STRATÉGIQUE",
    title:
      "ICT vs Price Action classique : une analyse comparative sur 1607 trades.",
    slug: "ict-vs-price-action-analyse",
    offset: "lg:mt-12",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter grid grid-cols-12 gap-4 pt-32 pb-24">
        <FadeIn
          className="col-span-12 lg:col-span-9"
          direction="up"
          duration={0.8}
        >
          <DisplayHeading>
            Capital discipliné.
            <br />
            Rendements asymétriques.
          </DisplayHeading>
        </FadeIn>

        {/* KPI Strip */}
        <StaggerChildren
          className="border-border col-span-12 mt-12 grid grid-cols-2 gap-8 border-t pt-8 md:grid-cols-4"
          baseDelay={0.3}
          staggerDelay={0.1}
        >
          {KPI_ITEMS.map((kpi) => (
            <StaggerItem key={kpi.label}>
              <p className="text-label-caps text-muted-foreground mb-1">
                {kpi.label}
              </p>
              <p className="text-headline-md text-gold tabular-nums">
                <CountUp value={kpi.value} duration={1.6} />
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Philosophie ──────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-t py-32">
        <StaggerChildren
          className="grid grid-cols-12 gap-8 lg:gap-16"
          baseDelay={0}
          staggerDelay={0.15}
        >
          {PHILOSOPHIES.map((p) => (
            <StaggerItem key={p.num} className="col-span-12 lg:col-span-4">
              <Eyebrow className="mb-6">PHILOSOPHIE {p.num}</Eyebrow>
              <h3 className="text-headline-md text-foreground mb-5">
                {p.title}
              </h3>
              <p className="text-body-lg text-muted-foreground">{p.body}</p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>

      {/* ── Equity Curve Preview ─────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 items-center gap-8 border-t py-32">
        <FadeIn
          className="col-span-12 mb-12 lg:col-span-5 lg:mb-0"
          direction="left"
        >
          <Eyebrow className="mb-4">Performance cumulée</Eyebrow>
          <h3 className="text-headline-lg text-foreground mb-8">
            Surperformer les indices à travers les cycles.
          </h3>
          <p className="text-body-md text-muted-foreground mb-8">
            $100 000 → $1 517 071 en 8.2 ans. Stratégie ICT sur NQ Futures,
            risque constant à 1% par trade, 1607 trades exécutés.
          </p>
          <Link
            href="/performance"
            className="text-label-caps text-background bg-gold inline-block px-8 py-4 transition-opacity hover:opacity-90"
          >
            Voir la performance complète
          </Link>
        </FadeIn>

        <FadeIn
          className="border-border relative col-span-12 h-[360px] border p-6 lg:col-span-7"
          direction="right"
          delay={0.15}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1000 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="equityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e4c278" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#e4c278" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 300 L80 295 L160 290 L240 275 L320 255 L400 265 L480 230 L560 195 L640 210 L720 155 L800 140 L880 80 L960 45 L1000 30"
              fill="none"
              stroke="#e4c278"
              strokeWidth="1.5"
            />
            <path
              d="M0 300 L80 295 L160 290 L240 275 L320 255 L400 265 L480 230 L560 195 L640 210 L720 155 L800 140 L880 80 L960 45 L1000 30 L1000 320 L0 320 Z"
              fill="url(#equityGrad)"
            />
          </svg>
          <div
            className="absolute right-6 bottom-3 left-6 flex justify-between"
            aria-hidden="true"
          >
            <span className="text-muted-foreground text-[9px] tracking-widest">
              JAN 2018
            </span>
            <span className="text-muted-foreground text-[9px] tracking-widest">
              2020
            </span>
            <span className="text-muted-foreground text-[9px] tracking-widest">
              2022
            </span>
            <span className="text-muted-foreground text-[9px] tracking-widest">
              2024
            </span>
            <span className="text-muted-foreground text-[9px] tracking-widest">
              MAI 2026
            </span>
          </div>
        </FadeIn>
      </section>

      {/* ── Analyses récentes ────────────────────────────────────────────── */}
      <section className="px-gutter bg-surface-low border-border border-t py-32">
        <FadeIn className="mb-16 flex items-end justify-between">
          <h3 className="text-headline-lg text-foreground">
            Analyses de
            <br />
            Capital
          </h3>
          <Link
            href="/analyses"
            className="text-label-caps text-gold hover-underline relative mb-2"
          >
            Voir toutes les analyses
          </Link>
        </FadeIn>

        <StaggerChildren
          className="grid grid-cols-12 gap-8"
          staggerDelay={0.12}
        >
          {INSIGHTS.map((article) => (
            <StaggerItem
              key={article.slug}
              className={`col-span-12 lg:col-span-4 ${article.offset}`}
            >
              <Link
                href={`/analyses/${article.slug}`}
                className="group block cursor-pointer"
              >
                <div className="bg-surface-high border-border relative mb-6 aspect-[4/5] overflow-hidden border">
                  <div className="to-surface-high/50 absolute inset-0 bg-gradient-to-b from-transparent" />
                </div>
                <span className="text-label-caps text-gold mb-3 block">
                  {article.category}
                </span>
                <h4 className="font-heading text-foreground group-hover:text-gold text-[26px] leading-tight font-light transition-colors duration-300">
                  {article.title}
                </h4>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>
    </main>
  );
}
