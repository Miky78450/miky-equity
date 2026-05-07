import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/typography";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "L'équipe Miky Equity — traders, analystes et opérationnels spécialisés en stratégie ICT et gestion de risque institutionnelle.",
};

const TEAM = [
  {
    initials: "MV",
    name: "Marcus Valerius",
    role: "Associé Gérant",
    bio: "Ancien responsable de la stratégie globale chez Blackwood Capital. Marcus supervise l'allocation macroéconomique et les initiatives de partenariat à long terme. Il a développé la méthodologie ICT propriétaire du fonds après 12 ans d'analyse des flux institutionnels sur les marchés US.",
    bg: "bg-[#0d1218]",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&q=80",
  },
  {
    initials: "HC",
    name: "Helena Chen",
    role: "Directrice des Investissements",
    bio: "Dirige l'équipe de recherche quantitative. Helena est spécialisée dans l'évaluation algorithmique des risques et l'analyse statistique des setups. Elle a conçu le système de scoring qui filtre les trades à haute conviction parmi les 1607 exécutions documentées.",
    bg: "bg-[#0c1418]",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&q=80",
  },
  {
    initials: "JT",
    name: "Julian Thorne",
    role: "Responsable des Opérations",
    bio: "Dirige la conformité réglementaire transfrontalière et l'infrastructure opérationnelle. Julian assure la résilience structurelle du cabinet à travers les juridictions UK, CH et UAE. Ancien directeur compliance chez Deutsche Bank London.",
    bg: "bg-[#141214]",
    photo:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop&q=80",
  },
  {
    initials: "ER",
    name: "Elena Rossi",
    role: "Directrice Analytique",
    bio: "Spécialisée dans le développement des outils d'analyse propriétaires. Elena fait le lien entre la méthodologie ICT manuelle et l'automatisation du screening des setups. Elle développe la plateforme de visualisation des performances du fonds.",
    bg: "bg-[#0e1412]",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop&q=80",
  },
];

interface PhotoProps {
  initials: string;
  bg: string;
  aspect: string;
  photo: string;
  className?: string;
}

function MemberPhoto({
  initials,
  bg,
  aspect,
  photo,
  className = "",
}: PhotoProps) {
  return (
    <div
      className={`border-border relative overflow-hidden border ${aspect} ${bg} ${className}`}
    >
      {/* Real portrait */}
      <Image
        src={photo}
        alt=""
        fill
        className="object-cover object-top opacity-70"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Geometric overlay lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="border-gold/8 absolute top-[12%] left-[8%] h-[50%] w-[50%] border" />
        <div className="border-gold/5 absolute top-[25%] left-[20%] h-[65%] w-[65%] border" />
        <div className="border-gold/6 absolute right-[12%] bottom-[15%] h-[35%] w-[35%] border" />
      </div>
      {/* Initial watermark */}
      <span className="text-gold/10 font-heading absolute bottom-4 left-5 text-[96px] leading-none font-light select-none">
        {initials}
      </span>
      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}

export default function EquipePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b pt-32 pb-20">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-8">
            <Eyebrow className="mb-6">Les Dirigeants</Eyebrow>
            <h1 className="text-headline-lg text-foreground mb-8">
              Architectes d&apos;une{" "}
              <span className="text-gold">Valeur Durable</span>.
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-xl">
              Notre direction apporte des décennies de précision
              institutionnelle à la gestion de capital. Nous opérons avec un
              objectif unique : identifier l&apos;alpha structurel dans les
              marchés les plus liquides au monde.
            </p>
          </div>
        </div>
      </section>

      {/* ── Team Grid — layout éditorial staggeré ────────────────────────── */}
      <section className="px-gutter py-24">
        <div className="grid grid-cols-12 gap-y-24">
          {/* Marcus Valerius — gauche, photo (4/5) + bio côte à côte */}
          <div className="border-border col-span-12 border-b pb-16 lg:col-span-7">
            <div className="grid grid-cols-7 gap-8">
              <div className="col-span-7 lg:col-span-4">
                <MemberPhoto
                  initials={TEAM[0]!.initials}
                  bg={TEAM[0]!.bg}
                  aspect="aspect-[4/5]"
                  photo={TEAM[0]!.photo}
                />
              </div>
              <div className="col-span-7 flex flex-col justify-end lg:col-span-3">
                <Eyebrow className="mb-2">{TEAM[0]!.role}</Eyebrow>
                <h2 className="text-headline-md text-foreground mb-4">
                  {TEAM[0]!.name}
                </h2>
                <p className="text-body-md text-muted-foreground">
                  {TEAM[0]!.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Helena Chen — droite, bio (aligné droite) + photo */}
          <div className="border-border col-span-12 border-b pb-16 lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-7 gap-8">
              <div className="order-2 col-span-7 flex flex-col justify-end lg:order-1 lg:col-span-3 lg:text-right">
                <Eyebrow className="mb-2 lg:text-right">
                  {TEAM[1]!.role}
                </Eyebrow>
                <h2 className="text-headline-md text-foreground mb-4">
                  {TEAM[1]!.name}
                </h2>
                <p className="text-body-md text-muted-foreground">
                  {TEAM[1]!.bio}
                </p>
              </div>
              <div className="order-1 col-span-7 lg:order-2 lg:col-span-4">
                <MemberPhoto
                  initials={TEAM[1]!.initials}
                  bg={TEAM[1]!.bg}
                  aspect="aspect-[4/5]"
                  photo={TEAM[1]!.photo}
                />
              </div>
            </div>
          </div>

          {/* Julian Thorne — centré, photo carré pleine largeur + bio dessous */}
          <div className="border-border col-span-12 border-b pb-16 lg:col-span-6 lg:col-start-2">
            <MemberPhoto
              initials={TEAM[2]!.initials}
              bg={TEAM[2]!.bg}
              aspect="aspect-square"
              photo={TEAM[2]!.photo}
              className="mb-8"
            />
            <Eyebrow className="mb-2">{TEAM[2]!.role}</Eyebrow>
            <h2 className="text-headline-md text-foreground mb-4">
              {TEAM[2]!.name}
            </h2>
            <p className="text-body-md text-muted-foreground max-w-sm">
              {TEAM[2]!.bio}
            </p>
          </div>

          {/* Elena Rossi — droite, photo 3/4 + bio dessous */}
          <div className="col-span-12 pb-16 lg:col-span-5 lg:col-start-8">
            <MemberPhoto
              initials={TEAM[3]!.initials}
              bg={TEAM[3]!.bg}
              aspect="aspect-[3/4]"
              photo={TEAM[3]!.photo}
              className="mb-8"
            />
            <Eyebrow className="mb-2">{TEAM[3]!.role}</Eyebrow>
            <h2 className="text-headline-md text-foreground mb-4">
              {TEAM[3]!.name}
            </h2>
            <p className="text-body-md text-muted-foreground">{TEAM[3]!.bio}</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-t py-32">
        <h2 className="text-headline-lg text-foreground mb-12 max-w-3xl">
          Engagez-vous avec notre <span className="text-gold">Partenariat</span>
          .
        </h2>
        <div className="flex flex-wrap gap-6">
          <Link
            href="/contact"
            className="text-label-caps text-background bg-gold px-12 py-4 transition-opacity hover:opacity-90"
          >
            Portail Investisseur
          </Link>
          <Link
            href="/a-propos"
            className="text-label-caps text-gold border-gold/30 hover:border-gold border px-12 py-4 transition-colors"
          >
            Notre Philosophie
          </Link>
        </div>
      </section>
    </main>
  );
}
