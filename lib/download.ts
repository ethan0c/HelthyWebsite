import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

/**
 * Click handler for any "Download" link pointing at /download.
 * Desktop (fine pointer): opens the floating QR code instead of navigating.
 * iPhone/iPad and Android: go straight to the right store.
 * Anything else falls through to the /download store picker.
 */
export function handleDownloadClick(e: React.MouseEvent) {
  if (window.matchMedia("(pointer: fine)").matches) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("helthy:qr-open"));
    return;
  }
  const ua = navigator.userAgent;
  const store = /iPhone|iPad|iPod/i.test(ua) ? APP_STORE_URL : /Android/i.test(ua) ? PLAY_STORE_URL : null;
  if (store) {
    e.preventDefault();
    window.location.href = store;
  }
}
