import type { Metadata } from "next";
import { Eyebrow, SectionHeading } from "@/components/ui/typography";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.charAt(0).toUpperCase() + slug.slice(1) };
}

export default async function PortefeuilleSlugPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="px-gutter flex-1 py-32">
      <Eyebrow className="mb-6">Portefeuille</Eyebrow>
      <SectionHeading className="mb-8 capitalize">{slug}</SectionHeading>
      <p className="text-body-md text-muted-foreground">— Contenu Phase 5</p>
    </main>
  );
}
