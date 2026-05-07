import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Équipe" };

export default function EquipePage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Équipe</Eyebrow>
      <SectionHeading className="mb-8">Les dirigeants</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 3</p>
    </main>
  );
}
