"use client";
import { Download, ExternalLink, FileText, Video, BookOpen, BarChart2 } from "lucide-react";

const resources = [
  {
    icon: <FileText size={20} className="text-amber-400" />,
    title: "CV Templates Library",
    count: "50+ templates",
    desc: "ATS-optimized, domain-specific CV templates used by placed students.",
    tag: "CV & Profile",
    badge: "badge-gold",
    action: "Download",
  },
  {
    icon: <BookOpen size={20} className="text-indigo-400" />,
    title: "Study Compendiums",
    count: "20+ books",
    desc: "Curated knowledge books for Finance, Marketing, Consulting, Operations.",
    tag: "Study Material",
    badge: "badge-indigo",
    action: "Access",
  },
  {
    icon: <BarChart2 size={20} className="text-emerald-400" />,
    title: "Case Library",
    count: "500+ cases",
    desc: "Solved case decks from BCG, McKinsey, Bain, and national competitions.",
    tag: "Case Comp",
    badge: "badge-green",
    action: "Browse",
  },
  {
    icon: <Video size={20} className="text-rose-400" />,
    title: "Interview Transcripts",
    count: "300+ interviews",
    desc: "Verbatim interview Q&A from McKinsey, Goldman, Amazon, HUL, and more.",
    tag: "Placements",
    badge: "badge-rose",
    action: "Read",
  },
  {
    icon: <ExternalLink size={20} className="text-purple-400" />,
    title: "Live Project Portal",
    count: "Active listings",
    desc: "Real-time project listings across consulting, finance, marketing domains.",
    tag: "Live Projects",
    badge: "badge-indigo",
    action: "Explore",
  },
  {
    icon: <Download size={20} className="text-cyan-400" />,
    title: "Placement Data Reports",
    count: "5 years data",
    desc: "Historical placement data, salary benchmarks, and domain trends.",
    tag: "Analytics",
    badge: "badge-green",
    action: "Download",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-indigo px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>📂</span> Resource Hub
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Everything in One{" "}
            <span className="text-gold-gradient">Place</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            A curated repository built over 5+ years of MBA mentorship — yours to access instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r) => (
            <div key={r.title} className="feature-card rounded-2xl p-6 group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5">{r.icon}</div>
                <span className={`${r.badge} text-xs px-2 py-1 rounded-full font-semibold`}>{r.tag}</span>
              </div>
              <h3 className="font-bold text-white mb-1">{r.title}</h3>
              <p className="text-xs text-amber-400 font-semibold mb-2">{r.count}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{r.desc}</p>
              <button className="btn-outline-gold px-4 py-2 rounded-lg text-xs font-semibold w-full">
                {r.action} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
