"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// In a real app, this might come from Supabase or be an upload page
const photos = [
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
  "/images/hero.png",
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Moments</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Some of our favorite memories together.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="relative w-full aspect-square md:aspect-auto md:h-80 rounded-2xl overflow-hidden shadow-lg group"
            >
              <Image
                src={photo}
                alt="Gallery photo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
