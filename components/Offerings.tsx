"use client";

const offerings = [
  {
    num: "01",
    badge: "badge-gold",
    tag: "Live Projects",
    title: "Real-World Live Projects",
    desc: "Work on actual consulting, marketing, finance, and strategy projects with live companies. Build your CV with outcomes that interviewers notice — not just coursework.",
    points: ["10+ domain tracks", "Certificate of completion", "CV-worthy deliverables"],
    accent: "rgba(201,168,76,0.06)",
    accentBorder: "rgba(201,168,76,0.25)",
  },
  {
    num: "02",
    badge: "badge-blue",
    tag: "Placements Prep",
    title: "SIP & Final Placement Prep",
    desc: "End-to-end preparation from CV to final offer. Our IIM alumni have coached 2,000+ students into McKinsey, Goldman Sachs, HUL, Amazon, BCG, and Deloitte.",
    points: ["CV optimisation & review", "Mock interviews", "Domain-specific coaching"],
    accent: "rgba(59,130,246,0.06)",
    accentBorder: "rgba(59,130,246,0.2)",
  },
  {
    num: "03",
    badge: "badge-green",
    tag: "Case Competitions",
    title: "Case Competition Mastery",
    desc: "Win national and international competitions with proven frameworks, a 500+ case library, and 1:1 coaching from past winners at IIMs, XLRI, and FMS.",
    points: ["500+ case library", "BCG / McKinsey frameworks", "National competition calendar"],
    accent: "rgba(34,197,94,0.06)",
    accentBorder: "rgba(34,197,94,0.2)",
  },
  {
    num: "04",
    badge: "badge-rose",
    tag: "Repositories",
    title: "MBA Resource Repository",
    desc: "A curated library of past placement data, study compendiums, solved case decks, interview transcripts, and domain knowledge bases built over 5+ years.",
    points: ["50+ CV templates", "300+ interview transcripts", "5 yrs placement data"],
    accent: "rgba(244,63,94,0.06)",
    accentBorder: "rgba(244,63,94,0.2)",
  },
  {
    num: "05",
    badge: "badge-indigo",
    tag: "Mentorship",
    title: "1 : 1 IIM Alumni Mentorship",
    desc: "Matched within 24 hours to an IIM alumni mentor aligned to your domain and career goals. Honest, personalised advice from people who've cracked the same placements.",
    points: ["IIM A / B / C / L alumni", "Personalised sessions", "Ongoing support"],
    accent: "rgba(99,102,241,0.06)",
    accentBorder: "rgba(99,102,241,0.2)",
  },
  {
    num: "06",
    badge: "badge-gold",
    tag: "CV & Profile",
    title: "Profile & CV Building",
    desc: "Committee PORs and graduation internships are no longer enough. We build standout profiles with precision — right keywords, impact statements, and story that gets shortlisted.",
    points: ["ATS-optimised CVs", "LinkedIn overhaul", "Personal brand strategy"],
    accent: "rgba(201,168,76,0.06)",
    accentBorder: "rgba(201,168,76,0.2)",
  },
];

export default function Offerings() {
  return (
    <section id="offerings" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Our Offerings</span>
            </div>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text)" }}>
              Everything a Serious<br />
              <span className="text-gold-gradient">MBA Student Needs</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            A complete ecosystem — from day one at B-school through to your dream placement offer.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((o) => (
            <div key={o.num} className="feature-card rounded-2xl p-8 relative overflow-hidden group">
              {/* Accent bg on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{ background: o.accent, border: `1px solid ${o.accentBorder}` }} />

              <div className="relative z-10">
                {/* Number + badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-5xl select-none" style={{ color: "rgba(255,255,255,0.05)", lineHeight: 1 }}>
                    {o.num}
                  </span>
                  <span className={`${o.badge} px-3 py-1 rounded-full`}>{o.tag}</span>
                </div>

                <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text)" }}>{o.title}</h3>
                <p className="leading-relaxed mb-6" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{o.desc}</p>

                {/* Points */}
                <ul className="space-y-2 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {o.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.7rem" }}>◆</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
