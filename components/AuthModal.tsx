"use client";
import { useState, useEffect, useCallback } from "react";
import { X, Eye, EyeOff, Check, AlertCircle, Sparkles, User, Mail, Building, Calendar, Briefcase, Lock, Gift, ArrowRight, LogIn } from "lucide-react";

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: { name: string; email: string; college?: string; year?: string; domain?: string; joinedDate?: string; referralCode?: string; referralBonus?: number }) => void;
  defaultTab?: "login" | "signup";
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
  college: string;
  year: string;
  domain: string;
  joinedDate: string;
  referralCode: string;
  referralBonus: number;
  referrals: string[];
  referredBy?: string;
}

function generateReferralCode(name: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const prefix = name.replace(/[^A-Za-z]/g, "").toUpperCase().slice(0, 2).padEnd(2, "X");
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return "MP" + prefix + suffix;
}

const DEMO = { email: "demo@mbapartner.in", password: "demo123", name: "Demo Student" };

const DOMAINS = ["Consulting", "Finance", "Marketing", "HR", "Operations", "Product Management"];
const YEARS = ["2024", "2025", "2026", "2027", "2028"];

// Password strength
function getPasswordStrength(p: string): { score: number; label: string; color: string } {
  if (!p) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 10) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  if (score <= 1) return { score, label: "Weak", color: "#EF4444" };
  if (score <= 2) return { score, label: "Fair", color: "#F97316" };
  if (score <= 3) return { score, label: "Good", color: "#EAB308" };
  return { score, label: "Strong", color: "#22C55E" };
}

// Profile completion %
function getCompletion(name: string, email: string, college: string, password: string): number {
  const filled = [name, email, college, password].filter(Boolean).length;
  return Math.round((filled / 4) * 100);
}

// Input field component
function Field({
  label, icon: Icon, type = "text", placeholder, value, onChange, hint, error, required, autoComplete,
  rightSlot, style
}: {
  label: string; icon?: React.ElementType; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; hint?: string; error?: string;
  required?: boolean; autoComplete?: string; rightSlot?: React.ReactNode; style?: React.CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value);
  const borderColor = error
    ? "rgba(251,113,133,0.6)"
    : focused
    ? "rgba(249,115,22,0.6)"
    : hasValue
    ? "rgba(249,115,22,0.25)"
    : "rgba(255,255,255,0.09)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...style }}>
      <label style={{
        fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.04em",
        color: error ? "#FCA5A5" : focused || hasValue ? "rgba(249,115,22,0.9)" : "rgba(255,255,255,0.45)",
        transition: "color 0.2s",
        textTransform: "uppercase",
      }}>
        {label}{required && <span style={{ color: "rgba(249,115,22,0.6)", marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {Icon && (
          <Icon size={15} style={{
            position: "absolute", left: 13,
            color: error ? "#FCA5A5" : focused || hasValue ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.25)",
            pointerEvents: "none", transition: "color 0.2s", flexShrink: 0,
          }} />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.03)",
            border: `1.5px solid ${borderColor}`,
            borderRadius: "12px",
            padding: `12px ${rightSlot ? "44px" : "14px"} 12px ${Icon ? "38px" : "14px"}`,
            fontSize: "0.9rem",
            color: "#EDE8DF",
            outline: "none",
            fontFamily: "inherit",
            transition: "all 0.2s",
            boxShadow: focused ? `0 0 0 3px rgba(249,115,22,0.08)` : "none",
          }}
        />
        {rightSlot && (
          <div style={{ position: "absolute", right: 12, display: "flex", alignItems: "center" }}>
            {rightSlot}
          </div>
        )}
      </div>
      {hint && !error && (
        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", marginTop: "2px" }}>{hint}</span>
      )}
      {error && (
        <span style={{ fontSize: "0.72rem", color: "#FCA5A5", display: "flex", alignItems: "center", gap: 4, marginTop: "2px" }}>
          <AlertCircle size={11} /> {error}
        </span>
      )}
    </div>
  );
}

