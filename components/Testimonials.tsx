"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Quote, TrendingUp, Sparkles } from "lucide-react";

const colleges = [
  { name: "MDI Gurgaon", count: 12 },
  { name: "NMIMS Mumbai", count: 9 },
  { name: "IIM Kozhikode", count: 8 },
  { name: "XLRI Jamshedpur", count: 7 },
  { name: "JBIMS", count: 5 },
  { name: "IIM Lucknow", count: 5 },
  { name: "IIM Bangalore", count: 6 },
  { name: "IIM Indore", count: 4 },
  { name: "FMS Delhi", count: 4 },
  { name: "SIBM Bangalore", count: 3 },
  { name: "IIM Mumbai", count: 2 },
  { name: "IIM Ranchi", count: 2 },
  { name: "IMT Ghaziabad", count: 2 },
  { name: "Others", count: 50 },
];

const testimonials = [
  {
    name: "Pavan Pawar",
    college: "SIBM Bangalore",
    role: "MBA — Marketing & Consulting",
    placed: "Ediglobe (SIP)",
    quote: "I took Marketing, Product Management, and Consulting live projects simultaneously with the Case Competition Bootcamp. The real deliverables gave me concrete talking points in every SIP interview.",
    tag: "Case Comp + 3 Live Projects",
    tagClass: "text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-900/30",
    metric: "+120% Package Jump",
    insight: "SIP Conversion: 100% | 3 Live Projects Completed"
  },
  {
    name: "Vedanshi",
    college: "XLRI Jamshedpur",
    role: "MBA — Business Management",
    placed: "Amazon (SIP)",
    quote: "The Consulting Live Project under Prodmark gave me an actual strategy deliverable to show in interviews. Amazon shortlisted me directly based on my CV — the ATS-optimised CV points made all the difference.",
    tag: "Live Project — Consulting",
    tagClass: "text-blue-700 bg-blue-55/40 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-900/30",
    metric: "Shortlist Rank: Top 1%",
    insight: "Amazon Strategy Role | 1:1 Resume Prep"
  },
  {
    name: "Divyanshi Jaiswal",
    college: "NMIMS Mumbai",
    role: "MBA — Finance",
    placed: "Nomura (Final)",
    quote: "Final placements at Nomura. The Master Placement Bootcamp — especially the finance-domain Mock PIs and the interview transcripts from Goldman and JP Morgan — prepared me for exactly the type of questions asked.",
    tag: "Master Placements",
    tagClass: "text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/30",
    metric: "Nomura Final Offer",
    insight: "Goldman & JP Morgan Transcripts Solved"
  },
  {
    name: "Ananyo Sharma Roy",
    college: "XLRI Jamshedpur",
    role: "MBA — HRM & Business Management",
    placed: "TAS (Final)",
    quote: "TAS is one of the most selective final placement roles. The 1:1 mentorship from an alumnus who had cracked TAS the previous year, combined with the domain sessions, made the preparation feel structured.",
    tag: "1:1 Mentorship",
    tagClass: "text-violet-750 bg-violet-50 border-violet-200 dark:text-violet-400 dark:bg-violet-955/40 dark:border-violet-900/30",
    metric: "Elite TAS Placement",
    insight: "1:1 Mock Interviews with TAS Alum"
  },
  {
    name: "Megha",
    college: "IIM Mumbai",
    role: "MBA — Operations & Strategy",
    placed: "Kearney (SIP)",
    quote: "Kearney was my dream SIP. The Case Competition Bootcamp by AIR 1 taught me frameworks that I directly applied in the Kearney case interview. I also did the Marketing and Operations live projects.",
    tag: "Case Comp + Live Projects",
    tagClass: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/30",
    metric: "Kearney Consulting",
    insight: "Case Study Coaching with Unstop AIR 1"
  },
  {
    name: "Madhumitha",
    college: "IIM Bangalore",
    role: "MBA — Consulting Track",
    placed: "Accenture (SIP)",
    quote: "The domain-specific coaching for consulting roles was exceptional. 7 Mock GDs and 7 Mock PIs over 6 weeks completely transformed how I present myself. Placed at Accenture Strategy.",
    tag: "Master Placements",
    tagClass: "text-teal-700 bg-teal-50 border-teal-200 dark:text-teal-400 dark:bg-teal-950/40 dark:border-teal-900/30",
    metric: "Accenture Strategy",
    insight: "7 Mock GDs & 7 Mock PIs Completed"
  }
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Testimonials() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="max-w-2xl mb-12" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-[10px] font-extrabold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase mb-4">
            <CheckCircle size={10} />
            <span>700+ Verified Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
            Students Who Made It
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real outcomes from top-tier business schools. Our students secure offers at McKinsey, BCG, Amazon, Nomura, and TAS.
          </p>
        </div>

        {/* Colleges Badges Marquee-like grid */}
        <div className="flex flex-wrap gap-2 mb-12" data-reveal>
          {colleges.map((c) => (
            <div
              key={c.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-350 shadow-sm"
            >
              <span>{c.name}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/20">
                {c.count === 50 ? "50+" : c.count}
              </span>
            </div>
          ))}
        </div>

        {/* Bento Testimonial Grid with Hover Insights Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={t.name}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800/80 p-6 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Quote symbol decoration */}
                <div className="absolute top-4 right-4 text-slate-100 dark:text-slate-800 pointer-events-none">
                  <Quote size={40} className="opacity-40" />
                </div>

                <div>
                  {/* Rating */}
                  <div className="flex gap-0.5 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>

                  {/* Header info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 flex items-center justify-center font-extrabold text-blue-600 dark:text-blue-400 text-xs">
                      {getInitials(t.name)}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {t.name}
                        <span className="text-[9px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 px-1.5 py-0.5 rounded-full tracking-wider scale-90">
                          Verified
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-semibold">{t.college}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{t.role}</p>
                    </div>
                  </div>

                  {/* Quote Body */}
                  <blockquote className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Footer and Tags */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${t.tagClass}`}>
                      {t.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      → {t.placed}
                    </span>
                  </div>

                  {/* Dynamic Insight Overlay (Interactive Wharton style) */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100/30 dark:border-blue-900/30 rounded-lg p-2.5 mt-2 flex flex-col gap-1"
                      >
                        <div className="flex items-center gap-1 text-[10px] font-extrabold text-blue-750 dark:text-blue-400 uppercase tracking-widest">
                          <TrendingUp size={10} />
                          <span>Strategic Metrics</span>
                        </div>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {t.metric}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {t.insight}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Summary strip */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 p-5 rounded-xl shadow-sm text-center">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            <span className="text-blue-600 dark:text-blue-400">Placed Across 40+ Campuses</span>
            <span className="mx-2.5 text-slate-300 dark:text-slate-700">·</span>
            <span>IIM A · B · C · L · K · I</span>
            <span className="mx-2.5 text-slate-300 dark:text-slate-700">·</span>
            <span>XLRI · MDI · NMIMS · JBIMS · FMS</span>
            <span className="mx-2.5 text-slate-300 dark:text-slate-700">·</span>
            <span className="text-blue-600 dark:text-blue-400">And 30 More Top-Tier B-Schools</span>
          </p>
        </div>

      </div>
    </section>
  );
}
