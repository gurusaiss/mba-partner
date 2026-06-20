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
    <section id="mentors" className="py-24" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <div className="section-label">IIM Alumni Network</div>
          <h2 className="section-title mb-3" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            Learn From People<br />Who Have Been There
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1rem" }}>
            Every mentor is a verified IIM alumnus placed at a top-tier firm. Matched to your domain in 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentors.map(m => (
            <div key={m.name} className="card p-6 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center serif font-bold text-sm flex-shrink-0"
                style={{ background: m.bg, color: m.color, border: `1px solid ${m.color}22` }}>
                {m.initials}
              </div>
              <div>
                <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--text)" }}>{m.name}</div>
                <div className="text-xs mb-1" style={{ color: "var(--gold)" }}>{m.school}</div>
                <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>{m.company}</div>
                <span className="tag" style={{ fontSize: "0.62rem" }}>{m.domain}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
            Network spans IIM A, B, C, L, K, I + 15 other premier B-schools
          </p>
          <a href="#enroll" className="btn-primary">Get Matched to a Mentor</a>
        </div>
      </div>
    </section>
  );
}
