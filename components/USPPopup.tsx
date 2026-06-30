"use client";
import { useState, useEffect } from "react";

interface USPPopupProps {
  onClose: () => void;
}

const usps = [
  "🎯 ATS-Optimised CVs — keywords that actually get shortlisted",
  "🏆 Case Competition Coaching by AIR 1, AIR 6, AIR 10, AIR 15",
  "💼 Real Live Projects under a Consulting Company — not simulation",
  "📊 MBB · Amazon · Accenture · Goldman · TAS — our placement results",
];

export default function USPPopup({ onClose }: USPPopupProps) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check sessionStorage — if already shown, close immediately
    if (typeof window !== "undefined") {
      const shown = sessionStorage.getItem("uspShown");
      if (shown) {
        onClose();
        return;
      }
    }
    setShouldRender(true);
    // Fade in after 50ms
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [onClose]);

  useEffect(() => {
    if (!shouldRender) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender]);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("uspShown", "true");
    }
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5,13,28,0.92)",
        backdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease"
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "90%",
          background: "var(--card)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "20px",
          padding: "48px 40px",
          textAlign: "center",
          position: "relative"
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "transparent",
            border: "none",
            color: "var(--muted)",
            fontSize: "1.2rem",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px 8px"
          }}
        >
          ✕
        </button>

        {/* Top chip */}
        <div style={{
          display: "inline-block",
          background: "rgba(249,115,22,0.1)",
          border: "1px solid rgba(249,115,22,0.2)",
          borderRadius: "100px",
          padding: "6px 16px",
          fontSize: "0.78rem",
          color: "var(--gold)",
          fontWeight: 600,
          letterSpacing: "0.04em",
          marginBottom: "24px"
        }}>
          Why 5,000+ MBA Students Choose Us
        </div>

        {/* Heading */}
        <h2
          className="serif"
          style={{
            fontSize: "1.8rem",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: "28px",
            background: "linear-gradient(135deg, var(--gold) 0%, #e8c76a 50%, var(--gold) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          The Unfair Advantage Most MBA Students Don&apos;t Know About
        </h2>

        {/* USP list */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", textAlign: "left", display: "flex", flexDirection: "column", gap: "14px" }}>
          {usps.map((usp, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "0.92rem",
                color: "var(--text)",
                lineHeight: 1.5
              }}
            >
              <span style={{ flexShrink: 0, marginTop: "1px" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "block" }}>
                  <circle cx="8" cy="8" r="8" fill="rgba(249,115,22,0.15)" />
                  <path d="M4.5 8.5L6.5 10.5L11.5 5.5" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {usp}
            </li>
          ))}
        </ul>

        {/* Trusted by */}
        <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "28px", lineHeight: 1.6 }}>
          Trusted by students at IIM A B C L K I · XLRI · MDI · NMIMS · FMS · JBIMS
        </p>

        {/* CTA */}
        <button
          className="btn-primary"
          onClick={handleClose}
          style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: 700, marginBottom: "12px" }}
        >
          Explore MBA Partner →
        </button>

        <p style={{ fontSize: "0.78rem", color: "var(--dim)" }}>
          or press Esc to close
        </p>
      </div>
    </div>
  );
}
