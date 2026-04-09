---
name: Token & Background Color Issues
description: Background token is Steel Teal (#607C8A) everywhere — a critical brand violation discovered in the first audit (April 2026)
type: project
---

The `--background` CSS token in `globals.css` line 52 is `#607C8A` (Steel Teal / `--helthy-border-strong`), NOT the brand-spec deep charcoal. This bleeds into `app/layout.tsx` body class (`bg-[#607C8A]`) and `HeroSection.tsx` inline style (`backgroundColor: "#607C8A"`).

The brand spec calls for `--helthy-black: #151515` (Deep Charcoal) as the page background. The current token is `#0B0B0B` which is also slightly off from the brand doc's #151515.

**Why:** Appears to be an intentional but unresolved experiment — Steel Teal was likely used as a placeholder or for a colorful hero background, and never reverted before the refactor commits.

**How to apply:** Any future background color change must update `--background` in globals.css, the body class in layout.tsx, AND the HeroSection inline style — all three are coupled. The mobile app bg token is `#111111`.
