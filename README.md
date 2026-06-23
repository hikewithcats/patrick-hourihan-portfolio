# Patrick Hourihan — Portfolio

A focused, professional software-development portfolio for **Patrick Hourihan**,
deployed at **PatrickHourihan.com**.

This is a separate site from [PoundKeeper.com](https://poundkeeper.com), which
remains Patrick's personal and creative home. This repo is the credible,
recruiter-facing portfolio for software-development and AI-related roles.

---

## Purpose

Present Patrick's real, verified work — three software projects and selected
client websites — without overstating seniority or fabricating metrics. Every
fact, link, and status on the site was verified against the actual project
repositories, live HTTP checks, and GitHub repo visibility before it shipped.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config.js`)
- **next/font** (Fraunces · Inter · JetBrains Mono, self-hosted at build)
- **Static export** — no database, no auth, no server runtime
- Designed for **Cloudflare Pages**

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
  site.ts           Centralized site config (domain, links, résumé flag) ← edit here
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

- **Hero** — name, headline, supporting + secondary statement, primary actions.
- **Selected Software Projects** — My Cartoon Pet, IPlayForKeepers, Keeping Up
  With The Robots. Each has a problem / built / stack / expandable case study
  (implementation, AI use, what Patrick owned), status, and verified links only.
- **Selected Client Work** — Cell Beauty Health (live). Zubin Home Evaluation
  exists in the data but is `hidden` until a verified URL is supplied.
- **Technical Capabilities** — editorial groupings of verified skills.
- **How I Build With AI** — the six-step workflow and the ownership statement.
- **Professional Background** — prior roles and transferable skills.
- **Contact** + **Footer** — email, GitHub, PoundKeeper.

### Editing content

All project and capability content lives in `lib/`. To change the domain,
contact email, social links, or résumé availability, edit **`lib/site.ts`**
only — metadata, canonical URL, and structured data all read from it.

Link rules enforced in `lib/projects.ts`:
- A **live link** appears only when the domain returned HTTP 200.
- A **GitHub link** appears only when the repository is public.

## Project-image workflow

Branded SVG cover images live in `public/images/projects/`. They are deliberate
designed treatments, not empty placeholders or fake screenshots. To swap in a
real screenshot for a live project, see
[`public/images/projects/README.md`](public/images/projects/README.md).

## Résumé file

The "Download Résumé" button targets
`public/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf`. Until that PDF
exists, the button renders **disabled** (never a broken link). Enable it by
dropping the file in and flipping `resume.available` to `true` in `lib/site.ts`.
See [`public/resume/README.md`](public/resume/README.md).

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

Static export to **Cloudflare Pages**. `next build` emits a fully static `out/`
directory (no server). See **[CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md)** for
the build command, output directory, custom-domain setup, and smoke tests.

## Accessibility & quality

- Semantic HTML, a single `h1`, logical heading order.
- Keyboard-accessible nav, visible focus states, skip link.
- `prefers-reduced-motion` respected; **no content depends on JS or animation
  to be visible** (the reveal effect only engages when JS is present and motion
  is allowed).
- Descriptive link labels, useful `alt` text, no horizontal overflow at 320px.

## Current limitations

- **Résumé PDF** is not yet included (button disabled by design).
- **Project images** are branded treatments; real screenshots can be swapped in
  for the two live sites.
- **OG image** is an SVG — a rasterized 1200×630 PNG is recommended for maximum
  social-platform compatibility.
- **Zubin Home Evaluation** is hidden pending a verified live URL.
- **My Cartoon Pet** and **IPlayForKeepers** have no live or source links by
  design (domains not live; repositories private).
