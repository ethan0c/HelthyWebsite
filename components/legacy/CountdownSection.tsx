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
    // Set target to tomorrow at 12pm
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    const targetTime = tomorrow.getTime();

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
    <section className="relative bg-helthy-lemon py-12 md:py-20">
      <div className="container mx-auto px-6 lg:px-20">
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
                className="bg-black/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-black/10"
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

          {/* Subtext */}
          <p className="scroll-reveal animate-slide-up stagger-3 text-helthy-black/80 text-base md:text-lg max-w-2xl mx-auto">
            Get ready to transform your fitness journey
          </p>
        </div>
      </div>
    </section>
  );
}
