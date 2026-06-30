"use client";

const colleges = [
  { name: "JBIMS Mumbai", programme: "Placement Bootcamp for 80+ students" },
  { name: "IIM Udaipur", programme: "Live Projects + Case Competition cohort" },
  { name: "DSE Delhi", programme: "GDPI Prep + Placement Bootcamp" },
  { name: "IIM Kashipur", programme: "Live Projects — Finance & Consulting" },
  { name: "IIM Raipur", programme: "Placement Bootcamp" },
  { name: "IIM Ranchi", programme: "Case Competition + Placements" },
];

const resultStats = [
  { val: "5,000+", label: "Students mentored" },
  { val: "98.7%", label: "Placed in target domain" },
  { val: "40+", label: "Campuses reached" },
  { val: "MBB · Amazon · Accenture", label: "Among recruiters" },
];

export default function CollegeCollab() {
  return (
    <section id="college-collab" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--card) 0%, var(--navy) 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div className="sec-header">
          <div className="sec-eyebrow">College Collaborations</div>
          <h2 className="sec-h2">Trusted Across India's Top B-Schools</h2>
          <p className="sec-sub">
            Active tie-ups with leading campuses — bringing live projects, mentorship and placement prep to their students.
          </p>
        </div>

        {/* College Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "40px" }}>
          {colleges.map((c, i) => (
            <div key={i} className="card" data-reveal style={{ padding: "24px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(249,115,22,0.10)", border: "1px solid rgba(249,115,22,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "14px" }}>
                🏛️
              </div>
              <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text)", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>
                {c.name}
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.86rem", lineHeight: 1.55, marginBottom: "14px" }}>
                {c.programme}
              </p>
              <span className="tag tag-green" style={{ fontSize: "0.66rem" }}>Collaborated</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          data-reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "32px",
          }}
        >
          {resultStats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "28px 24px",
                borderRight: i < resultStats.length - 1 ? "1px solid var(--border)" : "none",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "var(--font-display)", background: "linear-gradient(135deg, #F97316, #FB923C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "4px" }}>
                {s.val}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div
          data-reveal
          style={{
            background: "linear-gradient(135deg, var(--card2), var(--card))",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, color: "var(--text)", marginBottom: "10px", fontFamily: "var(--font-sans)" }}>
              Want to Bring MBA Partner to Your College?
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: "480px", lineHeight: 1.7 }}>
              Live projects, case-competition prep and placement bootcamps for your campus. Get in touch for current tie-ups and past results.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", flexShrink: 0 }}>
            <a href="tel:+917042732092" className="btn-primary" style={{ gap: "8px" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.86 2 2 0 012 .68h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.49a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              +91 70427 32092
            </a>
            <a href="mailto:bharat.kapoor@prodmarkconsulting.in" className="btn-secondary">
              Email Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
