---
name: Mobile Token Parity
description: Mapping between mobile app token values and web usage; notes key discrepancies found in April 2026 audit
type: project
---

FeaturesRow.tsx maintains a local `T = {}` object with the mobile dark theme tokens (lines 19-36). This is the correct pattern when rendering app mockups — it's a deliberate inline snapshot, not drift.

Key discrepancy: The local T.primary is `#CDFB50` but the mobile app's `constants/colors.ts` defines primary as `#CDFF50`. The web globals.css `--helthy-lemon` is also `#CDFB50`. This 4-digit difference (#FB vs #FF) creates a subtle greenish divergence in UI mockups vs the actual app.

**How to apply:** When a component is explicitly mirroring the mobile app UI (like FeaturesRow mockups), use `#CDFF50` (mobile) not `#CDFB50` (web). For web brand elements (buttons, eyebrows, CTAs), `#CDFB50` / `var(--helthy-lemon)` is acceptable. Flag this if visual parity with screenshots becomes important.

Mobile bg token is `#111111`; web card token is `#262626` (close to mobile's `#2A2A2A`).
