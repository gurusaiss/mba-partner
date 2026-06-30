"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, ChevronDown, Volume2, VolumeX } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string; ts?: number };

const INIT: Msg[] = [
  { role: "bot", text: "Hi! I'm Maya, your MBA Partner guide 👋\n\nI can answer questions about our courses, pricing, mentors, placements, and more. What would you like to know?", ts: Date.now() },
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
  [/what courses|what do you offer|offerings|programs|courses available|all courses/i,
    "We offer 5 core tracks:\n\n📚 Placement Bootcamp (SIP + Final) — ₹3,499\n🏆 Case Competition Bootcamp — ₹3,499\n💼 Live Projects (6 domains) — ₹3,999\n⭐ Placement + Case Combo — ₹5,999\n🔥 Master Bundle (all three) — ₹13,999\n\nAll courses are led live by IIM alumni with real deliverables — not just recordings or pre-recorded videos."],
  [/how much|cost|fee|price|pricing|rupee|₹|cheap|expensive|afford/i,
    "Our courses are transparently priced:\n\n• SIP Placement Bootcamp — ₹3,499\n• Case Competition Bootcamp — ₹3,499\n• Live Project (any domain) — ₹3,999\n• Placement + Case Combo — ₹5,999\n• Final Placement Premium — ₹4,999\n• Master Bundle (all three) — ₹13,999\n\nOriginal market value is ₹22,000+. No hidden fees, no upsells after purchase."],
  [/placement bootcamp|sip|mock pi|mock gd|mock interview|placement prep|interview prep|interview/i,
    "The Placement Bootcamp is our most popular course (₹3,499):\n\n✓ 7 Mock Personal Interviews (PI)\n✓ 7 Mock Group Discussions (GD)\n✓ 5 CV & LinkedIn reviews\n✓ Domain-specific coaching sessions\n✓ 300+ real interview transcripts\n✓ ATS-optimised CV templates\n\nA Premium Final Placement version (₹4,999) adds 10 Mock PIs + company-specific prep for final placements."],
  [/case comp|case competition|ppt|canva|air 1|framework|competition|inter.?college/i,
    "Our Case Competition Bootcamp (₹3,499) is coached by AIR 1:\n\n✓ 4 live sessions × 2 hours each\n✓ 30+ winning case PPTs from national competitions\n✓ Proven problem-solving frameworks\n✓ Canva Premium access for 1 full year\n✓ Live national competition calendar\n✓ Structured feedback on your approach\n\nStudents regularly win inter-college competitions after this bootcamp. Our AIR 1 coach has competed and won at 15+ national competitions."],
  [/live project|real project|consulting project|finance project|marketing project|work experience|internship|project/i,
    "Live Projects are 2-month real engagements (₹3,999 each):\n\n• Consulting — strategy, market entry, operations\n• Finance — financial modelling, equity research\n• Marketing — brand strategy, campaign planning\n• Human Resources — talent strategy, org design\n• Operations — supply chain, process improvement\n• Product Management — PRDs, roadmaps\n\nEach project includes: certificate of completion, LinkedIn recommendation letter, and direct IIM alumni oversight throughout."],
  [/mentor|alumni|iim|who teaches|coach|faculty|who are|trainer/i,
    "All mentors are verified IIM alumni at top firms:\n\n🎓 IIM Ahmedabad — Ex-McKinsey, BCG, Bain\n🎓 IIM Bangalore — Ex-Goldman Sachs, JP Morgan\n🎓 IIM Calcutta — Ex-Bain, EY, Deloitte\n🎓 IIM Lucknow, Kozhikode, Indore alumni too\n\nYou're matched within 24 hours to a mentor aligned to your domain, target company, and B-school. 20+ premier B-schools in our network."],
  [/resource|repository|cv template|interview transcript|placement data|compendium|material|free material/i,
    "Our Resource Repository contains 5 years of placement intelligence:\n\n• 50+ ATS-optimised CV templates (domain-specific)\n• 300+ real interview transcripts — McKinsey, Goldman, BCG, HUL, Amazon\n• 5 years of placement data — salary trends, shortlist ratios\n• 30+ annotated winning case competition decks\n• LinkedIn strategy guide\n• National MBA competition calendar (updated weekly)\n\nAccess is included with any course purchase. Some resources are also available free — click 'Free RC Material' in the CAT section."],
  [/cv|resume|linkedin|profile|ats|cover letter/i,
    "We offer comprehensive profile building:\n\n• 50+ ATS-optimised CV templates (domain-specific)\n• 5 CV review slots in Placement Bootcamp\n• LinkedIn profile overhaul strategy (10x profile views, documented)\n• Cover letter templates and personalised review\n• Personal brand narrative coaching\n\nOur CVs get past ATS filters and into shortlists at McKinsey, Goldman, HUL, Amazon, and similar top firms."],
  [/combo|bundle|master|all.?in.?one|package|best value|best deal/i,
    "Our combo packages give the best value:\n\n⭐ Placement + Case Combo — ₹5,999 (saves ₹4,001)\nFull Placement Bootcamp + Full Case Competition Bootcamp\n\n🔥 Master Bundle — ₹13,999 (saves ₹8,001)\nPlacement Bootcamp + Case Competition Bootcamp + 1 Live Project + Priority mentor matching\n\nThe Master Bundle is our most popular package and covers everything a serious MBA student needs for placements, competitions, and profile building."],
  [/group|discount|friend|refer|two people|both|together|batch/i,
    "Yes! We have a Group Enrollment Offer:\n\n👥 Enroll with a friend and both get 15% off any course.\n\nJust scroll to the 'Group Enrollment' section on this page and enter both your details. The discount applies automatically.\n\nWe also run seasonal offers — follow our WhatsApp channel for flash deals."],
  [/different|unique|why mba partner|why you|why choose|better than|compare|competitor/i,
    "What sets MBA Partner apart:\n\n✅ 100% IIM alumni mentors (not just 'industry experts')\n✅ Live sessions — not pre-recorded videos you ignore\n✅ Real deliverables — CV, project certificate, winning PPTs\n✅ 5 years of actual placement data (not made-up stats)\n✅ 9.6/10 student rating from 700+ verified reviews\n✅ Matched mentor within 24 hours, not weeks\n✅ Priced at ₹3,499 vs ₹22,000+ market rate\n\nWe're built by people who went through MBA placements — not corporate trainers who read about it."],
  [/enroll|join|sign up|get started|how to|register|buy|purchase|start/i,
    "Enrolling is simple:\n\n1️⃣ Scroll to the 'Courses' section on this page\n2️⃣ Click 'Enroll Now' on your chosen course\n3️⃣ Complete secure payment (Razorpay / UPI / Card)\n4️⃣ Get WhatsApp confirmation within 2 hours\n\nOr fill the Free Enquiry form — we'll call you within 24 hours and recommend the best package for your specific goals and timeline."],
  [/when|timeline|term 1|term 2|first year|second year|how long|duration|start when/i,
    "The best time to start:\n\n• Term 1–2 (First Year): Live Projects + Case Competition Bootcamp — builds profile early\n• Term 3–4: SIP Placement Bootcamp\n• Pre-Final Placement: Master Bundle for comprehensive prep\n\n💡 Rule: Start 4–6 months before placement season. Most placed students at McKinsey, Goldman, and HUL started at least 5 months before Day 1."],
  [/contact|call|phone|whatsapp|talk|reach|speak|human|support/i,
    "Reach us directly:\n\n📱 WhatsApp: +91 70427 32092\n📝 Free Enquiry Form: scroll to bottom of this page\n⏱ Response time: within 24 hours\n\nWe offer free 15-minute counselling calls to help you pick the right package for your goals and timeline — no sales pressure."],
  [/placement result|statistic|success rate|how many|placed|track record|proof|evidence/i,
    "Our placement track record:\n\n📊 5,000+ students mentored\n⭐ 9.6/10 average rating\n✅ 98.7% placement success rate\n💬 700+ verified student reviews\n\nStudents placed at McKinsey, Goldman Sachs, BCG, Bain, HUL, Amazon, Deloitte, EY, JP Morgan, TAS, Kearney, and 100+ other top firms."],
  [/which course|recommend|suggest|best for me|what should i|confused|help me choose|don't know/i,
    "Here's how to choose:\n\n🎯 Only placements → Placement Bootcamp (₹3,499)\n🏆 Only case competitions → Case Comp Bootcamp (₹3,499)\n💼 Want real work experience → Live Project (₹3,999)\n⭐ Placements + cases → Combo (₹5,999)\n🔥 Want everything → Master Bundle (₹13,999) ← best value\n\nFill the Free Enquiry form for a personalised recommendation based on your B-school, domain, and timeline — completely free."],
  [/refund|money back|cancel|guarantee|return/i,
    "Our refund policy:\n\n✅ 7-day money-back guarantee on all courses\n✅ If you're not satisfied within the first week, we issue a full refund — no questions asked\n\nWe're confident enough in our courses to offer this. Fewer than 0.5% of students have ever requested a refund.\n\nTo claim: WhatsApp us at +91 70427 32092 within 7 days of purchase."],
  [/cat|omet|varc|dilr|quant|mock test|cat prep|aspirant|entrance|percentile/i,
    "Yes! We have a full CAT / OMETs section:\n\n📖 Free RC Material — 6 curated RC passages with answer keys (Google Drive)\n🤖 AI Tools for CAT — GPT-powered VARC, DILR, Quant assistants (Beta)\n📊 VARC Mock Tests — timed mock with leaderboard\n📅 GDPI Prep — GD topics, PI simulations, WAT templates\n\nSwitch to 'CAT / OMETs Aspirant' mode at the top of the page to access all CAT content. Most resources are completely free!"],
  [/free|no cost|complimentary|without paying/i,
    "Yes, we have several free resources:\n\n🆓 Free RC Material — 6 CAT-level RC passages (switch to CAT mode)\n🆓 Free AI Tools — VARC summariser, case assistant (Beta)\n🆓 Free Enquiry call — 15-min counselling session\n🆓 Free sample brochures — download from Courses section\n🆓 Free VARC Mock 1 — attempt and see your score\n\nFull premium resources (CV templates, transcripts, live mentorship) are included with any course purchase."],
  [/gdpi|gd|group discussion|pi prep|personal interview|wat|written ability|extempore/i,
    "Our GDPI Prep covers:\n\n• 100+ curated GD topics (current affairs + business strategy)\n• Structured GD speaking frameworks (PREP method)\n• PI answer templates for leadership, failures, goals, academics\n• WAT templates with model answers\n• Extempore practice topics\n• Stress interview handling techniques\n\nAll included in the Placement Bootcamp. Group Discussion sessions are also run live with 6–8 students for realistic practice."],
  [/consulting|strategy|management consulting|mckinsey|bcg|bain/i,
    "For Consulting aspirants:\n\n• Case Competition Bootcamp — case frameworks, 30+ winning decks, AIR 1 coach\n• Live Project (Consulting) — real 2-month strategy project\n• Placement Bootcamp — mock PIs focusing on consulting firms\n• 300+ transcripts from McKinsey, BCG, Bain, Deloitte interviews\n\nOur mentors include ex-McKinsey, BCG, and Bain alumni who actively guide students through case interviews."],
  [/finance|banking|investment banking|goldman|jp morgan|equity|cfa/i,
    "For Finance aspirants:\n\n• Placement Bootcamp — mock PIs for banking/finance roles + Goldman/JP Morgan transcripts\n• Live Project (Finance) — financial modelling, equity research with a real model\n• Resource Repository — finance-specific CV templates + 5-year salary data\n\nMentors include IIM alumni from Goldman Sachs, JP Morgan, Deutsche Bank, and top NBFCs."],
  [/marketing|brand|fmcg|hul|consumer|p&g|nestle|brand management/i,
    "For Marketing aspirants:\n\n• Placement Bootcamp — mock GDs/PIs for FMCG + HUL, P&G, Nestle transcripts\n• Live Project (Marketing) — brand strategy & campaign planning for a real brand\n• Resource Repository — marketing CV templates, FMCG case studies\n\nMentors include IIM alumni who have worked at HUL, P&G, Nestle, and other top FMCG companies."],
  [/certificate|certification|proof|document|credential/i,
    "Yes, you receive official certificates:\n\n📜 Course Completion Certificate — from MBA Partner, signed by founding mentors\n📜 Live Project Certificate — detailing your project, domain, and outcomes\n📝 LinkedIn Recommendation Letter — from your assigned IIM alumni mentor\n\nThese are designed to be added directly to your CV and LinkedIn profile as verifiable credentials."],
  [/college|b-school|university|college collaboration|campus|official/i,
    "We collaborate with 20+ B-schools across India:\n\nOfficial collaborations with student bodies and placement committees at IIMs, NMIMS, SIBM, MDI, XLRI, SP Jain, and more.\n\nIf you want to bring MBA Partner to your B-school officially, email us or fill the 'College Collaboration' form at the bottom of the page. We offer group rates and campus workshops."],
  [/instagram|social media|follow|youtube|linkedin/i,
    "Connect with us on social media:\n\n📸 Instagram: @mba_partner — Tips, success stories & updates\n😂 Fun Instagram: @mba_laughterwala — MBA memes & fun content\n🎥 YouTube: @mbapartner — Free sessions, mentor talks\n💼 LinkedIn: prodmarkconsulting — Professional updates\n\nWe post free placement tips, case frameworks, and student success stories daily. Follow us for free content!"],
];

