'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Users } from 'lucide-react';

interface WhatsAppFloatProps {
  coordinatorPhone: string;   // e.g. "2348012345678"
  groupInviteLink: string;    // e.g. "https://chat.whatsapp.com/XXXXX"
  coupleNames?: string;
}

export default function WhatsAppFloat({
  coordinatorPhone,
  groupInviteLink,
  coupleNames = 'Oluwadunsin & Ololade',
}: WhatsAppFloatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Delay appearance so it doesn't compete with the splash screen
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const prefillMessage = encodeURIComponent(
    `Hello! I'm a guest for ${coupleNames}'s wedding (EDEN27). I have a question:`
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {/* Expanded Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-2 mb-1"
              >
                {/* Chat with Coordinator */}
                <a
                  href={`https://wa.me/${coordinatorPhone}?text=${prefillMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-[#2c241b] 
                             px-4 py-3 rounded-xl shadow-lg hover:shadow-xl 
                             transition-shadow whitespace-nowrap text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span className="font-medium">Chat with Coordinator</span>
                </a>

                {/* Join WhatsApp Group */}
                <a
                  href={groupInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white text-[#2c241b] 
                             px-4 py-3 rounded-xl shadow-lg hover:shadow-xl 
                             transition-shadow whitespace-nowrap text-sm"
                >
                  <Users className="w-4 h-4 text-[#25D366]" />
                  <span className="font-medium">Join Wedding Group</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-14 h-14 
                       bg-[#25D366] text-white rounded-full shadow-lg 
                       hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            aria-label={isOpen ? 'Close WhatsApp menu' : 'Open WhatsApp menu'}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse ring */}
            {!isOpen && (
              <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />
            )}
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
