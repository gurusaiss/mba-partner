"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const INIT: Msg[] = [{ role: "bot", text: "Hi! I'm Maya, your MBA Partner guide. Ask me about courses, placements, case competitions, or live projects." }];

const rules: [RegExp, string][] = [
  [/price|cost|fee|₹|rupee/i, "Our courses range from ₹3,499 to ₹13,999. The Best Value combo (Placement + Case Comp + Live Project) is ₹13,999. Check the Courses section for full details."],
  [/placement|pi|gd|interview|mock/i, "The Placement Bootcamp includes 7 Mock PIs, 7 Mock GDs, 5 CV reviews, and 300+ real interview transcripts. Starting at ₹3,499."],
  [/case.comp|competition|ppt|canva/i, "The Case Competition Bootcamp is coached by AIR 1. 4 live sessions (2 hrs each), 30+ winning PPTs, and Canva Premium for 1 year — ₹3,499."],
  [/live.project|project|consulting|finance|marketing/i, "Live Projects are 2-month real engagements across 6 domains: Consulting, Finance, Marketing, HR, Operations, Product. You get a certificate and LinkedIn recommendation."],
  [/mentor|alumni|iim/i, "Our mentors are IIM A/B/C/L/K/I alumni placed at McKinsey, Goldman, Bain, HUL, Amazon, and more. You get matched in 24 hours."],
  [/cv|resume|linkedin/i, "We offer ATS-optimised CV templates (50+ formats), LinkedIn profile overhauls, and cover letter reviews — all included in the Placement Bootcamp."],
  [/resource|repository|transcript|material/i, "The Resource Repository includes 50+ CV templates, 300+ interview transcripts, 5 years of placement data, and 30+ case competition decks."],
  [/contact|call|phone|whatsapp/i, "Reach us at +91 98765 43210 or fill the Free Enquiry form — we respond within 24 hours."],
  [/enroll|join|start|sign.?up/i, "Scroll to the Courses section to enroll directly, or use the Free Enquiry form for a personalised recommendation."],
  [/combo|bundle|package/i, "Our combos start at ₹5,999 (Placement + Case Comp) up to ₹13,999 (Master Bundle — all three tracks). Best value for money."],
];

function getBotReply(input: string): string {
  for (const [pattern, reply] of rules) {
    if (pattern.test(input)) return reply;
  }
  return "Great question! For detailed guidance, fill the Free Enquiry form and our team will reach out within 24 hours. Or ask me about: courses, pricing, placements, mentors, or resources.";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(INIT);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs(m => [...m, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: "bot", text: getBotReply(text) }]);
    }, 900);
  }

  return (
    <>
      {/* FAB */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full btn-primary shadow-2xl flex items-center justify-center"
        aria-label="Chat with Maya">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbox fixed bottom-24 right-6 z-50 w-80 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: "var(--card)", border: "1px solid rgba(201,168,76,0.15)", maxHeight: "460px" }}>

          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--card2)" }}>
            <div className="w-8 h-8 rounded-full btn-primary text-xs font-bold flex items-center justify-center flex-shrink-0">M</div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>Maya</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>MBA Partner Guide</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ fontSize: "0.83rem" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2.5 max-w-[85%] leading-relaxed ${m.role === "user" ? "chat-user text-xs font-medium" : "chat-bot"}`}
                  style={{ color: m.role === "user" ? "#050D1C" : "var(--muted)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="chat-bot px-4 py-3 flex gap-1">
                  <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted)" }} />
                  <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted)" }} />
                  <span className="dot w-1.5 h-1.5 rounded-full" style={{ background: "var(--muted)" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask Maya…"
              className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
              style={{ background: "var(--card2)", border: "1px solid var(--border)", color: "var(--text)", fontSize: "0.8rem" }}
            />
            <button onClick={send} className="btn-primary w-9 h-9 p-0 rounded-lg flex items-center justify-center flex-shrink-0">
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
