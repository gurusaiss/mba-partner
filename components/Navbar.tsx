"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Offerings", href: "#offerings" },
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "#resources" },
  { label: "Enroll", href: "#enroll" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-18" style={{ height: "72px" }}>

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg btn-gold flex items-center justify-center text-sm font-black" style={{ color: "#040D1E" }}>
              MP
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              MBA<span className="text-gold-gradient">Partner</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://mbapartner.in"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold px-5 py-2.5 rounded-lg text-sm font-semibold"
            >
              Login
            </a>
            <a href="#programs" className="btn-gold px-5 py-2.5 rounded-lg text-sm">
              Enroll Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden transition-colors"
            style={{ color: "var(--muted)" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden nav-blur border-t" style={{ borderColor: "rgba(201,168,76,0.12)" }}>
          <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-2 transition-colors"
                style={{ color: "var(--muted)" }}
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t" style={{ borderColor: "var(--navy-line)" }}>
              <a href="#programs" onClick={() => setOpen(false)} className="btn-gold px-5 py-3 rounded-lg text-sm font-semibold flex-1 text-center">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
