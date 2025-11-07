import { useState } from "react";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !message) {
      setError("Please provide your email and a message.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to send message");
      setSuccess("Thanks! We'll be in touch shortly.");
      setFirstName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-helthy-black text-white">

      <section className="relative pt-28 md:pt-36 pb-16">
        <div className="container mx-auto px-6 lg:px-20 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm">
              Contact us
            </div>
            <h1 className="text-4xl md:text-5xl font-normal leading-[1.15] text-helthy-lemon mt-4">
              We’d love to hear from you
            </h1>
            <p className="text-white/80 mt-3">Questions, partnerships, or feedback—drop us a line.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name (optional)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-helthy-lemon/70"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-helthy-lemon/70"
              />
            </div>
            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-helthy-lemon/70"
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-3 rounded-full bg-helthy-lemon text-helthy-black px-6 py-3 font-medium hover:bg-helthy-lemon/90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending…" : "Send Message"}
              </button>
              {success && <span className="text-emerald-400 text-sm">{success}</span>}
              {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>
          </form>

          <div className="mt-10 text-center text-white/70 text-sm">
            Prefer email? Reach us at <a href="mailto:hello@helthy.app" className="underline hover:text-white">hello@helthy.app</a>
          </div>
        </div>
      </section>
    </div>
  );
}
