"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import Image from "next/image";

const timelineEvents = [
  {
    year: "2018",
    title: "How We Met",
    description: "We crossed paths at a mutual friend's birthday party in Lagos. What started as a simple conversation quickly turned into hours of talking about everything under the sun."
  },
  {
    year: "2020",
    title: "The First Date",
    description: "After months of texting and calling, we finally went on our first official date. We went to a quiet restaurant by the water, and we both knew this was something special."
  },
  {
    year: "2023",
    title: "The Proposal",
    description: "During a vacation with close friends, surrounded by candles and soft music, the big question was popped. It was a resounding 'YES'!"
  },
  {
    year: "2026",
    title: "The Wedding",
    description: "Now we are so excited to celebrate our love with all our family and friends as we tie the knot and start our forever."
  }
];

export default function OurStory() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Story</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            A glimpse into the journey that brought {siteConfig.coupleNames} together.
          </p>
        </motion.div>

        {/* Placeholder image for story */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-20 shadow-2xl"
        >
          <Image
            src="/images/hero.png"
            alt="Our journey"
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={event.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
            >
              <div className="md:w-1/4 flex-shrink-0 pt-2">
                <span className="text-3xl font-serif font-bold text-primary">{event.year}</span>
              </div>
              <div className="md:w-3/4 pb-8 md:border-l md:border-primary/20 md:pl-12 relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute w-4 h-4 rounded-full bg-primary -left-2 top-4 shadow-[0_0_0_4px_var(--color-background)]" />
                
                <h3 className="text-2xl font-serif text-foreground mb-3">{event.title}</h3>
                <p className="text-foreground/80 leading-relaxed text-lg text-balance">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
