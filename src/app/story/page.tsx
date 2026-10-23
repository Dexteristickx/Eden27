"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Sparkles, Heart } from "lucide-react";

const timelineEvents = [
  {
    year: "2018",
    tag: "Chapter I",
    title: "How We Met",
    description:
      "We crossed paths in Ibadan, where what began as an effortless conversation quickly turned into hours of laughter and talking about everything under the sun. From the very first day, there was an undeniable warmth and familiarity between us.",
    image: "/images/proposal/walking-in-bw.webp",
    caption: "Hand in hand, walking into forever",
  },
  {
    year: "2020",
    tag: "Chapter II",
    title: "The First Date & Growing Together",
    description:
      "After months of late-night calls and deep friendship, we went on our first official date. Through every season that followed, our bond deepened—anchored in faith, shared dreams, and an unwavering commitment to one another.",
    image: "/images/proposal/roses-gift-bw.webp",
    caption: "Every gesture, a quiet promise",
  },
  {
    year: "The Proposal",
    tag: "Chapter III",
    title: "The Moment She Said 'Yes!'",
    description:
      "Behind closed doors illuminated by golden 'WILL YOU MARRY ME' balloons and red roses, Oluwadunsin dropped to one knee and poured his heart out. With happy tears and a radiant smile, Ololade said a resounding 'YES!'",
    image: "/images/proposal/she-said-yes-ring.webp",
    caption: "The ring & the radiant 'Yes!'",
  },
  {
    year: "Dec 2026",
    tag: "Chapter IV",
    title: "The Road to EDEN27",
    description:
      "Now, we step joyfully into covenant and marriage. We cannot wait to celebrate our Traditional and White Wedding surrounded by the family and friends who have loved and supported us along the way.",
    image: "/images/proposal/marry-me-wide-1.webp",
    caption: "Oluwadunsin & Ololade · #EDEN27",
  },
];

export default function OurStory() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-[0.25em] font-sans mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Our Love Story
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
            {siteConfig.coupleNames}
          </h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-2xl mx-auto text-balance">
            From our very first conversation to the moment she said yes—a glimpse into the journey leading to <span className="text-primary font-semibold">EDEN27</span>.
          </p>
        </motion.div>

        {/* Editorial Portrait Trio + Proposal Film Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-28"
        >
          <div className="glass-card rounded-[2.5rem] p-6 md:p-12 shadow-2xl border border-primary/15 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Editorial Portraits */}
              <div className="lg:col-span-4 space-y-6">
                <div className="relative aspect-[4/5] w-full rounded-t-full rounded-b-3xl overflow-hidden shadow-xl border-4 border-white/80">
                  <Image
                    src="/images/proposal/couple-portrait-1.webp"
                    alt="Oluwadunsin and Ololade portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="bg-background/80 rounded-2xl p-5 border border-primary/15 text-center">
                  <p className="font-serif italic text-lg text-foreground/90">
                    “Two souls, one grace-filled journey toward forever.”
                  </p>
                </div>
              </div>

              {/* Center Column: Vertical 9:16 Proposal Film Reel */}
              <div className="lg:col-span-4 flex flex-col items-center">
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="relative w-full max-w-[340px] aspect-[9/16] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-primary/40 group cursor-pointer bg-[#1a1510]"
                >
                  <video
                    src="/videos/proposal-teaser.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs tracking-[0.2em] uppercase font-sans border border-white/20">
                        The Proposal Film
                      </span>
                      <Heart className="w-4 h-4 text-primary fill-primary" />
                    </div>

                    <div className="flex flex-col items-center text-center my-auto">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(196,139,113,0.7)] border-2 border-white/80 mb-3"
                      >
                        <Play className="w-7 h-7 fill-white ml-1" />
                      </motion.div>
                      <span className="text-white font-serif text-xl tracking-wide drop-shadow">
                        Watch Full Proposal
                      </span>
                      <span className="text-white/75 text-xs font-sans uppercase tracking-widest mt-1">
                        Tap to play with sound · 1:19
                      </span>
                    </div>

                    <div className="text-center">
                      <p className="text-white/90 font-serif italic text-sm">
                        “Will you marry me?” — The moment she said Yes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Ring & Embrace Portraits */}
              <div className="lg:col-span-4 space-y-6">
                <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white/80">
                  <Image
                    src="/images/proposal/the-ring-box.webp"
                    alt="Presenting the engagement ring"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-xl border-4 border-white/80">
                  <Image
                    src="/images/proposal/couple-portrait-2.webp"
                    alt="Oluwadunsin and Ololade close portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Story Timeline with Alternating Couple Portraits */}
        <div className="space-y-24">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center`}
              >
                <div
                  className={`md:col-span-6 ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-primary/20 group">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
                      <p className="text-white/90 font-serif italic text-sm">
                        {event.caption}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`md:col-span-6 space-y-4 ${
                    isEven ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-sans uppercase tracking-[0.25em] text-primary font-semibold px-3 py-1 rounded-full bg-primary/10">
                      {event.tag}
                    </span>
                    <span className="text-2xl font-serif text-primary/80 italic">
                      {event.year}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif text-foreground">
                    {event.title}
                  </h2>
                  <p className="text-foreground/80 leading-relaxed text-lg text-balance">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA to Gallery & RSVP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center glass-card rounded-3xl p-10 border border-primary/15"
        >
          <h3 className="text-3xl font-serif text-foreground mb-3">
            Explore All Our Proposal Moments
          </h3>
          <p className="text-foreground/75 mb-6 max-w-xl mx-auto">
            View our curated collection of portraits from the proposal or reserve your seat for December 30–31, 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/gallery"
              className="px-8 py-3.5 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
            >
              View Photo Gallery
            </Link>
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-lg"
            >
              RSVP Now
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Full Proposal Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
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
