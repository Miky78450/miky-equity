import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/typography";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez l'équipe Miky Equity — bureaux à Londres, Zürich et Dubaï. Demandes d'allocation et partenariats institutionnels.",
};

const OFFICES = [
  {
    city: "Londres",
    address: "45 Mayfair Square, Westminster\nLondres, W1J 8AJ\nRoyaume-Uni",
    phone: "+44 (0) 20 7000 0000",
  },
  {
    city: "Zürich",
    address: "Bahnhofstrasse 102, 8001\nZürich\nSuisse",
    phone: "+41 (0) 44 000 0000",
  },
  {
    city: "Dubaï",
    address: "Gate Village 5, DIFC\nDubaï, BP 500000\nÉmirats Arabes Unis",
    phone: "+971 (0) 4 000 0000",
  },
];

export default function ContactPage() {
  return (
    <main className="flex-1">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="px-gutter border-border border-b pt-32 pb-24">
        <Eyebrow className="mb-8">Contact</Eyebrow>
        <h1 className="text-display-hero text-foreground mb-8 max-w-3xl">
          Unissez-vous à l&apos;excellence.
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-xl">
          Nos partenaires opèrent avec discrétion et précision. Contactez-nous
          pour discuter d&apos;une allocation stratégique de capital.
        </p>
      </section>

      {/* ── Form + Offices ───────────────────────────────────────────────── */}
      <section className="px-gutter border-border grid grid-cols-12 gap-16 border-b py-32">
        {/* Form */}
        <div className="col-span-12 lg:col-span-7">
          <Eyebrow className="mb-8">Formulaire de demande</Eyebrow>
          <h2 className="text-headline-md text-foreground mb-10">
            Initier le dialogue
          </h2>
          <ContactForm />
        </div>

        {/* Offices */}
        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <Eyebrow className="mb-8">Présence mondiale</Eyebrow>
          <div className="space-y-10">
            {OFFICES.map((o) => (
              <div key={o.city} className="border-border border-l pl-6">
                <h4 className="text-body-lg text-foreground mb-2 font-medium">
                  {o.city}
                </h4>
                <p className="text-body-md text-muted-foreground mb-2 whitespace-pre-line">
                  {o.address}
                </p>
                <p className="text-label-caps text-gold">{o.phone}</p>
              </div>
            ))}
            <div className="border-border border-t pt-8">
              <Eyebrow className="mb-3">Demandes générales</Eyebrow>
              <a
                href="mailto:partners@mikyequity.com"
                className="text-body-md text-gold transition-opacity hover:opacity-80"
              >
                partners@mikyequity.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tagline ──────────────────────────────────────────────────────── */}
      <section className="px-gutter bg-surface-low py-20">
        <p className="text-headline-md text-foreground/30 font-heading font-light italic">
          Intégrité Structurelle. Résultats Éprouvés.
        </p>
      </section>
    </main>
  );
}
