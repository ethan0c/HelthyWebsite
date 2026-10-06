# Helthy web design system

Flat, clean, and consistent. Full-bleed dark and light bands alternate down the page
(MacroFactor-style). All values live in `app/globals.css`.

## Three colours

The site uses **black, white and lemon** (`#CDFB50`), like the app's dark mode. Greys are
pure neutral steps between black and white, never blue-tinted. There is no second green:
lemon is the only brand colour.

- **Lemon is reserved.** Use it for the one highlighted phrase in a heading, the buttons
  that get the app (Download, App Store), short special text (a price note, a Pro badge), and the hover marker
  on nav links. Aim for one or two lemon moments per block. Step numbers, checkmarks, eyebrows, toggles and avatars are
  black or white, not lemon.
- **Dark bands:** black canvas, white text, and lemon as text or as a fill.
- **Light bands:** pure white canvas and black text. Lemon can't be read as text on white,
  so here it only appears as a **fill under black text**: the heading highlight becomes a
  highlighter marker, and badges become solid lemon pills.

## Themes

- The site is dark by default. Add `theme-light` to a full-bleed `<section>` to flip every
  token inside it. `theme-dark` switches back inside a light band.
- **Homepage:** alternate the bands. Never put two light bands next to each other.
- **Single-block pages** (hubs like /blog, /tools, /exercises, /compare, plus contact, download,
  changelog, legal and 404), **blog posts** and **exercise guides** (long reading is easier on
  white) are one white page: `theme-light` on `<main>`, or `<SeoPage tone="light">`. The dark
  nav and footer frame them.
- **Multi-section content pages** (pricing, tool calculators, comparisons, product landing
  pages) stay dark. They may use one light band through `<Section tone="light">`
  in `components/seo/SeoPage.tsx`.
- Bands are always full width. Never float a rounded light panel on a dark page. The one
  exception is the recommended plan on /pricing: a white card beside the dark Free card, so the
  pair reads light vs dark.

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
| Card / item title | `text-title` (Geist 500, never Unbounded) |
| Lede under a heading | `text-lede` |
| Body | Geist 15–16px, `text-fg-muted`, `leading-7` |
| Eyebrow / caption | 13px, `font-medium`, `text-fg-muted` or `text-fg-subtle` |
| Big numbers (prices, stats) | `text-numeric` (Unbounded) |

- Unbounded is for headings and numbers only. Everything else uses Geist.
- A heading can have at most one highlighted phrase, wrapped in `<span className="text-highlight">`
  (`<SectionHeading italicTail>` does this for you). Headings have no trailing period (the hero's
  "Every meal. Every set." is the exception).
- On light bands the highlight marker is a band behind the letters, not a full box, so it
  never covers descenders on the line above in tight display line-heights. Don't override
  `.text-highlight` with a solid `background`.
- Don't use uppercase tracking-wide labels, italic display type, or gradient text.

## Shape and depth: 2D only

- Radii: 12px `rounded-xl` for inputs and nested tiles, 16px `rounded-2xl` for cards,
  24px `rounded-3xl` for large panels and screenshots. Buttons, toggles and badges are
  `rounded-full`.
- No shadows, glows, inner bevels, gradients, glass blur, grain, noise, perspective or tilt.
  Depth comes from the surface steps and 1px lines. **Exception:** the homepage hero's device
  row uses photographic device renders (`components/ui/DeviceFrame.tsx`), laid out like
  MacroFactor's: the Apple Watch (left) and iPhone (middle) straight on, the Android phone
  (right) turned in 3D. The 3D turn stays inside that one row.
  Everywhere else, phones use the flat `PhoneFrame`. The Apple Watch always uses the photo
  watch (`<DeviceFrame device="watch">` with a live `<WatchScreen>`), in the hero and out.
- Hover changes colour only (border, background), with a 150ms transition. No lift, no scale.
  What may move is listed under Motion.
- The glossy 3D clover is the logo and appears only in the homepage's closing CTA
  ("Get [clover] Helthy") and as the AI coach's avatar.

## Motion

Motion shows where something came from or went. It never decorates, and it stays flat: no
bounce, no lift, no hover scale, no shadows.

- **Colour** changes take 150ms with `ease`.
- **Anything that moves** uses the one curve, `var(--ease-out)`, for 200 to 320ms on the way in.
  Things leave faster than they arrive (about 180ms).
- **Reveal by clipping, not sliding.** Panels wipe open from the edge they hang from
  (`.nav-panel`), so nothing travels over its neighbours. Content inside may drift 8px as it
  fades in.
- **One shape moves instead of two fading.** A selection or hover indicator slides to its new
  place: the nav hover marker (`.nav-marker`) and the toggle's selected pill (`useSegmentedThumb`).
- **Arrows lean 3px** toward where a link goes on hover: wrap the arrow in `.nudge`.
- **Press**: buttons scale to 0.98 while held. This is the only scale on the site.
- **Open and close are both animated.** The FAQ row (`FaqItem`) animates its height both ways
  and reverses if clicked mid-way.
