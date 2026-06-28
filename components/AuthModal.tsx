"use client";
import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: { name: string; email: string; college?: string; year?: string; domain?: string; joinedDate?: string }) => void;
  defaultTab?: "login" | "signup";
}

const DEMO = { email: "demo@mbapartner.in", password: "demo123", name: "Demo Student" };

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 500,
  background: "rgba(4,11,25,0.88)",
  backdropFilter: "blur(20px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const closeBtn: React.CSSProperties = {
  position: "absolute",
  top: 16,
  right: 16,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: "#91A9C0",
  padding: 6,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
};

const brandRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 28,
};

const brandText: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: "1.5rem",
  fontWeight: 900,
  color: "#F3F0E8",
  letterSpacing: "-0.01em",
};

const tabBar: React.CSSProperties = {
  display: "flex",
  gap: 6,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 12,
  padding: 4,
  marginBottom: 28,
};

function tabStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: "9px 0",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: "0.03em",
    transition: "all 0.2s ease",
    background: active ? "linear-gradient(135deg,#D4AA52,#B8943C)" : "transparent",
    color: active ? "#040B19" : "#91A9C0",
  };
}

const errorStyle: React.CSSProperties = {
  background: "rgba(251,113,133,0.1)",
  border: "1px solid rgba(251,113,133,0.3)",
  borderRadius: 10,
  padding: "10px 14px",
  color: "#FCA5A5",
  fontSize: "0.82rem",
  marginBottom: 16,
};

const switchRow: React.CSSProperties = {
  textAlign: "center",
  marginTop: 20,
  fontSize: "0.85rem",
  color: "#506070",
};

const switchLink: React.CSSProperties = {
  color: "#D4AA52",
  fontWeight: 700,
  cursor: "pointer",
  textDecoration: "none",
  background: "none",
  border: "none",
  padding: 0,
  font: "inherit",
};

const checkRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 20,
  cursor: "pointer",
  userSelect: "none",
};

const checkLabel: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#91A9C0",
  cursor: "pointer",
};

