"use client";

import { useState } from "react";

export default function FreeMaterialBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.06))", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "14px 40px" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>

        {/* Left: Label */}
        <span style={{ color: "var(--gold)", fontSize: "0.88rem", fontWeight: 500 }}>
          🎁 Free Material Available — Sample CVs + Compendiums for MBA Students
        </span>

        {/* Right: Buttons + Close */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <a
            href="#resources"
            className="btn-secondary"
            style={{ fontSize: "0.8rem", padding: "7px 16px", display: "inline-block" }}
          >
            Download Sample CV
          </a>
          <a
            href="#resources"
            className="btn-secondary"
            style={{ fontSize: "0.8rem", padding: "7px 16px", display: "inline-block" }}
          >
            Get Compendium
          </a>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", fontSize: "1.1rem", lineHeight: 1, padding: "4px 6px", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ✕
          </button>
        </div>

      </div>
    </div>
  );
}
