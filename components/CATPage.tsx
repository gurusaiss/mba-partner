"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

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

const ometExams = [
  { name: "SNAP", full: "Symbiosis National Aptitude Test", desc: "Gateway to Symbiosis institutes: SIBM, SCMHRD & more." },
  { name: "NMAT", full: "NMIMS Management Aptitude Test", desc: "Accepted by NMIMS and 35+ partner B-schools." },
  { name: "MAHCET", full: "Maharashtra Common Entrance Test", desc: "Entry to JBIMS, PUMBA, and 300+ Maharashtra MBA colleges." },
  { name: "XAT", full: "Xavier Aptitude Test", desc: "XLRI flagship exam — known for its tough Decision Making section." },
  { name: "GMAT", full: "Graduate Management Admission Test", desc: "Global exam accepted by top ISB, IIM Executive programs & global MBAs." },
];

const leaderboardData = [
  { rank: 1, name: "Rahul S.", score: "48/60", percentile: "99.2%ile" },
  { rank: 2, name: "Priya M.", score: "45/60", percentile: "98.7%ile" },
  { rank: 3, name: "Arjun K.", score: "43/60", percentile: "97.8%ile" },
  { rank: 4, name: "Sneha T.", score: "41/60", percentile: "96.5%ile" },
  { rank: 5, name: "Dev P.", score: "39/60", percentile: "95.1%ile" },
];

/* ── Percentile helpers ─────────────────────────────────────── */
function calcVARC(score: number): number {
  if (score <= 0) return 0;
  if (score < 20) return score * 3;
  if (score < 30) return 60 + (score - 20) * 3;
  if (score < 40) return 90 + (score - 30) * 0.8;
  if (score < 50) return 98 + (score - 40) * 0.15;
  return 99.5;
}
function calcDILR(score: number): number {
  if (score <= 0) return 0;
  if (score < 15) return score * 4.5;
  if (score < 20) return 67.5 + (score - 15) * 4.5;
  if (score < 25) return 90 + (score - 20) * 1;
  if (score < 30) return 95 + (score - 25) * 0.6;
  return 98 + (score - 30) * 0.2;
}
function calcQA(score: number): number {
  if (score <= 0) return 0;
  if (score < 20) return score * 3.5;
  if (score < 30) return 70 + (score - 20) * 2.1;
  if (score < 40) return 91 + (score - 30) * 0.65;
  if (score < 50) return 97.5 + (score - 40) * 0.15;
  return 99.5;
}

function pctColor(pct: number): string {
  if (pct >= 99) return "#C9A84C";
  if (pct >= 95) return "#4ade80";
  if (pct >= 90) return "#facc15";
  return "#f87171";
}

function collegesForPct(overall: number): string {
  if (overall >= 99.5) return "IIM A, IIM B, IIM C";
  if (overall >= 99) return "IIM L, IIM K, IIM I, XLRI";
  if (overall >= 98) return "MDI, FMS, IIFT, IIM Udaipur";
  if (overall >= 97) return "NMIMS, IMI, IMT";
  if (overall >= 95) return "JBIMS, TAPMI, Great Lakes";
  return "Keep working — target state-level B-schools and tier-2 colleges";
}

/* ── IIM Predictor helpers ───────────────────────────────────── */
const iimCutoffs: { name: string; base: number }[] = [
  { name: "IIM Ahmedabad", base: 99.5 },
  { name: "IIM Bangalore", base: 99.0 },
  { name: "IIM Calcutta", base: 99.0 },
  { name: "IIM Lucknow", base: 97.5 },
  { name: "IIM Kozhikode", base: 97.0 },
  { name: "IIM Indore", base: 97.0 },
  { name: "XLRI", base: 97.0 },
  { name: "MDI Gurgaon", base: 95.0 },
  { name: "FMS Delhi", base: 96.0 },
  { name: "IIFT Delhi", base: 95.0 },
  { name: "NMIMS Mumbai", base: 90.0 },
];

/* ── Component ──────────────────────────────────────────────── */

const indigo = "rgba(99,102,241,0.12)";
const indigoBorder = "rgba(99,102,241,0.25)";
const indigoText = "#a5b4fc";

type MockTab = "VARC" | "QA" | "LRDI";

