import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site-config";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eden27.com"),
  title: `${siteConfig.coupleNames} · EDEN27 Wedding`,
  description: `You are warmly invited to celebrate the wedding of ${siteConfig.coupleNames} on December 30–31, 2026 in ${siteConfig.weddingLocation}. RSVP and view event details.`,
  openGraph: {
    title: `${siteConfig.coupleNames} · EDEN27 Wedding`,
    description: `Join us in Lagos on December 30–31, 2026 as we celebrate the union of ${siteConfig.coupleNames}.`,
    url: "https://eden27.com",
    siteName: "EDEN27 Wedding",
    images: [
      {
        url: "/images/hero-1.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.coupleNames} — EDEN27`,
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.coupleNames} · EDEN27 Wedding`,
    description: `Celebrate with ${siteConfig.coupleNames} on December 30–31, 2026 in Lagos, Nigeria.`,
    images: ["/images/hero-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeClass = `theme-${siteConfig.theme}`;

  return (
    <html lang="en" className={`${themeClass} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
