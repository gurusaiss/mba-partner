"use client";

const mentors = [
  { initials: "AM", name: "Arjun Mehta", title: "IIM Ahmedabad", company: "Ex-McKinsey & Company", domain: "Consulting", students: "240+ mentored", color: "#C9A84C", badge: "badge-gold" },
  { initials: "PS", name: "Priya Sharma", title: "IIM Bangalore", company: "Ex-Goldman Sachs", domain: "Finance", students: "180+ mentored", color: "#60A5FA", badge: "badge-blue" },
  { initials: "RK", name: "Rohit Kapoor", title: "IIM Calcutta", company: "Ex-Hindustan Unilever", domain: "Marketing", students: "320+ mentored", color: "#4ADE80", badge: "badge-green" },
  { initials: "SG", name: "Sneha Gupta", title: "XLRI Jamshedpur", company: "Ex-Amazon", domain: "Operations", students: "150+ mentored", color: "#FDA4AF", badge: "badge-rose" },
  { initials: "VS", name: "Vikram Singh", title: "IIM Lucknow", company: "Ex-Boston Consulting Group", domain: "Strategy", students: "200+ mentored", color: "#A5B4FC", badge: "badge-indigo" },
  { initials: "AB", name: "Ananya Bose", title: "FMS Delhi", company: "Ex-Deloitte", domain: "Analytics", students: "130+ mentored", color: "#86EFAC", badge: "badge-green" },
];

const institutes = ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "XLRI", "FMS Delhi", "IIM Kozhikode", "IIMA"];

export default function Mentors() {
  return (
    <section id="mentors" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Our Mentors</span>
            </div>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text)" }}>
              Learn from People Who<br />
              <span className="text-gold-gradient">Have Been There</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Our mentors are not just alumni — they are practitioners who have cracked the exact placements you are targeting.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {mentors.map((m) => (
            <div key={m.name} className="feature-card rounded-2xl p-7">
              <div className="flex items-start gap-4 mb-5">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-bold text-lg"
                  style={{ background: `${m.color}18`, border: `1.5px solid ${m.color}35`, color: m.color }}>
                  {m.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-lg leading-tight mb-0.5" style={{ color: "var(--text)" }}>{m.name}</div>
                  <div className="text-sm font-medium" style={{ color: "var(--gold)" }}>{m.title}</div>
                  <div className="text-sm" style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{m.company}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <span className={`${m.badge} px-3 py-1 rounded-full`}>{m.domain}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: "var(--muted2)", fontSize: "0.82rem" }}>{m.students}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institute logos */}
        <div className="pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs font-semibold tracking-widest text-center mb-6 uppercase" style={{ color: "var(--muted2)" }}>
            Mentors from
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {institutes.map((inst) => (
              <div key={inst} className="glass border-gold px-5 py-2.5 rounded-lg text-sm font-medium" style={{ color: "var(--muted)" }}>
                {inst}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
