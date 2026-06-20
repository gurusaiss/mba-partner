"use client";
import { Check } from "lucide-react";

const programs = [
  {
    name: "Starter",
    tagline: "For early-stage MBA students",
    price: "₹4,999",
    period: "/ month",
    featured: false,
    badge: null,
    features: [
      "Full resource repository access",
      "50+ CV template library",
      "Case competition calendar",
      "Study compendiums (20+ books)",
      "Community access — Telegram & WhatsApp",
      "2 group mentorship sessions / month",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    tagline: "For focused placement preparation",
    price: "₹9,999",
    period: "/ month",
    featured: true,
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "1 : 1 IIM alumni mentor (matched in 24 hrs)",
      "4 personal mentorship sessions / month",
      "CV review & full optimisation",
      "2 mock interview sessions",
      "1 live project (domain of choice)",
      "Case competition coaching",
      "SIP + Final placement support",
    ],
    cta: "Enroll Now",
  },
  {
    name: "Elite",
    tagline: "For those targeting tier-one companies",
    price: "₹19,999",
    period: "/ month",
    featured: false,
    badge: null,
    features: [
      "Everything in Growth",
      "Unlimited 1 : 1 mentor sessions",
      "Senior IIM A / B / C mentor",
      "Unlimited mock interviews",
      "3 simultaneous live projects",
      "Personal brand & LinkedIn strategy",
      "Priority placement network access",
      "Dedicated placement coordinator",
    ],
    cta: "Apply Now",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Programs</span>
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>
          <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
            Choose Your<br />
            <span className="text-gold-gradient">Level of Commitment</span>
          </h2>
          <p className="text-lg" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Three programmes designed for every stage of your MBA journey. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {programs.map((p) => (
            <div key={p.name} className={`program-card rounded-2xl p-8 relative ${p.featured ? "featured" : ""}`}>
              {p.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="btn-gold px-5 py-1.5 rounded-full text-xs font-bold tracking-wider">{p.badge}</span>
                </div>
              )}

              <div className="mb-7">
                <h3 className="font-display font-bold text-2xl mb-1" style={{ color: "var(--text)" }}>{p.name}</h3>
                <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>{p.tagline}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className={`font-display font-black ${p.featured ? "text-gold-gradient" : ""}`}
                    style={{ fontSize: "2.8rem", lineHeight: 1, color: p.featured ? undefined : "var(--text)" }}>
                    {p.price}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{p.period}</span>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                    <Check size={15} className="mt-0.5 flex-shrink-0"
                      style={{ color: p.featured ? "var(--gold)" : "#4ADE80" }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://mbapartner.in"
                target="_blank"
                rel="noreferrer"
                className={`block text-center py-3.5 rounded-xl font-semibold tracking-wide ${p.featured ? "btn-gold" : "btn-outline-gold"}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm mt-10" style={{ color: "var(--muted2)" }}>
          🔒 7-day satisfaction guarantee — full refund, no questions asked.
        </p>
      </div>
    </section>
  );
}
