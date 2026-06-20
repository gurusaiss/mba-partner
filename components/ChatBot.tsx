"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const INIT: Msg[] = [{ role: "bot", text: "Hi! I'm Maya, your MBA Partner guide. Ask me about courses, placements, case competitions, or live projects." }];

const rules: [RegExp, string][] = [
  [/price|cost|fee|rupee/i, "Our courses range from Rs.3,499 to Rs.13,999. The Best Value combo (Placement + Case Comp + Live Project) is Rs.13,999. Check the Courses section for full details."],
  [/placement|pi|gd|interview|mock/i, "The Placement Bootcamp includes 7 Mock PIs, 7 Mock GDs, 5 CV reviews, and 300+ real interview transcripts. Starting at Rs.3,499."],
  [/case.comp|competition|ppt|canva/i, "The Case Competition Bootcamp is coached by AIR 1. 4 live sessions (2 hrs each), 30+ winning PPTs, and Canva Premium for 1 year — Rs.3,499."],
  [/live.project|project|consulting|finance|marketing/i, "Live Projects are 2-month real engagements across 6 domains: Consulting, Finance, Marketing, HR, Operations, Product. You get a certificate and LinkedIn recommendation."],
  [/mentor|alumni|iim/i, "Our mentors are IIM A/B/C/L/K/I alumni placed at McKinsey, Goldman, Bain, HUL, Amazon, and more. You get matched in 24 hours."],
  [/cv|resume|linkedin/i, "We offer ATS-optimised CV templates (50+ formats), LinkedIn profile overhauls, and cover letter reviews — all included in the Placement Bootcamp."],
  [/resource|repository|transcript|material/i, "The Resource Repository includes 50+ CV templates, 300+ interview transcripts, 5 years of placement data, and 30+ case competition decks."],
  [/contact|call|phone|whatsapp/i, "Reach us at +91 98765 43210 or fill the Free Enquiry form — we respond within 24 hours."],
  [/enroll|join|start|sign.?up/i, "Scroll to the Courses section to enroll directly, or use the Free Enquiry form for a personalised recommendation."],
  [/combo|bundle|package/i, "Our combos start at Rs.5,999 (Placement + Case Comp) up to Rs.13,999 (Master Bundle). Best value for money."],
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
      <button onClick={() => setOpen(o => !o)} className="btn-primary"
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50, width: "52px", height: "52px", padding: 0, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
        aria-label="Chat with Maya">
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {open && (
        <div className="chatbox" style={{ position: "fixed", bottom: "88px", right: "24px", zIndex: 50, width: "320px", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "460px", background: "var(--card)", border: "1px solid rgba(201,168,76,0.15)" }}>
          <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid var(--border)", background: "var(--card2)" }}>
            <div className="btn-primary" style={{ width: "32px", height: "32px", padding: 0, borderRadius: "50%", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>M</div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>Maya</div>
              <div style={{ fontSize: "0.75rem", color: "var(--muted)" }}>MBA Partner Guide</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div className={m.role === "user" ? "chat-user" : "chat-bot"}
                  style={{ padding: "10px 14px", maxWidth: "85%", fontSize: "0.85rem", lineHeight: 1.6, color: m.role === "user" ? "#050D1C" : "var(--muted)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="chat-bot" style={{ padding: "10px 14px", display: "flex", gap: "4px", alignItems: "center" }}>
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                  <span className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--muted)", display: "block" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: "12px 16px", display: "flex", gap: "8px", borderTop: "1px solid var(--border)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask Maya..."
              style={{ flex: 1, background: "var(--card2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "8px 12px", fontSize: "0.85rem", color: "var(--text)", outline: "none", fontFamily: "Inter, system-ui, sans-serif" }} />
            <button onClick={send} className="btn-primary" style={{ width: "36px", height: "36px", padding: 0, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
