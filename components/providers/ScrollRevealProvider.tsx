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

    // Observe all elements with scroll-reveal class present at mount
    const observeAll = () => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach((el) => observer.observe(el));
    };
    observeAll();

    // Also observe elements added later (route transitions/dynamic UI)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        // Newly added nodes may be elements or contain them
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.classList.contains('scroll-reveal')) {
            observer.observe(node);
          }
          node.querySelectorAll?.('.scroll-reveal').forEach((el) => observer.observe(el));
        });
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}
