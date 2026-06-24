"use client";
import { useState } from "react";
import { ArrowRight, BookOpen, Brain, Target, TrendingUp, Users, Award, Clock, CheckCircle } from "lucide-react";

/* ── Data ───────────────────────────────────────────────────── */

const catStats = [
  { value: "2.5L+", label: "CAT Aspirants/Year" },
  { value: "Top 1%", label: "Our Students' Results" },
  { value: "IIM A–Z", label: "Placement Coverage" },
  { value: "6 Months", label: "Ideal Prep Window" },
];

const sections = [
  {
    tag: "tag-indigo", label: "VARC", title: "Verbal Ability & Reading Comprehension",
    score: "34 questions · 40 mins",
    desc: "VARC is the most scoring section for students with strong reading habits. RC passages are dense and inference-heavy — speed and accuracy must be built simultaneously.",
    topics: ["Reading Comprehension (5 passages × 5–6 Qs)", "Para Jumbles (TITA)", "Para Summary", "Odd Sentence Out", "Vocabulary in Context"],
    strategy: "Read 1 editorial daily (The Hindu, Economic Times). Focus on elimination in TITA questions. Target: 24–27 correct answers for 99+ percentile.",
    percentile: "99%ile cutoff: ~38–40 raw score",
  },
  {
    tag: "tag-rose", label: "DILR", title: "Data Interpretation & Logical Reasoning",
    score: "32 questions · 40 mins",
    desc: "DILR is the most unpredictable CAT section. Set selection in the first 5 minutes determines everything. Practice 4–5 sets daily from past CAT papers.",
    topics: ["Bar/Line/Pie Charts", "Tables & Caselets", "Arrangements (Linear, Circular)", "Games & Tournaments", "Networks & Venn Diagrams"],
    strategy: "Attempt 3–4 sets fully rather than 6 sets partially. Skip unfamiliar set types early. Build a 'set-reading' habit — understand the full set before solving Q1.",
    percentile: "99%ile cutoff: ~30–34 raw score",
  },
  {
    tag: "tag-green", label: "QA", title: "Quantitative Ability",
    score: "34 questions · 40 mins",
    desc: "QA tests breadth of mathematical concepts from Class 10–12. Engineers typically dominate this section. Non-engineers should target 75–80 percentile as a floor.",
    topics: ["Arithmetic (TSD, Profit & Loss, SI/CI)", "Algebra (Functions, Equations)", "Geometry & Mensuration", "Number Theory", "Modern Maths (P&C, Probability)"],
    strategy: "Master Arithmetic first — it has the highest question density. Attempt 20–22 questions accurately rather than rushing 28. TITA questions are highest value.",
    percentile: "99%ile cutoff: ~42–46 raw score",
  },
];

const gdpiRounds = [
  { icon: "🎯", title: "Group Discussion (GD)", desc: "10–15 minute group exercise on current affairs, abstract topics, or business cases. Evaluated on content, communication, and leadership.", tips: ["Open the discussion with a structured frame — not just a point", "Build on others' arguments rather than repeating them", "Summarise the GD if given the chance — it shows leadership", "Read current affairs daily for 4 weeks before GD season"] },
  { icon: "🧠", title: "Personal Interview (PI)", desc: "20–40 minute 1:1 interview. Covers academics, work experience, Why MBA, SOP, current affairs, and domain knowledge.", tips: ["Prepare a 2-minute 'Tell me about yourself' cold-open", "Know your SOP line by line — any inconsistency is probed", "Prepare 3 examples each of: leadership, failure, achievement", "Read your target college's annual report and recent news"] },
  { icon: "📝", title: "Written Ability Test (WAT)", desc: "10–20 minute essay on a given statement or topic. Tests logical thinking, structure, and language quality.", tips: ["Structure: Introduction → 2–3 arguments → counterpoint → conclusion", "Word limit: stay within 200–250 words — quality over length", "Avoid extreme positions — balanced, nuanced answers score better", "Practice 2 WATs per week from September onwards"] },
];

