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
  title: `${siteConfig.coupleNames} Wedding`,
  description: `Join us for the wedding of ${siteConfig.coupleNames}`,
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
