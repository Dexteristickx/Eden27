"use client";

import { motion } from "framer-motion";
import { Scissors, Palette, ShoppingBag, PhoneCall } from "lucide-react";

export default function DressCode() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Dress Code & Aso-Ebi</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We can't wait to see you looking your best! Here are the details for our wedding attire.
          </p>
        </motion.div>

        <div className="grid gap-12">
          {/* Aso-Ebi Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10" />
            
            <h2 className="text-3xl font-serif text-foreground mb-8 flex items-center gap-3">
              <Scissors className="w-8 h-8 text-primary" />
              Traditional Wedding (Aso-Ebi)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary" />
                    Colors
                  </h3>
                  <p className="text-foreground/80">Emerald Green and Gold. The gele (headtie) color is Champagne Gold.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Fabric Options
                  </h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    <li>Premium Lace (₦50,000)</li>
                    <li>Ankara + Gele Package (₦35,000)</li>
                    <li>Men's Atiku/Agbada Fabric (₦40,000)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-background/80 p-6 rounded-2xl border border-foreground/10">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-primary" />
                  Purchase & Contact
                </h3>
                <p className="text-foreground/80 mb-4">
                  To purchase your Aso-Ebi package, please make payment to the account below and send your receipt via WhatsApp to our coordinator.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Bank:</strong> Guaranty Trust Bank (GTB)</p>
                  <p><strong>Account Name:</strong> Wedding Planner Inc.</p>
                  <p><strong>Account Number:</strong> 0123456789</p>
                  <p className="pt-2"><strong>WhatsApp:</strong> +234 800 000 0000</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* White Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 shadow-xl relative overflow-hidden"
          >
            <h2 className="text-3xl font-serif text-foreground mb-6">Church & Reception</h2>
            <div className="space-y-4 text-foreground/80">
              <p>
                <strong>Ladies:</strong> Formal evening gowns or elegant cocktail dresses. Please avoid wearing white or ivory.
              </p>
              <p>
                <strong>Gentlemen:</strong> Formal suits or tuxedos. Native attire is also completely welcome for the reception!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
