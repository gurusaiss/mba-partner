"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
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

  function handleLogout() {
    localStorage.removeItem("mp_session");
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  }

  const links = mode === "mba" ? mbaLinks : catLinks;
  const initials = user ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "";

  return (
    <>
      <header style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 50, transition: "all 0.3s ease",
        background: solid ? "rgba(5,13,28,0.95)" : "rgba(5,13,28,0.6)",
        backdropFilter: "blur(18px)",
        borderBottom: solid ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>

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
            background: "var(--card2)", border: "1px solid var(--border)",
            borderRadius: "100px", padding: "4px", gap: "2px", flexShrink: 0,
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

          {/* CTA / Auth */}
          <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {user ? (
              /* Logged-in: avatar chip with dropdown */
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "5px 12px 5px 5px", borderRadius: "100px",
                    background: "rgba(212,170,82,0.08)",
                    border: "1px solid rgba(212,170,82,0.2)",
                    cursor: "pointer", transition: "all 0.2s",
                    fontFamily: "Inter, system-ui, sans-serif",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,170,82,0.14)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,170,82,0.08)"; }}
                >
                  <span style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "linear-gradient(135deg, #D4AA52, #B8943C)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.72rem", fontWeight: 800, color: "#040B19", flexShrink: 0,
                  }}>{initials}</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", maxWidth: "96px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} color="var(--muted)" style={{ transition: "transform 0.2s", transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {userMenuOpen && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: 14, padding: "8px", minWidth: 200,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.5)",
                    zIndex: 100,
                  }}>
                    <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 6 }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)" }}>{user.name}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: 2 }}>{user.email}</div>
                    </div>
                    <a href="/dashboard/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, textDecoration: "none", color: "var(--muted)", fontSize: "0.85rem", fontWeight: 500, transition: "all 0.15s" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)"; }}>
                      <LayoutDashboard size={15} />
                      My Dashboard
                    </a>
                    <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, width: "100%", background: "transparent", border: "none", color: "#FCA5A5", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s", fontFamily: "Inter, system-ui, sans-serif" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(251,113,133,0.08)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}>
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out: Login + Enroll / Start CAT Prep */
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
          <div style={{ background: "rgba(5,13,28,0.97)", backdropFilter: "blur(18px)", borderTop: "1px solid var(--border)" }}>
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
                  <button onClick={handleLogout} style={{ textAlign: "left", background: "none", border: "none", color: "#FCA5A5", fontSize: "1rem", fontWeight: 500, cursor: "pointer", padding: 0, fontFamily: "Inter, system-ui, sans-serif" }}>Sign Out</button>
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
