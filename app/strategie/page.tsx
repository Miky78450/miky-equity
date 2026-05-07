import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Stratégie" };

export default function StrategiePage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Stratégie</Eyebrow>
      <SectionHeading className="mb-8">Méthodologie ICT</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 3</p>
    </main>
  );
}
