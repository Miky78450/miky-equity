import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/typography";
import { PortfolioFilters } from "@/components/sections/PortfolioFilters";
import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
  title: "Portefeuille",
  description:
    "5 participations actives et sorties — technologie, santé, énergie et fintech. MOIC moyen 5.97x, IRR 42.6% sur 5 investissements.",
};

// Stagger vertical offsets — alternating rhythm like the design
const STAGGER = ["", "md:mt-24", "", "lg:-mt-12", "md:mt-12"] as const;

// Abstract dark gradient backgrounds per company (no external URLs)
const SECTOR_BG: Record<string, string> = {
  "nexum-logistics": "bg-[#0c1520]",
  "biosynth-pharma": "bg-[#0c1a12]",
  "elara-systems": "bg-[#12101a]",
  "ventara-energy": "bg-[#1a1208]",
  "aether-analytics": "bg-[#0a1618]",
};

interface SearchParams {
  secteur?: string;
  statut?: string;
  vintage?: string;
}

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function PortefeuillePage({ searchParams }: Props) {
  const { secteur, statut, vintage } = await searchParams;

  // Filter server-side based on URL params
  const filtered = portfolioData.filter((c) => {
    if (secteur && c.sector !== secteur) return false;
    if (statut && c.status !== statut) return false;
    if (vintage && c.vintage !== Number(vintage)) return false;
    return true;
  });

  const avgMOIC = (
    portfolioData.reduce((s, c) => s + c.moic, 0) / portfolioData.length
  ).toFixed(2);
  const avgIRR = (
    (portfolioData.reduce((s, c) => s + c.irr, 0) / portfolioData.length) *
    100
  ).toFixed(1);
  const countries = new Set(portfolioData.map((c) => c.country)).size;
  const active = portfolioData.filter((c) => c.status === "active").length;

  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-4 border-b pt-32 pb-16">
        <div className="col-span-12 md:col-span-8">
          <Eyebrow className="mb-4">Portefeuille</Eyebrow>
          <h1 className="text-headline-lg text-foreground leading-none">
            Allocation Sélective du Capital.
          </h1>
          <p className="text-body-lg text-muted-foreground mt-6 max-w-xl">
            Notre portefeuille représente une sélection rigoureuse
            d&apos;investissements à forte conviction. Chaque participation
            témoigne de notre philosophie de création de valeur durable.
          </p>
        </div>
        <div className="col-span-12 mt-8 flex items-end justify-start md:col-span-4 md:mt-0 md:justify-end">
          <div className="space-y-1">
            <p className="text-label-caps text-muted-foreground">
              {portfolioData.length} PARTICIPATIONS
            </p>
            <p className="text-label-caps text-gold">{active} ACTIVES</p>
          </div>
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <section className="px-gutter">
        <PortfolioFilters
          currentSector={secteur ?? null}
          currentStatus={statut ?? null}
          currentVintage={vintage ?? null}
          totalResults={filtered.length}
          totalAll={portfolioData.length}
        />
      </section>

      {/* ── Portfolio Grid ────────────────────────────────────────────────── */}
      <section className="px-gutter py-16">
        {filtered.length === 0 ? (
          <p className="text-body-md text-muted-foreground py-16 text-center">
            Aucune participation ne correspond à ces filtres.
          </p>
        ) : (
          <div className="grid grid-cols-12 gap-x-8 gap-y-16">
            {filtered.map((company, i) => (
              <Link
                key={company.slug}
                href={`/portefeuille/${company.slug}`}
                className={[
                  "group col-span-12 cursor-pointer md:col-span-6 lg:col-span-4",
                  STAGGER[i] ?? "",
                ].join(" ")}
              >
                {/* Thumbnail */}
                <div
                  className={[
                    "relative mb-6 flex aspect-[4/5] items-end justify-start overflow-hidden",
                    SECTOR_BG[company.slug] ?? "bg-surface-low",
                  ].join(" ")}
                >
                  {/* Geometric abstract pattern */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="border-gold/10 group-hover:border-gold/25 absolute top-[15%] left-[10%] h-[40%] w-[40%] border transition-colors duration-700" />
                    <div className="border-gold/5 group-hover:border-gold/15 absolute top-[30%] left-[25%] h-[55%] w-[55%] border transition-colors duration-700" />
                    <div className="border-gold/8 group-hover:border-gold/20 absolute right-[15%] bottom-[20%] h-[30%] w-[30%] border transition-colors duration-700" />
                  </div>
                  {/* Company initial */}
                  <span className="text-gold/10 group-hover:text-gold/20 relative z-10 m-6 font-[Newsreader] text-[80px] leading-none font-light transition-colors duration-700 select-none">
                    {company.name.charAt(0)}
                  </span>
                  {/* MOIC badge */}
                  <span className="text-label-caps text-gold bg-background/80 absolute top-4 right-4 px-2 py-1">
                    {company.moic}x MOIC
                  </span>
                </div>

                {/* Card meta */}
                <div className="mb-4 flex items-start justify-between">
                  <span
                    className={[
                      "text-label-caps border px-2 py-1",
                      company.status === "active"
                        ? "text-gold border-gold"
                        : "text-muted-foreground border-border",
                    ].join(" ")}
                  >
                    {company.status === "active" ? "Actif" : "Sorti"}
                  </span>
                  <span className="text-label-caps text-muted-foreground">
                    Vintage {company.vintage}
                  </span>
                </div>

                <h2 className="text-headline-md text-foreground group-hover:text-gold mb-1 leading-tight transition-colors duration-300">
                  {company.name}
                </h2>
                <p className="text-body-md text-muted-foreground mb-4 line-clamp-2">
                  {company.tagline}
                </p>

                <div className="border-border flex items-center justify-between border-t pt-4">
                  <span className="text-label-caps text-muted-foreground tracking-widest uppercase">
                    {company.sector}
                  </span>
                  <span className="text-label-caps text-gold inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Portfolio KPIs ────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-t py-24">
        <div className="border-border grid grid-cols-2 border-b md:grid-cols-4">
          {[
            {
              label: "MOIC MOYEN",
              value: `${avgMOIC}x`,
              sub: "Retour réalisé moyen sur le capital déployé",
            },
            {
              label: "PARTICIPATIONS",
              value: `${portfolioData.length}`,
              sub: "Positions concentrées à forte conviction",
            },
            {
              label: "IRR MOYEN NET",
              value: `${avgIRR}%`,
              sub: "Taux de rendement interne annualisé",
            },
            {
              label: "GÉOGRAPHIES",
              value: `${countries}`,
              sub: "Présence stratégique sur les marchés européens",
            },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className={[
                "border-border py-16",
                i < 3 ? "border-r" : "",
                i === 0 ? "pr-8" : "px-8",
              ].join(" ")}
            >
              <p className="text-label-caps text-muted-foreground mb-3">
                {kpi.label}
              </p>
              <p className="text-headline-md text-gold mb-4">{kpi.value}</p>
              <p className="text-body-md text-muted-foreground max-w-[200px]">
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divulgation ──────────────────────────────────────────────────── */}
      <section className="px-gutter pb-12">
        <p className="text-label-caps text-muted-foreground/40 max-w-4xl text-[10px] leading-relaxed tracking-widest uppercase">
          Les performances et multiples présentés sont calculés sur la base d
          &apos;un backtest systématique de la stratégie ICT NQ Futures. Les
          participations décrites sont fictives et créées à titre illustratif.
          Ce document ne constitue pas une offre d&apos;investissement.
        </p>
      </section>
    </main>
  );
}
