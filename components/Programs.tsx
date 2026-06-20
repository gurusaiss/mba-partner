"use client";
import { Check } from "lucide-react";

const programs = [
  {
    name: "Starter",
    tagline: "For early-stage MBA students",
    price: "₹4,999",
    period: "/month",
    badge: null,
    features: [
      "Access to resource repository",
      "CV template library",
      "Case competition calendar",
      "Community access (Telegram + WhatsApp)",
      "2 group mentorship sessions/month",
      "Study compendiums",
    ],
    cta: "Start Free Trial",
    featured: false,
  },
  {
    name: "Growth",
    tagline: "For serious placement seekers",
    price: "₹9,999",
    period: "/month",
    badge: "Most Popular",
    features: [
      "Everything in Starter",
      "1:1 mentor matching (IIM alumni)",
      "4 personal mentorship sessions/month",
      "CV review & optimization",
      "Mock interview (2 sessions)",
      "Live project access (1 project)",
      "Case competition coaching",
      "SIP + Final placement support",
    ],
    cta: "Get Started",
    featured: true,
  },
  {
    name: "Elite",
    tagline: "For those targeting top-tier companies",
    price: "₹19,999",
    period: "/month",
    badge: null,
    features: [
      "Everything in Growth",
      "Unlimited 1:1 mentor sessions",
      "Senior IIM A/B/C mentor",
      "Unlimited mock interviews",
      "3 live projects simultaneously",
      "Personal brand building",
      "Priority placement network access",
      "Dedicated placement coordinator",
    ],
    cta: "Apply Now",
    featured: false,
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>💎</span> Programs & Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Invest in Your{" "}
            <span className="text-gold-gradient">MBA Success</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Flexible programs designed for every stage of your MBA journey.
            Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {programs.map((p) => (
            <div key={p.name} className={`program-card rounded-2xl p-6 relative ${p.featured ? "featured" : ""}`}>
              {/* Badge */}
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="btn-gold px-4 py-1 rounded-full text-xs font-bold">{p.badge}</span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{p.tagline}</p>
                <div className="flex items-end gap-1">
                  <span className={`text-4xl font-black ${p.featured ? "text-gold-gradient" : "text-white"}`}>
                    {p.price}
                  </span>
                  <span className="text-gray-500 text-sm mb-1">{p.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check size={14} className={`mt-0.5 flex-shrink-0 ${p.featured ? "text-amber-400" : "text-emerald-400"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="https://mbapartner.in"
                target="_blank"
                rel="noreferrer"
                className={`block text-center py-3 rounded-xl font-semibold text-sm ${
                  p.featured ? "btn-gold" : "btn-outline-gold"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Money back */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            🔒 <span className="text-gray-400">100% satisfaction guaranteed.</span> Not happy in the first 7 days? Full refund, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
