"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const mbaLinks = [
  { label: "Offerings", href: "#offerings" },
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "College Collab", href: "#college-collab" },
  { label: "FAQs", href: "#faqs" },
];

const catLinks = [
  { label: "CAT Strategy", href: "#cat-strategy" },
  { label: "Sections", href: "#cat-sections" },
  { label: "Mocks", href: "#cat-mocks" },
  { label: "GDPI Prep", href: "#gdpi" },
  { label: "Predictor", href: "#college-predictor" },
];

type Mode = "mba" | "cat";

export default function Navbar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = mode === "mba" ? mbaLinks : catLinks;

  return (
    <header style={{
      position: "fixed", inset: "0 0 auto 0", zIndex: 50, transition: "all 0.3s ease",
      background: solid ? "rgba(5,13,28,0.95)" : "rgba(5,13,28,0.6)",
      backdropFilter: "blur(18px)",
      borderBottom: solid ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>

        {/* Logo */}
        <a href="#" onClick={() => { setMode("mba"); window.scrollTo(0,0); }} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <span className="btn-primary" style={{ width: "34px", height: "34px", padding: 0, borderRadius: "8px", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>MP</span>
          <span className="serif" style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>
            MBA<span className="gold-text">Partner</span>
          </span>
        </a>

        {/* Toggle pill — center */}
        <div style={{
          display: "flex", alignItems: "center",
          background: "var(--card2)",
          border: "1px solid var(--border)",
          borderRadius: "100px",
          padding: "4px",
          gap: "2px",
          flexShrink: 0,
        }}>
          <button onClick={() => { setMode("mba"); window.scrollTo(0,0); }}
            style={{
              padding: "7px 18px", borderRadius: "100px", border: "none", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 600, transition: "all 0.22s ease",
              background: mode === "mba" ? "linear-gradient(135deg, #C9A84C, #A8863A)" : "transparent",
              color: mode === "mba" ? "#050D1C" : "var(--muted)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}>
            MBA Student
          </button>
          <button onClick={() => { setMode("cat"); window.scrollTo(0,0); }}
            style={{
              padding: "7px 18px", borderRadius: "100px", border: "none", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 600, transition: "all 0.22s ease",
              background: mode === "cat" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
              color: mode === "cat" ? "#ffffff" : "var(--muted)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}>
            CAT / OMETs Aspirant
          </button>
        </div>

        {/* Desktop nav links */}
        <nav className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => (e.currentTarget.style.color = mode === "cat" ? "#a5b4fc" : "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {mode === "mba" ? (
            <>
              <a href="https://mbapartner.in" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.82rem" }}>Login</a>
              <a href="#enroll" className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.82rem" }}>Enroll Now</a>
            </>
          ) : (
            <a href="#cat-enroll" style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              Start CAT Prep
            </a>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px", display: "none" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "rgba(5,13,28,0.97)", backdropFilter: "blur(18px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "20px 40px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ fontSize: "1rem", fontWeight: 500, color: "var(--muted)", textDecoration: "none" }}>
                {l.label}
              </a>
            ))}
            <a href={mode === "mba" ? "#enroll" : "#cat-enroll"} onClick={() => setOpen(false)}
              className="btn-primary" style={{ marginTop: "8px", justifyContent: "center" }}>
              {mode === "mba" ? "Enroll Now" : "Start CAT Prep"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
