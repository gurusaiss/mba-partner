"use client";

import { useEffect, useRef, useState } from "react";

const colleges = [
  { name: "MDI Gurgaon", count: 12 },
  { name: "NMIMS Mumbai", count: 9 },
  { name: "IIM Kozhikode", count: 8 },
  { name: "XLRI Jamshedpur", count: 7 },
  { name: "JBIMS", count: 5 },
  { name: "IIM Lucknow", count: 5 },
  { name: "IIM Bangalore", count: 6 },
  { name: "IIM Indore", count: 4 },
  { name: "FMS Delhi", count: 4 },
  { name: "SIBM Bangalore", count: 3 },
  { name: "IIM Mumbai", count: 2 },
  { name: "IIM Ranchi", count: 2 },
  { name: "IMT Ghaziabad", count: 2 },
  { name: "IIM Amritsar", count: 1 },
  { name: "Others", count: 50 },
];

const testimonials = [
  {
    name: "Pavan Pawar",
    college: "SIBM Bangalore",
    role: "MBA — Marketing & Consulting",
    placed: "Ediglobe (SIP)",
    quote:
      "I took Marketing, Product Management, and Consulting live projects simultaneously with the Case Competition Bootcamp. The real deliverables gave me concrete talking points in every SIP interview. Placed at Ediglobe.",
    tag: "Case Comp + 3 Live Projects",
    tagClass: "tag-green",
  },
  {
    name: "Vedanshi",
    college: "XLRI Jamshedpur",
    role: "MBA — Business Management",
    placed: "Amazon (SIP)",
    quote:
      "The Consulting Live Project under Prodmark gave me an actual strategy deliverable to show in interviews. Amazon shortlisted me directly based on my CV — the ATS-optimised CV points made all the difference.",
    tag: "Live Project — Consulting",
    tagClass: "tag-blue",
  },
  {
    name: "Divyanshi Jaiswal",
    college: "NMIMS Mumbai",
    role: "MBA — Finance",
    placed: "Nomura (Final)",
    quote:
      "Final placements at Nomura. The Master Placement Bootcamp — especially the finance-domain Mock PIs and the interview transcripts from Goldman and JP Morgan — prepared me for exactly the type of questions asked.",
    tag: "Master Placements",
    tagClass: "tag",
  },
  {
    name: "Ananyo Sharma Roy",
    college: "XLRI Jamshedpur",
    role: "MBA — HRM & Business Management",
    placed: "TAS (Final)",
    quote:
      "TAS is one of the most selective final placement roles. The 1:1 mentorship from an alumnus who had cracked TAS the previous year, combined with the domain sessions, made the preparation feel structured rather than overwhelming.",
    tag: "1:1 Mentorship",
    tagClass: "tag-rose",
  },
  {
    name: "Megha",
    college: "IIM Mumbai",
    role: "MBA — Operations & Strategy",
    placed: "Kearney (SIP)",
    quote:
      "Kearney was my dream SIP. The Case Competition Bootcamp by AIR 1 taught me frameworks that I directly applied in the Kearney case interview. I also did the Marketing and Operations live projects — both featured in my CV.",
    tag: "Case Comp + Live Projects",
    tagClass: "tag-indigo",
  },
  {
    name: "Madhumitha",
    college: "IIM Bangalore",
    role: "MBA — Consulting Track",
    placed: "Accenture (SIP)",
    quote:
      "The domain-specific coaching for consulting roles was exceptional. 7 Mock GDs and 7 Mock PIs over 6 weeks completely transformed how I present myself. Placed at Accenture Strategy.",
    tag: "Master Placements",
    tagClass: "tag-green",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StarRating() {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#F97316"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "0.65rem",
        fontWeight: 700,
        color: "#4ade80",
        background: "rgba(74,222,128,0.1)",
        border: "1px solid rgba(74,222,128,0.25)",
        borderRadius: "100px",
        padding: "2px 8px",
        letterSpacing: "0.03em",
      }}
    >
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      Verified Student
    </span>
  );
}

function QuoteDecoration() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: "12px",
        right: "18px",
        fontSize: "6rem",
        lineHeight: 1,
        fontFamily: "Georgia, serif",
        color: "rgba(249,115,22,0.06)",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      &ldquo;
    </div>
  );
}

function useReveal(threshold = 0.15) {
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

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className="card"
      style={{
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s`,
      }}
    >
      <QuoteDecoration />
      <StarRating />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Playfair Display, serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            flexShrink: 0,
            background: "var(--card2)",
            border: "1px solid var(--border)",
            color: "var(--gold)",
          }}
        >
          {getInitials(t.name)}
        </div>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {t.name}
            <VerifiedBadge />
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "2px" }}>
            {t.college}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--dim)", marginTop: "1px" }}>
            {t.role}
          </div>
        </div>
      </div>
      <blockquote
        style={{
          fontSize: "0.93rem",
          lineHeight: 1.75,
          color: "var(--muted)",
          flex: 1,
          marginBottom: "20px",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingTop: "20px",
          borderTop: "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        <span className={`tag ${t.tagClass}`} style={{ fontSize: "0.65rem" }}>
          {t.tag}
        </span>
        <span style={{ fontSize: "0.78rem", color: "var(--dim)" }}>→ {t.placed}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.1);

  return (
    <section
      id="testimonials"
      style={{
        padding: "96px 0",
        background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div
          ref={headerRef}
          className="sec-header-left"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div className="sec-eyebrow">700+ Verified Reviews</div>
          <h2 className="sec-h2">Students Who Made It</h2>
          <p className="sec-sub">Real placements. Real people. Verified outcomes from IIM, XLRI, JBIMS, and 40+ B-Schools.</p>
        </div>

        {/* Part A: College chips */}
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "52px" }}
        >
          {colleges.map((c) => (
            <div
              key={c.name}
              style={{
                background: "var(--card2)",
                border: "1px solid var(--border)",
                borderRadius: "100px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--text)" }}
              >
                {c.name}
              </span>
              <span
                style={{
                  background: "rgba(249,115,22,0.15)",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: "100px",
                  padding: "1px 8px",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                }}
              >
                {c.count === 50 ? "50+" : c.count}
              </span>
            </div>
          ))}
        </div>

        {/* Part B: Testimonial cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "56px",
          }}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>

        {/* Part C: Summary stats strip */}
        <div
          style={{
            textAlign: "center",
            padding: "28px 32px",
            background: "var(--card2)",
            borderRadius: "14px",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--muted)",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            <span style={{ color: "var(--gold)", fontWeight: 700 }}>
              Students placed across 40+ companies
            </span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span>IIM A · B · C · L · K · I</span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span>XLRI · MDI · NMIMS · JBIMS · FMS</span>
            <span style={{ color: "var(--dim)", margin: "0 12px" }}>·</span>
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>and 30 more B-schools</span>
          </p>
        </div>

      </div>
    </section>
  );
}
