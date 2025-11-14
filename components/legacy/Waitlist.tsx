import { useState } from "react";
import { Check, Loader2, ArrowUpRight } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }
      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Waitlist submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0 md:grid md:grid-cols-[1fr_auto] md:gap-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-5 py-3 bg-white border border-helthy-black/20 rounded-2xl text-helthy-black placeholder-helthy-black/50 focus:outline-none focus:ring-2 focus:ring-helthy-black focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="group inline-flex items-center justify-center gap-3 sm:gap-4 md:gap-5 rounded-[47px] border-2 border-helthy-lemon/30 bg-helthy-black text-helthy-lemon py-2 pl-[20px] sm:pl-[24px] md:pl-[28px] pr-1.5 sm:pr-2 shadow-[0px_8px_16px_rgba(114,146,28,0.2)] hover:bg-helthy-black/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto md:self-stretch min-h-[48px]"
          >
            {isLoading ? (
              <>
                <span className="font-medium text-[14px] sm:text-[16px] md:text-[18px] leading-[22px] tracking-[0.17px]">
                  Joining...
                </span>
                <div className="bg-helthy-lemon w-[28px] sm:w-[32px] md:w-[34px] h-[28px] sm:h-[32px] md:h-[34px] rounded-[30px] flex items-center justify-center">
                  <Loader2 className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-helthy-black animate-spin" strokeWidth={3} />
                </div>
              </>
            ) : (
              <>
                <span className="font-medium text-[14px] sm:text-[16px] md:text-[18px] leading-[22px] tracking-[0.17px]">
                  Join Waitlist
                </span>
                <div className="bg-helthy-lemon w-[28px] sm:w-[32px] md:w-[34px] h-[28px] sm:h-[32px] md:h-[34px] rounded-[30px] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-helthy-black" strokeWidth={3} />
                </div>
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="text-center space-y-6 py-8 animate-in fade-in zoom-in duration-500" aria-live="polite">
          {/* Animated success icon with glow */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 animate-ping">
              <div className="w-24 h-24 rounded-full bg-helthy-lemon/30"></div>
            </div>
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-helthy-lemon to-[#A8E063] flex items-center justify-center shadow-[0_0_40px_rgba(205,251,80,0.4)] animate-in zoom-in duration-300 delay-150">
              <Check className="w-12 h-12 text-helthy-black animate-in zoom-in duration-300 delay-300" strokeWidth={3} />
            </div>
          </div>

          {/* Success message with stagger animation */}
          <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <h3 className="text-4xl sm:text-5xl font-bold text-helthy-black tracking-tight">
              You're in! 🎉
            </h3>
            <p className="text-lg sm:text-xl text-helthy-black/90 font-medium max-w-md mx-auto">
              Welcome to the Helthy family
            </p>
            <p className="text-base text-helthy-black/70 max-w-lg mx-auto">
              We'll send you an email when we launch. Get ready to transform your fitness journey!
            </p>
          </div>

          {/* Confetti-like decorative elements */}
          <div className="relative h-8" aria-hidden="true">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-helthy-lemon rounded-full animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '1.5s' }}></div>
            <div className="absolute top-0 right-1/4 w-2 h-2 bg-helthy-lemon rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '1.3s' }}></div>
            <div className="absolute top-0 left-1/3 w-1.5 h-1.5 bg-helthy-black/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.7s' }}></div>
            <div className="absolute top-0 right-1/3 w-1.5 h-1.5 bg-helthy-black/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
      
