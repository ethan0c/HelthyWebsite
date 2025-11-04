import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-screen-xl px-4">
      <div id="nav-pill" className="backdrop-blur-[40px] bg-black/15 border-2 border-white/20 rounded-[100px] shadow-[0_8px_16px_rgba(0,0,0,0.08)] px-4 sm:px-6 md:px-[34px] py-2 sm:py-3 mx-auto w-fit">
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
            <a href="#waitlist" className="group inline-flex items-center gap-3 sm:gap-4 md:gap-5 bg-white/10 hover:bg-white/20 rounded-[47px] pl-3 sm:pl-4 md:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 border-2 border-white/30 transition-colors">
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
    </nav>
  );
}
