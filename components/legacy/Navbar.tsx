"use client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Prevent body scroll when sidebar is open (mobile)
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on Escape key for accessibility
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleWaitlistScroll = (e?: React.MouseEvent) => {
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
      {/* Desktop/Mid+ pill navbar */}
      <div id="nav-pill" className="hidden md:block backdrop-blur-[40px] bg-black/15 border-2 border-white/20 rounded-[100px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] px-4 sm:px-6 md:px-[34px] py-2 sm:py-3 mx-auto w-fit">
        <div className="flex items-center gap-4 sm:gap-5 md:gap-7">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4 md:gap-7 mx-auto">
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

      {/* Mobile hamburger button (top-right) with toggle */}
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-sidebar"
        onClick={() => setOpen(o => !o)}
        className="md:hidden fixed right-3 top-3 z-[60] rounded-full border border-white/20 bg-black/40 backdrop-blur-xl p-2 text-white hover:bg-black/50 transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile right sidebar drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`md:hidden fixed inset-0 z-[59] ${open ? '' : 'pointer-events-none'}`}
      >
        {/* Overlay with strong blur */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/70 backdrop-blur-2xl saturate-150 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Panel */}
        <aside
          id="mobile-sidebar"
          className={`absolute right-0 top-0 h-full w-[82vw] max-w-[360px] bg-helthy-black/70 border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ WebkitBackdropFilter: 'blur(24px) saturate(1.3)', backdropFilter: 'blur(24px) saturate(1.3)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <span className="text-sm text-white/70">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="rounded-full p-2 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="px-5 py-4 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-white/10">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-white/10">About Us</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-white/10">Contact Us</Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 hover:bg-white/10">Pricing</Link>
          </nav>

          <div className="px-5 py-4 border-t border-white/10">
            <a
              href="#waitlist"
              onClick={(e) => { handleWaitlistScroll(e); setOpen(false); }}
              className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-white/20 bg-white/10 hover:bg-white/20 px-4 py-3 transition-colors"
            >
              <span className="text-white">Join Waitlist</span>
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/35">
                <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={3} />
              </span>
            </a>
          </div>

          <div className="px-5 py-3 text-xs text-white/50">
            © {new Date().getFullYear()} Helthy
          </div>
        </aside>
      </div>
    </nav>
  );
}
