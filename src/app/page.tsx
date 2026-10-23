"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import { CalendarDays, MapPin, Play, X, Sparkles, ArrowRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";

const HERO_IMAGES = [
  "/images/hero-1.png",
  "/images/hero-2.png",
  "/images/hero-3.png",
  "/images/hero-4.png",
  "/images/hero-5.png",
  "/images/hero-6.png",
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Full screen background image placeholder */}
        <div className="absolute inset-0 -z-10 bg-[#2c241b]">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGES[currentImageIndex]}
                alt={`Hero Background ${currentImageIndex + 1}`}
                fill
                className="object-cover opacity-80 mix-blend-multiply"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/40 z-10" />
          {/* Subtle warm overlay to enhance champagne/terracotta feel */}
          <div className="absolute inset-0 bg-[#f9f6f0]/5 mix-blend-overlay z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 mt-16"
        >
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-[#f9f6f0]/90 mb-6 font-sans">
            You are warmly invited to
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#f9f6f0] mb-8 leading-tight tracking-tight drop-shadow-xl">
            {siteConfig.coupleNames}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 text-lg md:text-xl font-serif italic text-[#f9f6f0]"
          >
            <div className="flex items-center gap-3 drop-shadow-md">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span>{siteConfig.weddingDate}</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="flex items-center gap-3 drop-shadow-md">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{siteConfig.weddingLocation}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <Link href="/register">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(196, 139, 113, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl relative overflow-hidden group tracking-wide uppercase cursor-pointer"
              >
                <span className="relative z-10">RSVP Now</span>
                <div className="absolute inset-0 h-full w-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-4 bg-background relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-primary mb-8"
          >
            Join Us in Celebration
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/80 leading-relaxed text-lg md:text-xl font-serif text-balance"
          >
            We are overjoyed to invite you to celebrate the beginning of our new
            chapter together. Surrounded by the people who mean the most to us,
            we will exchange our vows and dance the night away. Please use this
            website to RSVP, find event details, and read more about our special
            day.
          </motion.p>
        </div>
      </section>

      {/* Editorial Proposal Showcase Section */}
      <section className="py-16 px-4 bg-background border-t border-primary/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-[2.5rem] p-6 md:p-12 shadow-xl border border-primary/15"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Copy & Two Couple Portraits */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-[0.25em] font-sans">
                  <Sparkles className="w-3.5 h-3.5" /> She Said Yes
                </div>
                <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight">
                  Relive the Moment Everything Changed
                </h2>
                <p className="text-foreground/80 text-lg leading-relaxed">
                  Before the bells ring in December, take a peek inside our
                  intimate proposal—the heartfelt words, the ring, and the
                  unforgettable &ldquo;Yes!&rdquo; that set{" "}
                  <span className="text-primary font-semibold">EDEN27</span> in
                  motion.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border-2 border-white/80">
                    <Image
                      src="/images/proposal/couple-portrait-1.webp"
                      alt="Oluwadunsin & Ololade Portrait"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border-2 border-white/80">
                    <Image
                      src="/images/proposal/she-said-yes-ring.webp"
                      alt="Showing off the engagement ring"
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full font-medium shadow-lg hover:bg-primary/90 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Watch Proposal Film</span>
                  </button>
                  <Link
                    href="/story"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-foreground/20 text-foreground hover:border-primary hover:text-primary transition-colors font-medium"
                  >
                    <span>Read Our Full Story</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Looping Vertical Proposal Cinema Reel */}
              <div className="lg:col-span-5 flex justify-center">
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="relative w-full max-w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-primary/40 group cursor-pointer bg-[#1a1510]"
                >
                  <video
                    src="/videos/proposal-teaser.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25 flex flex-col items-center justify-center p-6 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(196,139,113,0.7)] border-2 border-white/80 mb-3"
                    >
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </motion.div>
                    <span className="text-white font-serif text-xl tracking-wide drop-shadow">
                      Play With Sound
                    </span>
                    <span className="text-white/75 text-xs font-sans uppercase tracking-widest mt-1">
                      1:19 Highlight Reel
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 px-4 bg-background border-t border-primary/10">
        <div className="max-w-4xl mx-auto">
          <CountdownTimer
            targetDate="2026-12-30T13:00:00+01:00"
            label="Traditional Wedding"
            sublabel="December 30, 2026 · 1:00 PM · Ibadan"
            accentColor="#c48b71"
          />

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 py-2">
            <span className="h-px w-16 bg-foreground/15" />
            <span className="text-primary text-lg">✦</span>
            <span className="h-px w-16 bg-foreground/15" />
          </div>

          <CountdownTimer
            targetDate="2026-12-31T10:00:00+01:00"
            label="Church Wedding & Reception"
            sublabel="December 31, 2026 · 10:00 AM · Ibadan"
            accentColor="#2c241b"
          />
        </div>
      </section>

      {/* Full Proposal Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="The Proposal Film"
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[420px] max-h-[88vh] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary/40 bg-black flex items-center justify-center"
            >
              <video
                src="/videos/proposal-film.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
