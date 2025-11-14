import { ArrowUpRight, CheckCircle } from "lucide-react";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-helthy-black">
      <section className="relative pt-28 md:pt-36 pb-24 md:pb-32">
        <div className="container mx-auto px-6 lg:px-20 max-w-4xl">
          <div className="text-center mb-16">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 text-helthy-lemon text-sm font-medium tracking-wide">
                Pricing
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-white mb-6" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              It's <span className="text-helthy-lemon">100% Free</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
              No catch. No credit card. No trials. Just download and start your health journey today.
            </p>
          </div>

          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-helthy-lemon to-[#A8E063] rounded-3xl blur opacity-20"></div>
            
            {/* Main card */}
            <div className="relative bg-helthy-black rounded-3xl border-2 border-helthy-lemon/30 p-8 md:p-10 shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-helthy-lemon/10 border border-helthy-lemon/20 mb-6">
                  <div className="w-2 h-2 bg-helthy-lemon rounded-full"></div>
                  <span className="text-helthy-lemon text-sm font-medium">Forever Free</span>
                </div>
                
                <div className="flex items-end justify-center gap-2 mb-4">
                  <span className="text-6xl md:text-7xl text-helthy-lemon leading-none font-normal" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
                    $0
                  </span>
                  <span className="text-xl text-white/60 mb-3 font-light">/month</span>
                </div>
                
                <p className="text-white/80 text-lg max-w-md mx-auto">
                  Full access to all features. No premium tiers, no paywalls.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  'Unlimited workouts & programs',
                  'Smart nutrition planning & logging',
                  'Barcode scan + search + describe',
                  'Voice logging',
                  'Real-time progress tracking',
                  'Apple Health / Google Fit sync',
                  'Community support & challenges',
                  'Personalized insights & analytics',
                  'No ads, ever',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-white/90">
                    <CheckCircle className="h-4 w-4 mt-0.5 text-helthy-lemon" />
                    <span className="text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <div className="text-center space-y-4">
                <a 
                  href="/#waitlist" 
                  className="inline-flex items-center gap-3 rounded-full bg-helthy-lemon text-helthy-black px-6 py-3 font-medium hover:bg-helthy-lemon/90"
                >
                  Join Waitlist
                  <ArrowUpRight className="h-5 w-5" />
                </a>
                <p className="text-white/60 text-xs">
                  Available on iOS & Android • No signup required to explore
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 space-y-6">
            <h2 className="text-3xl font-normal text-white text-center mb-8" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif" }}>
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-helthy-lemon font-semibold text-lg mb-2">Why is it free?</h3>
                <p className="text-white/70">
                  We're two broke college kids who believe everyone deserves access to simple, effective fitness tools. We're bootstrapping Helthy because health shouldn't be a luxury—no paywalls, no premium tiers, just honest tools to help you reach your goals.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-helthy-lemon font-semibold text-lg mb-2">Will there be paid features in the future?</h3>
                <p className="text-white/70">
                  All core features will always be free. We may introduce optional premium add-ons down the road (like personalized coaching), but the complete Helthy experience you see today will remain free forever.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-helthy-lemon font-semibold text-lg mb-2">How will you make money?</h3>
                <p className="text-white/70">
                  For now, we're not. We're focused on building something valuable and growing our community. In the future, we might offer optional premium services, but your basic experience will always be 100% free.
                </p>
              </div>
            </div>
          </div>

          {/* Help block */}
          <div className="text-center mt-12">
            <p className="text-white/70 text-base mb-4">Have more questions?</p>
            <a href="/contact" className="inline-flex items-center gap-3 rounded-full bg-white/10 text-white px-6 py-3 font-medium hover:bg-white/15 border border-white/20 transition-all">
              Get in Touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
