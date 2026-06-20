"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  const links = [
    { name: "Our Story", href: "/story" },
    { name: "Schedule", href: "/schedule" },
    { name: "Wedding Party", href: "/party" },
    { name: "Travel", href: "/travel" },
    { name: "Dress Code", href: "/dress-code" },
    { name: "Registry", href: "/registry" },
    { name: "Gallery", href: "/gallery" },
    { name: "VIP", href: "/vip", isSpecial: true },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background border-b border-primary/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-baseline gap-0.5" onClick={closeMenu}>
              <span className="font-serif text-2xl font-bold tracking-wider text-foreground">EDEN</span>
              <span className="font-serif text-2xl font-bold tracking-wider text-primary">27</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors ${
                  link.isSpecial 
                    ? "text-primary font-semibold hover:text-primary/80" 
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop RSVP & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link 
                href="/register" 
                className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-colors tracking-wide"
              >
                RSVP
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-foreground focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background absolute top-16 left-0 w-full overflow-y-auto border-t border-primary/10"
          >
            <div className="px-4 pt-6 pb-24 space-y-4 flex flex-col items-center">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block px-3 py-2 text-xl font-serif text-center transition-colors ${
                    pathname === link.href ? "text-primary" : "text-foreground"
                  } ${link.isSpecial ? "font-bold text-primary" : ""}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 w-full max-w-[200px]">
                <Link 
                  href="/register" 
                  onClick={closeMenu}
                  className="block w-full text-center bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 transition-colors tracking-wide text-lg"
                >
                  RSVP NOW
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
