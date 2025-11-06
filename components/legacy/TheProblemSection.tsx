"use client";
import React, { useEffect, useRef, useState } from "react";

export default function TheProblemSection() {
  const screens = ['home', 'exercise', 'nutrition', 'progress'] as const;
  type Screen = typeof screens[number];
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState<Record<Screen, boolean>>({} as Record<Screen, boolean>);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevIndex, setPrevIndex] = useState(0);
  const transitionTimerRef = useRef<number | null>(null);

  // No width measurement needed anymore; we crossfade/slide between stacked slides

  const goTo = (i: number) => {
    if (i === activeIndex || animating) return;
    setPrevIndex(activeIndex);
    setAnimating(true);
    setActiveIndex(i);
    // Fallback in case transitionend doesn't fire (e.g., reduced motion)
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    transitionTimerRef.current = window.setTimeout(() => {
      setAnimating(false);
      transitionTimerRef.current = null;
    }, 600); // a bit longer than CSS duration (~500ms)
  };
  const activeScreen = screens[activeIndex];
  
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);
  
  return (
    <section className="relative overflow-hidden bg-helthy-black py-20 md:py-28 lg:py-32">
      {/* Animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-helthy-lemon/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-helthy-lemon/15 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

  <div className="relative w-full px-0">
        {/* Header */}
  <div className="text-center mb-14 md:mb-20 max-w-4xl mx-auto px-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide mb-6">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] text-white mb-5 md:mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
            Stop juggling.<br />Start <span className="text-helthy-lemon">thriving</span>.
          </h2>
          <p className="text-base md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Everything you need for fitness in one beautiful app.
          </p>
        </div>

        {/* Innovative Split View Comparison */}
        <div className="w-full mb-12 px-6">
          {/* The Old Way - Scattered chaos */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/50"></div>
              <h3 className="text-lg md:text-xl font-medium text-red-400">The old way</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/50"></div>
            </div>
            
            {/* Scattered app boxes with messy layout */}
            <div className="relative h-56 md:h-96 lg:h-[28rem]">
              {/* Cal AI - top left */}
              <div className="absolute top-0 left-[5%] md:left-[10%] w-28 md:w-44 lg:w-52 transform -rotate-6 animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 lg:p-6 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/cal-ai.png" 
                    alt="Cal AI" 
                    className="w-12 h-12 lg:w-14 lg:h-14 mb-3 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add('loaded')}
                  />
                  <div className="text-sm lg:text-base text-gray-400 mb-1">Nutrition</div>
                  <div className="text-base lg:text-lg font-semibold text-white">$9.99/mo</div>
                </div>
              </div>

              {/* Strong - top right */}
              <div className="absolute top-8 right-[5%] md:right-[10%] w-28 md:w-44 lg:w-52 transform rotate-6 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 lg:p-6 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/strong.jpg" 
                    alt="Strong" 
                    className="w-12 h-12 lg:w-14 lg:h-14 mb-3 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="text-sm lg:text-base text-gray-400 mb-1">Workouts</div>
                  <div className="text-base lg:text-lg font-semibold text-white">$14.99/mo</div>
                </div>
              </div>

              {/* Walker - bottom center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 md:w-44 lg:w-52 transform -rotate-3 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 lg:p-6 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/walker.webp" 
                    alt="Walker" 
                    className="w-12 h-12 lg:w-14 lg:h-14 mb-3 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="text-sm lg:text-base text-gray-400 mb-1">Tracking</div>
                  <div className="text-base lg:text-lg font-semibold text-white">$6.99/mo</div>
                </div>
              </div>

              {/* Chaos indicators */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2" style={{ top: 'calc(50% - 100px)' }}>
                <svg className="w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="text-sm md:text-base text-red-400 font-semibold">$31.97/month</div>
              </div>
            </div>
          </div>

          {/* Divider with VS */}
          <div className="flex items-center justify-center my-12 md:my-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="mx-6 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 font-medium text-sm">
              VS
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {/* The Helthy Way - Unified simplicity */}
          <div>
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-helthy-lemon/50"></div>
              <h3 className="text-lg md:text-xl font-medium text-helthy-lemon">The Helthy way</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-helthy-lemon/50"></div>
            </div>

            {/* Simple unified features */}
            <div className="w-full">
              <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto px-6">
                <h4 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-5 md:mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
                  One app. <span className="text-helthy-lemon">Everything.</span>
                </h4>
                <p className="mt-2 md:mt-4 text-white/70 max-w-2xl mx-auto text-base md:text-lg">
                  All the tools you need to reach your health goals, unified in one beautiful experience.
                </p>
                {/* Helthy total price — same style, brand green */}
                <div className="mt-8 flex justify-center">
                  <div className="text-sm md:text-base text-helthy-lemon font-medium">$0/month</div>
                </div>     
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
