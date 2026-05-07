import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Analyses | Miky Equity",
  description:
    "Notes de marché, recherche ICT et perspectives macroéconomiques publiées par l'équipe Miky Equity.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  Stratégie: "text-gold border-gold/30",
  "Analyse technique": "text-blue-400 border-blue-400/30",
  "Risk Management": "text-emerald-400 border-emerald-400/30",
};

export default function AnalysesPage() {
  const sorted = [...articles].sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  return (
    <main className="px-gutter flex-1 py-32">
      {/* Header */}
      <div className="mb-20 max-w-2xl">
        <Eyebrow className="mb-6">Insights</Eyebrow>
        <SectionHeading as="h1" className="mb-6">
          Notes de marché & recherche
        </SectionHeading>
        <p className="text-body-lg text-muted-foreground">
          Perspectives ICT, analyses de structure de marché et réflexions sur la
          gestion du risque publiées par l&apos;équipe de recherche Miky Equity.
        </p>
      </div>

      {/* Articles list */}
      <div className="divide-border divide-y">
        {sorted.map((article) => {
          const colorClass =
            categoryColors[article.metadata.category] ??
            "text-gold border-gold/30";
          return (
            <Link
              key={article.slug}
              href={`/analyses/${article.slug}`}
              className="group flex flex-col gap-4 py-10 transition-colors hover:bg-white/[0.02] md:flex-row md:items-start md:gap-12 md:px-4"
            >
              {/* Date column */}
              <div className="text-label-caps text-muted-foreground shrink-0 md:w-36">
                {formatDate(article.metadata.date)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className={`text-label-caps border px-2 py-0.5 ${colorClass}`}
                  >
                    {article.metadata.category}
                  </span>
                  <span className="text-label-caps text-muted-foreground">
                    {article.metadata.readTime}
                  </span>
                </div>
                <h2 className="text-headline-md text-foreground group-hover:text-gold mb-3 transition-colors">
                  {article.metadata.title}
                </h2>
                <p className="text-body-md text-muted-foreground line-clamp-2">
                  {article.metadata.summary}
                </p>
              </div>

              {/* Arrow */}
              <div className="hidden shrink-0 items-center self-center md:flex">
                <span className="text-muted-foreground group-hover:text-gold transition-colors">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
