"use client";
import { useState } from "react";

const courses = [
  { id: 1, category: "placements", tag: "tag-blue", tagLabel: "Placements", title: "SIP + Final Placement Bootcamp", desc: "5 CV reviews, 7 Mock PIs, 7 Mock GDs, domain coaching, and 300+ interview transcripts. Complete placement preparation.", price: "3,499", original: "6,000", points: ["7 Mock PI + 7 Mock GD sessions", "5 CV/LinkedIn reviews", "Domain-specific coaching"], link: "https://www.mbapartner.in/product/sip-placement-bootcamp/", featured: false },
  { id: 2, category: "case", tag: "tag-green", tagLabel: "Case Competition", title: "Case Competition Bootcamp", desc: "Coached by AIR 1. 4 live sessions (2 hrs each), 30+ winning PPTs, Canva Premium for 1 year, and a national competition calendar.", price: "3,499", original: "6,000", points: ["4 live sessions x 2 hrs", "30+ winning case PPTs", "Canva Premium — 1 year"], link: "https://www.mbapartner.in/product/case-competition-bootcamp/", featured: false },
  { id: 3, category: "projects", tag: "tag", tagLabel: "Live Project", title: "Live Project — Consulting", desc: "Real consulting project with certificate of completion, LinkedIn recommendation, and structured deliverables across a 2-month engagement.", price: "3,999", original: "7,000", points: ["Real client deliverables", "Certificate + LinkedIn rec", "2-month engagement"], link: "https://www.mbapartner.in/product/live-project-consulting/", featured: false },
  { id: 4, category: "projects", tag: "tag", tagLabel: "Live Project", title: "Live Project — Finance", desc: "Finance-track live project covering financial modelling, equity research, or investment analysis with IIM alumni oversight.", price: "3,999", original: "7,000", points: ["Finance / FinTech domain", "Certificate + LinkedIn rec", "2-month engagement"], link: "https://www.mbapartner.in/product/live-project-finance/", featured: false },
  { id: 5, category: "combo", tag: "tag-rose", tagLabel: "Best Value Combo", title: "Master Bundle — Placement + Case Comp + Live Project", desc: "Our most popular all-in-one package. Complete placement prep, case competition mastery, and a real live project — everything to differentiate your MBA profile.", price: "13,999", original: "22,000", points: ["Full Placement Bootcamp", "Full Case Competition Bootcamp", "1 Live Project (any domain)", "Priority mentor matching"], link: "https://www.mbapartner.in/product/master-bootcamp-case-comp-live-project/", featured: true },
  { id: 6, category: "combo", tag: "tag-indigo", tagLabel: "Combo", title: "Placement + Case Competition Combo", desc: "Placement bootcamp paired with case competition mastery — the two most impactful tools for MBA students at a combined discount.", price: "5,999", original: "10,000", points: ["Full Placement Bootcamp", "Full Case Competition Bootcamp", "30+ winning case decks"], link: "https://www.mbapartner.in/product/placement-case-competition-combo/", featured: false },
  { id: 7, category: "placements", tag: "tag-blue", tagLabel: "Placements", title: "Final Placement Bootcamp — Premium", desc: "For final year students targeting top-tier companies. Includes all SIP bootcamp features plus additional mock rounds and company-specific prep.", price: "4,999", original: "8,500", points: ["10 Mock PI + 10 Mock GD", "Company-specific prep", "CV + cover letter reviews"], link: "https://www.mbapartner.in/product/final-placement-bootcamp/", featured: false },
  { id: 8, category: "projects", tag: "tag", tagLabel: "Live Project", title: "Live Project — Marketing / HR / Ops", desc: "Live project track across Marketing, Human Resources, or Operations domains. Real deliverables, alumni oversight, certificate on completion.", price: "3,999", original: "7,000", points: ["3 domain tracks available", "Certificate + LinkedIn rec", "Structured bi-weekly reviews"], link: "https://www.mbapartner.in/product/live-project-marketing/", featured: false },
];

const tabs = [
  { key: "all", label: "All Courses" },
  { key: "placements", label: "Placements" },
  { key: "case", label: "Case Competitions" },
  { key: "projects", label: "Live Projects" },
  { key: "combo", label: "Combos" },
];

export default function Courses() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? courses : courses.filter(c => c.category === active);

  return (
    <section id="courses" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "40px" }}>
          <div className="section-label">Pricing</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "10px" }}>
            Courses & Packages
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Transparent pricing. Real deliverables. No upsells.</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActive(t.key)} className={`tab-btn ${active === t.key ? "active" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {filtered.map(c => (
            <div key={c.id} className={`card ${c.featured ? "card-featured" : ""}`} style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <span className={`tag ${c.tag}`}>{c.tagLabel}</span>
                {c.featured && <span className="tag tag-green">Best Value</span>}
              </div>
              <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "10px" }}>{c.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "20px", flex: 1 }}>{c.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)", paddingTop: "16px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {c.points.map(p => <li key={p} className="check-item">{p}</li>)}
              </ul>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
                <div>
                  <div className="serif" style={{ fontWeight: 900, fontSize: "1.6rem", color: "var(--gold)" }}>&#8377;{c.price}</div>
                  <div style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--dim)" }}>&#8377;{c.original}</div>
                </div>
                <a href={c.link} target="_blank" rel="noreferrer"
                  className={c.featured ? "btn-primary" : "btn-secondary"}
                  style={{ padding: "9px 18px", fontSize: "0.85rem" }}>
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
