import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Analyses" };

export default function AnalysesPage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Analyses</Eyebrow>
      <SectionHeading className="mb-8">
        Notes de marché & recherche
      </SectionHeading>
      <p className="text-body-md text-muted-foreground">
        — Contenu Phase 6 (MDX)
      </p>
    </main>
  );
}
