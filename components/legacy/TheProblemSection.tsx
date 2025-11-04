import React, { useState } from "react";

export default function TheProblemSection() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'nutrition' | 'progress'>('home');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <section className="relative overflow-hidden bg-helthy-black py-20 md:py-28 lg:py-32">
      {/* Animated gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-helthy-lemon/20 blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-helthy-lemon/15 blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide mb-6">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] text-white mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
            Stop juggling.<br />Start <span className="text-helthy-lemon">thriving</span>.
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Everything you need for fitness in one beautiful app.
          </p>
        </div>

        {/* Innovative Split View Comparison */}
        <div className="max-w-6xl mx-auto mb-12">
          {/* The Old Way - Scattered chaos */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/50"></div>
              <h3 className="text-lg md:text-xl font-medium text-red-400">The old way</h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/50"></div>
            </div>
            
            {/* Scattered app boxes with messy layout */}
            <div className="relative h-64 md:h-80">
              {/* Cal AI - top left */}
              <div className="absolute top-0 left-[5%] md:left-[10%] w-28 md:w-36 transform -rotate-6 animate-pulse" style={{ animationDuration: '3s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/cal-ai.png" 
                    alt="Cal AI" 
                    className="w-10 h-10 mb-2 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add('loaded')}
                  />
                  <div className="text-xs text-gray-400 mb-1">Nutrition</div>
                  <div className="text-sm font-semibold text-white">$9.99/mo</div>
                </div>
              </div>

              {/* Strong - top right */}
              <div className="absolute top-8 right-[5%] md:right-[10%] w-28 md:w-36 transform rotate-6 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/strong.jpg" 
                    alt="Strong" 
                    className="w-10 h-10 mb-2 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="text-xs text-gray-400 mb-1">Workouts</div>
                  <div className="text-sm font-semibold text-white">$14.99/mo</div>
                </div>
              </div>

              {/* Walker - bottom center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 md:w-36 transform -rotate-3 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 shadow-xl">
                  <img 
                    src="/logos/walker.webp" 
                    alt="Walker" 
                    className="w-10 h-10 mb-2 opacity-80 transition-opacity duration-300"
                    loading="lazy"
                  />
                  <div className="text-xs text-gray-400 mb-1">Tracking</div>
                  <div className="text-sm font-semibold text-white">$6.99/mo</div>
                </div>
              </div>

              {/* Chaos indicators */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-40" style={{ top: 'calc(50% - 100px)' }}>
                <svg className="w-16 h-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div className="text-s text-red-400 font-medium">$31.97/month</div>
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
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h4 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
                  One app. <span className="text-helthy-lemon">Everything.</span>
                </h4>
                <p className="mt-4 text-white/70 max-w-2xl mx-auto text-lg">
                  All the tools you need to reach your health goals, unified in one beautiful experience.
                </p>
                {/* Helthy total price highlight */}
                <div className="mt-8 flex justify-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-helthy-lemon/10 border border-helthy-lemon text-helthy-lemon text-sm font-semibold">
                    $0/month
                  </div>
                </div>

                {/* Screen selector buttons */}
                <div className="mt-8 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveScreen('home');
                      setImageLoaded(false);
                    }}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      activeScreen === 'home'
                        ? 'bg-helthy-lemon text-helthy-black shadow-lg'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      setActiveScreen('nutrition');
                      setImageLoaded(false);
                    }}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      activeScreen === 'nutrition'
                        ? 'bg-helthy-lemon text-helthy-black shadow-lg'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Nutrition
                  </button>
                  <button
                    onClick={() => {
                      setActiveScreen('progress');
                      setImageLoaded(false);
                    }}
                    className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                      activeScreen === 'progress'
                        ? 'bg-helthy-lemon text-helthy-black shadow-lg'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    Progress
                  </button>
                </div>
              </div>

              {/* Phone screenshot with side info */}
              <div className="flex justify-center items-center mb-12 gap-8 lg:gap-12">
                {/* Left info */}
                <div className="hidden md:block flex-1 space-y-6 max-w-sm ml-auto pr-8">
                  {activeScreen === 'home' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Quick Actions</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Start workouts, log meals, or check progress in one tap</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Smart Dashboard</h5>
                        <p className="text-white/90 text-lg leading-relaxed">See today's goals and achievements at a glance</p>
                      </div>
                    </>
                  )}
                  {activeScreen === 'nutrition' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Photo Logging</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Snap a pic of your meal and let AI handle the rest</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Macro Balance</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Simple visual guides to keep your nutrition on track</p>
                      </div>
                    </>
                  )}
                  {activeScreen === 'progress' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Clear Trends</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Beautiful charts that show your journey over time</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Insights</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Smart nudges to keep you motivated and consistent</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Phone mockup */}
                <div className="relative flex-shrink-0">
                  {/* Loading skeleton */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex justify-center">
                      <div className="w-[560px] md:w-[640px] lg:w-[720px] h-[1200px] bg-helthy-lemon/5 rounded-3xl animate-pulse" />
                    </div>
                  )}
                  <img 
                    src={`/phones/${activeScreen}.svg`}
                    alt={`Helthy app ${activeScreen} screen`} 
                    className={`w-[560px] md:w-[640px] lg:w-[720px] h-auto drop-shadow-[0_40px_80px_rgba(199,255,0,0.15)] transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    key={activeScreen}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                </div>

                {/* Right info */}
                <div className="hidden md:block flex-1 space-y-6 max-w-sm mr-auto pl-8">
                  {activeScreen === 'home' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Today's Focus</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Personalized recommendations based on your routine</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Streak Tracking</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Build consistency with visual progress indicators</p>
                      </div>
                    </>
                  )}
                  {activeScreen === 'nutrition' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Voice Logging</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Just say what you ate—no typing required</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Meal History</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Quick access to your favorite meals and portions</p>
                      </div>
                    </>
                  )}
                  {activeScreen === 'progress' && (
                    <>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Weekly Recap</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Celebrate wins and identify areas to improve</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Goal Tracking</h5>
                        <p className="text-white/90 text-lg leading-relaxed">Monitor milestones and stay on target</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile info (below phone) */}
              <div className="md:hidden mt-8 grid grid-cols-1 gap-5 max-w-lg mx-auto">
                {activeScreen === 'home' && (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Quick Actions</h5>
                      <p className="text-white/90 text-lg leading-relaxed">Start workouts, log meals, or check progress in one tap</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Smart Dashboard</h5>
                      <p className="text-white/90 text-lg leading-relaxed">See today's goals and achievements at a glance</p>
                    </div>
                  </>
                )}
                {activeScreen === 'nutrition' && (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Photo Logging</h5>
                      <p className="text-white/90 text-lg leading-relaxed">Snap a pic of your meal and let AI handle the rest</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Macro Balance</h5>
                      <p className="text-white/90 text-lg leading-relaxed">Simple visual guides to keep your nutrition on track</p>
                    </div>
                  </>
                )}
                {activeScreen === 'progress' && (
                  <>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Clear Trends</h5>
                      <p className="text-white/90 text-lg leading-relaxed">Beautiful charts that show your journey over time</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                      <h5 className="text-helthy-lemon font-semibold mb-3 text-2xl tracking-tight" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>Insights</h5>
                      <p className="text-white/90 text-lg leading-relaxed">Smart nudges to keep you motivated and consistent</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
