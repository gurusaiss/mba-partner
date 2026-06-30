"use client";

import { useState } from "react";

const mentors = [
  {
    initials: "YG",
    name: "Yash Gohil",
    school: "IIM Ahmedabad",
    company: "Accenture Consulting",
    domain: "Consulting",
    bg: "rgba(232,93,4,0.12)",
    color: "var(--gold)",
    linkedin: "https://www.linkedin.com/in/yashgohil14/",
  },
  {
    initials: "SS",
    name: "Shen Shaji",
    school: "IIM Bangalore",
    company: "Media.Net",
    domain: "Product Management",
    bg: "rgba(96,165,250,0.1)",
    color: "#93C5FD",
    linkedin: "https://www.linkedin.com/in/shenshaji/",
  },
  {
    initials: "VB",
    name: "Vidhi Barolia",
    school: "IIM Lucknow",
    company: "PwC US",
    domain: "Finance",
    bg: "rgba(74,222,128,0.1)",
    color: "#86EFAC",
    linkedin: "https://www.linkedin.com/in/vidhi-barolia-a555a9271/",
  },
  {
    initials: "AG",
    name: "Aadesh Gupta",
    school: "IIM Mumbai",
    company: "L'Oreal",
    domain: "Marketing",
    bg: "rgba(251,113,133,0.1)",
    color: "#FCA5A5",
    linkedin: "https://www.linkedin.com/in/aadesh-gupta-609528194/",
  },
  {
    initials: "AR",
    name: "Ananyo Roy",
    school: "XLRI Jamshedpur",
    company: "TAS",
    domain: "HR",
    bg: "rgba(165,180,252,0.1)",
    color: "#C4B5FD",
    linkedin: "https://www.linkedin.com/in/ananyosroy/",
  },
  {
    initials: "AG2",
    name: "Ashutosh Gupta",
    school: "IIM Lucknow",
    company: "Gulf Oil",
    domain: "Operations",
    bg: "rgba(232,93,4,0.12)",
    color: "var(--gold)",
    linkedin: "https://www.linkedin.com/in/ashutosh-gupta-iiml/",
  },
];

const domainOptions = ["Consulting", "Finance", "Marketing", "HR", "Operations", "Product"];

const emptyForm = { name: "", bschool: "", domain: "Consulting", linkedin: "", videoLink: "" };

function LinkedInBadge({ href, color }: { href: string; color: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="View LinkedIn profile"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px 10px",
        borderRadius: "8px",
        fontSize: "0.72rem",
        fontWeight: 600,
        color: "#0A66C2",
        background: "rgba(10,102,194,0.09)",
        border: "1px solid rgba(10,102,194,0.22)",
        textDecoration: "none",
        transition: "all 0.18s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "rgba(10,102,194,0.16)";
        e.currentTarget.style.borderColor = "rgba(10,102,194,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "rgba(10,102,194,0.09)";
        e.currentTarget.style.borderColor = "rgba(10,102,194,0.22)";
      }}
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
      LinkedIn
    </a>
  );
}

export default function Mentors() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="mentors" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, var(--card2) 100%)" }}>
      <style>{`
        .mentor-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .mentor-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">IIM Alumni Network</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
            Learn From People Who Have Been There
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "640px" }}>
            Top Ranked Mentors per Domain — voted by 250+ students. 25+ more mentors from across B-Schools.
          </p>
        </div>

        {/* Mentor Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {mentors.map((m, i) => (
            <div
              key={i}
              className="card mentor-card"
              style={{
                padding: "28px",
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                boxShadow: hoveredIdx === i
                  ? `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${m.color}40`
                  : undefined,
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Avatar */}
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "0.95rem",
                flexShrink: 0,
                background: m.bg,
                color: m.color,
                border: `1px solid ${m.color}40`,
                position: "relative",
              }}>
                {m.initials.replace("2", "")}
                <span style={{
                  position: "absolute",
                  bottom: "-4px",
                  right: "-4px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#22C55E",
                  border: "2px solid var(--card, #0F1018)",
                  display: hoveredIdx === i ? "block" : "none",
                }} />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "3px" }}>{m.name}</div>
                <div style={{ fontSize: "0.88rem", color: "var(--gold)", marginBottom: "3px", fontWeight: 600 }}>{m.school}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "12px" }}>{m.company}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span className="tag" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>{m.domain}</span>
                  <LinkedInBadge href={m.linkedin} color={m.color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            90% of our mentors were once our students.{" "}
            <span style={{ color: "var(--gold)", fontWeight: 600 }}>Apply to give back.</span>
          </p>
        </div>

        {/* Apply to be a Mentor Card */}
        <div style={{ marginTop: "64px", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: "16px", padding: "40px" }}>
          <div style={{ marginBottom: "28px" }}>
            <h3 className="serif" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontWeight: 700, color: "var(--text)", marginBottom: "10px" }}>
              Were You a Successful MBA Partner Student?
            </h3>
            <p style={{ color: "var(--muted)", fontSize: "1rem", maxWidth: "600px" }}>
              Share your experience. Submit a 60-second video — tell us who you are and why you want to mentor the next batch.
            </p>
          </div>

          {submitted ? (
            <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: "12px", padding: "24px", color: "#86EFAC", fontSize: "1rem", fontWeight: 500 }}>
              ✅ Application received! We&apos;ll review your video and reach out within 3 days.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>Name</label>
                <input
                  className="field"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>B-School</label>
                <input
                  className="field"
                  type="text"
                  name="bschool"
                  value={form.bschool}
                  onChange={handleChange}
                  placeholder="e.g. IIM Ahmedabad"
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>Domain</label>
                <select
                  className="field"
                  name="domain"
                  value={form.domain}
                  onChange={handleChange}
                  style={{ cursor: "pointer" }}
                >
                  {domainOptions.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>LinkedIn URL</label>
                <input
                  className="field"
                  type="url"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                  required
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", gridColumn: "1 / -1" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--muted)", fontWeight: 500 }}>60-Second Video Link</label>
                <input
                  className="field"
                  type="url"
                  name="videoLink"
                  value={form.videoLink}
                  onChange={handleChange}
                  placeholder="Paste your YouTube/Drive/Loom video link"
                  required
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 32px",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Submit Application
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
