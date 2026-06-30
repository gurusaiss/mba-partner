"use client";

const resources = [
  { icon: "📄", tag: "tag-blue", tagLabel: "CV Bank", title: "50+ ATS CV Templates", desc: "Domain-specific, ATS-optimised templates used by placed students from IIM A, B, C, L. Consulting, finance, marketing, and HR formats.", count: "50+ templates", href: "https://drive.google.com/drive/folders/18bj7C4I4Ro1DcOBfzF6xrEhNI7SmEZe2" },
  { icon: "🎤", tag: "tag-green", tagLabel: "Interview Intel", title: "300+ Interview Transcripts", desc: "Real PI transcripts from McKinsey, Goldman, HUL, Amazon, BCG, and 40+ more companies. Word-for-word — what was asked and what worked.", count: "300+ transcripts", href: "#enroll" },
  { icon: "📊", tag: "tag", tagLabel: "Placement Data", title: "5-Year Placement Data", desc: "Salary trends, shortlist ratios, domain-wise data, and company-wise selection patterns from 2019-2024. Know where to focus your prep.", count: "5 years of data", href: "#enroll" },
  { icon: "📚", tag: "tag-rose", tagLabel: "Study Material", title: "Case Study Compendium", desc: "30+ annotated winning case decks from national-level competitions. Structured by industry, framework, and judging criteria.", count: "30+ case decks", href: "https://drive.google.com/drive/folders/1Ir9BWGjYgYsLJwneq9WoTI6dbDezXS_H" },
  { icon: "🏆", tag: "tag-indigo", tagLabel: "Competition Tracker", title: "Competition Calendar", desc: "Live national MBA case competition calendar with deadlines, format, and past winner approaches. Never miss a competition that matters.", count: "Updated weekly", href: "#enroll" },
  { icon: "🔗", tag: "tag", tagLabel: "LinkedIn", title: "LinkedIn Strategy Guide", desc: "Profile optimisation playbook, content strategy, and outreach templates used by placed students. 10x profile views, documented.", count: "Full guide", href: "#enroll" },
];

export default function Resources() {
  return (
    <section id="resources" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--card) 0%, var(--navy) 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        <div className="sec-header">
          <div className="sec-eyebrow">Resource Repository</div>
          <h2 className="sec-h2">5 Years of Placement Intelligence in One Place</h2>
          <p className="sec-sub">Every resource is curated by alumni who went through the exact same process. Nothing generic.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {resources.map(r => (
            <div key={r.title} className="card res-card" data-reveal>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <span className={`tag ${r.tag}`}>{r.tagLabel}</span>
                <span style={{ fontSize: "1.5rem" }}>{r.icon}</span>
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "var(--text)", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>{r.title}</h3>
                <p className="res-body">{r.desc}</p>
              </div>
              <a href={r.href} className="res-link" target={r.href.startsWith("http") ? "_blank" : "_self"} rel="noreferrer">
                {r.count} →
              </a>
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
