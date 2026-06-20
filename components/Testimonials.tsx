"use client";

const testimonials = [
  {
    name: "Aditya Kumar",
    college: "IIM Indore · Batch 2024",
    placed: "McKinsey & Company",
    avatar: "AK",
    color: "from-amber-600 to-orange-700",
    text: "MBA Partner's case competition coaching is unreal. I cracked 3 national competitions back-to-back. My mentor Arjun's frameworks were exactly what judges wanted. Placed at McKinsey for SIP!",
    stars: 5,
    tag: "Consulting",
    badge: "badge-gold",
  },
  {
    name: "Kavya Nair",
    college: "IIM Bangalore · Batch 2024",
    placed: "Goldman Sachs",
    avatar: "KN",
    color: "from-indigo-600 to-purple-700",
    text: "The finance mentorship track is phenomenal. 1:1 sessions helped me understand exactly how Goldman interviews work. Got placed in my dream role. The CV review alone was worth the entire fee.",
    stars: 5,
    tag: "Finance",
    badge: "badge-indigo",
  },
  {
    name: "Rahul Joshi",
    college: "MDI Gurgaon · Batch 2023",
    placed: "Hindustan Unilever",
    avatar: "RJ",
    color: "from-emerald-600 to-teal-700",
    text: "The live projects gave me real experience to talk about in interviews. HUL was directly impressed by my project outcomes. Without MBA Partner I'd have gone in with a generic CV like everyone else.",
    stars: 5,
    tag: "FMCG/Marketing",
    badge: "badge-green",
  },
  {
    name: "Shreya Verma",
    college: "XLRI Jamshedpur · Batch 2024",
    placed: "Amazon",
    avatar: "SV",
    color: "from-rose-600 to-pink-700",
    text: "I was struggling with POR deficit. MBA Partner's CV coaching and live project track compensated perfectly. Amazon operations role is a dream — and it happened only because of this platform.",
    stars: 5,
    tag: "Operations",
    badge: "badge-rose",
  },
  {
    name: "Manish Agarwal",
    college: "IIM Kozhikode · Batch 2023",
    placed: "BCG",
    avatar: "MA",
    color: "from-blue-600 to-cyan-700",
    text: "Case competition wins on my CV turned every BCG recruiter's head. MBA Partner's competition calendar and practice cadence was the difference. 9.6/10 rating from me — well deserved.",
    stars: 5,
    tag: "Consulting",
    badge: "badge-gold",
  },
  {
    name: "Pooja Reddy",
    college: "FMS Delhi · Batch 2024",
    placed: "Deloitte",
    avatar: "PR",
    color: "from-purple-600 to-violet-700",
    text: "The resource repository is a goldmine. Past interview transcripts from Deloitte interviews helped me prepare with uncanny precision. My mentor's feedback was brutally honest and exactly what I needed.",
    stars: 5,
    tag: "Analytics",
    badge: "badge-indigo",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-green px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>💬</span> Student Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            2,000+ Students.{" "}
            <span className="text-gold-gradient">One Platform. Real Results.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Don't take our word for it — hear directly from students who transformed their MBA journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card rounded-2xl p-6 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 truncate">{t.college}</div>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className={`${t.badge} text-xs px-2 py-1 rounded-full font-semibold`}>{t.tag}</span>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Placed at */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Placed at</span>
                <span className="text-sm font-bold text-amber-400">{t.placed}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-16 glass border-gold rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <div className="stat-number text-6xl font-black mb-2">9.6</div>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-amber-400 text-2xl">★</span>
            ))}
          </div>
          <p className="text-gray-400">
            Average rating across <span className="text-white font-semibold">700+ verified student reviews</span>
          </p>
        </div>
      </div>
    </section>
  );
}
