import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/typography";
import portfolioData from "@/data/portfolio.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioData.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = portfolioData.find((c) => c.slug === slug);
  if (!company) return { title: "Not Found" };
  return { title: company.name };
}

export default async function PortefeuilleSlugPage({ params }: Props) {
  const { slug } = await params;
  const company = portfolioData.find((c) => c.slug === slug);
  if (!company) notFound();

  const entryLabel = new Date(company.entryDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });
  const exitLabel = company.exitDate
    ? new Date(company.exitDate).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
      })
    : null;

  // acquirer only exists on exited companies
  const acquirer = "acquirer" in company ? (company.acquirer as string) : null;

  const detailRows = [
    { label: "SECTEUR", value: company.sector },
    { label: "SOUS-SECTEUR", value: company.subsector },
    { label: "SIÈGE SOCIAL", value: company.hq },
    {
      label: "ALLOCATION",
      value: `${(company.allocation * 100).toFixed(0)}% du fonds`,
    },
    { label: "DATE D'ENTRÉE", value: entryLabel },
    ...(exitLabel
      ? [
          {
            label: "DATE DE SORTIE",
            value: acquirer
              ? `${exitLabel} — Acquis par ${acquirer}`
              : exitLabel,
          },
        ]
      : [{ label: "STATUT", value: "En portefeuille (actif)" }]),
    {
      label: "WIN RATE PÉRIODE",
      value: `${((company.tradesWins / company.tradesCount) * 100).toFixed(1)}% (${company.tradesWins}/${company.tradesCount} trades)`,
    },
  ];

  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-8 border-b pt-32 pb-16">
        <div className="col-span-12 md:col-span-8">
          <Eyebrow className="mb-4">{company.sector}</Eyebrow>
          <h1 className="text-headline-lg text-foreground mb-4 leading-none">
            {company.name}
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-xl">
            {company.tagline}
          </p>
        </div>
        <div className="col-span-12 flex flex-row items-start justify-between gap-4 md:col-span-4 md:flex-col md:items-end md:justify-end">
          <span
            className={[
              "text-label-caps border px-2 py-1",
              company.status === "active"
                ? "text-gold border-gold"
                : "text-muted-foreground border-border",
            ].join(" ")}
          >
            {company.status === "active"
              ? "Actif"
              : exitLabel
                ? `Sorti — ${new Date(company.exitDate!).getFullYear()}`
                : "Sorti"}
          </span>
          <Link
            href="/portefeuille"
            className="text-label-caps text-muted-foreground hover:text-gold transition-colors"
          >
            ← Retour
          </Link>
        </div>
      </section>

      {/* ── Key Metrics Strip ─────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b">
        <div className="border-border grid grid-cols-2 border-t md:grid-cols-3 lg:grid-cols-6">
          {company.keyMetrics.map((metric, i) => (
            <div
              key={metric.label}
              className={[
                "border-border py-12",
                i < 5 ? "border-r" : "",
                i === 0 ? "pr-4" : "px-4",
              ].join(" ")}
            >
              <p className="text-label-caps text-muted-foreground mb-2">
                {metric.label}
              </p>
              <p className="text-headline-md text-gold">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Description + Thèse ─────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-8 border-b py-16">
        <div className="col-span-12 lg:col-span-6">
          <Eyebrow className="mb-4">Profil de la société</Eyebrow>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            {company.description}
          </p>
        </div>
        <div className="border-border col-span-12 lg:col-span-6 lg:border-l lg:pl-8">
          <Eyebrow className="mb-4">Thèse d&apos;investissement</Eyebrow>
          <p className="text-body-lg text-muted-foreground leading-relaxed">
            {company.thesis}
          </p>
        </div>
      </section>

      {/* ── Détail & Tags ────────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-8 border-b py-12">
        {/* Detail rows */}
        <div className="col-span-12 md:col-span-7">
          <Eyebrow className="mb-4">Informations</Eyebrow>
          <div className="space-y-0">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="border-border flex justify-between border-b py-4"
              >
                <span className="text-label-caps text-muted-foreground">
                  {row.label}
                </span>
                <span className="text-data-tabular text-foreground max-w-[60%] text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="border-border col-span-12 md:col-span-5 md:border-l md:pl-8">
          <Eyebrow className="mb-4">Tags</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag) => (
              <span
                key={tag}
                className="text-label-caps text-muted-foreground border-border border px-3 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Subsector */}
          <div className="mt-8">
            <p className="text-label-caps text-muted-foreground mb-2">
              SOUS-SECTEUR
            </p>
            <p className="text-body-md text-foreground">{company.subsector}</p>
          </div>
        </div>
      </section>

      {/* ── Navigation ───────────────────────────────────────────────────── */}
      <section className="px-gutter border-border flex items-center justify-between border-b py-8">
        <Link
          href="/portefeuille"
          className="text-label-caps text-gold hover:text-foreground transition-colors"
        >
          ← Toutes les participations
        </Link>
        <Link
          href="/performance"
          className="text-label-caps text-muted-foreground hover:text-gold transition-colors"
        >
          Voir la performance →
        </Link>
      </section>

      {/* ── Divulgation ──────────────────────────────────────────────────── */}
      <section className="px-gutter py-12">
        <p className="text-label-caps text-muted-foreground/40 max-w-4xl text-[10px] leading-relaxed tracking-widest uppercase">
          Cette participation est fictive et créée à titre illustratif. Les
          métriques financières (MOIC, IRR) sont calculées sur la base du
          backtest de la stratégie ICT NQ Futures. Les performances passées ne
          constituent pas une garantie de résultats futurs.
        </p>
      </section>
    </main>
  );
}
