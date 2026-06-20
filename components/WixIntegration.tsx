"use client";
import { Link2, Code2, Globe, Smartphone, CheckCircle } from "lucide-react";

const methods = [
  {
    icon: <Link2 size={22} className="text-amber-400" />,
    title: "Navigation Link",
    desc: "Add this site's URL directly to your Wix navigation menu. One click — students land here seamlessly.",
    tag: "Easiest",
    badge: "badge-green",
  },
  {
    icon: <Code2 size={22} className="text-indigo-400" />,
    title: "HTML iFrame Embed",
    desc: "Use Wix's built-in HTML Embed element to display this full site inside any Wix page — no subdomain needed.",
    tag: "Recommended",
    badge: "badge-gold",
  },
  {
    icon: <Globe size={22} className="text-emerald-400" />,
    title: "Subdomain CNAME",
    desc: "Point new.mbapartner.in to this site via a DNS CNAME record. Feels 100% native to the MBA Partner domain.",
    tag: "Professional",
    badge: "badge-indigo",
  },
  {
    icon: <Smartphone size={22} className="text-rose-400" />,
    title: "Install as App (PWA)",
    desc: "This site is a Progressive Web App — students can install it directly on iOS/Android as a standalone mobile app from their browser.",
    tag: "Mobile App",
    badge: "badge-rose",
  },
];

export default function WixIntegration() {
  return (
    <section id="integration" className="py-20 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass border-gold rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 badge-gold px-4 py-1.5 rounded-full text-xs font-semibold mb-4">
                  <span>🔗</span> Wix Integration Ready
                </div>
                <h2 className="text-3xl sm:text-4xl font-black mb-3">
                  Works with Your{" "}
                  <span className="text-gold-gradient">Existing Wix Site</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed max-w-xl">
                  Built to integrate with <strong className="text-white">mbapartner.in</strong> — four plug-and-play
                  methods, zero rebuilding required. Your Wix site stays live; this
                  becomes the premium layer on top.
                </p>
              </div>

              {/* Compatibility badge */}
              <div className="flex-shrink-0">
                <div className="glass border-gold rounded-2xl p-6 text-center w-48">
                  <div className="text-4xl mb-3">🔧</div>
                  <div className="text-white font-bold text-sm mb-1">Zero Conflict</div>
                  <div className="text-gray-500 text-xs">No Wix plan changes needed</div>
                  <div className="flex justify-center mt-3">
                    <CheckCircle size={18} className="text-emerald-400" />
                    <span className="text-emerald-400 text-xs ml-1 self-center">Verified compatible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Integration methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {methods.map((m) => (
                <div key={m.title} className="feature-card rounded-2xl p-5 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/5">{m.icon}</div>
                    <span className={`${m.badge} text-xs px-2 py-1 rounded-full font-semibold`}>{m.tag}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2">{m.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* PWA note */}
            <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
              <Smartphone size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-300">
                <span className="text-amber-400 font-semibold">Mobile App included:</span> This site is a Progressive Web App (PWA). Students on iOS or Android can tap
                {" "}<em>&quot;Add to Home Screen&quot;</em> in their browser and get a native app-like experience — no App Store required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
