"use client";
import { useState } from "react";
import { Check, Tag } from "lucide-react";

/* ── Real course data from mbapartner.in ──────────────────────────────────── */
const tabs = [
  { id: "all", label: "All Courses" },
  { id: "bootcamp", label: "Placements Bootcamp" },
  { id: "case", label: "Case Competitions" },
  { id: "live", label: "Live Projects" },
  { id: "combo", label: "All-in-One Combos" },
];

const courses = [
  /* ── PLACEMENTS BOOTCAMP ──────────────────────────────────────────────── */
  {
    id: "pb1",
    category: "bootcamp",
    badge: "badge-blue",
    tag: "Placements Bootcamp",
    name: "Placements Bootcamp",
    tagline: "End-to-end SIP & Final Placement preparation",
    price: "₹7,499",
    original: "₹7,999",
    href: "https://www.mbapartner.in/category/placements-bootcamp",
    tiers: [
      {
        name: "Master",
        features: [
          "5 CV review & optimisation slots",
          "7 Mock Personal Interviews (PIs)",
          "7 Mock Group Discussions (GDs)",
          "2 Domain sessions per domain",
        ],
      },
      {
        name: "Mini",
        features: [
          "3 CV review slots",
          "5 Mock Personal Interviews",
          "5 Mock Group Discussions",
        ],
      },
    ],
    featured: false,
    color: "#60A5FA",
  },
  {
    id: "pb2",
    category: "bootcamp",
    badge: "badge-blue",
    tag: "Placements Bootcamp",
    name: "Placements Bootcamp + Case Comp",
    tagline: "Full placement prep with case competition mastery",
    price: "₹9,499",
    original: "₹9,999",
    href: "https://www.mbapartner.in/product-page/master-placements-bootcamp-case-comp",
    tiers: [
      {
        name: "Master",
        features: [
          "5 CV review slots",
          "7 Mock PIs + 7 Mock GDs",
          "2 Domain sessions per domain",
          "4 Case Competition sessions (2 hrs each)",
          "30+ winning case PPTs",
          "Canva Premium — 1 year",
        ],
      },
      {
        name: "Mini",
        features: [
          "3 CV slots",
          "5 Mock PIs + 5 Mock GDs",
          "Case Competition access",
        ],
      },
    ],
    featured: false,
    color: "#60A5FA",
  },
  {
    id: "pb3",
    category: "bootcamp",
    badge: "badge-blue",
    tag: "Placements Bootcamp",
    name: "Placements Bootcamp + 1 Live Project",
    tagline: "Placement prep with hands-on domain experience",
    price: "₹11,499",
    original: "₹11,999",
    href: "https://www.mbapartner.in/product-page/master-placements-bootcamp-1-live-project",
    tiers: [
      {
        name: "Master",
        features: [
          "5 CV review slots",
          "7 Mock PIs + 7 Mock GDs",
          "2 Complementary domain sessions",
          "1 Live Project — any domain",
          "2-month project duration",
        ],
      },
      {
        name: "Mini",
        features: [
          "3 CV slots",
          "5 Mock PIs + 5 Mock GDs",
          "1 Live Project included",
        ],
      },
    ],
    featured: false,
    color: "#60A5FA",
  },

  /* ── CASE COMPETITIONS ───────────────────────────────────────────────── */
  {
    id: "cc1",
    category: "case",
    badge: "badge-gold",
    tag: "Case Competitions",
    name: "Case Competition",
    tagline: "Coached by AIR 1 — frameworks, PPTs, live practice",
    price: "₹3,499",
    original: "₹3,999",
    href: "https://www.mbapartner.in/category/case-competition",
    tiers: [
      {
        name: "Includes",
        features: [
          "4 live sessions × 2 hours each",
          "Led by AIR 1 (All-India Rank 1)",
          "30+ winning case presentation PPTs",
          "Canva Premium access — 1 year",
          "Mentorship on case approaches",
        ],
      },
    ],
    featured: false,
    color: "#C9A84C",
  },
  {
    id: "cc2",
    category: "case",
    badge: "badge-gold",
    tag: "Case Competitions",
    name: "Case Comp + 1 Live Project",
    tagline: "Case mastery with real domain project experience",
    price: "₹8,499",
    original: "₹8,999",
    href: "https://www.mbapartner.in/category/case-competition",
    tiers: [
      {
        name: "Includes",
        features: [
          "4 Case Competition sessions (2 hrs each)",
          "Led by AIR 1",
          "30+ winning case PPTs",
          "Canva Premium — 1 year",
          "1 Live Project — any domain",
          "2-month project duration",
        ],
      },
    ],
    featured: false,
    color: "#C9A84C",
  },

  /* ── LIVE PROJECTS ───────────────────────────────────────────────────── */
  {
    id: "lp1",
    category: "live",
    badge: "badge-green",
    tag: "Live Projects",
    name: "Live Project — Any 1 Domain",
    tagline: "Real consulting experience across your chosen domain",
    price: "₹4,000",
    original: "₹4,500",
    href: "https://www.mbapartner.in/category/live-projects",
    tiers: [
      {
        name: "Includes",
        features: [
          "1-month live project duration",
          "Choice of domain: Consulting, Finance, HR, Marketing, Operations, or Product Mgmt",
          "Certificate of completion",
          "CV-ready deliverable",
          "Weekly mentor-guided sessions",
        ],
      },
    ],
    featured: false,
    color: "#4ADE80",
  },
  {
    id: "lp2",
    category: "live",
    badge: "badge-green",
    tag: "Live Projects",
    name: "Live Projects — Any 2 Domains",
    tagline: "Dual domain exposure for a stronger, broader profile",
    price: "₹7,500",
    original: "₹7,999",
    href: "https://www.mbapartner.in/category/live-projects",
    tiers: [
      {
        name: "Includes",
        features: [
          "2-month live project duration",
          "2 domains of your choice",
          "2 certificates of completion",
          "2 CV-ready deliverables",
          "Weekly mentor-guided sessions per domain",
        ],
      },
    ],
    featured: false,
    color: "#4ADE80",
  },

  /* ── ALL-IN-ONE COMBOS ───────────────────────────────────────────────── */
  {
    id: "ai1",
    category: "combo",
    badge: "badge-rose",
    tag: "All-in-One",
    name: "Master Placements Bootcamp + Case Comp",
    tagline: "The complete placement & competition package",
    price: "₹9,499",
    original: "₹9,999",
    href: "https://www.mbapartner.in/category/all-in-one-combos",
    tiers: [
      {
        name: "Master",
        features: [
          "5 CV review slots",
          "7 Mock PIs + 7 Mock GDs",
          "2 Domain sessions per domain",
          "4 Case Comp sessions (2 hrs each) — AIR 1",
          "30+ winning case PPTs",
          "Canva Premium — 1 year",
        ],
      },
    ],
    featured: false,
    color: "#FDA4AF",
  },
  {
    id: "ai2",
    category: "combo",
    badge: "badge-rose",
    tag: "All-in-One — Best Value",
    name: "Master Bootcamp + Case Comp + 1 Live Project",
    tagline: "Everything you need to dominate SIP and Final Placements",
    price: "₹13,999",
    original: "₹14,500",
    href: "https://www.mbapartner.in/product-page/master-placements-bootcamp-case-comp-1-live-project",
    tiers: [
      {
        name: "Includes Everything",
        features: [
          "5 CV review slots",
          "7 Mock PIs + 7 Mock GDs",
          "2 Complementary domain sessions",
          "4 Case Comp sessions (2 hrs) — AIR 1",
          "30+ winning case PPTs",
          "Canva Premium — 1 year",
          "1 Live Project — any domain",
          "2-month live project duration",
          "8 weekly sessions (recordings provided)",
        ],
      },
    ],
    featured: true,
    color: "#FDA4AF",
  },
];

