# Patrick Hourihan - Portfolio and Website Services

**PatrickHourihan.com** is Patrick's personal portfolio and the lead-generation
page for his small-business website design and development services. It also
works as a professional portfolio for recruiters.

[PoundKeeper.com](https://poundkeeper.com) remains Patrick's personal and
creative home.

---

## Purpose

Show a local business owner real work on a phone and let them request a free
quote immediately. Every project, link, and fact on the site is real. No
invented clients, testimonials, results, prices, or guarantees.

## Stack

- **Next.js 16** (App Router), static export
- **TypeScript**, **Tailwind CSS v4** (CSS-first `@theme`)
- **next/font** (Fraunces and Inter, self-hosted at build)
- **Cloudflare Workers**: static assets plus one route, `POST /api/quote`,
  which emails quote requests through **Resend**

## Architecture

```
app/
  page.tsx          Home: Hero, Work, Services, Process, About, Quote
  software/         Technical case studies for recruiters
  layout.tsx        Fonts, metadata, JSON-LD, skip link
  globals.css       Design tokens, buttons, form fields
components/
  sections/         One file per page section; QuoteForm is the client form
  site/             Header, Footer, StickyQuoteBar (phone only)
  ui/               DeviceFrames, SectionHeading, StatusPill, icons
lib/
  site.ts           Name, location, phone, email, links, resume path, headshot
  projects.ts       Homepage gallery (showcaseProjects) + software case studies
  capabilities.ts   Skills and experience
  quote.ts          Quote form options, shared with the Worker
worker/
  index.ts          Serves assets; handles /api/quote
  index.test.ts     Worker tests (`npm test`)
resume/             Resume source; the PDF is in public/resume/
```

### Editing content

- **Contact details, resume path, headshot:** `lib/site.ts`
- **Gallery:** `showcaseProjects` in `lib/projects.ts`. Set `hidden: true` to
  remove a project from the site without deleting it.
- **Experience and skills:** `lib/capabilities.ts`. Keep facts in line with the
  resume.

Content rules: no em dashes, only verified claims. `liveUrl` must return HTTP
200, and private repositories are never linked. For My Cartoon Pet, say "public
beta" and claim no customers or revenue.

## Project images

Real screenshots of each live site live in `public/images/projects/`. See
[its README](public/images/projects/README.md).

## Resume

**View Resume** and **Download PDF** link to the one-page PDF in
`public/resume/`. See [its README](public/resume/README.md) to regenerate it.

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
| `npm run preview` | Run the built site and quote route locally (`wrangler dev`) |
| `npm test` | Quote Worker tests |
| `npm run deploy` | Build, then `wrangler deploy` |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npm run typecheck` | `tsc --noEmit` |

## Deployment

See **[CLOUDFLARE_DEPLOY.md](CLOUDFLARE_DEPLOY.md)** for the deploy path, the
one-time quote form setup, verification, and rollback.

## Accessibility & quality

- Semantic HTML, a single `h1`, logical heading order.
- Keyboard-accessible nav, visible focus states, skip link.
- `prefers-reduced-motion` respected; **no content depends on JS or animation
  to be visible** (the reveal effect only engages when JS is present and motion
  is allowed).
- Descriptive link labels, useful `alt` text, no horizontal overflow at 320px.
