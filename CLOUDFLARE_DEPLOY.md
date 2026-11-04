# Deploying to Cloudflare (Workers static assets + quote route)

`next build` produces a fully static site in `out/`. **Production runs as a
Cloudflare Worker named `patrick-hourihan-portfolio`** that serves `out/` as
static assets. [`worker/index.ts`](worker/index.ts) adds one route,
`POST /api/quote`, which emails quote requests through Resend. Only `/api/*`
reaches the Worker script (`run_worker_first` in
[`wrangler.jsonc`](wrangler.jsonc)); every page is served directly as a static
asset. The custom domain (`patrickhourihan.com`) is already attached.

> **Do NOT use an OpenNext/Workers server build**, and do not create a
> Cloudflare Pages project for production. If a deploy log ever shows
> `@opennextjs/cloudflare migrate` or `opennextjs-cloudflare build`, something
> is misconfigured; production only needs `next build` + `wrangler deploy`.

---

## One-time setup for the quote form

Quote emails go to `QUOTE_TO` and are sent from `QUOTE_FROM` (both in
`wrangler.jsonc`).

1. Log in: `npx wrangler login`.
2. `QUOTE_FROM` must use a domain verified in Resend. It currently uses
   `updates.mycartoonpet.com`, which is already verified. To send from
   `patrickhourihan.com` instead, verify that domain in Resend and update
   `QUOTE_FROM`.
3. Store the API key as a secret. Paste it at the prompt; it never goes in the
   repo: `npx wrangler secret put RESEND_API_KEY`.
4. After deploying, send one real test request from the live site and confirm
   it arrives in the `QUOTE_TO` inbox.

Until the secret is set, `/api/quote` returns 503 and the form offers a
prefilled email plus call/text buttons, so a visitor is never stuck. To test
locally with a real key, put `RESEND_API_KEY=...` in `.dev.vars` (gitignored)
and run `npx wrangler dev`.

## Production deploy path

1. Run the repository checks: `npm run lint`, `npm run typecheck`, `npm test`.
2. Build the static export: `npm run build`.
3. Confirm the output exists in `out/` (an `index.html` at the root, plus
   `images/`, `resume/`, `sitemap.xml`, `robots.txt`). Confirm no stray
   `.DS_Store` files are present in `out/`.
4. Confirm Wrangler authentication: `npx wrangler whoami` (expects the
   `hikewithcats` Cloudflare account).
5. Deploy: `npx wrangler deploy` (uploads `out/` and the Worker per `wrangler.jsonc`).
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
- `images.unoptimized: true`: there is no image optimization server; imagery
  is pre-optimized JPEG/SVG/PNG.
- No Next.js API routes, server actions, database, or auth. The only server
  code is the Worker route above, which lives outside Next.js. Fonts are
  self-hosted by `next/font` at build time.
- `trailingSlash: true` produces directory-style URLs that map predictably onto
  a static host.

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Worker secret | Sends quote emails |
| `QUOTE_TO` | `wrangler.jsonc` | Inbox that receives quote requests |
| `QUOTE_FROM` | `wrangler.jsonc` | Sender; its domain must be verified in Resend |

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

- [ ] Home page loads; **one** `h1` (name and headline).
- [ ] On a real iPhone: hero buttons are visible without scrolling; **Get a Free
      Website Quote** and **View My Work** go to the right sections; the sticky
      quote bar appears mid-page and hides at the form.
- [ ] Submit a real test request; it arrives, and Reply goes to the visitor.
- [ ] Call and email links open the phone and mail apps.
- [ ] **View Resume** opens the PDF; **Download PDF** downloads it.
- [ ] Gallery live-site links open in a new tab and resolve; images load.
- [ ] `/software/` loads and its nav links return to the home page sections.
- [ ] `/sitemap.xml`, `/robots.txt`, favicon, and `/images/og-image.png` resolve.
- [ ] No console errors; no horizontal scroll at 320px width.
- [ ] Paste the URL into a social debugger to confirm the OG card renders.
