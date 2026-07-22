# Using this repo as a website template

This codebase is a reusable, CMS-driven single-page site for a solo practice
(therapist, coach, consultant, etc.). Almost everything a visitor sees lives in
`content/` and `public/images/`, so spinning up a new client site is mostly
"replace content + set env vars," not "edit code."

## Two ways to start a new client site

**A. GitHub template (recommended).** Enable this repo as a template
(`Settings → Template repository`, or `gh repo edit <owner>/<repo> --template`).
Then for each client click **Use this template** to get a fresh repo with clean
history. Follow the checklist below.

**B. Sanitized starter repo.** If you'd rather not carry the current client's
content/images into every clone, make one sanitized copy with placeholder
content and no client images, and use *that* as the template. Ask Claude to
generate it — the per-client content files are all listed below.

---

## Per-client checklist

### 1. Environment variables

Copy `.env.example` → `.env.local` and fill it in. Set the same variables in your
host (Vercel/Netlify/etc.). See `.env.example` for the full annotated list:
`SITE_URL`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`,
`OAUTH_GITHUB_CLIENT_ID/SECRET`, and the optional
`NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GOOGLE_ADS_ID` /
`NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`.

> Analytics/ads tags now render only when their env vars are set, so clones do
> **not** inherit another site's tracking. (The former hardcoded IDs
> `AW-18224312971`, conversion `QKqdCMe4mb0cEIvlg_JD`, and `G-3F654PFG50` are
> gone — set them via env only if this same client owns them.)

### 2. Content files (`content/`) — replace all client copy

| File | What to change |
| --- | --- |
| `site.json` | `name`, `tagline`, `email`, `phone`, `activeColorPreset`, nav labels |
| `homepage.json` | hero title/subtitle/CTA, quote, about title & body, image paths |
| `contact.json` | safety-notice title/content |
| `banner.json` | promo banner text/link (or set `enabled: false`) |
| `privacy.json` | privacy policy body |
| `testimonials/*` | delete samples, add the client's (`james-lisa`, `michael-r`, `sarah-m`) |
| `endorsements/*` | delete samples (`christian-buenaventura`, `dr-johnson`, `dr-smith`, `sarah-henderson`) |
| `faqs/*` | rewrite for the client (fees, insurance, scheduling, etc.) |
| `color-presets/*` | keep/trim the palettes you want offered; point `site.json` at one |
| `layout.json` | reorder/enable sections as desired |

### 3. Images (`public/images/`)

- Content currently references `marcus-bust.webp` (hero), `jonjon-119.webp`
  (about), plus `decorations/underline-living.png`. Replace these.
- The folder holds ~65 images (many unused). Delete everything the new client
  doesn't use, then add theirs. Run `npm run optimize-images` to convert
  JPG/PNG → WebP.

### 4. Third-party badges (`components/`)

These render fixed profile links — edit or remove per client:
- `PsychologyTodayBadge.tsx` — profile ID `1676487` and the verified-seal script.
- `MentayaBadge.tsx` — generic Mentaya partner badge (remove if not applicable).
- Check `Footer.tsx` / `Contact.tsx` for where these are mounted.

### 5. Decap CMS (`public/admin/config.yml`)

This file is static (not env-driven), so edit per client:
- `backend.repo` — the client's GitHub repo (was `cgholt/hocktherapy`).
- `backend.base_url` — the deployed site URL (was `https://hocktherapy.com`).
- Create a GitHub OAuth app per client and set `OAUTH_GITHUB_*` env vars.

### 6. Project metadata (`package.json`)

`homepage`, `bugs.url`, and `repository.url` point at
`github.com/cgholt/hocktherapy`. Update or remove them per repo.

### 7. Redirects (`next.config.ts`)

The `/about`, `/faqs`, `/contact`, `/services` → homepage-anchor redirects are
generic; keep unless a client uses a different URL structure.

---

## Things that are already generic (no change needed)

- `StructuredData.tsx` — takes name/description/url as props from `site.json`.
- Metadata in `app/layout.tsx`, `sitemap.ts`, `robots.ts` — all derive from
  `site.json` + `SITE_URL`.
- Contact API rate limiting, validation, SMTP host (`smtp.protonmail.ch`; change
  in `app/api/contact/route.ts` only if using a different provider).
