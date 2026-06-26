# Deploying to Cloudflare Pages

This portfolio is a **static export**. `next build` produces a fully static
site in `out/` - plain HTML, CSS, JS, fonts, and images with no server runtime,
database, or environment dependencies. That makes Cloudflare Pages a clean fit:
Cloudflare serves the `out/` directory directly from its edge.

> Nothing here triggers a deploy automatically. These are the steps Patrick (or
> whoever owns the Cloudflare account) follows to ship it.

> **IMPORTANT: this is a static site, not an OpenNext/Workers server build.**
> If Cloudflare auto-detects "Next.js" and runs `@opennextjs/cloudflare` it will
> fail (it looks for a `.next/standalone` server output that an `output: export`
> build does not produce). There are two correct, supported paths below. Use
> **one** of them.

---

## TL;DR (two correct ways to deploy)

- **Path 1 - Cloudflare Pages (simplest).** Create a *Pages* project, set build
  command `npm run build` and output directory `out`. No Worker, no OpenNext.
- **Path 2 - Workers Static Assets.** Keep a *Workers* project whose deploy
  command is `npx wrangler deploy`. This repo ships a [`wrangler.jsonc`](wrangler.jsonc)
  that points `assets.directory` at `./out`, so `wrangler deploy` uploads the
  static export instead of running OpenNext. Just retry the deployment.

If a deploy log shows `@opennextjs/cloudflare migrate` or
`opennextjs-cloudflare build`, the project is on the wrong path - switch to one
of the two above.

---

## Why it's static-export compatible

- `next.config.ts` sets `output: "export"`, so the build emits static files.
- `images.unoptimized: true` - there is no image optimization server; all
  imagery is pre-optimized SVG.
- No API routes, no server actions, no `getServerSideProps`, no database, no
  auth. The contact action is a `mailto:` link. Fonts are self-hosted by
  `next/font` at build time.
- `trailingSlash: true` produces directory-style URLs that map predictably onto
  a static host.

## Build settings

When creating the Pages project (or in **Settings → Builds & deployments**):

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** - or "None" |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | `/` (repo root) |
| Node version | `20` or newer (set `NODE_VERSION = 20` if needed) |

> If the preset injects a different build command, override it with
> `npm run build`. The output directory **must** be `out`.

## Option A - GitHub integration (recommended)

1. Push this repo to GitHub (`hikewithcats/patrick-hourihan-portfolio`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and the production branch (`main`).
4. Enter the build settings from the table above.
5. **Save and Deploy.** Cloudflare builds and publishes a
   `*.pages.dev` preview URL. Every push to `main` redeploys; pull requests get
   preview deployments.

## Option B - Direct upload (Wrangler)

If you prefer not to connect Git:

```bash
npm install
npm run build
npx wrangler pages deploy out --project-name=patrick-hourihan-portfolio
```

## Environment variables

**None required.** The site has no secrets, API keys, or runtime config. If a
future feature needs one, add it under **Settings → Environment variables** for
both Production and Preview, then read it at build time only.

## Custom domain - PatrickHourihan.com and www

1. In the Pages project → **Custom domains → Set up a custom domain**.
2. Add the apex: `patrickhourihan.com`.
3. Add `www.patrickhourihan.com` as well.

**DNS** (if the domain's nameservers are on Cloudflare, records are added
automatically; otherwise add them manually):

| Type | Name | Target | Proxy |
| --- | --- | --- | --- |
| CNAME | `@` (apex) | `<project>.pages.dev` | Proxied (CNAME flattening) |
| CNAME | `www` | `<project>.pages.dev` | Proxied |

Pick one host as canonical (the site's metadata uses the **apex**,
`patrickhourihan.com`) and redirect the other. The simplest redirect is a
**Bulk Redirect** or a `_redirects` file in `public/`:

```
# public/_redirects  - force www → apex (301)
https://www.patrickhourihan.com/*  https://patrickhourihan.com/:splat  301
```

> If you change the canonical host, update `siteConfig.url` in `lib/site.ts` so
> the canonical tag, sitemap, and Open Graph URLs follow.

## DNS verification

```bash
dig +short patrickhourihan.com
dig +short www.patrickhourihan.com
```

Both should resolve to Cloudflare. In the dashboard, the custom domain shows
**Active** once DNS and the certificate are in place.

## SSL verification

- Cloudflare issues a **Universal SSL** certificate automatically (can take a
  few minutes).
- Confirm `https://patrickhourihan.com` loads with a valid certificate and that
  `http://` redirects to `https://`.
- Set SSL/TLS mode to **Full** (it's a static origin, so Full is sufficient).

```bash
curl -sI https://patrickhourihan.com | grep -i "^http\|^location"
```

## Post-deployment smoke testing

Run through this on the production URL after the first deploy:

- [ ] Home page loads; **one** `h1` ("Patrick Hourihan").
- [ ] All nav anchors scroll to the right sections (desktop + mobile menu).
- [ ] **View Projects**, **GitHub**, **Contact** actions work; **Download
      Résumé** is visibly disabled (until the PDF is added).
- [ ] External links (GitHub, live project sites, PoundKeeper) open in a new tab
      and resolve.
- [ ] Project images load; favicon and `/og-image.svg` resolve.
- [ ] `https://patrickhourihan.com/sitemap.xml` and `/robots.txt` resolve.
- [ ] No console errors; no horizontal scroll at 320px width.
- [ ] Paste the URL into a social debugger to confirm the OG card renders.

## Rollback procedure

Cloudflare Pages keeps every deployment.

- **Dashboard:** Pages project → **Deployments** → pick a previous good
  deployment → **⋯ → Rollback to this deployment**. It becomes live instantly.
- **Git:** revert the offending commit on `main` and push; Cloudflare builds and
  publishes the reverted state.

Because the site is static, a rollback is just re-pointing the alias at a prior
immutable build - there is no database or migration state to unwind.
