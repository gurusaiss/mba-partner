"use client";

const steps = [
  {
    step: "01",
    title: "Enroll & Onboard",
    desc: "Choose your program and get instant access to your personalized dashboard, resource library, and community.",
    icon: "🚀",
  },
  {
    step: "02",
    title: "Match with a Mentor",
    desc: "Get matched with an IIM alumni mentor based on your domain, college, and career goals within 24 hours.",
    icon: "🤝",
  },
  {
    step: "03",
    title: "Build & Compete",
    desc: "Take on live projects, join case competitions, refine your CV, and attend mock interview sessions.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Get Placed",
    desc: "Land your dream SIP or Final Placement with a battle-tested profile, interview prep, and mentor backing.",
    icon: "🏆",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-indigo px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>⚙️</span> How It Works
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            From Enrollment to{" "}
            <span className="text-gold-gradient">Dream Placement</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A proven 4-step system that has transformed 2,000+ MBA careers.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="feature-card rounded-2xl p-6 text-center relative group">
                {/* Step number */}
                <div className="text-6xl font-black text-amber-500/10 absolute top-4 right-4 select-none">{s.step}</div>

                {/* Icon */}
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                  {s.icon}
                </div>

                {/* Step label */}
                <div className="badge-gold text-xs px-2 py-1 rounded-full font-semibold inline-block mb-3">
                  Step {s.step}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
