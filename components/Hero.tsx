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

const cohortStats = [
  { label: "Average student rating", val: "9.6", suffix: "/10", color: "#F97316" },
  { label: "Placed in desired domain", val: "98.7", suffix: "%", color: "#10B981" },
  { label: "Average package", val: "38", suffix: "L+", prefix: "₹", color: "#3B82F6" },
  { label: "Students mentored", val: "5,000", suffix: "+", color: "#60A5FA" },
  { label: "Verified reviews", val: "700", suffix: "+", color: "#F59E0B" },
];

const mobileStats = [
  { label: "Rating", val: "9.6", suffix: "/10", color: "#F97316" },
  { label: "Placed", val: "98.7", suffix: "%", color: "#10B981" },
  { label: "Avg pkg", val: "38", suffix: "L+", prefix: "₹", color: "#3B82F6" },
  { label: "Students", val: "5,000", suffix: "+", color: "#60A5FA" },
];

const highlights = [
  "Live Projects across 6 domains — real CV deliverables",
  "Case Competition coaching by AIR 1, AIR 6, AIR 10",
  "SIP & Final Placement Bootcamp — CV to offer",
  "5-year Placement Intelligence Repository",
];

const companies = ["McKinsey", "Goldman Sachs", "BCG", "Bain", "HUL", "Amazon", "Deloitte", "EY", "TAS", "Kearney", "L'Oreal", "Accenture"];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Responsive detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll indicator fade
  useEffect(() => {
    const onScroll = () => setShowScrollIndicator(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal via IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    // Reveal immediately any element already in viewport
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.1) {
        el.classList.add("revealed");
      }
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );
    elements.forEach((el) => {
      if (!el.classList.contains("revealed")) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="hero-section"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 90% 70% at 50% -10%, rgba(249,115,22,0.09) 0%, transparent 60%),
          radial-gradient(ellipse 50% 55% at 90% 65%, rgba(59,130,246,0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 5% 80%, rgba(249,115,22,0.05) 0%, transparent 60%),
          linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px),
          var(--navy)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 64px 64px, 64px 64px, 100% 100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "68px",
        position: "relative",
        animation: "heroGlow 8s ease-in-out infinite",
      }}
    >
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: isMobile ? "48px 24px" : "72px 48px", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr",
            gap: isMobile ? "40px" : "72px",
            alignItems: "center",
          }}
        >
          {/* Left: Headline + CTAs + Bullets */}
          <div>
            {/* India's Premier MBA Career Platform — highlighted badge */}
            <div
              data-reveal
              className="reveal-slide-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, rgba(232,93,4,0.12), rgba(249,115,22,0.06))",
                border: "1px solid rgba(232,93,4,0.28)",
                borderRadius: "100px", padding: "7px 18px", marginBottom: "14px",
                fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase",
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E85D04", display: "inline-block", flexShrink: 0, boxShadow: "0 0 0 2px rgba(232,93,4,0.25)" }} />
              <span style={{
                background: "linear-gradient(90deg, #E85D04 0%, #F97316 50%, #E85D04 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer-gold 2.5s linear infinite",
              }}>India&rsquo;s Premier MBA Career Platform</span>
            </div>

            <div
              data-reveal
              className="reveal-slide-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.16)",
                borderRadius: "100px", padding: "5px 12px", marginBottom: "26px",
                fontSize: "0.7rem", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
              }}
            >
              An initiative by Alumni of Old IIM · Since 2020
            </div>

            <h1
              data-reveal
              className="serif reveal-slide-up"
              style={{
                fontSize: isMobile ? "clamp(2.8rem, 10vw, 4rem)" : "clamp(3.2rem, 5.5vw, 6.4rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: "var(--text)",
                marginBottom: "28px",
              }}
            >
              Get Mentored<br />
              by the{" "}
              <span style={{
                background: "linear-gradient(128deg, #F97316 0%, #E85D04 45%, #C04A00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Top 1%.</span><br />
              <span style={{ fontSize: "0.72em", color: "var(--violet)", fontWeight: 800 }}>Land Your Dream Placement.</span>
            </h1>

            <p
              data-reveal
              className="reveal-slide-up"
              style={{ color: "var(--muted)", fontSize: isMobile ? "1.05rem" : "1.1rem", lineHeight: 1.8, marginBottom: "40px", maxWidth: "520px" }}
            >
              Committee PORs and graduation internships are no longer enough to get shortlisted.
              Build a CV that actually clears the first cut — with IIM, XLRI and FMS mentors guiding every step.
            </p>

            <div
              data-reveal
              className="reveal-slide-up"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "100px", padding: "6px 14px", marginBottom: "20px",
                fontSize: "0.78rem", color: "#FCA5A5", fontWeight: 600,
              }}
            >
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulse 2s infinite" }} />
              Next batch closing — 12 seats remaining
            </div>

            <div data-reveal className="reveal-slide-up" style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "10px" }}>
              <a href="#courses" className="btn-primary pulse" data-animate="pulse" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                View Courses <ArrowRight size={16} />
              </a>
              <a href="#enroll" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Free Enquiry
              </a>
            </div>

            <div data-reveal className="reveal-slide-up" style={{ fontSize: "0.82rem", color: "var(--dim)", marginBottom: "40px" }}>
              Starting from <strong style={{ color: "var(--muted)" }}>₹3,499</strong> · EMI from <strong style={{ color: "var(--muted)" }}>₹583/month</strong> · No cost EMI available
            </div>

            <div data-reveal className="reveal-slide-up" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {highlights.map(h => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2 size={18} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "1.05rem", color: "var(--muted)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>

            <div data-reveal className="reveal-slide-up" style={{ marginTop: "32px", paddingTop: "28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/918686863183"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(37,211,102,0.10)", border: "1px solid rgba(37,211,102,0.30)",
                  borderRadius: "100px", padding: "10px 20px",
                  fontSize: "0.88rem", fontWeight: 700, color: "#25D366", textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,211,102,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,211,102,0.10)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Join 5,000+ on WhatsApp
              </a>
              <span style={{ fontSize: "0.78rem", color: "var(--dim)" }}>Free placement resources, tips &amp; community</span>
            </div>

            {/* Mobile: horizontal stats bar instead of right column */}
            {isMobile && (
              <div
                data-reveal
                className="reveal-slide-up"
                style={{
                  marginTop: "36px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {mobileStats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "linear-gradient(160deg, #0E1117 0%, #0B0E15 100%)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      borderRadius: "14px",
                      padding: "16px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                      {s.prefix}<CountUpNum raw={s.val} /><span style={{ fontSize: "0.85rem", fontWeight: 600, opacity: 0.8 }}>{s.suffix}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "4px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: COHORT SNAPSHOT card + Companies (desktop only) */}
          {!isMobile && (
            <div
              data-reveal
              className="reveal-fade-right"
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {/* COHORT SNAPSHOT */}
              <div style={{
                background: "linear-gradient(160deg, #0E1117 0%, #0B0E15 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.06)",
              }}>
                {/* Card header */}
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "18px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.025)",
                }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
                    Cohort Snapshot
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", display: "inline-block", animation: "pulse 2s infinite" }} />
                    <span style={{ fontSize: "0.7rem", color: "#10B981", fontWeight: 600 }}>Live</span>
                  </div>
                </div>

                {/* Stats rows */}
                <div>
                  {cohortStats.map((s, i) => (
                    <div key={s.label} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "20px 24px",
                      borderBottom: i < cohortStats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ fontSize: "0.9rem", color: "var(--muted)", fontWeight: 500 }}>{s.label}</span>
                      <span style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                        {s.prefix}<CountUpNum raw={s.val} /><span style={{ fontSize: "0.9rem", fontWeight: 600, opacity: 0.8 }}>{s.suffix}</span>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div style={{
                  padding: "14px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(249,115,22,0.03)",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <span style={{ fontSize: "0.72rem", color: "var(--dim)" }}>Data verified · Updated batch 2024–25</span>
                </div>
              </div>

              {/* Companies card */}
              <div style={{
                background: "linear-gradient(155deg, #0E1D36 0%, #0B1628 100%)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "18px",
                padding: "24px",
              }}>
                <div style={{ fontSize: "0.7rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
                  Students Placed At
                  <span style={{ display: "inline-block", width: "20px", height: "1px", background: "var(--gold)", opacity: 0.5 }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {companies.map(c => (
                    <span key={c} style={{
                      background: "rgba(255,255,255,0.055)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "8px",
                      padding: "7px 14px",
                      fontSize: "0.88rem",
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
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: showScrollIndicator ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "0.72rem", color: "var(--dim)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
          Scroll to explore
        </span>
        <ChevronDown
          size={20}
          style={{ color: "var(--gold)", animation: "scrollBounce 1.6s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
