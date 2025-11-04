import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoaderHollowCircles from "./components/LoaderHollowCircles";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

const App = () => {
  // If index.html added a static preloader, don't render the React loader overlay.
  const [showLoader, setShowLoader] = useState(() => !document.getElementById("hl-preloader"));

  // React overlay loader fallback: keep for at least 5s, then hide on load or after timeout.
  useEffect(() => {
    if (!showLoader) return;
    const MIN_MS = 5000;
    const start = performance.now();
    let hidden = false;
    const doHide = () => { if (!hidden) { hidden = true; setShowLoader(false); } };
    const tryHide = () => {
      const elapsed = performance.now() - start;
      const remaining = MIN_MS - elapsed;
      if (remaining > 0) window.setTimeout(doHide, remaining);
      else doHide();
    };
    if (document.readyState === "complete") tryHide();
    else {
      const onLoad = () => tryHide();
      window.addEventListener("load", onLoad, { once: true });
      const t = window.setTimeout(tryHide, MIN_MS);
      return () => { window.removeEventListener("load", onLoad); window.clearTimeout(t); };
    }
  }, [showLoader]);

  // Fade out and remove the static preloader (if present) on mount, after a 5s minimum.
  useEffect(() => {
    const el = document.getElementById("hl-preloader");
    if (!el) return;
    const MIN_MS = 5000;
    const start = (window as any).__hlPreloaderStart as number | undefined;
    const elapsed = typeof start === 'number' ? (performance.now() - start) : 0;
    const wait = Math.max(0, MIN_MS - elapsed);
    const t = window.setTimeout(() => {
      el.style.transition = "opacity 300ms ease";
      el.style.opacity = "0";
      const remove = () => el.parentElement?.removeChild(el);
      el.addEventListener("transitionend", remove, { once: true });
      window.setTimeout(() => { if (document.getElementById("hl-preloader")) remove(); }, 600);
    }, wait);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showLoader && (
          <LoaderHollowCircles
            color="#CDFB50"
            background="#151515"
            size={14}
            border={2}
            gap={10}
            fade={0.35}
            durationMs={1100}
          />
        )}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Ocelabs banner moved to Index page (inline/footer and as features button) */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
