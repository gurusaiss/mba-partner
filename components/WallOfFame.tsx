"use client";

import { useState } from "react";

const students = [
  { name: "Pavan Pawar", school: "SIBM Pune", company: "Ediglobe", domain: "Consulting", batch: "2024", emoji: "🏆" },
  { name: "Vedanshi Singh", school: "XLRI Jamshedpur", company: "Amazon", domain: "Marketing", batch: "2024", emoji: "⭐" },
  { name: "Divyanshi Jaiswal", school: "NMIMS Mumbai", company: "Nomura", domain: "Finance", batch: "2024", emoji: "💼" },
  { name: "Ananyo Roy", school: "XLRI", company: "TAS (Tata)", domain: "Strategy", batch: "2024", emoji: "🎯" },
  { name: "Megha Soni", school: "IIM Mumbai", company: "Kearney", domain: "Consulting", batch: "2024", emoji: "🔥" },
  { name: "Madhumitha R.", school: "IIM Bangalore", company: "Accenture", domain: "Operations", batch: "2024", emoji: "💡" },
  { name: "Arjun Mehta", school: "MDI Gurgaon", company: "Goldman Sachs", domain: "Finance", batch: "2023", emoji: "📈" },
  { name: "Sneha Kulkarni", school: "SPJIMR", company: "HUL", domain: "Marketing", batch: "2023", emoji: "🌟" },
];

function domainTagClass(domain: string): string {
  switch (domain) {
    case "Finance": return "tag-blue";
    case "Marketing": return "tag-green";
    case "Strategy":
    case "Operations": return "tag-indigo";
    default: return "tag";
  }
}

function StudentCard({ student }: { student: typeof students[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(155deg, #141520 0%, #0F1018 100%)",
        border: hovered ? "1px solid rgba(240,170,0,0.35)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        padding: "24px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.22s",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          fontSize: "0.72rem",
          background: "rgba(255,255,255,0.05)",
          padding: "3px 8px",
          borderRadius: 100,
          color: "var(--muted)",
          fontWeight: 600,
        }}
      >
        {student.batch}
      </span>

      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #F0AA00 0%, #D4720A 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        {student.emoji}
      </div>

      <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>
        {student.name}
      </div>
      <div style={{ fontSize: "0.88rem", color: "var(--muted)", marginTop: 4 }}>
        {student.school}
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          margin: "14px 0",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--gold)" }}>
          {student.company}
        </span>
        <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>→</span>
        <span className={domainTagClass(student.domain)} style={{ fontSize: "0.78rem" }}>
          {student.domain}
        </span>
      </div>
    </div>
  );
}

export default function WallOfFame() {
  return (
    <section style={{ padding: "96px 0" }}>
      <style>{`
        [data-theme="light"] .wof-card {
          background: #FFFFFF !important;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06) !important;
          border-color: rgba(0,0,0,0.07) !important;
        }
        @media (max-width: 900px) {
          .wof-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .wof-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>WALL OF FAME</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Students Who Made It Big
          </h2>
          <p style={{ fontSize: "1.1rem", color: "var(--muted)", margin: 0 }}>
            Real students. Real companies. Real results.
          </p>
        </div>

        <div
          className="wof-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {students.map((s, i) => (
            <StudentCard key={i} student={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
