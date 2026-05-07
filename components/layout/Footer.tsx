import Link from "next/link";

const PORTAL_LINKS = [
  { label: "Accès Investisseur", href: "#" },
  { label: "Intégration", href: "#" },
  { label: "Documents", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Politique de Confidentialité", href: "#" },
  { label: "Conditions d'Utilisation", href: "#" },
  { label: "Divulgations Réglementaires", href: "#" },
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
        <div className="col-span-6 lg:col-span-2">
          <h5 className="text-label-caps text-foreground mb-6">Navigation</h5>
          <ul className="space-y-3">
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
        </div>

        {/* Portail */}
        <div className="col-span-6 lg:col-span-2">
          <h5 className="text-label-caps text-foreground mb-6">Portail</h5>
          <ul className="space-y-3">
            {PORTAL_LINKS.map((item) => (
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
        </div>

        {/* Juridique */}
        <div className="col-span-12 lg:col-span-4">
          <h5 className="text-label-caps text-foreground mb-6">Juridique</h5>
          <ul className="space-y-3">
            {LEGAL_LINKS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-label-caps text-muted-foreground hover:text-gold underline decoration-1 underline-offset-4 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-gutter flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 md:flex-row">
        <span className="text-label-caps text-muted-foreground text-[9px] tracking-widest">
          © 2025 Miky Equity Partners. Tous droits réservés.
        </span>
        <span className="text-label-caps text-muted-foreground text-center text-[9px] tracking-widest">
          Plateforme fictive à vocation pédagogique — pas un produit financier
          réel.
        </span>
      </div>
    </footer>
  );
}
