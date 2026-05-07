import { ImageResponse } from "next/og";
import { getArticleBySlug, articleSlugs } from "@/lib/articles";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export const alt = "Miky Equity — Analyse";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const title = article?.metadata.title ?? "Analyses";
  const category = article?.metadata.category ?? "";
  const readTime = article?.metadata.readTime ?? "";

  return new ImageResponse(
    <div
      style={{
        background: "#121412",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px",
        fontFamily: "serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "#e4c278",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#121412", fontSize: 14, fontWeight: 700 }}>
              M
            </span>
          </div>
          <span
            style={{
              color: "#6b7280",
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            MIKY EQUITY
          </span>
        </div>
        {category && (
          <span
            style={{
              color: "#e4c278",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              border: "1px solid rgba(228,194,120,0.3)",
              padding: "4px 10px",
            }}
          >
            {category}
          </span>
        )}
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            color: "#f5f0e8",
            fontSize: 44,
            fontWeight: 300,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <span
          style={{
            color: "#6b7280",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          INSIGHTS · ANALYSES DE CAPITAL
        </span>
        {readTime && (
          <span style={{ color: "#4b5563", fontSize: 11 }}>
            · {readTime} de lecture
          </span>
        )}
      </div>
    </div>,
    { ...size }
  );
}
