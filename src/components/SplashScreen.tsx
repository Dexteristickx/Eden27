"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Phase 1: Enter animation plays (1.5s)
    // Phase 2: Hold for 1.5s
    const holdTimer = setTimeout(() => setPhase("hold"), 1500);
    // Phase 3: Exit after 3s total
    const exitTimer = setTimeout(() => setPhase("exit"), 3000);
    // Complete after exit animation finishes
    const completeTimer = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Letters for "EDEN27"
  const letters = ["E", "D", "E", "N", "2", "7"];

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#f9f6f0" }}
      >
        {/* Subtle radial glow behind the monogram */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, #c48b71 0%, transparent 70%)",
          }}
        />

        {/* Decorative line — top */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          className="w-24 h-[1px] mb-8 origin-center"
          style={{ backgroundColor: "#c48b71" }}
        />

        {/* EDEN27 letters — staggered entry */}
        <div className="flex items-center gap-1 md:gap-3">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-widest select-none"
              style={{
                color: "#2c241b",
                textShadow: "0 2px 20px rgba(196, 139, 113, 0.15)",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="mt-6 text-sm md:text-base tracking-[0.4em] uppercase font-sans"
          style={{ color: "#c48b71" }}
        >
          Oluwadunsin & Ololade
        </motion.p>

        {/* Decorative line — bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          className="w-24 h-[1px] mt-8 origin-center"
          style={{ backgroundColor: "#c48b71" }}
        />

        {/* Pulsing dot loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-16 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#c48b71" }}
            />
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
