"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Star, Award, Layers, Users, Sparkles, Loader2, Sparkle } from "lucide-react";

export interface CourseData {
  id: number;
  category: string;
  tag: string;
  tagLabel: string;
  title: string;
  desc: string;
  price: string;
  original: string;
  points: string[];
  link: string;
  featured: boolean;
  nudge: string | null;
  groupOffer: string | null;
  brochure?: string;
  badge?: string;
}

export const courses: CourseData[] = [
  {
    id: 1, category: "placements", tag: "tag-blue", tagLabel: "Placements — Master",
    title: "Placement Bootcamp — Master",
    desc: "The complete placement preparation package. Everything from CV to offer — mentorship, mock sessions, domain prep, and AI platform access.",
    price: "3,499", original: "6,000",
    points: [
      "5 CV reviews + 7 Mock PIs + 7 Mock GDs",
      "End-to-End Domain Prep Sessions — 20+ hours",
      "Latest Company-wise & Profile-wise Interview Transcripts",
      "Full JD Prep + Psychometric Assessment Support",
      "AI Platform: Profile Assessment, CV Prep, Mock PIs",
      "Contact of 100+ HRs from Top Companies"
    ],
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 20% off · 3+ students = 30% off",
    badge: "Most Popular"
  },
  {
    id: 2, category: "placements", tag: "tag-blue", tagLabel: "Placements — Mini",
    title: "Placement Bootcamp — Mini",
    desc: "Start your placement prep without full commitment. All core features with 3 CVs, 5 Mock PIs, 5 Mock GDs — top up anytime.",
    price: "2,499", original: "4,500",
    points: [
      "3 CV reviews + 5 Mock PIs + 5 Mock GDs (top up anytime)",
      "End-to-End Domain Prep Sessions — 20+ hours",
      "Company-wise Interview Transcripts",
      "Full JD Prep + Psychometric Support"
    ],
    link: "https://www.mbapartner.in/product/sip-placement-bootcamp/",
    featured: false,
    nudge: "💡 Upgrade to Master anytime — sessions carry over",
    groupOffer: null
  },
  {
    id: 3, category: "case", tag: "tag-green", tagLabel: "Case Competition",
    title: "Case Competition Bootcamp",
    desc: "Coached by AIR 1, AIR 6, AIR 10 & AIR 15 from Unstop. 8 hours of sessions + 30+ national finals PPTs + Canva Pro for 1 year.",
    price: "3,499", original: "6,000",
    points: [
      "8 hours of sessions by Unstop Toppers (AIR 1, 6, 10, 15)",
      "30+ National Finals & Winning PPTs",
      "Canva Pro Access for 1 Year",
      "1:1 Mentorship if you clear Executive Summary Round",
      "1 CV point via annual MSME Competition on Unstop",
      "AI Platform: Profile, CV, Mock PIs"
    ],
    link: "https://www.mbapartner.in/product/case-competition-bootcamp/",
    featured: false,
    nudge: "🏆 20+ National Winners from our students",
    groupOffer: "2 students = 30% off · 3+ students = 40% off",
    brochure: "/brochures/case-comp-brochure.pdf"
  },
  {
    id: 4, category: "projects", tag: "tag", tagLabel: "Live Project — 2 Months",
    title: "Live Project — 2 Month Engagement",
    desc: "Real project under Prodmark Business Consultants Pvt. Ltd. Not a course — actual deliverables with IIM alumni oversight. 6 domain tracks.",
    price: "3,999", original: "7,000",
    points: [
      "8 hours of domain sessions + project assignment",
      "5 ATS-friendly CV points on completion",
      "Certificate of Completion (flexible dates)",
      "AI Platform: Profile Assessment, CV Prep, Mock PIs",
      "Domains: Finance · Consulting · Marketing · HR · Operations · Product"
    ],
    link: "https://www.mbapartner.in/product/live-project-consulting/",
    featured: false,
    nudge: "✅ Works under a real consulting company — not a simulation",
    groupOffer: "2 students = 30% off",
    brochure: "/brochures/case-comp-brochure.pdf"
  },
  {
    id: 5, category: "projects", tag: "tag", tagLabel: "Live Project — 1 Month",
    title: "Live Project — 1 Month Engagement",
    desc: "Shorter track covering the top 4 areas per domain. 4 hours of sessions, 2 ATS-friendly CV points, certificate. Max 2 hours/day commitment.",
    price: "2,499", original: "4,500",
    points: [
      "4 hours of domain sessions + project",
      "2 ATS-friendly CV points on completion",
      "Certificate of Completion",
      "Domains: Finance · Consulting · Marketing · HR · Operations · Product"
    ],
    link: "https://www.mbapartner.in/product/live-project-consulting/",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off"
  },
  {
    id: 6, category: "combo", tag: "tag-rose", tagLabel: "Best Value Combo",
    title: "Master Bundle — Placements + Case Comp + Live Project",
    desc: "Our most popular all-in-one package. Everything to differentiate your MBA profile — placement prep, case competition mastery, and a real live project.",
    price: "13,999", original: "22,000",
    points: [
      "Full Placement Bootcamp — Master",
      "Full Case Competition Bootcamp",
      "1 Live Project — 2 months (any domain)",
      "Priority mentor matching",
      "Record-breaking results when all three are combined"
    ],
    link: "https://www.mbapartner.in/product/master-bootcamp-case-comp-live-project/",
    featured: true,
    nudge: "🔥 Save ₹8,001 vs buying separately",
    groupOffer: null,
    badge: "Best Value"
  },
  {
    id: 7, category: "combo", tag: "tag-indigo", tagLabel: "Combo",
    title: "Placement + Case Competition Combo",
    desc: "The two most impactful tools for MBA students, combined at a discount.",
    price: "5,999", original: "10,000",
    points: [
      "Full Placement Bootcamp — Master",
      "Full Case Competition Bootcamp",
      "30+ winning case decks"
    ],
    link: "https://www.mbapartner.in/product/placement-case-competition-combo/",
    featured: false,
    nudge: "💰 Save ₹4,001 vs buying separately",
    groupOffer: null
  },
  {
    id: 8, category: "certifications", tag: "tag-blue", tagLabel: "Certification",
    title: "Advanced Excel — Including Power Query",
    desc: "XLookUp, Index-Match, Power Query, 20+ core functions, and Financial Modelling in Excel. Essential for Finance and Operations roles.",
    price: "1,999", original: "3,500",
    points: [
      "X-LookUp, Index-Match, & Power Query",
      "20+ core Excel functions",
      "Session on Financial Modelling in Excel"
    ],
    link: "https://www.mbapartner.in",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off · 3+ students = 40% off"
  },
  {
    id: 9, category: "certifications", tag: "tag-indigo", tagLabel: "Certification",
    title: "Power BI — Interactive Dashboards",
    desc: "Build interactive dashboards from 5+ data sources including web. Dynamic dashboarding and BI modelling queries.",
    price: "1,999", original: "3,500",
    points: [
      "BI Modelling Queries and interactive dashboards",
      "Dynamic Dashboarding from 5+ data sources including web"
    ],
    link: "https://www.mbapartner.in",
    featured: false,
    nudge: null,
    groupOffer: "2 students = 30% off · 3+ students = 40% off"
  },
];

