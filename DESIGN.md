# Helthy web design system

Flat, clean, and consistent. Full-bleed dark and light bands alternate down the page
(MacroFactor-style). All values live in `app/globals.css`.

## Three colours

The site uses **black, white and lemon** (`#CDFB50`), like the app's dark mode. Greys are
pure neutral steps between black and white, never blue-tinted. There is no second green:
lemon is the only brand colour.

- **Lemon is reserved.** Use it for the one highlighted phrase in a heading, the primary
  action on a dark band, and short special text (a price note, a Pro badge). Aim for one or
  two lemon moments per block. Step numbers, checkmarks, eyebrows, toggles and avatars are
  black or white, not lemon.
- **Dark bands:** black canvas, white text, and lemon as text or as a fill.
- **Light bands:** pure white canvas and black text. Lemon can't be read as text on white,
  so here it only appears as a **fill under black text**: the heading highlight becomes a
  highlighter marker, and badges become solid lemon pills. Primary buttons are black.

## Themes

- The site is dark by default. Add `theme-light` to a full-bleed `<section>` to flip every
  token inside it. `theme-dark` switches back inside a light band.
- **Homepage:** alternate the bands. Never put two light bands next to each other.
- **Single-block pages** (hubs like /blog, /tools, /exercises, /compare, plus contact, download,
  changelog, legal and 404) are one white page: `theme-light` on `<main>`, or
  `<SeoPage tone="light">`. The dark nav and footer frame them.
- **Multi-section content pages** (tool calculators, comparisons, exercise guides, blog posts,
  product landing pages) stay dark. They may use one light band through `<Section tone="light">`
  in `components/seo/SeoPage.tsx`.
- Bands are always full width. Never float a rounded light panel on a dark page.

## Colour tokens (Tailwind names)

The dark neutrals mirror the app's `DARK_THEME` in `helthy_app/mobile/constants/colors.ts`
(greys neutralised). Light bands are pure white and black.

| Role | Class | Notes |
|---|---|---|
| Page background | `bg-canvas` | |
| Card / panel | `bg-surface` | |
| Input, nested tile, hover, toggle track | `bg-surface-2` | |
| Pressed / selected neutral | `bg-surface-3` | |
| Borders | `border-line`, `border-line-strong` | 1px only |
| Text | `text-fg`, `text-fg-muted`, `text-fg-subtle` | body copy is `fg-muted` |
| Heading highlight | `text-highlight` | lemon text on dark, lemon marker on light |
| Accent fill | `bg-accent` + `text-on-accent` | lemon `#CDFB50` |
| Accent as text | `text-accent-ink` | lemon on dark, black on light |
| Accent tint | `bg-accent-soft`, `border-accent-line` | badges, Pro highlight (solid lemon / black line on light) |

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
| Eyebrow / caption | 13px, `font-medium`, `text-fg-muted` or `text-fg-subtle` |
| Big numbers (prices, stats) | `text-numeric` (Unbounded) |

- Unbounded is for headings and numbers only. Everything else uses DM Sans.
- A heading can have at most one highlighted phrase, wrapped in `<span className="text-highlight">`
  (`<SectionHeading italicTail>` does this for you). Headings have no trailing period (the hero's
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

## Logo

- **Long logo:** the HELTHY wordmark on its own, with no mark beside it. Use
  `<HelthyWordmark className="h-4 w-auto text-fg" />` (`components/ui/HelthyWordmark.tsx`),
  which takes its colour from a text token. Where a file is needed (OG image, app mockups),
  use `public/logos/logo-long-{white,black,green}.png`: the wordmark with the letters
  centred at two-thirds of the file height, so size it by height.
- **Short logo:** the dumbbell H (`public/logos/helthylogo.png`) on its own, for the favicon,
  app icon and avatars. Never put it next to the wordmark.

## Components (use these, don't restyle ad hoc)

- **Button**: `<CTAButton variant="primary|secondary|ghost" size="sm|md|lg">`, or the classes
  `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-accent` plus `btn-sm` / `btn-lg` on a
  plain `<button>`. Primary is lemon on dark and black on light; `btn-accent` forces lemon
  (lemon fill with black text reads fine on white).
  Give each band one primary button.
- **Store links**: `<StoreButtons />` (App Store primary, Google Play secondary). The labels
  are always "App Store" and "Google Play".
- **App screenshots**: `<PhoneFrame>` (`components/ui/PhoneFrame.tsx`), a flat black bezel with a
  1px line and no tilt or shadow. Use bare screen images, not pre-framed renders.
- **Card**: `card` (+ `card-hover` if clickable, `card-accent` for the highlighted plan or
  panel). Nested stat or result areas use `tile`.
- **Toggle**: `<Segmented>` (`components/ui/Segmented.tsx`) or the `.segmented` class with
  `aria-pressed` buttons. It's the only toggle style. The selected pill is white on dark and
  black on light, never lemon.
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

- `container-page` (1280px) for marketing sections and `container-narrow` (1024px) for content
  pages. Side padding is 20px, 32px from 768px and 48px from 1024px.
- `section` gives the vertical rhythm (80px, rising to 112px on desktop). Don't hand-roll
  section padding.

## Copy rules

Never name the vendors, models or tools behind the product: AI providers and models, backend,
auth, payments, analytics, food or exercise data sources, frameworks. Never describe internals
either (what data goes into an AI prompt, fallback providers, algorithm constants). Say what
the product does ("the coach reads your meals, workouts and weight trend"), not how it's built.
The privacy policy is the exception, because it has to disclose data processors.
