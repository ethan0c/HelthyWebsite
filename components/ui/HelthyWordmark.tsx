/**
 * HelthyWordmark — the long logo: HELTHY in the brand caps, no mark.
 * Traced from public/logos/logo-long-white.png (cap height 628 units).
 * Fills with currentColor, so colour it with a text token (text-fg).
 * The dumbbell H on its own is the short logo (favicon, app icon).
 */
interface HelthyWordmarkProps {
  className?: string;
  title?: string;
}

export default function HelthyWordmark({ className = "", title = "Helthy" }: HelthyWordmarkProps) {
  return (
    <svg viewBox="0 0 3219 628" className={className} fill="currentColor" role="img" aria-label={title}>
      {/* H */}
      <rect x="0" y="0" width="135" height="628" />
      <rect x="374" y="0" width="135" height="628" />
      <rect x="135" y="250" width="239" height="117" />
      {/* E */}
      <rect x="625" y="0" width="134" height="628" />
      <rect x="759" y="0" width="287" height="117" />
      <rect x="759" y="250" width="253" height="117" />
      <rect x="759" y="512" width="292" height="116" />
      {/* L */}
      <rect x="1142" y="0" width="135" height="628" />
      <rect x="1277" y="512" width="287" height="116" />
      {/* T */}
      <rect x="1487" y="0" width="505" height="117" />
      <rect x="1672" y="0" width="135" height="628" />
      {/* H */}
      <rect x="2062" y="0" width="134" height="628" />
      <rect x="2436" y="0" width="134" height="628" />
      <rect x="2196" y="250" width="240" height="117" />
      {/* Y */}
      <polygon points="2626,0 2776,0 2922.5,250 3069,0 3219,0 2989,371 2989,628 2856,628 2856,371" />
    </svg>
  );
}
