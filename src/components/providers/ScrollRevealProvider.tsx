"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.03,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const setupObserver = () => {
      // Find all sections and custom reveal elements
      const sections = document.querySelectorAll("section, .reveal-init");
      
      sections.forEach((section) => {
        if (!section.classList.contains("reveal-init")) {
          section.classList.add("reveal-init");
        }
        observer.observe(section);

        // Find child elements inside section to stagger
        const staggerElements = section.querySelectorAll(
          "h1, h2, h3, p:not(.no-reveal), .btn-gold, .btn-outline-gold, .luxury-card"
        );

        staggerElements.forEach((el, index) => {
          if (el instanceof HTMLElement) {
            // Apply delay: 80ms per child index
            el.style.transitionDelay = `${(index + 1) * 80}ms`;
            if (!el.classList.contains("reveal-init")) {
              el.classList.add("reveal-init");
            }
            observer.observe(el);
          }
        });
      });
    };

    // Stagger slightly after mount / route transition to ensure hydration completes
    const timer = setTimeout(setupObserver, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
