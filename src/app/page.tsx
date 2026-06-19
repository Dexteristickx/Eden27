"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import { CalendarDays, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[95vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Full screen background image placeholder */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.png"
            alt="Hero Background"
            fill
            className="object-cover opacity-80 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
          {/* Subtle warm overlay to enhance champagne/terracotta feel */}
          <div className="absolute inset-0 bg-[#f9f6f0]/10 mix-blend-overlay" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="z-10 mt-16"
        >
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-foreground/80 mb-6 font-sans">
            You are warmly invited to
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-foreground mb-8 leading-tight tracking-tight drop-shadow-sm">
            {siteConfig.coupleNames}
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 text-lg md:text-xl font-serif italic text-foreground/80"
          >
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span>{siteConfig.weddingDate}</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/60" />
            <div className="flex items-center gap-3">
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
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(196, 139, 113, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl relative overflow-hidden group tracking-wide uppercase"
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
            We are overjoyed to invite you to celebrate the beginning of our new chapter together. 
            Surrounded by the people who mean the most to us, we will exchange our vows and dance the night away. 
            Please use this website to RSVP, find event details, and read more about our special day.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
