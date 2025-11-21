"use client";

import { useEffect, useState } from "react";

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set target to next Sunday at 10am
    const now = new Date();
    const targetDate = new Date();
    
    // Calculate days until next Sunday (0 = Sunday, 1 = Monday, etc.)
    const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
    
    targetDate.setDate(now.getDate() + daysUntilSunday);
    targetDate.setHours(10, 0, 0, 0);
    
    const targetTime = targetDate.getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-helthy-lemon py-12 md:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div aria-hidden className="pointer-events-none absolute top-10 left-0 w-[300px] h-[300px] rounded-full bg-helthy-black/5 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-helthy-black/5 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/4 w-[200px] h-[200px] rounded-full bg-helthy-black/3 blur-[80px] hidden md:block" />
      
      {/* Floating accent shapes */}
      <div aria-hidden className="pointer-events-none absolute top-20 left-10 w-16 h-16 border-2 border-helthy-black/10 rounded-full hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute top-40 right-20 w-12 h-12 bg-helthy-black/5 rounded-lg rotate-12 hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute bottom-32 left-24 w-20 h-20 border-2 border-helthy-black/10 rounded-lg -rotate-6 hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute bottom-20 right-16 w-14 h-14 border-2 border-helthy-black/10 rounded-full hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute top-1/3 right-32 w-10 h-10 bg-helthy-black/5 rounded-full hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-16 w-8 h-8 border-2 border-helthy-black/10 rounded-lg rotate-45 hidden lg:block" />
      <div aria-hidden className="pointer-events-none absolute bottom-40 right-28 w-16 h-16 border-2 border-helthy-black/10 rounded-full hidden xl:block" />
      <div aria-hidden className="pointer-events-none absolute top-24 left-1/3 w-12 h-12 bg-helthy-black/5 rounded-lg -rotate-12 hidden xl:block" />
      <div aria-hidden className="pointer-events-none absolute bottom-28 left-1/4 w-10 h-10 border-2 border-helthy-black/10 rounded-lg rotate-6 hidden xl:block" />
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          {/* Title */}
          <div className="space-y-4">
            <span className="scroll-reveal animate-scale-in inline-flex items-center px-4 py-2 rounded-full bg-black/10 border border-black/10 text-helthy-black text-xs md:text-sm font-medium tracking-wide">
              Coming Soon
            </span>
            <h2 className="scroll-reveal animate-slide-up stagger-1 text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-helthy-black" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              App is Live on App Store in...
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="scroll-reveal animate-scale-in stagger-2 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-2xl mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="backdrop-blur-[40px] bg-black/15 border-2 border-black/20 rounded-2xl p-4 md:p-6 shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
                style={{
                  animation: 'breathe 2s ease-in-out infinite'
                }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-helthy-black mb-2">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm text-helthy-black/70 font-medium uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>
          <style jsx>{`
            @keyframes breathe {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.05);
              }
            }
          `}</style>

          {/* Subtext */}
          <p className="scroll-reveal animate-slide-up stagger-3 text-helthy-black/80 text-base md:text-lg max-w-2xl mx-auto">
            Get ready to transform your fitness journey
          </p>
        </div>
      </div>
    </section>
  );
}
