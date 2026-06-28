"use client";

const resources = [
  { icon: "📄", tag: "tag-blue", tagLabel: "CV Bank", title: "50+ ATS CV Templates", desc: "Domain-specific, ATS-optimised templates used by placed students from IIM A, B, C, L. Consulting, finance, marketing, and HR formats.", count: "50+ templates" },
  { icon: "🎤", tag: "tag-green", tagLabel: "Interview Intel", title: "300+ Interview Transcripts", desc: "Real PI transcripts from McKinsey, Goldman, HUL, Amazon, BCG, and 40+ more companies. Word-for-word — what was asked and what worked.", count: "300+ transcripts" },
  { icon: "📊", tag: "tag", tagLabel: "Placement Data", title: "5-Year Placement Data", desc: "Salary trends, shortlist ratios, domain-wise data, and company-wise selection patterns from 2019-2024. Know where to focus your prep.", count: "5 years of data" },
  { icon: "📚", tag: "tag-rose", tagLabel: "Study Material", title: "Case Study Compendium", desc: "30+ annotated winning case decks from national-level competitions. Structured by industry, framework, and judging criteria.", count: "30+ case decks" },
  { icon: "🏆", tag: "tag-indigo", tagLabel: "Competition Tracker", title: "Competition Calendar", desc: "Live national MBA case competition calendar with deadlines, format, and past winner approaches. Never miss a competition that matters.", count: "Updated weekly" },
  { icon: "🔗", tag: "tag", tagLabel: "LinkedIn", title: "LinkedIn Strategy Guide", desc: "Profile optimisation playbook, content strategy, and outreach templates used by placed students. 10x profile views, documented.", count: "Full guide" },
];

export default function Resources() {
  return (
    <section id="resources" style={{ padding: "96px 0", background: "var(--card)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">Resource Repository</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
            5 Years of Placement<br />Intelligence in One Place
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Every resource is curated by alumni who went through the exact same process. Nothing generic.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {resources.map(r => (
            <div key={r.title} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <span className={`tag ${r.tag}`}>{r.tagLabel}</span>
                <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
              </div>
              <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "10px" }}>{r.title}</h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", flex: 1, marginBottom: "20px" }}>{r.desc}</p>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, paddingTop: "16px", borderTop: "1px solid var(--border)", color: "var(--gold)" }}>
                {r.count}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <a href="#enroll" className="btn-primary">Access the Repository</a>
        </div>
      </div>
    </section>
  );
}
