"use client";

const mentors = [
  {
    name: "Arjun Mehta",
    title: "IIM Ahmedabad · Ex-McKinsey",
    domain: "Consulting",
    avatar: "AM",
    color: "from-amber-600 to-orange-700",
    badge: "badge-gold",
    exp: "8 yrs exp",
    students: "240+ mentored",
  },
  {
    name: "Priya Sharma",
    title: "IIM Bangalore · Ex-Goldman Sachs",
    domain: "Finance",
    avatar: "PS",
    color: "from-indigo-600 to-purple-700",
    badge: "badge-indigo",
    exp: "6 yrs exp",
    students: "180+ mentored",
  },
  {
    name: "Rohit Kapoor",
    title: "IIM Calcutta · Ex-Hindustan Unilever",
    domain: "Marketing",
    avatar: "RK",
    color: "from-emerald-600 to-teal-700",
    badge: "badge-green",
    exp: "10 yrs exp",
    students: "320+ mentored",
  },
  {
    name: "Sneha Gupta",
    title: "XLRI Jamshedpur · Ex-Amazon",
    domain: "Operations",
    avatar: "SG",
    color: "from-rose-600 to-pink-700",
    badge: "badge-rose",
    exp: "7 yrs exp",
    students: "150+ mentored",
  },
  {
    name: "Vikram Singh",
    title: "IIM Lucknow · Ex-BCG",
    domain: "Strategy",
    avatar: "VS",
    color: "from-blue-600 to-cyan-700",
    badge: "badge-indigo",
    exp: "9 yrs exp",
    students: "200+ mentored",
  },
  {
    name: "Ananya Bose",
    title: "FMS Delhi · Ex-Deloitte",
    domain: "Analytics",
    avatar: "AB",
    color: "from-purple-600 to-violet-700",
    badge: "badge-indigo",
    exp: "5 yrs exp",
    students: "130+ mentored",
  },
];

export default function Mentors() {
  return (
    <section id="mentors" className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
            <span>👨‍🏫</span> Our Mentors
          </div>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Learn from Those Who've{" "}
            <span className="text-gold-gradient">Been There</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our mentors aren't just alumni — they're practitioners who've cracked
            the same placements you're targeting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <div key={m.name} className="feature-card rounded-2xl p-6 group">
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                  {m.avatar}
                </div>
                <div>
                  <div className="font-bold text-white">{m.name}</div>
                  <div className="text-xs text-gray-400">{m.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`${m.badge} text-xs px-2 py-1 rounded-full font-semibold`}>{m.domain}</span>
                <span className="text-xs text-gray-500">{m.exp}</span>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-500">{m.students}</span>
              </div>

              {/* Star rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
                <span className="text-xs text-gray-500 ml-1 self-center">5.0</span>
              </div>
            </div>
          ))}
        </div>

        {/* IIM logos strip */}
        <div className="mt-16 text-center">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-6">Mentors from</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {["IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta", "IIM Lucknow", "XLRI", "FMS Delhi", "IIM Kozhikode"].map((inst) => (
              <div key={inst} className="glass border-gold px-4 py-2 rounded-lg text-xs text-gray-400 font-semibold">
                {inst}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
