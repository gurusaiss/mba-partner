"use client";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "5,000+", label: "Student Network" },
  { value: "9.6 / 10", label: "Average Rating" },
  { value: "98.7%", label: "Placement Rate" },
  { value: "700+", label: "Verified Reviews" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-bg grid-lines relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
        <div className="max-w-3xl">

          <div className="section-label">Founded by Old IIM Alumni</div>

          <h1 className="serif font-black mb-6" style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", lineHeight: 1.1 }}>
            The Mentorship Platform<br />
            <span className="gold-text">Serious MBA Students</span><br />
            Rely On.
          </h1>

          <p className="mb-10 max-w-xl" style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1.75 }}>
            Live Projects. Case Competitions. Placement Prep. A curated Resource Repository.
            All delivered by IIM alumni who have been exactly where you are.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="#courses" className="btn-primary pulse">
              View Courses <ArrowRight size={16} />
            </a>
            <a href="#enroll" className="btn-secondary">Free Enquiry</a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-xl overflow-hidden"
            style={{ background: "var(--border)" }}>
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-6 px-4 text-center"
                style={{ background: "var(--card)" }}>
                <div className="stat-num mb-1" style={{ fontSize: "1.9rem" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.03em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
