"use client";
import { ArrowRight, Play, Star, Users, Trophy, TrendingUp } from "lucide-react";

const badges = [
  { icon: "🏛️", text: "Founded by IIM Alumni" },
  { icon: "⭐", text: "9.6/10 Student Rating" },
  { icon: "🎯", text: "98.7% Placement Rate" },
];

export default function Hero() {
  return (
    <section id="home" className="hero-bg grid-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">

          {/* Top badge */}
          <div className="inline-flex items-center gap-2 badge-gold px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-float">
            <span>🔥</span>
            <span>India's #1 MBA Mentorship Platform by IIM Alumni</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            Your MBA Journey,{" "}
            <span className="text-gold-gradient">Supercharged</span>
            <br />
            <span className="text-white/90">by IIM Alumni</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            From Live Projects to Final Placements — we mentor 2,000+ MBA students
            at top B-schools with personalized guidance, real opportunities, and a
            network that delivers results.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#programs" className="btn-gold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 justify-center pulse-gold">
              Explore Programs <ArrowRight size={18} />
            </a>
            <a href="#testimonials" className="btn-outline-gold px-8 py-4 rounded-xl text-base inline-flex items-center gap-2 justify-center">
              <Play size={16} className="fill-amber-400" />
              Watch Success Stories
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {badges.map((b) => (
              <div key={b.text} className="glass border-gold px-4 py-2 rounded-full flex items-center gap-2 text-sm text-gray-300">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: <Users size={20} className="text-amber-400" />, value: "2,000+", label: "Students Mentored" },
              { icon: <Star size={20} className="text-amber-400" />, value: "9.6/10", label: "Average Rating" },
              { icon: <Trophy size={20} className="text-amber-400" />, value: "98.7%", label: "Placement Rate" },
              { icon: <TrendingUp size={20} className="text-amber-400" />, value: "500+", label: "Case Competition Wins" },
            ].map((s) => (
              <div key={s.label} className="glass border-gold rounded-2xl p-4 text-center">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="stat-number text-2xl font-black">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-gray-500">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-gray-600 flex justify-center pt-2">
            <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
