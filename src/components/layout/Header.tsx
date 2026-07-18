"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import type { GoldRateSummary } from "@/lib/commerce";

const collectionLinks = [
  { href: "/collections?q=bridal", label: "Bridal Sets", caption: "Layered wedding gold", initials: "BR" },
  { href: "/collections?q=thali", label: "Thali", caption: "Traditional thali chains", initials: "TH" },
  { href: "/collections?q=haram", label: "Haram", caption: "Statement neck pieces", initials: "HA" },
  { href: "/collections?q=jimikki", label: "Jimikki", caption: "Classic Tamil earrings", initials: "JI" },
  { href: "/collections?q=bangles", label: "Bangles", caption: "Daily and bridal styles", initials: "BA" },
  { href: "/collections?q=rings", label: "Rings", caption: "Gold rings and bands", initials: "RI" },
];

const featuredCollectionLinks = [
  { href: "/collections", label: "All Collections" },
  { href: "/collections?q=temple", label: "Temple Jewellery" },
  { href: "/collections?q=daily", label: "Daily Wear" },
  { href: "/collections?q=custom", label: "Custom Designs" },
];

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/gold-price", label: "Gold Rate" },
  { href: "/contact", label: "Contact" },
];

function formatRate(value: number | null | undefined) {
  if (typeof value !== "number") return "--";
  return `Rs. ${value.toLocaleString("en-LK")}`;
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [rates, setRates] = useState<GoldRateSummary | null>(null);
  const collectionsCloseTimer = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const controller = new AbortController();

    async function loadRates() {
      try {
        const response = await fetch("/api/gold-rates", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) return;
        const data = (await response.json()) as { rates?: GoldRateSummary };
        setRates(data.rates ?? null);
      } catch {
        if (!controller.signal.aborted) setRates(null);
      }
    }

    loadRates();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      controller.abort();
      if (collectionsCloseTimer.current) window.clearTimeout(collectionsCloseTimer.current);
    };
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const openCollections = () => {
    if (collectionsCloseTimer.current) window.clearTimeout(collectionsCloseTimer.current);
    setCollectionsOpen(true);
  };

  const closeCollections = () => {
    if (collectionsCloseTimer.current) window.clearTimeout(collectionsCloseTimer.current);
    collectionsCloseTimer.current = window.setTimeout(() => setCollectionsOpen(false), 120);
  };

  return (
    <header className={`site-header fixed top-0 z-50 w-full border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "bg-[rgba(255,247,236,0.85)] border-gold/15 shadow-[0_12px_40px_rgba(84,56,22,0.06)] backdrop-blur-3xl" : "border-[var(--color-border)] bg-[rgba(255,247,236,0.92)] backdrop-blur-2xl"}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 md:px-8">
        <Logo variant="header" showText={true} />

        <nav className="hidden items-center justify-center gap-7 xl:flex">
          <Link
            href="/"
            className={`group relative py-2 text-[14px] font-medium tracking-wide transition-colors ${isActiveLink("/") ? "text-gold" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
          >
            Home
            <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActiveLink("/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
          </Link>

          <div
            className="group relative"
            onMouseEnter={openCollections}
            onMouseLeave={closeCollections}
            onFocus={openCollections}
          >
            <button
              type="button"
              onClick={() => setCollectionsOpen((prev) => !prev)}
              className={`group inline-flex items-center gap-1 py-2 text-[14px] font-medium tracking-wide transition-colors ${pathname.startsWith("/collections") ? "text-gold" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
            >
              Collections
              <ChevronDown className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${collectionsOpen ? "rotate-180" : ""}`} />
              <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${pathname.startsWith("/collections") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </button>

            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-x-6 top-[74px] z-50 pt-3"
                  onMouseEnter={openCollections}
                  onMouseLeave={closeCollections}
                >
                  <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[1.4rem] border border-gold/14 bg-[#fffaf2] shadow-[0_28px_70px_rgba(48,29,18,0.18)] lg:grid-cols-[1fr_0.72fr_0.86fr]">
                    <div className="p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold/80">
                        Our Jewellery
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
                        {collectionLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group/item flex min-h-[64px] items-center gap-3 rounded-xl p-2.5 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-gold/8"
                            onClick={() => setCollectionsOpen(false)}
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/18 bg-white font-serif text-[12px] text-gold shadow-[0_8px_22px_rgba(122,84,40,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/item:scale-105 group-hover/item:border-gold/30">
                              {item.initials}
                            </span>
                            <span className="min-w-0">
                              <span className="block font-serif text-[17px] leading-tight text-[#2b1c15] transition-colors duration-300 group-hover/item:text-gold">
                                {item.label}
                              </span>
                              <span className="mt-0.5 block text-[11px] leading-4 text-[var(--color-text-muted)]">
                                {item.caption}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="border-x border-gold/10 bg-white/58 p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-gold/80">
                        Quick Browse
                      </p>
                      <div className="mt-6 grid gap-3">
                        {featuredCollectionLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center justify-between rounded-xl border border-gold/12 bg-white/72 px-4 py-3 text-sm font-medium text-[#2b1c15] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-gold/28 hover:text-gold hover:shadow-[0_8px_20px_rgba(122,84,40,0.04)]"
                            onClick={() => setCollectionsOpen(false)}
                          >
                            {item.label}
                            <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">+</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/collections"
                        className="mt-6 inline-flex text-sm font-semibold text-gold transition-colors duration-300 hover:text-gold-dark"
                        onClick={() => setCollectionsOpen(false)}
                      >
                        View all jewellery
                      </Link>
                    </div>

                    <Link
                      href="/collections?q=bridal"
                      className="relative min-h-[330px] overflow-hidden bg-[#1b100c]"
                      onClick={() => setCollectionsOpen(false)}
                    >
                      <Image
                        src="/images/menu/luthufunnissa.jpeg"
                        alt="Tamil bridal jewellery collection"
                        fill
                        className="object-cover object-[center_20%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
                        sizes="360px"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,13,8,0.05),rgba(24,13,8,0.62))]" />
                      <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/16 bg-black/25 p-4 text-white backdrop-blur-md">
                        <p className="text-[10px] uppercase tracking-[0.32em] text-gold/85">
                          Bridal Edit
                        </p>
                        <p className="mt-2 font-serif text-xl leading-tight">
                          Temple detail, thali sets, and bridal layers.
                        </p>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-2 text-[14px] font-medium tracking-wide transition-colors ${active ? "text-gold" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"}`}
              >
                {link.label}
                <span className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/gold-price"
            className="hidden items-center gap-3 rounded-full border border-gold/20 bg-white/78 px-3.5 py-2 text-[12px] text-[var(--color-text)] shadow-[0_12px_28px_rgba(122,84,40,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-[1.03] hover:border-gold/35 hover:bg-white hover:shadow-[0_16px_36px_rgba(122,84,40,0.12)] xl:inline-flex"
            aria-label="View gold rate"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/12 text-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Gem className="h-4 w-4" />
            </span>
            <span className="grid leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/80">22K Today</span>
              <span className="font-serif text-[16px] text-[#2b1c15]">{formatRate(rates?.gold22k)}<span className="ml-1 font-sans text-[11px] text-[var(--color-text-muted)]">/g</span></span>
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-gold/15 bg-white/70 p-2.5 text-[var(--color-text)] shadow-[0_10px_24px_rgba(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-gold/30 hover:text-gold xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="site-header border-t border-[var(--color-border)] xl:hidden"
          >
            <nav className="px-4 py-4 md:px-8">
              <div className="grid gap-2">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium tracking-wide transition-all ${isActiveLink("/") ? "border-gold/25 bg-gold/10 text-gold" : "border-[var(--color-border)] bg-white/60 text-[var(--color-text)] hover:border-gold/25 hover:bg-white/90 hover:text-gold"}`}
                >
                  Home
                </Link>
                <button
                  type="button"
                  onClick={() => setCollectionsOpen((prev) => !prev)}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium tracking-wide transition-all ${pathname.startsWith("/collections") ? "border-gold/25 bg-gold/10 text-gold" : "border-[var(--color-border)] bg-white/60 text-[var(--color-text)] hover:border-gold/25 hover:bg-white/90 hover:text-gold"}`}
                >
                  Collections
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`} />
                </button>
                {collectionsOpen && (
                  <div className="grid gap-1 rounded-2xl border border-[var(--color-border)] bg-white/80 p-2">
                    {collectionLinks.map((item) => (
                      <Link
                        key={`mobile-${item.href}`}
                        href={item.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setCollectionsOpen(false);
                        }}
                        className="rounded-xl px-3 py-3 text-sm font-medium tracking-wide text-[var(--color-text)] transition-all hover:bg-gold/10 hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium tracking-wide transition-all ${isActiveLink(link.href) ? "border-gold/25 bg-gold/10 text-gold" : "border-[var(--color-border)] bg-white/60 text-[var(--color-text)] hover:border-gold/25 hover:bg-white/90 hover:text-gold"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/collections"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gold w-full"
                >
                  Browse Collections
                </Link>
                <Link
                  href="/gold-price"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/20 bg-white/75 px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-gold hover:text-gold"
                >
                  <Gem className="h-4 w-4 text-gold" />
                  22K {formatRate(rates?.gold22k)}/g
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
