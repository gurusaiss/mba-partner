"use client";

const resources = [
  { icon: "📄", tag: "tag-blue", tagLabel: "CV Bank", title: "50+ ATS CV Templates", desc: "Domain-specific, ATS-optimised templates used by placed students from IIM A, B, C, L. Includes consulting, finance, marketing, and HR formats.", count: "50+ templates" },
  { icon: "🎤", tag: "tag-green", tagLabel: "Interview Intel", title: "300+ Interview Transcripts", desc: "Real PI transcripts from McKinsey, Goldman, HUL, Amazon, BCG, and 40+ more companies. Word-for-word — what was asked and what worked.", count: "300+ transcripts" },
  { icon: "📊", tag: "tag", tagLabel: "Placement Data", title: "5-Year Placement Data", desc: "Salary trends, shortlist ratios, domain-wise data, and company-wise selection patterns from 2019–2024. Know where to focus your prep.", count: "5 years of data" },
  { icon: "📚", tag: "tag-rose", tagLabel: "Study Material", title: "Case Study Compendium", desc: "30+ annotated winning case decks from national-level competitions. Structured by industry, framework, and judging criteria.", count: "30+ case decks" },
  { icon: "🏆", tag: "tag-indigo", tagLabel: "Competition Tracker", title: "Competition Calendar", desc: "Live national MBA case competition calendar with deadlines, format, and past winner approaches. Never miss a competition that matters.", count: "Updated weekly" },
  { icon: "🔗", tag: "tag", tagLabel: "LinkedIn", title: "LinkedIn Strategy Guide", desc: "Profile optimisation playbook, content strategy, and outreach templates used by placed students. 10× profile views, documented.", count: "Full guide" },
];

export default function Resources() {
  return (
    <section id="resources" className="py-24" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <div className="section-label">Resource Repository</div>
          <h2 className="section-title mb-3" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            5 Years of Placement<br />Intelligence in One Place
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
            Every resource is curated by alumni who went through the exact same process. Nothing generic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map(r => (
            <div key={r.title} className="card p-7 flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <span className={`tag ${r.tag}`}>{r.tagLabel}</span>
                <span className="text-2xl">{r.icon}</span>
              </div>
              <h3 className="serif font-bold text-base mb-3" style={{ color: "var(--text)" }}>{r.title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--muted)" }}>{r.desc}</p>
              <div className="text-xs font-semibold pt-4" style={{ borderTop: "1px solid var(--border)", color: "var(--gold)" }}>
                {r.count}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#enroll" className="btn-primary">Access the Repository</a>
        </div>
      </div>
    </section>
  );
}
