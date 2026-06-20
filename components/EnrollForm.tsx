"use client";
import { useState } from "react";

const domains = ["Consulting", "Finance", "Marketing", "Human Resources", "Operations", "Product Management"];
const programmes = ["MBA", "PGDM", "Executive MBA", "Other"];
const years = ["2024", "2025", "2026", "2027"];

export default function EnrollForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="enroll" style={{ padding: "96px 0" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "64px", alignItems: "start" }}>

          <div>
            <div className="section-label">Free Enquiry</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem, 3vw, 2.6rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "20px" }}>
              Start Your<br />MBA Journey Right
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--muted)", marginBottom: "36px" }}>
              Fill in your details and we'll reach out within 24 hours with a personalised recommendation based on your goals and timeline.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "36px" }}>
              {[{ val: "5,000+", label: "Students Mentored" }, { val: "24 hrs", label: "Response Time" }, { val: "9.6/10", label: "Average Rating" }].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div className="stat-num" style={{ fontSize: "1.4rem" }}>{s.val}</div>
                  <div style={{ fontSize: "0.95rem", color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: "28px", borderTop: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "6px" }}>Talk to us directly</div>
              <a href="tel:+919876543210" className="serif" style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--gold)", textDecoration: "none" }}>+91 98765 43210</a>
            </div>
          </div>

          <div className="card" style={{ padding: "36px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>✓</div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.4rem", color: "var(--text)", marginBottom: "12px" }}>Enquiry Received</h3>
                <p style={{ fontSize: "1rem", color: "var(--muted)" }}>We will contact you within 24 hours with a personalised recommendation. Check your inbox and WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="field"><label>Full Name</label><input type="text" placeholder="Aditya Kumar" required /></div>
                  <div className="field"><label>Phone Number</label><input type="tel" placeholder="+91 98765 43210" required /></div>
                </div>
                <div className="field"><label>Email Address</label><input type="email" placeholder="aditya@college.edu" required /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="field"><label>College / B-School</label><input type="text" placeholder="IIM Indore" required /></div>
                  <div className="field"><label>Batch Year</label>
                    <select required><option value="">Select year</option>{years.map(y => <option key={y}>{y}</option>)}</select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="field"><label>Programme</label>
                    <select required><option value="">Select</option>{programmes.map(p => <option key={p}>{p}</option>)}</select>
                  </div>
                  <div className="field"><label>Domain Interest</label>
                    <select required><option value="">Select domain</option>{domains.map(d => <option key={d}>{d}</option>)}</select>
                  </div>
                </div>
                <div className="field"><label>Message (optional)</label><textarea rows={3} placeholder="Tell us about your placement goal or timeline..." /></div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Submit Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
