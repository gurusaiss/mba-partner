"use client";
import { ArrowRight, ChevronDown } from "lucide-react";

const stats = [
  { value: "2,000+", label: "Students Mentored" },
  { value: "9.6 / 10", label: "Average Rating" },
  { value: "98.7%", label: "Placement Rate" },
  { value: "500+", label: "Competition Wins" },
];

const institutes = ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "XLRI", "FMS Delhi", "IIM Lucknow"];

export default function Hero() {
  return (
    <section id="home" className="hero-bg grid-bg relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/3 right-0 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-28 pb-20 relative z-10 w-full">

        {/* Top label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: "var(--gold)" }} />
          <span className="badge-gold px-3 py-1 rounded-full tracking-widest">
            Founded by Old IIM Alumni
          </span>
        </div>

        {/* Headline — large editorial */}
        <div className="max-w-4xl mb-8">
          <h1 className="font-display font-black leading-tight mb-6" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", color: "var(--text)" }}>
            The Mentorship Platform{" "}
            <span className="text-gold-gradient">Serious MBA</span>{" "}
            <br className="hidden lg:block" />
            Students Rely On.
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "var(--muted)", fontSize: "1.2rem" }}>
            From Summer Internships to Final Placements — our IIM alumni mentors deliver real outcomes
            through Live Projects, Case Competitions, and personalised one-on-one coaching.
          </p>
        </div>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <a href="#programs" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold pulse-gold">
            Explore Programs <ArrowRight size={18} />
          </a>
          <a href="#testimonials" className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold">
            Read Success Stories
          </a>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border"
          style={{ borderColor: "rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.08)" }}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="px-6 py-7 text-center"
              style={{ background: "var(--navy-card)", borderRight: i < 3 ? "1px solid rgba(201,168,76,0.12)" : "none" }}
            >
              <div className="stat-number font-display font-black mb-1" style={{ fontSize: "2.2rem" }}>{s.value}</div>
              <div className="text-sm font-medium tracking-wide" style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Institute strip */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="text-sm mr-2" style={{ color: "var(--muted2)" }}>Mentors from</span>
          {institutes.map((inst) => (
            <span key={inst} className="glass border-gold px-4 py-1.5 rounded-full text-sm font-medium" style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
              {inst}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <ChevronDown size={20} style={{ color: "var(--gold)" }} className="animate-bounce" />
      </div>
    </section>
  );
}
