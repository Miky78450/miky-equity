import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Miky Equity",
    template: "%s — Miky Equity",
  },
  description:
    "Miky Equity — fonds de trading quantitatif spécialisé en NQ Futures via la méthodologie ICT. +1 417% sur 8.2 ans.",
  keywords: ["trading", "NQ Futures", "ICT", "quantitatif", "hedge fund"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${newsreader.variable} dark h-full`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground flex min-h-full flex-col antialiased">
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
