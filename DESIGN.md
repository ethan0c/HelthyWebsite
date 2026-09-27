# Helthy web design system

Flat, clean, and consistent. Full-bleed dark and light bands alternate down the page
(MacroFactor-style), with one accent colour. All values live in `app/globals.css`.

## Themes

- The site is dark by default. Add `theme-light` to a full-bleed `<section>` to flip every
  token inside it. `theme-dark` switches back inside a light band.
- **Homepage:** alternate the bands. Never put two light bands next to each other.
- **Content pages** (tools, compare, exercises, blog, legal) stay dark. They may use one light
  band through `<Section tone="light">` in `components/seo/SeoPage.tsx`.
- Bands are always full width. Never float a rounded light panel on a dark page.

## Colour tokens (Tailwind names)

The dark and light neutrals mirror the app's `DARK_THEME` and `LIGHT_THEME` in
`helthy_app/mobile/constants/colors.ts`. Retune them together. The app's light-theme green
is not used on the site: lemon is the only brand colour.

| Role | Class | Notes |
|---|---|---|
| Page background | `bg-canvas` | |
| Card / panel | `bg-surface` | |
| Input, nested tile, hover, toggle track | `bg-surface-2` | |
| Pressed / selected neutral | `bg-surface-3` | |
| Borders | `border-line`, `border-line-strong` | 1px only |
| Text | `text-fg`, `text-fg-muted`, `text-fg-subtle` | body copy is `fg-muted` |
| Accent fill | `bg-accent` + `text-on-accent` | lemon `#CDFB50` |
| Accent as text | `text-accent-ink` | lemon on dark, deep green on light |
| Accent tint | `bg-accent-soft`, `border-accent-line` | badges, Pro highlight |

Never write `text-white`, `bg-white/5`, `border-white/10`, hex values or `rgba()` in marketing
UI. The tokens are what make light bands work. The one exception is **app mockups** (phone and
watch screens that show the real app UI): they keep the app's own colours. The macro colours
(`helthy-protein`, `-carbs`, `-fats` and so on) are for data and mockups only, never decoration.

## Type

Two families only.

| Role | Class |
|---|---|
| Hero headline (home only) | `text-display-2xl` |
| Page H1 / homepage section title | `text-display-xl` (via `<SectionHeading>`) |
| Large H2 (feature rows, pricing) | `text-display-lg` |
| Content-page H2 | `text-display-md` |
| Card / item title | `text-title` (DM Sans 500, never Unbounded) |
| Lede under a heading | `text-lede` |
| Body | DM Sans 15–16px, `text-fg-muted`, `leading-7` |
| Eyebrow / caption | 13px, `font-medium`, `text-accent-ink` or `text-fg-subtle` |
| Big numbers (prices, stats) | `text-numeric` (Unbounded) |

- Unbounded is for headings and numbers only. Everything else uses DM Sans.
- A heading can have at most one accent phrase. Headings have no trailing period (the hero's
  "Get Helthy." is the exception).
- Don't use uppercase tracking-wide labels, italic display type, or gradient text.

## Shape and depth: 2D only

- Radii: 12px `rounded-xl` for inputs and nested tiles, 16px `rounded-2xl` for cards,
  24px `rounded-3xl` for large panels and screenshots. Buttons, toggles and badges are
  `rounded-full`.
- No shadows, glows, inner bevels, gradients, glass blur, grain, noise, perspective or tilt.
  Depth comes from the surface steps and 1px lines.
- Hover changes colour only (border, background), with a 150ms transition. No lift, no scale.
- The glossy 3D clover is the logo and appears only in the hero.

## Components (use these, don't restyle ad hoc)

- **Button**: `<CTAButton variant="primary|secondary|ghost" size="sm|md|lg">`, or the classes
  `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-accent` plus `btn-sm` / `btn-lg` on a
  plain `<button>`. Primary is lemon on dark and black on light; `btn-accent` forces lemon.
  Give each band one primary button.
- **Store links**: `<StoreButtons />` (App Store primary, Google Play secondary). The labels
  are always "App Store" and "Google Play".
- **Card**: `card` (+ `card-hover` if clickable, `card-accent` for the highlighted plan or
  panel). Nested stat or result areas use `tile`.
- **Toggle**: `<Segmented>` (`components/ui/Segmented.tsx`) or the `.segmented` class with
  `aria-pressed` buttons. It's the only toggle style.
- **Badge**: `badge`, `badge-accent`.
- **Input**: `input`.
- **FAQ**: an accordion with divider lines (`FaqList` in SeoPage). No numbered cards.
- **Icons**: `lucide-react` for UI. Use `react-icons` for brand logos only (Apple, Google
  Play, X, Instagram, TikTok).

## Navigation

A full-width sticky top bar (MacroFactor / Robinhood style), not a floating pill: logo on the
left, links, and a small primary Download button on the right. Solid canvas background with a
1px bottom line.

## Layout

- `container-page` (1200px) for marketing sections and `container-narrow` (1024px) for content
  pages.
- `section` gives the vertical rhythm (80px, rising to 112px on desktop). Don't hand-roll
  section padding.

## Copy rules

Never name the vendors, models or tools behind the product: AI providers and models, backend,
auth, payments, analytics, food or exercise data sources, frameworks. Never describe internals
either (what data goes into an AI prompt, fallback providers, algorithm constants). Say what
the product does ("the coach reads your meals, workouts and weight trend"), not how it's built.
The privacy policy is the exception, because it has to disclose data processors.
