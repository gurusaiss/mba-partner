"use client";

const steps = [
  { n: "01", title: "Choose Your Track", desc: "Pick from Placements Bootcamp, Case Competitions, Live Projects, or a combo. All packages clearly priced — no hidden fees." },
  { n: "02", title: "Onboard in 24 hrs", desc: "Get matched to your cohort, receive your resource pack, and meet your IIM alumni point of contact within one business day." },
  { n: "03", title: "Learn by Doing", desc: "Live sessions, mock interviews, real project deliverables. You do actual work — not watch videos. Every week has structured milestones." },
  { n: "04", title: "Land Your Goal", desc: "Certificate, strengthened CV, recorded mock sessions, and a placement-verified track record ready for SIP or final placements." },
];

export default function HowItWorks() {
  return (
    <section className="py-24" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <div className="section-label">The Process</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="card p-7 flex flex-col gap-4">
              <div className="serif font-black" style={{ fontSize: "2.8rem", lineHeight: 1, color: "rgba(201,168,76,0.2)" }}>{s.n}</div>
              <h3 className="serif font-bold text-base" style={{ color: "var(--text)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
