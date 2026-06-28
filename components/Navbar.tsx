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
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    try {
      const s = localStorage.getItem("mp_session");
      if (s) setUser(JSON.parse(s));
      const t = localStorage.getItem("mp_theme") as "dark" | "light" | null;
      if (t) setTheme(t);
    } catch { /* */ }
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userMenuOpen]);

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

  const linkHoverColor = mode === "cat" ? "#a5b4fc" : (isLight ? "var(--gold)" : "var(--gold2)");
  const dropdownBg = isLight ? "#FFFFFF" : "#0C1626";
  const dropdownBorder = isLight ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.10)";

  return (
    <>
      <header
        className={`navbar-glass${solid ? " solid" : ""}`}
        style={{
          position: "fixed", inset: "0 0 auto 0", zIndex: 50,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${solid ? (isLight ? "rgba(184,146,10,0.18)" : "rgba(212,170,82,0.12)") : "transparent"}`,
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>

          {/* Logo */}
          <a href="#" onClick={() => { setMode("mba"); window.scrollTo(0,0); }} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <span className="btn-primary" style={{ width: "34px", height: "34px", padding: 0, borderRadius: "8px", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>MP</span>
            <span className="serif" style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>
              MBA<span className="gold-text">Partner</span>
            </span>
          </a>

          {/* Mode toggle pill */}
          <div style={{
            display: "flex", alignItems: "center",
            background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "100px", padding: "4px", gap: "2px", flexShrink: 0,
          }}>
            <button onClick={() => { setMode("mba"); window.scrollTo(0,0); }}
              style={{
                padding: "7px 18px", borderRadius: "100px", border: "none", cursor: "pointer",
                fontSize: "0.78rem", fontWeight: 700, transition: "all 0.22s ease",
                background: mode === "mba" ? "linear-gradient(135deg, #C9A84C, #A8863A)" : "transparent",
                color: mode === "mba" ? "#030810" : "var(--muted)",
                fontFamily: "var(--font-sans)",
              }}>
              MBA Student
            </button>
            <button onClick={() => { setMode("cat"); window.scrollTo(0,0); }}
              style={{
                padding: "7px 18px", borderRadius: "100px", border: "none", cursor: "pointer",
                fontSize: "0.78rem", fontWeight: 700, transition: "all 0.22s ease",
                background: mode === "cat" ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                color: mode === "cat" ? "#ffffff" : "var(--muted)",
                fontFamily: "var(--font-sans)",
              }}>
              CAT / OMETs Aspirant
            </button>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {links.map(l => (
              <a key={l.href} href={l.href}
                style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--muted)", textDecoration: "none", transition: "color 0.18s", whiteSpace: "nowrap", position: "relative" }}
                onMouseEnter={e => (e.currentTarget.style.color = linkHoverColor)}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side: theme toggle + auth */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>

            {/* Theme toggle — small pill */}
            <button
              onClick={toggleTheme}
              title={isLight ? "Switch to dark mode" : "Switch to light mode"}
              style={{
                width: 34, height: 34,
                borderRadius: "10px",
                background: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"}`,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                color: isLight ? "#B8920A" : "#D4AA52",
                transition: "all 0.2s ease", flexShrink: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = isLight ? "rgba(0,0,0,0.10)" : "rgba(212,170,82,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"; }}
            >
              {isLight ? <Moon size={15} strokeWidth={2} /> : <Sun size={15} strokeWidth={2} />}
            </button>

            {user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "5px 12px 5px 5px", borderRadius: "100px",
                    background: isLight ? "rgba(184,146,10,0.07)" : "rgba(212,170,82,0.08)",
                    border: `1px solid ${isLight ? "rgba(184,146,10,0.18)" : "rgba(212,170,82,0.20)"}`,
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = isLight ? "rgba(184,146,10,0.12)" : "rgba(212,170,82,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = isLight ? "rgba(184,146,10,0.07)" : "rgba(212,170,82,0.08)"; }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AA52, #B8943C)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", fontWeight: 800, color: "#030810", flexShrink: 0,
                  }}>{initials}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", maxWidth: "96px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} color="var(--muted)" style={{ transition: "transform 0.2s", transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {userMenuOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    background: dropdownBg,
                    border: `1px solid ${dropdownBorder}`,
                    borderRadius: 14, padding: "8px", minWidth: 200,
                    boxShadow: isLight ? "0 12px 40px rgba(0,0,0,0.14)" : "0 20px 50px rgba(0,0,0,0.55)",
                    zIndex: 100,
                  }}>
                    <div style={{ padding: "10px 12px 12px", borderBottom: `1px solid ${dropdownBorder}`, marginBottom: 6 }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)" }}>{user.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>{user.email}</div>
                    </div>
                    <a href="/dashboard/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, textDecoration: "none", color: "var(--muted)", fontSize: "0.85rem", fontWeight: 500, transition: "all 0.15s" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)"; el.style.color = "var(--text)"; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.color = "var(--muted)"; }}>
                      <LayoutDashboard size={15} />
                      My Dashboard
                    </a>
                    <button onClick={handleLogout}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, width: "100%", background: "transparent", border: "none", color: "#F87171", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s", fontFamily: "var(--font-sans)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.07)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                      <LogOut size={15} />
                      Sign Out
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
                      style={{ padding: "8px 16px", fontSize: "0.82rem" }}>
                      Login
                    </button>
                    <a href="#enroll" className="btn-primary" style={{ padding: "8px 16px", fontSize: "0.82rem" }}>Enroll Now</a>
                  </>
                ) : (
                  <a href="#cat-enroll" style={{ padding: "8px 20px", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                    Start CAT Prep
                  </a>
                )}
              </>
            )}
          </div>

          <button onClick={() => setOpen(!open)} className="show-mobile" style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px", display: "none" }}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div style={{ background: isLight ? "rgba(243,239,228,0.98)" : "rgba(3,8,16,0.97)", backdropFilter: "blur(18px)", borderTop: `1px solid var(--border)` }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "20px 40px", display: "flex", flexDirection: "column", gap: "14px" }}>
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  style={{ fontSize: "1rem", fontWeight: 500, color: "var(--muted)", textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
              {user ? (
                <>
                  <a href="/dashboard/" style={{ fontSize: "1rem", fontWeight: 600, color: "var(--gold)", textDecoration: "none" }}>My Dashboard</a>
                  <button onClick={handleLogout} style={{ textAlign: "left", background: "none", border: "none", color: "#F87171", fontSize: "1rem", fontWeight: 500, cursor: "pointer", padding: 0, fontFamily: "var(--font-sans)" }}>Sign Out</button>
                </>
              ) : (
                <>
                  <button onClick={() => { setAuthTab("login"); setShowAuth(true); setOpen(false); }}
                    className="btn-secondary" style={{ justifyContent: "center" }}>
                    Login
                  </button>
                  <a href={mode === "mba" ? "#enroll" : "#cat-enroll"} onClick={() => setOpen(false)}
                    className="btn-primary" style={{ justifyContent: "center" }}>
                    {mode === "mba" ? "Enroll Now" : "Start CAT Prep"}
                  </a>
                </>
              )}
              <button
                onClick={toggleTheme}
                style={{ display:"flex", alignItems:"center", gap:"8px", background:"none", border:"none", color:"var(--muted)", fontSize:"0.9rem", fontWeight:500, cursor:"pointer", padding:"4px 0", fontFamily:"var(--font-sans)" }}>
                {isLight ? <Moon size={16} /> : <Sun size={16} />}
                {isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              </button>
            </div>
          </div>
        )}
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
