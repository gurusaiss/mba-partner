"use client";

const steps = [
  {
    n: "1",
    icon: "🎯",
    title: "Choose Your Track",
    desc: "Pick from Placement Bootcamp, Case Competitions, Live Projects, or a combo. Transparent pricing — no hidden fees.",
    color: "#F97316",
    colorAlpha: "rgba(249,115,22,0.10)",
  },
  {
    n: "2",
    icon: "⚡",
    title: "Onboard in 24 hrs",
    desc: "Get matched to your IIM alumni mentor aligned to your domain and target companies. Receive your full resource pack.",
    color: "#38BDF8",
    colorAlpha: "rgba(56,189,248,0.10)",
  },
  {
    n: "3",
    icon: "📋",
    title: "Build Your Profile",
    desc: "CV reviews, Live Projects, and Case Competition coaching. Real deliverables — not passive video watching.",
    color: "#10B981",
    colorAlpha: "rgba(16,185,129,0.10)",
  },
  {
    n: "4",
    icon: "🎤",
    title: "Mock & Prepare",
    desc: "Mock PIs, Mock GDs, domain prep sessions, psychometric assessments, and company-specific interview transcripts.",
    color: "#A78BFA",
    colorAlpha: "rgba(167,139,250,0.10)",
  },
  {
    n: "5",
    icon: "🏆",
    title: "Compete & Win",
    desc: "Enter case competitions with coaching from AIR 1, AIR 6, AIR 10. Add real wins to your CV before placement season.",
    color: "#F59E0B",
    colorAlpha: "rgba(245,158,11,0.10)",
  },
  {
    n: "6",
    icon: "💼",
    title: "Land the Offer",
    desc: "Placement-verified outcomes. Avg package ₹38L+. Certificate, transcripts, and a track record ready for your dream company.",
    color: "#34D399",
    colorAlpha: "rgba(52,211,153,0.10)",
  },
];

const bottomStats = [
  { val: "₹38L+", label: "Average Package" },
  { val: "98.7%", label: "Placement Rate" },
  { val: "24 hrs", label: "Mentor Match" },
  { val: "500+", label: "Case Comp Winners" },
  { val: "200+", label: "Live Projects Done" },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div className="sec-header">
          <div className="sec-eyebrow">The Process</div>
          <h2 className="sec-h2">From Day 1 to Dream Placement</h2>
          <p className="sec-sub">
            A structured, end-to-end track that takes you from onboarding to offer letter — in 6 steps backed by IIM alumni.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {steps.map((s) => (
            <div
              key={s.n}
              data-reveal
              className="card"
              style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "14px", position: "relative", overflow: "hidden" }}
            >
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", borderRadius: "0 0 0 100px", background: s.colorAlpha, pointerEvents: "none" }} />

              {/* Step num */}
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.colorAlpha, border: `1px solid ${s.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", fontWeight: 900, color: s.color }}>
                {s.n}
              </div>

              {/* Icon */}
              <div style={{ fontSize: "2rem" }}>{s.icon}</div>

              <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text)", margin: 0 }}>{s.title}</h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--muted)", margin: 0 }}>{s.desc}</p>

              {/* Bottom color bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${s.color}, transparent)`, opacity: 0.5 }} />
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          data-reveal
          style={{
            marginTop: "48px",
            padding: "28px 36px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {bottomStats.map((stat, i) => (
            <div key={stat.label} style={{ textAlign: "center", flex: 1, minWidth: "100px", borderLeft: i > 0 ? "1px solid var(--border)" : "none", paddingLeft: i > 0 ? "20px" : 0 }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #F97316, #FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "-0.02em" }}>
                {stat.val}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