export default function CATPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [mockTab, setMockTab] = useState<MockTab>("VARC");

  // Percentile calculator
  const [varcScore, setVarcScore] = useState<number | "">("");
  const [dilrScore, setDilrScore] = useState<number | "">("");
  const [qaScore, setQaScore] = useState<number | "">("");

  const vPct = varcScore !== "" ? Math.min(99.9, calcVARC(Number(varcScore))) : null;
  const dPct = dilrScore !== "" ? Math.min(99.9, calcDILR(Number(dilrScore))) : null;
  const qPct = qaScore !== "" ? Math.min(99.9, calcQA(Number(qaScore))) : null;
  const overallPct = vPct !== null && dPct !== null && qPct !== null
    ? Math.round(((vPct + dPct + qPct) / 3) * 10) / 10
    : null;

  // College predictor
  const [cpPct, setCpPct] = useState<number | "">("");
  const [cpGender, setCpGender] = useState("Male");
  const [cpCategory, setCpCategory] = useState("General");
  const [cpWorkEx, setCpWorkEx] = useState("Fresher");
  const [cpAcademic, setCpAcademic] = useState("Strong (85%+ throughout)");
  const [cpBackground, setCpBackground] = useState("Engineering");
  const [cpResults, setCpResults] = useState<null | { name: string; adjCutoff: number; status: "likely" | "borderline" | "reach" }[]>(null);

  function runPredictor() {
    if (cpPct === "") return;
    const pct = Number(cpPct);
    let adj = 0;
    if (cpGender === "Female") adj -= 1.5;
    if (cpCategory === "OBC-NC") adj -= 2;
    else if (cpCategory === "SC") adj -= 5;
    else if (cpCategory === "ST") adj -= 8;
    else if (cpCategory === "EWS") adj -= 1;
    if (cpBackground === "Non-Engineering") adj -= 1;
    if (cpWorkEx === "24–36 months") adj -= 0.5;
    else if (cpWorkEx === "36+ months") adj -= 1;
    if (cpAcademic === "Strong (85%+ throughout)") adj -= 0.5;

    const results = iimCutoffs.map(c => {
      const adjCutoff = c.base + adj;
      const diff = adjCutoff - pct;
      let status: "likely" | "borderline" | "reach";
      if (diff <= 0.5) status = "likely";
      else if (diff <= 1.5) status = "borderline";
      else status = "reach";
      return { name: c.name, adjCutoff: Math.round(adjCutoff * 10) / 10, status };
    });
    setCpResults(results);
  }

  // Build mock lists
  function buildMocks(prefix: string) {
    return Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      if (n === 1) return { n, label: `${prefix} Mock 1`, status: "live" as const };
      if (n === 2) return { n, label: `${prefix} Mock 2`, status: "upcoming" as const };
      return { n, label: `${prefix} Mock ${n}`, status: "soon" as const };
    });
  }
  const mockData: Record<MockTab, ReturnType<typeof buildMocks>> = {
    VARC: buildMocks("VARC"),
    QA: buildMocks("QA"),
    LRDI: buildMocks("LRDI"),
  };

  const sectionLabel = {
    description: "Section Label",
  };
  void sectionLabel;

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

      {/* ── FREE SECTIONAL MOCKS ── */}
      <section id="cat-mocks" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Free Practice
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
              Free Sectional Mocks
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>20 mocks per section — practice exactly like the real CAT.</p>
          </div>

          {/* Sub-tab toggle */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "36px", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "6px", width: "fit-content" }}>
            {(["VARC", "QA", "LRDI"] as MockTab[]).map(tab => (
              <button key={tab} onClick={() => setMockTab(tab)}
                style={{ padding: "9px 28px", borderRadius: "8px", border: "1px solid", cursor: "pointer", fontSize: "0.88rem", fontWeight: 700, fontFamily: "Inter, system-ui, sans-serif", transition: "all 0.18s",
                  background: mockTab === tab ? indigo : "transparent",
                  color: mockTab === tab ? indigoText : "var(--muted)",
                  borderColor: mockTab === tab ? indigoBorder : "transparent",
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Mock grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "56px" }}>
            {mockData[mockTab].map(mock => (
              <div key={mock.n}
                onClick={mock.status === "live" ? () => {} : undefined}
                style={{
                  background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "14px",
                  display: "flex", flexDirection: "column", gap: "6px",
                  cursor: mock.status === "live" ? "pointer" : "default",
                  transition: mock.status === "live" ? "border-color 0.18s, transform 0.18s" : undefined,
                  position: "relative",
                }}>
                <div className="serif" style={{ fontSize: "1.6rem", fontWeight: 900, color: "var(--gold)", lineHeight: 1 }}>
                  {String(mock.n).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500 }}>{mock.label}</div>
                <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", justifyContent: "flex-end" }}>
                  {mock.status === "live" && (
                    <a href="#" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", padding: "4px 10px", borderRadius: "100px", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", textDecoration: "none" }}>
                      Live Now
                    </a>
                  )}
                  {mock.status === "upcoming" && (
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "100px", background: "rgba(250,204,21,0.12)", border: "1px solid rgba(250,204,21,0.25)", color: "#facc15" }}>
                      Coming Live: 5 Jul
                    </span>
                  )}
                  {mock.status === "soon" && (
                    <span style={{ fontSize: "0.72rem", fontWeight: 600, padding: "4px 10px", borderRadius: "100px", background: "rgba(61,79,101,0.5)", border: "1px solid var(--border)", color: "var(--dim)" }}>
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div style={{ background: "var(--card2)", border: `1px solid ${indigoBorder}`, borderRadius: "16px", padding: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--text)", marginBottom: "4px" }}>
                  Leaderboard — VARC Mock 1
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Your score will appear here after you attempt the mock.</p>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: indigo }}>
                    {["Rank", "Name", "Score", "Percentile"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: indigoText }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((row, i) => (
                    <tr key={row.rank} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div className="serif" style={{ fontWeight: 900, fontSize: "1.1rem", color: row.rank === 1 ? "#C9A84C" : row.rank === 2 ? "#9ca3af" : row.rank === 3 ? "#b45309" : "var(--muted)" }}>
                          #{row.rank}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 }}>{row.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: "0.9rem", color: "var(--muted)" }}>{row.score}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#4ade80" }}>{row.percentile}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button disabled style={{ padding: "9px 20px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--dim)", fontSize: "0.85rem", fontWeight: 600, cursor: "not-allowed", fontFamily: "Inter, system-ui, sans-serif" }}>
                View Full Leaderboard → (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── OMETs MOCKS ── */}
      <section id="omet-mocks" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Beyond CAT
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
              OMETs Preparation
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>SNAP · NMAT · MAHCET · XAT · GMAT</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {ometExams.slice(0, 3).map(exam => (
              <div key={exam.name} className="card" style={{ padding: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div className="serif" style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text)" }}>{exam.name}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: indigoText }}>{exam.full}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, textAlign: "center" }}>{exam.desc}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "4px" }}>20 Mocks Planned</div>
                <button disabled style={{ marginTop: "8px", padding: "9px 24px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--dim)", fontSize: "0.85rem", fontWeight: 600, cursor: "not-allowed", fontFamily: "Inter, system-ui, sans-serif" }}>
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px", maxWidth: "760px", margin: "20px auto 0" }}>
            {ometExams.slice(3).map(exam => (
              <div key={exam.name} className="card" style={{ padding: "24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div className="serif" style={{ fontSize: "1.8rem", fontWeight: 900, color: "var(--text)" }}>{exam.name}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: indigoText }}>{exam.full}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6, textAlign: "center" }}>{exam.desc}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "4px" }}>20 Mocks Planned</div>
                <button disabled style={{ marginTop: "8px", padding: "9px 24px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--dim)", fontSize: "0.85rem", fontWeight: 600, cursor: "not-allowed", fontFamily: "Inter, system-ui, sans-serif" }}>
                  Coming Soon
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERCENTILE CALCULATOR ── */}
      <section id="percentile-calc" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Score Estimator
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
              CAT Percentile Calculator
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Estimate your percentile based on your expected scores.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "40px", alignItems: "start" }}>
            {/* Left — explanation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: indigoText, marginBottom: "14px" }}>How It Works</div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--muted)" }}>
                  Based on historical CAT data (2020–2024), we estimate your percentile from your raw score. Each section is weighted independently, and the overall is the average of all three.
                </p>
              </div>
              <div className="card" style={{ padding: "24px", background: "rgba(250,204,21,0.06)", border: "1px solid rgba(250,204,21,0.2)" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#facc15", marginBottom: "10px" }}>Important Note</div>
                <p style={{ fontSize: "0.87rem", lineHeight: 1.7, color: "var(--muted)" }}>
                  Actual percentile varies by year, total test-takers, and difficulty level. Use this as a rough guide — not a guarantee.
                </p>
              </div>
              <div className="card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: indigoText, marginBottom: "14px" }}>Max Scores</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[["VARC", "60"], ["DILR", "52"], ["QA", "60"]].map(([sec, max]) => (
                    <div key={sec} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.88rem", color: "var(--muted)" }}>{sec}</span>
                      <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>out of {max}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — calculator */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="card" style={{ padding: "32px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* VARC */}
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px" }}>VARC Score (out of 60)</label>
                    <input type="number" min={0} max={60} value={varcScore}
                      onChange={e => setVarcScore(e.target.value === "" ? "" : Math.min(60, Math.max(0, Number(e.target.value))))}
                      placeholder="Enter score 0–60"
                      style={{ width: "100%", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", color: "var(--text)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif" }} />
                    {vPct !== null && (
                      <div style={{ marginTop: "6px", fontSize: "0.82rem", fontWeight: 600, color: pctColor(vPct) }}>
                        Estimated: {vPct.toFixed(1)}%ile
                      </div>
                    )}
                  </div>
                  {/* DILR */}
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px" }}>DILR Score (out of 52)</label>
                    <input type="number" min={0} max={52} value={dilrScore}
                      onChange={e => setDilrScore(e.target.value === "" ? "" : Math.min(52, Math.max(0, Number(e.target.value))))}
                      placeholder="Enter score 0–52"
                      style={{ width: "100%", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", color: "var(--text)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif" }} />
                    {dPct !== null && (
                      <div style={{ marginTop: "6px", fontSize: "0.82rem", fontWeight: 600, color: pctColor(dPct) }}>
                        Estimated: {dPct.toFixed(1)}%ile
                      </div>
                    )}
                  </div>
                  {/* QA */}
                  <div>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px" }}>QA Score (out of 60)</label>
                    <input type="number" min={0} max={60} value={qaScore}
                      onChange={e => setQaScore(e.target.value === "" ? "" : Math.min(60, Math.max(0, Number(e.target.value))))}
                      placeholder="Enter score 0–60"
                      style={{ width: "100%", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", color: "var(--text)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif" }} />
                    {qPct !== null && (
                      <div style={{ marginTop: "6px", fontSize: "0.82rem", fontWeight: 600, color: pctColor(qPct) }}>
                        Estimated: {qPct.toFixed(1)}%ile
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Overall result */}
              {overallPct !== null && (
                <div style={{ background: "var(--card2)", border: `1px solid ${overallPct >= 99 ? "rgba(201,168,76,0.4)" : overallPct >= 95 ? "rgba(74,222,128,0.3)" : overallPct >= 90 ? "rgba(250,204,21,0.3)" : "rgba(248,113,113,0.3)"}`, borderRadius: "16px", padding: "28px" }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", marginBottom: "12px" }}>Overall Estimated Percentile</div>
                  <div className="serif" style={{ fontSize: "3rem", fontWeight: 900, color: pctColor(overallPct), lineHeight: 1 }}>
                    {overallPct}%ile
                  </div>
                  <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border)" }}>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "10px", fontWeight: 600 }}>
                      Based on this score, you may be eligible for shortlists at:
                    </div>
                    <div style={{ fontSize: "0.95rem", color: overallPct >= 99 ? "#C9A84C" : overallPct >= 95 ? "#4ade80" : overallPct >= 90 ? "#facc15" : "#f87171", fontWeight: 600 }}>
                      {collegesForPct(overallPct)}
                    </div>
                  </div>
                </div>
              )}

              {overallPct === null && (varcScore !== "" || dilrScore !== "" || qaScore !== "") && (
                <div style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px", textAlign: "center", color: "var(--dim)", fontSize: "0.88rem" }}>
                  Enter all three scores to see your overall percentile.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLEGE PREDICTOR ── */}
      <section id="college-predictor" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Shortlist Predictor
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "12px" }}>
              IIM Shortlist Predictor
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem" }}>Based on your CAT percentile and profile, see which IIMs are likely to shortlist you.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "40px", alignItems: "start" }}>
            {/* Left — form */}
            <div className="card" style={{ padding: "32px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px" }}>CAT Percentile (0–100)</label>
                  <input type="number" min={0} max={100} step={0.1} value={cpPct}
                    onChange={e => setCpPct(e.target.value === "" ? "" : Math.min(100, Math.max(0, Number(e.target.value))))}
                    placeholder="e.g. 98.5"
                    style={{ width: "100%", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", color: "var(--text)", fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif" }} />
                </div>

                {[
                  { label: "Gender", val: cpGender, set: setCpGender, opts: ["Male", "Female", "Non-Binary"] },
                  { label: "Category", val: cpCategory, set: setCpCategory, opts: ["General", "OBC-NC", "SC", "ST", "EWS"] },
                  { label: "Work Experience", val: cpWorkEx, set: setCpWorkEx, opts: ["Fresher", "< 12 months", "12–24 months", "24–36 months", "36+ months"] },
                  { label: "Academic Profile", val: cpAcademic, set: setCpAcademic, opts: ["Strong (85%+ throughout)", "Average (70–85%)", "Below Average (< 70%)"] },
                  { label: "Background", val: cpBackground, set: setCpBackground, opts: ["Engineering", "Non-Engineering"] },
                ].map(field => (
                  <div key={field.label}>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--muted)", display: "block", marginBottom: "8px" }}>{field.label}</label>
                    <select value={field.val} onChange={e => field.set(e.target.value)}
                      style={{ width: "100%", background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", color: "var(--text)", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", fontFamily: "Inter, system-ui, sans-serif", cursor: "pointer" }}>
                      {field.opts.map(o => <option key={o} value={o} style={{ background: "var(--card2)" }}>{o}</option>)}
                    </select>
                  </div>
                ))}

                <button onClick={runPredictor}
                  style={{ marginTop: "8px", padding: "13px 0", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "Inter, system-ui, sans-serif", transition: "opacity 0.18s" }}>
                  Predict My Shortlists &rarr;
                </button>
              </div>
            </div>

            {/* Right — results */}
            <div>
              {cpResults === null ? (
                <div style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "16px", padding: "48px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>🎓</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", marginBottom: "8px" }}>Fill in your profile</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--muted)" }}>Enter your CAT percentile and profile details on the left, then click Predict.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {(["likely", "borderline", "reach"] as const).map(status => {
                    const filtered = cpResults.filter(r => r.status === status);
                    if (filtered.length === 0) return null;
                    const cfg = {
                      likely: { label: "Likely Shortlist", dot: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.25)", color: "#4ade80" },
                      borderline: { label: "Borderline", dot: "#facc15", bg: "rgba(250,204,21,0.08)", border: "rgba(250,204,21,0.25)", color: "#facc15" },
                      reach: { label: "Reach", dot: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.25)", color: "#f87171" },
                    }[status];
                    return (
                      <div key={status} style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: "12px", padding: "20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                          <span style={{ display: "block", width: "10px", height: "10px", borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: cfg.color }}>{cfg.label}</span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {filtered.map(r => (
                            <div key={r.name} style={{ background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px 14px" }}>
                              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text)" }}>{r.name}</div>
                              <div style={{ fontSize: "0.75rem", color: "var(--dim)" }}>Cutoff ~{r.adjCutoff}%ile</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ padding: "14px 18px", background: "rgba(99,102,241,0.08)", border: `1px solid ${indigoBorder}`, borderRadius: "10px" }}>
                    <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.65 }}>
                      <strong style={{ color: indigoText }}>Disclaimer:</strong> This is an estimate based on historical patterns. Actual shortlists depend on WAT-PI performance, profile details, and annual variations in cutoffs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
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

      {/* ── Free RC Material ── */}
      <section id="rc-material" style={{ padding: "96px 0" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Free VARC Resources
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "14px" }}>
              Free RC Material
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "560px" }}>
              Curated reading comprehension resources used by 99+ percentilers. Download and practice these before your first mock.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            {[
              { title: "Aristotle RC Series — Volume 1", desc: "400+ RC passages graded by difficulty. The single best RC practice book for CAT VARC.", badge: "Must Read", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
              { title: "Aristotle RC Series — Volume 2", desc: "Advanced passages including dense academic and scientific texts — mirrors actual CAT RC difficulty.", badge: "Advanced", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
              { title: "RC Tricks & Tips by IIM Alumni", desc: "MBA Partner's curated 20-page guide: elimination strategy, inference vs. direct, passage mapping, and time hacks.", badge: "Exclusive", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
              { title: "CAT Past RC Passages (2015–2023)", desc: "Every Reading Comprehension passage from the last 8 years of CAT, with answers and detailed explanations.", badge: "Practice", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
              { title: "Editorial Archive — The Hindu (2024)", desc: "12 months of curated editorials — the same kind of texts CAT examiners use. Builds both reading habit and vocabulary.", badge: "Daily Habit", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
              { title: "Para Jumbles & Summary — 200 Qs", desc: "TITA question practice set for Para Jumbles, Para Summary, and Odd Sentence — the trickiest VARC question types.", badge: "TITA Focus", link: "https://drive.google.com/drive/folders/1YpeTHDAoxJLovGQX4TxNI7fMQaExWbU7" },
            ].map(item => (
              <div key={item.title} className="card" style={{ padding: "28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 10px", borderRadius: "100px", background: indigo, border: `1px solid ${indigoBorder}`, color: indigoText }}>{item.badge}</span>
                </div>
                <h3 className="serif" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "10px" }}>{item.title}</h3>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--muted)", flex: 1, marginBottom: "20px" }}>{item.desc}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 600, color: indigoText, textDecoration: "none", padding: "8px 16px", border: `1px solid ${indigoBorder}`, borderRadius: "8px", background: indigo, width: "fit-content" }}
                >
                  📥 Download Free
                </a>
              </div>
            ))}
          </div>

          <div style={{ background: indigo, border: `1px solid ${indigoBorder}`, borderRadius: "14px", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="serif" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "4px" }}>Want personalised VARC coaching?</div>
              <p style={{ fontSize: "0.88rem", color: "var(--muted)" }}>Our IIM alumni mentors do 1:1 VARC sessions focused on your weak areas — RC strategy, TITA questions, or reading speed.</p>
            </div>
            <a
              href="#cat-enroll"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              Book Free Session →
            </a>
          </div>
        </div>
      </section>

      {/* ── AI Tools ── */}
      <section id="ai-tools" style={{ padding: "96px 0", background: "var(--card)" }}>
        <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ marginBottom: "56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: indigoText, marginBottom: "20px" }}>
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
              Powered by AI
              <span style={{ display: "block", width: "28px", height: "1px", background: indigoText, opacity: 0.6 }} />
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)", marginBottom: "14px" }}>
              AI-Powered CAT Prep Tools
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "1.05rem", maxWidth: "560px" }}>
              Smart tools built for CAT aspirants — coming soon. Get early access when they launch.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px", marginBottom: "48px" }}>
            {[
              { icon: "🧠", title: "AI Mock Analyser", desc: "Upload your mock test result and get a personalised debrief: error patterns, time analysis, and a custom improvement plan.", status: "Coming Soon" },
              { icon: "📝", title: "RC Difficulty Rater", desc: "Paste any passage and our AI rates its CAT difficulty level, highlights inference-heavy sentences, and suggests an approach strategy.", status: "Coming Soon" },
              { icon: "⚡", title: "VARC Speed Trainer", desc: "Timed RC sessions with adaptive difficulty. The AI adjusts passage complexity based on your accuracy over time.", status: "Coming Soon" },
              { icon: "🎯", title: "AI Study Plan Generator", desc: "Input your CAT score target, available hours/day, and current level — get a week-by-week prep roadmap.", status: "Beta" },
              { icon: "💬", title: "GD Topic Simulator", desc: "Practice Group Discussion with an AI that plays multiple participant roles. Get scored on content, communication, and leadership.", status: "Coming Soon" },
              { icon: "📊", title: "Percentile Predictor 2.0", desc: "Go beyond the basic calculator. Input sectional scores across multiple mocks and get a predictive range for your actual CAT percentile.", status: "Coming Soon" },
            ].map(tool => (
              <div key={tool.title} className="card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{tool.icon}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                  <h3 className="serif" style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>{tool.title}</h3>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 8px", borderRadius: "100px", background: tool.status === "Beta" ? "rgba(74,222,128,0.1)" : indigo, border: tool.status === "Beta" ? "1px solid rgba(74,222,128,0.25)" : `1px solid ${indigoBorder}`, color: tool.status === "Beta" ? "#4ade80" : indigoText, whiteSpace: "nowrap" }}>{tool.status}</span>
                </div>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--muted)" }}>{tool.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", background: "linear-gradient(160deg, rgba(99,102,241,0.08) 0%, transparent 70%)", border: `1px solid ${indigoBorder}`, borderRadius: "20px", padding: "56px 40px" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "20px" }}>🚀</div>
            <h3 className="serif" style={{ fontWeight: 900, fontSize: "1.6rem", color: "var(--text)", marginBottom: "14px" }}>
              Get Early Access
            </h3>
            <p style={{ color: "var(--muted)", maxWidth: "440px", margin: "0 auto 28px", fontSize: "0.95rem", lineHeight: 1.75 }}>
              Be the first to try our AI tools when they launch. Early access students get free lifetime access to the AI Mock Analyser.
            </p>
            <a
              href="mailto:bharat.kapoor@prodmarkconsulting.in?subject=AI Tools Early Access"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", borderRadius: "10px", background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}
            >
              Request Early Access →
            </a>
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
