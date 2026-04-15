# Email Guide

How to build new Helthy emails that look right in Gmail, Apple Mail, and Outlook.

## The core problem

Gmail strips `@font-face`, most `box-shadow` rules, gradients on arbitrary
elements, and `<link>` tags to webfonts. Anything branded (Unbounded headings,
glossy lemon buttons, gradient cards) will render as flat system-font text if
sent as plain HTML.

**Solution:** author the email in CSS once, render brand-critical sections
to PNG, ship a hybrid HTML that combines PNG images with plain-text sections.

## Workflow

1. `cp -R email-templates/_template email-templates/<campaign-name>`
2. Edit `source.html` — copy, colors, imagery. Leave the `data-email-crop`
   attributes on each region you want preserved as-is in Gmail.
3. Run `python3 scripts/render_email_images.py email-templates/<campaign-name>/source.html`.
   This generates PNG crops under `email-templates/<campaign-name>/img/` and
   prints ready-to-paste `<img>` tags with the correct dimensions.
4. Paste those dimensions into `email.html`, update copy/links, and preview
   it in a browser.
5. Test by sending to yourself via Loops (or your ESP of choice).

## When to use images vs. plain HTML

| Section | Use | Why |
|---|---|---|
| Hero (logo + headline + intro) | Image | Brand typography is the point |
| Feature cards | Image | Gradients, inset shadows, custom fonts |
| Premium / pricing cards | Image | Lemon gradient + glossy CTA |
| Primary CTAs inside cards | Baked into image | Clickability comes from wrapping `<a>` |
| Secondary / store buttons | Image | System fonts lack brand feel |
| Signature | Plain HTML | Not brand-critical; keep it selectable |
| Footer (unsubscribe, address) | Plain HTML | Required by law to be real text |
| Preheader | Plain HTML | Gmail reads this as the preview |

## Design tokens

These match the site's `globals.css` and should stay in sync with it.

**Colors**
- Lemon: `#CDFF50`
- Ink (dark text on lemon): `#0B0B0B`
- Background dark: `#0F0F0F` → body gradient → `#1F282E`
- Card bg: `#151515`
- Card gradient: `#212121 → #161616`
- Card border: `#2A2A2A`

**Fonts**
- Headings / labels / CTAs: Unbounded (Medium 500)
- Body: DM Sans (Regular 400, Medium 500)
- System fallback for plain-HTML sections: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`

**Components** — already defined in `_template/source.html`:
`.h1`, `.eyebrow`, `.label`, `.card-title`, `.body`, `.card`, `.premium`,
`.btn-primary`, `.btn-secondary`, `.accent-line`.

## Marking crop regions

Any element you want preserved as an image gets two attributes:

```html
<div data-email-crop="card-1" data-email-bg="#151515" class="card">
  …
</div>
```

- `data-email-crop` — the output PNG filename (`img/card-1.png`)
- `data-email-bg` — hex color to fill behind any transparent pixels. Match
  the surrounding area so the crop blends in. Required because PNG alpha
  is unreliable across email clients.

The script auto-detects the bounding box, renders the whole `source.html`
in headless Chrome at 2x DPI (so text stays crisp on retina), crops each
region, and writes it to `img/`.

## Dimensions

- Container: 560px wide. With 40px side padding, content area is 480px.
- Images render at 2x DPI — the script reports *display* dimensions (halved).
- Put `width="<display_w>" height="<display_h>"` on `<img>` tags. This
  prevents Outlook from stretching them and helps mobile clients layout
  before the image loads.
- For responsive mobile scaling use `style="width:100%;max-width:<display_w>px;height:auto;"`.

## Dark mode (Gmail — iOS & Android)

Gmail applies its own forced dark mode (on both iOS and Android) and
**inverts near-black backgrounds** — `#151515` becomes near-white, `#111111`
becomes light gray. The `color-scheme: dark` meta tag alone does not stop this.
Gmail's rendering engine is identical on both platforms so the fix is the same.

**Required pattern for every `email.html`:**

1. **`[data-ogsc]` CSS rules** — Gmail adds this attribute to `<html>` when
   in dark mode. Rules in the `<style>` block targeting `[data-ogsc]` run
   after Gmail's transformation and restore original colors:

   ```css
   [data-ogsc] body        { background-color: #0F0F0F !important; }
   [data-ogsc] .outer-wrap { background-color: #141A1E !important; }
   [data-ogsc] .inner-card { background-color: #151515 !important; }
   [data-ogsc] .body-pad   { background-color: #151515 !important; }
   [data-ogsc] .footer-bg  { background-color: #111111 !important; }
   [data-ogsc] .sig-text   { color: #9A9A9A !important; }
   [data-ogsc] .sig-ps     { color: #777777 !important; }
   [data-ogsc] .footer-text{ color: #666666 !important; }
   [data-ogsc] a.footer-link { color: #666666 !important; }
   ```

2. **`bgcolor=""` HTML attributes** — add to every `<table>` and `<td>` that
   carries a dark background via inline `style`. Some clients ignore `<style>`
   blocks entirely; `bgcolor` is the last-resort fallback:

   ```html
   <td class="body-pad" bgcolor="#151515" style="background-color:#151515;…">
   ```

3. **Class names** — the `[data-ogsc]` selectors target class names, not
   element types. Apply them consistently: `outer-wrap`, `inner-card`,
   `body-pad`, `footer-bg`, `sig-text`, `sig-ps`, `footer-text`, `footer-link`.

The `_template/email.html` starter already includes all of the above.
PNG image regions are immune to dark mode inversion — only the plain-HTML
wrapper cells (background colors, signature text, footer text) need protection.

## Gotchas

- **Webfont loading timing** — the script waits for `document.fonts.ready`
  plus 500ms before measuring. If your hero looks clipped, your font is
  slow; bump the delay in `render_email_images.py`.
- **Template placeholders in source.html** — `{{first_name}}` etc. will
  literally render if left in. Use a static fallback ("Hey") when generating
  the PNG, and only add placeholders in `email.html` where they stay as text.
- **Chrome path is hardcoded** for macOS. On Linux/WSL, edit `CHROME` at
  the top of the script.
- **Store button icons** — use SVGs inline in `source.html`. The site uses
  the H-mark for the App Store button and a play triangle for Google Play;
  see `_template/source.html` for the paths.
- **File size** — each card crops to ~15-30KB. Total emails stay well under
  the Gmail 102KB clip threshold even with 6+ images.

## Directory layout

```
email-templates/
  _template/            — starter kit (do not edit, copy it)
    source.html         — CSS authoring file
    email.html          — ship-ready image-based wrapper
    img/                — populated by the render script
  EMAIL_GUIDE.md        — this file
  v2-launch/            — an example campaign
  <your-campaign>/
    source.html
    email.html
    img/
scripts/
  render_email_images.py
```

## Loops upload

If shipping via Loops, create a sibling `loops.mjml` that mirrors
`email.html` using MJML components. Zip `loops.mjml` + `img/` at the root
level and upload to Loops. Don't reference external URLs — Loops inlines
the images from the zip.
