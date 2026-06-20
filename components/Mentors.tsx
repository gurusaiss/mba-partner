"use client";

const mentors = [
  { initials: "AM", name: "Arjun Mehta", school: "IIM Ahmedabad", company: "Ex-McKinsey & Company", domain: "Consulting", bg: "rgba(201,168,76,0.12)", color: "var(--gold)" },
  { initials: "PS", name: "Priya Sharma", school: "IIM Bangalore", company: "Ex-Goldman Sachs", domain: "Finance", bg: "rgba(96,165,250,0.1)", color: "#93C5FD" },
  { initials: "RV", name: "Rahul Verma", school: "IIM Calcutta", company: "Ex-Bain & Company", domain: "Strategy", bg: "rgba(74,222,128,0.1)", color: "#86EFAC" },
  { initials: "NK", name: "Neha Kapoor", school: "IIM Lucknow", company: "Ex-HUL Marketing", domain: "Marketing", bg: "rgba(251,113,133,0.1)", color: "#FCA5A5" },
  { initials: "SK", name: "Siddharth Kumar", school: "IIM Kozhikode", company: "Ex-Amazon Operations", domain: "Operations", bg: "rgba(165,180,252,0.1)", color: "#C4B5FD" },
  { initials: "DM", name: "Divya Mishra", school: "IIM Indore", company: "Ex-Google PM", domain: "Product", bg: "rgba(201,168,76,0.12)", color: "var(--gold)" },
];

export default function Mentors() {
  return (
    <section id="mentors" style={{ padding: "96px 0", background: "var(--card)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">IIM Alumni Network</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
            Learn From People<br />Who Have Been There
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Every mentor is a verified IIM alumnus placed at a top-tier firm. Matched to your domain in 24 hours.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {mentors.map(m => (
            <div key={m.name} className="card" style={{ padding: "24px", display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, background: m.bg, color: m.color, border: `1px solid ${m.color}33` }}>
                {m.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)", marginBottom: "2px" }}>{m.name}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--gold)", marginBottom: "4px" }}>{m.school}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "12px" }}>{m.company}</div>
                <span className="tag" style={{ fontSize: "0.65rem" }}>{m.domain}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "20px" }}>Network spans IIM A, B, C, L, K, I + 15 other premier B-schools</p>
          <a href="#enroll" className="btn-primary">Get Matched to a Mentor</a>
        </div>
      </div>
    </section>
  );
}
