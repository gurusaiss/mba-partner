"use client";
import { useState, useEffect } from "react";

export interface CourseData {
  id: number;
  category: string;
  tag: string;
  tagLabel: string;
  title: string;
  desc: string;
  price: string;
  original: string;
  points: string[];
  link: string;
  featured: boolean;
  nudge: string | null;
  groupOffer: string | null;
}

export const courses: CourseData[] = [
  {
    id: 1, category: "placements", tag: "tag-blue", tagLabel: "Placements — Master",
    title: "Placement Bootcamp — Master",
    desc: "The complete placement preparation package. Everything from CV to offer — mentorship, mock sessions, domain prep, and AI platform access.",
    price: "3,499", original: "6,000",
    points: [
      "5 CV reviews + 7 Mock PIs + 7 Mock GDs (can be topped up)",
      "End-to-End Domain Prep Sessions — 20+ hours",
      "Latest Company-wise & Profile-wise Interview Transcripts",
      "Full JD Prep + Psychometric Assessment Support",
      "AI Platform: Profile Assessment, CV Prep, Mock PIs",
      "Contact of 100+ HRs from Top Companies"
    ],
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 20% off · 3+ students = 30% off"
  },
  {
    id: 2, category: "placements", tag: "tag-blue", tagLabel: "Placements — Mini",
    title: "Placement Bootcamp — Mini",
    desc: "Start your placement prep without full commitment. All core features with 3 CVs, 5 Mock PIs, 5 Mock GDs — top up anytime.",
    price: "2,499", original: "4,500",
    points: [
      "3 CV reviews + 5 Mock PIs + 5 Mock GDs (top up anytime)",
      "End-to-End Domain Prep Sessions — 20+ hours",
      "Company-wise Interview Transcripts",
      "Full JD Prep + Psychometric Support"
    ],
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/",
    featured: false,
    nudge: "💡 Upgrade to Master anytime — sessions carry over",
    groupOffer: null
  },
  {
    id: 3, category: "case", tag: "tag-green", tagLabel: "Case Competition",
    title: "Case Competition Bootcamp",
    desc: "Coached by AIR 1, AIR 6, AIR 10 & AIR 15 from Unstop. 8 hours of sessions + 30+ national finals PPTs + Canva Pro for 1 year.",
    price: "3,499", original: "6,000",
    points: [
      "8 hours of sessions by Unstop Toppers (AIR 1, 6, 10, 15)",
      "30+ National Finals & Winning PPTs",
      "Canva Pro Access for 1 Year",
      "1:1 Mentorship if you clear Executive Summary Round",
      "1 CV point via annual MSME Competition on Unstop",
      "AI Platform: Profile, CV, Mock PIs"
    ],
    link: "https://www.mbapartner.in/product/case-competition-bootcamp/",
    featured: false,
    nudge: "🏆 20+ National Winners from our students",
    groupOffer: "2 students = 30% off · 3+ students = 40% off"
  },
  {
    id: 4, category: "projects", tag: "tag", tagLabel: "Live Project — 2 Months",
    title: "Live Project — 2 Month Engagement",
    desc: "Real project under Prodmark Business Consultants Pvt. Ltd. Not a course — actual deliverables with IIM alumni oversight. 6 domain tracks.",
    price: "3,999", original: "7,000",
    points: [
      "8 hours of domain sessions + project assignment",
      "5 ATS-friendly CV points on completion",
      "Certificate of Completion (flexible dates)",
      "AI Platform: Profile Assessment, CV Prep, Mock PIs",
      "Domains: Finance · Consulting · Marketing · HR · Operations · Product"
    ],
    link: "https://www.mbapartner.in/product/live-project-consulting/",
    featured: false,
    nudge: "✅ Works under a real consulting company — not a simulation",
    groupOffer: "2 students = 30% off"
  },
  {
    id: 5, category: "projects", tag: "tag", tagLabel: "Live Project — 1 Month",
    title: "Live Project — 1 Month Engagement",
    desc: "Shorter track covering the top 4 areas per domain. 4 hours of sessions, 2 ATS-friendly CV points, certificate. Max 2 hours/day commitment.",
    price: "2,499", original: "4,500",
    points: [
      "4 hours of domain sessions + project",
      "2 ATS-friendly CV points on completion",
      "Certificate of Completion",
      "Domains: Finance · Consulting · Marketing · HR · Operations · Product"
    ],
    link: "https://www.mbapartner.in/product/live-project-consulting/",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off"
  },
  {
    id: 6, category: "combo", tag: "tag-rose", tagLabel: "Best Value Combo",
    title: "Master Bundle — Placements + Case Comp + Live Project",
    desc: "Our most popular all-in-one package. Everything to differentiate your MBA profile — placement prep, case competition mastery, and a real live project.",
    price: "13,999", original: "22,000",
    points: [
      "Full Placement Bootcamp — Master",
      "Full Case Competition Bootcamp",
      "1 Live Project — 2 months (any domain)",
      "Priority mentor matching",
      "Record-breaking results when all three are combined"
    ],
    link: "https://www.mbapartner.in/product/master-bootcamp-case-comp-live-project/",
    featured: true,
    nudge: "🔥 Save ₹8,001 vs buying separately",
    groupOffer: null
  },
  {
    id: 7, category: "combo", tag: "tag-indigo", tagLabel: "Combo",
    title: "Placement + Case Competition Combo",
    desc: "The two most impactful tools for MBA students, combined at a discount.",
    price: "5,999", original: "10,000",
    points: [
      "Full Placement Bootcamp — Master",
      "Full Case Competition Bootcamp",
      "30+ winning case decks"
    ],
    link: "https://www.mbapartner.in/product/placement-case-competition-combo/",
    featured: false,
    nudge: "💰 Save ₹4,001 vs buying separately",
    groupOffer: null
  },
  {
    id: 8, category: "certifications", tag: "tag-blue", tagLabel: "Certification",
    title: "Advanced Excel — Including Power Query",
    desc: "XLookUp, Index-Match, Power Query, 20+ core functions, and Financial Modelling in Excel. Essential for Finance and Operations roles.",
    price: "1,999", original: "3,500",
    points: [
      "X-LookUp, Index-Match, & Power Query",
      "20+ core Excel functions",
      "Session on Financial Modelling in Excel"
    ],
    link: "https://www.mbapartner.in",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off · 3+ students = 40% off"
  },
  {
    id: 9, category: "certifications", tag: "tag-indigo", tagLabel: "Certification",
    title: "Power BI — Interactive Dashboards",
    desc: "Build interactive dashboards from 5+ data sources including web. Dynamic dashboarding and BI modelling queries.",
    price: "1,999", original: "3,500",
    points: [
      "BI Modelling Queries and interactive dashboards",
      "Dynamic Dashboarding from 5+ data sources including web"
    ],
    link: "https://www.mbapartner.in",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off · 3+ students = 40% off"
  },
];

