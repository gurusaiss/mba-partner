"use client";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24" style={{ background: "var(--card)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="card p-14 text-center" style={{
          background: "linear-gradient(160deg, rgba(201,168,76,0.06) 0%, var(--card) 60%)",
          border: "1px solid rgba(201,168,76,0.18)",
        }}>
          <div className="section-label justify-center mb-6">Join 5,000+ MBA Students</div>
          <h2 className="section-title mb-5" style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}>
            Your Placement Season<br />Starts Today
          </h2>
          <p className="mx-auto mb-10" style={{ color: "var(--muted)", maxWidth: "480px", fontSize: "1rem", lineHeight: 1.75 }}>
            Whether you are in Term 1 or prepping for final placements — the earlier you start, the better your odds.
            Get expert mentorship, real deliverables, and proven frameworks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#courses" className="btn-primary pulse">
              View All Courses <ArrowRight size={16} />
            </a>
            <a href="#enroll" className="btn-secondary">Free Counselling</a>
          </div>
        </div>
      </div>
    </section>
  );
}
