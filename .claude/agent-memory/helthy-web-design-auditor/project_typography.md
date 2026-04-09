---
name: Typography System
description: Font stack and usage rules for helthy-web — Lyon Display for headings, Geist for body/UI, Unbounded for numerics
type: project
---

Three-font system defined in globals.css and enforced via CSS classes:
- `font-heading` / `text-display-*` classes: Lyon Display, weight 300 only (never bold — rule is in a CSS comment at line 162). Italic emphasis done via `.text-italics` class.
- `font-body` / `font-display`: Geist, used for UI labels, eyebrows, body copy
- `font-numeric`: Unbounded, used for numeric values (weight, calories, durations)

SectionHeading component (`components/ui/SectionHeading.tsx`) is the canonical heading primitive. It always uses `text-display-xl` + `font-heading font-light`, with italic tail via `text-italics text-helthy-lemon`. All sections use this component correctly.

Display scale: `text-display-2xl` (clamp 3.25rem→8.5rem), `text-display-xl` (clamp 2.5rem→4.5rem), `text-display-lg` (clamp 2rem→3.25rem), `text-display-md` (clamp 1.375rem→2rem).

**How to apply:** Never apply `font-bold` or `font-semibold` to Lyon Display elements. Use color or italic for emphasis. Numeric displays (calories, weight, duration) always get `font-numeric` + Unbounded.
