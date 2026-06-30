"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

function CountUpNum({ raw }: { raw: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const m = raw.match(/^([\d,]+\.?\d*)(.*)/);
    if (!m) { setDisplay(raw); return; }
    const target = parseFloat(m[1].replace(/,/g, ""));
    const suffix = m[2];
    const isDecimal = m[1].includes(".");
    const hasComma = target >= 1000;
    const duration = 1800;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = eased * target;
          const formatted = isDecimal ? v.toFixed(1) : hasComma ? Math.round(v).toLocaleString() : Math.round(v).toString();
          setDisplay(formatted + suffix);
          if (p < 1) requestAnimationFrame(tick);
          else setDisplay(raw);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  return <span ref={ref}>{display}</span>;
}

const highlights = [
  "Live Consulting Projects with real corporate deliverables",
  "Case Competition coaching by AIR 1 & Unstop Toppers",
  "SIP & Final Placement Bootcamp — complete CV-to-offer prep",
  "5-year database of placement questions & transcripts",
];

const companies = ["McKinsey", "Goldman Sachs", "BCG", "Bain & Co.", "HUL", "Amazon", "Deloitte", "EY", "TAS", "Kearney", "L'Oreal", "Accenture"];

const statsData = [
  { val: "9.6", suffix: "/10", label: "Avg. rating by 700+ students", trend: "Top 0.5% rated" },
  { val: "5,000", suffix: "+", label: "Active Student network", trend: "Across 40+ campuses" },
  { val: "98.7", suffix: "%", label: "Placed in desired domain", trend: "+34% average salary jump" },
  { val: "100", suffix: "%", label: "Mentors from Old IIMs / XLRI", trend: "1:1 Live matching" },
];

const schoolPills = ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "XLRI Jamshedpur", "FMS Delhi"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setEmailInput("");
    }, 1200);
  };

  return (
    <section
      id="home"
      className="hero-section relative min-h-[92vh] flex items-center pt-20 pb-16 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Subtle geometric line grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20 pointer-events-none" />

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 h-96 w-96 rounded-full bg-rose-500/10 dark:bg-rose-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Premium Editorial Pitch & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Microlabel Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/30 text-[10px] font-extrabold tracking-widest text-blue-700 dark:text-blue-400 uppercase mb-5">
              <Sparkles size={10} className="animate-pulse" />
              <span>Initiative by Alumni of Old IIMs</span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6">
              Get Mentored.<br />
              Get <span className="text-blue-600 dark:text-blue-400">Placed.</span>
            </h1>

            {/* Premium Editorial Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
              Join 5,000+ top B-school students getting live consulting projects, case competition wins, and placement bootcamps mentored by alumni from <span className="text-slate-900 dark:text-slate-200 font-semibold">IIM A/B/C, XLRI & FMS</span>.
            </p>

            {/* Interactive High-Conversion Input Field or Dual Button CTA */}
            <div className="w-full max-w-lg mb-8">
              <form onSubmit={handleCaptureSubmit} className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all duration-200">
                <input
                  type="email"
                  placeholder="Enter email to get free CV templates..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="px-4 py-2.5 text-sm bg-transparent text-slate-850 dark:text-slate-100 placeholder-slate-450 focus:outline-none flex-grow"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs tracking-wider uppercase transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-1.5 shrink-0"
                >
                  {isSubmitting ? "Sending..." : "Get CV Templates"}
                  <ArrowRight size={14} />
                </motion.button>
              </form>
              
              {success && (
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2.5 flex items-center gap-1">
                  ✓ Sent! Check your email for your free CV templates.
                </p>
              )}
            </div>

            {/* Dual CTAs (Secondary Option) */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a 
                href="#courses"
                className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest text-white bg-blue-600 hover:bg-blue-700 uppercase transition-all shadow-md shadow-blue-500/10 hover:shadow-lg focus:outline-none flex items-center gap-1.5"
              >
                <span>Browse Cohorts</span>
                <ArrowRight size={13} />
              </a>
              <a 
                href="#enroll"
                className="px-6 py-3 rounded-lg text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-750 bg-white dark:bg-slate-900 uppercase transition-all focus:outline-none"
              >
                Book Free Consultation
              </a>
            </div>

            {/* Urgency Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/20 border border-red-100/50 dark:border-red-900/20 text-xs font-medium text-red-700 dark:text-red-400 mb-8">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping shrink-0" />
              <span>Next cohort starting soon — 12 seats remaining</span>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-8 w-full">
              {highlights.map(h => (
                <div key={h} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-655 dark:text-slate-400 font-medium leading-normal">{h}</span>
                </div>
              ))}
            </div>
            
          </div>

          {/* RIGHT: Bento Stats Panel & Companies placed at */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Bento-style Snapshot Grid */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800/80 shadow-md p-6 relative overflow-hidden">
              
              {/* Header inside bento */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-4">
                <span className="text-[10px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                  Cohort Performance
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Verified Live</span>
                </div>
              </div>

              {/* 2x2 Stats Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {statsData.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tight">
                      <CountUpNum raw={s.val} />
                      <span className="text-blue-600 dark:text-blue-400 text-xl font-bold">{s.suffix}</span>
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 leading-tight">
                      {s.label}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                      {s.trend}
                    </span>
                  </div>
                ))}
              </div>

              {/* School logo pills footer */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-5">
                <span className="text-[9px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-3">
                  Our Mentors Graduated From
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {schoolPills.map(p => (
                    <span key={p} className="px-2.5 py-1 text-[10px] font-bold rounded bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-800/40">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Hiring recruiters banner */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/70 dark:border-slate-800/80 shadow-md p-6">
              <span className="text-[9px] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-4">
                Students Placed In Leadership & SIP Roles At
              </span>
              <div className="flex flex-wrap gap-2">
                {companies.map(c => (
                  <span
                    key={c}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-650 dark:text-slate-350 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200/40 dark:border-slate-800/40 hover:border-blue-500/20 hover:text-blue-600 transition-all duration-200"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Scroll to explore indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 pointer-events-none">
        <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase">
          Scroll to Explore
        </span>
        <ChevronDown size={14} className="text-blue-605 animate-bounce" />
      </div>

    </section>
  );
}