const bschools = [
  { name: "IIM Ahmedabad", cutoff: "99.5+", fees: "~23L", speciality: "Case-based learning, General Management" },
  { name: "IIM Bangalore", cutoff: "99.0+", fees: "~24L", speciality: "Entrepreneurship, Technology Management" },
  { name: "IIM Calcutta", cutoff: "99.0+", fees: "~22L", speciality: "Finance, Consulting, Analytics" },
  { name: "IIM Lucknow", cutoff: "98.0+", fees: "~15L", speciality: "Marketing, Agri-Business" },
  { name: "IIM Kozhikode", cutoff: "97.0+", fees: "~19L", speciality: "Sustainability, Emerging Markets" },
  { name: "IIM Indore", cutoff: "97.0+", fees: "~16L", speciality: "Marketing, Strategy" },
  { name: "MDI Gurgaon", cutoff: "95.0+", fees: "~20L", speciality: "Finance, Defence Management" },
  { name: "IIFT Delhi", cutoff: "98.5+", fees: "~19L", speciality: "International Trade, Finance" },
];

const timeline = [
  { month: "June – July", phase: "Foundation", tasks: ["Build concept clarity in all 3 sections", "Start 1 editorial per day (VARC)", "Complete 1 standard prep textbook per section", "Take a diagnostic mock to benchmark yourself"] },
  { month: "Aug – Sep", phase: "Practice", tasks: ["50+ sectional mocks", "Daily DI-LR set practice (4–5 sets/day)", "Build QA formula sheet and revisit weekly", "Start WAT-PI prep for non-engineers"] },
  { month: "October", phase: "Full Mocks", tasks: ["2 full mocks per week — timed, exam conditions", "Deep analysis of every mock: error log, time analysis", "Revise weak topics aggressively", "Join a peer group for GD practice"] },
  { month: "Nov (CAT)", phase: "Final Sprint", tasks: ["1 mock every 2 days — reduce to revision mode", "Revise notes, not new material", "Sleep 7+ hrs nightly in the final week", "Attempt CAT calm — skip and return, don't panic"] },
  { month: "Dec – Feb", phase: "GDPI Season", tasks: ["Target shortlist analysis — college-specific prep", "Mock GD/PI sessions (MBA Partner can help)", "SOP and profile review", "Current affairs compilation for each target college"] },
];

const resources = [
  { icon: "📖", title: "CAT Prep Books", items: ["VARC: TIME/CL material + Arun Sharma for RC", "DILR: Arun Sharma — LR and DI (Level 1–3)", "QA: Arun Sharma Quant + NCERT 9–10 basics"] },
  { icon: "💻", title: "Free Online Resources", items: ["2IIM Daily Target (free CAT questions)", "TathaGat YouTube for QA shortcuts", "Cracku / CAT100percentile free sectionals", "Past 10 years CAT papers (must-solve)"] },
  { icon: "📊", title: "Mock Test Series", items: ["IMS / TIME / CL full mock series", "Attempt minimum 30 full mocks", "Analyse every mock — don't just take them", "Compare sector-wise with toppers' strategies"] },
  { icon: "📰", title: "GDPI Preparation", items: ["The Hindu editorial (daily)", "Business Standard Weekend Edition", "Economic Survey summary (annual)", "NASSCOM, RBI reports for B-school interviews"] },
];

/* ── Component ──────────────────────────────────────────────── */

const indigo = "rgba(99,102,241,0.12)";
const indigoBorder = "rgba(99,102,241,0.25)";
const indigoText = "#a5b4fc";

