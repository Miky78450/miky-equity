import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "À Propos" };

export default function AProposPage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">À Propos</Eyebrow>
      <SectionHeading className="mb-8">Philosophie & Vision</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 3</p>
    </main>
  );
}
