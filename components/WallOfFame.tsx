"use client";

import { useEffect, useRef, useState } from "react";

const students = [
  {
    name: "Pavan Pawar",
    school: "SIBM Pune",
    company: "Ediglobe",
    domain: "Consulting",
    batch: "2024",
    emoji: "🏆",
    role: "Summer Intern — Strategy",
    achievement: "Converted PPO with highest rating in cohort",
  },
  {
    name: "Vedanshi Singh",
    school: "XLRI Jamshedpur",
    company: "Amazon",
    domain: "Marketing",
    batch: "2024",
    emoji: "⭐",
    role: "Summer Intern — Category Management",
    achievement: "Selected from 3,200+ applicants via CV shortlist",
  },
  {
    name: "Divyanshi Jaiswal",
    school: "NMIMS Mumbai",
    company: "Nomura",
    domain: "Finance",
    batch: "2024",
    emoji: "💼",
    role: "Full-Time Analyst — Investment Banking",
    achievement: "Placed in Day 0 final placements",
  },
  {
    name: "Ananyo Roy",
    school: "XLRI",
    company: "TAS (Tata)",
    domain: "Strategy",
    batch: "2024",
    emoji: "🎯",
    role: "Management Trainee — Group Strategy",
    achievement: "1 of 30 selected nationally for TAS programme",
  },
  {
    name: "Megha Soni",
    school: "IIM Mumbai",
    company: "Kearney",
    domain: "Consulting",
    batch: "2024",
    emoji: "🔥",
    role: "Summer Associate — Management Consulting",
    achievement: "Case interview cracked in first round",
  },
  {
    name: "Madhumitha R.",
    school: "IIM Bangalore",
    company: "Accenture",
    domain: "Operations",
    batch: "2024",
    emoji: "💡",
    role: "Summer Intern — Accenture Strategy",
    achievement: "Offered role after 7 Mock GDs + Mock PIs",
  },
  {
    name: "Arjun Mehta",
    school: "MDI Gurgaon",
    company: "Goldman Sachs",
    domain: "Finance",
    batch: "2023",
    emoji: "📈",
    role: "Full-Time Analyst — Securities Division",
    achievement: "Top finance placement from MDI batch",
  },
  {
    name: "Sneha Kulkarni",
    school: "SPJIMR",
    company: "HUL",
    domain: "Marketing",
    batch: "2023",
    emoji: "🌟",
    role: "Brand Manager — Home Care",
    achievement: "Dream Day 1 placement via live project portfolio",
  },
];

function domainTagClass(domain: string): string {
  switch (domain) {
    case "Finance":
      return "tag-blue";
    case "Marketing":
      return "tag-green";
    case "Strategy":
    case "Operations":
      return "tag-indigo";
    default:
      return "tag";
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CompanyPill({ company }: { company: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "var(--gold)",
        background: "rgba(232,93,4,0.1)",
        border: "1px solid rgba(232,93,4,0.25)",
        borderRadius: "100px",
        padding: "3px 10px",
        letterSpacing: "0.02em",
      }}
    >
      <svg
        width="7"
        height="7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Placed at {company}
    </span>
  );
}

function ProfilePreview({ student }: { student: (typeof students)[0] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "240px",
        background: "linear-gradient(155deg, #1a1c2e 0%, #141620 100%)",
        border: "1px solid rgba(232,93,4,0.35)",
        borderRadius: "14px",
        padding: "16px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      {/* Triangle pointer */}
      <div
        style={{
          position: "absolute",
          bottom: "-7px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: "13px",
          height: "13px",
          background: "linear-gradient(135deg, transparent 50%, #141620 50%)",
          border: "1px solid rgba(232,93,4,0.35)",
          borderTop: "none",
          borderLeft: "none",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F97316 0%, #D4720A 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 800,
            color: "#000",
            flexShrink: 0,
          }}
        >
          {getInitials(student.name)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text)" }}>
            {student.name}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{student.school}</div>
        </div>
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "var(--muted)",
          lineHeight: 1.5,
          marginBottom: "10px",
        }}
      >
        {student.role}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "rgba(74,222,128,0.85)",
          background: "rgba(74,222,128,0.08)",
          border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: "8px",
          padding: "6px 8px",
          lineHeight: 1.4,
        }}
      >
        {student.achievement}
      </div>
    </div>
  );
}

function StudentCard({
  student,
  index,
}: {
  student: (typeof students)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="wof-card"
      style={{
        background: "linear-gradient(155deg, #141520 0%, #0F1018 100%)",
        border: hovered
          ? "1px solid rgba(249,115,22,0.35)"
          : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 18,
        padding: "24px",
        transform: visible
          ? hovered
            ? "translateY(-6px)"
            : "translateY(0)"
          : "translateY(28px)",
        boxShadow: hovered ? "0 20px 56px rgba(0,0,0,0.45)" : "none",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform ${hovered ? "0.22s" : `0.5s ease ${index * 0.07}s`}, border 0.22s, box-shadow 0.22s`,
        opacity: visible ? 1 : 0,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {hovered && <ProfilePreview student={student} />}

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
          background: "linear-gradient(135deg, #F97316 0%, #D4720A 100%)",
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
          margin: "14px 0 10px",
        }}
      />

      <CompanyPill company={student.company} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
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
  const { ref: ctaRef, visible: ctaVisible } = useReveal(0.1);

  return (
    <section
      style={{
        padding: "96px 0",
        background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)",
      }}
    >
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
          <div className="section-label" style={{ marginBottom: 16 }}>
            WALL OF FAME
          </div>
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
            <StudentCard key={i} student={s} index={i} />
          ))}
        </div>

        {/* CTA strip */}
        <div
          ref={ctaRef}
          style={{
            marginTop: "56px",
            textAlign: "center",
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.55s ease 0.3s, transform 0.55s ease 0.3s",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, rgba(232,93,4,0.12) 0%, rgba(232,93,4,0.06) 100%)",
              border: "1px solid rgba(232,93,4,0.35)",
              borderRadius: "100px",
              padding: "16px 32px",
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--gold)",
              textDecoration: "none",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, rgba(232,93,4,0.2) 0%, rgba(232,93,4,0.1) 100%)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 32px rgba(232,93,4,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, rgba(232,93,4,0.12) 0%, rgba(232,93,4,0.06) 100%)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            Join 5,000+ successful alumni
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.8rem",
              color: "var(--dim)",
            }}
          >
            Placements across IIMs, XLRI, NMIMS, MDI and 30+ top B-schools
          </p>
        </div>
      </div>
    </section>
  );
}
