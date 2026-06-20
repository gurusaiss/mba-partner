"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const INIT: Msg[] = [
  { role: "bot", text: "Hi! I'm Maya, your MBA Partner guide. I can help you find the right course, understand our offerings, or answer any questions. What would you like to know?" },
];

const QUICK_QUESTIONS = [
  "What courses do you offer?",
  "How much do courses cost?",
  "What is the Placement Bootcamp?",
  "Tell me about Live Projects",
  "Case Competition coaching?",
  "How do I enroll?",
  "Who are the mentors?",
  "What's in the Resource Repository?",
];

const QA: [RegExp, string][] = [
  // Courses / offerings overview
  [/what courses|what do you offer|offerings|programs|courses available/i,
    "We offer 5 core tracks:\n\n• Placement Bootcamp (SIP + Final) — Rs.3,499\n• Case Competition Bootcamp — Rs.3,499\n• Live Projects (6 domains) — Rs.3,999\n• Placement + Case Combo — Rs.5,999\n• Master Bundle (all three) — Rs.13,999\n\nAll courses are delivered by IIM alumni with real deliverables, not just recordings."],

  // Pricing
  [/how much|cost|fee|price|pricing|rupee|rs\.|cheap|expensive/i,
    "Our courses are transparently priced:\n\n• SIP Placement Bootcamp — Rs.3,499\n• Case Competition Bootcamp — Rs.3,499\n• Live Project (any domain) — Rs.3,999\n• Placement + Case Combo — Rs.5,999\n• Final Placement Premium — Rs.4,999\n• Master Bundle (all three) — Rs.13,999\n\nNo hidden fees, no upsells. Original prices are up to Rs.22,000 — you save significantly."],

  // Placement bootcamp
  [/placement bootcamp|sip|mock pi|mock gd|mock interview|placement prep|interview prep/i,
    "The Placement Bootcamp is our most popular single course (Rs.3,499):\n\n• 7 Mock Personal Interviews (PI)\n• 7 Mock Group Discussions (GD)\n• 5 CV & LinkedIn reviews\n• Domain-specific coaching sessions\n• 300+ real interview transcripts\n• ATS-optimised CV templates\n\nA Premium Final Placement version with 10 Mock PIs + company-specific prep is also available at Rs.4,999."],

  // Case competition
  [/case comp|case competition|ppt|canva|air 1|framework/i,
    "Our Case Competition Bootcamp (Rs.3,499) is coached by AIR 1:\n\n• 4 live sessions of 2 hours each\n• 30+ winning case PPTs from national competitions\n• Proven problem-solving frameworks\n• Canva Premium access for 1 year\n• Live national competition calendar\n• Structured feedback on your case approach\n\nStudents regularly win inter-college competitions after this bootcamp."],

  // Live projects
  [/live project|real project|consulting project|finance project|marketing project|work experience/i,
    "Live Projects are 2-month real engagements (Rs.3,999 each):\n\n• Consulting — strategy, market entry, operations\n• Finance — financial modelling, equity research\n• Marketing — brand strategy, campaign planning\n• Human Resources — talent strategy, org design\n• Operations — supply chain, process improvement\n• Product Management — PRDs, roadmaps\n\nEach project includes a certificate of completion, LinkedIn recommendation letter, and IIM alumni oversight."],

  // Mentor
  [/mentor|alumni|iim|who teaches|coach|faculty/i,
    "All our mentors are verified IIM alumni placed at top firms:\n\n• IIM Ahmedabad — Ex-McKinsey, BCG, Bain alumni\n• IIM Bangalore — Ex-Goldman Sachs, JP Morgan\n• IIM Calcutta — Ex-Bain, EY, Deloitte\n• IIM Lucknow, Kozhikode, Indore alumni too\n\nYou are matched within 24 hours to a mentor aligned to your domain, target company, and B-school. The network spans 20+ premier B-schools across India."],

  // Resources / repository
  [/resource|repository|cv template|interview transcript|placement data|compendium|material/i,
    "Our Resource Repository is 5 years of placement intelligence:\n\n• 50+ ATS-optimised CV templates (domain-specific)\n• 300+ real interview transcripts from McKinsey, Goldman, BCG, HUL, Amazon & 40+ more\n• 5 years of placement data — salary trends, shortlist ratios, company-wise patterns\n• 30+ annotated winning case competition decks\n• LinkedIn strategy guide (10x profile views, documented)\n• National MBA competition calendar (updated weekly)\n\nAccess is included with any course purchase."],

  // CV / resume / linkedin
  [/cv|resume|linkedin|profile|ats/i,
    "We offer comprehensive profile building:\n\n• 50+ ATS-optimised CV templates (domain-specific formats)\n• 5 CV review slots included in Placement Bootcamp\n• LinkedIn profile overhaul strategy\n• Cover letter templates and review\n• Personal brand narrative coaching\n\nOur CVs are designed to get past ATS filters and into shortlists at McKinsey, Goldman, HUL, and similar firms."],

  // Combo / bundle
  [/combo|bundle|master|all.?in.?one|package|best value/i,
    "Our combo packages give the best value:\n\n• Placement + Case Combo — Rs.5,999 (saves Rs.4,001)\n  Full Placement Bootcamp + Full Case Competition Bootcamp\n\n• Master Bundle — Rs.13,999 (saves Rs.8,001)\n  Full Placement Bootcamp + Case Competition Bootcamp + 1 Live Project (any domain) + Priority mentor matching\n\nThe Master Bundle is our most popular package and covers everything a serious MBA student needs."],

  // How to enroll / get started
  [/enroll|join|sign up|get started|how to|register|buy|purchase/i,
    "Enrolling is simple:\n\n1. Go to the Courses section on this page\n2. Click 'Enroll Now' on your chosen course — it links directly to our secure payment page\n3. Or fill the Free Enquiry form and we'll recommend the best package for your goals\n\nWe also offer free 1:1 counselling — just fill the enquiry form and we'll call you within 24 hours."],

  // Timeline / when to start
  [/when|timeline|term 1|term 2|first year|second year|how long|duration/i,
    "The right time to start depends on your goal:\n\n• Term 1-2 (First Year): Ideal for Live Projects and Case Competition prep — builds your profile early\n• Term 3-4: Placement Bootcamp for SIP preparation\n• Pre-Final Placement: Full Master Bundle for comprehensive prep\n\nRule of thumb: the earlier you start, the better your odds. Most placed students started prep 4-6 months before placement season."],

  // Contact / talk to someone
  [/contact|call|phone|whatsapp|talk|reach|speak|human/i,
    "You can reach us directly:\n\n• Phone / WhatsApp: +91 98765 43210\n• Free Enquiry Form: scroll to the 'Free Enquiry' section on this page\n• Response time: within 24 hours\n\nWe also offer free counselling sessions to help you pick the right package for your goals and timeline."],

  // Placement results / stats
  [/placement|result|statistic|stat|success rate|how many|placed/i,
    "Our placement track record:\n\n• 5,000+ students mentored\n• 9.6/10 average rating\n• 98.7% placement rate\n• 700+ verified reviews\n\nStudents have been placed at McKinsey, Goldman Sachs, BCG, Bain, HUL, Amazon, Deloitte, EY, JP Morgan, and 100+ other top firms."],

  // Which course is best
  [/which course|recommend|suggest|best for me|what should i|confused|help me choose/i,
    "Here's how to choose:\n\n• Focus only on placements? — Placement Bootcamp (Rs.3,499)\n• Focus only on case competitions? — Case Competition Bootcamp (Rs.3,499)\n• Want real work experience? — Live Project (Rs.3,999)\n• Want placements + case prep? — Combo (Rs.5,999)\n• Want everything? — Master Bundle (Rs.13,999) — best value\n\nFill the Free Enquiry form and we'll give you a personalised recommendation based on your B-school, domain, and timeline — for free."],

  // Domain specific
  [/consulting|strategy|management consulting/i,
    "For Consulting:\n\n• Case Competition Bootcamp — case frameworks, 30+ winning decks, coached by AIR 1\n• Live Project — Consulting (real strategy project, 2 months)\n• Placement Bootcamp — mock PIs focused on consulting firms\n• 300+ interview transcripts from McKinsey, BCG, Bain, Deloitte interviews\n\nMany of our students are placed at MBB and Big 4 consulting firms."],

  [/finance|banking|investment|goldman|jp morgan/i,
    "For Finance:\n\n• Placement Bootcamp — mock PIs for finance roles, Goldman/JP Morgan transcripts\n• Live Project — Finance (financial modelling, equity research)\n• Resource Repository — finance CV templates, 5-year salary data\n\nMentors include IIM alumni from Goldman Sachs, JP Morgan, and other top finance firms."],

  [/marketing|brand|fmcg|hul|consumer/i,
    "For Marketing:\n\n• Placement Bootcamp — mock GDs/PIs for FMCG/marketing roles\n• Live Project — Marketing (brand strategy, campaign planning)\n• Resource Repository — HUL, P&G, Nestle interview transcripts\n\nMentors include IIM alumni who worked at HUL, P&G, and top consumer brands."],
];

