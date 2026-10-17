"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only show splash once per session
    const hasSeen = sessionStorage.getItem("eden27_splash_seen");
    if (!hasSeen) {
      setShowSplash(true);
    }
    setMounted(true);
  }, []);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem("eden27_splash_seen", "true");
    setShowSplash(false);
  }, []);

  return (
    <>
      {mounted && showSplash && (
        <SplashScreen 
          onComplete={handleSplashComplete} 
          onSkip={handleSplashComplete}
        />
      )}
      <div
        style={{
          opacity: mounted && showSplash ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <WhatsAppFloat
          coordinatorPhone="2348012345678"
          groupInviteLink="https://chat.whatsapp.com/XXXXX"
          coupleNames="Oluwadunsin & Ololade"
        />
      </div>
    </>
  );
}
