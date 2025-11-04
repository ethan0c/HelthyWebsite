import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Do not close if clicking the toggle button; rely on button to toggle
        // Keep panel open unless explicit close
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Placeholder: wire real chat later
    setInput("");
  };

  return (
    <div className="fixed z-50" style={{ right: "calc(env(safe-area-inset-right) + 16px)", bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}>
      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="mb-3 w-[320px] sm:w-[360px] rounded-2xl border border-black/10 bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] overflow-hidden"
          role="dialog"
          aria-modal="false"
          aria-labelledby="helthy-ai-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-helthy-lemon/90">
            <div className="flex items-center gap-2">
              <img src="/figma-components/hero/logo.png" alt="HELTHY" className="h-5 w-5 rounded" />
              <div className="text-sm font-medium text-helthy-black" id="helthy-ai-title">HELTHY AI</div>
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-helthy-black/70 hover:bg-black/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3 space-y-3 max-h-[50vh] overflow-auto">
            <div className="text-sm text-gray-700">
              Ask anything about your workouts, meals, or habits.
            </div>
            <div className="flex flex-wrap gap-2">
              {["Best post-run meal?", "3-day beginner plan", "Improve sleep"].map((t) => (
                <button
                  key={t}
                  onClick={() => setInput(t)}
                  className="px-2.5 py-1.5 rounded-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-800"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="border-t border-gray-200 p-2 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask HELTHY AI…"
              className="flex-1 rounded-full border border-gray-300 px-3 py-2 text-sm outline-none focus:border-helthy-lemon"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-full bg-helthy-lemon text-helthy-black px-3 py-2 text-sm font-medium hover:bg-helthy-lemon/90"
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-helthy-black shadow-[0_10px_30px_rgba(0,0,0,0.25)] border border-white/60 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-helthy-lemon overflow-hidden"
        aria-label={open ? "Close HELTHY AI chat" : "Open HELTHY AI chat"}
      >
        <img
          src="/logo-green-black.svg"
          alt="HELTHY logo"
          className="h-12 w-12 md:h-12 md:w-12 object-contain pointer-events-none select-none"
        />
        {/* Unread dot example (hidden by default) */}
        {/* <span className="absolute -top-0.5 -right-0.5 inline-block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" /> */}
      </button>
    </div>
  );
}
