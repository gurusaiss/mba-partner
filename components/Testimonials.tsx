"use client";

const testimonials = [
  { initials: "AK", name: "Aditya Kumar", college: "IIM Indore · Batch 2024", placed: "McKinsey & Company", role: "Business Analyst — SIP", quote: "The mock PI sessions were exactly like the real thing. The feedback was specific, direct, and actionable. I walked into McKinsey confident — and it showed.", tag: "tag-green" },
  { initials: "SR", name: "Shreya Rao", college: "IIM Calcutta · Batch 2024", placed: "Goldman Sachs", role: "Finance Analyst — SIP", quote: "I had a generic CV until MBA Partner rebuilt it from scratch. Three cold rejections turned into two shortlists. The domain coaching made the difference.", tag: "tag-blue" },
  { initials: "VP", name: "Vikram Patel", college: "IIM Bangalore · Batch 2023", placed: "Bain & Company", role: "Associate Consultant", quote: "Placed at Bain in final placements. The case competition prep gave me the structured thinking they were testing for. Easily the best investment of my MBA.", tag: "tag" },
  { initials: "MP", name: "Meghna Pillai", college: "IIM Ahmedabad · Batch 2023", placed: "HUL — Marketing", role: "Brand Manager", quote: "The live marketing project gave me something concrete to talk about in every interview. Not a certification — a real deliverable I owned end-to-end.", tag: "tag-rose" },
  { initials: "RS", name: "Rohan Singh", college: "IIM Lucknow · Batch 2024", placed: "Amazon", role: "Operations Manager — SIP", quote: "Seven mock GDs changed how I participate in group discussions. I used to just add to the conversation — now I structure and lead it.", tag: "tag-indigo" },
  { initials: "DG", name: "Diya Gupta", college: "MDI Gurgaon · Batch 2024", placed: "BCG", role: "Business Analyst — SIP", quote: "AIR 1 coaching for case competitions is no joke. The frameworks are crisp, the practice is intense. I won two inter-college competitions before placement season.", tag: "tag-green" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">700+ Verified Reviews</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
            From Students<br />Who Made It
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {testimonials.map(t => (
            <div key={t.name} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0, background: "var(--card2)", border: "1px solid var(--border)", color: "var(--gold)" }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text)" }}>{t.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>{t.college}</div>
                </div>
              </div>
              <blockquote style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--muted)", flex: 1, marginBottom: "20px" }}>
                "{t.quote}"
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                <span className={`tag ${t.tag}`} style={{ fontSize: "0.65rem" }}>{t.placed}</span>
                <span style={{ fontSize: "0.78rem", color: "var(--dim)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
