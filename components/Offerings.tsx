"use client";

const items = [
  { tag: "tag", label: "Live Projects", title: "Real-World Live Projects", desc: "Work on actual consulting, marketing, finance, and operations projects. Build tangible CV deliverables — not just coursework.", points: ["6 domain tracks available", "Certificate of completion", "2-month engagement"] },
  { tag: "tag-blue", label: "Placements", title: "SIP & Final Placement Prep", desc: "End-to-end preparation from CV to offer. Mock PIs, mock GDs, domain coaching, and 300+ interview transcripts from placed students.", points: ["5 CV review slots", "7 Mock PIs + 7 Mock GDs", "Domain-specific coaching"] },
  { tag: "tag-green", label: "Case Competitions", title: "Case Competition Mastery", desc: "Coached by AIR 1. Proven frameworks, 30+ winning PPTs, Canva Premium access, and a live national competition calendar.", points: ["4 live sessions × 2 hrs", "30+ winning case PPTs", "Canva Premium — 1 year"] },
  { tag: "tag-rose", label: "Repositories", title: "MBA Resource Repository", desc: "Five years of placement intelligence in one place — CV templates, study compendiums, solved case decks, and placement data.", points: ["50+ ATS-optimised CV templates", "300+ interview transcripts", "5 yrs placement data"] },
  { tag: "tag-indigo", label: "Mentorship", title: "1:1 IIM Alumni Mentorship", desc: "Matched within 24 hours to an IIM alumni mentor aligned to your domain, target companies, and B-school.", points: ["IIM A / B / C / L alumni", "Matched in 24 hours", "Fully personalised sessions"] },
  { tag: "tag", label: "CV & Profile", title: "Profile & CV Building", desc: "Committee PORs and graduation internships are no longer enough. We craft profiles that get shortlisted — precise keywords, impact, story.", points: ["ATS-optimised CVs", "LinkedIn strategy", "Personal brand narrative"] },
];

export default function Offerings() {
  return (
    <section id="offerings" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <div className="section-label">Our Offerings</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            Everything a Serious MBA<br />Student Needs to Win
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.title} className="card p-7 flex flex-col">
              <span className={`tag ${item.tag} mb-5`}>{item.label}</span>
              <h3 className="serif font-bold text-lg mb-3" style={{ color: "var(--text)" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--muted)" }}>{item.desc}</p>
              <ul className="space-y-2 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                {item.points.map(p => (
                  <li key={p} className="check-item">{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
