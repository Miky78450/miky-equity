import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";

export const metadata: Metadata = { title: "À Propos" };

const TIMELINE = [
  {
    year: "2018",
    title: "Fondation",
    desc: "Création de Miky Equity à Paris. Début du backtesting de la méthodologie ICT sur NQ Futures. Capital initial : $100 000.",
  },
  {
    year: "2020",
    title: "Validation statistique",
    desc: "Après 2 ans de forward testing, les résultats confirment la robustesse de la stratégie. Win rate stabilisé à 59%, CAGR annualisé : 35%+.",
  },
  {
    year: "2022",
    title: "Structuration du fonds",
    desc: "Constitution des entités légales. Déploiement des premières allocations externes. AUM : $4M. Ouverture du bureau de Zürich.",
  },
  {
    year: "2024",
    title: "Intégration quantitative",
    desc: "Automatisation partielle du screening des setups. Lancement de la plateforme analytique propriétaire. AUM cible : $20M.",
  },
];

const VALUES = [
  {
    num: "I.",
    title: "Préservation",
    body: "Notre conviction fondamentale : la richesse n'est pas seulement un chiffre, mais un vecteur de continuité. Chaque allocation est évaluée sur un horizon pluriannuel. La préservation du capital prime systématiquement sur la recherche de rendement à court terme.",
    quote: null,
  },
  {
    num: "II.",
    title: "Rigueur",
    body: "Le paysage financier moderne est saturé de bruit. Notre méthode consiste à éliminer les couches superficielles pour révéler la valeur structurelle sous-jacente. Nous ne tradons pas des opinions — nous tradons des preuves institutionnelles.",
    quote:
      '"La véritable sophistication réside dans le retrait de l\'inutile."',
  },
  {
    num: "III.",
    title: "Transparence",
    body: "Chaque trade est documenté, chaque drawdown analysé. Nos partenaires ont accès à l'intégralité des données historiques — 1607 trades sur 8.2 ans. Nous ne cachons pas les pertes : nous les transformons en information.",
    quote: null,
  },
];

export default function AProposPage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b pt-32 pb-24">
        <Eyebrow className="mb-8">Notre Philosophie</Eyebrow>
        <h1 className="text-display-hero text-foreground mb-8 max-w-4xl">
          Le capital comme catalyseur d&apos;une excellence durable.
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-2xl">
          Nous ne gérons pas des actifs ; nous préservons des trajectoires.
          Notre approche est définie par un engagement sans compromis envers la
          rigueur analytique, au-delà du bruit passager du marché.
        </p>
      </section>

      {/* ── Valeurs ──────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-32">
        <div className="grid grid-cols-12 gap-16">
          {VALUES.map((v) => (
            <div key={v.num} className="col-span-12 lg:col-span-4">
              <Eyebrow className="mb-4">{v.num}</Eyebrow>
              <h3 className="text-headline-md text-foreground mb-6">
                {v.title}
              </h3>
              <p className="text-body-md text-muted-foreground mb-4 leading-relaxed">
                {v.body}
              </p>
              {v.quote && (
                <p className="text-body-md text-foreground/60 border-gold border-l pl-4 italic">
                  {v.quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Chiffres clés ────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-b py-24">
        <div className="bg-border grid grid-cols-2 gap-px md:grid-cols-4">
          {[
            { label: "AUM", value: "$12M" },
            { label: "Fondé en", value: "2018" },
            { label: "Années de track record", value: "8.2" },
            { label: "Rendement total", value: "+1 417%" },
          ].map((m) => (
            <div key={m.label} className="bg-surface-low px-8 py-10">
              <span className="text-label-caps text-muted-foreground mb-3 block">
                {m.label}
              </span>
              <span className="text-headline-md text-gold tabular">
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-32">
        <Eyebrow className="mb-4">Chronologie</Eyebrow>
        <h2 className="text-headline-lg text-foreground mb-16 max-w-xl">
          Une croissance intentionnelle.
        </h2>
        <div className="relative">
          {/* Ligne verticale */}
          <div className="bg-border absolute top-0 bottom-0 left-0 hidden w-px lg:block" />
          <div className="space-y-0">
            {TIMELINE.map((t, i) => (
              <div
                key={t.year}
                className={`border-border grid grid-cols-12 gap-8 border-b py-12 last:border-b-0 ${i % 2 === 0 ? "" : "bg-surface-low/30"}`}
              >
                <div className="col-span-12 lg:col-span-2">
                  <span className="text-headline-md text-gold tabular">
                    {t.year}
                  </span>
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <h4 className="text-body-lg text-foreground mb-3 font-medium">
                    {t.title}
                  </h4>
                </div>
                <div className="col-span-12 lg:col-span-6">
                  <p className="text-body-md text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-gutter bg-surface-low py-32">
        <div className="max-w-2xl">
          <Eyebrow className="mb-6">Rejoignez le partenariat</Eyebrow>
          <h2 className="text-headline-lg text-foreground mb-8">
            Demander un accès privé.
          </h2>
          <p className="text-body-lg text-muted-foreground mb-10">
            Miky Equity accepte un nombre limité de partenaires par cycle.
            Contactez-nous pour discuter d&apos;une allocation stratégique.
          </p>
          <a
            href="/contact"
            className="text-label-caps text-background bg-gold inline-block px-8 py-4 transition-opacity hover:opacity-90"
          >
            Initier le dialogue
          </a>
        </div>
      </section>
    </main>
  );
}
