"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Sun, Moon } from "lucide-react";
import AuthModal from "./AuthModal";

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
  { label: "Mocks", href: "#cat-mocks" },
  { label: "GDPI Prep", href: "#gdpi" },
  { label: "Free RC", href: "#rc-material" },
  { label: "AI Tools", href: "#ai-tools" },
];

type Mode = "mba" | "cat";

export default function Navbar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const fn = () => {
      setSolid(window.scrollY > 40);
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Load session + theme
  useEffect(() => {
    try {
      const s = localStorage.getItem("mp_session");
      if (s) setUser(JSON.parse(s));
      const t = localStorage.getItem("mp_theme") as "dark" | "light" | null;
      if (t) setTheme(t);
    } catch { /* */ }
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

  // IntersectionObserver: highlight active section
  useEffect(() => {
    const links = mode === "mba" ? mbaLinks : catLinks;
    const ids = links.map(l => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    const visible = new Set<string>();

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          if (visible.size > 0) setActiveSection([...visible][0]);
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [mode]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("mp_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  function handleLogout() {
    localStorage.removeItem("mp_session");
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  }

  const links = mode === "mba" ? mbaLinks : catLinks;
  const initials = user ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "";
  const isLight = theme === "light";
  const dropdownBg = isLight ? "#FFFFFF" : "#0D1220";
  const dropdownBorder = isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.09)";

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 60,
          height: "2px", width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, var(--gold), var(--violet))",
          transition: "width 0.1s linear",
          pointerEvents: "none",
        }}
      />

      <header
        className={`navbar-glass${solid ? " solid" : ""}`}
        style={{
          position: "fixed", inset: "0 0 auto 0", zIndex: 50,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${solid
            ? (isLight ? "rgba(234,103,0,0.14)" : "rgba(249,115,22,0.10)")
            : "transparent"
          }`,
        }}
      >
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 24px", height: "64px",
          display: "grid", gridTemplateColumns: "auto 1fr auto",
          alignItems: "center", gap: "16px",
        }}>

          {/* LEFT: Logo + Mode toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            {/* Logo */}
            <a
              href="#"
              onClick={() => { setMode("mba"); window.scrollTo(0, 0); }}
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}
            >
              <span style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #F97316, #C2531A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.78rem", fontWeight: 900, color: "#FFFFFF",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
              }}>M</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                <span style={{
                  fontWeight: 800, fontSize: "1rem",
                  color: "var(--text)", lineHeight: 1.1,
                  fontFamily: "var(--font-sans)",
                }}>
                  MBA<span style={{
                    background: "linear-gradient(135deg, #F97316, #FB923C)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>Partner</span>
                </span>
                {!solid && (
                  <span style={{
                    fontSize: "0.58rem", fontWeight: 600,
                    color: "var(--dim)", letterSpacing: "0.04em",
                    lineHeight: 1, textTransform: "uppercase",
                  }}>
                    IIM Alumni Founded
                  </span>
                )}
              </div>
            </a>

            {/* Mode toggle pill */}
            <div style={{
              display: "flex", alignItems: "center",
              background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "100px", padding: "3px", gap: "2px",
            }}>
              <button
                onClick={() => { setMode("mba"); window.scrollTo(0, 0); }}
                style={{
                  padding: "5px 12px", borderRadius: "100px", border: "none", cursor: "pointer",
                  fontSize: "0.72rem", fontWeight: 700, transition: "all 0.2s ease",
                  background: mode === "mba" ? "linear-gradient(135deg, #F97316, #C2531A)" : "transparent",
                  color: mode === "mba" ? "#FFFFFF" : "var(--muted)",
                  fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
                }}
              >MBA</button>
              <button
                onClick={() => { setMode("cat"); window.scrollTo(0, 0); }}
                style={{
                  padding: "5px 12px", borderRadius: "100px", border: "none", cursor: "pointer",
                  fontSize: "0.72rem", fontWeight: 700, transition: "all 0.2s ease",
                  background: mode === "cat" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                  color: mode === "cat" ? "#ffffff" : "var(--muted)",
                  fontFamily: "var(--font-sans)", whiteSpace: "nowrap",
                }}
              >CAT</button>
            </div>
          </div>

          {/* CENTER: Desktop nav links */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {links.map(l => {
                const sectionId = l.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    style={{
                      fontSize: "0.83rem",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "var(--gold)" : "var(--muted)",
                      textDecoration: "none",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      transition: "all 0.18s",
                      whiteSpace: "nowrap",
                      background: isActive
                        ? (isLight ? "rgba(234,103,0,0.08)" : "rgba(249,115,22,0.08)")
                        : "transparent",
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
                        (e.currentTarget as HTMLAnchorElement).style.background = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                      }
                    }}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* RIGHT: phone + theme + auth */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>

            {/* Phone */}
            <a
              href="tel:+917042732092"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "6px 12px", borderRadius: "100px",
                background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"}`,
                textDecoration: "none", transition: "all 0.2s",
                fontSize: "0.78rem", fontWeight: 600, color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--gold)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(249,115,22,0.30)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)";
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.86 2 2 0 012 .68h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.49a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              Call Us
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to dark" : "Switch to light"}
              style={{
                width: 34, height: 34, borderRadius: "10px",
                background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: isLight ? "#EA6700" : "#F97316",
                transition: "all 0.2s ease", flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(249,115,22,0.10)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"; }}
            >
              {isLight ? <Moon size={14} strokeWidth={2} /> : <Sun size={14} strokeWidth={2} />}
            </button>

            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "4px 10px 4px 4px", borderRadius: "100px",
                    background: isLight ? "rgba(234,103,0,0.07)" : "rgba(249,115,22,0.08)",
                    border: `1px solid ${isLight ? "rgba(234,103,0,0.18)" : "rgba(249,115,22,0.18)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <span style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "linear-gradient(135deg, #F97316, #C2531A)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.68rem", fontWeight: 800, color: "#FFFFFF", flexShrink: 0,
                  }}>{initials}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text)", maxWidth: "90px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={13} color="var(--muted)" style={{ transition: "transform 0.2s", transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {userMenuOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    background: dropdownBg, border: `1px solid ${dropdownBorder}`,
                    borderRadius: 14, padding: "8px", minWidth: 200,
                    boxShadow: isLight ? "0 12px 40px rgba(0,0,0,0.12)" : "0 20px 50px rgba(0,0,0,0.55)",
                    zIndex: 100,
                  }}>
                    <div style={{ padding: "10px 12px 12px", borderBottom: `1px solid ${dropdownBorder}`, marginBottom: 6 }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)" }}>{user.name}</div>
                      <div style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 2 }}>{user.email}</div>
                    </div>
                    <a href="/dashboard/"
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, textDecoration: "none", color: "var(--muted)", fontSize: "0.84rem", fontWeight: 500, transition: "all 0.15s" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"; el.style.color = "var(--text)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--muted)"; }}
                    >
                      <LayoutDashboard size={14} /> My Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, width: "100%", background: "transparent", border: "none", color: "#F87171", fontSize: "0.84rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-sans)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.07)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {mode === "mba" ? (
                  <>
                    <button
                      onClick={() => { setAuthTab("login"); setShowAuth(true); }}
                      className="btn-secondary"
                      style={{ padding: "7px 14px", fontSize: "0.8rem" }}
                    >Login</button>
                    <a href="#enroll" className="btn-primary" style={{ padding: "7px 16px", fontSize: "0.8rem" }}>
                      Enroll Now
                    </a>
                  </>
                ) : (
                  <a
                    href="#cat-enroll"
                    style={{
                      padding: "7px 18px", borderRadius: "10px",
                      fontSize: "0.8rem", fontWeight: 700,
                      background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                      color: "#fff", textDecoration: "none",
                      display: "inline-flex", alignItems: "center",
                    }}
                  >Start CAT Prep</a>
                )}
              </>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen(!open)}
            className="show-mobile"
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px", display: "none", justifySelf: "end" }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? "600px" : "0px",
            transition: "max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)",
            background: isLight ? "rgba(255,255,255,0.98)" : "rgba(8,12,20,0.97)",
            backdropFilter: "blur(18px)",
            borderTop: open ? `1px solid var(--border)` : "1px solid transparent",
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: "4px" }}>

            {/* Mode toggle */}
            <div style={{
              display: "flex",
              background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "100px", padding: "3px", gap: "2px", marginBottom: "10px",
            }}>
              <button onClick={() => { setMode("mba"); window.scrollTo(0, 0); }}
                style={{ flex: 1, padding: "7px 10px", borderRadius: "100px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, transition: "all 0.2s ease", background: mode === "mba" ? "linear-gradient(135deg, #F97316, #C2531A)" : "transparent", color: mode === "mba" ? "#FFFFFF" : "var(--muted)", fontFamily: "var(--font-sans)" }}>
                MBA Student
              </button>
              <button onClick={() => { setMode("cat"); window.scrollTo(0, 0); }}
                style={{ flex: 1, padding: "7px 10px", borderRadius: "100px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 700, transition: "all 0.2s ease", background: mode === "cat" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent", color: mode === "cat" ? "#ffffff" : "var(--muted)", fontFamily: "var(--font-sans)" }}>
                CAT / OMETs
              </button>
            </div>

            {/* Nav links */}
            {links.map(l => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontSize: "0.95rem", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--gold)" : "var(--muted)", textDecoration: "none", padding: "10px 4px", borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}`, display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {isActive && <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />}
                  {l.label}
                </a>
              );
            })}

            {/* Phone */}
            <a href="tel:+917042732092"
              style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 600, color: "var(--gold)", textDecoration: "none", padding: "12px 4px", borderBottom: `1px solid ${isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}` }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.01 2.86 2 2 0 012 .68h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.49a16 16 0 006.29 6.29l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              +91 70427 32092
            </a>

            {/* Auth buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "10px" }}>
              {user ? (
                <>
                  <a href="/dashboard/" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gold)", textDecoration: "none", padding: "4px 0" }}>My Dashboard</a>
                  <button onClick={handleLogout} style={{ textAlign: "left", background: "none", border: "none", color: "#F87171", fontSize: "1rem", fontWeight: 500, cursor: "pointer", padding: 0, fontFamily: "var(--font-sans)" }}>Sign Out</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setAuthTab("login"); setShowAuth(true); setOpen(false); }} className="btn-secondary" style={{ justifyContent: "center" }}>Login</button>
                  <a href={mode === "mba" ? "#enroll" : "#cat-enroll"} onClick={() => setOpen(false)} className="btn-primary" style={{ justifyContent: "center" }}>
                    {mode === "mba" ? "Enroll Now" : "Start CAT Prep"}
                  </a>
                </>
              )}
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "var(--muted)", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", padding: "10px 0 4px", fontFamily: "var(--font-sans)" }}>
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
              {isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </button>
          </div>
        </div>
      </header>

      {showAuth && (
        <AuthModal
          defaultTab={authTab}
          onClose={() => setShowAuth(false)}
          onAuth={(u) => setUser(u)}
        />
      )}
    </>
  );
}
