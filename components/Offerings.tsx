"use client";
import { useState } from "react";

const cornerColorMap: Record<string, string> = {
  "tag":        "rgba(212,170,82,0.08)",
  "tag-blue":   "rgba(96,165,250,0.08)",
  "tag-green":  "rgba(74,222,128,0.08)",
  "tag-rose":   "rgba(251,113,133,0.08)",
  "tag-indigo": "rgba(165,180,252,0.08)",
};

// Accent colors for the numbered circle per tag
const circleColorMap: Record<string, { bg: string; color: string }> = {
  "tag":        { bg: "rgba(249,115,22,0.15)",     color: "#F97316" },
  "tag-blue":   { bg: "rgba(96,165,250,0.15)",    color: "#60A5FA" },
  "tag-green":  { bg: "rgba(52,211,153,0.15)",    color: "#34D399" },
  "tag-rose":   { bg: "rgba(252,165,165,0.15)",   color: "#FCA5A5" },
  "tag-indigo": { bg: "rgba(167,139,250,0.15)",   color: "#60A5FA" },
};

const items = [
  { tag: "tag",        label: "Live Projects",    title: "Real-World Live Projects",       desc: "Work on actual consulting, marketing, finance, and operations projects. Build tangible CV deliverables — not just coursework.", points: ["6 domain tracks available", "Certificate of completion", "2-month engagement"] },
  { tag: "tag-blue",   label: "Placements",       title: "SIP & Final Placement Prep",     desc: "End-to-end preparation from CV to offer. Mock PIs, mock GDs, domain coaching, and 300+ interview transcripts from placed students.", points: ["5 CV review slots", "7 Mock PIs + 7 Mock GDs", "Domain-specific coaching"] },
  { tag: "tag-green",  label: "Case Competitions", title: "Case Competition Mastery",      desc: "Coached by AIR 1. Proven frameworks, 30+ winning PPTs, Canva Premium access, and a live national competition calendar.", points: ["4 live sessions x 2 hrs", "30+ winning case PPTs", "Canva Premium — 1 year"] },
  { tag: "tag-rose",   label: "Repositories",     title: "MBA Resource Repository",        desc: "Five years of placement intelligence in one place — CV templates, study compendiums, solved case decks, and placement data.", points: ["50+ ATS-optimised CV templates", "300+ interview transcripts", "5 yrs placement data"] },
  { tag: "tag-indigo", label: "Mentorship",       title: "1:1 IIM Alumni Mentorship",      desc: "Matched within 24 hours to an IIM alumni mentor aligned to your domain, target companies, and B-school.", points: ["IIM A / B / C / L alumni", "Matched in 24 hours", "Fully personalised sessions"] },
  { tag: "tag",        label: "CV & Profile",     title: "Profile & CV Building",          desc: "Committee PORs and graduation internships are no longer enough. We craft profiles that get shortlisted — precise keywords, impact, story.", points: ["ATS-optimised CVs", "LinkedIn strategy", "Personal brand narrative"] },
];

export default function Offerings() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="offerings" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, #0D0F1A 100%)" }}>
      <style>{`
        /* Offering cards — hover expand animation */
        .offering-card {
          cursor: default;
          transition:
            transform 0.28s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        .offering-card:hover {
          transform: translateY(-5px) scale(1.005);
        }
        /* Expandable desc wrapper */
        .offering-extra {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease;
        }
        .offering-extra.expanded {
          max-height: 160px;
          opacity: 1;
        }
        /* Number circle */
        .offering-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          flex-shrink: 0;
          font-family: var(--font-display);
          transition: transform 0.2s ease;
        }
        .offering-card:hover .offering-num {
          transform: scale(1.12);
        }
        /* Expand toggle button */
        .offering-toggle {
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--muted);
          font-size: 0.78rem;
          padding: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s ease;
          font-family: var(--font-sans);
          margin-top: 12px;
        }
        .offering-toggle:hover {
          color: var(--gold);
        }
        .offering-toggle-chevron {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .offering-toggle-chevron.open {
          transform: rotate(180deg);
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        {/* Section header */}
        <div style={{ marginBottom: "56px" }} data-reveal data-reveal-delay="1">
          <div className="section-label">Our Offerings</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Everything a Serious MBA<br />Student Needs to Win
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {items.map((item, idx) => {
            const circle = circleColorMap[item.tag] ?? circleColorMap["tag"];
            const isExpanded = expandedIndex === idx;
            const numLabel = String(idx + 1).padStart(2, "0");
            // Stagger: cap at 5 for CSS delay
            const delay = String(Math.min(idx + 1, 5));

            return (
              <div
                key={item.title}
                className="card offering-card"
                data-reveal
                data-reveal-delay={delay}
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Corner glow decoration */}
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "80px",
                  height: "80px",
                  background: `radial-gradient(circle at 100% 0%, ${cornerColorMap[item.tag] ?? "rgba(212,170,82,0.08)"}, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Header: number circle + tag */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <span
                    className="offering-num"
                    style={{ background: circle.bg, color: circle.color }}
                  >
                    {numLabel}
                  </span>
                  <span className={`tag ${item.tag}`} style={{ alignSelf: "center" }}>{item.label}</span>
                </div>

                {/* Title */}
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.08rem", color: "var(--text)", marginBottom: "10px" }}>
                  {item.title}
                </h3>

                {/* Short visible desc */}
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "0" }}>
                  {item.desc}
                </p>

                {/* Toggle to expand full bullet list */}
                <button
                  className="offering-toggle"
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? "Show less" : "Show details"}
                  <span className={`offering-toggle-chevron${isExpanded ? " open" : ""}`}>▾</span>
                </button>

                {/* Expandable bullet list */}
                <div className={`offering-extra${isExpanded ? " expanded" : ""}`}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)", paddingTop: "16px", marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {item.points.map(p => <li key={p} className="check-item">{p}</li>)}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
