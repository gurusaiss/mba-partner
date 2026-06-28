"use client";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section style={{ padding: "96px 0", background: "linear-gradient(180deg, #0A0A14 0%, #0D0D1C 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <div className="card" style={{
          padding: "80px 60px", textAlign: "center",
          background: "linear-gradient(160deg, rgba(201,168,76,0.06) 0%, var(--card) 60%)",
          border: "1px solid rgba(201,168,76,0.18)",
        }}>
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "24px" }}>Join 5,000+ MBA Students</div>
          <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "20px" }}>
            Your Placement Season<br />Starts Today
          </h2>
          <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "0 auto 40px", fontSize: "1.05rem", lineHeight: 1.75 }}>
            Whether you are in Term 1 or prepping for final placements — the earlier you start, the better your odds.
            Get expert mentorship, real deliverables, and proven frameworks.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#courses" className="btn-primary pulse">View All Courses <ArrowRight size={15} /></a>
            <a href="#enroll" className="btn-secondary">Free Counselling</a>
          </div>
        </div>
      </div>
    </section>
  );
}
