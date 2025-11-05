import { useState } from "react";
import { Check, Loader2, ArrowUpRight } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
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
        body: JSON.stringify({ email: email.trim(), firstName: firstName.trim() }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }
      setIsSubmitted(true);
      setEmail("");
      setFirstName("");
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
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0 md:grid md:grid-cols-[1fr_1fr_auto] md:gap-3">
          <input
            type="text"
            placeholder="First Name (optional)"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
            className="w-full px-5 py-3 bg-white border border-helthy-black/20 rounded-2xl text-helthy-black placeholder-helthy-black/50 focus:outline-none focus:ring-2 focus:ring-helthy-black focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          />
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
        <div className="text-center space-y-5 py-8" aria-live="polite">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-helthy-black/10">
            <Check className="w-10 h-10 text-helthy-black" />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-4xl font-bold text-helthy-black">Welcome to the future!</h3>
            <p className="text-base sm:text-lg text-helthy-black/80">You're on the list. We'll notify you when we launch.</p>
          </div>
        </div>
      )}
    </div>
  );
}
      
