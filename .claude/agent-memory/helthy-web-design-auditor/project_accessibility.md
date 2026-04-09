---
name: Accessibility Gaps
description: Recurring a11y issues found in April 2026 audit — focus styles, keyboard interaction, XSS risk
type: project
---

Zero focus-visible styles anywhere in the codebase as of April 2026. No `:focus-visible` rules in globals.css and no `focus:` Tailwind utilities used in any component. Every interactive element (nav links, CTA buttons, FAQ cards, LogoStrip icon links) is keyboard-inaccessible in a meaningful way.

dangerouslySetInnerHTML used in AICoachSection.tsx lines 250-253 to render bold markdown. The input is hardcoded CONVERSATIONS array (not user-supplied), so no live XSS risk, but the pattern is flagged for future maintenance risk if conversations ever become dynamic.

The AI "Send" button (AICoachSection line 194) has aria-label="Send" but no type="button" and no keyboard submit behavior — only visual state changes.

**How to apply:** Add a `:focus-visible` rule to globals.css targeting `a, button, [role="button"]`. Add `focus-visible:ring-2 focus-visible:ring-helthy-lemon focus-visible:outline-none` as a Tailwind base in btn-primary/btn-secondary classes.
