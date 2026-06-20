"use client";
import { Briefcase, TrendingUp, Trophy, BookOpen, Users, FileText } from "lucide-react";

const offerings = [
  {
    icon: <Briefcase size={28} className="text-amber-400" />,
    badge: "badge-gold",
    tag: "Live Projects",
    title: "Real-World Live Projects",
    desc: "Work on actual consulting, marketing, finance, and strategy projects with live companies. Build your CV with impactful deliverables, not just coursework.",
    points: ["10+ domains available", "Certificate of completion", "LinkedIn-worthy outcomes"],
    color: "from-amber-500/10 to-transparent",
  },
  {
    icon: <TrendingUp size={28} className="text-indigo-400" />,
    badge: "badge-indigo",
    tag: "Placements",
    title: "SIP & Final Placement Prep",
    desc: "End-to-end preparation from CV to interview. Our IIM alumni mentors have placed 98.7% of students in their desired domains — finance, consulting, marketing & more.",
    points: ["CV optimization", "Mock interviews", "Domain-specific coaching"],
    color: "from-indigo-500/10 to-transparent",
  },
  {
    icon: <Trophy size={28} className="text-emerald-400" />,
    badge: "badge-green",
    tag: "Case Competitions",
    title: "Case Competition Mastery",
    desc: "Win national and international case competitions with structured frameworks, case libraries, and 1:1 coaching from past winners at IIMs, XLRI, and FMS.",
    points: ["500+ case library", "Framework training", "Competition calendar"],
    color: "from-emerald-500/10 to-transparent",
  },
  {
    icon: <BookOpen size={28} className="text-rose-400" />,
    badge: "badge-rose",
    tag: "Repositories",
    title: "MBA Resource Repository",
    desc: "Access a curated library of past placements data, study compendiums, case solved decks, interview transcripts, and domain knowledge bases.",
    points: ["Interview transcripts", "Study compendiums", "CV templates bank"],
    color: "from-rose-500/10 to-transparent",
  },
  {
    icon: <Users size={28} className="text-purple-400" />,
    badge: "badge-indigo",
    tag: "Mentorship",
    title: "1:1 IIM Alumni Mentorship",
    desc: "Personalized mentorship sessions with alumni from IIM A, B, C, L, XLRI, FMS who've been exactly where you are. Get tailored advice that actually works.",
    points: ["IIM A/B/C/L alumni", "Personalized sessions", "Ongoing support"],
    color: "from-purple-500/10 to-transparent",
  },
  {
    icon: <FileText size={28} className="text-cyan-400" />,
    badge: "badge-green",
    tag: "CV & Profile",
    title: "CV & Profile Building",
    desc: "Committee PORs and graduation internships are no longer enough. We help you build a standout profile with the right keywords, structure, and impact statements.",
    points: ["ATS-optimized CVs", "LinkedIn makeover", "Story crafting"],
    color: "from-cyan-500/10 to-transparent",
  },
];

export default function Offerings() {
  return (
    <section id="offerings" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>📚</span> What We Offer
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Everything an MBA Student{" "}
            <span className="text-gold-gradient">Needs to Win</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete ecosystem — from day one at B-school to your dream placement.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((o) => (
            <div key={o.title} className="feature-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer">
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${o.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

              <div className="relative z-10">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white/5">{o.icon}</div>
                  <span className={`${o.badge} text-xs px-2 py-1 rounded-full font-semibold`}>{o.tag}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{o.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{o.desc}</p>

                {/* Points */}
                <ul className="space-y-1">
                  {o.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="text-amber-400">✓</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
