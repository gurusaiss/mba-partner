"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Sun, Moon, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";

const mbaLinks = [
  { label: "Offerings", href: "#offerings" },
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "College Collab", href: "#college-collab" },
  { label: "FAQs", href: "#faqs" },
];

const catLinks = [
  { label: "CAT Strategy", href: "#cat-strategy" },
  { label: "Mocks", href: "#cat-mocks" },
  { label: "GDPI Prep", href: "#gdpi" },
  { label: "Free RC", href: "#rc-material" },
  { label: "AI Tools", href: "#ai-tools" },
];

type Mode = "mba" | "cat";

export default function Navbar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Monitor scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync theme and session
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("mp_session");
      if (storedSession) setUser(JSON.parse(storedSession));
      
      const storedTheme = localStorage.getItem("mp_theme") as "dark" | "light" | null;
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.setAttribute("data-theme", storedTheme);
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {
      console.error("Failed to load navbar session/theme", e);
    }
  }, []);

  // Dropdown close logic
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuOpen]);

  // Section observer to detect current scroll section
  useEffect(() => {
    const links = mode === "mba" ? mbaLinks : catLinks;
    const sectionIds = links.map(l => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Set<string>();

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.add(id);
          } else {
            visibleSections.delete(id);
          }
          if (visibleSections.size > 0) {
            setActiveSection([...visibleSections][0]);
          }
        },
        { rootMargin: "-25% 0px -65% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [mode]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("mp_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("mp_session");
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  };

  const links = mode === "mba" ? mbaLinks : catLinks;
  const initials = user ? user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : "";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Mode Switcher */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMode("mba");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 focus:outline-none"
            >
              <div className="h-9 w-9 rounded-lg bg-blue-650 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 text-sm">
                MP
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-slate-555 leading-none">
                  MBA<span className="text-blue-650">Partner</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mt-0.5">
                  IIM Alumni Founded
                </span>
              </div>
            </a>

            {/* Mode Switcher Pill */}
            <div className="hidden sm:flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
              <button
                onClick={() => { setMode("mba"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                  mode === "mba" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                MBA
              </button>
              <button
                onClick={() => { setMode("cat"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                  mode === "cat" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                CAT
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const sectionId = l.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onMouseEnter={() => setHoveredLink(l.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-colors duration-200 focus:outline-none ${
                    isActive 
                      ? "text-blue-600 dark:text-blue-400" 
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-205"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  
                  {/* Sliding Underline / Background Pill */}
                  {hoveredLink === l.href && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-900 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0 inset-x-3.5 h-[2px] bg-blue-600 dark:bg-blue-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone contact */}
            <a
              href="tel:+917042732092"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-650 dark:hover:text-blue-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800/50 bg-slate-50/55 dark:bg-slate-900/50"
            >
              <Phone size={13} />
              <span>Talk to Mentor</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-55 dark:hover:bg-slate-900 transition-all focus:outline-none"
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Session Actions */}
            {user ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none"
                >
                  <div className="h-6 w-6 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    {initials}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 max-w-[80px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={12} className="text-slate-505 transition-transform duration-200" style={{ transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg p-1 z-50 text-slate-700 dark:text-slate-300"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-555 truncate mt-0.5">{user.email}</p>
                      </div>
                      <a
                        href="/dashboard/"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        My Dashboard
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 w-full text-left px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus:outline-none"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setAuthTab("login"); setShowAuth(true); }}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-650 transition-colors focus:outline-none"
                >
                  Login
                </button>
                <a
                  href={mode === "mba" ? "#enroll" : "#cat-enroll"}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all shadow-blue-500/10 focus:outline-none"
                >
                  Enroll Now
                </a>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1.5 text-slate-600 dark:text-slate-450 hover:bg-slate-105 dark:hover:bg-slate-900 rounded-lg focus:outline-none"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu slide-down */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-4">
                
                {/* Mobile Mode Selector */}
                <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
                  <button
                    onClick={() => { setMode("mba"); setOpen(false); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-full text-center transition-all ${
                      mode === "mba" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    MBA Student
                  </button>
                  <button
                    onClick={() => { setMode("cat"); setOpen(false); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-full text-center transition-all ${
                      mode === "cat" ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    CAT / OMETs
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col gap-1">
                  {links.map((l) => {
                    const sectionId = l.href.replace("#", "");
                    const isActive = activeSection === sectionId;
                    return (
                      <a
                        key={l.href}
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                          isActive 
                            ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400" 
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        {l.label}
                      </a>
                    );
                  })}
                </div>

                {/* Contact phone */}
                <a
                  href="tel:+917042732092"
                  className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs bg-slate-50 dark:bg-slate-900"
                >
                  <Phone size={14} />
                  <span>Talk to a Mentor: +91 70427 32092</span>
                </a>

                {/* Mobile Session Actions */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {user ? (
                    <>
                      <div className="px-3 py-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                        <p className="text-[10px] text-slate-500">{user.email}</p>
                      </div>
                      <a
                        href="/dashboard/"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
                      >
                        <LayoutDashboard size={14} />
                        My Dashboard
                      </a>
                      <button
                        onClick={() => { handleLogout(); setOpen(false); }}
                        className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 text-xs font-bold focus:outline-none"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => { setAuthTab("login"); setShowAuth(true); setOpen(false); }}
                        className="py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold focus:outline-none"
                      >
                        Login
                      </button>
                      <a
                        href={mode === "mba" ? "#enroll" : "#cat-enroll"}
                        onClick={() => setOpen(false)}
                        className="py-2.5 rounded-lg bg-blue-600 text-white text-center text-xs font-bold block"
                      >
                        Enroll Now
                      </a>
                    </div>
                  )}

                  {/* Mobile Theme Toggle */}
                  <button
                    onClick={() => { toggleTheme(); setOpen(false); }}
                    className="flex items-center justify-center gap-2 py-2 rounded-lg text-slate-500 dark:text-slate-400 text-xs font-bold focus:outline-none mt-1"
                  >
                    {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
                    <span>{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {showAuth && (
        <AuthModal
          defaultTab={authTab}
          onClose={() => setShowAuth(false)}
          onAuth={(u) => setUser(u)}
        />
      )}
    </>
  );
}