function getBotReply(input: string): string {
  for (const [pattern, reply] of QA) {
    if (pattern.test(input)) return reply;
  }
  return "That's a great question! For the most accurate answer, fill the Free Enquiry form on this page and our team will get back to you within 24 hours. Or try asking about:\n\n• Course pricing\n• Placement Bootcamp details\n• Live Project domains\n• Case Competition coaching\n• Mentor profiles\n• Resource Repository";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

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
    }, 700);
  }

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} className="btn-primary"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, width: "54px", height: "54px", padding: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        aria-label="Chat with Maya">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="chatbox" style={{ position: "fixed", bottom: "90px", right: "24px", zIndex: 50, width: "340px", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "520px", background: "var(--card)", border: "1px solid rgba(201,168,76,0.18)" }}>

          {/* Header */}
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #0D1A30, #0A1528)", borderBottom: "1px solid var(--border)" }}>
            <div className="btn-primary" style={{ width: "36px", height: "36px", padding: 0, borderRadius: "50%", fontSize: "0.78rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)" }}>Maya</div>
              <div style={{ fontSize: "0.72rem", color: "var(--gold)" }}>MBA Partner AI Guide</div>
            </div>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} title="Online" />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div className={m.role === "user" ? "chat-user" : "chat-bot"}
                  style={{ padding: "10px 14px", maxWidth: "90%", fontSize: "0.82rem", lineHeight: 1.65, color: m.role === "user" ? "#050D1C" : "var(--muted)", whiteSpace: "pre-line" }}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick question chips — shown after first bot message */}
            {showQuick && msgs.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                {QUICK_QUESTIONS.map(q => (
                  <button key={q} onClick={() => send(q)}
                    style={{ background: "var(--card2)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "20px", padding: "5px 12px", fontSize: "0.72rem", color: "var(--gold)", cursor: "pointer", transition: "all 0.18s", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 500 }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.12)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--card2)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="chat-bot" style={{ padding: "10px 16px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", display: "flex", gap: "8px", borderTop: "1px solid var(--border)", background: "var(--card2)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything about MBA Partner..."
              style={{ flex: 1, background: "var(--card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "9px 12px", fontSize: "0.82rem", color: "var(--text)", outline: "none", fontFamily: "Inter, system-ui, sans-serif" }} />
            <button onClick={() => send()} className="btn-primary" style={{ width: "36px", height: "36px", padding: 0, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
