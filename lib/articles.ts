export interface ArticleMetadata {
  title: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
}

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
}

export const articles: Article[] = [
  {
    slug: "pourquoi-le-nq-futures-est-notre-instrument-de-predilection",
    metadata: {
      title: "Pourquoi le NQ Futures est notre instrument de prédilection",
      date: "2026-03-18",
      category: "Stratégie",
      summary:
        "Le Nasdaq-100 Futures concentre liquidité, volatilité et structure de marché ICT dans un seul instrument. Décryptage de nos critères de sélection.",
      readTime: "7 min",
    },
  },
  {
    slug: "anatomie-dun-fair-value-gap-en-kill-zone",
    metadata: {
      title: "Anatomie d'un Fair Value Gap en Kill Zone",
      date: "2026-02-05",
      category: "Analyse technique",
      summary:
        "Le Fair Value Gap est le setup fondateur de notre approche ICT. Comment l'identifier, le qualifier et l'exploiter avec un R:R systématiquement supérieur à 1:3.",
      readTime: "9 min",
    },
  },
  {
    slug: "gestion-du-drawdown-discipline-vs-modele",
    metadata: {
      title: "Gestion du drawdown : discipline vs. modèle",
      date: "2026-01-12",
      category: "Risk Management",
      summary:
        "Un drawdown de -25.5% sur 8 ans avec un capital multiplié par 15. Comment notre cadre de risk management transforme l'inévitable adversité en avantage structurel.",
      readTime: "8 min",
    },
  },
];

export const articleSlugs = articles.map((a) => a.slug);

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
