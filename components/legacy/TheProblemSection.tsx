"use client";
import React, { useState } from "react";

export default function TheProblemSection() {
  const [hoveredPhone, setHoveredPhone] = useState<string | null>(null);
  const [tappedPhone, setTappedPhone] = useState<string | null>(null);
  
  const phoneInfo = {
    home: {
      title: "Smart Dashboard",
      description: "Your personalized fitness hub. Quick actions to log workouts, track meals, and monitor progress—all in one tap.",
      features: ["Daily overview", "Quick actions", "Streak tracking"]
    },
    exercise: {
      title: "Adaptive Workouts",
      description: "Workouts that evolve with you. Track sets, reps, and weights with smart suggestions tailored to your goals.",
      features: ["Custom programs", "Exercise library", "Progress tracking"]
    },
    nutrition: {
      title: "Effortless Nutrition",
      description: "Log meals with voice or photos. Get instant macro breakdowns and meal suggestions that fit your lifestyle.",
      features: ["Voice logging", "Photo scanning", "Macro balance"]
    },
    progress: {
      title: "Visual Progress",
      description: "Beautiful charts and insights that celebrate your wins. Track trends, set milestones, and stay motivated.",
      features: ["Weekly recaps", "Goal tracking", "Trend analysis"]
    }
  };

  const handlePhoneClick = (phone: string) => {
    // On mobile, toggle tapped state for the clicked phone
    setTappedPhone(tappedPhone === phone ? null : phone);
  };

  const handleOverlayClick = () => {
    setTappedPhone(null);
  };
  
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
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide mb-6 scroll-reveal animate-scale-in">
            The Problem
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.12] text-white mb-5 md:mb-6 scroll-reveal animate-slide-up stagger-1" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
            Stop juggling.<br />Start <span className="text-helthy-lemon">thriving</span>.
          </h2>
          <p className="text-base md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed scroll-reveal animate-slide-up stagger-2">
            Everything you need for fitness in one beautiful app.
          </p>
        </div>

        {/* Innovative Split View Comparison */}
        <div className="w-full mb-12 px-6">
          {/* The Old Way - Scattered chaos */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 justify-center scroll-reveal animate-slide-left">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/50"></div>
              <h3 className="text-lg md:text-xl font-medium text-red-400">The old way</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/50"></div>
            </div>
            
            {/* Scattered app boxes with messy layout */}
            <div className="relative h-56 md:h-96 lg:h-[28rem] scroll-reveal animate-scale-in stagger-2">
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
            <div className="flex items-center gap-3 mb-6 justify-center scroll-reveal animate-slide-right">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-helthy-lemon/50"></div>
              <h3 className="text-lg md:text-xl font-medium text-helthy-lemon">The Helthy way</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-helthy-lemon/50"></div>
            </div>

            {/* Simple unified features */}
            <div className="w-full">
              <div className="text-center mb-10 md:mb-12 max-w-4xl mx-auto px-6">
                <h4 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-5 md:mb-6 scroll-reveal animate-slide-up stagger-1" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
                  One app. <span className="text-helthy-lemon">Everything.</span>
                </h4>
                <p className="mt-2 md:mt-4 text-white/70 max-w-2xl mx-auto text-base md:text-lg scroll-reveal animate-slide-up stagger-2">
                  All the tools you need to reach your health goals, unified in one beautiful experience.
                </p>
                {/* Helthy total price — same style, brand green */}
                <div className="mt-8 flex justify-center scroll-reveal animate-scale-in stagger-3">
                  <div className="text-sm md:text-base text-helthy-lemon font-medium">$0/month</div>
                </div>     
              </div>

              {/* 4-Phone Mockup Showcase - Desktop: Grid with Hover | Mobile: Modern Feature Cards */}
              <div className="w-full max-w-7xl mx-auto px-6 mt-16 md:mt-20 scroll-reveal animate-slide-up stagger-4">
                {/* Mobile overlay backdrop */}
                {tappedPhone && (
                  <div 
                    className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
                    onClick={handleOverlayClick}
                  />
                )}

                {/* Mobile: Modern Feature Cards */}
                <div className="md:hidden space-y-4">
                  {Object.entries(phoneInfo).map(([key, info], idx) => (
                    <div 
                      key={key}
                      className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm rounded-3xl border border-white/10 p-6 hover:border-helthy-lemon/30 transition-all duration-300"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Feature number badge */}
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/30 flex items-center justify-center">
                        <span className="text-helthy-lemon font-semibold text-sm">{idx + 1}</span>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-helthy-lemon" />
                          <h5 className="text-helthy-lemon font-semibold text-lg">{info.title}</h5>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed pl-5">
                          {info.description}
                        </p>
                        
                        {/* Feature tags */}
                        <div className="flex flex-wrap gap-2 pl-5 pt-2">
                          {info.features.map((feature, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs"
                            >
                              <span className="w-1 h-1 rounded-full bg-helthy-lemon/60" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover gradient effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-helthy-lemon/0 to-helthy-lemon/0 group-hover:from-helthy-lemon/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* Desktop: Phone Grid with Hover Effects */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {/* Home Phone */}
                  <div 
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredPhone('home')}
                    onMouseLeave={() => setHoveredPhone(null)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border p-3 md:p-4 transition-all duration-300 ${
                      hoveredPhone === 'home'
                        ? 'scale-105 border-helthy-lemon shadow-[0_0_30px_rgba(205,251,80,0.35)] z-10' 
                        : hoveredPhone
                          ? 'scale-[0.98] opacity-50 border-white/5'
                          : 'border-white/10'
                    }`}>
                      <img
                        src="/phones/home.svg"
                        alt="Helthy app home screen"
                        className="w-full h-auto select-none"
                        draggable={false}
                        loading="eager"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className={`text-sm md:text-base transition-colors duration-200 ${
                        hoveredPhone === 'home' ? 'text-helthy-lemon font-semibold' : 'text-white/80'
                      }`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Home</span>
                    </div>
                    
                    {/* Info popup - desktop hover only */}
                    {hoveredPhone === 'home' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-helthy-black/95 backdrop-blur-xl border border-helthy-lemon/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(205,251,80,0.2)] z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <h5 className="text-helthy-lemon font-semibold text-lg mb-2">{phoneInfo.home.title}</h5>
                        <p className="text-white/80 text-sm mb-3 leading-relaxed">{phoneInfo.home.description}</p>
                        <ul className="space-y-1.5">
                          {phoneInfo.home.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/70 text-xs">
                              <span className="w-1 h-1 rounded-full bg-helthy-lemon" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Exercise Phone */}
                  <div 
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredPhone('exercise')}
                    onMouseLeave={() => setHoveredPhone(null)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border p-3 md:p-4 transition-all duration-300 ${
                      hoveredPhone === 'exercise'
                        ? 'scale-105 border-helthy-lemon shadow-[0_0_30px_rgba(205,251,80,0.35)] z-10' 
                        : hoveredPhone
                          ? 'scale-[0.98] opacity-50 border-white/5'
                          : 'border-white/10'
                    }`}>
                      <img
                        src="/phones/exercise.svg"
                        alt="Helthy app exercise screen"
                        className="w-full h-auto select-none"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className={`text-sm md:text-base transition-colors duration-200 ${
                        hoveredPhone === 'exercise' ? 'text-helthy-lemon font-semibold' : 'text-white/80'
                      }`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Exercise</span>
                    </div>
                    
                    {/* Info popup */}
                    {hoveredPhone === 'exercise' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-helthy-black/95 backdrop-blur-xl border border-helthy-lemon/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(205,251,80,0.2)] z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <h5 className="text-helthy-lemon font-semibold text-lg mb-2">{phoneInfo.exercise.title}</h5>
                        <p className="text-white/80 text-sm mb-3 leading-relaxed">{phoneInfo.exercise.description}</p>
                        <ul className="space-y-1.5">
                          {phoneInfo.exercise.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/70 text-xs">
                              <span className="w-1 h-1 rounded-full bg-helthy-lemon" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Nutrition Phone */}
                  <div 
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredPhone('nutrition')}
                    onMouseLeave={() => setHoveredPhone(null)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border p-3 md:p-4 transition-all duration-300 ${
                      hoveredPhone === 'nutrition'
                        ? 'scale-105 border-helthy-lemon shadow-[0_0_30px_rgba(205,251,80,0.35)] z-10' 
                        : hoveredPhone
                          ? 'scale-[0.98] opacity-50 border-white/5'
                          : 'border-white/10'
                    }`}>
                      <img
                        src="/phones/nutrition.svg"
                        alt="Helthy app nutrition screen"
                        className="w-full h-auto select-none"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className={`text-sm md:text-base transition-colors duration-200 ${
                        hoveredPhone === 'nutrition' ? 'text-helthy-lemon font-semibold' : 'text-white/80'
                      }`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Nutrition</span>
                    </div>
                    
                    {/* Info popup */}
                    {hoveredPhone === 'nutrition' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-helthy-black/95 backdrop-blur-xl border border-helthy-lemon/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(205,251,80,0.2)] z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <h5 className="text-helthy-lemon font-semibold text-lg mb-2">{phoneInfo.nutrition.title}</h5>
                        <p className="text-white/80 text-sm mb-3 leading-relaxed">{phoneInfo.nutrition.description}</p>
                        <ul className="space-y-1.5">
                          {phoneInfo.nutrition.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/70 text-xs">
                              <span className="w-1 h-1 rounded-full bg-helthy-lemon" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Progress Phone */}
                  <div 
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredPhone('progress')}
                    onMouseLeave={() => setHoveredPhone(null)}
                  >
                    <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-sm border p-3 md:p-4 transition-all duration-300 ${
                      hoveredPhone === 'progress'
                        ? 'scale-105 border-helthy-lemon shadow-[0_0_30px_rgba(205,251,80,0.35)] z-10' 
                        : hoveredPhone
                          ? 'scale-[0.98] opacity-50 border-white/5'
                          : 'border-white/10'
                    }`}>
                      <img
                        src="/phones/progress.svg"
                        alt="Helthy app progress screen"
                        className="w-full h-auto select-none"
                        draggable={false}
                        loading="lazy"
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className={`text-sm md:text-base transition-colors duration-200 ${
                        hoveredPhone === 'progress' ? 'text-helthy-lemon font-semibold' : 'text-white/80'
                      }`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Progress</span>
                    </div>
                    
                    {/* Info popup */}
                    {hoveredPhone === 'progress' && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-helthy-black/95 backdrop-blur-xl border border-helthy-lemon/30 rounded-2xl p-5 shadow-[0_8px_32px_rgba(205,251,80,0.2)] z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                        <h5 className="text-helthy-lemon font-semibold text-lg mb-2">{phoneInfo.progress.title}</h5>
                        <p className="text-white/80 text-sm mb-3 leading-relaxed">{phoneInfo.progress.description}</p>
                        <ul className="space-y-1.5">
                          {phoneInfo.progress.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-white/70 text-xs">
                              <span className="w-1 h-1 rounded-full bg-helthy-lemon" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
