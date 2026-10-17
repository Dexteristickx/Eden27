"use client";

import { motion } from "framer-motion";
import { Gift, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import BankTransferCard from "@/components/BankTransferCard";

export default function Registry() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Gift className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Gift Registry</h1>
          <p className="text-lg text-foreground/80 max-w-xl mx-auto">
            Your love, presence, and prayers are the greatest gifts we could ever ask for.
          </p>
        </motion.div>

        {/* External Store Registry CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-10 shadow-xl border border-foreground/5 space-y-6 mb-8"
        >
          <h3 className="font-serif text-2xl text-foreground">Wishlist Registry</h3>
          <p className="text-foreground/80 leading-relaxed text-base max-w-lg mx-auto">
            If you would like to bless us with a physical gift from our curated household wishlist, please view our registry below:
          </p>
          
          <a 
            href={siteConfig.registryLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
          >
            <span>View Our Online Registry</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Cash Gift / Bank Transfer Card */}
        <BankTransferCard
          accounts={[
            {
              label: "Naira Account",
              bankName: "Guaranty Trust Bank (GTBank)",
              accountName: "Oluwadunsin & Ololade Wedding",
              accountNumber: "0123456789",
              currency: "NGN",
              flag: "🇳🇬",
              note: 'Please include "EDEN27" in your transfer narration.',
            },
            {
              label: "USD Account (Diaspora)",
              bankName: "Chase Bank",
              accountName: "Oluwadunsin Lastname",
              accountNumber: "9876543210",
              currency: "USD",
              flag: "🇺🇸",
              note: "For international wire transfers. SWIFT code available on request via WhatsApp.",
            },
            {
              label: "GBP Account (Diaspora)",
              bankName: "Barclays Bank",
              accountName: "Ololade Lastname",
              accountNumber: "1234567890",
              currency: "GBP",
              flag: "🇬🇧",
              note: 'Sort code: 20-00-00. Please include "EDEN27" as reference.',
            },
          ]}
        />
      </div>
    </div>
  );
}
