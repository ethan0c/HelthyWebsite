# HelthyWebsite

A unified Next.js website for Helthy.

## Stack

- Next.js 16 (App Router, RSC-first)
- TypeScript
- Tailwind CSS v4 (+ tailwindcss-animate)
- GSAP (ScrollTrigger, Flip) + Lenis smooth scroll
- Formspree (contact forms)
- Loops (waitlist/email management)
- Zustand (tiny state)
- Zod (validation)
- lucide-react (icons)

## Project Structure

```
app/                          # Next.js App Router pages
  ├── api/                    # API routes
  │   └── waitlist/           # Waitlist API (Loops integration)
  ├── about/                  # About page
  ├── contact/                # Contact page
  ├── pricing/                # Pricing page
  ├── terms/                  # Terms of Service
  ├── privacy/                # Privacy Policy
  └── legacy-pages/           # Legacy page components

components/
  ├── forms/                  # Form components (ContactForm with Formspree)
  ├── providers/              # GSAP & Lenis providers
  ├── sections/               # Page sections (Hero, Features)
  ├── ui/                     # UI primitives (shadcn/ui)
  └── legacy/                 # Legacy components

lib/
  ├── store/                  # Zustand stores
  ├── utils/                  # Utility functions
  └── legacy/                 # Legacy utilities

hooks/                        # Custom React hooks
public/                       # Static assets
```

## What's included

- Global providers for GSAP and Lenis: `components/providers/GSAPProvider.tsx`, `components/providers/LenisProvider.tsx`
- Animated sections with ScrollTrigger reveals
- Contact form with Formspree integration: `components/forms/ContactForm.tsx`
- Waitlist API with Loops: `app/api/waitlist/route.ts`
- Security headers configured in `next.config.ts`
- Rate limiting on API routes
- Zustand store: `lib/store/ui.ts`
- Utility: `lib/utils/cn.ts` (clsx + tailwind-merge)

Tailwind v4 is enabled via PostCSS with `@import "tailwindcss"` in `app/globals.css` and the `@plugin "tailwindcss-animate"` directive.

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Create a `.env.local` file:

```
LOOPS_API_KEY=your_loops_api_key
NODE_ENV=development
```

## Using shadcn/ui (optional)

This repo is Tailwind v4-ready. If you want shadcn/ui component primitives:

```powershell
npx shadcn@latest init
npx shadcn@latest add button card input textarea label
```

The project already includes peer utilities (`class-variance-authority`, `tailwind-merge`, `clsx`) and `tailwindcss-animate`.

## Security Features

- Content Security Policy headers
- XSS protection headers
- Rate limiting on API endpoints (5 requests/minute)
- Input sanitization and validation with Zod
- Formspree handles contact form submissions (no sensitive data in your backend)
- Loops handles waitlist data securely

## Notes

- Lenis is synced to GSAP's ticker so ScrollTrigger stays perfectly in step.
- If you add more scroll timelines, register them in client components; providers already register GSAP plugins globally.
- Media: Prefer `next/image`. For video, consider Mux Player or Vercel Blob for lightweight hosting.
- The `legacy/` folders contain components from a previous project structure that have been migrated but may need refactoring.

## Deploy

Project builds with `npm run build`. Deploy easily on Vercel or Netlify.