export default function AuthModal({ onClose, onAuth, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ name: string; email: string; college?: string; year?: string; domain?: string; isNew: boolean } | null>(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupCollege, setSignupCollege] = useState("");
  const [signupYear, setSignupYear] = useState("2025");
  const [signupDomain, setSignupDomain] = useState("Consulting");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  function getUsers(): Array<{ name: string; email: string; password: string; college: string; year: string; domain: string; joinedDate: string }> {
    try {
      return JSON.parse(localStorage.getItem("mp_users") || "[]");
    } catch {
      return [];
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const email = loginEmail.trim().toLowerCase();
    const password = loginPassword;

    if (email === DEMO.email) {
      if (password !== DEMO.password) {
        setError("Incorrect password.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const session = { email: DEMO.email, name: DEMO.name, college: undefined, year: undefined, domain: undefined, joinedDate: undefined };
        localStorage.setItem("mp_session", JSON.stringify(session));
        onAuth(session);
        setLoading(false);
        setSuccess({ name: DEMO.name, email: DEMO.email, isNew: false });
      }, 250);
      return;
    }

    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email);
    if (!user) {
      setError("No account found with that email.");
      return;
    }
    if (user.password !== password) {
      setError("Incorrect password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const session = { email: user.email, name: user.name, college: user.college, year: user.year, domain: user.domain, joinedDate: user.joinedDate };
      localStorage.setItem("mp_session", JSON.stringify(session));
      onAuth(session);
      setLoading(false);
      setSuccess({ name: user.name, email: user.email, college: user.college, year: user.year, domain: user.domain, isNew: false });
    }, 250);
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const email = signupEmail.trim().toLowerCase();
    const name = signupName.trim();

    if (!name) { setError("Please enter your full name."); return; }
    if (!email) { setError("Please enter your email."); return; }
    if (signupPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (signupPassword !== signupConfirm) { setError("Passwords do not match."); return; }

    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email)) {
      setError("An account with that email already exists.");
      return;
    }

    const newUser = {
      name,
      email,
      password: signupPassword,
      college: signupCollege.trim(),
      year: signupYear,
      domain: signupDomain,
      joinedDate: new Date().toISOString(),
    };

    setLoading(true);
    setTimeout(() => {
      const updated = [...users, newUser];
      localStorage.setItem("mp_users", JSON.stringify(updated));
      const session = { name, email, college: signupCollege.trim(), year: signupYear, domain: signupDomain, joinedDate: newUser.joinedDate };
      localStorage.setItem("mp_session", JSON.stringify(session));
      onAuth(session);
      setLoading(false);
      setSuccess({ name, email, college: signupCollege.trim(), year: signupYear, domain: signupDomain, isNew: true });
    }, 250);
  }

  const cardStyle: React.CSSProperties = {
    maxWidth: tab === "signup" ? 760 : 480,
    width: "100%",
    background: "linear-gradient(155deg,#0E1D36 0%,#0B1628 100%)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 20,
    padding: "44px 40px",
    position: "relative",
    transition: "max-width 0.3s ease",
  };

  if (success) {
    return (
      <div style={overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) { onClose(); } }}>
        <div style={{ maxWidth: 480, width: "100%", background: "linear-gradient(155deg,#0E1D36 0%,#0B1628 100%)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 20, padding: "48px 40px", textAlign: "center", position: "relative" }}>
          <button style={closeBtn} onClick={onClose}><X size={20} /></button>

          {/* Celebration */}
          <div style={{ fontSize: "2.8rem", marginBottom: 16 }}>{success.isNew ? "🎉" : "👋"}</div>

          {/* Avatar */}
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#D4AA52,#B8943C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, color: "#030810", margin: "0 auto 16px" }}>
            {success.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "#EDE8DF", marginBottom: 6, lineHeight: 1.2 }}>
            {success.isNew ? `Welcome aboard,` : `Welcome back,`}
            <br />
            <span style={{ background: "linear-gradient(135deg,#D4AA52,#EDD47A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {success.name.split(" ")[0]}!
            </span>
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#7A95B0", marginBottom: 28 }}>
            {success.isNew ? "Your MBA Partner profile is ready." : "You're back in your student portal."}
          </p>

          {/* Profile summary card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px", marginBottom: 28, textAlign: "left" }}>
            <div style={{ fontSize: "0.8rem", color: "#7A95B0", marginBottom: 8, fontWeight: 500 }}>Your profile</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              {[
                { label: "Email", value: success.email },
                { label: "College", value: success.college || "—" },
                { label: "Batch Year", value: success.year || "—" },
                { label: "Domain", value: success.domain || "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#3A5060", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: "0.85rem", color: "#EDE8DF", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="/dashboard/" onClick={onClose}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8943C)", color: "#030810", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
              Go to Dashboard →
            </a>
            <button onClick={onClose}
              style={{ padding: "10px 0", background: "transparent", border: "none", color: "#7A95B0", fontSize: "0.85rem", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif" }}>
              Continue Exploring
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={cardStyle}>
        <button style={closeBtn} onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div style={brandRow}>
          <span style={brandText}>
            MBA<span style={{ color: "#D4AA52" }}>Partner</span>
          </span>
        </div>

        <div style={tabBar}>
          <button style={tabStyle(tab === "login")} onClick={() => { setTab("login"); setError(""); }}>
            Login
          </button>
          <button style={tabStyle(tab === "signup")} onClick={() => { setTab("signup"); setError(""); }}>
            Sign Up
          </button>
        </div>

        {tab === "login" && (
          <form onSubmit={handleLogin} noValidate>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="field" style={{ marginBottom: 16 }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            <label style={checkRow}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: "#D4AA52", width: 16, height: 16, cursor: "pointer" }}
              />
              <span style={checkLabel}>Remember me</span>
            </label>
            {error && <div style={errorStyle}>{error}</div>}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
            <div style={switchRow}>
              Don&apos;t have an account?{" "}
              <button type="button" style={switchLink} onClick={() => { setTab("signup"); setError(""); }}>
                Sign up
              </button>
            </div>
          </form>
        )}

        {tab === "signup" && (
          <div style={{ display: "flex", gap: 0 }}>
            {/* Form column */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <form onSubmit={handleSignup} noValidate>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Arjun Sharma"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>College / B-School</label>
                  <input
                    type="text"
                    placeholder="IIM Ahmedabad, XLRI…"
                    value={signupCollege}
                    onChange={(e) => setSignupCollege(e.target.value)}
                    autoComplete="organization"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div className="field">
                    <label>Batch Year</label>
                    <select value={signupYear} onChange={(e) => setSignupYear(e.target.value)}>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Domain</label>
                    <select value={signupDomain} onChange={(e) => setSignupDomain(e.target.value)}>
                      <option>Consulting</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>HR</option>
                      <option>Operations</option>
                      <option>Product Management</option>
                    </select>
                  </div>
                </div>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Min. 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div className="field" style={{ marginBottom: 16 }}>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Repeat password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                </div>
                {error && <div style={errorStyle}>{error}</div>}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? "Creating account…" : "Create Account"}
                </button>
                <div style={switchRow}>
                  Already have an account?{" "}
                  <button type="button" style={switchLink} onClick={() => { setTab("login"); setError(""); }}>
                    Log in
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Panel */}
            <div style={{
              width: 220,
              flexShrink: 0,
              padding: "0 0 0 28px",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}>
              {/* Avatar */}
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "linear-gradient(135deg, #D4AA52, #B8943C)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", fontWeight: 800, color: "#030810",
                  margin: "0 auto 12px",
                }}>
                  {signupName ? signupName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : "?"}
                </div>
                <div style={{ fontSize: "1rem", fontWeight: 700, color: "#EDE8DF", minHeight: 24 }}>
                  {signupName || <span style={{ color: "#3A5060" }}>Your Name</span>}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#7A95B0", marginTop: 4, minHeight: 20 }}>
                  {signupEmail || <span style={{ color: "#3A5060" }}>email</span>}
                </div>
              </div>

              {/* Details chips */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "College", value: signupCollege },
                  { label: "Year", value: signupYear },
                  { label: "Domain", value: signupDomain },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    padding: "8px 12px", borderRadius: 8,
                    background: value ? "rgba(212,170,82,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${value ? "rgba(212,170,82,0.18)" : "rgba(255,255,255,0.06)"}`,
                  }}>
                    <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: value ? "#D4AA52" : "#3A5060", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: "0.83rem", color: value ? "#EDE8DF" : "#3A5060", fontWeight: 500 }}>
                      {value || "—"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status indicator */}
              <div style={{ marginTop: "auto", padding: "10px 12px", borderRadius: 8, background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.15)", textAlign: "center" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#34D399", letterSpacing: "0.07em", textTransform: "uppercase" }}>Profile Progress</div>
                <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#EDE8DF", margin: "4px 0" }}>
                  {Math.round(([signupName, signupEmail, signupCollege, signupPassword].filter(Boolean).length / 4) * 100)}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
