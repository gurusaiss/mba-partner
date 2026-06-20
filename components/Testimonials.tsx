"use client";

const testimonials = [
  {
    initials: "AK", name: "Aditya Kumar", college: "IIM Indore · Batch 2024", placed: "McKinsey & Company", role: "Business Analyst — SIP",
    color: "#C9A84C", badge: "badge-gold", domain: "Consulting",
    text: "The case competition coaching completely changed how I think through problems. I won three national competitions back-to-back. My mentor Arjun's frameworks were exactly what every judge was looking for. That track record on my CV opened McKinsey's door.",
  },
  {
    initials: "KN", name: "Kavya Nair", college: "IIM Bangalore · Batch 2024", placed: "Goldman Sachs", role: "Summer Associate",
    color: "#60A5FA", badge: "badge-blue", domain: "Finance",
    text: "The 1:1 sessions helped me understand Goldman's interview process with precision I could not have found elsewhere. The CV review alone was worth the entire programme fee. I walked into every round genuinely prepared, not just hopeful.",
  },
  {
    initials: "RJ", name: "Rahul Joshi", college: "MDI Gurgaon · Batch 2023", placed: "Hindustan Unilever", role: "Management Trainee",
    color: "#4ADE80", badge: "badge-green", domain: "FMCG",
    text: "The live project gave me a real deliverable to speak about in every HUL interview. Interviewers were genuinely impressed by quantified outcomes. Without MBA Partner I would have walked in with a generic CV like every other candidate.",
  },
  {
    initials: "SV", name: "Shreya Verma", college: "XLRI Jamshedpur · Batch 2024", placed: "Amazon", role: "Operations Manager",
    color: "#FDA4AF", badge: "badge-rose", domain: "Operations",
    text: "I had a POR deficit that worried me throughout the year. The live project track fixed that completely. Amazon's operations panel noticed the project outcomes immediately. This platform does not give you hope — it gives you evidence.",
  },
  {
    initials: "MA", name: "Manish Agarwal", college: "IIM Kozhikode · Batch 2023", placed: "Boston Consulting Group", role: "Associate Consultant",
    color: "#A5B4FC", badge: "badge-indigo", domain: "Consulting",
    text: "Three case competition wins on my CV made every BCG recruiter pay attention. The competition calendar and the weekly practice cadence were the real differentiators. I give MBA Partner a 9.6 — well earned.",
  },
  {
    initials: "PR", name: "Pooja Reddy", college: "FMS Delhi · Batch 2024", placed: "Deloitte", role: "Analyst — Strategy",
    color: "#86EFAC", badge: "badge-green", domain: "Analytics",
    text: "The interview transcripts from Deloitte in the repository are extraordinary. Reading those felt like sitting inside last year's interview. My mentor's feedback was direct and honest, which is exactly what you need when the stakes are real.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 relative">
      <div className="section-divider" />
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="badge-gold px-3 py-1 rounded-full tracking-widest">Student Stories</span>
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
          </div>
          <h2 className="font-display font-black leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
            2,000+ Students.<br />
            <span className="text-gold-gradient">Real Outcomes.</span>
          </h2>
          <p className="text-lg" style={{ color: "var(--muted)", fontSize: "1.05rem" }}>
            Hear directly from students who moved from uncertainty to offer letters.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card rounded-2xl p-7 flex flex-col gap-5">

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "var(--gold)", fontSize: "1rem" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="leading-relaxed flex-1" style={{ color: "var(--muted)", fontSize: "0.97rem" }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Person */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center font-display font-bold text-sm"
                  style={{ background: `${t.color}15`, border: `1.5px solid ${t.color}30`, color: t.color }}>
                  {t.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted2)" }}>{t.college}</div>
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-xs font-bold" style={{ color: "var(--gold)" }}>{t.placed}</div>
                  <div className="text-xs" style={{ color: "var(--muted2)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="glass border-gold rounded-2xl p-10 text-center max-w-xl mx-auto">
          <div className="font-display font-black mb-2 text-gold-gradient" style={{ fontSize: "4.5rem", lineHeight: 1 }}>9.6</div>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: "var(--gold)", fontSize: "1.4rem" }}>★</span>
            ))}
          </div>
          <p style={{ color: "var(--muted)" }}>
            Average rating across{" "}
            <span style={{ color: "var(--text)", fontWeight: 600 }}>700+ verified student reviews</span>
          </p>
        </div>
      </div>
    </section>
  );
}
