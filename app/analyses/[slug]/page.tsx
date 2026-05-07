import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.charAt(0).toUpperCase() + slug.slice(1) };
}

export default async function AnalyseSlugPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="px-gutter max-w-3xl flex-1 py-32">
      <Eyebrow className="mb-6">Analyse</Eyebrow>
      <h1 className="text-headline-lg text-foreground mb-12 capitalize">
        {slug}
      </h1>
      <p className="text-body-md text-muted-foreground">
        — Contenu Phase 6 (MDX)
      </p>
    </main>
  );
}
