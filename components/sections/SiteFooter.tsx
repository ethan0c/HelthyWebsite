"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const footerLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/helthyapp",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@helthyapp",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.47V13a8.28 8.28 0 005.58 2.16V11.7a4.83 4.83 0 01-3.77-1.85V6.69h3.77z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/helthyapp",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth fade and lift for footer elements
      gsap.from("[data-footer-animate]", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Big text reveal with scale
      gsap.from("[data-footer-big-text]", {
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-footer-big-text]",
          start: "top 90%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're in!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong.");
    }
  };

  return (
    <footer ref={footerRef} className="bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-helthy-lemon/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Main content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 lg:pt-20 pb-12">
        {/* Newsletter - minimal */}
        <div data-footer-animate className="max-w-md mx-auto mb-12 lg:mb-16">
          <p className="text-center text-white/50 text-sm mb-4">Stay up to date</p>
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="email"
              placeholder="Enter your email for updates"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 pr-32 rounded-full bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder-white/30 outline-none focus:border-helthy-lemon/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-white text-[#0B0B0B] text-sm font-medium hover:bg-helthy-lemon transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`text-sm mt-3 text-center ${status === "success" ? "text-helthy-lemon" : "text-red-400"}`}>
              {message}
            </p>
          )}
        </div>

        {/* Links row */}
        <div data-footer-animate className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social + Copyright row */}
        <div data-footer-animate className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-white/[0.06]">
          {/* Socials */}
          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-helthy-lemon transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Helthy Inc.
          </p>
        </div>
      </div>

      {/* Giant logo - trademark style */}
      <div className="relative overflow-hidden border-t border-white/[0.04]">
        <div 
          data-footer-big-text
          className="py-8 lg:py-12 px-6 lg:px-8"
        >
          <img
            src="/images/logos/helthy-green-long.png"
            alt="Helthy"
            className="w-full max-w-4xl mx-auto h-auto"
          />
        </div>
      </div>

      {/* Legal disclaimer - very subtle */}
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <p className="text-[10px] text-white/20 leading-relaxed text-center max-w-4xl mx-auto">
            Helthy is for informational purposes only and is not medical advice. Consult a healthcare provider before starting any diet or exercise program. 
            Nutritional data may vary. App Store® is a trademark of Apple Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
