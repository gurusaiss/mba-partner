"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const QUICK_QUESTIONS = [
  "What programs do you offer?",
  "How does mentorship work?",
  "Tell me about placements",
  "Case competition coaching?",
];

function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("program") || q.includes("plan") || q.includes("pricing") || q.includes("cost") || q.includes("fee")) {
    return "We have 3 programs:\n\n🥉 **Starter (₹4,999/mo)** — Resource library, group mentorship, community access.\n\n🥈 **Growth (₹9,999/mo)** — 1:1 IIM alumni mentor, CV review, mock interviews, live project.\n\n🥇 **Elite (₹19,999/mo)** — Unlimited mentorship, senior IIM A/B/C mentor, 3 live projects, placement coordinator.\n\nScroll to the Programs section or visit mbapartner.in to enroll!";
  }
  if (q.includes("mentor") || q.includes("alumni")) {
    return "Our mentors are IIM A/B/C/L, XLRI, and FMS alumni with 5–10+ years of industry experience. You get matched with a mentor within 24 hours of enrolling, based on your domain and college. 1:1 sessions are personalized to your specific goals. 🤝";
  }
  if (q.includes("placement") || q.includes("sip") || q.includes("intern") || q.includes("job")) {
    return "We have a **98.7% placement rate** across 2,000+ students! Our placement support includes:\n\n✅ CV optimization\n✅ Mock interviews\n✅ Domain-specific coaching\n✅ Interview transcript library\n✅ Alumni network access\n\nStudents have been placed at McKinsey, Goldman Sachs, Amazon, HUL, BCG, Deloitte, and many more! 🏆";
  }
  if (q.includes("case") || q.includes("competition")) {
    return "Our Case Competition program includes:\n\n📚 500+ case library\n🎯 Framework training (BCG/McKinsey/Bain style)\n📅 National competition calendar\n🏅 1:1 coaching from past competition winners\n\nStudents from our program have won 500+ competitions! Want to know more about enrolling?";
  }
  if (q.includes("live project") || q.includes("project")) {
    return "Live Projects are real consulting/marketing/finance projects with actual companies. You get:\n\n🏢 Projects across 10+ domains\n📜 Certificate of completion\n💼 CV-worthy outcomes (not just coursework!)\n\nAvailable from Growth plan onwards. These projects make your CV stand out in interviews!";
  }
  if (q.includes("resource") || q.includes("cv") || q.includes("template") || q.includes("material")) {
    return "Our Resource Repository includes:\n\n📄 50+ CV templates (ATS-optimized)\n📚 20+ study compendiums\n📊 500+ solved case decks\n💬 300+ interview transcripts\n📈 5 years of placement data\n\nAll accessible from the Starter plan onwards!";
  }
  if (q.includes("rating") || q.includes("review") || q.includes("feedback")) {
    return "MBA Partner has a **9.6/10 average rating** from 700+ verified student reviews! Students consistently praise the quality of mentors, placement support, and the live project experience. Our Net Promoter Score is industry-leading. ⭐";
  }
  if (q.includes("iim") || q.includes("xlri") || q.includes("fms") || q.includes("b-school") || q.includes("bschool")) {
    return "MBA Partner was founded by alumni from **Old IIMs** and serves students at all top B-schools — IIM A/B/C/L/K/I, XLRI, FMS, MDI, SPJIMR, and others. Our mentors are from IIM Ahmedabad, Bangalore, Calcutta, Lucknow, XLRI, and FMS Delhi. 🏛️";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("start")) {
    return "Hi there! 👋 I'm Maya, your MBA Partner guide. I can help you with:\n\n• Programs & Pricing\n• Mentorship details\n• Placement support\n• Case competitions\n• Live projects\n• Resources\n\nWhat would you like to know?";
  }
  if (q.includes("contact") || q.includes("call") || q.includes("phone") || q.includes("reach")) {
    return "You can reach us at:\n\n📞 +91 7042732092\n🌐 mbapartner.in\n💬 Join our Telegram or WhatsApp community\n\nOur team typically responds within 2 hours!";
  }
  if (q.includes("enroll") || q.includes("join") || q.includes("sign up") || q.includes("register")) {
    return "Enrolling is simple! 🚀\n\n1. Visit **mbapartner.in**\n2. Choose your program (Starter/Growth/Elite)\n3. Complete registration\n4. Get matched with your mentor within 24 hours!\n\nWe have a 7-day satisfaction guarantee — full refund if you're not happy. Want to get started?";
  }

  return "Great question! MBA Partner offers comprehensive mentorship for MBA students including live projects, placement prep, case competition coaching, and access to our resource repository. Our IIM alumni mentors have helped 2,000+ students achieve a 98.7% placement rate.\n\nCould you be more specific? You can ask about programs, mentors, placements, resources, or anything else! 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi! 👋 I'm Maya, your MBA Partner guide. Ask me anything about our programs, mentors, placements, or resources!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text?: string) => {
    const msg = text ?? input.trim();
    if (!msg) return;
    setInput("");
    setMsgs((prev) => [...prev, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setMsgs((prev) => [...prev, { role: "bot", text: getBotReply(msg) }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 btn-gold rounded-2xl flex items-center justify-center shadow-lg pulse-gold"
        aria-label="Open chat"
      >
        {open ? <X size={22} className="text-gray-900" /> : <MessageCircle size={22} className="text-gray-900" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[520px] rounded-2xl chatbot-container flex flex-col overflow-hidden"
          style={{ background: "#0D1117" }}>
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/8 bg-gradient-to-r from-amber-500/10 to-transparent">
            <div className="w-9 h-9 rounded-xl btn-gold flex items-center justify-center flex-shrink-0">
              <Bot size={18} className="text-gray-900" />
            </div>
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-1">
                Maya <Sparkles size={12} className="text-amber-400" />
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online — MBA Partner AI Guide
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    m.role === "user"
                      ? "chat-bubble-user text-gray-900 font-medium"
                      : "chat-bubble-bot text-gray-200"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="chat-bubble-bot px-4 py-3 flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                  <span className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {msgs.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="badge-gold text-xs px-3 py-1.5 rounded-full font-medium hover:bg-amber-500/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-white/6 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 bg-white/5 border border-white/8 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-amber-500/50 transition-colors"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim()}
              className="btn-gold w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40"
            >
              <Send size={15} className="text-gray-900" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
