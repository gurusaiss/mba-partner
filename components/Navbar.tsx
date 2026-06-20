"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Offerings", href: "#offerings" },
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed",
      inset: "0 0 auto 0",
      zIndex: 50,
      transition: "all 0.3s ease",
      background: solid ? "rgba(5,13,28,0.92)" : "transparent",
      backdropFilter: solid ? "blur(18px)" : "none",
      borderBottom: solid ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <span className="btn-primary" style={{ width: "34px", height: "34px", padding: 0, borderRadius: "8px", fontSize: "0.7rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>MP</span>
          <span className="serif" style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text)" }}>
            MBA<span className="gold-text">Partner</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="hidden-mobile">
          <a href="https://mbapartner.in" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "9px 18px", fontSize: "0.82rem" }}>Login</a>
          <a href="#enroll" className="btn-primary" style={{ padding: "9px 18px", fontSize: "0.82rem" }}>Enroll Now</a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px" }}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "rgba(5,13,28,0.97)", backdropFilter: "blur(18px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "20px 40px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--muted)", textDecoration: "none", padding: "4px 0" }}>
                {l.label}
              </a>
            ))}
            <a href="#enroll" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: "8px", textAlign: "center", justifyContent: "center" }}>Enroll Now</a>
          </div>
        </div>
      )}
    </header>
  );
}
