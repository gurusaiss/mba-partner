"use client";
import { useState } from "react";

export default function FreeMaterialBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      background: "linear-gradient(135deg, #1A0F00 0%, #1F1400 100%)",
      borderBottom: "1px solid rgba(249,115,22,0.20)",
      padding: "10px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      position: "sticky",
      top: 0,
      zIndex: 49,
      flexWrap: "wrap",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        {/* Pulsing dot */}
        <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", color: "#FCA5A5", fontWeight: 700 }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#EF4444",
            display: "inline-block",
            boxShadow: "0 0 0 0 rgba(239,68,68,0.4)",
            animation: "bannerPulse 2s infinite",
          }} />
          Limited Seats
        </span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>|</span>
        <span style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500 }}>
          🎓 <strong style={{ color: "var(--gold)" }}>Next batch starts soon</strong> — Enroll now and save up to{" "}
          <strong style={{ color: "#4ade80" }}>₹2,500</strong> on any Placement or Case Comp package
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <a href="#enroll" style={{
          fontSize: "0.78rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #F97316, #C2531A)",
          color: "#08090E",
          padding: "6px 16px",
          borderRadius: "100px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "opacity 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Claim Offer →
        </a>
        <button
          onClick={() => setDismissed(true)}
          style={{
            background: "none", border: "none", color: "rgba(255,255,255,0.35)",
            cursor: "pointer", fontSize: "1rem", padding: "2px 4px",
            lineHeight: 1, fontFamily: "var(--font-sans)",
          }}
          aria-label="Dismiss"
        >×</button>
      </div>
      <style>{`
        @keyframes bannerPulse {
          0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          70% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
          100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}
