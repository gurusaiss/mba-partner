"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function CountUpStat({ raw, label }: { raw: string; label: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:"8px",
      padding:"32px 28px",
      background: "linear-gradient(160deg, #131420 0%, #0F1018 100%)" }}>
      <div className="stat-num" style={{ fontSize:"3.2rem", paddingBottom:"8px", borderBottom:"2px solid rgba(240,170,0,0.6)", lineHeight:1 }}>
        {display}
      </div>
      <div style={{ fontSize:"0.92rem", color:"var(--muted)", letterSpacing:"0.04em", fontWeight:600 }}>{label}</div>
    </div>
  );
}

const stats = [
  { value: "5,000+", label: "Student Network" },
  { value: "9.6/10", label: "Average Rating" },
  { value: "98.7%", label: "Placement Rate" },
  { value: "700+", label: "Verified Reviews" },
];

const highlights = [
  "Live Projects across 6 domains — real CV deliverables",
  "Case Competition coaching by AIR 1, AIR 6, AIR 10",
  "SIP & Final Placement Bootcamp — CV to offer",
  "5-year Placement Intelligence Repository",
];

const companies = ["McKinsey", "Goldman Sachs", "BCG", "Bain", "HUL", "Amazon", "Deloitte", "EY", "TAS", "Kearney", "L'Oreal", "Accenture"];

export default function Hero() {
  return (
    <section id="home" style={{
      backgroundImage: `
        radial-gradient(ellipse 90% 70% at 50% -10%, rgba(240,170,0,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 50% 55% at 90% 65%, rgba(99,102,241,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 5% 80%, rgba(240,170,0,0.05) 0%, transparent 60%),
        linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px),
        var(--navy)
      `,
      backgroundSize: "100% 100%, 100% 100%, 100% 100%, 64px 64px, 64px 64px, 100% 100%",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      paddingTop: "68px",
    }}>
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "72px 48px", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "72px", alignItems: "center" }}>

          {/* Left — copy */}
          <div>
            <div className="section-label" style={{ marginBottom: "28px", fontSize: "0.72rem" }}>
              Founded by IIM Alumni · 5,000+ Students
            </div>

            <h1 className="serif" style={{
              fontSize: "clamp(3.5rem, 5.8vw, 6.8rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: "28px",
            }}>
              The Mentorship<br />Platform{" "}
              <span style={{
                background: "linear-gradient(128deg, #EDD47A 0%, #D4AA52 45%, #B8943C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline",
              }}>
                Serious<br />MBA Students
              </span>{" "}Rely On.
            </h1>

            <p style={{ color: "var(--muted)", fontSize: "1.12rem", lineHeight: 1.8, marginBottom: "40px", maxWidth: "520px" }}>
              Live Projects. Case Competitions. Placement Prep. A curated five-year Resource Repository.
              All delivered by IIM alumni who have been exactly where you are.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "52px" }}>
              <a href="#courses" className="btn-primary pulse" data-animate="pulse" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                View Courses <ArrowRight size={16} />
              </a>
              <a href="#enroll" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Free Enquiry
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {highlights.map(h => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2 size={19} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats + companies */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Stats 2×2 */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px",
              background: "rgba(240,170,0,0.08)",
              borderRadius: "20px", overflow: "hidden",
              border: "1px solid rgba(240,170,0,0.18)",
              boxShadow: "0 0 50px rgba(240,170,0,0.06), inset 0 1px 0 rgba(240,170,0,0.10)",
            }}>
              {stats.map(s => <CountUpStat key={s.label} raw={s.value} label={s.label} />)}
            </div>

            {/* Placed at card */}
            <div style={{
              background: "linear-gradient(155deg, #0E1D36 0%, #0B1628 100%)",
              border: "1px solid rgba(255,255,255,0.10)",
              borderRadius: "18px",
              padding: "28px",
            }}>
              <div style={{ fontSize: "0.7rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
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
                    padding: "8px 16px",
                    fontSize: "0.92rem",
                    color: "var(--text)",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                  }}>{c}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