// Select field component
function SelectField({
  label, icon: Icon, value, onChange, options
}: {
  label: string; icon?: React.ElementType; value: string; onChange: (v: string) => void; options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{
        fontSize: "0.76rem", fontWeight: 700, letterSpacing: "0.04em",
        color: focused || value ? "rgba(249,115,22,0.9)" : "rgba(255,255,255,0.45)",
        transition: "color 0.2s",
        textTransform: "uppercase",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon size={15} style={{
            position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
            color: focused || value ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.25)",
            pointerEvents: "none", transition: "color 0.2s", zIndex: 1,
          }} />
        )}
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: focused ? "rgba(20,35,60,0.95)" : "rgba(15,26,48,0.85)",
            border: `1.5px solid ${focused ? "rgba(249,115,22,0.6)" : value ? "rgba(249,115,22,0.25)" : "rgba(255,255,255,0.09)"}`,
            borderRadius: "12px",
            padding: `12px 14px 12px ${Icon ? "38px" : "14px"}`,
            fontSize: "0.9rem",
            color: "#EDE8DF",
            outline: "none",
            fontFamily: "inherit",
            transition: "all 0.2s",
            cursor: "pointer",
            WebkitAppearance: "none",
            MozAppearance: "none",
            appearance: "none",
            boxShadow: focused ? `0 0 0 3px rgba(249,115,22,0.08)` : "none",
          }}
        >
          {options.map(o => <option key={o} value={o} style={{ background: "#0E1D36" }}>{o}</option>)}
        </select>
        <svg style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </div>
    </div>
  );
}

