"use client";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useUI } from "../../lib/store/ui";

export default function MobileSidebar() {
  const open = useUI((s) => s.mobileMenuOpen);
  const toggle = useUI((s) => s.toggleMobileMenu);
  const close = useUI((s) => s.closeMobileMenu);

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
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

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
    if (scrollToId()) { close(); return; }
    try { history.replaceState(null, "", "#waitlist"); } catch {}
    requestAnimationFrame(() => setTimeout(() => { if (scrollToId()) close(); }, 60));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`md:hidden fixed inset-0 z-[59] ${open ? "" : "pointer-events-none"}`}
    >
      {/* Overlay with strong blur */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/70 backdrop-blur-2xl saturate-150 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      {/* Panel */}
      <aside
        id="mobile-sidebar"
        className={`absolute right-0 top-0 h-full w-[82vw] max-w-[360px] bg-helthy-black/70 border-l border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-white transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        style={{ WebkitBackdropFilter: "blur(24px) saturate(1.3)", backdropFilter: "blur(24px) saturate(1.3)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-sm text-white/70">Menu</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-5 py-4 space-y-1">
          <Link href="/" onClick={close} className="block rounded-lg px-3 py-3 hover:bg-white/10">Home</Link>
          <Link href="/about" onClick={close} className="block rounded-lg px-3 py-3 hover:bg-white/10">About Us</Link>
          <Link href="/contact" onClick={close} className="block rounded-lg px-3 py-3 hover:bg-white/10">Contact Us</Link>
          <Link href="/pricing" onClick={close} className="block rounded-lg px-3 py-3 hover:bg-white/10">Pricing</Link>
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <a
            href="#waitlist"
            onClick={(e) => handleWaitlistScroll(e)}
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
  );
}
