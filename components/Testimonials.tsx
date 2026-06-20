"use client";

const testimonials = [
  {
    initials: "AK", name: "Aditya Kumar", college: "IIM Indore · Batch 2024",
    placed: "McKinsey & Company", role: "Business Analyst — SIP",
    quote: "The mock PI sessions were exactly like the real thing. The feedback was specific, direct, and actionable. I walked into McKinsey confident — and it showed.",
    tag: "tag-green",
  },
  {
    initials: "SR", name: "Shreya Rao", college: "IIM Calcutta · Batch 2024",
    placed: "Goldman Sachs", role: "Finance Analyst — SIP",
    quote: "I had a generic CV until MBA Partner rebuilt it from scratch. Three cold rejections turned into two shortlists. The domain coaching made the difference.",
    tag: "tag-blue",
  },
  {
    initials: "VP", name: "Vikram Patel", college: "IIM Bangalore · Batch 2023",
    placed: "Bain & Company", role: "Associate Consultant — Final",
    quote: "Placed at Bain in final placements. The case competition prep gave me the structured thinking they were testing for. Easily the best investment of my MBA.",
    tag: "tag",
  },
  {
    initials: "MP", name: "Meghna Pillai", college: "IIM Ahmedabad · Batch 2023",
    placed: "HUL — Marketing", role: "Brand Manager",
    quote: "The live marketing project gave me something concrete to talk about in every interview. Not a certification — a real deliverable I owned end-to-end.",
    tag: "tag-rose",
  },
  {
    initials: "RS", name: "Rohan Singh", college: "IIM Lucknow · Batch 2024",
    placed: "Amazon", role: "Operations Manager — SIP",
    quote: "Seven mock GDs changed how I participate in group discussions. I used to just add to the conversation — now I structure and lead it.",
    tag: "tag-indigo",
  },
  {
    initials: "DG", name: "Diya Gupta", college: "MDI Gurgaon · Batch 2024",
    placed: "BCG", role: "Business Analyst — SIP",
    quote: "AIR 1 coaching for case competitions is no joke. The frameworks are crisp, the practice is intense. I won two inter-college competitions before placement season.",
    tag: "tag-green",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-14">
          <div className="section-label">700+ Verified Reviews</div>
          <h2 className="section-title" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)" }}>
            From Students<br />Who Made It
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="card p-7 flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center serif font-bold text-sm flex-shrink-0"
                  style={{ background: "var(--card2)", border: "1px solid var(--border)", color: "var(--gold)" }}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>{t.college}</div>
                </div>
              </div>

              <blockquote className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--muted)" }}>
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-2 pt-5" style={{ borderTop: "1px solid var(--border)" }}>
                <span className={`tag ${t.tag}`} style={{ fontSize: "0.62rem" }}>{t.placed}</span>
                <span className="text-xs" style={{ color: "var(--dim)" }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
