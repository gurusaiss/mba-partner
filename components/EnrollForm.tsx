"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const domains = ["Consulting", "Finance", "Marketing", "Human Resources", "Operations", "Product Management"];
const courses = [
  "Placements Bootcamp",
  "Placements Bootcamp + Case Comp",
  "Placements Bootcamp + 1 Live Project",
  "Case Competition",
  "Case Comp + 1 Live Project",
  "Live Project — 1 Domain",
  "Live Projects — 2 Domains",
  "Master Bootcamp + Case Comp + Live Project (Best Value)",
];

export default function EnrollForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", college: "", batch: "", course: "", domain: "", message: "",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production — wire to a backend / Formspree / Google Sheets
    setSubmitted(true);
  };

  return (
    <section id="enroll" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* Left — copy */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "var(--gold)" }} />
              <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Get Started</span>
            </div>
            <h2 className="font-display font-black leading-tight mb-5" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--text)" }}>
              Set Up Your<br />
              <span className="text-gold-gradient">Free Enquiry</span>
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
              Fill in the form and our team will reach out within <strong style={{ color: "var(--text)" }}>2 hours</strong> to help you
              choose the right programme for your goals and batch year.
            </p>

            {/* Stats */}
            <div className="space-y-5">
              {[
                { stat: "2 hrs", label: "Average team response time" },
                { stat: "5,000+", label: "Students in our network" },
                { stat: "98.7%", label: "Placement rate in target domains" },
                { stat: "9.6 / 10", label: "Average student rating" },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="font-display font-black text-xl w-24 flex-shrink-0" style={{ color: "var(--gold)" }}>
                    {s.stat}
                  </div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="mt-10 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
              <p className="text-sm mb-1" style={{ color: "var(--muted2)" }}>Prefer to call directly?</p>
              <a href="tel:+917042732092" className="font-display font-bold text-xl" style={{ color: "var(--gold)" }}>
                +91 7042732092
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="glass border-gold rounded-2xl p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={52} className="mx-auto mb-5" style={{ color: "#4ADE80" }} />
                  <h3 className="font-display font-bold text-2xl mb-3" style={{ color: "var(--text)" }}>
                    Enquiry Received
                  </h3>
                  <p style={{ color: "var(--muted)" }}>
                    Our team will contact you within 2 hours to discuss the right programme for your goals.
                  </p>
                  <a href="https://mbapartner.in" target="_blank" rel="noreferrer"
                    className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold mt-8">
                    Visit mbapartner.in
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display font-bold text-xl mb-6" style={{ color: "var(--text)" }}>
                    Enquiry Form
                  </h3>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" required>
                      <input
                        required
                        value={form.name}
                        onChange={e => set("name", e.target.value)}
                        placeholder="Your full name"
                        className="form-input"
                      />
                    </Field>
                    <Field label="Phone Number *" required>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="form-input"
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email Address *" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => set("email", e.target.value)}
                      placeholder="you@college.edu"
                      className="form-input"
                    />
                  </Field>

                  {/* College + Batch */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="B-School / College *" required>
                      <input
                        required
                        value={form.college}
                        onChange={e => set("college", e.target.value)}
                        placeholder="e.g. IIM Indore, MDI, XLRI"
                        className="form-input"
                      />
                    </Field>
                    <Field label="Batch Year *" required>
                      <select required value={form.batch} onChange={e => set("batch", e.target.value)} className="form-input">
                        <option value="">Select batch year</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                      </select>
                    </Field>
                  </div>

                  {/* Course + Domain */}
                  <Field label="Programme Interested In">
                    <select value={form.course} onChange={e => set("course", e.target.value)} className="form-input">
                      <option value="">Select a programme</option>
                      {courses.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>

                  <Field label="Preferred Domain (for Live Projects)">
                    <select value={form.domain} onChange={e => set("domain", e.target.value)} className="form-input">
                      <option value="">Select domain</option>
                      {domains.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label="Anything specific you'd like to discuss?">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={e => set("message", e.target.value)}
                      placeholder="Your goals, doubts, or any specific questions..."
                      className="form-input resize-none"
                    />
                  </Field>

                  <button type="submit" className="btn-gold w-full py-4 rounded-xl font-bold tracking-wide text-sm flex items-center justify-center gap-2">
                    <Send size={16} style={{ color: "#040D1E" }} />
                    Submit Enquiry
                  </button>

                  <p className="text-xs text-center" style={{ color: "var(--muted2)" }}>
                    We respect your privacy. No spam — ever.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: "var(--muted)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
