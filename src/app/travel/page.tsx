"use client";

import { motion } from "framer-motion";
import { Plane, Car, TrainFront, MapPin, Building, ExternalLink, Navigation } from "lucide-react";

const accommodations = [
  {
    name: "Agodi GRA & Jericho Axis Hotels",
    distance: "10–15 mins from main venues",
    description:
      "Serene, upscale boutique and 4-star hotels nestled in Ibadan's premier Agodi GRA and Jericho neighborhoods.",
    area: "Agodi GRA / Jericho, Ibadan",
    mapQuery: "Hotels+in+Agodi+GRA+Jericho+Ibadan",
  },
  {
    name: "Bodija & Ikolaba Executive Suites",
    distance: "10–15 mins from main venues",
    description:
      "Conveniently located near major arterial roads, restaurants, and lounges with easy access to the church and reception venues.",
    area: "Old & New Bodija / Ikolaba, Ibadan",
    mapQuery: "Hotels+in+Bodija+Ibadan",
  },
  {
    name: "Ring Road & Challenge Hospitality Hub",
    distance: "15–20 mins from main venues",
    description:
      "Ideal for guests arriving directly via the Lagos–Ibadan Expressway, offering modern rooms and quick highway access.",
    area: "Ring Road, Ibadan",
    mapQuery: "Hotels+in+Ring+Road+Ibadan",
  },
];

export default function Travel() {
  return (
    <div className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">
            Venue & Travel — Ibadan
          </h1>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We are delighted to host our wedding celebrations in the historic city of{" "}
            <strong className="text-foreground">Ibadan, Oyo State</strong>. Here is everything you need to plan a smooth trip.
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Interactive Google Map of Ibadan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-4 md:p-6 shadow-xl border border-primary/15 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground">
                    Ibadan, Oyo State, Nigeria
                  </h2>
                  <p className="text-sm text-foreground/65">
                    December 30–31, 2026 · Traditional, Church & Reception Venues
                  </p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/place/Ibadan,+Oyo,+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm self-start sm:self-auto"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>

            <div className="w-full h-[380px] md:h-[440px] rounded-2xl overflow-hidden border border-foreground/10">
              <iframe
                title="Ibadan, Oyo State Wedding Location Map"
                src="https://www.google.com/maps?q=Ibadan,+Oyo+State,+Nigeria&z=12&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
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
              <h2 className="text-3xl font-serif text-foreground border-b border-foreground/10 pb-4">
                Getting to Ibadan
              </h2>

              <div className="flex gap-4">
                <TrainFront className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    By Train (Lagos–Ibadan NRC Railway)
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    For guests traveling from Lagos, the air-conditioned{" "}
                    <strong>Lagos–Ibadan Standard Gauge Train</strong> departs from{" "}
                    <em>Mobolaji Johnson Station (Ebute Metta, Lagos)</em> and arrives at{" "}
                    <em>Obafemi Awolowo Station (Moniya, Ibadan)</em> in approximately 2 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Plane className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">By Air</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Domestic flights operate into{" "}
                    <strong>Samuel Ladoke Akintola Airport (IBA), Ibadan</strong>. International and additional domestic guests can also fly into{" "}
                    <strong>Murtala Muhammed Airport (LOS), Lagos</strong> and connect to Ibadan by train or road.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Car className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    By Road & Getting Around Ibadan
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Ibadan is a smooth 90–120 minute drive from Lagos via the reconstructed{" "}
                    <strong>Lagos–Ibadan Expressway</strong>. Within Ibadan,{" "}
                    <strong>Uber and Bolt</strong> are widely available, and secure parking is reserved at all wedding venues.
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
              <h2 className="text-3xl font-serif text-foreground border-b border-foreground/10 pb-4">
                Where to Stay in Ibadan
              </h2>

              <div className="space-y-6">
                {accommodations.map((hotel, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-2xl p-5 border border-foreground/10 flex gap-4"
                  >
                    <Building className="w-7 h-7 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-foreground mb-1">
                        {hotel.name}
                      </h3>
                      <p className="text-primary text-xs uppercase tracking-wider font-sans font-semibold mb-2">
                        {hotel.area} · {hotel.distance}
                      </p>
                      <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                        {hotel.description}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/${hotel.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        <span>Explore Hotels in This Area</span>
                        <ExternalLink className="w-3.5 h-3.5" />
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
