"use client";

import { useEffect } from "react";

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set up Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after animation to improve performance
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
