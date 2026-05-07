import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Performance" };

export default function PerformancePage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Performance</Eyebrow>
      <SectionHeading className="mb-8">Historique de rendement</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 4</p>
    </main>
  );
}
