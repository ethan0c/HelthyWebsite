import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974";

interface AppStoreBadgeProps {
  className?: string;
}

/**
 * Apple App Store badge button. Shared between hero (PR 1) and pricing
 * comparison section (PR 3). Lemon-glow on hover, pill geometry to match
 * the existing .btn-primary visual language.
 */
export default function AppStoreBadge({ className = "" }: AppStoreBadgeProps) {
  return (
    <Link
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Helthy on the App Store"
      className={`group inline-flex items-center gap-3 rounded-full bg-white/[0.06] border border-white/15 px-5 py-3 text-white transition-all duration-300 hover:bg-white/[0.1] hover:border-helthy-lemon/30 hover:shadow-[0_8px_30px_rgba(205,251,80,0.18)] ${className}`}
    >
      <svg
        viewBox="0 0 384 512"
        className="h-7 w-7 fill-white transition-colors group-hover:fill-helthy-lemon"
        aria-hidden="true"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">
          Download on the
        </span>
        <span className="mt-0.5 text-base font-semibold tracking-tight">
          App Store
        </span>
      </div>
    </Link>
  );
}
