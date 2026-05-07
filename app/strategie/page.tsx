import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";

export const metadata: Metadata = { title: "Stratégie" };

const PILLARS = [
  {
    num: "01",
    title: "Avantage Structurel",
    body: "Nous ciblons les déséquilibres institutionnels — zones où les market makers ont laissé des traces identifiables : Fair Value Gaps, Order Blocks non testés, Breaker Blocks. Ces zones offrent des probabilités asymétriques que le price action classique ne peut détecter.",
  },
  {
    num: "02",
    title: "Alpha Opérationnel",
    body: "Les rendements proviennent de l'exécution disciplinée et non de la suroptimisation. Chaque setup est classifié par type, session, et contexte de marché. 1607 trades documentés sur 8.2 ans constituent notre base statistique de validation.",
  },
  {
    num: "03",
    title: "Précision de Sortie",
    body: "Les targets sont définis avant l'entrée : equilibrium du range précédent, FVG opposé, ou liquidity pool identifié. Le ratio risque/récompense minimum est 1:2, médiane observée sur le portefeuille : 1:3.4.",
  },
];

const SESSIONS = [
  {
    name: "London Kill Zone",
    hours: "7h00 – 10h00 CET",
    desc: "Session primaire. Le marché établit souvent le High ou Low de la journée. Les FVG créés en Asian session sont fréquemment testés. Concentration maximale des flux institutionnels européens.",
    trades: "62% des trades",
    color: "text-gold",
  },
  {
    name: "NY Kill Zone",
    hours: "14h30 – 16h30 CET",
    desc: "Session secondaire. Continuation ou inversion de la direction London. Le NQ réagit fortement à l'ouverture des marchés US. Les Order Blocks daily non testés offrent des opportunités à fort R.",
    trades: "38% des trades",
    color: "text-muted-foreground",
  },
];

const SETUPS = [
  {
    code: "FVG",
    name: "Fair Value Gap",
    desc: "Déséquilibre de prix en 3 bougies — zone de retour institutionnel prioritaire.",
  },
  {
    code: "OB",
    name: "Order Block",
    desc: "Dernière bougie avant un mouvement impulsif — zone de décision institutionnelle.",
  },
  {
    code: "MSS",
    name: "Market Structure Shift",
    desc: "Rupture de structure confirmant le changement de direction du flux.",
  },
  {
    code: "BB",
    name: "Breaker Block",
    desc: "Order Block invalidé qui agit en support/résistance inversé.",
  },
  {
    code: "LIQ",
    name: "Liquidity Sweep",
    description:
      "Prise de liquidité au-dessus/dessous d'un high/low — signal de retournement.",
  },
  {
    code: "EQ",
    name: "Equilibrium",
    desc: "Niveau 50% d'un range — cible de prix naturelle pour le retour institutionnel.",
  },
];

const LIFECYCLE = [
  {
    icon: "◎",
    phase: "PHASE 01",
    title: "Identification",
    desc: "Analyse du contexte HTF (Daily/4H) : structure de marché, zones FVG actives, liquidity pools.",
  },
  {
    icon: "◈",
    phase: "PHASE 02",
    title: "Confirmation",
    desc: "Confluence sur LTF (15m/5m) : MSS + OB + FVG alignés dans la direction du flux HTF.",
  },
  {
    icon: "◉",
    phase: "PHASE 03",
    title: "Exécution",
    desc: "Entrée en limit order sur la zone. SL sous/au-dessus de la structure. Risque fixé à 1%.",
  },
  {
    icon: "◐",
    phase: "PHASE 04",
    title: "Gestion",
    desc: "Partiel à 1:1, runner vers la cible. No move to break-even avant confirmation LTF.",
  },
];

