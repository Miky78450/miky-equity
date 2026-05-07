import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/typography";
import { TableOfContents } from "@/components/sections/TableOfContents";
import { articleSlugs, getArticleBySlug } from "@/lib/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

// Static map with literal paths so Turbopack can bundle each MDX file
const contentMap: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  "pourquoi-le-nq-futures-est-notre-instrument-de-predilection": () =>
    import("@/content/analyses/pourquoi-le-nq-futures-est-notre-instrument-de-predilection.mdx"),
  "anatomie-dun-fair-value-gap-en-kill-zone": () =>
    import("@/content/analyses/anatomie-dun-fair-value-gap-en-kill-zone.mdx"),
  "gestion-du-drawdown-discipline-vs-modele": () =>
    import("@/content/analyses/gestion-du-drawdown-discipline-vs-modele.mdx"),
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: `${article.metadata.title} | Miky Equity`,
    description: article.metadata.summary,
    openGraph: {
      title: article.metadata.title,
      description: article.metadata.summary,
      type: "article",
      publishedTime: article.metadata.date,
      images: [
        {
          url: `/analyses/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: article.metadata.title,
        },
      ],
    },
  };
}

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

export default async function AnalyseSlugPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article || !contentMap[slug]) notFound();

  const { default: Content } = await contentMap[slug]();
  const { metadata } = article;

  const colorClass =
    categoryColors[metadata.category] ?? "text-gold border-gold/30";

  return (
    <main className="px-gutter flex-1 py-32">
      {/* Back link */}
      <div className="mb-16">
        <Link
          href="/analyses"
          className="text-label-caps text-muted-foreground hover:text-gold transition-colors"
          aria-label="Retour à la liste des analyses"
        >
          ← Toutes les analyses
        </Link>
      </div>

      {/* Article header */}
      <div className="mb-16 max-w-3xl">
        <Eyebrow className="mb-6">Insights</Eyebrow>

        <div className="mb-6 flex items-center gap-3">
          <span className={`text-label-caps border px-2 py-0.5 ${colorClass}`}>
            {metadata.category}
          </span>
          <span className="text-label-caps text-muted-foreground">
            {metadata.readTime}
          </span>
        </div>

        <h1 className="text-headline-lg text-foreground mb-6">
          {metadata.title}
        </h1>

        <p className="text-body-lg text-muted-foreground mb-8">
          {metadata.summary}
        </p>

        <div className="border-border flex items-center gap-4 border-t pt-8">
          <div
            className="border-gold/30 bg-gold/20 flex h-8 w-8 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <span className="text-label-caps text-gold">ME</span>
          </div>
          <div>
            <p className="text-body-md text-foreground font-medium">
              Équipe Recherche
            </p>
            <p className="text-label-caps text-muted-foreground">
              <time dateTime={metadata.date}>{formatDate(metadata.date)}</time>
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-border mb-16 max-w-3xl border-t" />

      {/* Article body + TOC sidebar */}
      <div className="flex gap-16">
        <article
          id="article-content"
          className="max-w-3xl min-w-0 flex-1"
          aria-label={metadata.title}
        >
          <Content />
        </article>

        {/* Floating TOC — only visible xl+ */}
        <aside className="w-48 shrink-0" aria-label="Navigation de l'article">
          <TableOfContents />
        </aside>
      </div>

      {/* Footer navigation */}
      <div className="border-border mt-20 max-w-3xl border-t pt-10">
        <Link
          href="/analyses"
          className="text-label-caps text-muted-foreground hover:text-gold transition-colors"
        >
          ← Retour aux analyses
        </Link>
      </div>
    </main>
  );
}
