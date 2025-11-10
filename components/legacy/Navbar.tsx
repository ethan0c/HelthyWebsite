"use client";
import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useUI } from "../../lib/store/ui";

export default function Navbar() {
  const open = useUI((s) => s.mobileMenuOpen);
  const toggleMobileMenu = useUI((s) => s.toggleMobileMenu);

  const handleWaitlistScroll = (e?: MouseEvent) => {
    if (e) e.preventDefault();
    const scrollToId = () => {
      const el = document.getElementById("waitlist");
      if (!el) return false;
      const y = el.getBoundingClientRect().top + window.scrollY;
      const lenis: any = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(y, { duration: 1 });
      } else {
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return true;
    };
    if (scrollToId()) return;
    try { history.replaceState(null, "", "#waitlist"); } catch {}
    requestAnimationFrame(() => setTimeout(scrollToId, 60));
  };

  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-4">
      {/* Desktop/Mid+ pill navbar - Only show on larger screens to prevent logo overlap */}
      <div id="nav-pill" className="hidden lg:block backdrop-blur-[40px] bg-black/15 border-2 border-white/20 rounded-[100px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] px-4 sm:px-6 md:px-[34px] py-2 sm:py-3 mx-auto w-fit">
        <div className="flex items-center gap-4 sm:gap-5 md:gap-7">
          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 md:gap-7 mx-auto">
            <Link
              href="/"
              className="text-white hover:text-white/80 transition-colors font-normal tracking-[0.17px] text-sm md:text-base"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-white/80 transition-colors font-normal tracking-[0.17px] text-sm md:text-base"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white/80 transition-colors font-normal tracking-[0.17px] text-sm md:text-base"
            >
              Contact Us
            </Link>
            <Link
              href="/pricing"
              className="text-white hover:text-white/80 transition-colors font-normal tracking-[0.17px] text-sm md:text-base"
            >
              Pricing
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center">
            {/* Join Waitlist Button */}
            <a
              href="#waitlist"
              onClick={handleWaitlistScroll}
              className="group inline-flex items-center gap-3 sm:gap-4 md:gap-5 bg-white/10 hover:bg-white/20 rounded-[47px] pl-3 sm:pl-4 md:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 border-2 border-white/30 transition-colors"
            >
              <span className="text-white font-normal text-[12px] sm:text-[14px] md:text-[16px] leading-[22px] tracking-[0.17px]">
                Join Waitlist
              </span>
              <span className="flex items-center justify-center w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] rounded-[30px] bg-white/35">
                <ArrowUpRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" strokeWidth={3} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile hamburger button (top-right) with toggle - Show below lg breakpoint */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-sidebar"
        onClick={toggleMobileMenu}
        id="mobile-menu-button"
        className="lg:hidden fixed right-3 top-3 z-[60] rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-2 text-white hover:bg-black/50 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      
    </nav>
  );
}