export default function CATPage() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div style={{ paddingTop: "68px" }}>

      {/* ── Hero ── */}
      <section style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 65%),
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px),
          var(--navy)
        `,
        backgroundSize: "100% 100%, 64px 64px, 64px 64px, 100% 100%",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "80px 40px", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "24px", background: indigo, border: `1px solid ${indigoBorder}`, borderRadius: "100px", padding: "6px 14px" }}>
                CAT 2025 · OMETs · GDPI
              </div>

              <h1 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.6rem)", fontWeight: 900, lineHeight: 1.12, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "20px" }}>
                Crack CAT. Get Into<br />
                <span style={{ background: "linear-gradient(135deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Your Dream IIM.
                </span>
              </h1>

              <p style={{ color: "var(--muted)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "36px", maxWidth: "440px" }}>
                Structured preparation strategy, section-wise deep dives, GDPI coaching, and B-school selection guidance — built by IIM alumni who aced CAT themselves.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px" }}>
                <a href="#cat-strategy" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                  View Study Plan <ArrowRight size={15} />
                </a>
                <a href="#cat-enroll" className="btn-secondary">Free Counselling</a>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {["Section-wise strategy for VARC, DILR & QA", "6-month structured preparation timeline", "GDPI mock sessions by IIM alumni", "B-school selection and SOP guidance"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckCircle size={15} style={{ color: indigoText, flexShrink: 0 }} />
                    <span style={{ fontSize: "0.93rem", color: "var(--muted)" }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — stats + CAT info card */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--border)", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--border)" }}>
                {catStats.map(s => (
                  <div key={s.label} style={{ background: "var(--card)", padding: "28px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "6px" }}>
                    <div className="serif" style={{ fontSize: "1.9rem", fontWeight: 900, background: "linear-gradient(135deg, #818cf8, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.04em" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "var(--card)", border: `1px solid ${indigoBorder}`, borderRadius: "16px", padding: "24px" }}>
                <div style={{ fontSize: "0.72rem", color: indigoText, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "14px" }}>
                  CAT 2025 — Key Dates
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { event: "Registration Opens", date: "August 2025" },
                    { event: "Registration Closes", date: "September 2025" },
                    { event: "Admit Card Release", date: "October 2025" },
                    { event: "CAT Exam Date", date: "November 2025" },
                    { event: "Results Declared", date: "January 2026" },
                    { event: "GDPI Season", date: "Feb – April 2026" },
                  ].map(d => (
                    <div key={d.event} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{d.event}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)" }}>{d.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section-wise Strategy ── */}
      <section id="cat-sections" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Section Deep-Dives
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Master All Three<br />CAT Sections
            </h2>
          </div>

          {/* Tab selector */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "36px" }}>
            {sections.map((s, i) => (
              <button key={s.label} onClick={() => setActiveSection(i)}
                style={{ padding: "10px 24px", borderRadius: "10px", border: "1px solid", cursor: "pointer", fontSize: "0.88rem", fontWeight: 600, transition: "all 0.18s", fontFamily: "Inter, system-ui, sans-serif",
                  background: activeSection === i ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                  color: activeSection === i ? "#fff" : "var(--muted)",
                  borderColor: activeSection === i ? "#6366f1" : "var(--border)",
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Active section content */}
          {(() => {
            const s = sections[activeSection];
            return (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div className="card" style={{ padding: "32px" }}>
                  <span className={`tag ${s.tag}`} style={{ marginBottom: "16px", display: "inline-block" }}>{s.label}</span>
                  <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.3rem", color: "var(--text)", marginBottom: "8px" }}>{s.title}</h3>
                  <div style={{ fontSize: "0.8rem", color: indigoText, fontWeight: 600, marginBottom: "16px" }}>{s.score}</div>
                  <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "24px" }}>{s.desc}</p>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--gold)", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>{s.percentile}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div className="card" style={{ padding: "24px" }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: indigoText, marginBottom: "14px" }}>Topics Covered</div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {s.topics.map(t => <li key={t} className="check-item" style={{ fontSize: "0.88rem" }}>{t}</li>)}
                    </ul>
                  </div>
                  <div className="card" style={{ padding: "24px", background: indigo, border: `1px solid ${indigoBorder}` }}>
                    <div style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: indigoText, marginBottom: "12px" }}>Expert Strategy</div>
                    <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--muted)" }}>{s.strategy}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── 6-Month Timeline ── */}
      <section id="cat-strategy" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Preparation Roadmap
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
              6-Month CAT<br />Preparation Timeline
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            {timeline.map((t, i) => (
              <div key={t.month} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px", paddingBottom: "32px", position: "relative" }}>
                {/* Left — timeline marker */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "4px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: indigoText, marginBottom: "4px" }}>{t.month}</div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 10px", borderRadius: "100px", display: "inline-block", background: indigo, color: indigoText, border: `1px solid ${indigoBorder}` }}>{t.phase}</div>
                  </div>
                </div>
                {/* Right — content */}
                <div className="card" style={{ padding: "24px", borderLeft: `3px solid ${i === timeline.length - 1 ? "#6366f1" : "var(--border)"}` }}>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {t.tasks.map(task => <li key={task} className="check-item" style={{ fontSize: "0.92rem" }}>{task}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GDPI Prep ── */}
      <section id="gdpi" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              After CAT
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
              GD · PI · WAT Preparation
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>A 99 percentile doesn't guarantee an IIM seat. GDPI converts shortlists into offers. Start early.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {gdpiRounds.map(r => (
              <div key={r.title} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{r.icon}</div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "10px" }}>{r.title}</h3>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "var(--muted)", marginBottom: "20px", flex: 1 }}>{r.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {r.tips.map(tip => <li key={tip} className="check-item" style={{ fontSize: "0.88rem" }}>{tip}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── B-School Guide ── */}
      <section id="bschool" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              College Selection
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Top B-Schools<br />Quick Reference
            </h2>
          </div>

          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "0", background: indigo, padding: "14px 24px" }}>
              {["B-School", "CAT Cutoff", "Fees (approx)", "Known For"].map(h => (
                <div key={h} style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: indigoText }}>{h}</div>
              ))}
            </div>
            {bschools.map((b, i) => (
              <div key={b.name} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 2fr", gap: "0", padding: "16px 24px", borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                <div className="serif" style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text)" }}>{b.name}</div>
                <div style={{ fontSize: "0.88rem", color: indigoText, fontWeight: 600 }}>{b.cutoff}</div>
                <div style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{b.fees}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>{b.speciality}</div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "16px", fontSize: "0.8rem", color: "var(--dim)", textAlign: "center" }}>Cutoffs are overall percentile. Section-wise cutoffs may apply. Data based on CAT 2023–24 trends.</p>
        </div>
      </section>

      {/* ── Mock Tests & Resources ── */}
      <section id="mocks" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Study Resources
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" }}>
              Everything You Need<br />to Prepare
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {resources.map(r => (
              <div key={r.title} className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{r.icon}</div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "14px" }}>{r.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {r.items.map(item => <li key={item} className="check-item" style={{ fontSize: "0.85rem" }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cat-enroll" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div className="card" style={{ padding: "80px 60px", textAlign: "center", background: `linear-gradient(160deg, ${indigo} 0%, var(--card) 60%)`, border: `1px solid ${indigoBorder}` }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "24px", background: indigo, border: `1px solid ${indigoBorder}`, borderRadius: "100px", padding: "6px 14px" }}>
              Free CAT Counselling
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "20px" }}>
              Your IIM Journey<br />Starts Now
            </h2>
            <p style={{ color: "var(--muted)", maxWidth: "480px", margin: "0 auto 40px", fontSize: "1.05rem", lineHeight: 1.75 }}>
              Talk to an IIM alumnus who cracked CAT. Get a personalised study plan, mock test schedule, and target college list — completely free.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://mbapartner.in" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                Book Free Session <ArrowRight size={15} />
              </a>
              <a href="tel:+919876543210" className="btn-secondary">Call +91 98765 43210</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