const tabs = [
  { key: "all", label: "All Courses" },
  { key: "placements", label: "Placements" },
  { key: "case", label: "Case Competitions" },
  { key: "projects", label: "Live Projects" },
  { key: "combo", label: "Combos" },
  { key: "certifications", label: "Certifications" },
];

interface CoursesProps {
  comparedIds: number[];
  onCompareToggle: (id: number) => void;
}

export default function Courses({ comparedIds, onCompareToggle }: CoursesProps) {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? courses : courses.filter(c => c.category === active);

  const handleCompare = (id: number) => {
    if (comparedIds.includes(id)) {
      onCompareToggle(id);
    } else if (comparedIds.length < 3) {
      onCompareToggle(id);
    }
  };

  const scrollToCompare = () => {
    const el = document.getElementById("course-compare");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`tab-btn${active === t.key ? " active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {filtered.map(c => {
            const isCompared = comparedIds.includes(c.id);
            const compareDisabled = !isCompared && comparedIds.length >= 3;

            return (
              <div
                key={c.id}
                className={`card${c.featured ? " card-featured" : ""}`}
                style={{ padding: "28px", display: "flex", flexDirection: "column" }}
              >
                {/* Tag row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                  <span className={`tag ${c.tag}`}>{c.tagLabel}</span>
                  {c.featured && <span className="tag tag-green">Best Value</span>}
                </div>

                {/* Title */}
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "10px" }}>
                  {c.title}
                </h3>

                {/* Desc */}
                <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: c.nudge ? "12px" : "20px" }}>
                  {c.desc}
                </p>

                {/* Nudge strip */}
                {c.nudge && (
                  <div style={{
                    background: "rgba(201,168,76,0.07)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "0.8rem",
                    color: "var(--gold)",
                    marginBottom: "16px"
                  }}>
                    {c.nudge}
                  </div>
                )}

                {/* Feature points */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)", paddingTop: "16px", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {c.points.map(p => (
                    <li key={p} className="check-item">{p}</li>
                  ))}
                </ul>

                {/* Group offer */}
                {c.groupOffer && (
                  <div style={{
                    fontSize: "0.75rem",
                    color: "#a5b4fc",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <span>👥</span>
                    <span>{c.groupOffer}</span>
                  </div>
                )}

                {/* Price row */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
                  <div>
                    <div className="serif" style={{ fontWeight: 900, fontSize: "1.6rem", color: "var(--gold)" }}>&#8377;{c.price}</div>
                    <div style={{ fontSize: "0.8rem", textDecoration: "line-through", color: "var(--dim)" }}>&#8377;{c.original}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className={c.featured ? "btn-primary" : "btn-secondary"}
                      style={{ padding: "9px 18px", fontSize: "0.85rem" }}
                    >
                      Enroll Now
                    </a>
                    <button
                      onClick={() => handleCompare(c.id)}
                      disabled={compareDisabled}
                      style={{
                        background: isCompared ? "rgba(201,168,76,0.15)" : "transparent",
                        border: isCompared ? "1px solid rgba(201,168,76,0.4)" : "1px solid var(--border)",
                        borderRadius: "8px",
                        color: isCompared ? "var(--gold)" : "var(--muted)",
                        fontSize: "0.75rem",
                        padding: "5px 12px",
                        cursor: compareDisabled ? "not-allowed" : "pointer",
                        opacity: compareDisabled ? 0.45 : 1,
                        transition: "all 0.2s",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {isCompared ? "✓ Comparing" : compareDisabled ? "Max 3 reached" : "+ Compare"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating comparison bar */}
      {comparedIds.length > 0 && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 200,
          background: "var(--card)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderRadius: "14px",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)"
        }}>
          <span style={{ fontSize: "0.9rem", color: "var(--text)" }}>
            Comparing <strong style={{ color: "var(--gold)" }}>{comparedIds.length}</strong> course{comparedIds.length > 1 ? "s" : ""}
          </span>
          <button
            className="btn-primary"
            onClick={scrollToCompare}
            style={{ padding: "8px 20px", fontSize: "0.85rem" }}
          >
            View Comparison →
          </button>
          <button
            onClick={() => comparedIds.forEach(id => onCompareToggle(id))}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--muted)",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: "4px 8px"
            }}
          >
            Clear
          </button>
        </div>
      )}
    </section>
  );
}
