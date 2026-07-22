# Deploying to Cloudflare (Workers static assets)

This portfolio is a **static export**. `next build` produces a fully static
site in `out/` - plain HTML, CSS, JS, fonts, and images with no server runtime,
database, or environment dependencies.

**Production runs as a Cloudflare Worker named `patrick-hourihan-portfolio`
serving `out/` as static assets.** The repo's [`wrangler.jsonc`](wrangler.jsonc)
declares an `assets` directory and no worker script, so `npx wrangler deploy`
uploads the static export directly. The custom domain
(`patrickhourihan.com`) is already attached to this Worker.

> **Do NOT use an OpenNext/Workers server build**, and do not create a
> Cloudflare Pages project for production - the Worker above is the deployed
> architecture. If a deploy log ever shows `@opennextjs/cloudflare migrate` or
> `opennextjs-cloudflare build`, something is misconfigured; production only
> needs `next build` + `wrangler deploy`.

---

## Production deploy path

1. Run the repository checks: `npm run lint`, `npm run typecheck`.
2. Build the static export: `npm run build`.
3. Confirm the output exists in `out/` (an `index.html` at the root, plus
   `images/`, `resume/`, `sitemap.xml`, `robots.txt`). Confirm no stray
   `.DS_Store` files are present in `out/`.
4. Confirm Wrangler authentication: `npx wrangler whoami` (expects the
   `hikewithcats` Cloudflare account).
5. Deploy: `npx wrangler deploy` (uploads `out/` per `wrangler.jsonc`).
6. Verify the deploy output names the existing Worker
   `patrick-hourihan-portfolio` and reports a new Version ID.
7. Verify the existing custom domain serves the new build:
   `https://patrickhourihan.com` (do not change routes or DNS).
8. Run the post-deployment smoke tests below.
9. To roll back, use the Worker's deployment history: Cloudflare dashboard →
   Workers & Pages → `patrick-hourihan-portfolio` → **Deployments** → roll back
   to a previous version (or redeploy a known-good commit with
   `git checkout <sha> && npm run build && npx wrangler deploy`).

## Why it's static-export compatible

- `next.config.ts` sets `output: "export"`, so the build emits static files.
- `images.unoptimized: true` - there is no image optimization server; imagery
  is pre-optimized JPEG/SVG/PNG.
- No API routes, no server actions, no `getServerSideProps`, no database, no
  auth. The contact action is a `mailto:` link. Fonts are self-hosted by
  `next/font` at build time.
- `trailingSlash: true` produces directory-style URLs that map predictably onto
  a static host.

## Environment variables

**None required.** The site has no secrets, API keys, or runtime config.

## Custom domain

`patrickhourihan.com` (apex, canonical) and `www.patrickhourihan.com`
(redirects to the apex) are already configured on the Worker. If the canonical
host ever changes, update `siteConfig.url` in `lib/site.ts` so the canonical
tag, sitemap, and Open Graph URLs follow.

Verification:

```bash
dig +short patrickhourihan.com
```

```bash
curl -sI https://patrickhourihan.com | grep -i "^http\|^location"
```

## Post-deployment smoke testing

Run through this on the production URL after each deploy:

- [ ] Home page loads; **one** `h1` ("Patrick Hourihan").
- [ ] All nav anchors scroll to the right sections (desktop + mobile menu).
- [ ] **View Projects**, **GitHub**, **Contact** actions work; **Download
      Résumé** opens the one-page PDF.
- [ ] External links (GitHub, live project sites, PoundKeeper) open in a new
      tab and resolve.
- [ ] Project images load; favicon and `/images/og-image.png` resolve.
- [ ] `https://patrickhourihan.com/sitemap.xml` and `/robots.txt` resolve.
- [ ] No console errors; no horizontal scroll at 320px width.
- [ ] Paste the URL into a social debugger to confirm the OG card renders.
