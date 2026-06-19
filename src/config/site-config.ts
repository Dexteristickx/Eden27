export type Theme = 'classic' | 'modern' | 'floral';

export const siteConfig = {
  // These will be overridden by Supabase event_settings, but we provide defaults
  coupleNames: "Oluwadunsin & Ololade",
  weddingDate: "December 31, 2026",
  weddingLocation: "Lagos, Nigeria",
  theme: "classic" as Theme,
  
  // Events
  events: [
    {
      id: "traditional",
      name: "Traditional Wedding",
      date: "2026-12-30",
      time: "1:00 PM",
      venue: "Placeholder Traditional Venue",
      address: "123 Traditional St, Lagos",
      dressCode: "Aso-Ebi (Emerald Green & Gold)"
    },
    {
      id: "church",
      name: "Church Wedding",
      date: "2026-12-31",
      time: "10:00 AM",
      venue: "Placeholder Church",
      address: "456 Holy Way, Lagos",
      dressCode: "Formal / Suits & Gowns"
    },
    {
      id: "reception",
      name: "Reception",
      date: "2026-12-31",
      time: "2:00 PM",
      venue: "Placeholder Event Centre",
      address: "789 Party Blvd, Lagos",
      dressCode: "Formal / Reception Wear"
    }
  ],

  // Links
  registryLink: "https://example.com/registry",
};
