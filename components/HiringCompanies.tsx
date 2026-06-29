"use client";

import { useState } from "react";

const companies = [
  { name: "McKinsey & Co.", color: "#1E3A5F" },
  { name: "BCG", color: "#00843D" },
  { name: "Bain & Co.", color: "#D4002D" },
  { name: "Goldman Sachs", color: "#7399C6" },
  { name: "JP Morgan", color: "#003087" },
  { name: "Hindustan Unilever", color: "#1B1B6A" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Deloitte", color: "#86BC25" },
  { name: "EY", color: "#FFE600" },
  { name: "Kearney", color: "#00205B" },
  { name: "Accenture", color: "#A100FF" },
  { name: "Tata (TAS)", color: "#002776" },
  { name: "P&G", color: "#003087" },
  { name: "Nestle", color: "#CD0A2F" },
  { name: "Aditya Birla", color: "#E31837" },
  { name: "Nomura", color: "#004097" },
];

const doubled1 = [...companies, ...companies];
const doubled2 = [...companies, ...companies];

function Pill({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="hiring-pill"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "10px 22px",
        borderRadius: 100,
        fontSize: "1rem",
        fontWeight: 700,
        background: hovered ? "rgba(255,107,0,0.09)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(255,107,0,0.30)" : "1px solid rgba(255,255,255,0.09)",
        color: hovered ? "var(--gold)" : "var(--text)",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
      }}
    >
      {name}
    </span>
  );
}

export default function HiringCompanies() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, rgba(255,107,0,0.03) 0%, transparent 100%)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes ticker-scroll-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        [data-theme="light"] .hiring-pill {
          background: rgba(0,0,0,0.04) !important;
          border-color: rgba(0,0,0,0.09) !important;
        }
        [data-theme="light"] .hiring-pill:hover {
          background: rgba(232,93,4,0.08) !important;
          border-color: rgba(232,93,4,0.28) !important;
          color: var(--gold) !important;
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "52px", padding: "0 24px" }}>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          Our Students Are Now At
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--muted)", margin: 0 }}>
          700+ verified placements across India's top firms
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            style={{
              display: "flex",
              gap: "14px",
              width: "max-content",
              animation: "ticker-scroll 30s linear infinite",
            }}
          >
            {doubled1.map((c, i) => (
              <Pill key={i} name={c.name} />
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden", position: "relative" }}>
          <div
            style={{
              display: "flex",
              gap: "14px",
              width: "max-content",
              animation: "ticker-scroll-reverse 38s linear infinite",
            }}
          >
            {doubled2.map((c, i) => (
              <Pill key={i} name={c.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
