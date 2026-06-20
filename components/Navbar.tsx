"use client";
import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Offerings", href: "#offerings" },
  { label: "Programs", href: "#programs" },
  { label: "Mentors", href: "#mentors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Resources", href: "#resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg btn-gold flex items-center justify-center">
              <GraduationCap size={18} className="text-gray-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              MBA<span className="text-gold-gradient">Partner</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200 font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://mbapartner.in"
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Login
            </a>
            <a
              href="#programs"
              className="btn-gold px-4 py-2 rounded-lg text-sm"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-400 hover:text-amber-400 transition-colors"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden nav-blur border-t border-white/5">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-amber-400 transition-colors py-2 text-sm font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 mt-2">
              <a href="#programs" onClick={() => setOpen(false)} className="btn-gold px-4 py-2 rounded-lg text-sm flex-1 text-center">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
