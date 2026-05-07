"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/performance", label: "Performance" },
  { href: "/portefeuille", label: "Portefeuille" },
  { href: "/strategie", label: "Stratégie" },
  { href: "/analyses", label: "Analyses" },
  { href: "/contact", label: "Contact" },
];

const TICKER_ITEMS = [
  { label: "NQ1! +0.84%", gold: true },
  { label: "S&P 500 -0.12%", gold: false },
  { label: "VIX 18.40", gold: false },
  { label: "GOLD +1.05%", gold: true },
  { label: "DXY -0.32%", gold: false },
  { label: "EUR/USD +0.21%", gold: false },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="border-border bg-surface sticky top-0 z-50 w-full border-b">
      {/* Ticker bar */}
      <div className="bg-surface-low px-gutter w-full overflow-hidden border-b border-white/5 py-2">
        <div className="flex items-center justify-between gap-8">
          <div className="flex gap-8 overflow-hidden whitespace-nowrap">
            {TICKER_ITEMS.map((item) => (
              <span
                key={item.label}
                className={`text-label-caps ${item.gold ? "text-gold" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
            ))}
          </div>
          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <span className="text-label-caps text-muted-foreground">
              Marché Ouvert
            </span>
            <span className="bg-gold h-1.5 w-1.5 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-gutter flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-heading text-foreground text-xl font-light tracking-tight uppercase select-none"
        >
          Miky Equity
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-label-caps relative transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-gold nav-active"
                  : "text-muted-foreground hover:text-foreground hover-underline"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-muted-foreground hover:text-foreground p-1 transition-colors md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line
                  x1="5"
                  y1="5"
                  x2="17"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                <line
                  x1="17"
                  y1="5"
                  x2="5"
                  y2="17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </>
            ) : (
              <>
                <line
                  x1="3"
                  y1="7"
                  x2="19"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                <line
                  x1="3"
                  y1="11"
                  x2="19"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                <line
                  x1="3"
                  y1="15"
                  x2="19"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-border bg-surface border-t md:hidden">
          <div className="px-gutter flex flex-col gap-7 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-label-caps transition-colors ${
                  isActive(link.href) ? "text-gold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
