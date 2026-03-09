"use client";

import { useState } from "react";
import Link from "next/link";

// Apple App Store icon
function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

const footerLinks = {
  product: {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Food Tracking", href: "/#features" },
      { label: "Workout Logging", href: "/#features" },
      { label: "AI Scanner", href: "/#features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  company: {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/contact" },
    ],
  },
  resources: {
    heading: "Resources",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "Blog", href: "/about" },
      { label: "Community", href: "https://www.instagram.com/helthyapp" },
    ],
  },
  legal: {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Disclosures", href: "/terms" },
    ],
  },
};

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
    <footer className="bg-helthy-lemon">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/images/logos/logo-long-white.png"
                alt="Helthy"
                className="h-6 invert"
              />
            </Link>
            <p className="text-sm text-[#0B0B0B]/60 leading-relaxed mb-6 max-w-sm">
              The all-in-one health & fitness app. Track workouts, nutrition, and progress — free forever, no subscriptions.
            </p>
            
            {/* App Store button */}
            <a
              href="https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B0B0B] text-white text-sm font-medium hover:bg-[#0B0B0B]/80 transition-colors"
            >
              <AppStoreIcon className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] opacity-60 leading-none">Download on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </a>
          </div>

          {/* Links columns */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-[#0B0B0B] font-semibold text-sm mb-4">{footerLinks.product.heading}</h4>
            <ul className="space-y-3">
              {footerLinks.product.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <h4 className="text-[#0B0B0B] font-semibold text-sm mb-4">{footerLinks.company.heading}</h4>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[#0B0B0B] font-semibold text-sm mb-4">{footerLinks.resources.heading}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[#0B0B0B] font-semibold text-sm mb-4">{footerLinks.legal.heading}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#0B0B0B]/60 hover:text-[#0B0B0B] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter section */}
        <div className="mt-12 pt-8 border-t border-[#0B0B0B]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h4 className="text-[#0B0B0B] font-semibold text-sm mb-2">Stay up to date</h4>
              <p className="text-sm text-[#0B0B0B]/60">Get the latest news and updates from Helthy.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 md:w-64 px-4 py-3 rounded-full bg-[#0B0B0B]/5 border border-[#0B0B0B]/10 text-sm text-[#0B0B0B] placeholder-[#0B0B0B]/40 outline-none focus:border-[#0B0B0B]/30 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 rounded-full bg-[#0B0B0B] text-white text-sm font-medium hover:bg-[#0B0B0B]/80 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
          {message && (
            <p className={`text-sm mt-3 ${status === "success" ? "text-[#0B0B0B]" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0B0B0B]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-[#0B0B0B]/50">
              © {new Date().getFullYear()} Helthy Inc. All rights reserved.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B0B0B]/50 hover:text-[#0B0B0B] transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer section */}
      <div className="border-t border-[#0B0B0B]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
          <div className="space-y-4">
            <p className="text-xs text-[#0B0B0B]/40 leading-relaxed">
              Helthy is a health and fitness tracking application designed to help users monitor their nutrition, workouts, and overall wellness. The information provided by Helthy is for general informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider before starting any diet or exercise program.
            </p>
            <p className="text-xs text-[#0B0B0B]/40 leading-relaxed">
              Nutritional data is sourced from various databases and user-contributed content. While we strive for accuracy, we cannot guarantee the completeness or correctness of all nutritional information. Users should verify nutritional information when accuracy is critical, such as for medical conditions or allergies.
            </p>
            <p className="text-xs text-[#0B0B0B]/40 leading-relaxed">
              App Store® is a trademark of Apple Inc. Helthy is not affiliated with, endorsed by, or sponsored by Apple Inc.
            </p>
          </div>
        </div>
      </div>

      {/* Large logo section - right aligned, no bottom padding */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <div className="flex justify-end">
          <img
            src="/images/logos/logo-long-white.png"
            alt="Helthy"
            className="w-full max-w-12xl h-auto object-contain invert"
          />
        </div>
      </div>
    </footer>
  );
}
