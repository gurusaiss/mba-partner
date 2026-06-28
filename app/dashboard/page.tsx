"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, BookOpen, FolderOpen, Calendar, User,
  LogOut, Download, CheckCircle, Lock, Star, ChevronRight
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
  college: string;
  year: string;
  domain: string;
  joinedDate: string;
}

type Tab = "overview" | "courses" | "resources" | "sessions" | "profile";

const courses = [
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
  const [saveMsg, setSaveMsg] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("mp_session");
    if (!raw) { window.location.href = "/"; return; }
    try {
      const s = JSON.parse(raw);
      setUser(s);
      setProfileForm({ name: s.name || "", email: s.email || "", college: s.college || "", year: s.year || "", domain: s.domain || "", linkedin: s.linkedin || "" });
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
        const users = JSON.parse(usersRaw);
        const idx = users.findIndex((u: UserData) => u.email === user.email);
        if (idx !== -1) { users[idx] = { ...users[idx], ...profileForm }; localStorage.setItem("mp_users", JSON.stringify(users)); }
      } catch {}
    }
    setUser(updated as UserData);
    setSaveMsg(true);
    setTimeout(() => setSaveMsg(false), 2000);
  };

  const daysSince = (date: string) => {
    if (!date) return 0;
    const diff = Date.now() - new Date(date).getTime();
    return Math.floor(diff / 86400000);
  };

  const initials = (name: string) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const navItems: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number }> }[] = [
    { id: "overview", label: "Overview", Icon: LayoutDashboard },
    { id: "courses", label: "My Courses", Icon: BookOpen },
    { id: "resources", label: "Resources", Icon: FolderOpen },
    { id: "sessions", label: "Sessions", Icon: Calendar },
    { id: "profile", label: "Profile", Icon: User },
  ];

  if (!loaded) return (
    <div style={{ minHeight: "100vh", background: "#040B19", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 40, height: 40, border: "3px solid rgba(212,170,82,0.2)", borderTop: "3px solid #D4AA52", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#040B19", fontFamily: "Inter, sans-serif", color: "#F3F0E8" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, flexShrink: 0, background: "#030A16", borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", height: "100vh" }}>
        <div style={{ padding: "24px 20px 16px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#D4AA52,#B8922E)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800, color: "#040B19" }}>MP</div>
            <span style={{ fontFamily: "serif", fontSize: "1.15rem", color: "#F3F0E8" }}>MBA<strong style={{ color: "#D4AA52" }}>Partner</strong></span>
          </Link>
        </div>
        <nav style={{ flex: 1, padding: "8px 12px", overflowY: "auto" }}>
          {navItems.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;
            return (
              <div key={id} onClick={() => setActiveTab(id)} style={{
                height: 44, display: "flex", alignItems: "center", gap: 10,
                padding: isActive ? "0 12px 0 10px" : "0 12px",
                borderRadius: 8, cursor: "pointer", fontSize: "0.875rem", fontWeight: 500,
                marginBottom: 4, transition: "all 0.18s",
                background: isActive ? "rgba(212,170,82,0.10)" : "transparent",
                color: isActive ? "#D4AA52" : "#91A9C0",
                borderLeft: isActive ? "2px solid #D4AA52" : "2px solid transparent",
              }}>
                <Icon size={17} />
                {label}
              </div>
            );
          })}
        </nav>
        <div style={{ marginTop: "auto", padding: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, background: "rgba(212,170,82,0.15)", color: "#D4AA52", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>
              {user ? initials(user.name) : "?"}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#F3F0E8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</div>
              <div style={{ fontSize: "0.72rem", color: "#506070", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#91A9C0", fontSize: "0.82rem", cursor: "pointer" }}>
            <LogOut size={14} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: 40, background: "#040B19" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#F3F0E8", margin: 0 }}>
            {activeTab === "overview" && `Welcome back, ${user?.name?.split(" ")[0]} 👋`}
            {activeTab === "courses" && "My Courses"}
            {activeTab === "resources" && "Resources"}
            {activeTab === "sessions" && "Sessions"}
            {activeTab === "profile" && "My Profile"}
          </h1>
          {activeTab === "courses" && (
            <button style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(212,170,82,0.10)", border: "1px solid rgba(212,170,82,0.3)", color: "#D4AA52", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>
              Browse More →
            </button>
          )}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { num: courses.length, label: "Courses Enrolled" },
                { num: 3, label: "CV Reviews Left" },
                { num: 4, label: "Mock Sessions Used" },
                { num: daysSince(user?.joinedDate || ""), label: "Days Since Joining" },
              ].map((s, i) => (
                <div key={i} style={{ background: "linear-gradient(155deg,#0E1D36,#0B1628)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: 24 }}>
                  <span style={{ display: "block", fontSize: "2rem", fontWeight: 700, color: "#D4AA52" }}>{s.num}</span>
                  <span style={{ fontSize: "0.82rem", color: "#91A9C0", marginTop: 4, display: "block" }}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              <div style={{ flex: 3, background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>My Progress</div>
                {courses.map((c, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#F3F0E8" }}>{c.title}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: "0.82rem", color: "#D4AA52", fontWeight: 600 }}>{c.progress}%</span>
                        <span style={{ fontSize: "0.8rem", color: "#D4AA52", cursor: "pointer" }}>Continue →</span>
                      </div>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(212,170,82,0.12)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#D4AA52,#EDD47A)", borderRadius: 3, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ flex: 2, background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>Quick Links</div>
                {[
                  { label: "Download Sample CV", href: "/brochures/case-comp-brochure.pdf" },
                  { label: "Book Mock PI Session", href: undefined, onClick: () => setActiveTab("sessions") },
                  { label: "View Leaderboard", href: "#cat-mocks" },
                  { label: "WhatsApp Mentor Group", href: "tel:+917042732092" },
                ].map((item, i) => (
                  <a key={i} href={item.href} onClick={item.onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none", textDecoration: "none", color: "#F3F0E8", cursor: "pointer" }}>
                    <span style={{ fontSize: "0.875rem" }}>{item.label}</span>
                    <ChevronRight size={15} color="#506070" />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>Recent Activity</div>
              {[
                { text: "Enrolled in Placement Bootcamp", time: "2 days ago", color: "#D4AA52" },
                { text: "Downloaded CV Template", time: "3 days ago", color: "#60A5FA" },
                { text: "Completed VARC Mock 1", time: "5 days ago", color: "#34D399" },
                { text: "Joined MBA Partner", time: user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "", color: "#D4AA52" },
                { text: "Profile setup complete", time: user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : "", color: "#A78BFA" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: "0.875rem", color: "#F3F0E8" }}>{item.text}</span>
                  <span style={{ fontSize: "0.78rem", color: "#506070" }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {courses.map((c, i) => (
                <div key={i} style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24 }}>
                  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700, marginBottom: 12, background: c.tagClass === "tag-blue" ? "rgba(96,165,250,0.12)" : "rgba(52,211,153,0.12)", color: c.tagClass === "tag-blue" ? "#60A5FA" : "#34D399", border: `1px solid ${c.tagClass === "tag-blue" ? "rgba(96,165,250,0.25)" : "rgba(52,211,153,0.25)"}` }}>{c.tag}</span>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F3F0E8", margin: "0 0 16px" }}>{c.title}</h3>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "0.78rem", color: "#91A9C0" }}>Progress</span>
                      <span style={{ fontSize: "0.78rem", color: "#D4AA52", fontWeight: 600 }}>{c.progress}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(212,170,82,0.12)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${c.progress}%`, background: "linear-gradient(90deg,#D4AA52,#EDD47A)", borderRadius: 3, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#91A9C0", marginBottom: 16 }}>Next: {c.nextLesson}</div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: "0.75rem", background: "rgba(255,255,255,0.06)", color: "#91A9C0", border: "1px solid rgba(255,255,255,0.09)" }}>👤 {c.mentor}</span>
                    <span style={{ padding: "4px 10px", borderRadius: 6, fontSize: "0.75rem", background: "rgba(255,255,255,0.06)", color: "#91A9C0", border: "1px solid rgba(255,255,255,0.09)" }}>📅 Expires {c.expires}</span>
                  </div>
                  <button style={{ padding: "10px 20px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#040B19", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer" }}>Continue →</button>
                </div>
              ))}
              <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24, opacity: 0.72 }}>
                <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700, marginBottom: 12, background: "rgba(167,139,250,0.12)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.25)" }}>Live Project</span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F3F0E8", margin: "0 0 8px" }}>Live Project — 2 Month Engagement</h3>
                <p style={{ fontSize: "0.85rem", color: "#91A9C0", marginBottom: 20 }}>Work on a real MBA project with a senior mentor over 2 months.</p>
                <button style={{ padding: "10px 20px", borderRadius: 10, background: "transparent", border: "1px solid rgba(212,170,82,0.4)", color: "#D4AA52", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Enroll Now</button>
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeTab === "resources" && (
          <div>
            <p style={{ color: "#91A9C0", marginBottom: 32, marginTop: -16 }}>Premium resources curated by top B-school alumni</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { icon: "📄", color: "#60A5FA", title: "CV Templates", subtitle: "50+ ATS-optimised CVs", items: ["Consulting CV", "Finance CV", "Marketing CV", "HR CV"], btn: "Download Pack" },
                { icon: "📊", color: "#34D399", title: "Case Decks", subtitle: "30+ Winning PPTs", items: ["Unilever Case (XLRI)", "Amazon Strategy (MDI)", "P&G Brand (NMIMS)", "Sample Deck"], btn: "View Gallery" },
                { icon: "🎙️", color: "#F59E0B", title: "Interview Transcripts", subtitle: "300+ transcripts", items: ["McKinsey PI (2024)", "BCG Case (2024)", "Goldman GD (2023)", "Amazon HR Round"], btn: "Access Library" },
                { icon: "📚", color: "#A78BFA", title: "Domain Compendiums", subtitle: "6 domain guides", items: ["Consulting Compendium", "Finance Compendium", "Marketing Bible", "HR Handbook"], btn: "Download All" },
              ].map((r, i) => (
                <div key={i} style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 28 }}>
                  <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{r.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F3F0E8", margin: "0 0 4px" }}>{r.title}</h3>
                  <div style={{ fontSize: "0.82rem", color: "#91A9C0", marginBottom: 16 }}>{r.subtitle}</div>
                  <div style={{ marginBottom: 20 }}>
                    {r.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: j < r.items.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                        <CheckCircle size={13} color="#34D399" />
                        <span style={{ fontSize: "0.85rem", color: "#F3F0E8" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#F3F0E8", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                    <Download size={14} /> {r.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {activeTab === "sessions" && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 16 }}>Upcoming Sessions</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { type: "Mock GD", topic: "B-School Strategy", date: "Jun 30, 2025 · 5:00 PM", mentor: "Vidhi Barolia" },
                  { type: "Mock PI", topic: "Consulting PI Round", date: "Jul 3, 2025 · 4:00 PM", mentor: "Yash Gohil" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 700, background: "rgba(99,102,241,0.12)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.25)" }}>{s.type}</span>
                    </div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#F3F0E8", margin: "0 0 8px" }}>{s.topic}</h3>
                    <div style={{ fontSize: "0.82rem", color: "#91A9C0", marginBottom: 4 }}>📅 {s.date}</div>
                    <div style={{ fontSize: "0.82rem", color: "#91A9C0", marginBottom: 20 }}>👤 {s.mentor}</div>
                    <button style={{ padding: "10px 20px", borderRadius: 10, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.4)", color: "#818CF8", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Join Session</button>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 28, marginBottom: 32 }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>Book a Session</div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: "0.82rem", color: "#91A9C0", marginBottom: 10 }}>Session Type</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Mock GD", "Mock PI", "WAT Practice", "GDPI Full Round"].map(type => (
                    <label key={type} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, background: sessionType === type ? "rgba(212,170,82,0.12)" : "transparent", border: sessionType === type ? "1px solid rgba(212,170,82,0.4)" : "1px solid rgba(255,255,255,0.10)", color: sessionType === type ? "#D4AA52" : "#91A9C0", transition: "all 0.18s" }}>
                      <input type="radio" hidden value={type} checked={sessionType === type} onChange={() => setSessionType(type)} />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#91A9C0", marginBottom: 6 }}>Preferred Date</label>
                  <input type="date" value={sessionDate} onChange={e => setSessionDate(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#111F3C", border: "1px solid rgba(255,255,255,0.12)", color: "#F3F0E8", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", color: "#91A9C0", marginBottom: 6 }}>Preferred Time</label>
                  <select value={sessionTime} onChange={e => setSessionTime(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#111F3C", border: "1px solid rgba(255,255,255,0.12)", color: "#F3F0E8", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#91A9C0", marginBottom: 6 }}>Note (optional)</label>
                <textarea value={sessionNote} onChange={e => setSessionNote(e.target.value)} rows={3} placeholder="Any specific topics or questions..." style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: "#111F3C", border: "1px solid rgba(255,255,255,0.12)", color: "#F3F0E8", fontSize: "0.9rem", outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              <button style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#040B19", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}>Request Session</button>
            </div>

            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 16 }}>Past Sessions</div>
              <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {["Date", "Type", "Mentor", "Score", "Notes"].map(h => (
                        <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: "0.75rem", fontWeight: 700, color: "#506070", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Jun 15", type: "Mock PI", mentor: "Yash Gohil", score: "7.8/10", notes: "Good structure, work on confidence" },
                      { date: "Jun 8", type: "Mock GD", mentor: "Shen Shaji", score: "8.2/10", notes: "Strong content contribution" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: i < 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                        <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "#91A9C0" }}>{row.date}</td>
                        <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "#F3F0E8" }}>{row.type}</td>
                        <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "#F3F0E8" }}>{row.mentor}</td>
                        <td style={{ padding: "14px 20px", fontSize: "0.875rem", color: "#D4AA52", fontWeight: 600 }}>{row.score}</td>
                        <td style={{ padding: "14px 20px", fontSize: "0.82rem", color: "#91A9C0" }}>{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
            <div>
              <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>Personal Information</div>
                {[
                  { label: "Full Name", key: "name", type: "text", readonly: false },
                  { label: "Email", key: "email", type: "email", readonly: true },
                  { label: "College / B-School", key: "college", type: "text", readonly: false },
                  { label: "Batch Year", key: "year", type: "text", readonly: false },
                  { label: "Domain", key: "domain", type: "text", readonly: false },
                  { label: "LinkedIn URL", key: "linkedin", type: "url", readonly: false },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", color: "#91A9C0", marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      readOnly={f.readonly}
                      value={profileForm[f.key as keyof typeof profileForm]}
                      onChange={e => !f.readonly && setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 10, background: f.readonly ? "rgba(255,255,255,0.03)" : "#111F3C", border: "1px solid rgba(255,255,255,0.12)", color: f.readonly ? "#506070" : "#F3F0E8", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", cursor: f.readonly ? "not-allowed" : "text" }}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
                  <button onClick={handleSaveProfile} style={{ padding: "12px 28px", borderRadius: 10, background: "linear-gradient(135deg,#D4AA52,#B8922E)", border: "none", color: "#040B19", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
                  {saveMsg && <span style={{ fontSize: "0.85rem", color: "#34D399", fontWeight: 600 }}>✓ Saved successfully</span>}
                </div>
              </div>
              <div style={{ background: "#0C1830", border: "1px solid rgba(220,50,50,0.2)", borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#F87171", textTransform: "uppercase", marginBottom: 12 }}>Danger Zone</div>
                <p style={{ fontSize: "0.85rem", color: "#91A9C0", marginBottom: 16 }}>This will end your session and log you out.</p>
                <button onClick={handleLogout} style={{ padding: "10px 24px", borderRadius: 10, background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#F87171", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Log Out</button>
              </div>
            </div>
            <div>
              <div style={{ background: "#0C1830", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", color: "#91A9C0", textTransform: "uppercase", marginBottom: 20 }}>Achievements</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { icon: <Star size={22} color="#D4AA52" />, title: "Early Adopter", desc: "Joined in the first batch", unlocked: true },
                    { icon: <BookOpen size={22} color="#506070" />, title: "Course Completer", desc: "Complete your first course", unlocked: false },
                    { icon: <CheckCircle size={22} color="#506070" />, title: "Mock Champion", desc: "Score 8+ in a mock session", unlocked: false },
                    { icon: <Download size={22} color="#506070" />, title: "CV Certified", desc: "Get your CV reviewed", unlocked: false },
                  ].map((badge, i) => (
                    <div key={i} style={{ background: badge.unlocked ? "rgba(212,170,82,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${badge.unlocked ? "rgba(212,170,82,0.2)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: 16, opacity: badge.unlocked ? 1 : 0.5, textAlign: "center" }}>
                      <div style={{ marginBottom: 8 }}>{badge.unlocked ? badge.icon : <Lock size={22} color="#506070" />}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, color: badge.unlocked ? "#D4AA52" : "#506070", marginBottom: 4 }}>{badge.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "#506070" }}>{badge.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
