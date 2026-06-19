"use client";

import { motion } from "framer-motion";
import { Plane, Car, MapPin, Building } from "lucide-react";

const accommodations = [
  {
    name: "Luxury Hotel Lagos",
    distance: "10 mins from venue",
    description: "A premium 5-star experience with group rates available for wedding guests.",
    link: "#"
  },
  {
    name: "Boutique Suites",
    distance: "15 mins from venue",
    description: "Cozy and affordable, located right in the heart of the city.",
    link: "#"
  }
];

export default function Travel() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Venue & Travel</h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Everything you need to know about getting here and where to stay.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Location Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[400px] bg-foreground/5 rounded-3xl flex items-center justify-center border border-foreground/10 overflow-hidden relative"
          >
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="font-serif text-2xl text-foreground">Lagos, Nigeria</p>
              <p className="text-foreground/60">(Google Maps Embed Goes Here)</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Travel Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif text-foreground border-b border-foreground/10 pb-4">Getting Here</h2>
              
              <div className="flex gap-4">
                <Plane className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-2">By Air</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Murtala Muhammed International Airport (LOS) is the closest airport. It is about a 45-minute drive to the main event venues depending on traffic.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Car className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Transportation</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    We recommend using Uber or Bolt for getting around the city. Parking will be available at all event venues for those driving.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Accommodation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-serif text-foreground border-b border-foreground/10 pb-4">Where to Stay</h2>
              
              <div className="space-y-6">
                {accommodations.map((hotel, index) => (
                  <div key={index} className="flex gap-4">
                    <Building className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-medium mb-1">{hotel.name}</h3>
                      <p className="text-primary text-sm font-medium mb-2">{hotel.distance}</p>
                      <p className="text-foreground/80 leading-relaxed mb-3">
                        {hotel.description}
                      </p>
                      <a href={hotel.link} className="text-primary underline hover:text-primary/80 transition-colors">
                        Book with Group Rate
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
