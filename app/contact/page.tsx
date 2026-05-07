import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Contact</Eyebrow>
      <SectionHeading className="mb-8">Nous contacter</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 3</p>
    </main>
  );
}
