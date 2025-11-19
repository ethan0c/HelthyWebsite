"use client";
import React from "react";
import { Mail, Instagram } from "lucide-react";

export default function SiteFooter() {
  return (
    <>
      <footer className="relative bg-helthy-black py-16 lg:py-20 overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="scroll-reveal animate-slide-up lg:col-span-3 space-y-6">
              <div className="flex items-center gap-6 text-white/70 pt-2">
                <a href="https://x.com/helthyapp" target="_blank" rel="noopener noreferrer" aria-label="X (helthyapp)" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="mailto:support@helthy.app" aria-label="Email support@helthy.app" className="hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/helthy.app" target="_blank" rel="noopener noreferrer" aria-label="Instagram (helthy.app)" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="pt-6 space-y-2">
                <p className="text-white/60 text-sm">© 2025 Helthy. All rights reserved.</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Manage Cookies</a>
                </div>
              </div>
            </div>

            <div className="scroll-reveal animate-slide-up stagger-2 lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Company</h3>
              <nav className="space-y-3">
                <a href="/about" className="block text-white/70 hover:text-white transition-colors">About Us</a>
                <a href="/contact" className="block text-white/70 hover:text-white transition-colors">Contact Us</a>
              </nav>
            </div>

            <div className="scroll-reveal animate-slide-up stagger-3 lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Product</h3>
              <nav className="space-y-3">
                <a href="#waitlist" className="block text-white/70 hover:text-white transition-colors">Join Waitlist</a>
                <a href="/pricing" className="block text-white/70 hover:text-white transition-colors">Pricing</a>
              </nav>
            </div>

            <div className="scroll-reveal animate-slide-up stagger-4 lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Legal</h3>
              <nav className="space-y-3">
                <a href="/terms" className="block text-white/70 hover:text-white transition-colors">Terms of Service</a>
                <a href="/privacy" className="block text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              </nav>
            </div>
          </div>
        </div>
      </footer>

      <div className="bg-helthy-black py-7 ">
        <div className="px-2">
          <img
            src="/footer.svg"
            alt="Helthy footer"
            className="block w-full h-auto"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </>
  );
}
