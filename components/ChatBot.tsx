"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const QUICK = [
  "What programs do you offer?",
  "How does mentorship work?",
  "Tell me about placements",
  "Case competition coaching?",
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("program") || q.includes("plan") || q.includes("pricing") || q.includes("cost") || q.includes("fee")) {
    return "We offer three programmes:\n\nStarter — ₹4,999/mo\nResource library, group mentorship, community access.\n\nGrowth — ₹9,999/mo\n1:1 IIM alumni mentor, CV review, mock interviews, one live project.\n\nElite — ₹19,999/mo\nUnlimited mentorship, senior IIM A/B/C mentor, three simultaneous live projects, dedicated placement coordinator.\n\nAll plans include a 7-day money-back guarantee.";
  }
  if (q.includes("mentor")) {
    return "Our mentors are IIM A, B, C, L, XLRI, and FMS alumni with 5–10 years of industry experience.\n\nYou are matched with a mentor within 24 hours of enrolling, based on your target domain and B-school. Sessions are fully personalised — no generic advice.";
  }
  if (q.includes("placement") || q.includes("sip") || q.includes("intern") || q.includes("job")) {
    return "98.7% of our students are placed in their target domains.\n\nPlacement support includes:\n— CV optimisation\n— Mock interviews\n— Domain-specific coaching\n— 300+ interview transcripts\n— Alumni network access\n\nStudents have secured roles at McKinsey, Goldman Sachs, Amazon, HUL, BCG, and Deloitte.";
  }
  if (q.includes("case") || q.includes("competition")) {
    return "Our case competition programme includes:\n— 500+ case library\n— BCG, McKinsey, Bain frameworks\n— National competition calendar\n— 1:1 coaching from past winners\n\nStudents from our platform have collectively won 500+ competitions.";
  }
  if (q.includes("live project") || q.includes("project")) {
    return "Live Projects are real consulting, marketing, finance, and operations projects with actual companies.\n\nYou receive a certificate of completion and a tangible deliverable for your CV.\n\nAvailable across 10+ domain tracks from the Growth plan onwards.";
  }
  if (q.includes("resource") || q.includes("repositor") || q.includes("cv") || q.includes("template")) {
    return "The Resource Repository contains:\n— 50+ CV templates (ATS-optimised)\n— 20+ study compendiums\n— 500+ solved case decks\n— 300+ interview transcripts\n— 5 years of placement data\n\nAll accessible from the Starter plan onwards.";
  }
  if (q.includes("rating") || q.includes("review")) {
    return "MBA Partner holds a 9.6 / 10 average rating across 700+ verified student reviews.\n\nOur students consistently highlight mentor quality, placement outcomes, and the resource repository as the strongest elements of the platform.";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("reach")) {
    return "You can reach our team at:\n\nPhone: +91 7042732092\nWebsite: mbapartner.in\nTelegram & WhatsApp communities are also available upon enrolment.\n\nOur team typically responds within two hours.";
  }
  if (q.includes("enroll") || q.includes("join") || q.includes("start") || q.includes("sign up")) {
    return "Enrolment takes under five minutes:\n\n1. Visit mbapartner.in\n2. Select your programme\n3. Complete registration\n4. Receive your mentor match within 24 hours\n\nAll programmes carry a 7-day satisfaction guarantee.";
  }
  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return "Hello — I am your MBA Partner guide.\n\nI can answer questions on our programmes, mentorship, placement support, case competitions, live projects, and the resource repository.\n\nWhat would you like to know?";
  }
  return "Thank you for your question. MBA Partner provides structured mentorship for MBA students across Live Projects, Placement Prep, Case Competitions, and a curated Resource Repository.\n\nCould you be more specific? I am here to help you make the right decision.";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{
    role: "bot",
    text: "Hello — I am your MBA Partner guide.\n\nHow can I help you today? Ask me about programmes, mentors, placements, or resources.",
  }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMsgs(p => [...p, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs(p => [...p, { role: "bot", text: reply(msg) }]);
      setTyping(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 btn-gold rounded-2xl flex items-center justify-center shadow-xl pulse-gold"
        aria-label="Open chat"
      >
        {open
          ? <X size={20} style={{ color: "#040D1E" }} />
          : <MessageCircle size={20} style={{ color: "#040D1E" }} />
        }
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl chatbot-container flex flex-col overflow-hidden"
          style={{ background: "var(--navy-card)", height: "520px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <div className="w-9 h-9 rounded-xl btn-gold flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ color: "#040D1E" }}>
              MP
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>MBA Partner Guide</div>
              <div className="text-xs flex items-center gap-1.5" style={{ color: "#4ADE80" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                Online — ready to help
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === "user" ? "chat-bubble-user font-medium" : "chat-bubble-bot"}`}
                  style={{ color: m.role === "user" ? "#040D1E" : "var(--text)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot px-4 py-3.5 flex gap-1.5 items-center">
                  <span className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--muted)" }} />
                  <span className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--muted)" }} />
                  <span className="w-2 h-2 rounded-full typing-dot" style={{ background: "var(--muted)" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {msgs.length <= 2 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="badge-gold px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-80 transition-opacity">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-3 pb-3 pt-2 border-t flex gap-2" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type your question..."
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
              style={{
                background: "var(--navy-card2)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--text)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button onClick={() => send()} disabled={!input.trim()}
              className="btn-gold w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-opacity">
              <Send size={15} style={{ color: "#040D1E" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
