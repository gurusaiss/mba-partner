"use client";

const steps = [
  {
    step: "01",
    title: "Enroll & Onboard",
    desc: "Choose your program and gain instant access to your personalised dashboard, the full resource library, and both community channels.",
  },
  {
    step: "02",
    title: "Matched with a Mentor",
    desc: "Within 24 hours you are matched with an IIM alumni mentor aligned to your domain, target companies, and B-school.",
  },
  {
    step: "03",
    title: "Build Your Profile",
    desc: "Take on live projects, compete in case competitions, sharpen your CV, and complete structured mock interview sessions.",
  },
  {
    step: "04",
    title: "Secure Your Placement",
    desc: "Enter SIP and Final Placement season with a standout profile, a mentor-backed strategy, and the confidence that comes from real preparation.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="badge-gold px-3 py-1 rounded-full tracking-widest">The Process</span>
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>
          <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
            Enrolment to Placement —<br />
            <span className="text-gold-gradient">Four Focused Steps</span>
          </h2>
          <p className="text-lg" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            A proven system that has guided 2,000+ MBA students to their target roles.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 20%, rgba(201,168,76,0.3) 80%, transparent)" }} />

          {steps.map((s, i) => (
            <div key={s.step} className="feature-card rounded-2xl p-8 relative">
              {/* Step dot */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 font-bold text-sm relative z-10"
                style={{ background: "var(--navy)", border: "2px solid var(--gold)", color: "var(--gold)" }}>
                {i + 1}
              </div>

              {/* Large ghost number */}
              <div className="absolute top-4 right-6 font-display font-black select-none pointer-events-none"
                style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(201,168,76,0.06)" }}>
                {s.step}
              </div>

              <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--text)" }}>{s.title}</h3>
              <p className="leading-relaxed" style={{ color: "var(--muted)", fontSize: "0.95rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