const tabs = [
  { key: "all", label: "All Programs" },
  { key: "placements", label: "Placements" },
  { key: "case", label: "Case Competitions" },
  { key: "projects", label: "Live Projects" },
  { key: "combo", label: "Combos" },
  { key: "certifications", label: "Certifications" },
];

function savingsPct(price: string, original: string): number {
  const p = parseFloat(price.replace(/,/g, ""));
  const o = parseFloat(original.replace(/,/g, ""));
  if (!o) return 0;
  return Math.round(((o - p) / o) * 100);
}

interface CoursesProps {
  comparedIds: number[];
  onCompareToggle: (id: number) => void;
}

export default function Courses({ comparedIds, onCompareToggle }: CoursesProps) {
  const [active, setActive] = useState("all");
  const [brochureCourse, setBrochureCourse] = useState<CourseData | null>(null);
  const [loadingEnrollId, setLoadingEnrollId] = useState<number | null>(null);
  const [loadingBrochureId, setLoadingBrochureId] = useState<number | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const filtered = active === "all" ? courses : courses.filter(c => c.category === active);

  const handleCompare = (id: number) => {
    onCompareToggle(id);
  };

  const handleEnrollClick = (id: number, link: string) => {
    setLoadingEnrollId(id);
    setTimeout(() => {
      setLoadingEnrollId(null);
      window.open(link, "_blank", "noreferrer");
    }, 1200);
  };

  const handleBrochureClick = (c: CourseData) => {
    setLoadingBrochureId(c.id);
    setTimeout(() => {
      setLoadingBrochureId(null);
      setBrochureCourse(c);
    }, 800);
  };

  const scrollToCompare = () => {
    const el = document.getElementById("course-compare");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="courses" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-[10px] font-extrabold tracking-widest text-blue-700 dark:text-blue-400 uppercase mb-4">
            <Award size={10} />
            <span>Premium Career Training</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-4">
            Programs & Pricing
          </h2>
          <p className="text-slate-655 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose your specialization track. Transparent pricing, real project deliverables, and expert mentor support.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 mb-10 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/80 max-w-max" data-reveal>
          {tabs.map(t => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                onMouseEnter={() => setHoveredTab(t.key)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-4 py-2 text-xs font-bold rounded-lg transition-all focus:outline-none ${
                  isActive 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <span className="relative z-10">{t.label}</span>
                {hoveredTab === t.key && (
                  <motion.span
                    layoutId="courseTabHover"
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="courseTabActive"
                    className="absolute inset-0 bg-white dark:bg-slate-800/90 rounded-lg shadow-sm border border-slate-200/80 dark:border-slate-700/80 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Course Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => {
              const isCompared = comparedIds.includes(c.id);
              const compareDisabled = !isCompared && comparedIds.length >= 3;
              const pct = savingsPct(c.price, c.original);
              const isEnrolling = loadingEnrollId === c.id;
              const isLoadingBrochure = loadingBrochureId === c.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  key={c.id}
                  className={`bg-white dark:bg-slate-900 rounded-xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                    c.featured 
                      ? "border-blue-500/80 shadow-md ring-1 ring-blue-500/10 dark:ring-blue-400/20" 
                      : "border-slate-200/60 dark:border-slate-800/80 shadow-sm"
                  }`}
                >
                  <div>
                    {/* Header badge & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[9px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                        {c.tagLabel}
                      </span>
                      {c.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 text-[9px] font-extrabold tracking-wider uppercase border border-blue-100 dark:border-blue-900/30">
                          <Sparkles size={8} />
                          {c.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3">
                      {c.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                      {c.desc}
                    </p>

                    {/* Highlights check-list */}
                    <ul className="space-y-2 border-t border-slate-100 dark:border-slate-800/80 pt-4 mb-6">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-normal">
                          <Check size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Nudge Banner */}
                    {c.nudge && (
                      <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-lg text-xs font-semibold text-amber-700 dark:text-amber-400 mb-6 flex items-start gap-1.5">
                        <Sparkle size={12} className="shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>{c.nudge}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action buttons footer */}
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex flex-col gap-4 mt-auto">
                    
                    {/* Access rates split */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Community rate
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            ₹{c.price}
                          </span>
                          {pct > 0 && (
                            <span className="px-1.5 py-0.5 text-[9px] font-extrabold rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
                              {pct}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Regular rate
                        </span>
                        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through mt-1">
                          ₹{c.original}
                        </span>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEnrollClick(c.id, c.link)}
                        disabled={isEnrolling}
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-650 text-white rounded-lg font-bold text-xs tracking-wider uppercase shadow-sm focus:outline-none flex items-center justify-center gap-1.5 transition-colors"
                      >
                        {isEnrolling ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Enroll Now</span>
                            <ArrowRight size={12} />
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleBrochureClick(c)}
                        disabled={isLoadingBrochure}
                        className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                      >
                        {isLoadingBrochure ? (
                          <Loader2 size={13} className="animate-spin text-slate-500" />
                        ) : (
                          <span>Details / PDF</span>
                        )}
                      </button>
                    </div>

                    {/* Compare Option */}
                    <button
                      onClick={() => handleCompare(c.id)}
                      disabled={compareDisabled}
                      className={`text-center text-[10px] font-bold py-1 rounded transition-colors ${
                        isCompared 
                          ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/20" 
                          : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-350"
                      }`}
                    >
                      {isCompared ? "✓ Added to comparison" : compareDisabled ? "Max 3 comparison slots full" : "+ Add to compare"}
                    </button>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Floating comparison drawer */}
        <AnimatePresence>
          {comparedIds.length > 0 && (
            <motion.div
              initial={{ y: 80, x: "-50%", opacity: 0 }}
              animate={{ y: 0, x: "-50%", opacity: 1 }}
              exit={{ y: 80, x: "-50%", opacity: 0 }}
              className="fixed bottom-6 left-1/2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl px-5 py-3.5 flex items-center gap-6 z-50 max-w-md w-[90%]"
            >
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Comparing <span className="text-blue-600">{comparedIds.length}</span> program{comparedIds.length > 1 ? "s" : ""}
                </span>
                <span className="text-[10px] text-slate-400">Max 3 items</span>
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={scrollToCompare}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs tracking-wider uppercase shadow-sm focus:outline-none"
                >
                  Compare
                </button>
                <button
                  onClick={() => comparedIds.forEach(id => onCompareToggle(id))}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details / Brochure Modal */}
        <AnimatePresence>
          {brochureCourse && (
            <div
              onClick={() => setBrochureCourse(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={e => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-xl relative text-slate-700 dark:text-slate-350"
              >
                <button
                  onClick={() => setBrochureCourse(null)}
                  className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 focus:outline-none"
                >
                  ×
                </button>

                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-2">
                  {brochureCourse.tagLabel}
                </span>
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3">
                  {brochureCourse.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {brochureCourse.desc}
                </p>

                <div className="mb-6">
                  <div className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-3">
                    What's Included
                  </div>
                  <ul className="space-y-2">
                    {brochureCourse.points.map(p => (
                      <li key={p} className="flex gap-2 text-xs sm:text-sm text-slate-650 dark:text-slate-400 leading-normal">
                        <Check size={14} className="text-blue-605 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {brochureCourse.groupOffer && (
                  <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-900/30 rounded-lg text-xs font-semibold text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-1.5">
                    <Users size={14} />
                    <span>{brochureCourse.groupOffer}</span>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-5">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      Community rate
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        ₹{brochureCourse.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 line-through">
                        ₹{brochureCourse.original}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const link = brochureCourse.link;
                      setBrochureCourse(null);
                      handleEnrollClick(brochureCourse.id, link);
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs tracking-wider uppercase shadow-sm focus:outline-none flex items-center gap-1"
                  >
                    <span>Secure Slot</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
