import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#C9A84C",
};

export const metadata: Metadata = {
  title: "MBA Partner — IIM Alumni Mentorship for Serious MBA Students",
  description:
    "Join 2,000+ MBA students mentored by IIM alumni. Live Projects, Placement Prep, Case Competitions, and a curated Resource Repository — all in one platform. 98.7% placement rate.",
  keywords: "MBA mentorship, IIM alumni, MBA placement prep, case competition, live projects, SIP prep, MBA Partner",
  manifest: "/manifest.json",
  openGraph: {
    title: "MBA Partner — Supercharge Your MBA Journey",
    description: "9.6/10 rated mentorship platform by IIM alumni. 98.7% placement rate across 2000+ students.",
    type: "website",
    url: "https://mbapartner.in",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "MBA Partner",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Apply saved theme before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('mp_theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}` }} />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
