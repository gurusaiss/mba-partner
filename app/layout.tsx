import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MBA Partner — India's #1 MBA Mentorship Platform by IIM Alumni",
  description:
    "Join 2,000+ MBA students getting mentored by IIM alumni. Live Projects, Placement Prep, Case Competitions, and Resource Repository — all in one platform. 98.7% placement rate.",
  keywords: "MBA mentorship, IIM alumni, MBA placement prep, case competition, live projects, MBA Partner",
  manifest: "/manifest.json",
  openGraph: {
    title: "MBA Partner — Supercharge Your MBA Journey",
    description: "9.6/10 rated mentorship platform by IIM alumni. 98.7% placement rate.",
    type: "website",
    url: "https://mbapartner.in",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "MBA Partner",
    "theme-color": "#F59E0B",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