export default function AuthModal({ onClose, onAuth, defaultTab = "login" }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">(defaultTab);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{
    name: string; email: string; college?: string; year?: string; domain?: string; isNew: boolean; referralCode?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupCollege, setSignupCollege] = useState("");
  const [signupYear, setSignupYear] = useState("2025");
  const [signupDomain, setSignupDomain] = useState("Consulting");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [signupReferralCode, setSignupReferralCode] = useState("");
  const [referralStatus, setReferralStatus] = useState<"idle" | "valid" | "invalid">("idle");

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [handleEsc]);

  function getUsers(): StoredUser[] {
    try { return JSON.parse(localStorage.getItem("mp_users") || "[]") as StoredUser[]; }
    catch { return []; }
  }

  function validateReferralCode(code: string): boolean {
    if (!code.trim()) return false;
    return getUsers().some(u => u.referralCode === code.trim().toUpperCase());
  }

  function handleReferralCodeChange(val: string) {
    setSignupReferralCode(val);
    if (!val.trim()) { setReferralStatus("idle"); return; }
    setReferralStatus(validateReferralCode(val) ? "valid" : "invalid");
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const errors: Record<string, string> = {};
    if (!loginEmail.trim()) errors.loginEmail = "Email is required";
    if (!loginPassword) errors.loginPassword = "Password is required";
    if (Object.keys(errors).length) { setFieldErrors(errors); return; }
    setFieldErrors({});

    const email = loginEmail.trim().toLowerCase();
    if (email === DEMO.email) {
      if (loginPassword !== DEMO.password) { setError("Incorrect password. Try: demo123"); return; }
      setLoading(true);
      setTimeout(() => {
        const session = { email: DEMO.email, name: DEMO.name };
        localStorage.setItem("mp_session", JSON.stringify(session));
        onAuth(session);
        setLoading(false);
        setSuccess({ name: DEMO.name, email: DEMO.email, isNew: false });
      }, 600);
      return;
    }
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email);
    if (!user) { setError("No account found with that email. Please sign up."); return; }
    if (user.password !== loginPassword) { setError("Incorrect password."); return; }

    setLoading(true);
    setTimeout(() => {
      const session = { email: user.email, name: user.name, college: user.college, year: user.year, domain: user.domain, joinedDate: user.joinedDate, referralCode: user.referralCode, referralBonus: user.referralBonus };
      localStorage.setItem("mp_session", JSON.stringify(session));
      onAuth(session);
      setLoading(false);
      setSuccess({ name: user.name, email: user.email, college: user.college, year: user.year, domain: user.domain, isNew: false, referralCode: user.referralCode });
    }, 600);
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const errors: Record<string, string> = {};
    const email = signupEmail.trim().toLowerCase();
    const name = signupName.trim();
    const referralCode = signupReferralCode.trim().toUpperCase();

    if (!name) errors.name = "Full name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Enter a valid email";
    if (!signupCollege.trim()) errors.college = "B-School name is required";
    if (signupPassword.length < 6) errors.password = "Min. 6 characters required";
    if (signupPassword !== signupConfirm) errors.confirm = "Passwords do not match";
    if (referralCode && !validateReferralCode(referralCode)) errors.referral = "Invalid referral code";

    if (Object.keys(errors).length) { setFieldErrors(errors); return; }
    setFieldErrors({});

    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email)) {
      setError("An account with this email already exists. Please log in.");
      return;
    }

    const newReferralCode = generateReferralCode(name);
    const newUser: StoredUser = {
      name, email, password: signupPassword,
      college: signupCollege.trim(), year: signupYear, domain: signupDomain,
      joinedDate: new Date().toISOString(),
      referralCode: newReferralCode, referralBonus: 0, referrals: [],
      referredBy: referralCode || undefined,
    };

    setLoading(true);
    setTimeout(() => {
      let updated = [...users, newUser];
      if (referralCode) {
        const idx = updated.findIndex(u => u.referralCode === referralCode);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], referrals: [...updated[idx].referrals, email], referralBonus: updated[idx].referralBonus + 750 };
        }
      }
      localStorage.setItem("mp_users", JSON.stringify(updated));
      const session = { name, email, college: signupCollege.trim(), year: signupYear, domain: signupDomain, joinedDate: newUser.joinedDate, referralCode: newReferralCode, referralBonus: 0 };
      localStorage.setItem("mp_session", JSON.stringify(session));
      onAuth(session);
      setLoading(false);
      setSuccess({ name, email, college: signupCollege.trim(), year: signupYear, domain: signupDomain, isNew: true, referralCode: newReferralCode });
    }, 800);
  }

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => { });
  }

  const pwStrength = getPasswordStrength(signupPassword);
  const completion = getCompletion(signupName, signupEmail, signupCollege, signupPassword);
  const completionColor = completion < 50 ? "#EF4444" : completion < 75 ? "#F97316" : completion < 100 ? "#EAB308" : "#22C55E";

  // ─── Success Screen ───────────────────────────────────────────────────────────
  if (success) {
    return (
      <div
        style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(4,11,25,0.92)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
        onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div style={{ maxWidth: 520, width: "100%", background: "linear-gradient(155deg,#0E1D36 0%,#0A1424 100%)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 24, padding: "48px 44px", textAlign: "center", position: "relative", animation: "authModalIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 8, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            <X size={18} />
          </button>

          {/* Confetti / emoji */}
          <div style={{ fontSize: "3rem", marginBottom: 20, animation: "celebrateEmoji 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>
            {success.isNew ? "🎉" : "👋"}
          </div>

          {/* Avatar */}
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#E85D04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: 800, color: "#030810", margin: "0 auto 20px", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", animation: "avatarPop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}>
            {success.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)}
          </div>

          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#EDE8DF", marginBottom: 8, lineHeight: 1.2 }}>
            {success.isNew ? "Welcome aboard," : "Welcome back,"}
            <br />
            <span style={{ background: "linear-gradient(135deg,#F97316,#EDD47A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {success.name.split(" ")[0]}!
            </span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.45)", marginBottom: 28, lineHeight: 1.6 }}>
            {success.isNew ? "Your MBA Partner profile is ready. Explore your student portal." : "You're back in your student portal. Pick up where you left off."}
          </p>

          {/* Profile card */}
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px 22px", marginBottom: 20, textAlign: "left" }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Your Profile</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px" }}>
              {[
                { label: "Email", value: success.email },
                { label: "College", value: success.college || "—" },
                { label: "Batch Year", value: success.year || "—" },
                { label: "Domain", value: success.domain || "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "rgba(249,115,22,0.5)", marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: "0.88rem", color: "#EDE8DF", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Referral code — new signups only */}
          {success.isNew && success.referralCode && (
            <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.10), rgba(184,148,60,0.06))", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: 16, padding: "18px 20px", marginBottom: 24, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Gift size={16} color="#F97316" />
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F97316" }}>Your Referral Code</span>
              </div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Share &amp; earn ₹750 per friend. Your friend gets 10% off.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, padding: "10px 16px", borderRadius: 10, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.25)", fontFamily: "'Space Grotesk', monospace, system-ui", fontSize: "1.2rem", fontWeight: 800, letterSpacing: "0.14em", color: "#F97316", textAlign: "center" }}>
                  {success.referralCode}
                </div>
                <button onClick={() => handleCopyCode(success.referralCode!)} style={{ padding: "10px 16px", borderRadius: 10, background: copied ? "rgba(34,197,94,0.15)" : "rgba(249,115,22,0.12)", border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(249,115,22,0.35)"}`, color: copied ? "#22C55E" : "#F97316", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 }}>
                  {copied ? <><Check size={13} /> Copied!</> : "Copy"}
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="/dashboard/" onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 28px", borderRadius: 12, background: "linear-gradient(135deg,#F97316,#E85D04)", color: "#030810", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "opacity 0.2s", boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}>
              Go to Dashboard <ArrowRight size={16} />
            </a>
            <button onClick={onClose} style={{ padding: "10px 0", background: "transparent", border: "none", color: "rgba(255,255,255,0.35)", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              Continue Exploring
            </button>
          </div>
        </div>

        <style>{`
          @keyframes authModalIn {
            from { opacity:0; transform: scale(0.92) translateY(16px); }
            to { opacity:1; transform: scale(1) translateY(0); }
          }
          @keyframes celebrateEmoji {
            from { transform: scale(0) rotate(-20deg); }
            to { transform: scale(1) rotate(0); }
          }
          @keyframes avatarPop {
            from { transform: scale(0); opacity:0; }
            to { transform: scale(1); opacity:1; }
          }
        `}</style>
      </div>
    );
  }

  // ─── Main Modal ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(4,11,25,0.90)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: "100%",
        maxWidth: tab === "signup" ? 820 : 460,
        background: "linear-gradient(155deg,#0E1D36 0%,#0A1424 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        position: "relative",
        overflow: "hidden",
        maxHeight: "94vh",
        overflowY: "auto",
        transition: "max-width 0.35s cubic-bezier(0.4,0,0.2,1)",
        animation: "authModalIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(249,115,22,0.08)",
      }}>

        {/* Decorative top glow */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: "1px", background: "linear-gradient(90deg,transparent,rgba(249,115,22,0.5),transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "120px", background: "radial-gradient(ellipse 80% 80% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 8, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          <X size={18} />
        </button>

        {/* Inner content */}
        <div style={{ padding: tab === "signup" ? "36px 0 0" : "40px 40px 36px" }}>

          {/* Brand */}
          <div style={{ textAlign: "center", marginBottom: 28, ...(tab === "signup" ? { padding: "0 40px" } : {}) }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#F97316,#E85D04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: 800, color: "#030810" }}>MP</div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "#F3F0E8" }}>
                MBA<span style={{ color: "#F97316" }}>Partner</span>
              </span>
            </div>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.38)", margin: 0 }}>
              {tab === "login" ? "Sign in to access your student portal" : "Create your MBA Partner profile — free in 60 seconds"}
            </p>
          </div>

          {/* Tab switcher */}
          <div style={{ ...(tab === "signup" ? { padding: "0 40px" } : {}), marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4, border: "1px solid rgba(255,255,255,0.06)" }}>
              {(["login", "signup"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setError(""); setFieldErrors({}); }}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer",
                    fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.02em",
                    transition: "all 0.25s ease",
                    background: tab === t ? "linear-gradient(135deg,#F97316,#E85D04)" : "transparent",
                    color: tab === t ? "#040B19" : "rgba(255,255,255,0.4)",
                    fontFamily: "inherit",
                    boxShadow: tab === t ? "0 2px 12px rgba(249,115,22,0.25)" : "none",
                  }}
                >
                  {t === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>
          </div>

          {/* Demo badge */}
          {tab === "login" && (
            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "rgba(167,139,250,0.9)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>🔮 Try Demo Mode</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>demo@mbapartner.in · demo123</div>
              </div>
              <button
                onClick={() => { setLoginEmail("demo@mbapartner.in"); setLoginPassword("demo123"); }}
                style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "rgba(167,139,250,0.9)", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(99,102,241,0.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(99,102,241,0.15)"}
              >
                Auto-fill
              </button>
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div style={{ background: "rgba(251,113,133,0.08)", border: "1px solid rgba(251,113,133,0.3)", borderRadius: 12, padding: "12px 16px", color: "#FCA5A5", fontSize: "0.84rem", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, ...(tab === "signup" ? { marginLeft: 40, marginRight: 40 } : {}) }}>
              <AlertCircle size={15} color="#FCA5A5" style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* ─── LOGIN FORM ─── */}
          {tab === "login" && (
            <form onSubmit={handleLogin} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field
                label="Email Address" icon={Mail} type="email"
                placeholder="you@example.com"
                value={loginEmail} onChange={setLoginEmail}
                required autoComplete="email"
                error={fieldErrors.loginEmail}
              />
              <Field
                label="Password" icon={Lock} type={showLoginPw ? "text" : "password"}
                placeholder="Your password"
                value={loginPassword} onChange={setLoginPassword}
                required autoComplete="current-password"
                error={fieldErrors.loginPassword}
                rightSlot={
                  <button type="button" onClick={() => setShowLoginPw(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}>
                    {showLoginPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                }
              />

              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
                <div
                  style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${rememberMe ? "#F97316" : "rgba(255,255,255,0.2)"}`, background: rememberMe ? "#F97316" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", cursor: "pointer" }}
                  onClick={() => setRememberMe(m => !m)}
                >
                  {rememberMe && <Check size={11} color="#030810" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.45)", cursor: "pointer" }} onClick={() => setRememberMe(m => !m)}>Remember me</span>
              </label>

              <button type="submit" disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", borderRadius: 14, background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#F97316,#E85D04)", color: "#030810", fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.2s", boxShadow: loading ? "none" : "0 4px 20px rgba(249,115,22,0.3)", letterSpacing: "0.02em" }}>
                {loading ? <><span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(3,8,16,0.3)", borderTopColor: "#030810", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Signing in…</> : <><LogIn size={16} /> Sign In</>}
              </button>

              <div style={{ textAlign: "center", fontSize: "0.86rem", color: "rgba(255,255,255,0.35)", paddingTop: 4 }}>
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => { setTab("signup"); setError(""); setFieldErrors({}); }} style={{ color: "#F97316", fontWeight: 700, cursor: "pointer", textDecoration: "none", background: "none", border: "none", padding: 0, font: "inherit" }}>
                  Sign up free
                </button>
              </div>
            </form>
          )}

          {/* ─── SIGNUP FORM ─── */}
          {tab === "signup" && (
            <div style={{ display: "flex" }}>

              {/* LEFT: Form */}
              <div style={{ flex: 1, minWidth: 0, padding: "0 40px 40px" }}>
                <form onSubmit={handleSignup} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* Section: Personal Info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={13} color="#F97316" />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase" }}>Personal Info</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field
                      label="Full Name" icon={User} placeholder="Arjun Sharma"
                      value={signupName} onChange={setSignupName}
                      required autoComplete="name" error={fieldErrors.name}
                    />
                    <Field
                      label="Email" icon={Mail} type="email" placeholder="you@college.edu"
                      value={signupEmail} onChange={setSignupEmail}
                      required autoComplete="email" error={fieldErrors.email}
                    />
                  </div>

                  <Field
                    label="College / B-School" icon={Building} placeholder="IIM Ahmedabad, XLRI, NMIMS…"
                    value={signupCollege} onChange={setSignupCollege}
                    required autoComplete="organization" error={fieldErrors.college}
                  />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <SelectField label="Batch Year" icon={Calendar} value={signupYear} onChange={setSignupYear} options={YEARS} />
                    <SelectField label="Domain" icon={Briefcase} value={signupDomain} onChange={setSignupDomain} options={DOMAINS} />
                  </div>

                  {/* Section: Security */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, marginBottom: 4 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Lock size={13} color="#F97316" />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase" }}>Security</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                  </div>

                  <Field
                    label="Password" icon={Lock} type={showSignupPw ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={signupPassword} onChange={setSignupPassword}
                    required autoComplete="new-password" error={fieldErrors.password}
                    rightSlot={
                      <button type="button" onClick={() => setShowSignupPw(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}>
                        {showSignupPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />

                  {/* Password strength bar */}
                  {signupPassword && (
                    <div style={{ marginTop: -6 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= pwStrength.score ? pwStrength.color : "rgba(255,255,255,0.08)", transition: "background 0.25s" }} />
                        ))}
                      </div>
                      <span style={{ fontSize: "0.72rem", color: pwStrength.color, fontWeight: 600, transition: "color 0.25s" }}>
                        {pwStrength.label} password
                      </span>
                    </div>
                  )}

                  <Field
                    label="Confirm Password" icon={Lock} type={showConfirmPw ? "text" : "password"}
                    placeholder="Repeat your password"
                    value={signupConfirm} onChange={setSignupConfirm}
                    required autoComplete="new-password" error={fieldErrors.confirm}
                    rightSlot={
                      <button type="button" onClick={() => setShowConfirmPw(s => !s)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 0, display: "flex", alignItems: "center" }}>
                        {showConfirmPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    }
                  />

                  {/* Passwords match indicator */}
                  {signupConfirm && (
                    <div style={{ marginTop: -6, display: "flex", alignItems: "center", gap: 6, fontSize: "0.72rem", color: signupPassword === signupConfirm ? "#22C55E" : "#EF4444", fontWeight: 600 }}>
                      {signupPassword === signupConfirm ? <><Check size={11} /> Passwords match</> : <><AlertCircle size={11} /> Passwords don&apos;t match</>}
                    </div>
                  )}

                  {/* Section: Referral */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4, marginBottom: 4 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Gift size={13} color="#F97316" />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: "rgba(249,115,22,0.7)", textTransform: "uppercase" }}>Referral</span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>optional</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.05)" }} />
                  </div>

                  <div>
                    <Field
                      label="Referral Code" icon={Gift} placeholder="e.g. MPAR4K2X"
                      value={signupReferralCode} onChange={handleReferralCodeChange}
                      autoComplete="off" error={fieldErrors.referral}
                      rightSlot={
                        referralStatus !== "idle" ? (
                          referralStatus === "valid"
                            ? <Check size={14} color="#22C55E" />
                            : <AlertCircle size={14} color="#EF4444" />
                        ) : undefined
                      }
                      style={{ textTransform: "uppercase" } as React.CSSProperties}
                    />
                    {referralStatus === "valid" && (
                      <div style={{ marginTop: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", fontSize: "0.76rem", color: "#22C55E", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                        <Check size={11} /> Valid code — you&apos;ll get 10% off your first purchase!
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 0", borderRadius: 14, background: loading ? "rgba(249,115,22,0.5)" : "linear-gradient(135deg,#F97316,#E85D04)", color: "#030810", fontWeight: 800, fontSize: "0.95rem", border: "none", cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "all 0.2s", boxShadow: loading ? "none" : "0 4px 20px rgba(249,115,22,0.3)", marginTop: 4, letterSpacing: "0.02em" }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = "linear-gradient(135deg,#EDD47A,#F97316)"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,#F97316,#E85D04)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {loading ? (
                      <><span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(3,8,16,0.3)", borderTopColor: "#030810", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> Creating account…</>
                    ) : (
                      <><Sparkles size={16} /> Create Free Account</>
                    )}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.83rem", color: "rgba(255,255,255,0.3)", paddingTop: 4 }}>
                    Already have an account?{" "}
                    <button type="button" onClick={() => { setTab("login"); setError(""); setFieldErrors({}); }} style={{ color: "#F97316", fontWeight: 700, cursor: "pointer", background: "none", border: "none", padding: 0, font: "inherit" }}>
                      Sign in
                    </button>
                  </div>
                </form>
              </div>

              {/* RIGHT: Live Preview Panel */}
              <div style={{
                width: 220,
                flexShrink: 0,
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                padding: "28px 24px 40px",
              }}>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.10em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 20 }}>
                  Live Preview
                </div>

                {/* Avatar */}
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: "50%",
                    background: signupName ? "linear-gradient(135deg,#F97316,#E85D04)" : "rgba(255,255,255,0.06)",
                    border: `2px solid ${signupName ? "rgba(249,115,22,0.5)" : "rgba(255,255,255,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem", fontWeight: 800, color: signupName ? "#030810" : "rgba(255,255,255,0.15)",
                    margin: "0 auto 12px",
                    transition: "all 0.3s ease",
                    boxShadow: signupName ? "0 4px 20px rgba(249,115,22,0.3)" : "none",
                  }}>
                    {signupName ? signupName.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2) : <User size={24} />}
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: signupName ? "#EDE8DF" : "rgba(255,255,255,0.2)", minHeight: 22, transition: "color 0.2s" }}>
                    {signupName || "Your Name"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: signupEmail ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.15)", marginTop: 4, minHeight: 18, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", transition: "color 0.2s" }}>
                    {signupEmail || "your@email.com"}
                  </div>
                </div>

                {/* Info chips */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  {[
                    { icon: Building, label: "College", value: signupCollege },
                    { icon: Calendar, label: "Year", value: signupYear },
                    { icon: Briefcase, label: "Domain", value: signupDomain },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{
                      padding: "10px 12px",
                      borderRadius: 10,
                      background: value ? "rgba(249,115,22,0.06)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${value ? "rgba(249,115,22,0.18)" : "rgba(255,255,255,0.05)"}`,
                      transition: "all 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}>
                      <Icon size={13} color={value ? "rgba(249,115,22,0.7)" : "rgba(255,255,255,0.15)"} style={{ flexShrink: 0, transition: "color 0.2s" }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: value ? "rgba(249,115,22,0.55)" : "rgba(255,255,255,0.18)", marginBottom: 1 }}>{label}</div>
                        <div style={{ fontSize: "0.8rem", color: value ? "#EDE8DF" : "rgba(255,255,255,0.18)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {value || "—"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Completion ring */}
                <div style={{ marginTop: 20, padding: "14px 12px", borderRadius: 12, background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.09em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>Profile Progress</div>

                  {/* Progress bar */}
                  <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 4, height: 6, marginBottom: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${completion}%`, borderRadius: 4, background: `linear-gradient(90deg, ${completionColor}, ${completionColor}CC)`, transition: "width 0.4s ease, background 0.4s ease", boxShadow: `0 0 8px ${completionColor}40` }} />
                  </div>

                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: completionColor, lineHeight: 1, transition: "color 0.4s" }}>{completion}%</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: 3 }}>
                    {completion === 100 ? "✓ Ready to create" : `${4 - [signupName, signupEmail, signupCollege, signupPassword].filter(Boolean).length} field${4 - [signupName, signupEmail, signupCollege, signupPassword].filter(Boolean).length !== 1 ? "s" : ""} left`}
                  </div>
                </div>

                {/* Benefits */}
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                  {["Free forever", "IIM mentor match", "CV templates", "Earn ₹750/referral"].map(b => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.73rem", color: "rgba(255,255,255,0.35)" }}>
                      <Check size={11} color="rgba(34,197,94,0.6)" style={{ flexShrink: 0 }} />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes authModalIn {
          from { opacity:0; transform: scale(0.94) translateY(12px); }
          to { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes celebrateEmoji {
          from { transform: scale(0) rotate(-20deg); }
          to { transform: scale(1) rotate(0); }
        }
        @keyframes avatarPop {
          from { transform: scale(0); opacity:0; }
          to { transform: scale(1); opacity:1; }
        }
      `}</style>
    </div>
  );
}
