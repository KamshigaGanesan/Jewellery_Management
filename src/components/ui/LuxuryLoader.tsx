"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function LuxuryLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only show loader once per browser session
    const hasLoaded = sessionStorage.getItem("loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("loaded", "true");
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#120d0a]"
        >
          <div className="relative flex flex-col items-center">
            {/* Soft gold radial glow in the center */}
            <div className="absolute h-64 w-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-20 w-20 overflow-hidden rounded-full border border-gold/20 p-2 bg-[#0c2817]"
            >
              <Image
                src="/images/indiran-logo.svg"
                alt="Indiran logo"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 font-serif text-xl tracking-[0.25em] text-gold"
            >
              INDIRAN
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-2 text-[10px] uppercase tracking-[0.45em] text-gold"
            >
              JEWELLERS
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
