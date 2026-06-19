"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { SplashScreen } from "@/components/SplashScreen";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        style={{
          opacity: showSplash ? 0 : 1,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
      </div>
    </>
  );
}
