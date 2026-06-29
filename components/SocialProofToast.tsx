"use client";
import { useEffect, useState } from "react";

const enrollments = [
  { name: "Priya S.", school: "SIBM Pune", course: "Master Bundle", time: "2 min ago" },
  { name: "Rohit M.", school: "NMIMS Mumbai", course: "Placement Bootcamp", time: "5 min ago" },
  { name: "Ananya K.", school: "MDI Gurgaon", course: "Case Competition Bootcamp", time: "8 min ago" },
  { name: "Karan V.", school: "XLRI", course: "Live Project — Consulting", time: "12 min ago" },
  { name: "Sneha P.", school: "IIM Kozhikode", course: "Master Bundle", time: "15 min ago" },
  { name: "Arjun D.", school: "SPJIMR", course: "Placement Bootcamp", time: "18 min ago" },
  { name: "Meghna T.", school: "IIM Indore", course: "Placement + Case Combo", time: "22 min ago" },
  { name: "Vikram R.", school: "IIM Lucknow", course: "Live Project — Finance", time: "25 min ago" },
];

const styles = `
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-100%); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-120%); }
}
`;

export default function SocialProofToast() {
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;

    const showToast = (i: number) => {
      if (i >= enrollments.length) return;
      setIndex(i);
      setHiding(false);
      setVisible(true);

      // Hide after 5s
      const hideTimer = setTimeout(() => {
        setHiding(true);
        setTimeout(() => {
          setVisible(false);
          setHiding(false);
        }, 300);
      }, 5000);

      return hideTimer;
    };

    // First toast after 4s
    const initialTimer = setTimeout(() => {
      showToast(0);

      // Subsequent toasts every 8s
      let currentIndex = 1;
      const interval = setInterval(() => {
        if (stopped || currentIndex >= enrollments.length) {
          clearInterval(interval);
          return;
        }
        showToast(currentIndex);
        currentIndex++;
      }, 8000);

      return () => clearInterval(interval);
    }, 4000);

    return () => clearTimeout(initialTimer);
  }, [stopped]);

  if (!visible || index < 0) return null;

  const e = enrollments[index];

  return (
    <>
      <style>{styles}{`
  @media (max-width: 640px) {
    .social-proof-toast {
      bottom: 72px !important;
      left: 12px !important;
      width: calc(100vw - 24px) !important;
      max-width: 320px;
    }
  }
`}</style>
      <div className="social-proof-toast" style={{
        position: "fixed",
        bottom: 32,
        left: 28,
        zIndex: 200,
        width: 300,
      }}>
        <div style={{
          background: "var(--card)",
          border: "1px solid rgba(249,115,22,0.20)",
          borderRadius: 16,
          padding: "14px 18px",
          display: "flex",
          gap: 14,
          alignItems: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
          animation: hiding
            ? "slideOutLeft 0.3s ease forwards"
            : "slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          position: "relative",
        }}>
          {/* Close button */}
          <button
            onClick={() => { setStopped(true); setVisible(false); }}
            style={{
              position: "absolute",
              top: "8px",
              right: "10px",
              background: "none",
              border: "none",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "1rem",
              lineHeight: 1,
              padding: "2px 6px",
              borderRadius: "4px",
              fontFamily: "var(--font-sans)",
              transition: "color 0.15s",
            }}
          >×</button>

          {/* Avatar */}
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #F97316 0%, #FB923C 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.9rem",
            color: "#08090E",
            flexShrink: 0,
          }}>
            {e.name[0]}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
              <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text)" }}>{e.name}</span>
              <span style={{ fontSize: "0.72rem", color: "var(--muted)", marginLeft: "auto", whiteSpace: "nowrap", paddingLeft: 6 }}>{e.time}</span>
            </div>
            <div style={{ fontSize: "0.82rem", marginBottom: 2 }}>
              <span style={{ color: "var(--muted)" }}>Enrolled in </span>
              <span style={{ fontWeight: 600, color: "var(--gold)" }}>{e.course}</span>
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{e.school}</div>
          </div>
        </div>
      </div>
    </>
  );
}
