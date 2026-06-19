import Link from "next/link";
import { siteConfig } from "@/config/site-config";

export function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-background border-b border-primary/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              {siteConfig.coupleNames}
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/story" className="text-foreground/80 hover:text-primary transition-colors">Our Story</Link>
            <Link href="/schedule" className="text-foreground/80 hover:text-primary transition-colors">Schedule</Link>
            <Link href="/party" className="text-foreground/80 hover:text-primary transition-colors">Wedding Party</Link>
            <Link href="/travel" className="text-foreground/80 hover:text-primary transition-colors">Travel</Link>
            <Link href="/dress-code" className="text-foreground/80 hover:text-primary transition-colors">Dress Code</Link>
            <Link href="/registry" className="text-foreground/80 hover:text-primary transition-colors">Registry</Link>
            <Link href="/gallery" className="text-foreground/80 hover:text-primary transition-colors">Gallery</Link>
            <Link href="/vip" className="text-primary font-semibold hover:text-primary/80 transition-colors">VIP</Link>
            <Link href="/faq" className="text-foreground/80 hover:text-primary transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center">
            <Link 
              href="/register" 
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              RSVP
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
