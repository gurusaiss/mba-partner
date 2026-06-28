"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronDown } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const INIT: Msg[] = [
  { role: "bot", text: "Hi! I'm Maya, your MBA Partner guide 👋\n\nI can answer questions about our courses, pricing, mentors, placements, and more. What would you like to know?" },
];

const QUICK_QUESTIONS = [
  "What courses do you offer?",
  "How much do courses cost?",
  "Who are the mentors?",
  "What is the Placement Bootcamp?",
  "Case Competition coaching?",
  "Tell me about Live Projects",
  "What's the Master Bundle?",
  "Group discount available?",
  "What makes you different?",
  "How do I enroll?",
  "Free resources available?",
  "CAT prep available?",
  "Is there a refund policy?",
  "What companies have hired?",
];

const QA: [RegExp, string][] = [
  // Courses overview
  [/what courses|what do you offer|offerings|programs|courses available|all courses/i,
    "We offer 5 core tracks:\n\n📚 Placement Bootcamp (SIP + Final) — ₹3,499\n🏆 Case Competition Bootcamp — ₹3,499\n💼 Live Projects (6 domains) — ₹3,999\n⭐ Placement + Case Combo — ₹5,999\n🔥 Master Bundle (all three) — ₹13,999\n\nAll courses are led live by IIM alumni with real deliverables — not just recordings or pre-recorded videos."],

  // Pricing
  [/how much|cost|fee|price|pricing|rupee|₹|cheap|expensive|afford/i,
    "Our courses are transparently priced:\n\n• SIP Placement Bootcamp — ₹3,499\n• Case Competition Bootcamp — ₹3,499\n• Live Project (any domain) — ₹3,999\n• Placement + Case Combo — ₹5,999\n• Final Placement Premium — ₹4,999\n• Master Bundle (all three) — ₹13,999\n\nOriginal market value is ₹22,000+. No hidden fees, no upsells after purchase."],

  // Placement bootcamp
  [/placement bootcamp|sip|mock pi|mock gd|mock interview|placement prep|interview prep|interview/i,
    "The Placement Bootcamp is our most popular course (₹3,499):\n\n✓ 7 Mock Personal Interviews (PI)\n✓ 7 Mock Group Discussions (GD)\n✓ 5 CV & LinkedIn reviews\n✓ Domain-specific coaching sessions\n✓ 300+ real interview transcripts\n✓ ATS-optimised CV templates\n\nA Premium Final Placement version (₹4,999) adds 10 Mock PIs + company-specific prep for final placements."],

  // Case competition
  [/case comp|case competition|ppt|canva|air 1|framework|competition|inter.?college/i,
    "Our Case Competition Bootcamp (₹3,499) is coached by AIR 1:\n\n✓ 4 live sessions × 2 hours each\n✓ 30+ winning case PPTs from national competitions\n✓ Proven problem-solving frameworks\n✓ Canva Premium access for 1 full year\n✓ Live national competition calendar\n✓ Structured feedback on your approach\n\nStudents regularly win inter-college competitions after this bootcamp. Our AIR 1 coach has competed and won at 15+ national competitions."],

  // Live projects
  [/live project|real project|consulting project|finance project|marketing project|work experience|internship|project/i,
    "Live Projects are 2-month real engagements (₹3,999 each):\n\n• Consulting — strategy, market entry, operations\n• Finance — financial modelling, equity research\n• Marketing — brand strategy, campaign planning\n• Human Resources — talent strategy, org design\n• Operations — supply chain, process improvement\n• Product Management — PRDs, roadmaps\n\nEach project includes: certificate of completion, LinkedIn recommendation letter, and direct IIM alumni oversight throughout."],

  // Mentors
  [/mentor|alumni|iim|who teaches|coach|faculty|who are|trainer/i,
    "All mentors are verified IIM alumni at top firms:\n\n🎓 IIM Ahmedabad — Ex-McKinsey, BCG, Bain\n🎓 IIM Bangalore — Ex-Goldman Sachs, JP Morgan\n🎓 IIM Calcutta — Ex-Bain, EY, Deloitte\n🎓 IIM Lucknow, Kozhikode, Indore alumni too\n\nYou're matched within 24 hours to a mentor aligned to your domain, target company, and B-school. 20+ premier B-schools in our network."],

  // Resources
  [/resource|repository|cv template|interview transcript|placement data|compendium|material|free material/i,
    "Our Resource Repository contains 5 years of placement intelligence:\n\n• 50+ ATS-optimised CV templates (domain-specific)\n• 300+ real interview transcripts — McKinsey, Goldman, BCG, HUL, Amazon\n• 5 years of placement data — salary trends, shortlist ratios\n• 30+ annotated winning case competition decks\n• LinkedIn strategy guide\n• National MBA competition calendar (updated weekly)\n\nAccess is included with any course purchase. Some resources are also available free — click 'Free RC Material' in the CAT section."],

  // CV / LinkedIn
  [/cv|resume|linkedin|profile|ats|cover letter/i,
    "We offer comprehensive profile building:\n\n• 50+ ATS-optimised CV templates (domain-specific)\n• 5 CV review slots in Placement Bootcamp\n• LinkedIn profile overhaul strategy (10x profile views, documented)\n• Cover letter templates and personalised review\n• Personal brand narrative coaching\n\nOur CVs get past ATS filters and into shortlists at McKinsey, Goldman, HUL, Amazon, and similar top firms."],

  // Combo / bundle
  [/combo|bundle|master|all.?in.?one|package|best value|best deal/i,
    "Our combo packages give the best value:\n\n⭐ Placement + Case Combo — ₹5,999 (saves ₹4,001)\nFull Placement Bootcamp + Full Case Competition Bootcamp\n\n🔥 Master Bundle — ₹13,999 (saves ₹8,001)\nPlacement Bootcamp + Case Competition Bootcamp + 1 Live Project + Priority mentor matching\n\nThe Master Bundle is our most popular package and covers everything a serious MBA student needs for placements, competitions, and profile building."],

  // Group offer / discount
  [/group|discount|friend|refer|two people|both|together|batch/i,
    "Yes! We have a Group Enrollment Offer:\n\n👥 Enroll with a friend and both get 15% off any course.\n\nJust scroll to the 'Group Enrollment' section on this page and enter both your details. The discount applies automatically.\n\nWe also run seasonal offers — follow our WhatsApp channel for flash deals."],

  // What makes us different
  [/different|unique|why mba partner|why you|why choose|better than|compare|competitor/i,
    "What sets MBA Partner apart:\n\n✅ 100% IIM alumni mentors (not just 'industry experts')\n✅ Live sessions — not pre-recorded videos you ignore\n✅ Real deliverables — CV, project certificate, winning PPTs\n✅ 5 years of actual placement data (not made-up stats)\n✅ 9.6/10 student rating from 700+ verified reviews\n✅ Matched mentor within 24 hours, not weeks\n✅ Priced at ₹3,499 vs ₹22,000+ market rate\n\nWe're built by people who went through MBA placements — not corporate trainers who read about it."],

  // Enroll / get started
  [/enroll|join|sign up|get started|how to|register|buy|purchase|start/i,
    "Enrolling is simple:\n\n1️⃣ Scroll to the 'Courses' section on this page\n2️⃣ Click 'Enroll Now' on your chosen course\n3️⃣ Complete secure payment (Razorpay / UPI / Card)\n4️⃣ Get WhatsApp confirmation within 2 hours\n\nOr fill the Free Enquiry form — we'll call you within 24 hours and recommend the best package for your specific goals and timeline."],

  // Timeline / when to start
  [/when|timeline|term 1|term 2|first year|second year|how long|duration|start when/i,
    "The best time to start:\n\n• Term 1–2 (First Year): Live Projects + Case Competition Bootcamp — builds profile early\n• Term 3–4: SIP Placement Bootcamp\n• Pre-Final Placement: Master Bundle for comprehensive prep\n\n💡 Rule: Start 4–6 months before placement season. Most placed students at McKinsey, Goldman, and HUL started at least 5 months before Day 1."],

  // Contact / support
  [/contact|call|phone|whatsapp|talk|reach|speak|human|support/i,
    "Reach us directly:\n\n📱 WhatsApp: +91 70427 32092\n📝 Free Enquiry Form: scroll to bottom of this page\n⏱ Response time: within 24 hours\n\nWe offer free 15-minute counselling calls to help you pick the right package for your goals and timeline — no sales pressure."],

  // Placement results / stats
  [/placement result|statistic|success rate|how many|placed|track record|proof|evidence/i,
    "Our placement track record:\n\n📊 5,000+ students mentored\n⭐ 9.6/10 average rating\n✅ 98.7% placement success rate\n💬 700+ verified student reviews\n\nStudents placed at McKinsey, Goldman Sachs, BCG, Bain, HUL, Amazon, Deloitte, EY, JP Morgan, TAS, Kearney, and 100+ other top firms."],

  // Which course recommendation
  [/which course|recommend|suggest|best for me|what should i|confused|help me choose|don't know/i,
    "Here's how to choose:\n\n🎯 Only placements → Placement Bootcamp (₹3,499)\n🏆 Only case competitions → Case Comp Bootcamp (₹3,499)\n💼 Want real work experience → Live Project (₹3,999)\n⭐ Placements + cases → Combo (₹5,999)\n🔥 Want everything → Master Bundle (₹13,999) ← best value\n\nFill the Free Enquiry form for a personalised recommendation based on your B-school, domain, and timeline — completely free."],

  // Refund policy
  [/refund|money back|cancel|guarantee|return/i,
    "Our refund policy:\n\n✅ 7-day money-back guarantee on all courses\n✅ If you're not satisfied within the first week, we issue a full refund — no questions asked\n\nWe're confident enough in our courses to offer this. Fewer than 0.5% of students have ever requested a refund.\n\nTo claim: WhatsApp us at +91 70427 32092 within 7 days of purchase."],

  // CAT prep
  [/cat|omet|varc|dilr|quant|mock test|cat prep|aspirant|entrance|percentile/i,
    "Yes! We have a full CAT / OMETs section:\n\n📖 Free RC Material — 6 curated RC passages with answer keys (Google Drive)\n🤖 AI Tools for CAT — GPT-powered VARC, DILR, Quant assistants (Beta)\n📊 VARC Mock Tests — timed mock with leaderboard\n📅 GDPI Prep — GD topics, PI simulations, WAT templates\n\nSwitch to 'CAT / OMETs Aspirant' mode at the top of the page to access all CAT content. Most resources are completely free!"],

  // Free resources
  [/free|no cost|complimentary|without paying/i,
    "Yes, we have several free resources:\n\n🆓 Free RC Material — 6 CAT-level RC passages (switch to CAT mode)\n🆓 Free AI Tools — VARC summariser, case assistant (Beta)\n🆓 Free Enquiry call — 15-min counselling session\n🆓 Free sample brochures — download from Courses section\n🆓 Free VARC Mock 1 — attempt and see your score\n\nFull premium resources (CV templates, transcripts, live mentorship) are included with any course purchase."],

  // GDPI / WAT
  [/gdpi|gd|group discussion|pi prep|personal interview|wat|written ability|extempore/i,
    "Our GDPI Prep covers:\n\n• 100+ curated GD topics (current affairs + business strategy)\n• Structured GD speaking frameworks (PREP method)\n• PI answer templates for leadership, failures, goals, academics\n• WAT templates with model answers\n• Extempore practice topics\n• Stress interview handling techniques\n\nAll included in the Placement Bootcamp. Group Discussion sessions are also run live with 6–8 students for realistic practice."],

  // Consulting domain
  [/consulting|strategy|management consulting|mckinsey|bcg|bain/i,
    "For Consulting aspirants:\n\n• Case Competition Bootcamp — case frameworks, 30+ winning decks, AIR 1 coach\n• Live Project (Consulting) — real 2-month strategy project\n• Placement Bootcamp — mock PIs focusing on consulting firms\n• 300+ transcripts from McKinsey, BCG, Bain, Deloitte interviews\n\nOur mentors include ex-McKinsey, BCG, and Bain alumni who actively guide students through case interviews."],

  // Finance domain
  [/finance|banking|investment banking|goldman|jp morgan|equity|cfa/i,
    "For Finance aspirants:\n\n• Placement Bootcamp — mock PIs for banking/finance roles + Goldman/JP Morgan transcripts\n• Live Project (Finance) — financial modelling, equity research with a real model\n• Resource Repository — finance-specific CV templates + 5-year salary data\n\nMentors include IIM alumni from Goldman Sachs, JP Morgan, Deutsche Bank, and top NBFCs."],

  // Marketing domain
  [/marketing|brand|fmcg|hul|consumer|p&g|nestle|brand management/i,
    "For Marketing aspirants:\n\n• Placement Bootcamp — mock GDs/PIs for FMCG + HUL, P&G, Nestle transcripts\n• Live Project (Marketing) — brand strategy & campaign planning for a real brand\n• Resource Repository — marketing CV templates, FMCG case studies\n\nMentors include IIM alumni who have worked at HUL, P&G, Nestle, and other top FMCG companies."],

  // Certificate
  [/certificate|certification|proof|document|credential/i,
    "Yes, you receive official certificates:\n\n📜 Course Completion Certificate — from MBA Partner, signed by founding mentors\n📜 Live Project Certificate — detailing your project, domain, and outcomes\n📝 LinkedIn Recommendation Letter — from your assigned IIM alumni mentor\n\nThese are designed to be added directly to your CV and LinkedIn profile as verifiable credentials."],

  // College collab
  [/college|b-school|university|college collaboration|campus|official/i,
    "We collaborate with 20+ B-schools across India:\n\nOfficial collaborations with student bodies and placement committees at IIMs, NMIMS, SIBM, MDI, XLRI, SP Jain, and more.\n\nIf you want to bring MBA Partner to your B-school officially, email us or fill the 'College Collaboration' form at the bottom of the page. We offer group rates and campus workshops."],
];