const domains = [
  { name: "Consulting", icon: "💼" },
  { name: "Finance", icon: "📊" },
  { name: "Marketing", icon: "📣" },
  { name: "Human Resources", icon: "🤝" },
  { name: "Operations", icon: "⚙️" },
  { name: "Product Management", icon: "🚀" },
];

export default function Courses() {
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? courses : courses.filter(c => c.category === active);

  return (
    <section id="courses" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Courses & Pricing</span>
            </div>
            <h2 className="font-display font-black leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--text)" }}>
              Real Courses.<br />
              <span className="text-gold-gradient">Transparent Pricing.</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="leading-relaxed" style={{ color: "var(--muted)", fontSize: "1rem" }}>
              Every programme is built and delivered by IIM alumni. Choose your level — or combine for maximum impact.
            </p>
            <p className="mt-3 text-sm font-semibold" style={{ color: "var(--gold)" }}>
              <Tag size={13} className="inline mr-1.5 mb-0.5" />
              All prices are at a limited-period discount.
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200"
              style={active === t.id
                ? { background: "var(--gold)", color: "#040D1E" }
                : { background: "var(--navy-card)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(c => (
            <div
              key={c.id}
              className={`program-card rounded-2xl p-7 flex flex-col relative ${c.featured ? "featured" : ""}`}
            >
              {c.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="btn-gold px-5 py-1.5 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                    ⭐ Best Value
                  </span>
                </div>
              )}

              {/* Category badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`${c.badge} px-3 py-1 rounded-full`}>{c.tag}</span>
                <div className="text-right">
                  <div className="text-xs line-through" style={{ color: "var(--muted2)" }}>{c.original}</div>
                  <div className="font-display font-black text-xl" style={{ color: c.featured ? "var(--gold)" : "var(--text)" }}>
                    {c.price}
                  </div>
                </div>
              </div>

              <h3 className="font-display font-bold text-lg mb-1 leading-snug" style={{ color: "var(--text)" }}>{c.name}</h3>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>{c.tagline}</p>

              {/* Tiers */}
              <div className="flex-1 space-y-4 mb-6">
                {c.tiers.map(tier => (
                  <div key={tier.name}>
                    <div className="text-xs font-bold tracking-widest uppercase mb-2.5" style={{ color: "var(--gold)" }}>
                      {tier.name}
                    </div>
                    <ul className="space-y-2">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--muted)" }}>
                          <Check size={13} className="mt-0.5 flex-shrink-0" style={{ color: c.color }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={`block text-center py-3.5 rounded-xl font-semibold tracking-wide text-sm transition-all ${c.featured ? "btn-gold" : "btn-outline-gold"}`}
              >
                {c.featured ? "Enroll Now — Best Value" : "Enroll Now"}
              </a>
            </div>
          ))}
        </div>

        {/* Domain strip */}
        <div className="glass border-gold rounded-2xl p-8">
          <p className="text-center text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "var(--muted2)" }}>
            Live Project Domains Available
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {domains.map(d => (
              <div
                key={d.name}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
                style={{ background: "var(--navy-card)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span style={{ fontSize: "1.2rem" }}>{d.icon}</span>
                <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
