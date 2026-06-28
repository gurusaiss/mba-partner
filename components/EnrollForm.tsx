"use client";
import { useState } from "react";

const domains = ["Consulting", "Finance", "Marketing", "Human Resources", "Operations", "Product Management"];
const programmes = ["MBA", "PGDM", "Executive MBA", "Other"];
const years = ["2024", "2025", "2026", "2027"];

const STEPS = [
  { number: 1, title: "Contact Info" },
  { number: 2, title: "Your Program" },
  { number: 3, title: "Your Goal" },
];

const STEP_META: Record<number, { heading: string; subtitle: string }> = {
  1: { heading: "Your Contact Details", subtitle: "We'll use this to get in touch with you." },
  2: { heading: "Your Academic Profile", subtitle: "Tell us about your program and interests." },
  3: { heading: "Your Placement Goal", subtitle: "Anything specific you'd like us to know?" },
};

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  college: string;
  batchYear: string;
  programme: string;
  domain: string;
  message: string;
}

const EMPTY: FormData = {
  fullName: "", phone: "", email: "",
  college: "", batchYear: "", programme: "", domain: "",
  message: "",
};

function StepBar({ step, current }: { step: { number: number; title: string }; current: number }) {
  const state = step.number < current ? "done" : step.number === current ? "active" : "pending";

  const barStyle: React.CSSProperties = {
    height: "3px",
    borderRadius: "2px",
    marginBottom: "10px",
    background:
      state === "active"
        ? "linear-gradient(90deg, #D4AA52, #EDD47A)"
        : state === "done"
        ? "rgba(212,170,82,0.45)"
        : "rgba(255,255,255,0.08)",
  };

  const circleStyle: React.CSSProperties = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.78rem",
    fontWeight: 700,
    flexShrink: 0,
    marginBottom: "8px",
    ...(state === "active"
      ? { background: "rgba(212,170,82,0.12)", border: "1.5px solid rgba(212,170,82,0.5)", color: "var(--gold)" }
      : state === "done"
      ? { background: "rgba(212,170,82,0.2)", border: "1.5px solid rgba(212,170,82,0.6)", color: "var(--gold)" }
      : { background: "transparent", border: "1.5px solid var(--border)", color: "var(--dim)" }),
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.03em",
    color: state === "pending" ? "var(--dim)" : "var(--gold)",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div style={barStyle} />
      <div style={circleStyle}>{state === "done" ? "✓" : step.number}</div>
      <div style={labelStyle}>{step.title}</div>
    </div>
  );
}

export default function EnrollForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [sent, setSent] = useState(false);

  function set(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const meta = STEP_META[step];

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

          <div className="card" style={{ padding: "40px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "rgba(212,170,82,0.12)", border: "2px solid rgba(212,170,82,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "1.8rem", color: "var(--gold)",
                }}>✓</div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.6rem", color: "var(--text)", marginBottom: "14px", letterSpacing: "-0.02em" }}>
                  Enquiry Received
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto" }}>
                  We will contact you within 24 hours with a personalised recommendation. Check your inbox and WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

                <div style={{ display: "flex", gap: "0" }}>
                  {STEPS.map(s => <StepBar key={s.number} step={s} current={step} />)}
                </div>

                <div>
                  <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--text)", marginBottom: "4px" }}>{meta.heading}</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--muted)" }}>{meta.subtitle}</p>
                </div>

                <div key={step} style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.18s ease" }}>

                  {step === 1 && (
                    <>
                      <div className="field">
                        <label>Full Name</label>
                        <input type="text" placeholder="Aditya Kumar" required value={form.fullName} onChange={e => set("fullName", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="+91 98765 43210" required value={form.phone} onChange={e => set("phone", e.target.value)} />
                      </div>
                      <div className="field">
                        <label>Email Address</label>
                        <input type="email" placeholder="aditya@college.edu" required value={form.email} onChange={e => set("email", e.target.value)} />
                      </div>
                      <button
                        type="button"
                        className="btn-primary"
                        style={{ width: "100%", justifyContent: "center" }}
                        onClick={() => { if (form.fullName && form.phone && form.email) setStep(2); }}
                      >
                        Next →
                      </button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="field">
                        <label>College / B-School</label>
                        <input type="text" placeholder="IIM Indore" required value={form.college} onChange={e => set("college", e.target.value)} />
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="field">
                          <label>Batch Year</label>
                          <select required value={form.batchYear} onChange={e => set("batchYear", e.target.value)}>
                            <option value="">Select year</option>
                            {years.map(y => <option key={y}>{y}</option>)}
                          </select>
                        </div>
                        <div className="field">
                          <label>Programme</label>
                          <select required value={form.programme} onChange={e => set("programme", e.target.value)}>
                            <option value="">Select</option>
                            {programmes.map(p => <option key={p}>{p}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="field">
                        <label>Domain Interest</label>
                        <select required value={form.domain} onChange={e => set("domain", e.target.value)}>
                          <option value="">Select domain</option>
                          {domains.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <button
                          type="button"
                          style={{
                            flex: 1, padding: "12px", borderRadius: "8px",
                            background: "transparent", border: "1.5px solid var(--border)",
                            color: "var(--muted)", fontSize: "0.95rem", cursor: "pointer",
                          }}
                          onClick={() => setStep(1)}
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ flex: 2, justifyContent: "center" }}
                          onClick={() => { if (form.college && form.batchYear && form.programme && form.domain) setStep(3); }}
                        >
                          Next →
                        </button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="field">
                        <label>Message <span style={{ color: "var(--dim)", fontWeight: 400 }}>(optional)</span></label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your placement goal or timeline..."
                          value={form.message}
                          onChange={e => set("message", e.target.value)}
                        />
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "var(--dim)", marginTop: "-8px" }}>
                        We respond within 24 hours. No spam, ever.
                      </p>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <button
                          type="button"
                          style={{
                            flex: 1, padding: "12px", borderRadius: "8px",
                            background: "transparent", border: "1.5px solid var(--border)",
                            color: "var(--muted)", fontSize: "0.95rem", cursor: "pointer",
                          }}
                          onClick={() => setStep(2)}
                        >
                          ← Back
                        </button>
                        <button type="submit" className="btn-primary" style={{ flex: 2, justifyContent: "center" }}>
                          Submit Enquiry →
                        </button>
                      </div>
                    </>
                  )}

                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
