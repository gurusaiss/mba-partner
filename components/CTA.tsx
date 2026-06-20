"use client";
import { ArrowRight, Shield, Clock, Award } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-divider mb-24" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-indigo-600/5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
          <span>🚀</span> Start Your Journey Today
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
          Don't Let Your MBA Degree{" "}
          <span className="text-gold-gradient">Define Your Limit.</span>
          <br />
          Let Us Help You{" "}
          <span className="text-white/90">Break Through It.</span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Join 2,000+ MBA students who transformed their career trajectory with
          personalized IIM alumni mentorship, live projects, and placement prep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#programs" className="btn-gold px-8 py-4 rounded-xl text-base font-bold inline-flex items-center gap-2 justify-center">
            Explore Programs <ArrowRight size={18} />
          </a>
          <a
            href="https://mbapartner.in"
            target="_blank"
            rel="noreferrer"
            className="btn-outline-gold px-8 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 justify-center"
          >
            Visit mbapartner.in
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { icon: <Shield size={16} />, text: "7-day money back guarantee" },
            { icon: <Clock size={16} />, text: "Mentor matched in 24 hours" },
            { icon: <Award size={16} />, text: "IIM alumni verified mentors" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-amber-400">{t.icon}</span>
              {t.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
