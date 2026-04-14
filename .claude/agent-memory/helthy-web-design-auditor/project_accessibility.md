---
name: Accessibility Gaps
description: Recurring a11y issues found in April 2026 audit — focus styles, keyboard interaction, XSS risk
type: project
---

As of April 2026: `:focus-visible` IS now defined in globals.css (lines 146-155) — `outline: 2px solid var(--helthy-lemon); outline-offset: 3px; border-radius: 4px`. The base rule exists. However, many interactive elements inline `style={{ ... }}` overrides that may obscure the outline, and the rule is not applied via Tailwind utilities on any component — it relies solely on the browser respecting the global CSS cascade.

dangerouslySetInnerHTML used in AICoachSection.tsx lines 250-253 to render bold markdown. The input is hardcoded CONVERSATIONS array (not user-supplied), so no live XSS risk, but the pattern is flagged for future maintenance risk if conversations ever become dynamic.

The AI "Send" button (AICoachSection line 194) has aria-label="Send" but no type="button" and no keyboard submit behavior — only visual state changes.

**How to apply:** Add a `:focus-visible` rule to globals.css targeting `a, button, [role="button"]`. Add `focus-visible:ring-2 focus-visible:ring-helthy-lemon focus-visible:outline-none` as a Tailwind base in btn-primary/btn-secondary classes.
