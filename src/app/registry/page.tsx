"use client";

import { motion } from "framer-motion";
import { Gift, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site-config";

export default function Registry() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Gift className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Gift Registry</h1>
          
          <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-foreground/5 space-y-6">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Your presence at our wedding is the greatest gift of all. However, should you wish to help us celebrate with a gift, we have registered at the following store.
            </p>
            
            <a 
              href={siteConfig.registryLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 shadow-xl"
            >
              View Our Registry <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
