import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";
import Link from "next/link";

export const metadata: Metadata = { title: "Équipe" };

const TEAM = [
  {
    name: "Marcus Valerius",
    role: "Associé Gérant",
    bio: "Ancien responsable de la stratégie globale chez Blackwood Capital. Marcus supervise l'allocation macroéconomique et les initiatives de partenariat à long terme. Il a développé la méthodologie ICT propriétaire du fonds après 12 ans d'analyse des flux institutionnels sur les marchés US.",
    focus: ["Stratégie ICT", "Allocation macro", "Relations investisseurs"],
  },
  {
    name: "Helena Chen",
    role: "Directrice des Investissements",
    bio: "Dirige l'équipe de recherche quantitative. Helena est spécialisée dans l'évaluation algorithmique des risques et l'analyse statistique des setups. Elle a conçu le système de scoring qui filtre les trades à haute conviction parmi les 1607 exécutions documentées.",
    focus: ["Recherche quantitative", "Risk management", "Backtesting"],
  },
  {
    name: "Julian Thorne",
    role: "Responsable des Opérations",
    bio: "Dirige la conformité réglementaire transfrontalière et l'infrastructure opérationnelle. Julian assure la résilience structurelle du cabinet à travers les juridictions UK, CH et UAE. Ancien directeur compliance chez Deutsche Bank London.",
    focus: ["Conformité réglementaire", "Infrastructure", "Juridique"],
  },
  {
    name: "Elena Rossi",
    role: "Directrice Analytique",
    bio: "Spécialisée dans le développement des outils d'analyse propriétaires. Elena fait le lien entre la méthodologie ICT manuelle et l'automatisation du screening des setups. Elle développe la plateforme de visualisation des performances du fonds.",
    focus: ["Data analytics", "Automatisation", "Performance reporting"],
  },
];

export default function EquipePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b pt-32 pb-24">
        <Eyebrow className="mb-8">Les Dirigeants</Eyebrow>
        <h1 className="text-display-hero text-foreground mb-8 max-w-3xl">
          Architectes d&apos;une valeur durable.
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-2xl">
          Notre direction apporte des décennies de précision institutionnelle à
          la gestion de capital. Nous opérons avec un objectif unique :
          identifier l&apos;alpha structurel dans les marchés les plus liquides
          au monde.
        </p>
      </section>

      {/* ── Team grid ────────────────────────────────────────────────────── */}
      <section className="px-gutter py-32">
        <div className="bg-border grid grid-cols-12 gap-px">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-background col-span-12 p-10 lg:col-span-6 lg:p-16"
            >
              <Eyebrow className="mb-4">{member.role}</Eyebrow>
              <h2 className="text-headline-md text-foreground mb-6">
                {member.name}
              </h2>
              <p className="text-body-md text-muted-foreground mb-8 leading-relaxed">
                {member.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.focus.map((tag) => (
                  <span
                    key={tag}
                    className="text-label-caps text-muted-foreground border-border border px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-t py-24">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="text-headline-lg text-foreground mb-4">
              Engagez-vous avec notre partenariat.
            </h2>
            <p className="text-body-md text-muted-foreground">
              Notre équipe répond sous 48h aux demandes qualifiées.
            </p>
          </div>
          <div className="col-span-12 flex gap-4 lg:col-span-5 lg:justify-end">
            <Link
              href="/contact"
              className="text-label-caps text-background bg-gold px-8 py-4 transition-opacity hover:opacity-90"
            >
              Portail Investisseur
            </Link>
            <Link
              href="/a-propos"
              className="text-label-caps text-foreground border-border hover:border-gold border px-8 py-4 transition-colors"
            >
              Notre Philosophie
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
