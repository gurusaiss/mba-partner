"use client";

const colleges = [
  { name: "JBIMS Mumbai", programme: "Placement Bootcamp for 80+ students" },
  { name: "IIM Udaipur", programme: "Live Projects + Case Competition cohort" },
  { name: "DSE Delhi", programme: "GDPI Prep + Placement Bootcamp" },
  { name: "IIM Kashipur", programme: "Live Projects — Finance & Consulting" },
  { name: "IIM Raipur", programme: "Placement Bootcamp" },
  { name: "IIM Ranchi", programme: "Case Competition + Placements" },
];

export default function CollegeCollab() {
  return (
    <section id="college-collab" style={{ padding: "96px 0", background: "var(--navy)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">College Collaborations</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
            MBA Partner × Your Campus
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "600px" }}>
            We partner directly with B-schools to bring our placement intelligence, live projects, and case competition coaching to entire cohorts.
          </p>
        </div>

        {/* College Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
          {colleges.map((c, i) => (
            <div key={i} className="card" style={{ padding: "24px" }}>
              <div className="serif" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "8px" }}>
                {c.name}
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.55, marginBottom: "16px" }}>
                {c.programme}
              </p>
              <span className="tag-green" style={{ fontSize: "0.68rem" }}>Collaborated</span>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "16px", padding: "48px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h3 className="serif" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
            Want MBA Partner at Your Campus?
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: "580px", marginBottom: "32px", lineHeight: 1.7 }}>
            Get our complete suite — Live Projects, Placement Bootcamp, Case Competition coaching — delivered to your entire cohort. Bulk pricing available.
          </p>

          {/* Contact info */}
          <div style={{ display: "flex", gap: "32px", justifyContent: "center", marginBottom: "32px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>📞</span>
              <a href="tel:+917042732092" style={{ color: "var(--text)", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
                +91 70427 32092
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.2rem" }}>✉️</span>
              <a href="mailto:bharat.kapoor@prodmarkconsulting.in" style={{ color: "var(--text)", fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}>
                bharat.kapoor@prodmarkconsulting.in
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="tel:+917042732092"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", border: "none", borderRadius: "8px", padding: "12px 28px", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", display: "inline-block" }}
            >
              Call Now
            </a>
            <a
              href="mailto:bharat.kapoor@prodmarkconsulting.in"
              className="btn-secondary"
              style={{ display: "inline-block", padding: "12px 28px", fontSize: "0.95rem" }}
            >
              Send Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
