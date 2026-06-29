"use client";

import { useState, useId, useRef, KeyboardEvent } from "react";
import { ChevronDown, Search } from "lucide-react";

type Category = "All" | "General" | "Courses" | "Pricing" | "Placements";

interface FAQ {
  q: string;
  a: string;
  category: Category;
}

const faqs: FAQ[] = [
  {
    q: "When should I start Placement Prep?",
    a: "Ideally 4–6 months before your SIP season. Term 1–2 is perfect for Live Projects and Case Competition Bootcamp to build your profile. Start the Placement Bootcamp (Mock PIs, GDs, CV) in Term 3–4.",
    category: "Placements",
  },
  {
    q: "What is the difference between Master and Mini Placement Bootcamp?",
    a: "Master includes 5 CV reviews, 7 Mock PIs, 7 Mock GDs, AI platform access, 100+ HR contacts, and record-breaking result support. Mini includes 3 CV reviews, 5 Mock PIs, 5 Mock GDs — ideal if you want to start light. Both can be topped up later.",
    category: "Courses",
  },
  {
    q: "Are the Live Projects real or simulated?",
    a: "These are real projects under Prodmark Business Consultants Pvt. Ltd. — not coursework. You work on actual deliverables (financial models, strategy decks, brand plans) with IIM alumni oversight. You get a Certificate of Completion and 5 ATS-friendly CV points.",
    category: "Courses",
  },
  {
    q: "Can two friends enroll together and get a discount?",
    a: "Yes! Group offers are available: 2 students = 30% off (Case Comps, Live Projects, Certifications) or 20% off (Placements). 3 or more students = 40% off (Case Comps, Certifications) or 30% off (Placements). Use the group enrollment form in the Group Offer section.",
    category: "Pricing",
  },
  {
    q: "Who are the mentors? Are they really IIM alumni?",
    a: "All mentors are verified IIM/top B-school alumni placed at top firms. You are matched within 24 hours to a mentor aligned to your domain and target companies. 90% of our mentors were once MBA Partner students themselves.",
    category: "General",
  },
  {
    q: "Is the Case Competition Bootcamp only for beginners?",
    a: "No. It is coached by AIR 1, AIR 6, AIR 10, and AIR 15 from Unstop. Whether you are a beginner or have already participated, the 30+ national finals PPTs, winning frameworks, and Canva Pro access will sharpen your edge significantly.",
    category: "Courses",
  },
  {
    q: "How do I access materials after enrolling?",
    a: "After enrolling, you receive login credentials to your student dashboard where all sessions, PPTs, CV templates, transcripts, and project materials are organized by course.",
    category: "General",
  },
  {
    q: "What is the Group Discussion format in the Placement Bootcamp?",
    a: "Mock GDs are conducted in small groups of 5–8 students, just like actual placement GDs. You receive detailed written feedback on content, communication, leadership, and participation quality after every session.",
    category: "Placements",
  },
  {
    q: "What is the pricing for the All-in-One Combo?",
    a: "The All-in-One Combo bundles Live Projects, Case Competition Bootcamp, and Placement Bootcamp at a significant discount versus purchasing separately. Exact pricing is shown in the Courses section — use the group discount on top for maximum savings.",
    category: "Pricing",
  },
  {
    q: "Do I get a certificate after completing a course?",
    a: "Yes. Every course comes with a Certificate of Completion from MBA Partner / Prodmark Business Consultants. Live Project certificates carry real project details that are verifiable by recruiters.",
    category: "General",
  },
];

const CATEGORIES: Category[] = ["All", "General", "Courses", "Pricing", "Placements"];

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const sectionId = useId();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function toggle(i: number) {
    setOpen(prev => (prev === i ? null : i));
  }

  const filtered = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || faq.q.toLowerCase().includes(term) || faq.a.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  function handleItemKeyDown(e: KeyboardEvent<HTMLButtonElement>, visibleIndex: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(visibleIndex);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[visibleIndex + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemRefs.current[visibleIndex - 1]?.focus();
    }
  }

  return (
    <section
      id="faqs"
      role="region"
      aria-label="Frequently Asked Questions"
      style={{ padding: "96px 0", background: "linear-gradient(180deg, #0D0A1A 0%, #100C20 100%)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <div className="section-label">FAQs</div>
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "0" }}>
            Questions Students Always Ask
          </h2>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--dim)", pointerEvents: "none", display: "flex" }}>
            <Search size={16} />
          </span>
          <input
            type="search"
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search frequently asked questions"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "12px 16px 12px 44px",
              fontSize: "0.95rem",
              color: "var(--text)",
              outline: "none",
              fontFamily: "var(--font-sans)",
              transition: "border-color 0.2s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)")}
            onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Filter FAQs by category"
          style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}
        >
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 18px",
                  borderRadius: "999px",
                  border: isActive ? "1px solid rgba(249,115,22,0.6)" : "1px solid var(--border)",
                  background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
                  color: isActive ? "var(--gold)" : "var(--muted)",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  transition: "all 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "var(--text)"; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; } }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "56px 0", color: "var(--dim)" }}>
            <Search size={32} style={{ marginBottom: "16px", opacity: 0.4 }} />
            <p style={{ fontSize: "1rem", margin: 0 }}>No results found for &ldquo;{search}&rdquo;</p>
            <p style={{ fontSize: "0.875rem", marginTop: "8px", opacity: 0.7 }}>Try a different keyword or category.</p>
          </div>
        ) : (
          <div
            role="tabpanel"
            aria-label={`${activeCategory} FAQs`}
            style={{ display: "flex", flexDirection: "column", gap: "0" }}
          >
            {filtered.map((faq, visibleIndex) => {
              const isOpen = open === visibleIndex;
              const answerId = `${sectionId}-answer-${visibleIndex}`;
              const questionId = `${sectionId}-question-${visibleIndex}`;
              return (
                <div
                  key={`${faq.category}-${visibleIndex}`}
                  style={{
                    borderRadius: isOpen ? "12px" : "0",
                    borderLeft: isOpen ? "3px solid var(--gold)" : "3px solid transparent",
                    paddingLeft: isOpen ? "16px" : "0",
                    marginBottom: isOpen ? "8px" : "0",
                    transition: "all 0.25s ease",
                    background: isOpen ? "rgba(249,115,22,0.04)" : "transparent",
                    borderBottom: "1px solid var(--border)",
                    borderTop: visibleIndex === 0 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <button
                    id={questionId}
                    ref={el => { itemRefs.current[visibleIndex] = el; }}
                    onClick={() => toggle(visibleIndex)}
                    onKeyDown={e => handleItemKeyDown(e, visibleIndex)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      padding: "22px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "24px",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={e => !isOpen && (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                    onMouseLeave={e => !isOpen && (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: "1rem", fontWeight: isOpen ? 700 : 600, color: "var(--text)", lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span style={{
                      flexShrink: 0,
                      width: "30px", height: "30px",
                      borderRadius: "50%",
                      border: `1px solid ${isOpen ? "rgba(249,115,22,0.5)" : "var(--border)"}`,
                      background: isOpen ? "rgba(249,115,22,0.08)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.25s ease",
                      color: isOpen ? "var(--gold)" : "var(--muted)",
                    }}>
                      <ChevronDown size={16} style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </span>
                  </button>
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                    style={{
                      maxHeight: isOpen ? "400px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div style={{ paddingBottom: "22px" }}>
                      <p style={{ color: "var(--muted)", fontSize: "0.95rem", lineHeight: 1.78, margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
