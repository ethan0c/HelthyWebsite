'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/dismissed the banner
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
  };

  const dismissBanner = () => {
    localStorage.setItem('cookie-consent', 'dismissed');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-neutral-300">
              We use essential cookies to ensure our website works properly. 
              No tracking or analytics cookies are used. 
              <a 
                href="/privacy" 
                className="text-helthy-lemon hover:underline ml-1"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={acceptCookies}
              className="px-4 py-2 bg-helthy-lemon text-black rounded-lg text-sm font-medium hover:bg-helthy-lemon/90 transition-colors"
            >
              Got it
            </button>
            <button
              onClick={dismissBanner}
              className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
              aria-label="Dismiss cookie banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
