"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

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
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [raw]);

  return <span ref={ref}>{display}</span>;
}

const highlights = [
  "Live Projects across 6 domains — real CV deliverables",
  "Case Competition coaching by AIR 1, AIR 6, AIR 10",
  "SIP & Final Placement Bootcamp — CV to offer letter",
  "5-year Placement Intelligence Repository",
];

const companies = ["McKinsey", "Goldman Sachs", "BCG", "Bain", "HUL", "Amazon", "Deloitte", "EY", "TAS", "Kearney", "L'Oreal", "Accenture"];

const statsData = [
  { val: "9.6", suffix: "/10", label: "Avg. rating by 700+ students" },
  { val: "5,000", suffix: "+", label: "Student network & growing" },
  { val: "98.7", suffix: "%", label: "Placed in desired domain" },
  { val: "Top", suffix: " 1%", label: "Mentors from IIM A/B/C, XLRI, FMS" },
];

const schoolPills = ["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "XLRI", "FMS Delhi"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

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

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.1) el.classList.add("revealed");
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) (entry.target as HTMLElement).classList.add("revealed");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    elements.forEach((el) => { if (!el.classList.contains("revealed")) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 70% at 50% -10%, rgba(249,115,22,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 50% 55% at 90% 65%, rgba(56,189,248,0.05) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 5% 80%, rgba(249,115,22,0.04) 0%, transparent 60%),
          linear-gradient(var(--grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
          var(--navy)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 60px 60px, 60px 60px, 100% 100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "68px",
        position: "relative",
        animation: "heroGlow 8s ease-in-out infinite",
      }}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: isMobile ? "48px 20px" : "72px 48px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
            gap: isMobile ? "40px" : "64px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Headline + CTAs + Bullets ── */}
          <div>
            {/* Eyebrow badge */}
            <div
              data-reveal
              className="reveal-slide-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.22)",
                borderRadius: "100px", padding: "6px 16px", marginBottom: "10px",
                fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.10em", textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--gold)", display: "inline-block", flexShrink: 0 }} />
              Initiative by Alumni of Old IIMs
            </div>

            {/* H1 */}
            <h1
              data-reveal
              className="reveal-slide-up"
              style={{
                fontSize: isMobile ? "clamp(2.6rem, 10vw, 3.8rem)" : "clamp(3rem, 5vw, 5.8rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                marginBottom: "24px",
                marginTop: "16px",
                fontFamily: "var(--font-sans)",
              }}
            >
              Get Mentored.<br />
              Get{" "}
              <span style={{
                background: "linear-gradient(128deg, #F97316 0%, #FB923C 45%, #EA6700 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Placed.</span>
            </h1>

            {/* Sub */}
            <p
              data-reveal
              className="reveal-slide-up"
              style={{ color: "var(--muted)", fontSize: isMobile ? "1rem" : "1.08rem", lineHeight: 1.75, marginBottom: "32px", maxWidth: "500px" }}
            >
              Join 5,000+ MBA students getting live consulting projects, case competition wins
              and placement bootcamps — all mentored by alumni from IIM, XLRI & FMS.
            </p>

            {/* Urgency pill */}
            <div
              data-reveal
              className="reveal-slide-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)",
                borderRadius: "100px", padding: "6px 14px", marginBottom: "24px",
                fontSize: "0.78rem", color: "#FCA5A5", fontWeight: 600,
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulse 2s infinite" }} />
              Next batch closing — 12 seats remaining
            </div>

            {/* CTAs */}
            <div data-reveal className="reveal-slide-up" style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
              <a href="#courses" className="btn-primary pulse" style={{ fontSize: "0.93rem", padding: "13px 28px" }}>
                Explore Courses <ArrowRight size={16} />
              </a>
              <a href="#enroll" className="btn-secondary" style={{ fontSize: "0.93rem", padding: "13px 28px" }}>
                Free Enquiry
              </a>
            </div>

            <div data-reveal className="reveal-slide-up" style={{ fontSize: "0.8rem", color: "var(--dim)", marginBottom: "32px" }}>
              Starting from <strong style={{ color: "var(--muted)" }}>₹3,499</strong> · EMI from <strong style={{ color: "var(--muted)" }}>₹583/month</strong>
            </div>

            {/* Highlights */}
            <div data-reveal className="reveal-slide-up" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {highlights.map(h => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <CheckCircle2 size={17} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Community row */}
            <div data-reveal className="reveal-slide-up" style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="https://chat.whatsapp.com/EdyvGJbQoV9Jj6eC0slSx9"
                target="_blank" rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(37,211,102,0.09)", border: "1px solid rgba(37,211,102,0.28)",
                  borderRadius: "100px", padding: "9px 18px",
                  fontSize: "0.85rem", fontWeight: 700, color: "#25D366", textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,211,102,0.16)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,211,102,0.09)")}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Community
              </a>
              <span style={{ fontSize: "0.76rem", color: "var(--dim)" }}>Free resources & 5,000+ students</span>
            </div>

            {/* Mobile stats */}
            {isMobile && (
              <div
                data-reveal
                className="reveal-slide-up"
                style={{ marginTop: "36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
              >
                {statsData.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "16px",
                      padding: "18px 16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.7rem", fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--gold)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {s.val}<span style={{ fontSize: "1rem" }}>{s.suffix}</span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "6px", lineHeight: 1.4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Stats panel + Companies (desktop only) ── */}
          {!isMobile && (
            <div data-reveal className="reveal-fade-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

              {/* Stats Panel */}
              <div
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl), 0 0 0 1px rgba(249,115,22,0.06)",
                }}
              >
                {/* Header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 22px",
                  borderBottom: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.015)",
                }}>
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)" }}>
                    Cohort Snapshot
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulse 2s infinite" }} />
                    <span style={{ fontSize: "0.68rem", color: "#10B981", fontWeight: 600 }}>Live</span>
                  </div>
                </div>

                {/* 2x2 grid stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  {statsData.map((s, i) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "22px",
                        borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                        borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      <div style={{
                        fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-display)",
                        background: "linear-gradient(135deg, #F97316, #FB923C)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "6px",
                      }}>
                        <CountUpNum raw={s.val} />
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>{s.suffix}</span>
                      </div>
                      <div style={{ fontSize: "0.76rem", color: "var(--muted)", lineHeight: 1.4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* School pills footer */}
                <div style={{
                  padding: "16px 22px",
                  borderTop: "1px solid var(--border)",
                  background: "rgba(249,115,22,0.02)",
                }}>
                  <div style={{ fontSize: "0.65rem", color: "var(--dim)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "10px" }}>
                    MENTOR SCHOOLS
                  </div>
                  <div className="school-pills">
                    {schoolPills.map(p => (
                      <span key={p} className="school-pill">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Companies placed at */}
              <div style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "18px",
                padding: "22px",
              }}>
                <div style={{ fontSize: "0.68rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "inline-block", width: "18px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
                  Students Placed At
                  <span style={{ display: "inline-block", width: "18px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {companies.map(c => (
                    <span key={c} style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      fontSize: "0.84rem",
                      color: "var(--text)",
                      fontWeight: 500,
                    }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "5px",
          opacity: showScrollIndicator ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "0.68rem", color: "var(--dim)", letterSpacing: "0.10em", textTransform: "uppercase", fontWeight: 600 }}>
          Scroll
        </span>
        <ChevronDown size={18} style={{ color: "var(--gold)", animation: "scrollBounce 1.6s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
