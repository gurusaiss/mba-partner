"use client";
import { useState } from "react";

const courses = [
  {
    id: 1, category: "placements",
    tag: "tag-blue", tagLabel: "Placements Bootcamp",
    title: "SIP + Final Placement Bootcamp",
    desc: "5 CV reviews, 7 Mock PIs, 7 Mock GDs, domain coaching, and 300+ interview transcripts. The complete placement preparation package.",
    price: "₹3,499", original: "₹6,000",
    points: ["7 Mock PI + 7 Mock GD sessions", "5 CV/LinkedIn reviews", "Domain-specific coaching"],
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/",
    featured: false,
  },
  {
    id: 2, category: "case",
    tag: "tag-green", tagLabel: "Case Competition",
    title: "Case Competition Bootcamp",
    desc: "Coached by AIR 1. 4 live sessions (2 hrs each), 30+ winning PPTs, Canva Premium for 1 year, and a national competition calendar.",
    price: "₹3,499", original: "₹6,000",
    points: ["4 live sessions × 2 hrs", "30+ winning case PPTs", "Canva Premium — 1 year"],
    link: "https://www.mbapartner.in/product/case-competition-bootcamp/",
    featured: false,
  },
  {
    id: 3, category: "projects",
    tag: "tag", tagLabel: "Live Project",
    title: "Live Project — Consulting",
    desc: "Real consulting project with certificate of completion, LinkedIn recommendation, and structured deliverables across a 2-month engagement.",
    price: "₹3,999", original: "₹7,000",
    points: ["Real client deliverables", "Certificate + LinkedIn rec", "2-month engagement"],
    link: "https://www.mbapartner.in/product/live-project-consulting/",
    featured: false,
  },
  {
    id: 4, category: "projects",
    tag: "tag", tagLabel: "Live Project",
    title: "Live Project — Finance",
    desc: "Finance-track live project covering financial modelling, equity research, or investment analysis with IIM alumni oversight.",
    price: "₹3,999", original: "₹7,000",
    points: ["Finance / FinTech domain", "Certificate + LinkedIn rec", "2-month engagement"],
    link: "https://www.mbapartner.in/product/live-project-finance/",
    featured: false,
  },
  {
    id: 5, category: "combo",
    tag: "tag-rose", tagLabel: "Best Value Combo",
    title: "Master Bootcamp + Case Comp + 1 Live Project",
    desc: "Our most popular all-in-one package. Placements prep, case competition mastery, and a real live project — everything to differentiate your MBA profile.",
    price: "₹13,999", original: "₹22,000",
    points: ["Full Placement Bootcamp", "Full Case Competition Bootcamp", "1 Live Project (any domain)", "Priority mentor matching"],
    link: "https://www.mbapartner.in/product/master-bootcamp-case-comp-live-project/",
    featured: true,
  },
  {
    id: 6, category: "combo",
    tag: "tag-indigo", tagLabel: "Combo",
    title: "Placement + Case Competition Combo",
    desc: "Placement bootcamp paired with case competition mastery — the two most impactful tools for MBA students, at a combined discount.",
    price: "₹5,999", original: "₹10,000",
    points: ["Full Placement Bootcamp", "Full Case Competition Bootcamp", "30+ winning case decks"],
    link: "https://www.mbapartner.in/product/placement-case-competition-combo/",
    featured: false,
  },
  {
    id: 7, category: "placements",
    tag: "tag-blue", tagLabel: "Placements Bootcamp",
    title: "Final Placement Bootcamp — Premium",
    desc: "For final year students targeting top-tier companies. Includes all SIP bootcamp features plus additional mock rounds and company-specific prep.",
    price: "₹4,999", original: "₹8,500",
    points: ["10 Mock PI + 10 Mock GD", "Company-specific preparation", "CV + cover letter reviews"],
    link: "https://www.mbapartner.in/product/final-placement-bootcamp/",
    featured: false,
  },
  {
    id: 8, category: "projects",
    tag: "tag", tagLabel: "Live Project",
    title: "Live Project — Marketing / HR / Operations",
    desc: "Live project track across Marketing, Human Resources, or Operations domains. Real deliverables, alumni oversight, certificate on completion.",
    price: "₹3,999", original: "₹7,000",
    points: ["3 domain tracks available", "Certificate + LinkedIn rec", "Structured bi-weekly reviews"],
    link: "https://www.mbapartner.in/product/live-project-marketing/",
    featured: false,
  },
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
    <section id="courses" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-10">
          <div className="section-label">Pricing</div>
          <h2 className="section-title mb-3" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            Courses & Packages
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
            Transparent pricing. Real deliverables. No upsells.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActive(t.key)}
              className={`tab-btn ${active === t.key ? "active" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(c => (
            <div key={c.id} className={`card ${c.featured ? "card-featured" : ""} p-7 flex flex-col`}>
              <div className="flex items-start justify-between mb-5">
                <span className={`tag ${c.tag}`}>{c.tagLabel}</span>
                {c.featured && <span className="tag tag-green">Best Value</span>}
              </div>

              <h3 className="serif font-bold text-base mb-3" style={{ color: "var(--text)" }}>{c.title}</h3>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--muted)" }}>{c.desc}</p>

              <ul className="space-y-2 mb-6 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                {c.points.map(p => <li key={p} className="check-item">{p}</li>)}
              </ul>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  <div className="serif font-black" style={{ fontSize: "1.6rem", color: "var(--gold)" }}>{c.price}</div>
                  <div className="text-xs line-through" style={{ color: "var(--dim)" }}>{c.original}</div>
                </div>
                <a href={c.link} target="_blank" rel="noreferrer"
                  className={c.featured ? "btn-primary" : "btn-secondary"} style={{ padding: "10px 20px", fontSize: "0.82rem" }}>
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
