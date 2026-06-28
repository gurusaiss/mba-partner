"use client";

const cornerColorMap: Record<string, string> = {
  "tag": "rgba(212,170,82,0.08)",
  "tag-blue": "rgba(96,165,250,0.08)",
  "tag-green": "rgba(74,222,128,0.08)",
  "tag-rose": "rgba(251,113,133,0.08)",
  "tag-indigo": "rgba(165,180,252,0.08)",
};

const items = [
  { tag: "tag", label: "Live Projects", title: "Real-World Live Projects", desc: "Work on actual consulting, marketing, finance, and operations projects. Build tangible CV deliverables — not just coursework.", points: ["6 domain tracks available", "Certificate of completion", "2-month engagement"] },
  { tag: "tag-blue", label: "Placements", title: "SIP & Final Placement Prep", desc: "End-to-end preparation from CV to offer. Mock PIs, mock GDs, domain coaching, and 300+ interview transcripts from placed students.", points: ["5 CV review slots", "7 Mock PIs + 7 Mock GDs", "Domain-specific coaching"] },
  { tag: "tag-green", label: "Case Competitions", title: "Case Competition Mastery", desc: "Coached by AIR 1. Proven frameworks, 30+ winning PPTs, Canva Premium access, and a live national competition calendar.", points: ["4 live sessions x 2 hrs", "30+ winning case PPTs", "Canva Premium — 1 year"] },
  { tag: "tag-rose", label: "Repositories", title: "MBA Resource Repository", desc: "Five years of placement intelligence in one place — CV templates, study compendiums, solved case decks, and placement data.", points: ["50+ ATS-optimised CV templates", "300+ interview transcripts", "5 yrs placement data"] },
  { tag: "tag-indigo", label: "Mentorship", title: "1:1 IIM Alumni Mentorship", desc: "Matched within 24 hours to an IIM alumni mentor aligned to your domain, target companies, and B-school.", points: ["IIM A / B / C / L alumni", "Matched in 24 hours", "Fully personalised sessions"] },
  { tag: "tag", label: "CV & Profile", title: "Profile & CV Building", desc: "Committee PORs and graduation internships are no longer enough. We craft profiles that get shortlisted — precise keywords, impact, story.", points: ["ATS-optimised CVs", "LinkedIn strategy", "Personal brand narrative"] },
];

export default function Offerings() {
  return (
    <section id="offerings" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">Our Offerings</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Everything a Serious MBA<br />Student Needs to Win
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {items.map((item) => (
            <div key={item.title} className="card" style={{ padding: "32px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: `radial-gradient(circle at 100% 0%, ${cornerColorMap[item.tag] ?? "rgba(212,170,82,0.08)"}, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <span className={`tag ${item.tag}`} style={{ marginBottom: "20px", alignSelf: "flex-start" }}>{item.label}</span>
              <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.08rem", color: "var(--text)", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "24px", flex: 1 }}>{item.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)", paddingTop: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {item.points.map(p => <li key={p} className="check-item">{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
