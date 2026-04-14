# Email templates

Context for Claude when working in this directory.

## How emails work here

Gmail strips `@font-face`, most `box-shadow`, and webfont `<link>` tags —
anything branded (Unbounded headings, glossy lemon buttons, gradient cards)
will fall back to system fonts if sent as plain HTML.

**The workaround:** author the email in CSS once (`source.html`), render
the brand-critical regions to PNG via a headless Chrome script, and ship
a hybrid HTML that combines those PNGs with plain-text sections.

Full explanation in [EMAIL_GUIDE.md](./EMAIL_GUIDE.md). Read it before
making non-trivial changes.

## Directory layout

```
_template/              starter kit (copy, don't edit)
  source.html           CSS authoring — real webfonts + gradients
  email.html            ship-ready wrapper referencing PNGs
  img/                  populated by the render script

<campaign>/             e.g. v2-launch/
  source.html
  email.html
  loops.mjml            optional Loops MJML version
  img/

EMAIL_GUIDE.md          full doc
```

## Building a new email

1. `cp -R email-templates/_template email-templates/<campaign>`
2. Edit `source.html` — copy, colors, imagery. Keep every `data-email-crop`
   attribute on regions that must stay brand-accurate.
3. `python3 scripts/render_email_images.py email-templates/<campaign>/source.html`
4. Paste the printed dimensions into `email.html`, update copy/links.
5. Open `email.html` in a browser to preview.

There is a dedicated `email-builder` subagent for this workflow — prefer
`Agent({ subagent_type: "email-builder" })` when building a new email
end-to-end. Use direct edits for surgical copy changes.

## Design tokens (keep in sync with helthy-web)

- Lemon: `#CDFF50` · ink on lemon: `#0B0B0B`
- Body bg: `#0F0F0F → #1A2024 → #1F282E → #0F0F0F` (gradient)
- Card bg: `#151515`; card gradient `#212121 → #161616`; border `#2A2A2A`
- Headings/labels/CTAs: Unbounded (500)
- Body: DM Sans (400/500)
- System fallback for plain-HTML text: `-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif`

## Rules

- **Never inline webfonts in `email.html`** — they won't load in Gmail.
  Brand typography only appears via PNG.
- **Always preserve `[data-email-crop]` attributes** in `source.html`.
  Removing them breaks the render script.
- **Don't edit `img/` files directly** — regenerate via the script so
  `source.html` stays authoritative.
- **Never commit webfont files** beyond what's already in `public/fonts/`.
  The script uses Google Fonts CDN at render time.
- **Container width is 560px** — content area 480px (40px padding).
- **All text in shipped images must be real text at render time** (not
  lorem ipsum) so crops are final. Placeholders like `{{first_name}}` go
  only in `email.html`, never in the cropped regions.
- **Test renders in a browser, not just by reading code.** The whole
  point of the image pipeline is that it looks different than raw HTML
  suggests.

## Commit hygiene

- Generated PNGs in `img/` get committed — they're the shipped artifact.
- Don't commit temporary Chrome screenshots, `/tmp` files, or the
  intermediate `_marked.html` the script creates.
