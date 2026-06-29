"use client";
import { useState } from "react";

const courseNames = [
  "Placement Bootcamp — Master",
  "Placement Bootcamp — Mini",
  "Case Competition Bootcamp",
  "Live Project — 2 Month Engagement",
  "Live Project — 1 Month Engagement",
  "Master Bundle — Placements + Case Comp + Live Project",
  "Placement + Case Competition Combo",
  "Advanced Excel — Including Power Query",
  "Power BI — Interactive Dashboards",
];

const discountTable = [
  { course: "Placements", two: "20% off", three: "30% off" },
  { course: "Case Competition", two: "30% off", three: "40% off" },
  { course: "Live Projects", two: "30% off", three: "—" },
  { course: "Certifications", two: "30% off", three: "40% off" },
];

interface FormState {
  s1Name: string;
  s1Email: string;
  s2Name: string;
  s2Email: string;
  course: string;
  groupSize: string;
  message: string;
}

const defaultForm: FormState = {
  s1Name: "", s1Email: "",
  s2Name: "", s2Email: "",
  course: courseNames[0],
  groupSize: "2 students",
  message: ""
};

export default function GroupOffer() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ s1Name?: string; s1Email?: string; s2Name?: string; s2Email?: string }>({});

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (field in errors) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!form.s1Name.trim()) errs.s1Name = "Required";
    if (!form.s1Email.trim()) errs.s1Email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.s1Email)) errs.s1Email = "Invalid email";
    if (!form.s2Name.trim()) errs.s2Name = "Required";
    if (!form.s2Email.trim()) errs.s2Email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.s2Email)) errs.s2Email = "Invalid email";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSent(true);
  };

  const tierCards = [
    {
      label: "Duo",
      icon: "👥",
      students: "2 Students",
      savings: "Save 20–30%",
      desc: "Two students enroll together and split the discount. Works across Placements, Case Comp, Live Projects, and Certifications.",
      bg: "rgba(201,168,76,0.06)",
      border: "rgba(201,168,76,0.3)",
      color: "var(--gold)"
    },
    {
      label: "Trio+",
      icon: "🏅",
      students: "3+ Students",
      savings: "Save 30–40%",
      desc: "Bigger group, bigger savings. Our highest discount tier for Case Competition and Certification courses.",
      bg: "rgba(74,222,128,0.06)",
      border: "rgba(74,222,128,0.3)",
      color: "#4ade80"
    },
    {
      label: "Case Comp Special",
      icon: "🏆",
      students: "2 Students",
      savings: "Save 30% on Case Comp",
      desc: "Pair up specifically for the Case Competition Bootcamp — 30% off when you register as a duo.",
      bg: "rgba(165,180,252,0.06)",
      border: "rgba(165,180,252,0.3)",
      color: "#a5b4fc"
    }
  ];

  return (
    <section id="group-offer" style={{ padding: "96px 0", background: "linear-gradient(180deg, var(--navy) 0%, var(--card) 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div className="section-label">Group Enrollment</div>
          <h2 className="serif" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "10px" }}>
            Bring Your Study Buddy
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Enroll together and save — bigger groups, bigger discounts.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "56px" }}>
          {tierCards.map(tier => (
            <div
              key={tier.label}
              style={{
                background: tier.bg,
                border: `1px solid ${tier.border}`,
                borderRadius: "16px",
                padding: "32px 28px"
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{tier.icon}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: tier.color, marginBottom: "6px" }}>
                {tier.label}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--muted)", marginBottom: "8px" }}>{tier.students}</div>
              <div className="serif" style={{ fontSize: "1.4rem", fontWeight: 900, color: tier.color, marginBottom: "14px" }}>
                {tier.savings}
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7 }}>
                {tier.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "64px", overflowX: "auto" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "20px" }}>
            Course-Specific Discounts
          </h3>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "400px" }}>
            <thead>
              <tr>
                {["Course", "2 Students", "3+ Students"].map(col => (
                  <th
                    key={col}
                    style={{
                      padding: "12px 16px",
                      textAlign: col === "Course" ? "left" : "center",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--muted)",
                      borderBottom: "1px solid var(--border)"
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {discountTable.map((row, i) => (
                <tr
                  key={row.course}
                  style={{ background: i % 2 === 1 ? "rgba(255,255,255,0.015)" : "transparent" }}
                >
                  <td style={{ padding: "14px 16px", fontSize: "0.9rem", color: "var(--text)", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>
                    {row.course}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.9rem", color: "#4ade80", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                    {row.two}
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "0.9rem", color: row.three === "—" ? "var(--dim)" : "#4ade80", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
                    {row.three}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ maxWidth: "720px" }}>
          <h3 className="serif" style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text)", marginBottom: "8px" }}>
            Group Enrollment Form
          </h3>
          <p style={{ color: "var(--muted)", fontSize: "0.95rem", marginBottom: "32px" }}>
            Fill in details for both students — we&apos;ll process the group discount and send payment links.
          </p>

          {sent ? (
            <div style={{
              background: "rgba(74,222,128,0.06)",
              border: "1px solid rgba(74,222,128,0.22)",
              borderRadius: "16px",
              padding: "40px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2.4rem", marginBottom: "16px" }}>✅</div>
              <p style={{ color: "#4ade80", fontWeight: 700, fontSize: "1.05rem", marginBottom: "8px" }}>
                Group enrollment request sent!
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem" }}>
                We&apos;ll contact both of you within 24 hours with a discounted payment link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ border: "1px solid rgba(212,170,82,0.2)", borderRadius: "14px", overflow: "hidden" }}>
                  <div style={{
                    background: "rgba(212,170,82,0.10)",
                    borderBottom: "1px solid rgba(212,170,82,0.18)",
                    padding: "12px 20px"
                  }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--gold)" }}>
                      Student 1
                    </span>
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div className="field">
                      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.s1Name}
                        onChange={set("s1Name")}
                        className="field"
                        style={{ width: "100%", borderColor: errors.s1Name ? "#F87171" : undefined }}
                      />
                      {errors.s1Name && <span style={{ fontSize: "0.74rem", color: "#F87171", marginTop: "2px", display: "block" }}>{errors.s1Name}</span>}
                    </div>
                    <div className="field">
                      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={form.s1Email}
                        onChange={set("s1Email")}
                        className="field"
                        style={{ width: "100%", borderColor: errors.s1Email ? "#F87171" : undefined }}
                      />
                      {errors.s1Email && <span style={{ fontSize: "0.74rem", color: "#F87171", marginTop: "2px", display: "block" }}>{errors.s1Email}</span>}
                    </div>
                  </div>
                </div>

                <div style={{ border: "1px solid rgba(59,130,246,0.2)", borderRadius: "14px", overflow: "hidden" }}>
                  <div style={{
                    background: "rgba(59,130,246,0.10)",
                    borderBottom: "1px solid rgba(59,130,246,0.18)",
                    padding: "12px 20px"
                  }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#a5b4fc" }}>
                      Student 2
                    </span>
                  </div>
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div className="field">
                      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={form.s2Name}
                        onChange={set("s2Name")}
                        className="field"
                        style={{ width: "100%", borderColor: errors.s2Name ? "#F87171" : undefined }}
                      />
                      {errors.s2Name && <span style={{ fontSize: "0.74rem", color: "#F87171", marginTop: "2px", display: "block" }}>{errors.s2Name}</span>}
                    </div>
                    <div className="field">
                      <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={form.s2Email}
                        onChange={set("s2Email")}
                        className="field"
                        style={{ width: "100%", borderColor: errors.s2Email ? "#F87171" : undefined }}
                      />
                      {errors.s2Email && <span style={{ fontSize: "0.74rem", color: "#F87171", marginTop: "2px", display: "block" }}>{errors.s2Email}</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                    Course
                  </label>
                  <select
                    value={form.course}
                    onChange={set("course")}
                    className="field"
                    style={{ width: "100%" }}
                  >
                    {courseNames.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                    Group Size
                  </label>
                  <select
                    value={form.groupSize}
                    onChange={set("groupSize")}
                    className="field"
                    style={{ width: "100%" }}
                  >
                    {["2 students", "3 students", "4 students", "5+ students"].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)", marginBottom: "6px", fontWeight: 600 }}>
                  Message <span style={{ fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  placeholder="Any questions or specific requirements..."
                  value={form.message}
                  onChange={set("message")}
                  className="field"
                  rows={4}
                  style={{ width: "100%", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: "1rem", fontWeight: 700 }}
              >
                Request Group Enrollment →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