- `prefers-reduced-motion` turns all of it off (handled globally in `globals.css`; JS animations
  check `prefersReducedMotion()`).

## Logo

- **Long logo:** the HELTHY wordmark on its own, with no mark beside it. Use
  `<HelthyWordmark className="h-4 w-auto text-fg" />` (`components/ui/HelthyWordmark.tsx`),
  which takes its colour from a text token. Where a file is needed (OG image, app mockups),
  use `public/logos/logo-long-{white,black,green}.png`: the wordmark with the letters
  centred at two-thirds of the file height, so size it by height.
- **Short logo:** the dumbbell H (`public/logos/helthylogo.png`) on its own, for the favicon,
  app icon and avatars. Never put it next to the wordmark.

## Components (use these, don't restyle ad hoc)

- **Button**: `<CTAButton variant="primary|secondary|ghost|accent" size="sm|md|lg">`, or the
  classes `btn-primary` / `btn-secondary` / `btn-ghost` / `btn-accent` plus `btn-sm` / `btn-lg`
  on a plain `<button>`. They match the app's `PillButton`:
  - **Primary** is ink: white with black text on dark, black with white text on light.
  - **Secondary** is a borderless fill: `#262626` (the app's card) on dark, `#EDEDED` on light.
  - **Accent** is lemon with black text, on any band. It's only for getting the app
    (`DownloadButton`, the App Store half of `StoreButtons`), like the app keeps lemon for a
    short list of standout actions.
  Give each band one primary or accent button.
- **Download**: `<DownloadButton />`, one button per spot: the hero and the closing band. It
  opens a QR popup on desktop and goes straight to the right store on phones. The
  App Store / Google Play pair (`<StoreButtons />`, labels always "App Store" and
  "Google Play") appears only in the nav and on the `/download` fallback page. Never put the
  pair, or two download CTAs, in the same band.
- **App screenshots**: `<PhoneFrame>` (`components/ui/PhoneFrame.tsx`), a flat black bezel with a
  1px line and no tilt or shadow. Use bare screen images, not pre-framed renders.
- **Card**: `card` (+ `card-hover` if clickable, `card-accent` for a highlighted panel). Nested stat or result areas use `tile`.
- **Toggle**: `<Segmented>` (`components/ui/Segmented.tsx`) or the `.segmented` class with
  `aria-pressed` buttons. It's the only toggle style. The selected pill is white on dark and
  black on light, never lemon. With a hand-written `.segmented`, put the ref from
  `useSegmentedThumb()` on it so the pill slides.
- **Badge**: `badge`, `badge-accent`, for short labels like Pro. Pricing details (founders price,
  discounts) are plain text next to the price, not pills.
- **Input**: `input`.
- **FAQ**: an accordion with divider lines (`FaqList` in SeoPage), built from `FaqItem`
  (`components/ui/FaqItem.tsx`) rows. No numbered cards.
- **Comparison table**: `CompareTable` in SeoPage. Checkmarks are `text-fg`. `highlightFirst`
  (default) emphasises the Helthy column on vs pages; pass `highlightFirst={false}` when the
  columns are equals (Free vs Pro).
- **Download CTA**: `DownloadBanner` in SeoPage, always passed to SeoPage's `closing` slot so it
  runs full width and flush against the footer. It's text only (no app screenshot): heading on
  the left, line and store buttons on the right. Its tone is the opposite of the page: the
  default light band on dark pages, `tone="dark"` on white pages. Never a floating card mid-page.
- **Icons**: `lucide-react` for UI. Use `react-icons` for brand logos only (Apple, Google
  Play, X, Instagram, TikTok).

## Navigation

A full-width sticky top bar (MacroFactor / Robinhood style), not a floating pill: logo on the
left, links, and a small primary Download button on the right. Solid canvas background with a
1px bottom line. Top-level items: Product and Resources (hover menus), Blog, Pricing
(`/pricing`); Contact and Download sit on the right. The nav stays dark on every page.

Link states: muted grey at rest, white for the current page. Hover is the heading highlight used
as a hover: one lemon marker with black text (`.nav-marker`) glides between the hovered links
and rests on the open menu's trigger. Menus wipe down from the bar, the page behind dims, and
moving between Product and Resources slides the content sideways. In a menu, the hovered or
current link's icon tile turns white.

## Layout

- Every page uses `container-page` (1280px), so content lines up with the homepage and the nav.
  Cap reading width on the text itself (`max-w-3xl` for headings and articles), not the container. Side padding is 20px, 32px from 768px and 48px from 1024px.
- `section` gives the vertical rhythm (80px, rising to 112px on desktop). Don't hand-roll
  section padding.

## Copy rules

Never name the vendors, models or tools behind the product: AI providers and models, backend,
auth, payments, analytics, food or exercise data sources, frameworks. Never describe internals
either (what data goes into an AI prompt, fallback providers, algorithm constants). Say what
the product does ("the coach reads your meals, workouts and weight trend"), not how it's built.
The privacy policy is the exception, because it has to disclose data processors.
