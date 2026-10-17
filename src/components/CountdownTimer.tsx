'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(targetISO: string): TimeLeft {
  const diff = new Date(targetISO).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

interface CountdownTimerProps {
  targetDate: string;       // ISO 8601 with timezone, e.g. "2026-12-30T10:00:00+01:00"
  label: string;            // e.g. "Traditional Wedding"
  sublabel?: string;        // e.g. "December 30, 2026"
  accentColor?: string;     // Tailwind-compatible hex
}

export default function CountdownTimer({
  targetDate,
  label,
  sublabel,
  accentColor = '#c48b71',
}: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units: { key: keyof TimeLeft; label: string }[] = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hours' },
    { key: 'minutes', label: 'Min' },
    { key: 'seconds', label: 'Sec' },
  ];

  const isComplete = time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center py-8 px-4"
    >
      <p
        className="text-xs sm:text-sm uppercase tracking-[0.35em] mb-1 font-sans font-medium"
        style={{ color: accentColor }}
      >
        {label}
      </p>
      {sublabel && (
        <p className="text-[#2c241b]/50 text-xs tracking-widest mb-6 font-sans">
          {sublabel}
        </p>
      )}

      {isComplete && mounted ? (
        <p className="font-serif text-2xl sm:text-3xl text-[#2c241b]">
          The celebration has begun! 🎉
        </p>
      ) : (
        <div className="flex justify-center gap-3 sm:gap-6 lg:gap-10">
          {units.map(({ key, label: unitLabel }) => (
            <div key={key} className="flex flex-col items-center min-w-[60px]">
              {/* Number card */}
              <div
                className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                           flex items-center justify-center rounded-2xl 
                           bg-white/60 backdrop-blur-sm border border-[#2c241b]/10 
                           shadow-sm"
              >
                <span
                  className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2c241b] tabular-nums"
                  suppressHydrationWarning
                >
                  {mounted ? String(time[key]).padStart(2, '0') : '--'}
                </span>
              </div>
              <span
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] mt-2 font-sans font-medium"
                style={{ color: accentColor }}
              >
                {unitLabel}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
