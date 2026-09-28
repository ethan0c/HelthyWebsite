"use client";

import CTAButton from "@/components/ui/CTAButton";
import { handleDownloadClick } from "@/lib/download";

/**
 * The single "Download" button used everywhere outside the nav (the nav
 * keeps the App Store / Google Play pair). Desktop opens the QR popup,
 * phones go straight to their store; /download is only the fallback.
 */
export default function DownloadButton({
  size = "md",
  label = "Download",
}: {
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  return (
    <CTAButton href="/download" size={size} onClick={handleDownloadClick}>
      {label}
    </CTAButton>
  );
}