export default function StrategiePage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b pt-32 pb-24">
        <Eyebrow className="mb-8">Notre Approche</Eyebrow>
        <h1 className="text-display-hero text-foreground mb-8 max-w-3xl">
          La physique du capital patient.
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-2xl">
          Nous déployons des capitaux avec une discipline institutionnelle et
          une rigueur algorithmique. La méthodologie ICT nous permet
          d&apos;identifier les flux des market makers avant qu&apos;ils ne
          deviennent évidents au marché de détail.
        </p>
      </section>

      {/* ── 3 Piliers ────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-b py-32">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {PILLARS.map((p) => (
            <div key={p.num} className="col-span-12 lg:col-span-4">
              <Eyebrow className="mb-6">{p.num}</Eyebrow>
              <h3 className="text-headline-md text-foreground mb-5">
                {p.title}
              </h3>
              <p className="text-body-md text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Setups ───────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-32">
        <Eyebrow className="mb-4">Concepts clés</Eyebrow>
        <h2 className="text-headline-lg text-foreground mb-16 max-w-xl">
          Vocabulaire institutionnel ICT.
        </h2>
        <div className="bg-border grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3">
          {SETUPS.map((s) => (
            <div key={s.code} className="bg-background p-8">
              <span className="text-label-caps text-gold mb-3 block">
                {s.code}
              </span>
              <h4 className="text-body-lg text-foreground mb-3 font-medium">
                {s.name}
              </h4>
              <p className="text-body-md text-muted-foreground">
                {s.desc ?? s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sessions ─────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border bg-surface-low border-b py-32">
        <Eyebrow className="mb-4">Fenêtres d&apos;exécution</Eyebrow>
        <h2 className="text-headline-lg text-foreground mb-16 max-w-xl">
          Sessions de liquidité.
        </h2>
        <div className="grid grid-cols-12 gap-8">
          {SESSIONS.map((s) => (
            <div
              key={s.name}
              className="border-border col-span-12 border p-10 lg:col-span-6"
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="text-headline-md text-foreground mb-1">
                    {s.name}
                  </h3>
                  <span className={`text-label-caps ${s.color}`}>
                    {s.hours}
                  </span>
                </div>
                <span className="text-label-caps text-muted-foreground">
                  {s.trades}
                </span>
              </div>
              <p className="text-body-md text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cycle de vie ─────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b py-32">
        <Eyebrow className="mb-4">Architecture du processus</Eyebrow>
        <h2 className="text-headline-lg text-foreground mb-16 max-w-xl">
          Le cycle de vie d&apos;un trade.
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE.map((l, i) => (
            <div key={l.phase} className="relative">
              {i < LIFECYCLE.length - 1 && (
                <div className="bg-border absolute top-4 left-full z-0 hidden h-px w-full lg:block" />
              )}
              <span className="text-gold mb-4 block text-2xl">{l.icon}</span>
              <Eyebrow className="mb-3">{l.phase}</Eyebrow>
              <h4 className="text-body-lg text-foreground mb-3 font-medium">
                {l.title}
              </h4>
              <p className="text-body-md text-muted-foreground">{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Risk management ──────────────────────────────────────────────── */}
      <section className="px-gutter bg-surface-low py-32">
        <div className="grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow className="mb-4">Gestion du risque</Eyebrow>
            <h2 className="text-headline-lg text-foreground mb-8">
              1% par trade.
              <br />
              Sans exception.
            </h2>
            <p className="text-body-lg text-muted-foreground mb-6">
              Sur 1607 trades exécutés, le drawdown maximum observé est de
              -25.5%. La discipline du sizing constant est le facteur premier de
              la préservation du capital sur 8.2 ans.
            </p>
            <p className="text-body-md text-muted-foreground italic">
              &quot;La véritable sophistication réside dans le retrait de
              l&apos;inutile.&quot;
            </p>
          </div>
          <div className="bg-border col-span-12 grid grid-cols-2 gap-px lg:col-span-6 lg:col-start-7">
            {[
              { label: "Risque par trade", value: "1.0%" },
              { label: "Win Rate", value: "59.3%" },
              { label: "Ratio R/R médian", value: "1 : 3.4" },
              { label: "Max Drawdown", value: "-25.5%" },
              { label: "Total trades", value: "1 607" },
              { label: "Sharpe Ratio", value: "3.20" },
            ].map((m) => (
              <div key={m.label} className="bg-background p-8">
                <span className="text-label-caps text-muted-foreground mb-2 block">
                  {m.label}
                </span>
                <span className="text-headline-md text-gold tabular">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
