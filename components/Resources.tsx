"use client";

const resources = [
  {
    icon: "📄",
    title: "CV Template Library",
    count: "50+ templates",
    desc: "ATS-optimised, domain-specific CV templates actively used by students who have been placed at McKinsey, HUL, Goldman, and Amazon.",
    tag: "CV & Profile",
    badge: "badge-gold",
  },
  {
    icon: "📚",
    title: "Study Compendiums",
    count: "20+ volumes",
    desc: "Curated knowledge books covering Finance, Marketing, Consulting, and Operations — built by our alumni network over five years.",
    tag: "Study Material",
    badge: "badge-blue",
  },
  {
    icon: "📊",
    title: "Case Deck Library",
    count: "500+ cases",
    desc: "Solved case decks from BCG, McKinsey, Bain, and national competitions — structured by industry, type, and difficulty.",
    tag: "Case Competitions",
    badge: "badge-green",
  },
  {
    icon: "💬",
    title: "Interview Transcripts",
    count: "300+ transcripts",
    desc: "Verbatim interview Q&A from students placed at McKinsey, Goldman Sachs, Amazon, HUL, BCG, and Deloitte — spanning the last five placement seasons.",
    tag: "Placements",
    badge: "badge-rose",
  },
  {
    icon: "🏢",
    title: "Live Project Portal",
    count: "Active listings",
    desc: "Real-time project listings across consulting, finance, marketing, and operations domains — updated each semester.",
    tag: "Live Projects",
    badge: "badge-indigo",
  },
  {
    icon: "📈",
    title: "Placement Data Reports",
    count: "5 years of data",
    desc: "Historical placement data, sector-wise salary benchmarks, and domain trend analysis across India's top ten B-schools.",
    tag: "Analytics",
    badge: "badge-green",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Resource Hub</span>
            </div>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text)" }}>
              Five Years of MBA Intelligence<br />
              <span className="text-gold-gradient">At Your Fingertips</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            A repository built methodically over five placement seasons — every resource curated for actual relevance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div key={r.title} className="feature-card rounded-2xl p-7 group">
              <div className="flex items-start justify-between mb-5">
                <div className="text-3xl">{r.icon}</div>
                <span className={`${r.badge} px-3 py-1 rounded-full`}>{r.tag}</span>
              </div>

              <h3 className="font-display font-bold text-xl mb-1" style={{ color: "var(--text)" }}>{r.title}</h3>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--gold)" }}>{r.count}</p>
              <p className="leading-relaxed" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{r.desc}</p>

              <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <button className="btn-outline-gold w-full py-2.5 rounded-xl text-sm font-semibold tracking-wide">
                  Access →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
