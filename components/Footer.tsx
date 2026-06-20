"use client";

const nav = {
  Platform: [
    { label: "Live Projects", href: "#offerings" },
    { label: "Placements Prep", href: "#offerings" },
    { label: "Case Competitions", href: "#offerings" },
    { label: "Resource Hub", href: "#resources" },
    { label: "Mentors", href: "#mentors" },
  ],
  Programs: [
    { label: "Starter Plan", href: "#programs" },
    { label: "Growth Plan", href: "#programs" },
    { label: "Elite Plan", href: "#programs" },
  ],
  Connect: [
    { label: "mbapartner.in", href: "https://mbapartner.in" },
    { label: "+91 7042732092", href: "tel:+917042732092" },
    { label: "Telegram Community", href: "#" },
    { label: "WhatsApp Group", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#020913", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg btn-gold flex items-center justify-center font-bold text-sm" style={{ color: "#040D1E" }}>
                MP
              </div>
              <span className="font-display font-bold text-xl" style={{ color: "var(--text)" }}>
                MBA<span className="text-gold-gradient">Partner</span>
              </span>
            </div>
            <p className="leading-relaxed mb-5 text-sm max-w-xs" style={{ color: "var(--muted)" }}>
              India's leading MBA mentorship platform founded by IIM alumni. 2,000+ students.
              9.6 / 10 average rating. 98.7% placement rate.
            </p>
            <a href="tel:+917042732092" className="text-sm font-medium transition-colors"
              style={{ color: "var(--gold)" }}>
              +91 7042732092
            </a>
          </div>

          {/* Links */}
          {Object.entries(nav).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: "var(--muted2)" }}>
                {section}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "var(--muted2)" }}>
            © 2024 MBA Partner · Prodmark Business Consultants Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <a key={t} href="#" className="text-xs transition-colors" style={{ color: "var(--muted2)" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--muted2)")}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
