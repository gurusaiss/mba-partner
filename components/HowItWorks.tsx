"use client";

const steps = [
  {
    n: "01",
    icon: "🎯",
    title: "Choose Your Track",
    desc: "Pick from Placement Bootcamp, Case Competitions, Live Projects, or a combo. Transparent pricing — no hidden fees.",
    color: "#F97316",
    colorAlpha: "rgba(249,115,22,0.12)",
  },
  {
    n: "02",
    icon: "⚡",
    title: "Onboard in 24 hrs",
    desc: "Get matched to your IIM alumni mentor aligned to your domain and target companies. Receive your full resource pack.",
    color: "#3B82F6",
    colorAlpha: "rgba(59,130,246,0.12)",
  },
  {
    n: "03",
    icon: "📋",
    title: "Build Your Profile",
    desc: "CV reviews, Live Projects, and Case Competition coaching. Real deliverables — not passive video watching.",
    color: "#10B981",
    colorAlpha: "rgba(16,185,129,0.12)",
  },
  {
    n: "04",
    icon: "🎤",
    title: "Mock & Prepare",
    desc: "Mock PIs, Mock GDs, domain prep sessions, psychometric assessments, and company-specific interview transcripts.",
    color: "#60A5FA",
    colorAlpha: "rgba(96,165,250,0.12)",
  },
  {
    n: "05",
    icon: "🏆",
    title: "Compete & Win",
    desc: "Enter case competitions with coaching from AIR 1, AIR 6, AIR 10. Add real wins to your CV before placement season.",
    color: "#F59E0B",
    colorAlpha: "rgba(245,158,11,0.12)",
  },
  {
    n: "06",
    icon: "💼",
    title: "Land the Offer",
    desc: "Placement-verified outcomes. Avg package ₹38L+. Certificate, transcripts, and a track record ready for your dream company.",
    color: "#34D399",
    colorAlpha: "rgba(52,211,153,0.12)",
  },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-label">The Process</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "14px" }}>
            Your MBA Career Roadmap
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--muted)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
            From enrollment to offer letter — 6 steps backed by IIM alumni who have done it themselves.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {steps.map((s) => (
            <div
              key={s.n}
              className="card"
              style={{
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `var(--shadow-xl), 0 0 0 1px ${s.color}33`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div style={{
                position: "absolute",
                top: 0, right: 0,
                width: "120px", height: "120px",
                borderRadius: "0 0 0 120px",
                background: s.colorAlpha,
                pointerEvents: "none",
              }} />

              <div style={{
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: s.color,
                opacity: 0.7,
              }}>Step {s.n}</div>

              <div style={{
                width: "52px", height: "52px",
                borderRadius: "14px",
                background: s.colorAlpha,
                border: `1px solid ${s.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem",
              }}>{s.icon}</div>

              <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: "var(--text)", margin: 0 }}>{s.title}</h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "var(--muted)", margin: 0 }}>{s.desc}</p>

              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${s.color}, transparent)`,
                opacity: 0.5,
              }} />
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "48px",
          padding: "32px 40px",
          background: "var(--card2)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}>
          {[
            { val: "₹38L+", label: "Average Package" },
            { val: "98.7%", label: "Placement Rate" },
            { val: "24 hrs", label: "Mentor Match" },
            { val: "500+", label: "Case Comp Winners" },
            { val: "200+", label: "Live Projects Done" },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: "center", flex: 1, minWidth: "120px" }}>
              <div className="stat-num" style={{ fontSize: "2rem", color: "var(--text)" }}>{stat.val}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "4px" }}>{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
