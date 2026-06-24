"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

type Mode = "mba" | "cat";

export default function ModeSelector({ onSelect }: { onSelect: (m: Mode) => void }) {
  const [visible, setVisible] = useState(false);
  const [choosing, setChoosing] = useState<Mode | null>(null);

  useEffect(() => {
    // Small delay so page paint happens first
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  function choose(m: Mode) {
    setChoosing(m);
    setTimeout(() => onSelect(m), 380);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(5,13,28,0.92)",
      backdropFilter: "blur(20px)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}>

      {/* Card */}
      <div style={{
        background: "var(--card)",
        border: "1px solid rgba(201,168,76,0.18)",
        borderRadius: "24px",
        padding: "56px 48px",
        maxWidth: "560px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "transform 0.4s ease",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
          <span className="btn-primary" style={{ width: "38px", height: "38px", padding: 0, borderRadius: "10px", fontSize: "0.75rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>MP</span>
          <span className="serif" style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--text)" }}>
            MBA<span className="gold-text">Partner</span>
          </span>
        </div>

        <h2 className="serif" style={{ fontSize: "1.9rem", fontWeight: 900, lineHeight: 1.2, color: "var(--text)", marginBottom: "10px" }}>
          Who are you?
        </h2>
        <p style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "40px", lineHeight: 1.65 }}>
          Choose your path and we'll show you exactly what you need.
        </p>

        {/* Options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

          {/* MBA Student */}
          <button onClick={() => choose("mba")}
            style={{
              background: choosing === "mba"
                ? "linear-gradient(135deg, #C9A84C, #A8863A)"
                : "var(--card2)",
              border: choosing === "mba"
                ? "2px solid #C9A84C"
                : "2px solid rgba(201,168,76,0.25)",
              borderRadius: "16px",
              padding: "28px 20px",
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
              transition: "all 0.22s ease",
              color: choosing === "mba" ? "#050D1C" : "var(--text)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            onMouseEnter={e => {
              if (choosing !== "mba") {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.background = "rgba(201,168,76,0.07)";
              }
            }}
            onMouseLeave={e => {
              if (choosing !== "mba") {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                e.currentTarget.style.background = "var(--card2)";
              }
            }}>
            <span style={{ fontSize: "2.4rem" }}>🎓</span>
            <div>
              <div className="serif" style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "5px", color: "inherit" }}>MBA Student</div>
              <div style={{ fontSize: "0.78rem", color: choosing === "mba" ? "rgba(5,13,28,0.7)" : "var(--muted)", lineHeight: 1.5 }}>
                Placements, Live Projects,<br />Case Competitions & more
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", fontWeight: 600, color: choosing === "mba" ? "#050D1C" : "var(--gold)" }}>
              Explore <ArrowRight size={13} />
            </div>
          </button>

          {/* CAT Aspirant */}
          <button onClick={() => choose("cat")}
            style={{
              background: choosing === "cat"
                ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                : "var(--card2)",
              border: choosing === "cat"
                ? "2px solid #6366f1"
                : "2px solid rgba(99,102,241,0.25)",
              borderRadius: "16px",
              padding: "28px 20px",
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "12px",
              transition: "all 0.22s ease",
              color: choosing === "cat" ? "#ffffff" : "var(--text)",
              fontFamily: "Inter, system-ui, sans-serif",
            }}
            onMouseEnter={e => {
              if (choosing !== "cat") {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.background = "rgba(99,102,241,0.08)";
              }
            }}
            onMouseLeave={e => {
              if (choosing !== "cat") {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                e.currentTarget.style.background = "var(--card2)";
              }
            }}>
            <span style={{ fontSize: "2.4rem" }}>📚</span>
            <div>
              <div className="serif" style={{ fontWeight: 800, fontSize: "1.05rem", marginBottom: "5px", color: "inherit" }}>CAT / OMETs Aspirant</div>
              <div style={{ fontSize: "0.78rem", color: choosing === "cat" ? "rgba(255,255,255,0.7)" : "var(--muted)", lineHeight: 1.5 }}>
                Strategy, GDPI prep,<br />B-School guidance & more
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "0.78rem", fontWeight: 600, color: choosing === "cat" ? "#fff" : "#a5b4fc" }}>
              Explore <ArrowRight size={13} />
            </div>
          </button>

        </div>

        <p style={{ marginTop: "28px", fontSize: "0.75rem", color: "var(--dim)" }}>
          You can switch anytime from the top navigation.
        </p>
      </div>
    </div>
  );
}
