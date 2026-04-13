# CLAUDE.md

Personal portfolio website for Ashwin Das Gururaja (ashwindas.com), built with Next.js and deployed to GitHub Pages as a static export.

## Stack

- **Framework**: Next.js 15.2.2 (App Router, static export)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3.4.1 + DaisyUI 5.0.6
- **Theming**: next-themes (dark/light, default dark, class-based)
- **Icons**: @heroicons/react, react-icons
- **Testing**: Cypress (E2E) + Jest (unit)
- **Deployment**: GitHub Pages via `gh-pages` branch, auto-deployed by GitHub Actions on push to `main`

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Generate sitemap + Next.js static export → ./out
npm run lint         # ESLint
npm run test         # Unit tests (Jest)
npm run cypress      # E2E tests (interactive)
npm run cypress:headless  # E2E tests (CI mode)
npm run test:e2e     # Full E2E suite
```

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout: metadata, JSON-LD, CSP meta, security headers
│   ├── page.tsx            # Home page — ALL major sections live here (single-page site)
│   ├── providers.tsx       # ThemeProvider wrapper (prevents hydration mismatch)
│   └── globals.css         # Tailwind directives + minimal global styles
├── components/             # All interactive/client components
│   ├── Navigation.tsx      # Fixed navbar with theme toggle + mobile menu
│   ├── ScrollButton.tsx    # Smooth scroll to section anchors
│   ├── MediaFeatures.tsx   # Media/press features section
│   ├── Publications.tsx    # Academic/industry publications section
│   ├── ConsentBanner.tsx   # Cookie consent banner (GDPR-style, bottom of page)
│   ├── GoogleAnalytics.tsx # GA4 — consent-gated, only fires after user accepts
│   ├── FiveHundredPxGallery.tsx
│   └── ...
└── hooks/
    └── useConsent.ts       # Consent state — reads/writes localStorage key 'analytics-consent'

public/
├── images/logos/           # Company/institution logos (used in experience/education cards)
├── CNAME                   # ashwindas.com
└── theme-helper.js         # Injected early to prevent FOUC on theme load
```

## Key Constraints

- **Static export only** (`output: 'export'` in next.config.mjs). No API routes, no `getServerSideProps`, no server components that require a runtime.
- **Images must be unoptimized** (`images: { unoptimized: true }`) — Next.js image optimization requires a server.
- All content is **hard-coded** in `page.tsx` and component files. There is no CMS or database.
- Section anchors use kebab-case IDs (`#about`, `#experience`, `#photography`). Navigation scroll targets must match these exactly.

## Content Model

All content is hard-coded as arrays/objects in-file (no CMS). When adding new entries, follow the existing card patterns in `page.tsx` and the relevant component.

**Shared shape across sections** — most content cards follow this pattern:

```typescript
interface Publication {   // also MediaFeature, same shape
  id: string
  title: string
  publication: string
  description: string
  logoSrc?: string
  url?: string
  date?: string
}
```

**Where content lives:**
- Experience, Education, Conferences, Hackathons → inline in `page.tsx`
- Media features → `MediaFeatures.tsx` (`defaultMediaFeatures` array)
- Publications → `Publications.tsx` (`defaultPublications` array)

Logos go in `public/images/logos/`. Use `placeholder-logo.png` as the fallback. Hackathon banners go directly in `public/images/`.

**Adding a new section:** create a new component file, add a `default*` array with the content, wire it into `page.tsx`, and add a matching `#section-id` anchor + nav link.

## Analytics & Consent

Google Analytics (GA4) is consent-gated:

- `useConsent` hook (`src/hooks/useConsent.ts`) manages state, persisted in `localStorage` under key `analytics-consent` (version `1.0`).
- `ConsentBanner` shows on first visit until the user chooses "Accept All" or "Necessary Only".
- `GoogleAnalytics` component only fires tracking events when `consent.analytics === true`.
- When updating consent settings, call `window.gtag('consent', 'update', ...)` — the hook does this automatically.
- Ad storage is always denied (`ad_storage: 'denied'`); do not change this.

## Styling Conventions

- Utility-first Tailwind — no CSS modules.
- Use DaisyUI semantic classes (`btn`, `card`, `badge`, `navbar`, `avatar`, etc.) before writing custom Tailwind chains.
- Dark mode via `class` selector (`html.dark`). Use `dark:` Tailwind variants for overrides.
- Responsive: mobile-first, breakpoints `md:` and `lg:`.
- Theme colors: primary = sky blue (`#0ea5e9`). Avoid hardcoding hex — use Tailwind/DaisyUI tokens.

## Component Conventions

- `'use client'` for anything interactive or that uses hooks.
- Guard against hydration mismatches for theme-sensitive components:
  ```typescript
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  ```
- Props interfaces inline, above the component function.
- Functional components only, no class components.

## Testing

- **Unit tests**: `tests/unit/` — Jest + React Testing Library.
- **E2E tests**: `cypress/e2e/` — covers home, navigation, photography, conferences, hackathons, styling.
- Run unit tests before pushing; E2E tests validate deployment-critical flows.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) triggers on every push to `main`:
1. Runs `verify-prod-compatibility.js` checks
2. Builds static export
3. Deploys `./out` to `gh-pages` branch

Do **not** manually push to `gh-pages`. Use `main` as the source of truth.
