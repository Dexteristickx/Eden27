"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partyMembers = [
  { name: "Best Man Name", role: "Best Man", image: "/images/hero.png" },
  { name: "Maid of Honor Name", role: "Maid of Honor", image: "/images/hero.png" },
  { name: "Groomsman 1", role: "Groomsman", image: "/images/hero.png" },
  { name: "Bridesmaid 1", role: "Bridesmaid", image: "/images/hero.png" },
];

export default function WeddingParty() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Wedding Party</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Meet the wonderful people standing by our side on our special day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partyMembers.map((member, index) => (
            <motion.div
              key={member.name + index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-serif text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
