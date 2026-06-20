"use client";

const steps = [
  { n: "01", title: "Choose Your Track", desc: "Pick from Placements Bootcamp, Case Competitions, Live Projects, or a combo. All packages clearly priced — no hidden fees." },
  { n: "02", title: "Onboard in 24 hrs", desc: "Get matched to your cohort, receive your resource pack, and meet your IIM alumni point of contact within one business day." },
  { n: "03", title: "Learn by Doing", desc: "Live sessions, mock interviews, real project deliverables. You do actual work — not watch videos. Every week has structured milestones." },
  { n: "04", title: "Land Your Goal", desc: "Certificate, strengthened CV, recorded mock sessions, and a placement-verified track record ready for SIP or final placements." },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "96px 0", background: "var(--card)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">The Process</div>
          <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
            How It Works
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {steps.map((s) => (
            <div key={s.n} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="serif" style={{ fontWeight: 900, fontSize: "2.6rem", lineHeight: 1, color: "rgba(201,168,76,0.18)" }}>{s.n}</div>
              <h3 className="serif" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{s.title}</h3>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
