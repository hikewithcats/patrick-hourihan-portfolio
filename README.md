# Patrick Hourihan - Portfolio

A focused, professional software-development portfolio for **Patrick Hourihan**,
deployed at **PatrickHourihan.com**.

This is a separate site from [PoundKeeper.com](https://poundkeeper.com), which
remains Patrick's personal and creative home. This repo is the credible,
recruiter-facing portfolio for software-development and AI-related roles.

---

## Purpose

Present Patrick's real, verified work - three software projects and selected
client websites - without overstating seniority or fabricating metrics. Every
fact, link, and status on the site was verified against the actual project
repositories, live HTTP checks, and GitHub repo visibility before it shipped.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.js`)
- **next/font** (Fraunces · Inter · JetBrains Mono, self-hosted at build)
- **Static export** - no database, no auth, no server runtime
- Deployed as **Cloudflare Workers static assets** (see `wrangler.jsonc`)

## Architecture

```
app/
  layout.tsx        Root layout: fonts, metadata, JSON-LD, skip link, .js flag
  page.tsx          Single-page composition of all sections
  globals.css       Design tokens + base styles (the whole visual system)
  not-found.tsx     404
  icon.svg          Favicon (App Router metadata file)
  sitemap.ts        Static sitemap.xml
  robots.ts         Static robots.txt
components/
  Reveal.tsx        Progressive-enhancement scroll reveal (content-safe)
  site/             Header (with mobile nav) + Footer
  sections/         Hero, SoftwareProjects, ClientWork, Capabilities,
                    AiWorkflow, Background, Contact
  ui/               SectionHeading, StatusPill, icons
lib/
  site.ts           Centralized site config (domain, links, résumé path) ← edit here
  projects.ts       Software + client project data (verified facts only)
  capabilities.ts   Skill groups, AI workflow steps, background
public/
  images/projects/  Branded project images (+ README on the asset workflow)
  images/og-image.svg
  resume/           Résumé drop location (+ README)
```

The site is a **single page** with anchored sections (`#projects`,
`#client-work`, `#capabilities`, `#ai-workflow`, `#background`, `#contact`).
This keeps it fast, simple, and trivially static-exportable.

## Content structure

- **Hero** - name, headline, supporting + secondary statement, primary actions.
- **Selected Software Projects** - My Cartoon Pet, IPlayForKeepers (live
  interactive prototype), Keeping Up With The Robots (live). Each has a problem /
  built / stack / expandable case study (implementation, AI use, what Patrick
  owned, current limitations), status, and verified links only.
- **Selected Client Work** - Cell Beauty Health (live) and Zubin Home Valuation
  (live). A client card is shown publicly only once its production URL is
  verified; the data layer supports `hidden` for any not-yet-live engagement.
- **Technical Capabilities** - editorial groupings of verified skills.
- **How I Build With AI** - the six-step workflow and the ownership statement.
- **Professional Background** - prior roles and transferable skills.
- **Contact** + **Footer** - email, GitHub, PoundKeeper.

### Editing content

All project and capability content lives in `lib/`. To change the domain,
contact email, social links, or résumé path, edit **`lib/site.ts`**
only - metadata, canonical URL, and structured data all read from it.

Link rules enforced in `lib/projects.ts`:
- A **live link** appears only when the domain returned HTTP 200.
- A **GitHub link** appears only when the repository is public.

## Project-image workflow

Real, optimized screenshot assets live in `public/images/projects/` (1280×800
JPEGs captured from each production site). To refresh one, see
[`public/images/projects/README.md`](public/images/projects/README.md).

## Résumé file

The "Download Résumé" button links directly to
`public/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf`, a one-page
selectable-text PDF rendered from `resume/resume.html`.
See [`public/resume/README.md`](public/resume/README.md) for the
regeneration command.

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build → static export into `out/` |
| `npm run preview` | Serve the built `out/` locally (`npx serve out`) |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npm run typecheck` | `tsc --noEmit` |

## Deployment strategy

Static export served as **Cloudflare Workers static assets**. `next build`
emits a fully static `out/` directory (no server), and `npx wrangler deploy`
uploads it to the existing `patrick-hourihan-portfolio` Worker per
[`wrangler.jsonc`](wrangler.jsonc). See
**[CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md)** for the full production
deploy path, verification, and rollback.

## Accessibility & quality

- Semantic HTML, a single `h1`, logical heading order.
- Keyboard-accessible nav, visible focus states, skip link.
- `prefers-reduced-motion` respected; **no content depends on JS or animation
  to be visible** (the reveal effect only engages when JS is present and motion
  is allowed).
- Descriptive link labels, useful `alt` text, no horizontal overflow at 320px.

## Current limitations

- **My Cartoon Pet** is a live public beta at
  [mycartoonpet.com](https://mycartoonpet.com) with no source link by design
  (repository private). Its screenshots show the live public marketing
  homepage and sign-in screen - authenticated app screens are intentionally
  not shown.
- All projects use real, optimized desktop screenshots captured from their
  production sites.
