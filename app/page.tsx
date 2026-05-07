import Link from "next/link";
import { DisplayHeading, Eyebrow, KPINumber } from "@/components/ui/typography";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="px-gutter border-border border-b pt-32 pb-24">
        <div className="max-w-5xl">
          <Eyebrow className="mb-10">
            Fonds de Trading NQ Futures — ICT Methodology
          </Eyebrow>
          <DisplayHeading>
            Capital discipliné.
            <br />
            Rendements asymétriques.
          </DisplayHeading>
        </div>

        {/* KPI Strip */}
        <div className="border-border mt-16 grid grid-cols-2 gap-8 border-t pt-10 md:grid-cols-4">
          <KPINumber label="CAGR" value="39.0%" />
          <KPINumber label="Sharpe Ratio" value="3.20" />
          <KPINumber label="Max Drawdown" value="-25.5%" />
          <KPINumber label="Historique" value="8.2 ans" />
        </div>
      </section>

      {/* Phase indicator — placeholder pendant le dev */}
      <section className="px-gutter bg-surface-low py-24">
        <p className="text-label-caps text-muted-foreground mb-4">
          Phase 2 en cours
        </p>
        <p className="text-body-md text-muted-foreground max-w-md">
          Layout & Navigation en place. Les sections de contenu arriveront en
          Phase 3.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {[
            { href: "/performance", label: "Performance" },
            { href: "/portefeuille", label: "Portefeuille" },
            { href: "/strategie", label: "Stratégie" },
            { href: "/analyses", label: "Analyses" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-label-caps text-gold border-gold/30 hover:border-gold border px-4 py-2 transition-colors duration-200"
            >
              {link.label} →
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
