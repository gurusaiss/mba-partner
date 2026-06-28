"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "When should I start Placement Prep?",
    a: "Ideally 4–6 months before your SIP season. Term 1–2 is perfect for Live Projects and Case Competition Bootcamp to build your profile. Start the Placement Bootcamp (Mock PIs, GDs, CV) in Term 3–4.",
  },
  {
    q: "What is the difference between Master and Mini Placement Bootcamp?",
    a: "Master includes 5 CV reviews, 7 Mock PIs, 7 Mock GDs, AI platform access, 100+ HR contacts, and record-breaking result support. Mini includes 3 CV reviews, 5 Mock PIs, 5 Mock GDs — ideal if you want to start light. Both can be topped up later.",
  },
  {
    q: "Are the Live Projects real or simulated?",
    a: "These are real projects under Prodmark Business Consultants Pvt. Ltd. — not coursework. You work on actual deliverables (financial models, strategy decks, brand plans) with IIM alumni oversight. You get a Certificate of Completion and 5 ATS-friendly CV points.",
  },
  {
    q: "Can two friends enroll together and get a discount?",
    a: "Yes! Group offers are available: 2 students = 30% off (Case Comps, Live Projects, Certifications) or 20% off (Placements). 3 or more students = 40% off (Case Comps, Certifications) or 30% off (Placements). Use the group enrollment form in the Group Offer section.",
  },
  {
    q: "Who are the mentors? Are they really IIM alumni?",
    a: "All mentors are verified IIM/top B-school alumni placed at top firms. You are matched within 24 hours to a mentor aligned to your domain and target companies. 90% of our mentors were once MBA Partner students themselves.",
  },
  {
    q: "Is the Case Competition Bootcamp only for beginners?",
    a: "No. It is coached by AIR 1, AIR 6, AIR 10, and AIR 15 from Unstop. Whether you are a beginner or have already participated, the 30+ national finals PPTs, winning frameworks, and Canva Pro access will sharpen your edge significantly.",
  },
  {
    q: "How do I access materials after enrolling?",
    a: "After enrolling, you receive login credentials to your student dashboard where all sessions, PPTs, CV templates, transcripts, and project materials are organized by course.",
  },
  {
    q: "What is the Group Discussion format in the Placement Bootcamp?",
    a: "Mock GDs are conducted in small groups of 5–8 students, just like actual placement GDs. You receive detailed written feedback on content, communication, leadership, and participation quality after every session.",
  },
];

export default function FAQs() {
  const [open, setOpen] = useState<number | null>(null);

  function toggle(i: number) {
    setOpen(prev => (prev === i ? null : i));
  }

  return (
    <section id="faqs" style={{ padding: "96px 0", background: "var(--card)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px", textAlign: "center" }}>
          <div className="section-label">FAQs</div>
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Questions Students Always Ask
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: isOpen ? "12px" : "0",
                  borderLeft: isOpen ? "3px solid var(--gold)" : "3px solid transparent",
                  paddingLeft: isOpen ? "16px" : "0",
                  marginBottom: isOpen ? "8px" : "0",
                  transition: "all 0.25s ease",
                  background: isOpen ? "rgba(240,170,0,0.04)" : "transparent",
                  borderBottom: "1px solid var(--border)",
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                }}
              >
                <button
                  onClick={() => toggle(i)}
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
                  <span style={{
                    fontSize: "1rem",
                    fontWeight: isOpen ? 700 : 600,
                    color: "var(--text)",
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    width: "30px", height: "30px",
                    borderRadius: "50%",
                    border: `1px solid ${isOpen ? "rgba(240,170,0,0.5)" : "var(--border)"}`,
                    background: isOpen ? "rgba(240,170,0,0.08)" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                    color: isOpen ? "var(--gold)" : "var(--muted)",
                  }}>
                    <ChevronDown size={16} style={{ transition: "transform 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? "400px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
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

      </div>
    </section>
  );
}
