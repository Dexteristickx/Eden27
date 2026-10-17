"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import { MapPin, CalendarDays, Shirt } from "lucide-react";
import AddToCalendar from "@/components/AddToCalendar";

const eventTimeMap: Record<string, { startISO: string; endISO: string; description: string }> = {
  traditional: {
    startISO: "2026-12-30T10:00:00+01:00",
    endISO: "2026-12-30T15:00:00+01:00",
    description: "Traditional engagement ceremony. Aso-Ebi attire. #Eden27",
  },
  church: {
    startISO: "2026-12-31T10:00:00+01:00",
    endISO: "2026-12-31T13:00:00+01:00",
    description: "Holy Matrimony church ceremony. Formal suits and gowns. #Eden27",
  },
  reception: {
    startISO: "2026-12-31T14:00:00+01:00",
    endISO: "2026-12-31T22:00:00+01:00",
    description: "Wedding reception dinner and dancing celebration. #Eden27",
  },
};

export default function Schedule() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Event Schedule</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We have a full weekend of celebrations planned. Here are the details for each event.
          </p>
        </motion.div>

        <div className="grid gap-12">
          {siteConfig.events.map((event, index) => {
            const timeConfig = eventTimeMap[event.id] || {
              startISO: `${event.date}T10:00:00+01:00`,
              endISO: `${event.date}T16:00:00+01:00`,
              description: `Wedding celebration for ${siteConfig.coupleNames}. #Eden27`,
            };

            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
              >
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                
                <h2 className="text-3xl font-serif text-foreground mb-6">{event.name}</h2>
                
                <div className="grid md:grid-cols-2 gap-8 text-foreground/80">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <CalendarDays className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{event.date}</p>
                        <p className="text-sm">{event.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{event.venue}</p>
                        <p className="text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Shirt className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Dress Code</p>
                        <p className="text-sm">{event.dressCode}</p>
                      </div>
                    </div>

                    <AddToCalendar
                      event={{
                        title: `${siteConfig.coupleNames} — ${event.name}`,
                        description: timeConfig.description,
                        location: `${event.venue}, ${event.address}`,
                        startISO: timeConfig.startISO,
                        endISO: timeConfig.endISO,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
