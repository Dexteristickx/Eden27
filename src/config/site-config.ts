export type Theme = 'classic' | 'modern' | 'floral';

export const siteConfig = {
  coupleNames: "Oluwadunsin & Ololade",
  weddingDate: "December 31, 2026",
  weddingLocation: "Ibadan, Nigeria",
  receptionSeatCapacity: 300,
  theme: "classic" as Theme,

  // Events
  events: [
    {
      id: "traditional",
      name: "Traditional Wedding",
      date: "2026-12-30",
      time: "1:00 PM",
      venue: "Traditional Engagement Venue",
      address: "Ibadan, Oyo State, Nigeria",
      dressCode: "Aso-Ebi (Emerald Green & Champagne Gold)"
    },
    {
      id: "church",
      name: "Church Wedding",
      date: "2026-12-31",
      time: "10:00 AM",
      venue: "Holy Matrimony Church Venue",
      address: "Ibadan, Oyo State, Nigeria",
      dressCode: "Formal / Suits & Gowns"
    },
    {
      id: "reception",
      name: "Wedding Reception",
      date: "2026-12-31",
      time: "2:00 PM",
      venue: "Grand Reception Hall (Seated by Allocated Pass)",
      address: "Ibadan, Oyo State, Nigeria",
      dressCode: "Formal / Reception Elegance"
    }
  ],

  // Links
  registryLink: "https://example.com/registry",
};
