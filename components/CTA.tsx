"use client";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="section-divider" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Editorial layout — large quote style */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Begin Today</span>
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>

          <h2 className="font-display font-black leading-tight mb-7"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", color: "var(--text)" }}>
            Your Peers Are Already<br />
            <span className="text-gold-gradient">Preparing with MBA Partner.</span>
          </h2>

          <p className="text-xl leading-relaxed mb-12 max-w-2xl mx-auto" style={{ color: "var(--muted)", fontSize: "1.15rem" }}>
            Join 2,000+ students who chose a structured, mentor-backed path over guesswork.
            The placements are real. The outcomes are documented. The community is waiting.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <a href="#programs" className="btn-gold px-10 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2 justify-center pulse-gold">
              Explore Programs <ArrowRight size={18} />
            </a>
            <a href="https://mbapartner.in" target="_blank" rel="noreferrer"
              className="btn-outline-gold px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 justify-center">
              Visit mbapartner.in
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-8" style={{ color: "var(--muted2)" }}>
            {[
              { icon: "🔒", text: "7-day money-back guarantee" },
              { icon: "⚡", text: "Mentor matched within 24 hours" },
              { icon: "🏛️", text: "IIM alumni verified mentors" },
              { icon: "📱", text: "Accessible on any device" },
            ].map((t) => (
              <div key={t.text} className="flex items-center gap-2 text-sm">
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
