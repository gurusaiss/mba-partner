"use client";

import { useState } from "react";

const features = [
  { feature: "Live IIM Alumni Mentors", us: true, them: false, note: "Not pre-recorded videos" },
  { feature: "Real CV Reviews (5 slots)", us: true, them: false, note: "Actual feedback, not templates" },
  { feature: "Placement Data (5 Years)", us: true, them: false, note: "Real salary & shortlist data" },
  { feature: "Mock PI with Recording", us: true, them: false, note: "Watch yourself improve" },
  { feature: "Case Competition Coaching", us: true, them: false, note: "AIR 1 coached" },
  { feature: "Live Projects (CV-worthy)", us: true, them: false, note: "Real deliverables" },
  { feature: "Mentor Matched in 24hrs", us: true, them: false, note: "Domain + company aligned" },
  { feature: "Community of 5,000+", us: true, them: true, note: "Active WhatsApp groups" },
  { feature: "Price Under ₹15,000", us: true, them: false, note: "Full master bundle" },
  { feature: "7-Day Refund Guarantee", us: true, them: false, note: "No questions asked" },
];

function CheckCircle({ yes }: { yes: boolean }) {
  return (
    <div
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: yes ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.10)",
        color: yes ? "#34D399" : "#F87171",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "0.82rem",
        fontWeight: 800,
        flexShrink: 0,
      }}
    >
      {yes ? "✓" : "✕"}
    </div>
  );
}

function CTAButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textAlign: "center",
        padding: "14px 24px",
        borderRadius: 12,
        fontWeight: 700,
        fontSize: "1rem",
        textDecoration: "none",
        transition: "all 0.22s",
        ...(primary
          ? {
              background: hovered ? "var(--gold2)" : "var(--gold)",
              color: "#030712",
            }
          : {
              background: hovered ? "rgba(255,255,255,0.07)" : "transparent",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }),
      }}
    >
      {children}
    </a>
  );
}

export default function WhyDifferent() {
  return (
    <section style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)" }}>
      <style>{`
        [data-theme="light"] .wd-table-card {
          background: var(--card) !important;
          box-shadow: var(--shadow-md) !important;
        }
        [data-theme="light"] .wd-row-border {
          border-bottom-color: var(--border) !important;
        }
        [data-theme="light"] .wd-header-row {
          border-bottom-color: var(--border) !important;
        }
        @media (max-width: 900px) {
          .wd-layout { flex-direction: column !important; }
          .wd-left { width: 100% !important; }
          .wd-right { width: 100% !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>WHY CHOOSE US</div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
            }}
          >
            Not Your Average MBA Coaching
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--muted)",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            We built what we wished existed when we were at IIM.
          </p>
        </div>

        <div
          className="wd-layout"
          style={{ display: "flex", gap: 28, alignItems: "flex-start" }}
        >
          <div
            className="wd-left wd-table-card"
            style={{
              width: "60%",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              className="wd-header-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 130px 100px",
                padding: "14px 28px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Feature
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--gold)", textAlign: "center" }}>
                MBA Partner ✓
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--muted)", textAlign: "center", opacity: 0.6 }}>
                Others ✗
              </span>
            </div>

            {features.map((f, i) => (
              <div
                key={i}
                className={i !== features.length - 1 ? "wd-row-border" : ""}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 130px 100px",
                  padding: "16px 28px",
                  borderBottom: i !== features.length - 1 ? "1px solid var(--border)" : "none",
                  background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.95rem", color: "var(--text)", fontWeight: 500 }}>
                    {f.feature}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>
                    {f.note}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CheckCircle yes={f.us} />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <CheckCircle yes={f.them} />
                </div>
              </div>
            ))}
          </div>

          <div className="wd-right" style={{ width: "40%", display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: "linear-gradient(145deg, rgba(255,107,0,0.08) 0%, rgba(255,107,0,0.03) 100%)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 4, fontWeight: 600 }}>
                starting from
              </div>
              <div
                className="serif"
                style={{ fontSize: "3rem", fontWeight: 800, color: "var(--gold)", lineHeight: 1.1, marginBottom: 24 }}
              >
                ₹3,499
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[
                  ["98.7%", "placement rate"],
                  ["9.6/10", "avg rating"],
                  ["5,000+", "students"],
                ].map(([val, label], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 800, fontSize: "1rem", color: "var(--gold)" }}>{val}</span>
                    <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{label}</span>
                  </div>
                ))}
              </div>

              <CTAButton href="#enroll" primary>
                Start Your Journey →
              </CTAButton>
            </div>

            <div
              style={{
                background: "linear-gradient(145deg, rgba(0,178,255,0.07) 0%, rgba(0,178,255,0.03) 100%)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: 28,
              }}
            >
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 10 }}>
                Questions? Get free counselling
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: 20, lineHeight: 1.6 }}>
                Our team will call you within 24 hours to recommend the right package for your goals.
              </p>
              <CTAButton href="#enroll">Talk to a Mentor →</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
