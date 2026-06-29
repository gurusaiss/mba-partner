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
  themeColor: "#F97316",
};

const siteUrl = "https://mbapartner.in";

export const metadata: Metadata = {
  title: "MBAPartner — IIM Alumni Mentorship & MBA Placement Prep",
  description:
    "India's Premier MBA Career Platform. IIM alumni mentors, 98.7% placement rate, live projects, case competitions & placement prep. Join 2,000+ students.",
  keywords: "MBA mentorship, IIM alumni, MBA placement prep, case competition, live projects, SIP prep, MBA Partner, India MBA",
  manifest: "/manifest.json",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "MBAPartner — IIM Alumni Mentorship & MBA Placement Prep",
    description: "India's Premier MBA Career Platform. 9.6/10 rated. 98.7% placement rate. IIM alumni mentors, live projects & case competitions.",
    type: "website",
    url: siteUrl,
    siteName: "MBAPartner",
    images: [
      {
        url: `${siteUrl}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "MBAPartner — IIM Alumni Mentorship & MBA Placement Prep",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBAPartner — IIM Alumni Mentorship & MBA Placement Prep",
    description: "India's Premier MBA Career Platform. 9.6/10 rated. 98.7% placement rate.",
    images: [`${siteUrl}/og-default.jpg`],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "MBAPartner",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MBAPartner",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  foundingDate: "2022",
  description: "India's premier MBA career platform connecting students with IIM alumni mentors for placements, case competitions, and live projects.",
  sameAs: [
    "https://www.linkedin.com/company/mbapartner",
    "https://www.instagram.com/mbapartner",
    "https://www.youtube.com/@mbapartner",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English", "Hindi"],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "9.6",
    bestRating: "10",
    ratingCount: "700",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable} ${cormorant.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Apply saved theme before paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('mp_theme');document.documentElement.setAttribute('data-theme',t||'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}` }} />
        {/* JSON-LD Organization schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
