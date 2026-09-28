<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design and copy rules

Follow `DESIGN.md` for all UI work: tokens only (no raw hex, `text-white` or `bg-white/…`), flat 2D, alternating `theme-light` / dark bands, and the shared Button, Card, Segmented and StoreButtons components.

Never name the vendors, models or tools the app is built on (AI providers or models, backend, auth, payments, data sources), and never describe internals such as AI prompt context, fallback providers or algorithm constants in public copy, structured data or `llms.txt`. The privacy policy is the only exception.
