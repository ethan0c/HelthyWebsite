---
name: Design Patterns & Primitives
description: Canonical design system primitives used in helthy-web — cards, spacing, headings, buttons
type: project
---

**Canonical primitives (all defined in globals.css):**
- `card-helthy`: base dark card with subtle border, 1.5rem radius, lemon ambient shadow
- `card-helthy-glow`: variant with lemon border tint + green glow (used for Premium pricing card)
- `card-helthy-hover`: hover lift + glow intensify
- `glass-card` / `glass-card-hover`: lighter frosted glass variant
- `bento-card`: simpler, less shadow — used inside card layouts
- `section-padding`: clamp(5rem, 12vh, 10rem) top/bottom — ALL marketing sections should use this
- `btn-primary`: lemon filled pill button
- `btn-secondary`: ghost pill button
- `pill-badge`: eyebrow chip with lemon tint
- `text-eyebrow`: Geist, 0.875rem, weight 600, tracking 0.2em, uppercase, lemon color

**SectionHeading component** (`components/ui/SectionHeading.tsx`): Single source of truth for section titles. Accepts eyebrow, title, italicTail, trailingPunctuation, subtitle, align props. Always renders with `text-display-xl font-heading font-light`. The italicTail gets `text-italics text-helthy-lemon` automatically.

**Section order in page.tsx:** Hero → LogoStrip → FeaturesRow → AICoachSection → IntegrationsSection → PricingSection → TransformationsSection → FAQ → CTA → Footer.

**Deleted sections:** AnalyticsSection, PhoneShowcaseFood, PhoneShowcaseWorkout — removed in refactor, narrative gap between FeaturesRow and AICoachSection exists.

**HeroSection anomaly:** Uses hardcoded inline styles for padding/background rather than `section-padding` class. Intentional since hero has unique paddingTop: 140 for nav clearance.
