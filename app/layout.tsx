import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
