import { ImageResponse } from "next/og";

export const alt = "Miky Equity — Fonds de trading ICT NQ Futures";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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

      {/* Main content */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            color: "#6b7280",
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          FONDS DE TRADING INSTITUTIONNEL · ICT · NQ FUTURES
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              color: "#f5f0e8",
              fontSize: 56,
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            Capital discipliné.
          </span>
          <span
            style={{
              color: "#f5f0e8",
              fontSize: 56,
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            Rendements asymétriques.
          </span>
        </div>
      </div>

      {/* Bottom KPIs */}
      <div style={{ display: "flex", gap: 48, alignItems: "flex-end" }}>
        {[
          { label: "CAGR", value: "+39.0%" },
          { label: "SHARPE RATIO", value: "3.20" },
          { label: "MAX DRAWDOWN", value: "-25.5%" },
          { label: "HISTORIQUE", value: "8.2 ANS" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            <span
              style={{
                color: "#6b7280",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {kpi.label}
            </span>
            <span
              style={{
                color: "#e4c278",
                fontSize: 28,
                fontWeight: 600,
                fontFeatureSettings: '"tnum"',
              }}
            >
              {kpi.value}
            </span>
          </div>
        ))}
      </div>
    </div>,
    { ...size }
  );
}
