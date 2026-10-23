"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Sparkles } from "lucide-react";

interface GalleryPhoto {
  src: string;
  caption: string;
  category: "Portraits" | "The Question" | "Black & White";
  spanClass?: string;
  aspectClass?: string;
}

const photos: GalleryPhoto[] = [
  {
    src: "/images/proposal/couple-portrait-1.webp",
    caption: "Oluwadunsin & Ololade — Engaged",
    category: "Portraits",
    spanClass: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
    aspectClass: "aspect-[3/4] h-full",
  },
  {
    src: "/images/proposal/she-said-yes-ring.webp",
    caption: "She Said Yes! Showing Off the Ring",
    category: "Portraits",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/marry-me-wide-1.webp",
    caption: "In Front of 'Will You Marry Me'",
    category: "The Question",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/proposal/couple-portrait-2.webp",
    caption: "Warm Embrace After the 'Yes'",
    category: "Portraits",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/the-ring-box.webp",
    caption: "Presenting the Ring",
    category: "The Question",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/walking-in-bw.webp",
    caption: "Hand in Hand Into the Surprise",
    category: "Black & White",
    spanClass: "sm:col-span-2",
    aspectClass: "aspect-[16/10]",
  },
  {
    src: "/images/proposal/bride-entrance.webp",
    caption: "That First Radiant Smile",
    category: "The Question",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/loving-gaze.webp",
    caption: "A Promise for a Lifetime",
    category: "The Question",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/couple-selfie.webp",
    caption: "Capturing Our First Selfie as Fiancés",
    category: "Portraits",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/roses-gift-bw.webp",
    caption: "Roses for the Bride-to-Be",
    category: "Black & White",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/proposal/smelling-roses.webp",
    caption: "Taking in the Moment",
    category: "The Question",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/proposal/marry-me-wide-2.webp",
    caption: "Pure Joy Together",
    category: "The Question",
    aspectClass: "aspect-[4/3]",
  },
  {
    src: "/images/proposal/surprise-peek-bw.webp",
    caption: "The First Peek at the Surprise",
    category: "Black & White",
    aspectClass: "aspect-[3/4]",
  },
  {
    src: "/images/proposal/proposal-details.webp",
    caption: "'Will You Marry Me?' Cake & Red Roses",
    category: "The Question",
    aspectClass: "aspect-[3/4]",
  },
];

const categories = ["All", "Portraits", "The Question", "Black & White"] as const;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);
  const showNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs uppercase tracking-[0.25em] font-sans mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Curated Proposal Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-4">
            The Proposal Moments
          </h1>
          <p className="text-lg text-foreground/75 max-w-2xl mx-auto mb-8">
            Intimate portraits from the day Ololade said &ldquo;Yes!&rdquo; to forever with Oluwadunsin.
          </p>

          {/* Featured Video Pill Button */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center gap-3 bg-primary text-white px-7 py-3.5 rounded-full font-medium shadow-lg hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Watch The Proposal Film (1:19)</span>
          </button>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedIndex(null);
                setActiveCategory(cat);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-md"
                  : "bg-white/60 text-foreground/75 hover:bg-white border border-foreground/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Curated Editorial Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, index) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setSelectedIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className={`relative w-full ${
                photo.aspectClass || "aspect-[3/4]"
              } break-inside-avoid rounded-3xl overflow-hidden shadow-lg border border-primary/15 group cursor-pointer block text-left focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-sans font-semibold mb-1">
                  {photo.category}
                </span>
                <div className="flex items-center justify-between text-white gap-2">
                  <span className="font-serif text-lg tracking-wide">
                    {photo.caption}
                  </span>
                  <ZoomIn className="w-5 h-5 text-white/80 shrink-0" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filteredPhotos[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Photo Lightbox"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={filteredPhotos[selectedIndex].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[75vh] md:h-[82vh] flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={filteredPhotos[selectedIndex].src}
                  alt={filteredPhotos[selectedIndex].caption}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 font-serif text-xl text-white/90 tracking-wide text-center">
                {filteredPhotos[selectedIndex].caption}{" "}
                <span className="text-sm font-sans text-white/50 ml-2">
                  ({selectedIndex + 1} / {filteredPhotos.length})
                </span>
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proposal Video Modal */}
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
