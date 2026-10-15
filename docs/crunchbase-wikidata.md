# Helthy: Crunchbase and Wikidata profiles

Paste-ready profile copy. Facts come from `lib/site.ts`, `app/layout.tsx` (Organization JSON-LD) and `public/llms.txt`. Keep them in sync: the name, URL, logo and social links should match everywhere so search engines treat all of these as one entity.

Anything marked **TODO** isn't in the repo. Fill it in before submitting, and don't guess.

Public-copy rule still applies: never name the AI providers, backend, auth, payments or data vendors.

---

## Crunchbase (organization profile)

Create at crunchbase.com → "Add a company". Crunchbase moderates new profiles, so a matching `support@helthy.app` or `@helthy.app` login email speeds up approval.

### Overview

| Field | Value |
|---|---|
| Organization name | Helthy |
| Also known as | Helthy AI |
| Website | https://helthy.app |
| Logo | `public/logos/helthylogo.png` (square) |
| Short description (≤ 150 chars) | Helthy is a free AI fitness app that combines calorie tracking, workout logging, weight tracking and an AI coach in one app. |
| Industries | Fitness, Health Care, Nutrition, Wellness, Mobile Apps, Artificial Intelligence (AI), Consumer Applications |
| Headquarters | **TODO** (city, state/region, country) |
| Founded date | **TODO** (month and year; the iOS app ID 6751759974 suggests the first App Store listing was around late 2025, so check App Store Connect) |
| Founders | Chibudom Ethan Onyejesi (Chibu), Chiebuka Onyejesi (Ebu) |
| Operating status | Active |
| Company type | For Profit |
| Number of employees | 1–10 |
| Funding status | **TODO** (for example "Bootstrapped", or leave empty) |
| Contact email | support@helthy.app |
| Legal name | **TODO** (the registered entity, if one exists) |

### Social links

| Network | URL |
|---|---|
| X / Twitter | https://x.com/helthyapp |
| Instagram | https://instagram.com/helthy.app |
| TikTok | https://tiktok.com/@helthyapp |
| LinkedIn | **TODO** (create a company page first; Crunchbase weights it heavily) |

### Full description

> Helthy is a fitness and nutrition app for iOS and Android that puts calorie and macro tracking, workout logging, weight tracking and an AI coach in a single app. Most people use one app to count calories, another to log lifts and a third for advice. Helthy replaces all three, and because the coach reads your own meals, workouts, personal records and weight trend, its answers are about your numbers instead of generic tips.
>
> Food can be logged by search, barcode, meal photo, nutrition label or voice. Workouts are logged set by set across a 1,500-exercise library, with personal records tracked automatically. Calorie and macro targets are calculated from each user's profile and goal, then updated weekly from real steps and workouts. The app also includes an Apple Watch app and Apple Health sync.
>
> Food and workout logging are free and unlimited. Helthy Premium ($4.99/month or $29.99/year) adds unlimited photo and voice logging, the AI coach, an AI routine generator, adaptive calorie targets and full history. Helthy doesn't sell user data or use it to train AI models.
>
> Helthy was founded by Chibu and Ebu, who use the app every day for their own training and nutrition.

### Products (Crunchbase "Products" section, if offered)

| Field | Value |
|---|---|
| Product name | Helthy |
| Platforms | iOS, Android, watchOS |
| App Store | https://apps.apple.com/us/app/helthy-track-food-workouts/id6751759974 |
| Google Play | https://play.google.com/store/apps/details?id=app.helthy.mobile |

---

## Wikidata

**Read this first:** Wikidata items must meet its notability policy. An item that only cites the company's own site is likely to be deleted. Before creating one, you need at least one independent, reliable source (press coverage, a review in a known publication, a notable award). Without that, focus on Crunchbase, LinkedIn and the App Store listings, and create the Wikidata item later.

Create one item for the app. A separate company item is only worth it once the company itself has independent coverage.

### Labels, descriptions, aliases (English)

| Field | Value |
|---|---|
| Label | Helthy |
| Description | fitness and nutrition tracking mobile app |
| Also known as | Helthy AI · helthy.app |

Wikidata descriptions are short, lowercase and neutral, with no marketing language. The description is not a sentence.

### Statements

Check each QID on Wikidata before adding it. The ones marked "verify" are from memory.

| Property | Value |
|---|---|
| instance of (P31) | mobile app (Q620615) |
| operating system (P306) | iOS (Q48493) |
| operating system (P306) | Android (Q94) |
| operating system (P306) | watchOS (verify QID) |
| genre (P136) | health and fitness app, or leave out if no suitable item exists (verify) |
| developer (P178) | **TODO** the company item, or leave out if there isn't one |
| founded by (P112) | only if the founders have their own items; otherwise leave out |
| publication date (P577) | **TODO** first public release date |
| software version identifier (P348) | 2.7 (qualifier: publication date = September 2026) |
| language of work or name (P407) | English (Q1860) |
| copyright license (P275) | proprietary license (verify QID) |
| official website (P856) | https://helthy.app |
| App Store app ID (P3861) | 6751759974 |
| Google Play Store app ID (P3418) | app.helthy.mobile |
| X username (P2002) | helthyapp |
| Instagram username (P2003) | helthy.app |
| TikTok username (P7085) | helthyapp |
| Crunchbase organization ID (P2088) | **TODO** the slug from the Crunchbase URL once the profile is live |
| email address (P968) | mailto:support@helthy.app |
| logo image (P154) | only if uploaded to Wikimedia Commons (logos usually need a licence Commons accepts) |

### References

Add a reference to each factual statement. Use **reference URL (P854)** with **retrieved (P813)**:

- Store IDs, OS and version: the App Store and Google Play listing URLs
- Website and socials: https://helthy.app
- Notability: the independent source(s) mentioned above

---

## After both are live

- Add the Crunchbase URL (and Wikidata URL, if created) to `SOCIAL_PROFILES` in `lib/site.ts`. It feeds the Organization `sameAs` JSON-LD, which ties the profiles back to the site.
- Add the Crunchbase ID to Wikidata (P2088).
