"use client";

const links = {
  Platform: [
    { label: "Live Projects", href: "#offerings" },
    { label: "Placements Prep", href: "#offerings" },
    { label: "Case Competitions", href: "#offerings" },
    { label: "Resource Repository", href: "#resources" },
  ],
  Courses: [
    { label: "Placement Bootcamp", href: "#courses" },
    { label: "Case Comp Bootcamp", href: "#courses" },
    { label: "Live Projects", href: "#courses" },
    { label: "All-in-One Combos", href: "#courses" },
  ],
  Company: [
    { label: "About Us", href: "https://mbapartner.in" },
    { label: "Mentors", href: "#mentors" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#enroll" },
  ],
};

export default function Footer() {
  return (
    <footer className="py-16" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-lg btn-primary text-xs font-bold flex items-center justify-center">MP</span>
              <span className="serif font-bold text-lg" style={{ color: "var(--text)" }}>
                MBA<span className="gold-text">Partner</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              The mentorship platform serious MBA students rely on. Founded by IIM alumni. Trusted by 5,000+ students.
            </p>
            <div className="mt-5">
              <a href="https://mbapartner.in" target="_blank" rel="noreferrer"
                className="text-sm" style={{ color: "var(--gold)" }}>
                mbapartner.in ↗
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--dim)" }}>{section}</div>
              <ul className="space-y-3">
                {items.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "var(--dim)" }}>
            © 2024 MBA Partner. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--dim)" }}>
            Founded by IIM Alumni · For MBA Students Across India
          </p>
        </div>
      </div>
    </footer>
  );
}
