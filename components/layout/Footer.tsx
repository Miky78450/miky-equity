import Link from "next/link";

// Portail et Juridique = liens fictifs (projet CV) — rendus en <span> non cliquables
const PORTAL_ITEMS = ["Accès Investisseur", "Intégration", "Documents"];

const LEGAL_ITEMS = [
  "Politique de Confidentialité",
  "Conditions d'Utilisation",
  "Divulgations Réglementaires",
];

const NAV_LINKS = [
  { label: "Performance", href: "/performance" },
  { label: "Portefeuille", href: "/portefeuille" },
  { label: "Stratégie", href: "/strategie" },
  { label: "Analyses", href: "/analyses" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-surface-low w-full border-t pt-24 pb-12">
      <div className="px-gutter mb-24 grid grid-cols-12 gap-8 lg:gap-16">
        {/* Brand block */}
        <div className="col-span-12 lg:col-span-4">
          <div className="font-heading text-gold mb-6 text-xl font-light tracking-tight uppercase">
            Miky Equity
          </div>
          <p className="text-body-md text-muted-foreground max-w-xs leading-relaxed">
            Un partenariat d&apos;investissement privé axé sur la capitalisation
            à long terme du capital grâce à une méthodologie ICT rigoureuse et
            une gestion disciplinée des risques.
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Navigation footer"
          className="col-span-6 lg:col-span-2"
        >
          <h5 className="text-label-caps text-foreground mb-6">Navigation</h5>
          <ul className="space-y-3" role="list">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-label-caps text-muted-foreground hover:text-gold transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Portail — liens non actifs (fictifs), rendus comme texte */}
        <div
          className="col-span-6 lg:col-span-2"
          aria-label="Portail investisseur"
        >
          <h5 className="text-label-caps text-foreground mb-6">Portail</h5>
          <ul className="space-y-3" role="list">
            {PORTAL_ITEMS.map((label) => (
              <li key={label}>
                <span className="text-label-caps text-muted-foreground/40 cursor-default">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Juridique — liens non actifs (fictifs) */}
        <div className="col-span-12 lg:col-span-4">
          <h5 className="text-label-caps text-foreground mb-6">Juridique</h5>
          <ul className="space-y-3" role="list">
            {LEGAL_ITEMS.map((label) => (
              <li key={label}>
                <span className="text-label-caps text-muted-foreground/40 cursor-default">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-gutter flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 md:flex-row">
        <span className="text-label-caps text-muted-foreground text-[9px] tracking-widest">
          © {year} Miky Equity Partners. Tous droits réservés.
        </span>
        <span className="text-label-caps text-muted-foreground text-center text-[9px] tracking-widest">
          Plateforme fictive à vocation pédagogique — pas un produit financier
          réel.
        </span>
      </div>
    </footer>
  );
}
