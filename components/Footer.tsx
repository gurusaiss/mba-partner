"use client";

import { useState, FormEvent } from "react";

const links = {
  Platform: [
    { label: "Live Projects", href: "#offerings" },
    { label: "Placements Prep", href: "#offerings" },
    { label: "Case Competitions", href: "#offerings" },
    { label: "Resource Repository", href: "#resources" },
  ],
  Courses: [
    { label: "Placement Bootcamp", href: "#courses" },
    { label: "Case Comp Bootcamp", href: "#courses" },
    { label: "Live Projects", href: "#courses" },
    { label: "All-in-One Combos", href: "#courses" },
  ],
  Company: [
    { label: "About Us", href: "#offerings" },
    { label: "Mentors", href: "#mentors" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#enroll" },
  ],
};

const trustBadges = [
  { value: "5,000+", label: "Students Placed" },
  { value: "IIM", label: "Alumni Founded" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "Top 10", label: "B-School Results" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function InstagramFunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/mba_partner?igsh=dGZuMmoyb3V2eDlx", Icon: InstagramIcon },
  { label: "Fun Instagram 😂", href: "https://www.instagram.com/mba_laughterwala?igsh=ZngzMmRnN3k3ZjZ2", Icon: InstagramFunIcon },
  { label: "YouTube", href: "https://youtube.com/@mbapartner?si=0TXLOPjxtMiHvJU7", Icon: YouTubeIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prodmarkconsulting?utm_source=share_via&utm_content=profile&utm_medium=member_android", Icon: LinkedInIcon },
];

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        background: "rgba(249,115,22,0.12)",
        border: "1px solid rgba(249,115,22,0.45)",
        borderRadius: "12px",
        padding: "14px 20px",
        color: "var(--text)",
        fontSize: "0.9rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        fontFamily: "var(--font-sans)",
        maxWidth: "340px",
      }}
    >
      <span style={{ color: "var(--gold)", fontSize: "1.1rem" }}>✓</span>
      {message}
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", marginLeft: "auto", padding: "0 0 0 8px", fontSize: "1rem", lineHeight: 1 }}
      >
        ×
      </button>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function handleNewsletterSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmail("");
    setToast("You're in! Check your inbox for free resources.");
    setTimeout(() => setToast(null), 5000);
  }

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <footer style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>

        {/* Newsletter bar */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "40px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>Get free MBA prep resources</p>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--muted)" }}>Templates, case frameworks, and insider tips — delivered free.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-label="Email address for free resources"
                style={{
                  background: "var(--card2)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "11px 16px",
                  fontSize: "0.9rem",
                  color: "var(--text)",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  minWidth: "220px",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "11px 22px", fontSize: "0.9rem", borderRadius: "8px", fontFamily: "var(--font-sans)", cursor: "pointer" }}
              >
                Get free resources
              </button>
            </form>
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ borderBottom: "1px solid var(--border)", padding: "28px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", justifyContent: "center" }}>
              <span style={{ width: "24px", height: "1px", background: "var(--border)" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--dim)" }}>Trusted by students across India</span>
              <span style={{ width: "24px", height: "1px", background: "var(--border)" }} />
            </div>
            <div style={{ display: "flex", gap: "0", flexWrap: "wrap", justifyContent: "center" }}>
              {trustBadges.map((badge, i) => (
                <div
                  key={badge.label}
                  style={{
                    padding: "16px 32px",
                    textAlign: "center",
                    borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                    flexShrink: 0,
                  }}
                >
                  <div className="gold-text" style={{ fontSize: "1.4rem", fontWeight: 800, lineHeight: 1 }}>{badge.value}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--dim)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main footer columns */}
        <div style={{ padding: "56px 0 40px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "40px",
              marginBottom: "48px",
            }}>

              {/* Brand column */}
              <div style={{ gridColumn: "span 1", minWidth: 0 }}>
                <a href="#home" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: "16px" }}>
                  <span className="btn-primary" style={{ width: "34px", height: "34px", padding: 0, borderRadius: "8px", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>MP</span>
                  <span className="serif" style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text)" }}>MBA<span className="gold-text">Partner</span></span>
                </a>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "20px" }}>
                  The mentorship platform serious MBA students rely on. Founded by IIM alumni.
                </p>

                {/* Social links */}
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                  {socialLinks.map(({ label, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      style={{
                        width: "36px", height: "36px",
                        borderRadius: "8px",
                        border: "1px solid var(--border)",
                        background: "rgba(255,255,255,0.03)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--muted)",
                        textDecoration: "none",
                        transition: "all 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(249,115,22,0.45)";
                        e.currentTarget.style.color = "var(--gold)";
                        e.currentTarget.style.background = "rgba(249,115,22,0.06)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--muted)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                      }}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>

                <p style={{ fontSize: "0.8rem", color: "var(--dim)", lineHeight: 1.6 }}>
                  Made with ❤️ by IIM Alumni
                </p>
              </div>

              {/* Nav columns */}
              {Object.entries(links).map(([section, items]) => (
                <div key={section} style={{ minWidth: 0 }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--dim)", marginBottom: "16px" }}>{section}</div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    {items.map(l => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          style={{ fontSize: "0.9rem", color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{ width: "100%", height: "1px", background: "var(--border)", marginBottom: "24px" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--dim)", margin: 0 }}>© 2025 MBA Partner. All rights reserved.</p>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <p style={{ fontSize: "0.82rem", color: "var(--dim)", margin: 0 }}>Founded by IIM Alumni · For MBA Students Across India</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  style={{
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.22)",
                    borderRadius: "8px",
                    color: "var(--gold)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    padding: "7px 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-sans)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(249,115,22,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(249,115,22,0.08)")}
                >
                  ↑ Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
}
