"use client";
import { GraduationCap, Phone, ExternalLink } from "lucide-react";

const links = {
  Platform: [
    { label: "Live Projects", href: "#offerings" },
    { label: "Case Competitions", href: "#offerings" },
    { label: "Placement Prep", href: "#offerings" },
    { label: "Resource Hub", href: "#resources" },
    { label: "Mentors", href: "#mentors" },
  ],
  Programs: [
    { label: "Starter Plan", href: "#programs" },
    { label: "Growth Plan", href: "#programs" },
    { label: "Elite Plan", href: "#programs" },
    { label: "Free Trial", href: "#programs" },
  ],
  Connect: [
    { label: "mbapartner.in", href: "https://mbapartner.in", external: true },
    { label: "Telegram Community", href: "#", external: false },
    { label: "WhatsApp Group", href: "#", external: false },
    { label: "+91 7042732092", href: "tel:+917042732092", external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl btn-gold flex items-center justify-center">
                <GraduationCap size={18} className="text-gray-900" />
              </div>
              <span className="font-black text-xl">MBA<span className="text-gold-gradient">Partner</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's leading MBA mentorship platform founded by IIM alumni. We've helped 2,000+ students
              achieve their dream placements through live projects, case competitions, and personalized mentorship.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone size={14} className="text-amber-400" />
              <a href="tel:+917042732092" className="hover:text-amber-400 transition-colors">+91 7042732092</a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-sm mb-4">{section}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={"external" in item && item.external ? "_blank" : undefined}
                      rel="noreferrer"
                      className="text-gray-400 text-sm hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      {item.label}
                      {"external" in item && item.external && <ExternalLink size={10} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 MBA Partner by Prodmark Business Consultants Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((t) => (
              <a key={t} href="#" className="text-gray-600 text-xs hover:text-amber-400 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
