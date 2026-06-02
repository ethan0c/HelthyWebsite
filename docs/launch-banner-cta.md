# Launch banner CTA — current behavior & post-launch plan

The dismissible launch bar lives in [`components/sections/LaunchBanner.tsx`](../components/sections/LaunchBanner.tsx).

## Now (pre-Android launch)

- Copy: **"Helthy Pro is live on iOS. Android lands June 12."**
- The **"Get Pro →"** link goes **straight to the App Store** (`APP_STORE_URL`, opens in a new tab).
- Rationale: Pro is iOS-only today, so there's only one place to send people. No platform choice to make yet.

## After Android launches (~June 12)

Once Helthy is on both iOS and Android, a single App Store link no longer makes sense. Change the banner CTA to:

1. **Scroll to the hero section** (`href="/#hero"` or whatever the hero anchor is — confirm before wiring) instead of linking out, so the user lands where both the **iOS** and **Android** download buttons live and can pick their platform.
2. **Add a QR code for desktop / non-mobile visitors.** Anyone reading the banner on a laptop can't tap through to an app store usefully — a QR code lets them grab the app on their phone immediately.

   **Done (June 2026):** [`components/ui/HeroQRCode.tsx`](../components/ui/HeroQRCode.tsx) renders an inline "Scan to download" chip beside the hero's iOS/Android buttons, desktop-only (`(pointer: fine)` + `sm:`). Clicking the chip expands a larger scannable QR in a popover. The QR is a static PNG at `/public/qr-appstore.png` encoding the App Store URL, generated with the `qrcode` npm package (`--no-save`, not a project dependency). **When Android launches, regenerate the QR to point at a smart/deferred link (iOS vs Android) instead of the App Store directly, and update the chip/popover copy from "iOS" to neutral.**

### Open questions to resolve at launch
- Confirm the hero's anchor id and that both store buttons are present there.
- Where should the QR point — a smart/deferred link (detects iOS vs Android) or a landing page with both?
- Generate the QR at build time (static asset) vs. render client-side.

## Related
- `APP_STORE_URL` is duplicated as a local const across several components (LogoStrip, CTASection, TestimonialsSection, PricingSection, LaunchBanner). If this grows, consider centralizing it in `lib/`.
