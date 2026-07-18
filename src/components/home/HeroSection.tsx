"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroBanner } from "@/lib/content/types";
import { getImageUrl } from "@/lib/content/image";
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroBanner } from "@/lib/content/types";
import { getImageUrl } from "@/lib/content/image";
import { JEWELRY_IMAGES, SHOP } from "@/lib/constants";

interface HeroSectionProps {
  banners: HeroBanner[];
}

export function HeroSection({ banners }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const slides =
    banners.length > 0
      ? banners
      : [
          {
            _id: "default",
            title: "Traditional Tamil Gold Jewelry",
            subtitle: SHOP.tagline,
            buttonText: "Explore",
            buttonLink: "/collections",
          },
        ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 40;
      const y = (e.clientY - innerHeight / 2) / 40;
      setMouseOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const slide = slides[current];
  const bgImage = slide.image
    ? getImageUrl(slide.image, 1920, 1080)
    : JEWELRY_IMAGES.hero[current % JEWELRY_IMAGES.hero.length];
  const spotlightFrames = [
    {
      src: bgImage,
      title: slide.title || "Timeless Tamil Elegance",
      subtitle: slide.subtitle || SHOP.tagline,
      className: "lg:col-span-2 lg:row-span-2",
      objectPosition: "center 18%",
    },
    {
      src: bgImage,
      title: "Temple Detail",
      subtitle: "Close framing on bridal gold layers",
      className: "lg:col-span-1",
      objectPosition: "center 36%",
    },
    {
      src: bgImage,
      title: "Bridal Heritage",
      subtitle: "Silk, gold and ceremony in one portrait",
      className: "lg:col-span-1",
      objectPosition: "center 8%",
    },
    {
      src: bgImage,
      title: "Jewelry Focus",
      subtitle: "Necklace, nethi chutti and bridal finish",
      className: "lg:col-span-1 lg:col-start-3",
      objectPosition: "center 54%",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="section-ribbon relative min-h-[92vh] w-full overflow-hidden bg-[#f7efe4]">
      <motion.div 
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(212,175,55,0.22),transparent_24%),radial-gradient(circle_at_90%_12%,rgba(106,35,50,0.12),transparent_20%),linear-gradient(90deg,rgba(247,239,228,0.98)_0%,rgba(247,239,228,0.84)_35%,rgba(22,12,9,0.18)_74%,rgba(24,12,8,0.08)_100%)] bg-[length:120%_120%]" 
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[
          { top: "15%", left: "10%", delay: 0 },
          { top: "30%", left: "48%", delay: 1.5 },
          { top: "65%", left: "18%", delay: 0.8 },
          { top: "42%", left: "82%", delay: 2.2 },
          { top: "78%", left: "52%", delay: 1.1 },
        ].map((pt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.1, y: 10, scale: 0.8 }}
            animate={{
              opacity: [0.12, 0.38, 0.12],
              y: [12, -12, 12],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pt.delay,
            }}
            className="absolute text-gold/30"
            style={{ top: pt.top, left: pt.left }}
          >
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto grid min-h-[92vh] w-full max-w-[1600px] gap-8 px-5 pt-20 pb-14 sm:px-8 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-10 lg:px-16 lg:pt-24 lg:pb-20">
        <div className="relative z-10 flex items-center lg:min-h-[80vh]">
          <motion.div
            key={`content-${current}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl rounded-[2.25rem] border border-gold/12 bg-[rgba(255,248,239,0.58)] p-6 shadow-[0_24px_80px_rgba(87,58,24,0.08)] backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4 rounded-full border border-gold/18 bg-white/65 px-4 py-3 backdrop-blur">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/25 bg-[#0c2817]">
                <Image
                  src="/images/indiran-logo.svg"
                  alt={SHOP.name}
                  fill
                  sizes="48px"
                  className="object-contain object-center p-1"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.45em] text-gold/80">Official Brand Seal</p>
                <p className="mt-1 truncate font-serif text-sm text-[#2b1c15]">Indiran Jewellers</p>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-xs uppercase tracking-[0.5em] text-gold/85 sm:text-sm">
              Chavakachcheri, Jaffna
            </motion.p>

            <motion.div variants={itemVariants} className="mt-5 flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
              <span className="h-px w-14 bg-gold/80" />
              <span>{SHOP.name}</span>
              <span className="font-tamil text-maroon">{SHOP.nameTamil}</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants} 
              className="heading-xl mt-7 max-w-xl text-balance text-[#2b1c15] drop-shadow-[0_18px_28px_rgba(255,255,255,0.55)]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {slide.title || "Timeless Tamil Elegance"}
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-6 max-w-xl text-base leading-8 text-[#5b4638] md:text-lg">
              {slide.subtitle || SHOP.tagline}
            </motion.p>

            <motion.p variants={itemVariants} className="mt-6 max-w-lg text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
              Bridal thali, temple necklaces, jimikki, and heirloom gold composed for
              Tamil weddings, family milestones, and a showroom experience that feels cinematic.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col gap-3 sm:flex-row">
              {slide.buttonText && slide.buttonLink && (
                <Link href={slide.buttonLink} className="btn-gold inline-flex w-full sm:w-auto">
                  {slide.buttonText}
                </Link>
              )}
              <Link href="/contact" className="btn-outline-gold inline-flex w-full sm:w-auto">
                Contact Store
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.35em] text-[#7c6251]">
              <span className="rounded-full border border-gold/18 bg-white/55 px-4 py-2 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:bg-white/80">
                Temple Jewelry
              </span>
              <span className="rounded-full border border-gold/18 bg-white/55 px-4 py-2 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:bg-white/80">
                Bridal Gold
              </span>
              <span className="rounded-full border border-gold/18 bg-white/55 px-4 py-2 backdrop-blur transition-all duration-300 hover:border-gold/40 hover:bg-white/80">
                Jaffna Heritage
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Curated for first-glance impact",
                "Cropped for close detail",
                "Built for bridal storytelling",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-2xl border border-gold/12 bg-white/58 px-4 py-4 text-sm leading-6 text-[#4d392e] shadow-[0_12px_30px_rgba(75,49,18,0.05)] transition-all duration-500 hover:scale-[1.02] hover:border-gold/20"
                >
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="relative min-h-[56vh] lg:min-h-[80vh]">
          <div className="grid h-full gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
            {spotlightFrames.map((frame, index) => (
              <motion.div
                key={`${frame.title}-${current}-${index}`}
                initial={{ opacity: 0, scale: 1.05, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
                className={`luxury-card relative overflow-hidden ${frame.className}`}
                style={{
                  x: mouseOffset.x * (index === 0 ? 0.3 : 0.6),
                  y: mouseOffset.y * (index === 0 ? 0.3 : 0.6),
                }}
              >
                <div className="relative h-full min-h-[14rem] overflow-hidden bg-[#140f0b] lg:min-h-0 luxury-image-zoom">
                  <Image
                    src={frame.src}
                    alt={frame.title}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    style={{ objectPosition: frame.objectPosition }}
                    sizes={index === 0 ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 100vw, 28vw"}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,12,8,0.02),rgba(20,12,8,0.36))]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="rounded-[1.25rem] border border-white/12 bg-black/22 px-4 py-3 text-white backdrop-blur-md transition-all duration-500 hover:bg-black/35">
                    <p className="text-[10px] uppercase tracking-[0.45em] text-[#f7d98a]">
                      {index === 0 ? "Hero Focus" : "Detail Crop"}
                    </p>
                    <p className="mt-2 font-serif text-lg text-white sm:text-xl">
                      {frame.title}
                    </p>
                    <p className="mt-1 max-w-xs text-sm leading-6 text-white/82">
                      {frame.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            aria-hidden="true"
            animate={{ 
              y: [0, -8, 0],
              x: mouseOffset.x * 0.2,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-8 top-8 hidden rounded-[1.5rem] border border-gold/18 bg-white/68 p-4 backdrop-blur-xl lg:block transition-all duration-300 hover:scale-105"
            style={{ maxWidth: 260 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Bridal Spotlight</p>
            <p className="mt-2 max-w-[180px] text-sm leading-6 text-[#3d2a21]">
              Temple layers, rich chains, and close-up detail for the first client glance.
            </p>
          </motion.div>

          <motion.div
            aria-hidden="true"
            animate={{ 
              y: [0, 10, 0],
              x: mouseOffset.x * 0.25,
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 hidden rounded-[1.5rem] border border-gold/18 bg-white/72 p-4 backdrop-blur-xl lg:block transition-all duration-300 hover:scale-105"
            style={{ maxWidth: 280 }}
          >
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold/80">Tamil Wedding Mood</p>
            <p className="mt-2 max-w-[220px] text-sm leading-6 text-[#3d2a21]">
              Cinematic gold tones, silk-rich accents, and a premium showroom feel.
            </p>
          </motion.div>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold/35 bg-white/70 p-2 text-gold transition-colors hover:border-gold hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % slides.length)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-gold/35 bg-white/70 p-2 text-gold transition-colors hover:border-gold hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-8 bg-gold" : "w-4 bg-gold/35"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