function getBotReply(input: string): string {
  for (const [pattern, reply] of QA) {
    if (pattern.test(input)) return reply;
  }
  return "That's a great question! I don't have a specific answer ready for that.\n\nTry asking me about:\n• Course pricing & details\n• Placement Bootcamp\n• Live Project domains\n• Case Competition coaching\n• Group discounts\n• CAT prep resources\n\nOr fill the Free Enquiry form — our team replies within 24 hours. 😊";
}

// Web Audio API sound generator
function playTone(type: "send" | "receive" | "open") {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "open") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "send") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "receive") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch { /* audio not supported */ }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [minimised, setMinimised] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [notifDot, setNotifDot] = useState(false);
  const [fabHovered, setFabHovered] = useState(false);
  const [labelVisible, setLabelVisible] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const notifTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show notification dot after 8s if chat hasn't been opened
  useEffect(() => {
    notifTimer.current = setTimeout(() => {
      if (!open) setNotifDot(true);
    }, 8000);
    return () => { if (notifTimer.current) clearTimeout(notifTimer.current); };
  }, []);

  // Hide the floating label after 4s
  useEffect(() => {
    const t = setTimeout(() => setLabelVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!minimised) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, minimised]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open, minimised]);

  const handleOpen = useCallback(() => {
    const willOpen = !open;
    setOpen(willOpen);
    setMinimised(false);
    setNotifDot(false);
    setLabelVisible(false);
    if (willOpen && soundOn) playTone("open");
  }, [open, soundOn]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setShowQuick(false);
    setMsgs(m => [...m, { role: "user", text: msg, ts: Date.now() }]);
    if (soundOn) playTone("send");
    setTyping(true);
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      const reply = getBotReply(msg);
      setMsgs(m => [...m, { role: "bot", text: reply, ts: Date.now() }]);
      if (soundOn) playTone("receive");
    }, delay);
  }

  return (
    <>
      {/* Floating label pill */}
      {!open && labelVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "102px",
            right: "98px",
            zIndex: 99,
            background: "var(--card, #0F1018)",
            border: "1px solid rgba(249,115,22,0.4)",
            borderRadius: "20px",
            padding: "8px 14px",
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "var(--text, #F5F0E8)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
            animation: "chatLabelIn 0.4s ease",
            fontFamily: "var(--font-sans, system-ui)",
            pointerEvents: "none",
          }}
        >
          💬 Chat with Maya
          <span style={{
            display: "block",
            fontSize: "0.68rem",
            color: "rgba(249,115,22,0.8)",
            marginTop: "1px",
            fontWeight: 500,
          }}>
            Ask anything about MBA prep
          </span>
        </div>
      )}

      {/* FAB */}
      <div style={{ position: "fixed", bottom: "28px", right: "28px", zIndex: 100 }}>
        <button
          onClick={handleOpen}
          onMouseEnter={() => setFabHovered(true)}
          onMouseLeave={() => setFabHovered(false)}
          style={{
            width: "60px", height: "60px", padding: 0,
            borderRadius: "50%",
            background: open
              ? "linear-gradient(135deg, #C2531A, #a8431a)"
              : "linear-gradient(135deg, #F97316, #C2531A)",
            border: "none",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: fabHovered
              ? "0 8px 40px rgba(249,115,22,0.55), 0 0 0 6px rgba(249,115,22,0.12)"
              : "0 6px 28px rgba(249,115,22,0.4)",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            transform: fabHovered ? "scale(1.08)" : "scale(1)",
            animation: !open ? "chatFabPulse 3s ease-in-out infinite" : "none",
            color: "#fff",
            position: "relative",
          }}
          aria-label={open ? "Close chat" : "Chat with Maya"}
        >
          <div style={{
            transition: "all 0.22s ease",
            transform: open ? "rotate(90deg) scale(1)" : "rotate(0deg) scale(1)",
          }}>
            {open ? <X size={22} strokeWidth={2.5} /> : <MessageCircle size={22} strokeWidth={2} />}
          </div>

          {/* Notification dot */}
          {notifDot && !open && (
            <span style={{
              position: "absolute",
              top: "2px", right: "2px",
              width: "14px", height: "14px",
              borderRadius: "50%",
              background: "#EF4444",
              border: "2px solid #030810",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.55rem",
              fontWeight: 800,
              color: "#fff",
              animation: "notifPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
              1
            </span>
          )}
        </button>
      </div>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "28px",
            zIndex: 100,
            width: "420px",
            maxWidth: "calc(100vw - 32px)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: minimised ? "68px" : "min(620px, calc(100vh - 130px))",
            background: "var(--card, #0F1018)",
            border: "1px solid rgba(249,115,22,0.22)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(249,115,22,0.08)",
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
            animation: "chatWindowIn 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "linear-gradient(135deg, #0C1830 0%, #091220 100%)",
              borderBottom: minimised ? "none" : "1px solid rgba(249,115,22,0.12)",
              flexShrink: 0,
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setMinimised(m => !m)}
          >
            {/* Avatar */}
            <div style={{
              width: "42px", height: "42px", borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #F97316, #C2531A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.95rem", fontWeight: 800, color: "#fff",
              boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
              position: "relative",
            }}>
              M
              <span style={{
                position: "absolute", bottom: "1px", right: "1px",
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#22C55E",
                border: "2px solid #091220",
                animation: "onlinePulse 2s ease-in-out infinite",
              }} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#F5F0E8", lineHeight: 1.2 }}>Maya</div>
              <div style={{ fontSize: "0.72rem", color: "rgba(249,115,22,0.9)", fontWeight: 600 }}>MBA Partner · AI Guide</div>
              <div style={{ fontSize: "0.67rem", color: "rgba(34,197,94,0.8)", fontWeight: 500, marginTop: "1px" }}>
                ● Online · Replies in seconds
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
              {/* Sound toggle */}
              <button
                onClick={e => { e.stopPropagation(); setSoundOn(s => !s); }}
                title={soundOn ? "Mute sounds" : "Unmute sounds"}
                style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)",
                  color: soundOn ? "rgba(249,115,22,0.8)" : "rgba(255,255,255,0.3)",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {soundOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
              </button>

              {/* Minimize chevron */}
              <ChevronDown
                size={16}
                color="rgba(255,255,255,0.4)"
                style={{
                  transition: "transform 0.3s",
                  transform: minimised ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
          </div>

          {!minimised && (
            <>
              {/* Messages area */}
              <div style={{
                flex: 1,
                overflowY: "auto",
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(249,115,22,0.3) transparent",
              }}>
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                      gap: 8,
                      alignItems: "flex-end",
                      animation: i === msgs.length - 1 ? "msgIn 0.3s cubic-bezier(0.34,1.56,0.64,1)" : "none",
                    }}
                  >
                    {m.role === "bot" && (
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: "linear-gradient(135deg, #F97316, #C2531A)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.6rem", fontWeight: 800, color: "#fff", flexShrink: 0,
                      }}>M</div>
                    )}
                    <div
                      style={{
                        padding: "10px 14px",
                        maxWidth: "82%",
                        fontSize: "0.85rem",
                        lineHeight: 1.65,
                        whiteSpace: "pre-line",
                        fontWeight: m.role === "user" ? 600 : 400,
                        borderRadius: m.role === "user"
                          ? "18px 18px 4px 18px"
                          : "4px 18px 18px 18px",
                        background: m.role === "user"
                          ? "linear-gradient(135deg, #F97316, #C2531A)"
                          : "rgba(255,255,255,0.06)",
                        color: m.role === "user" ? "#fff" : "var(--text, #F5F0E8)",
                        border: m.role === "bot" ? "1px solid rgba(255,255,255,0.07)" : "none",
                        boxShadow: m.role === "user"
                          ? "0 4px 14px rgba(249,115,22,0.3)"
                          : "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Quick chips */}
                {showQuick && msgs.length === 1 && (
                  <div style={{ marginTop: "4px" }}>
                    <div style={{
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.3)",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                      paddingLeft: "36px",
                      fontFamily: "var(--font-sans, system-ui)",
                    }}>
                      Popular Questions
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", paddingLeft: "36px" }}>
                      {QUICK_QUESTIONS.map(q => (
                        <button
                          key={q}
                          onClick={() => send(q)}
                          style={{
                            background: "rgba(249,115,22,0.06)",
                            border: "1px solid rgba(249,115,22,0.22)",
                            borderRadius: "20px",
                            padding: "6px 13px",
                            fontSize: "0.74rem",
                            color: "rgba(249,115,22,0.9)",
                            cursor: "pointer",
                            transition: "all 0.18s",
                            fontFamily: "var(--font-sans, system-ui)",
                            fontWeight: 600,
                            lineHeight: 1.2,
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(249,115,22,0.14)";
                            e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = "rgba(249,115,22,0.06)";
                            e.currentTarget.style.borderColor = "rgba(249,115,22,0.22)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {typing && (
                  <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #F97316, #C2531A)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.6rem", fontWeight: 800, color: "#fff", flexShrink: 0,
                    }}>M</div>
                    <div style={{
                      padding: "12px 16px",
                      borderRadius: "4px 18px 18px 18px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex", gap: "5px", alignItems: "center",
                    }}>
                      {[0, 1, 2].map(i => (
                        <span
                          key={i}
                          style={{
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: "rgba(249,115,22,0.6)",
                            display: "block",
                            animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* WhatsApp escalation strip */}
              <div style={{
                padding: "8px 14px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(37,211,102,0.04)",
              }}>
                <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>Need a human?</span>
                <a
                  href="https://wa.me/917042732092?text=Hi%20MBA%20Partner%2C%20I%20have%20a%20question"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "5px",
                    fontSize: "0.72rem", fontWeight: 700,
                    color: "#25D366",
                    textDecoration: "none",
                    padding: "4px 10px",
                    borderRadius: "8px",
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.2)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,211,102,0.08)"; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Input bar */}
              <div style={{
                padding: "10px 12px",
                display: "flex",
                gap: "8px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.3)",
                flexShrink: 0,
              }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
                  placeholder="Ask Maya anything…"
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "14px",
                    padding: "10px 14px",
                    fontSize: "0.86rem",
                    color: "var(--text, #F5F0E8)",
                    outline: "none",
                    fontFamily: "var(--font-sans, system-ui)",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = "rgba(249,115,22,0.5)";
                    e.target.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = "rgba(255,255,255,0.10)";
                    e.target.style.background = "rgba(255,255,255,0.05)";
                  }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  style={{
                    width: "42px", height: "42px", padding: 0,
                    borderRadius: "12px",
                    background: input.trim()
                      ? "linear-gradient(135deg, #F97316, #C2531A)"
                      : "rgba(255,255,255,0.06)",
                    border: "none",
                    cursor: input.trim() ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: input.trim() ? "#fff" : "rgba(255,255,255,0.3)",
                    transition: "all 0.2s",
                    flexShrink: 0,
                    boxShadow: input.trim() ? "0 4px 14px rgba(249,115,22,0.35)" : "none",
                  }}
                >
                  <Send size={16} strokeWidth={2.5} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes chatFabPulse {
          0%, 100% { box-shadow: 0 6px 28px rgba(249,115,22,0.4); }
          50% { box-shadow: 0 6px 28px rgba(249,115,22,0.4), 0 0 0 10px rgba(249,115,22,0.08); }
        }
        @keyframes chatLabelIn {
          from { opacity: 0; transform: translateX(10px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes chatWindowIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); transform-origin: bottom right; }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes notifPop {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        @keyframes onlinePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50% { box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
