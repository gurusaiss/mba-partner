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
    <section id="enroll" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left */}
          <div className="lg:col-span-2">
            <div className="section-label">Free Enquiry</div>
            <h2 className="section-title mb-5" style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}>
              Start Your<br />MBA Journey Right
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Fill in your details and we will reach out within 24 hours with a personalised recommendation based on your goals and timeline.
            </p>

            <div className="space-y-5">
              {[
                { val: "5,000+", label: "Students Mentored" },
                { val: "24 hrs", label: "Response Time" },
                { val: "9.6 / 10", label: "Average Rating" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="stat-num" style={{ fontSize: "1.4rem" }}>{s.val}</div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
              <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>Talk to us directly</div>
              <a href="tel:+919876543210" className="serif font-bold text-lg" style={{ color: "var(--gold)" }}>
                +91 98765 43210
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 card p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="serif font-bold text-xl mb-3" style={{ color: "var(--text)" }}>Enquiry Received</h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  We will contact you within 24 hours with a personalised recommendation. Check your inbox and WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label>Full Name</label>
                    <input type="text" placeholder="Aditya Kumar" required />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="aditya@college.edu" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label>College / B-School</label>
                    <input type="text" placeholder="IIM Indore" required />
                  </div>
                  <div className="field">
                    <label>Batch Year</label>
                    <select required>
                      <option value="">Select year</option>
                      {years.map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="field">
                    <label>Programme</label>
                    <select required>
                      <option value="">Select</option>
                      {programmes.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Domain Interest</label>
                    <select required>
                      <option value="">Select domain</option>
                      {domains.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label>Message (optional)</label>
                  <textarea rows={3} placeholder="Tell us about your placement goal or timeline..." />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
