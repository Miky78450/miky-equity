import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Portefeuille" };

export default function PortefeuillePage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Portefeuille</Eyebrow>
      <SectionHeading className="mb-8">Nos participations</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 5</p>
    </main>
  );
}
