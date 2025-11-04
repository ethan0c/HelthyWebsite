# HelthyWebsite## Stack



A unified Next.js website for Helthy.- Next.js 16 (App Router, RSC-first)

- TypeScript

## Stack- Tailwind CSS v4 (+ tailwindcss-animate)

- GSAP (ScrollTrigger, Flip) + Lenis smooth scroll

- Next.js 16 (App Router, RSC-first)- Framer Motion (micro-interactions)

- TypeScript- Zustand (tiny state)

- Tailwind CSS v4 (+ tailwindcss-animate)- Zod + React Hook Form (validation/forms)

- GSAP (ScrollTrigger, Flip) + Lenis smooth scroll- lucide-react (icons)

- Framer Motion (micro-interactions)

- Zustand (tiny state)## What’s included

- Zod + React Hook Form (validation/forms)

- lucide-react (icons)- Global providers for GSAP and Lenis: `components/providers/GSAPProvider.tsx`, `components/providers/LenisProvider.tsx`

- Animated sections:

## Project Structure	- `components/sections/Hero.tsx` (entrance timeline + Motion CTA)

	- `components/sections/Features.tsx` (ScrollTrigger-reveal cards)

```- Form setup: `components/forms/ContactForm.tsx` + API route `app/api/contact/route.ts`

app/                          # Next.js App Router pages- Zustand store: `lib/store/ui.ts`

  ├── api/                    # API routes (contact, waitlist)- Utility: `lib/utils/cn.ts` (clsx + tailwind-merge)

  ├── about/                  # About page

  ├── contact/                # Contact pageTailwind v4 is enabled via PostCSS with `@import "tailwindcss"` in `app/globals.css` and the `@plugin "tailwindcss-animate"` directive.

  ├── pricing/                # Pricing page

  └── legacy-pages/           # Legacy page components (for reference)## Run locally

components/

  ├── forms/                  # Form components```powershell

  ├── providers/              # GSAP & Lenis providersnpm install

  ├── sections/               # Page sections (Hero, Features)npm run dev

  ├── ui/                     # UI primitives (shadcn/ui)```

  └── legacy/                 # Legacy components (migrated from old structure)

lib/Open http://localhost:3000. Scroll to see section reveals; try the contact form (echo API).

  ├── store/                  # Zustand stores

  ├── utils/                  # Utility functions## Using shadcn/ui (optional)

  └── legacy/                 # Legacy utilities

hooks/                        # Custom React hooksThis repo is Tailwind v4-ready. If you want shadcn/ui component primitives:

netlify/                      # Netlify serverless functions (if deployed to Netlify)

public/                       # Static assets```powershell

```npx shadcn@latest init

npx shadcn@latest add button card input textarea label

## What's included```



- Global providers for GSAP and Lenis: `components/providers/GSAPProvider.tsx`, `components/providers/LenisProvider.tsx`The project already includes peer utilities (`class-variance-authority`, `tailwind-merge`, `clsx`) and `tailwindcss-animate`.

- Animated sections:

	- `components/sections/Hero.tsx` (entrance timeline + Motion CTA)## Notes

	- `components/sections/Features.tsx` (ScrollTrigger-reveal cards)

- Form setup: `components/forms/ContactForm.tsx` + API route `app/api/contact/route.ts`- Lenis is synced to GSAP’s ticker so ScrollTrigger stays perfectly in step.

- Zustand store: `lib/store/ui.ts`- If you add more scroll timelines, register them in client components; providers already register GSAP plugins globally.

- Utility: `lib/utils/cn.ts` (clsx + tailwind-merge)- Media: Prefer `next/image`. For video, consider Mux Player or Vercel Blob for lightweight hosting.

- Custom hooks: `hooks/use-mobile.tsx`, `hooks/use-toast.ts`

- Legacy components preserved in `components/legacy/` for reference and gradual migration## Deploy



Tailwind v4 is enabled via PostCSS with `@import "tailwindcss"` in `app/globals.css` and the `@plugin "tailwindcss-animate"` directive.Project builds with `npm run build`. Deploy easily on Vercel.


## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000. Scroll to see section reveals; try the contact form (echo API).

## Using shadcn/ui (optional)

This repo is Tailwind v4-ready. If you want shadcn/ui component primitives:

```powershell
npx shadcn@latest init
npx shadcn@latest add button card input textarea label
```

The project already includes peer utilities (`class-variance-authority`, `tailwind-merge`, `clsx`) and `tailwindcss-animate`.

## Notes

- Lenis is synced to GSAP's ticker so ScrollTrigger stays perfectly in step.
- If you add more scroll timelines, register them in client components; providers already register GSAP plugins globally.
- Media: Prefer `next/image`. For video, consider Mux Player or Vercel Blob for lightweight hosting.
- The `legacy/` folders contain components from a previous project structure that have been migrated but may need refactoring to work with the current Next.js setup.

## Migration Notes

The project was recently unified from a split structure where legacy code was in a separate nested repository. All legacy components, hooks, and utilities have been moved to:
- `components/legacy/` - UI components from the old structure
- `lib/legacy/` - Utility functions and helpers
- `hooks/` - Custom React hooks (migrated from legacy)
- `app/legacy-pages/` - Old page components for reference

These can be gradually refactored or integrated into the main codebase as needed.

## Deploy

Project builds with `npm run build`. Deploy easily on Vercel or Netlify.
