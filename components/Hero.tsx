"use client";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "5,000+", label: "Student Network" },
  { value: "9.6/10", label: "Average Rating" },
  { value: "98.7%", label: "Placement Rate" },
  { value: "700+", label: "Verified Reviews" },
];

const highlights = [
  { icon: "🎯", text: "Live Projects across 6 domains" },
  { icon: "🏆", text: "Case Competition coaching by AIR 1" },
  { icon: "💼", text: "SIP & Final Placement Bootcamp" },
  { icon: "📚", text: "5-year Placement Intelligence Repository" },
];

export default function Hero() {
  return (
    <section id="home" style={{
      backgroundImage: `
        radial-gradient(ellipse 85% 65% at 50% -5%, rgba(212,170,82,0.10) 0%, transparent 65%),
        radial-gradient(ellipse 45% 50% at 85% 60%, rgba(99,102,241,0.06) 0%, transparent 55%),
        linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px),
        var(--navy)
      `,
      backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px, 100% 100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      paddingTop: "72px",
    }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "64px 40px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

          <div>
            <div className="section-label" style={{ marginBottom: "24px" }}>Founded by IIM Alumni</div>

            <h1 className="serif" style={{
              fontSize: "clamp(2.4rem, 3.8vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: "20px",
            }}>
              The Mentorship Platform<br />
              <span style={{ background: "linear-gradient(130deg, #EDD47A 0%, #D4AA52 40%, #C09038 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Serious MBA Students</span><br />
              Rely On.
            </h1>

            <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "36px", maxWidth: "420px" }}>
              Live Projects. Case Competitions. Placement Prep. A curated Resource Repository.
              All delivered by IIM alumni who have been exactly where you are.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
              <a href="#courses" className="btn-primary pulse" data-animate="pulse">View Courses <ArrowRight size={15} /></a>
              <a href="#enroll" className="btn-secondary">Free Enquiry</a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {highlights.map(h => (
                <div key={h.text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.1rem" }}>{h.icon}</span>
                  <span style={{ fontSize: "0.95rem", color: "var(--muted)" }}>{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px",
              background: "var(--border)", borderRadius: "16px", overflow: "hidden",
              border: "1px solid rgba(212,170,82,0.12)",
              boxShadow: "0 0 40px rgba(212,170,82,0.04), inset 0 1px 0 rgba(212,170,82,0.05)",
            }}>
              {stats.map(s => (
                <div key={s.label} style={{
                  background: "linear-gradient(160deg, #0E1D38 0%, #0B1628 100%)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "6px",
                }}>
                  <div className="stat-num" style={{ fontSize: "2.3rem", borderBottom: "2px solid var(--gold)", paddingBottom: "6px" }}>{s.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.04em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--gold)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                Students placed at
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["McKinsey", "Goldman Sachs", "BCG", "Bain", "HUL", "Amazon", "Deloitte", "EY", "TAS", "Kearney", "L'Oreal"].map(c => (
                  <span key={c} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.11)", borderRadius: "6px", padding: "4px 10px", fontSize: "0.78rem", color: "var(--text)", fontWeight: 500 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
