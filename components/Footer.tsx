"use client";

const links = {
  Platform: [
    { label: "Live Projects", href: "#offerings" },
    { label: "Placements Prep", href: "#offerings" },
    { label: "Case Competitions", href: "#offerings" },
    { label: "Resource Repository", href: "#resources" },
  ],
  Courses: [
    { label: "Placement Bootcamp", href: "#courses" },
    { label: "Case Comp Bootcamp", href: "#courses" },
    { label: "Live Projects", href: "#courses" },
    { label: "All-in-One Combos", href: "#courses" },
  ],
  Company: [
    { label: "About Us", href: "#offerings" },
    { label: "Mentors", href: "#mentors" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#enroll" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ padding: "64px 0 40px", background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px" }}>

          <div>
            <a href="#home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
              <span className="btn-primary" style={{ width: "34px", height: "34px", padding: 0, borderRadius: "8px", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>MP</span>
              <span className="serif" style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>MBA<span className="gold-text">Partner</span></span>
            </a>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "20px" }}>
              The mentorship platform serious MBA students rely on. Founded by IIM alumni. Trusted by 5,000+ students.
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Founded by IIM Alumni.<br />Trusted by 5,000+ students across India.</p>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--dim)", marginBottom: "16px" }}>{section}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map(l => (
                  <li key={l.label}>
                    <a href={l.href} style={{ fontSize: "0.9rem", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "24px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--dim)" }}>© 2025 MBA Partner. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <p style={{ fontSize: "0.82rem", color: "var(--dim)" }}>Founded by IIM Alumni · For MBA Students Across India</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                background: "rgba(240,170,0,0.08)",
                border: "1px solid rgba(240,170,0,0.22)",
                borderRadius: "8px",
                color: "var(--gold)",
                fontSize: "0.82rem",
                fontWeight: 600,
                padding: "7px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-sans)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(240,170,0,0.14)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(240,170,0,0.08)")}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
