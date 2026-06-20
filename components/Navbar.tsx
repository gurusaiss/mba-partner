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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? "nav-solid" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="#home" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg btn-primary text-xs font-bold flex items-center justify-center">MP</span>
          <span className="serif font-bold text-lg" style={{ color: "var(--text)" }}>
            MBA<span className="gold-text">Partner</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://mbapartner.in" target="_blank" rel="noreferrer" className="btn-secondary !py-2 !px-4 text-sm">Login</a>
          <a href="#enroll" className="btn-primary !py-2 !px-4 text-sm">Enroll Now</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ color: "var(--muted)" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden nav-solid border-t" style={{ borderColor: "var(--border)" }}>
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-sm font-medium py-1" style={{ color: "var(--muted)" }}>{l.label}</a>
            ))}
            <a href="#enroll" onClick={() => setOpen(false)} className="btn-primary text-sm mt-1">Enroll Now</a>
          </div>
        </div>
      )}
    </header>
  );
}
