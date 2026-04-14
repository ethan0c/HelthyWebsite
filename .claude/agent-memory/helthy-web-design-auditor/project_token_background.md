---
name: Token & Background Color Issues
description: Background token is Steel Teal (#607C8A) everywhere — a critical brand violation discovered in the first audit (April 2026)
type: project
---

Updated April 2026 audit: The `--background` CSS token is now `#0A0A0A` (globals.css line 59) — close to but not exactly matching the mobile app's `#111111` bg token. HeroSection uses a hardcoded `backgroundColor: "#0A0A0A"` inline style (line 50). FeaturesRow uses `backgroundColor: "#191B1D"` (line 68), which is warmer/slightly teal-tinted and deviates from the dark system. PricingSection outer container uses `#EBEBEB` light mode (not a token). These three distinct backgrounds create visual segmentation — intentional but inconsistent with a strict token system.

**How to apply:** FeaturesRow's `#191B1D` should be audited — it reads as slightly warm charcoal and may be intentional for contrast against the hero. If so, add it as a named token (e.g. `--helthy-section-alt`). The mobile app bg token is `#111111`.
