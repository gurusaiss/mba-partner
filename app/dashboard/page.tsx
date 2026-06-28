"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, BookOpen, FolderOpen, Calendar, User,
  LogOut, Download, CheckCircle, Lock, Star, ChevronRight, ExternalLink
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  college?: string;
  year?: string;
  domain?: string;
  joinedDate?: string;
  linkedin?: string;
}

type Tab = "overview" | "courses" | "resources" | "sessions" | "profile";

const enrolledCourses = [
  { title: "Placement Bootcamp — Master", tag: "Placements", tagClass: "tag-blue", progress: 65, nextLesson: "Domain Prep: Consulting", mentor: "Yash Gohil", expires: "Dec 2025" },
  { title: "Case Competition Bootcamp", tag: "Case Comp", tagClass: "tag-green", progress: 40, nextLesson: "Executive Summary Frameworks", mentor: "Shen Shaji", expires: "Nov 2025" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [user, setUser] = useState<UserData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", email: "", college: "", year: "", domain: "", linkedin: "" });
  const [sessionType, setSessionType] = useState("Mock GD");
  const [sessionDate, setSessionDate] = useState("");
  const [sessionTime, setSessionTime] = useState("Morning");
  const [sessionNote, setSessionNote] = useState("");
  const [sessionBooked, setSessionBooked] = useState(false);
  const [saveMsg, setSaveMsg] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "info" | "error" } | null>(null);

  function showToast(msg: string, type: "success" | "info" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  }

  useEffect(() => {
    const t = localStorage.getItem("mp_theme");
    if (t) document.documentElement.setAttribute("data-theme", t);

    const raw = localStorage.getItem("mp_session");
    if (!raw) { window.location.href = "/"; return; }
    try {
      const s = JSON.parse(raw) as UserData;
      setUser(s);
      setProfileForm({
        name: s.name || "",
        email: s.email || "",
        college: s.college || "",
        year: s.year || "",
        domain: s.domain || "",
        linkedin: s.linkedin || "",
      });
      setLoaded(true);
    } catch {
      window.location.href = "/";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mp_session");
    window.location.href = "/";
  };

  const handleSaveProfile = () => {
    if (!user) return;
    const updated = { ...user, ...profileForm };
    localStorage.setItem("mp_session", JSON.stringify(updated));
    const usersRaw = localStorage.getItem("mp_users");
    if (usersRaw) {
      try {
        const users = JSON.parse(usersRaw) as UserData[];
        const idx = users.findIndex(u => u.email === user.email);
        if (idx !== -1) { users[idx] = { ...users[idx], ...profileForm }; localStorage.setItem("mp_users", JSON.stringify(users)); }
      } catch { /**/ }
    }
    setUser(updated);
    setSaveMsg(true);
    showToast("Profile saved successfully!", "success");
    setTimeout(() => setSaveMsg(false), 2000);
  };

  const handleRequestSession = () => {
    if (!sessionDate) { showToast("Please select a preferred date.", "error"); return; }
    const booking = { type: sessionType, date: sessionDate, time: sessionTime, note: sessionNote, status: "pending", requestedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("mp_bookings") || "[]") as object[];
    localStorage.setItem("mp_bookings", JSON.stringify([...existing, booking]));
    setSessionBooked(true);
    showToast(`${sessionType} requested for ${sessionDate}. We'll confirm on WhatsApp!`, "success");
    setTimeout(() => setSessionBooked(false), 5000);
  };

  const daysSince = (date?: string) => {
    if (!date) return 0;
    return Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  };

  const initials = (name: string) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const navItems: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "courses", label: "My Courses", Icon: BookOpen },
    { id: "resources", label: "Resources", Icon: FolderOpen },
    { id: "sessions", label: "Sessions", Icon: Calendar },
    { id: "profile", label: "Profile", Icon: User },
  ];

  const toastColors = {
    success: { bg: "#071A0E", border: "rgba(52,211,153,0.35)", text: "#34D399" },
    info:    { bg: "#070E1E", border: "rgba(99,102,241,0.35)", text: "#818CF8" },
    error:   { bg: "#1A0707", border: "rgba(239,68,68,0.35)", text: "#F87171" },
  };

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: "var(--navy, #030810)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: 44, height: 44, border: "3px solid rgba(212,170,82,0.2)", borderTop: "3px solid #D4AA52", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  const bg = "var(--navy, #030810)";
  const cardBg = "var(--card, #0A1628)";
  const card2Bg = "var(--card2, #0F1E38)";
  const borderColor = "var(--border, rgba(255,255,255,0.08))";
  const textColor = "var(--text, #EDE8DF)";
  const mutedColor = "var(--muted, #7A95B0)";
  const dimColor = "var(--dim, #3A5060)";
  const goldColor = "var(--gold, #D4AA52)";

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: bg, fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif", color: textColor }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity:0; transform:translateX(-50%) translateY(-12px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        .dash-nav-item:hover { background: rgba(255,255,255,0.05) !important; color: ${textColor} !important; }
        .dash-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .dash-card:hover { border-color: rgba(212,170,82,0.28) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.3) !important; }
        .dash-link:hover { color: ${goldColor} !important; }
        .resource-btn:hover { background: rgba(255,255,255,0.10) !important; border-color: rgba(255,255,255,0.20) !important; }
        .session-chip:hover { opacity: 0.85; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 28, left: "50%", transform: "translateX(-50%)",
          zIndex: 9999, padding: "13px 26px", borderRadius: 12,
          background: toastColors[toast.type].bg,
          border: `1px solid ${toastColors[toast.type].border}`,
          color: toastColors[toast.type].text,
          fontSize: "0.9rem", fontWeight: 600, whiteSpace: "nowrap",
          boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
          animation: "slideDown 0.3s ease",
        }}>
          {toast.type === "error" ? "✕  " : toast.type === "info" ? "ℹ  " : "✓  "}{toast.msg}
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside style={{ width: 272, flexShrink: 0, background: "rgba(3,5,12,0.98)", borderRight: `1px solid ${borderColor}`, display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "28px 24px 18px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#D4AA52,#B8922E)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 800, color: "#030810" }}>MP</div>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: textColor }}>
              MBA<span style={{ color: goldColor }}>Partner</span>
            </span>
          </Link>
        </div>

        <div style={{ padding: "0 12px 12px", flex: 0 }}>
          <div style={{ height: 1, background: borderColor, margin: "0 4px 12px" }} />
          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: dimColor, textTransform: "uppercase", padding: "0 8px", marginBottom: 8 }}>Navigation</div>
        </div>

        <nav style={{ flex: 1, padding: "0 12px", overflowY: "auto" }}>
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <div key={id} className="dash-nav-item" onClick={() => setActiveTab(id)} style={{
                height: 46, display: "flex", alignItems: "center", gap: 12,
                padding: "0 14px", borderRadius: 10, cursor: "pointer",
                fontSize: "0.9rem", fontWeight: isActive ? 700 : 500,
                marginBottom: 3, transition: "all 0.18s",
                background: isActive ? "rgba(212,170,82,0.12)" : "transparent",
                color: isActive ? goldColor : mutedColor,
                borderLeft: isActive ? `3px solid ${goldColor}` : "3px solid transparent",
              }}>
                <Icon size={18} />
                {label}
              </div>
            );
          })}
        </nav>

        {/* User card */}
        <div style={{ padding: 16, borderTop: `1px solid ${borderColor}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: "10px 12px", borderRadius: 12, background: "rgba(212,170,82,0.06)", border: "1px solid rgba(212,170,82,0.12)" }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#D4AA52,#B8922E)", color: "#030810", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: "0.9rem", fontWeight: 800, flexShrink: 0 }}>
              {user ? initials(user.name) : "?"}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: textColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
              <div style={{ fontSize: "0.72rem", color: goldColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>{user?.college || "MBA Partner Student"}</div>
              <div style={{ fontSize: "0.68rem", color: dimColor, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#F87171", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, overflowY: "auto", background: bg }}>
        {/* Top bar */}
        <div style={{ padding: "32px 40px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: textColor, margin: 0, lineHeight: 1.15 }}>
              {activeTab === "overview" && `Welcome back, ${user?.name?.split(" ")[0]} 👋`}
              {activeTab === "courses" && "My Courses"}
              {activeTab === "resources" && "Resources"}
              {activeTab === "sessions" && "Sessions"}
              {activeTab === "profile" && "My Profile"}
            </h1>
            {activeTab === "overview" && (
              <p style={{ fontSize: "1rem", color: mutedColor, marginTop: 6 }}>
                {user?.college ? `${user.college} · ` : ""}{user?.domain || "MBA Student"} · Batch {user?.year || "2025"}
              </p>
            )}
          </div>
          {activeTab === "courses" && (
            <a href="/#courses" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: "rgba(212,170,82,0.10)", border: `1px solid rgba(212,170,82,0.3)`, color: goldColor, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,170,82,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(212,170,82,0.10)"; }}>
              Browse More <ExternalLink size={14} />
            </a>
          )}
        </div>

        <div style={{ padding: "0 40px 48px" }}>

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div>
              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18, marginBottom: 32 }}>
                {[
                  { num: enrolledCourses.length, label: "Courses Enrolled", color: goldColor, icon: "📚" },
                  { num: 3, label: "CV Reviews Left", color: "#60A5FA", icon: "📄" },
                  { num: 4, label: "Mock Sessions Done", color: "#34D399", icon: "🎯" },
                  { num: daysSince(user?.joinedDate), label: "Days Since Joining", color: "#C4B5FD", icon: "🗓" },
                ].map((s, i) => (
                  <div key={i} className="dash-card" style={{ background: `linear-gradient(155deg, ${cardBg}, rgba(10,22,40,0.8))`, border: `1px solid ${borderColor}`, borderRadius: 18, padding: "24px 24px 20px", transition: "all 0.22s" }}>
                    <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontSize: "2.4rem", fontWeight: 800, color: s.color, lineHeight: 1, fontFamily: "'Space Grotesk', system-ui, sans-serif", marginBottom: 8 }}>{s.num}</div>
                    <div style={{ fontSize: "0.85rem", color: mutedColor, fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 24, marginBottom: 28 }}>
                {/* Progress */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 24 }}>Course Progress</div>
                  {enrolledCourses.map((c, i) => (
                    <div key={i} style={{ marginBottom: i < enrolledCourses.length - 1 ? 28 : 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <div>
                          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: textColor }}>{c.title}</div>
                          <div style={{ fontSize: "0.8rem", color: mutedColor, marginTop: 2 }}>Next: {c.nextLesson}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                          <span style={{ fontSize: "1rem", fontWeight: 800, color: goldColor, fontFamily: "'Space Grotesk', system-ui" }}>{c.progress}%</span>
                          <span className="dash-link" onClick={() => showToast(`Opening ${c.title} — check your WhatsApp for the link.`, "info")} style={{ fontSize: "0.82rem", color: goldColor, cursor: "pointer", fontWeight: 600, transition: "color 0.2s" }}>Continue →</span>
                        </div>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: "rgba(212,170,82,0.10)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#D4AA52,#EDD47A)", borderRadius: 4, transition: "width 0.8s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick links */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 20 }}>Quick Links</div>
                  {[
                    { label: "Download Sample CV", action: () => { window.open("/brochures/case-comp-brochure.pdf", "_blank"); showToast("Downloading CV brochure…", "success"); } },
                    { label: "Book a Mock Session", action: () => setActiveTab("sessions") },
                    { label: "Browse All Courses", action: () => setActiveTab("courses") },
                    { label: "Contact on WhatsApp", action: () => { window.open("https://wa.me/917042732092", "_blank"); } },
                  ].map((item, i) => (
                    <div key={i} className="dash-link" onClick={item.action}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: i < 3 ? `1px solid ${borderColor}` : "none", cursor: "pointer", transition: "color 0.18s", color: textColor }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>{item.label}</span>
                      <ChevronRight size={16} color={dimColor} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 20 }}>Recent Activity</div>
                {[
                  { text: "Enrolled in Placement Bootcamp", time: "2 days ago", color: goldColor },
                  { text: "Downloaded CV Template", time: "3 days ago", color: "#60A5FA" },
                  { text: "Completed VARC Mock 1", time: "5 days ago", color: "#34D399" },
                  { text: "Joined MBA Partner", time: user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—", color: goldColor },
                ].map((item, i, arr) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 0", borderBottom: i < arr.length - 1 ? `1px solid ${borderColor}` : "none" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0, boxShadow: `0 0 8px ${item.color}60` }} />
                    <span style={{ flex: 1, fontSize: "0.9rem", color: textColor, fontWeight: 500 }}>{item.text}</span>
                    <span style={{ fontSize: "0.8rem", color: dimColor }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── COURSES ── */}
          {activeTab === "courses" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {enrolledCourses.map((c, i) => (
                <div key={i} className="dash-card" style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28, transition: "all 0.22s" }}>
                  <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, marginBottom: 14, background: c.tagClass === "tag-blue" ? "rgba(96,165,250,0.12)" : "rgba(52,211,153,0.12)", color: c.tagClass === "tag-blue" ? "#60A5FA" : "#34D399", border: `1px solid ${c.tagClass === "tag-blue" ? "rgba(96,165,250,0.25)" : "rgba(52,211,153,0.25)"}` }}>{c.tag}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: textColor, margin: "0 0 18px", lineHeight: 1.35 }}>{c.title}</h3>
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.82rem", color: mutedColor }}>Progress</span>
                      <span style={{ fontSize: "0.9rem", color: goldColor, fontWeight: 700, fontFamily: "'Space Grotesk', system-ui" }}>{c.progress}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(212,170,82,0.10)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#D4AA52,#EDD47A)", borderRadius: 4, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: "0.85rem", color: mutedColor, marginBottom: 16 }}>Next: <span style={{ color: textColor, fontWeight: 500 }}>{c.nextLesson}</span></div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                    <span style={{ padding: "5px 12px", borderRadius: 7, fontSize: "0.78rem", background: "rgba(255,255,255,0.05)", color: mutedColor, border: `1px solid ${borderColor}` }}>👤 {c.mentor}</span>
                    <span style={{ padding: "5px 12px", borderRadius: 7, fontSize: "0.78rem", background: "rgba(255,255,255,0.05)", color: mutedColor, border: `1px solid ${borderColor}` }}>📅 Expires {c.expires}</span>
                  </div>
                  <button className="dash-btn"
                    onClick={() => showToast(`Lesson materials sent to ${user?.email}. Check your inbox!`, "info")}
                    style={{ padding: "11px 22px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#030810", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                    Continue →
                  </button>
                </div>
              ))}
              {/* Upsell card */}
              <div className="dash-card" style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28, transition: "all 0.22s" }}>
                <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, marginBottom: 14, background: "rgba(167,139,250,0.12)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.25)" }}>Live Project</span>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: textColor, margin: "0 0 10px", lineHeight: 1.35 }}>Live Project — 2 Month Engagement</h3>
                <p style={{ fontSize: "0.9rem", color: mutedColor, marginBottom: 22, lineHeight: 1.65 }}>Work on a real MBA consulting or marketing project alongside a senior IIM alumni mentor over 2 months. CV-worthy deliverables.</p>
                <a href="/#enroll" style={{ display: "inline-flex", padding: "11px 22px", borderRadius: 10, background: "transparent", border: `1px solid rgba(212,170,82,0.4)`, color: goldColor, fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
                  Enroll Now →
                </a>
              </div>
            </div>
          )}

          {/* ── RESOURCES ── */}
          {activeTab === "resources" && (
            <div>
              <p style={{ color: mutedColor, marginBottom: 32, marginTop: -8, fontSize: "1rem" }}>Premium resources curated by IIM alumni for serious MBA students</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {[
                  { icon: "📄", color: "#60A5FA", title: "CV Templates", subtitle: "50+ ATS-optimised CVs", items: ["Consulting CV", "Finance CV", "Marketing CV", "HR CV"], btn: "Download Pack", action: () => { window.open("/brochures/case-comp-brochure.pdf", "_blank"); showToast("CV Template Pack downloading…", "success"); } },
                  { icon: "📊", color: "#34D399", title: "Case Decks", subtitle: "30+ Winning PPTs", items: ["Unilever Case (XLRI)", "Amazon Strategy (MDI)", "P&G Brand (NMIMS)", "Sample Deck"], btn: "View Gallery", action: () => showToast("Case Deck Gallery available in premium portal. Check WhatsApp group.", "info") },
                  { icon: "🎙️", color: "#F59E0B", title: "Interview Transcripts", subtitle: "300+ transcripts", items: ["McKinsey PI (2024)", "BCG Case (2024)", "Goldman GD (2023)", "Amazon HR Round"], btn: "Access Library", action: () => showToast("Interview Library access sent to your email.", "info") },
                  { icon: "📚", color: "#A78BFA", title: "Domain Compendiums", subtitle: "6 domain guides", items: ["Consulting Compendium", "Finance Compendium", "Marketing Bible", "HR Handbook"], btn: "Download All", action: () => showToast("Domain Compendiums downloading — check Downloads folder.", "success") },
                ].map((r, i) => (
                  <div key={i} className="dash-card" style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 28, transition: "all 0.22s" }}>
                    <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>{r.icon}</div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: textColor, margin: "0 0 4px" }}>{r.title}</h3>
                    <div style={{ fontSize: "0.85rem", color: mutedColor, marginBottom: 18 }}>{r.subtitle}</div>
                    <div style={{ marginBottom: 22 }}>
                      {r.items.map((item, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: j < r.items.length - 1 ? `1px solid ${borderColor}` : "none" }}>
                          <CheckCircle size={14} color="#34D399" />
                          <span style={{ fontSize: "0.88rem", color: textColor, fontWeight: 500 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <button className="resource-btn dash-btn" onClick={r.action}
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 20px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: `1px solid ${borderColor}`, color: textColor, fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                      <Download size={15} color={r.color} /> {r.btn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SESSIONS ── */}
          {activeTab === "sessions" && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 18 }}>Upcoming Sessions</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  {[
                    { type: "Mock GD", topic: "B-School Strategy Cases", date: "Jun 30 · 5:00 PM", mentor: "Vidhi Barolia" },
                    { type: "Mock PI", topic: "Consulting PI Deep Dive", date: "Jul 3 · 4:00 PM", mentor: "Yash Gohil" },
                  ].map((s, i) => (
                    <div key={i} className="dash-card" style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 26, transition: "all 0.22s" }}>
                      <div style={{ marginBottom: 14 }}>
                        <span style={{ padding: "4px 12px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.25)" }}>{s.type}</span>
                      </div>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: textColor, margin: "0 0 10px", lineHeight: 1.35 }}>{s.topic}</h3>
                      <div style={{ fontSize: "0.85rem", color: mutedColor, marginBottom: 4 }}>📅 {s.date}</div>
                      <div style={{ fontSize: "0.85rem", color: mutedColor, marginBottom: 22 }}>👤 {s.mentor}</div>
                      <button className="dash-btn"
                        onClick={() => showToast("Meeting link sent to your email. Check 1 hour before session.", "info")}
                        style={{ padding: "10px 22px", borderRadius: 10, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)", color: "#818CF8", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                        Join Session
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book a session */}
              <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 32, marginBottom: 32 }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 22 }}>Book a New Session</div>
                <div style={{ marginBottom: 22 }}>
                  <div style={{ fontSize: "0.85rem", color: mutedColor, marginBottom: 12, fontWeight: 500 }}>Session Type</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {["Mock GD", "Mock PI", "WAT Practice", "GDPI Full Round"].map(type => (
                      <label key={type} className="session-chip" style={{ padding: "9px 18px", borderRadius: 9, cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, background: sessionType === type ? "rgba(212,170,82,0.12)" : "transparent", border: `1px solid ${sessionType === type ? "rgba(212,170,82,0.4)" : borderColor}`, color: sessionType === type ? goldColor : mutedColor, transition: "all 0.18s" }}>
                        <input type="radio" hidden value={type} checked={sessionType === type} onChange={() => setSessionType(type)} />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", color: mutedColor, marginBottom: 8, fontWeight: 600 }}>Preferred Date</label>
                    <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: card2Bg, border: `1px solid ${borderColor}`, color: textColor, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", color: mutedColor, marginBottom: 8, fontWeight: 600 }}>Preferred Time</label>
                    <select value={sessionTime} onChange={e => setSessionTime(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: card2Bg, border: `1px solid ${borderColor}`, color: textColor, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}>
                      <option>Morning (9–12 AM)</option>
                      <option>Afternoon (1–4 PM)</option>
                      <option>Evening (5–8 PM)</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: "0.82rem", color: mutedColor, marginBottom: 8, fontWeight: 600 }}>Notes (optional)</label>
                  <textarea value={sessionNote} onChange={e => setSessionNote(e.target.value)} rows={3} placeholder="Any specific topics, target companies, or areas to focus on…" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: card2Bg, border: `1px solid ${borderColor}`, color: textColor, fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <button className="dash-btn" onClick={handleRequestSession}
                    style={{ padding: "13px 30px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#030810", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                    Request Session →
                  </button>
                  {sessionBooked && (
                    <div style={{ padding: "10px 18px", borderRadius: 10, background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.22)", color: "#34D399", fontSize: "0.85rem", fontWeight: 500 }}>
                      ✓ Requested! We&apos;ll confirm on WhatsApp within 2 hours.
                    </div>
                  )}
                </div>
              </div>

              {/* Past sessions */}
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 18 }}>Past Sessions</div>
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                        {["Date", "Type", "Mentor", "Score", "Notes"].map(h => (
                          <th key={h} style={{ padding: "14px 22px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, color: dimColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { date: "Jun 15", type: "Mock PI", mentor: "Yash Gohil", score: "7.8/10", notes: "Good structure, work on confidence" },
                        { date: "Jun 8", type: "Mock GD", mentor: "Shen Shaji", score: "8.2/10", notes: "Strong content contribution" },
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < 1 ? `1px solid ${borderColor}` : "none" }}>
                          <td style={{ padding: "16px 22px", fontSize: "0.88rem", color: mutedColor }}>{row.date}</td>
                          <td style={{ padding: "16px 22px", fontSize: "0.88rem", color: textColor, fontWeight: 600 }}>{row.type}</td>
                          <td style={{ padding: "16px 22px", fontSize: "0.88rem", color: textColor }}>{row.mentor}</td>
                          <td style={{ padding: "16px 22px", fontSize: "0.95rem", color: goldColor, fontWeight: 700, fontFamily: "'Space Grotesk', system-ui" }}>{row.score}</td>
                          <td style={{ padding: "16px 22px", fontSize: "0.85rem", color: mutedColor }}>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 32 }}>
              <div>
                {/* Profile header card */}
                <div style={{ background: "linear-gradient(135deg, rgba(212,170,82,0.10), rgba(212,170,82,0.04))", border: "1px solid rgba(212,170,82,0.18)", borderRadius: 18, padding: "28px 32px", marginBottom: 24, display: "flex", alignItems: "center", gap: 22 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#D4AA52,#B8943C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", fontWeight: 800, color: "#030810", flexShrink: 0 }}>
                    {user ? initials(user.name) : "?"}
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: textColor, marginBottom: 6, fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{user?.name}</div>
                    <div style={{ fontSize: "0.9rem", color: mutedColor, display: "flex", gap: 14, flexWrap: "wrap" }}>
                      {user?.college && <span>🏛 {user.college}</span>}
                      {user?.year && <span>📅 Batch {user.year}</span>}
                      {user?.domain && <span>💼 {user.domain}</span>}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: dimColor, marginTop: 6 }}>
                      Member since {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                    </div>
                  </div>
                </div>

                {/* Edit form */}
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 30, marginBottom: 24 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 22 }}>Personal Information</div>
                  {[
                    { label: "Full Name", key: "name", type: "text", readonly: false },
                    { label: "Email Address", key: "email", type: "email", readonly: true },
                    { label: "College / B-School", key: "college", type: "text", readonly: false },
                    { label: "Batch Year", key: "year", type: "text", readonly: false },
                    { label: "Domain Interest", key: "domain", type: "text", readonly: false },
                    { label: "LinkedIn URL", key: "linkedin", type: "url", readonly: false },
                  ].map(f => (
                    <div key={f.key} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontSize: "0.78rem", color: mutedColor, marginBottom: 8, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</label>
                      <input
                        type={f.type}
                        readOnly={f.readonly}
                        value={profileForm[f.key as keyof typeof profileForm]}
                        onChange={e => !f.readonly && setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 10, background: f.readonly ? "rgba(255,255,255,0.02)" : card2Bg, border: `1px solid ${f.readonly ? "rgba(255,255,255,0.06)" : borderColor}`, color: f.readonly ? dimColor : textColor, fontSize: "0.9rem", outline: "none", boxSizing: "border-box", cursor: f.readonly ? "not-allowed" : "text", fontFamily: "inherit", transition: "border-color 0.2s" }}
                        onFocus={e => { if (!f.readonly) (e.target as HTMLInputElement).style.borderColor = "rgba(212,170,82,0.5)"; }}
                        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = f.readonly ? "rgba(255,255,255,0.06)" : borderColor; }}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
                    <button className="dash-btn" onClick={handleSaveProfile}
                      style={{ padding: "13px 30px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#030810", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                      Save Changes
                    </button>
                    {saveMsg && <span style={{ fontSize: "0.88rem", color: "#34D399", fontWeight: 600 }}>✓ Saved</span>}
                  </div>
                </div>

                {/* Danger zone */}
                <div style={{ background: cardBg, border: "1px solid rgba(239,68,68,0.18)", borderRadius: 18, padding: 26 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: "#F87171", textTransform: "uppercase", marginBottom: 10 }}>Danger Zone</div>
                  <p style={{ fontSize: "0.88rem", color: mutedColor, marginBottom: 16 }}>This will end your session and log you out of all devices.</p>
                  <button className="dash-btn" onClick={handleLogout}
                    style={{ padding: "11px 24px", borderRadius: 10, background: "rgba(239,68,68,0.09)", border: "1px solid rgba(239,68,68,0.28)", color: "#F87171", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                    Log Out
                  </button>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, padding: 30 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.10em", color: dimColor, textTransform: "uppercase", marginBottom: 22 }}>Achievements</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {[
                      { icon: <Star size={24} color="#D4AA52" />, title: "Early Adopter", desc: "Joined in the first batch", unlocked: true },
                      { icon: <BookOpen size={24} color="#506070" />, title: "Course Completer", desc: "Complete your first course", unlocked: false },
                      { icon: <CheckCircle size={24} color="#506070" />, title: "Mock Champion", desc: "Score 8+ in a mock session", unlocked: false },
                      { icon: <Download size={24} color="#506070" />, title: "CV Certified", desc: "Get your CV reviewed", unlocked: false },
                    ].map((badge, i) => (
                      <div key={i} style={{ background: badge.unlocked ? "rgba(212,170,82,0.07)" : "rgba(255,255,255,0.02)", border: `1px solid ${badge.unlocked ? "rgba(212,170,82,0.22)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: 20, opacity: badge.unlocked ? 1 : 0.5, textAlign: "center", transition: "all 0.2s" }}>
                        <div style={{ marginBottom: 10 }}>{badge.unlocked ? badge.icon : <Lock size={24} color="#506070" />}</div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: badge.unlocked ? goldColor : dimColor, marginBottom: 5 }}>{badge.title}</div>
                        <div style={{ fontSize: "0.78rem", color: dimColor, lineHeight: 1.4 }}>{badge.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
