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

          <div>
            <div className="section-label" style={{ marginBottom: "28px", fontSize: "0.72rem" }}>
              India's #1 MBA Career Platform · Founded by IIM Alumni
            </div>

            <h1 className="serif" style={{
              fontSize: "clamp(3.5rem, 5.8vw, 6.8rem)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: "28px",
            }}>
              India's Premier<br />
              <span style={{
                background: "linear-gradient(128deg, #EDD47A 0%, #D4AA52 45%, #B8943C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline",
              }}>
                MBA Career
              </span><br />
              Platform
            </h1>

            <p style={{ color: "var(--muted)", fontSize: "1.12rem", lineHeight: 1.8, marginBottom: "40px", maxWidth: "520px" }}>
              Live Projects. Case Competitions. Placement Prep. A curated five-year Resource Repository.
              All delivered by IIM alumni who have been exactly where you are.
            </p>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "100px",
              padding: "6px 14px",
              marginBottom: "18px",
              fontSize: "0.78rem",
              color: "#FCA5A5",
              fontWeight: 600,
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulse 2s infinite" }} />
              Next batch closing — 12 seats remaining
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "12px" }}>
              <a href="#courses" className="btn-primary pulse" data-animate="pulse" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                View Courses <ArrowRight size={16} />
              </a>
              <a href="#enroll" className="btn-secondary" style={{ fontSize: "0.95rem", padding: "14px 32px" }}>
                Free Enquiry
              </a>
            </div>

            <div style={{ fontSize: "0.82rem", color: "var(--dim)", marginTop: "-36px", marginBottom: "52px" }}>
              Starting from <strong style={{ color: "var(--muted)" }}>₹3,499</strong> · EMI from <strong style={{ color: "var(--muted)" }}>₹583/month</strong> · No cost EMI available
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {highlights.map(h => (
                <div key={h} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2 size={19} style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "1.15rem", color: "var(--muted)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "32px", paddingTop: "28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="https://wa.me/918686863183"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(37,211,102,0.10)",
                  border: "1px solid rgba(37,211,102,0.30)",
                  borderRadius: "100px",
                  padding: "10px 20px",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: "#25D366",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(37,211,102,0.18)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(37,211,102,0.10)")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Join 5,000+ on WhatsApp
              </a>
              <span style={{ fontSize: "0.78rem", color: "var(--dim)" }}>Free placement resources, tips & community</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "2px",
              background: "rgba(240,170,0,0.08)",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(240,170,0,0.18)",
              boxShadow: "0 0 50px rgba(240,170,0,0.06), inset 0 1px 0 rgba(240,170,0,0.10)",
            }}>
              <div style={{ gridColumn: "span 2" }}><CountUpStat raw="5,000+" label="Students Mentored" /></div>
              <div style={{ gridColumn: "span 2" }}><CountUpStat raw="9.6/10" label="Average Rating" /></div>
              <div style={{ gridColumn: "span 2" }}><CountUpStat raw="98.7%" label="Placement Rate" /></div>
              <div style={{ gridColumn: "span 3" }}><CountUpStat raw="₹38L+" label="Avg Package" /></div>
              <div style={{ gridColumn: "span 3" }}><CountUpStat raw="700+" label="Verified Reviews" /></div>
            </div>

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
