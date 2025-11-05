"use client";
import React from "react";
import { Mail, Instagram } from "lucide-react";
import OcelabsBanner from "./OcelabsBanner";

export default function SiteFooter() {
  return (
    <>
      <footer className="relative bg-helthy-black py-16 lg:py-20 overflow-hidden">
        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-3 space-y-6">
              <img src="/figma-components/hero/logo.png" alt="Helthy" className="h-8 w-auto" />
              <div>
                <OcelabsBanner variant="inline" />
              </div>
              <p className="text-white/80 leading-relaxed max-w-xs">
                Helthy is a fitness app that makes staying active simple and enjoyable.
              </p>
              <div className="flex items-center gap-6 text-white/70">
                <a href="#" aria-label="X" className="hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Email" className="hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="pt-6 space-y-2">
                <p className="text-white/60 text-sm">© 2025 Helthy. All rights reserved.</p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Manage Cookies</a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-white text-lg font-semibold">Newsletter</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Get the latest updates, news, and special offers. No spam, just quality content.
              </p>
              <div className="space-y-4 max-w-sm">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-helthy-lemon transition-colors"
                />
                <button className="w-52 px-6 py-3 bg-helthy-lemon text-helthy-black font-medium rounded-full shadow-[0_6px_0_rgba(0,0,0,0.2)] hover:bg-helthy-lemon/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Company</h3>
              <nav className="space-y-3">
                <a href="/about" className="block text-white/70 hover:text-white transition-colors">About Us</a>
                <a href="/blog" className="block text-white/70 hover:text-white transition-colors">Blog</a>
                <a href="/contact" className="block text-white/70 hover:text-white transition-colors">Contact Us</a>
              </nav>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Product</h3>
              <nav className="space-y-3">
                <a href="#waitlist" className="block text-white/70 hover:text-white transition-colors">Join Waitlist</a>
                <a href="/pricing" className="block text-white/70 hover:text-white transition-colors">Pricing</a>
              </nav>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-white text-lg font-semibold">Legal</h3>
              <nav className="space-y-3">
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="block text-white/70 hover:text-white transition-colors">Privacy Policy</a>
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
