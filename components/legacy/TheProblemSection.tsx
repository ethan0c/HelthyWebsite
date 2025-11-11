"use client";
import React, { useState } from "react";

export default function TheProblemSection() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const features = [
    {
      id: 0,
      title: "Smart Dashboard",
      subtitle: "Your fitness command center",
      description: "Everything you need at a glance. Track your progress, log workouts, monitor nutrition, and stay motivated—all from one beautiful dashboard.",
      highlights: ["Real-time stats", "Quick actions", "Daily streaks", "Goal tracking"],
      phoneImage: "/phones/home.svg",
      mobileImage: "/phones/mobile/home.png",
      gradient: "from-purple-500/20 via-helthy-lemon/20 to-blue-500/20",
      accentColor: "helthy-lemon"
    },
    {
      id: 1,
      title: "Adaptive Workouts",
      subtitle: "Training that evolves with you",
      description: "Smart workout tracking that learns from your progress. Get personalized recommendations, track every rep, and watch your strength grow.",
      highlights: ["Custom programs", "Exercise library", "Form guides", "PR tracking"],
      phoneImage: "/phones/exercise.svg",
      mobileImage: "/phones/mobile/exercise.png",
      gradient: "from-blue-500/20 via-cyan-500/20 to-helthy-lemon/20",
      accentColor: "cyan-400"
    },
    {
      id: 2,
      title: "Effortless Nutrition",
      subtitle: "Healthy eating, simplified",
      description: "Log meals in seconds with voice or photos. Get instant macro breakdowns and smart suggestions that fit your lifestyle and goals.",
      highlights: ["Voice logging", "Photo recognition", "Macro balance", "Meal insights"],
      phoneImage: "/phones/nutrition.svg",
      mobileImage: "/phones/mobile/food.png",
      gradient: "from-green-500/20 via-helthy-lemon/20 to-yellow-500/20",
      accentColor: "green-400"
    },
    {
      id: 3,
      title: "Visual Progress",
      subtitle: "See your transformation",
      description: "Beautiful charts and insights that celebrate every win. Track trends, identify patterns, and stay motivated with data that actually makes sense.",
      highlights: ["Weekly insights", "Trend analysis", "Goal milestones", "Achievement system"],
      phoneImage: "/phones/progress.svg",
      mobileImage: "/phones/mobile/progress.png",
      gradient: "from-pink-500/20 via-purple-500/20 to-helthy-lemon/20",
      accentColor: "purple-400"
    }
  ];
  
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

              {/* Interactive Feature Showcase */}
              <div className="w-full max-w-7xl mx-auto px-6 mt-16 md:mt-20">
                
                {/* Mobile: Vertical Stack with Integrated Phones */}
                <div className="md:hidden space-y-6">
                  {features.map((feature, idx) => (
                    <div 
                      key={feature.id}
                      className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm rounded-[2rem] border border-white/10 p-6 overflow-hidden"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {/* Gradient mesh background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                      
                      {/* Content */}
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-medium text-helthy-lemon/60">0{idx + 1}</span>
                              <div className="h-px flex-1 bg-gradient-to-r from-helthy-lemon/30 to-transparent" />
                            </div>
                            <h5 className="text-white font-semibold text-xl mb-1">{feature.title}</h5>
                            <p className="text-helthy-lemon/80 text-sm">{feature.subtitle}</p>
                          </div>
                        </div>
                        
                        <p className="text-white/70 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        
                        {/* Highlights grid */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          {feature.highlights.map((highlight, i) => (
                            <div 
                              key={i} 
                              className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/5 border border-white/10"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-helthy-lemon" />
                              <span className="text-white/80 text-xs font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Phone preview */}
                        <div className="mt-4 flex justify-center">
                          <div className="w-48 rounded-[2rem] overflow-hidden border border-white/20 bg-white/5 p-2">
                            <img
                              src={feature.mobileImage}
                              alt={`${feature.title} screen`}
                              className="w-full h-auto rounded-[1.75rem]"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop: Interactive Tab System with Large Preview */}
                <div className="hidden md:block">
                  {/* Tab Navigation */}
                  <div className="flex justify-center gap-2 mb-12">
                    {features.map((feature) => (
                      <button
                        key={feature.id}
                        onClick={() => setActiveFeature(feature.id)}
                        onMouseEnter={() => setHoveredCard(feature.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                          activeFeature === feature.id
                            ? 'bg-helthy-lemon text-helthy-black shadow-[0_0_30px_rgba(205,251,80,0.3)]'
                            : hoveredCard === feature.id
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="relative z-10">{feature.title}</span>
                        {activeFeature === feature.id && (
                          <div className="absolute inset-0 rounded-full bg-helthy-lemon animate-pulse" style={{ animationDuration: '2s' }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Feature Display Area */}
                  <div className="relative min-h-[600px]">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className={`absolute inset-0 transition-all duration-500 ${
                          activeFeature === feature.id
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-8 pointer-events-none'
                        }`}
                      >
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                          {/* Left: Content */}
                          <div className="space-y-6">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-2xl font-bold text-helthy-lemon/40">0{feature.id + 1}</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-helthy-lemon/30 to-transparent" />
                              </div>
                              <h3 className="text-4xl lg:text-5xl font-semibold text-white mb-3" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
                                {feature.title}
                              </h3>
                              <p className="text-xl text-helthy-lemon/90 mb-4">{feature.subtitle}</p>
                              <p className="text-white/70 text-lg leading-relaxed">
                                {feature.description}
                              </p>
                            </div>

                            {/* Highlights */}
                            <div className="grid grid-cols-2 gap-3">
                              {feature.highlights.map((highlight, i) => (
                                <div
                                  key={i}
                                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[1.25rem] p-4 hover:border-helthy-lemon/30 transition-all duration-300"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-helthy-lemon group-hover:scale-125 transition-transform duration-300" />
                                    <span className="text-white/90 font-medium text-sm">{highlight}</span>
                                  </div>
                                  <div className={`absolute inset-0 rounded-[1.25rem] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right: Phone Preview with Gradient Background */}
                          <div className="relative flex items-center justify-center">
                            {/* Animated gradient orb */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-3xl opacity-30 animate-pulse`} style={{ animationDuration: '3s' }} />
                            
                            {/* Phone mockup */}
                            <div className="relative z-10 w-full max-w-sm">
                              <div className="relative rounded-[3rem] overflow-hidden border-4 border-white/20 bg-white/5 backdrop-blur-sm p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500">
                                <img
                                  src={feature.phoneImage}
                                  alt={`${feature.title} screen`}
                                  className="w-full h-auto rounded-[2.5rem]"
                                  loading={feature.id === 0 ? "eager" : "lazy"}
                                />
                                
                                {/* Shine effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              </div>

                              {/* Floating accent elements */}
                              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-helthy-lemon/20 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
                              <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