function getBotReply(input: string): string {
  for (const [pattern, reply] of QA) {
    if (pattern.test(input)) return reply;
  }
  return "That's a great question! I don't have a specific answer ready for that.\n\nTry asking me about:\n• Course pricing & details\n• Placement Bootcamp\n• Live Project domains\n• Case Competition coaching\n• Group discounts\n• CAT prep resources\n\nOr fill the Free Enquiry form — our team replies within 24 hours. 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [minimised, setMinimised] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!minimised) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, minimised]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setShowQuick(false);
    setMsgs(m => [...m, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "bot", text: getBotReply(msg) }]);
    }, 800);
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => { setOpen(o => !o); setMinimised(false); }}
        className="btn-primary pulse"
        style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 100, width: "58px", height: "58px", padding: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(212,170,82,0.35)", transition: "all 0.2s" }}
        aria-label="Chat with Maya">
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="chatbox" style={{
          position: "fixed", bottom: "100px", right: "28px", zIndex: 100,
          width: "370px", borderRadius: "22px", overflow: "hidden",
          display: "flex", flexDirection: "column",
          maxHeight: minimised ? "64px" : "560px",
          background: "var(--card)",
          border: "1px solid rgba(212,170,82,0.20)",
          transition: "max-height 0.3s ease",
        }}>

          {/* Header */}
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg,#0C1830,#091220)", borderBottom: minimised ? "none" : "1px solid var(--border)", flexShrink: 0, cursor: "pointer" }}
            onClick={() => setMinimised(m => !m)}>
            <div className="btn-primary" style={{ width: "40px", height: "40px", padding: 0, borderRadius: "50%", fontSize: "0.88rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "linear-gradient(135deg,#D4AA52,#B8943C)" }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.2 }}>Maya</div>
              <div style={{ fontSize: "0.74rem", color: "var(--gold)", fontWeight: 500 }}>MBA Partner · AI Guide</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade8080" }} />
              <ChevronDown size={16} color="var(--muted)" style={{ transform: minimised ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }} />
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                {msgs.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-end" }}>
                    {m.role === "bot" && (
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#D4AA52,#B8943C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "#030810", flexShrink: 0 }}>M</div>
                    )}
                    <div className={m.role === "user" ? "chat-user" : "chat-bot"}
                      style={{ padding: "11px 15px", maxWidth: "84%", fontSize: "0.86rem", lineHeight: 1.7, color: m.role === "user" ? "#050D1C" : "var(--text)", whiteSpace: "pre-line", fontWeight: m.role === "user" ? 600 : 400 }}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Quick chips */}
                {showQuick && msgs.length === 1 && (
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--dim)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10, paddingLeft: 36 }}>Popular Questions</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", paddingLeft: 36 }}>
                      {QUICK_QUESTIONS.map(q => (
                        <button key={q} onClick={() => send(q)}
                          style={{ background: "var(--card2)", border: "1px solid rgba(212,170,82,0.22)", borderRadius: "20px", padding: "6px 13px", fontSize: "0.76rem", color: "var(--gold)", cursor: "pointer", transition: "all 0.18s", fontFamily: "var(--font-sans, Inter, system-ui)", fontWeight: 600, lineHeight: 1.2 }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,170,82,0.14)"; e.currentTarget.style.borderColor = "rgba(212,170,82,0.5)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "var(--card2)"; e.currentTarget.style.borderColor = "rgba(212,170,82,0.22)"; }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {typing && (
                  <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#D4AA52,#B8943C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 800, color: "#030810", flexShrink: 0 }}>M</div>
                    <div className="chat-bot" style={{ padding: "12px 18px", display: "flex", gap: "5px", alignItems: "center" }}>
                      <span className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                      <span className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                      <span className="dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div style={{ padding: "12px 14px", display: "flex", gap: "8px", borderTop: "1px solid var(--border)", background: "var(--card2)", flexShrink: 0 }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Ask Maya anything…"
                  style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "10px 14px", fontSize: "0.88rem", color: "var(--text)", outline: "none", fontFamily: "var(--font-sans, Inter, system-ui)", transition: "border-color 0.2s" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(212,170,82,0.5)")}
                  onBlur={e => (e.target.style.borderColor = "var(--border)")}
                />
                <button onClick={() => send()} className="btn-primary" style={{ width: "40px", height: "40px", padding: 0, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
