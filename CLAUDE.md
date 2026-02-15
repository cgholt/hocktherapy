# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (Next.js with Turbopack)
- `npm run build` — Production build (Next.js with Turbopack)
- `npm run lint` — ESLint
- `npm run test` — Vitest in watch mode
- `npm run test:run` — Vitest single run
- `npx vitest run __tests__/content.test.ts` — Run a single test file
- `npm run cms` — Start Decap CMS local server

## Architecture

This is a **Next.js 16 App Router** therapy practice landing page for Hock Therapy. It uses Tailwind CSS v4, TypeScript, and a file-based CMS content system.

### Content System (CMS-driven)

All site content lives in `content/` as JSON and Markdown files — there is no database. The `lib/content.ts` module reads these files at build/request time with an in-memory cache. Content types:

- **Single JSON files**: `site.json` (global config/nav), `homepage.json`, `layout.json` (section ordering/visibility), `about.json`, `contact.json`, `privacy.json`, `faqs-page.json`, `banner.json`
- **Collection directories**: `services/` (Markdown with frontmatter), `testimonials/`, `faqs/` (Markdown), `endorsements/`, `color-presets/` — each item is a separate file, sorted by `order` field

Markdown content fields are parsed through `marked` with a custom `preserveLineBreaks` helper that converts 3+ consecutive newlines into `<br>` tags.

### Homepage Layout System

The homepage (`app/page.tsx`) renders sections dynamically based on `content/layout.json`. Each section can be enabled/disabled and reordered. Section IDs: `hero`, `about`, `services`, `testimonials`, `endorsements`, `faq`. Section components live in `components/sections/`.

### Path Aliases

Configured in both `tsconfig.json` and `vitest.config.ts`:
- `components/*` → `./components/*`
- `content/*` → `./content/*`
- `lib/*` via baseUrl resolution

Import components as `components/Header`, not `../components/Header`.

### Theming

- Dark theme is default; light theme toggled via `localStorage` key `theme`
- Color presets defined in `content/color-presets/` and selected via `site.json`'s `activeColorPreset` field
- CSS variables `--primary`, `--secondary`, `--accent` are injected in the root layout

### API Routes

- `app/api/contact/` — Contact form submission (uses nodemailer)
- `app/api/auth/` — CMS authentication

### Environment Variables

- `SITE_URL` — Base URL for metadata/SEO (defaults to `https://example.com`)
- Email-related env vars for nodemailer (check `app/api/contact/`)
