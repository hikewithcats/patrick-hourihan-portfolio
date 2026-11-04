# Project images

Real screenshots of each live site, used by the homepage gallery and the
/software/ case studies.

## Current assets

Captured from the live sites on 2026-11-04. `<id>.jpg` is desktop (1440x900,
scaled to 1280 wide). `<id>-mobile.jpg` is phone (390x844 at 2x, scaled to 1000
tall) and appears only in the homepage gallery.

- `zubin-home-valuation`, `cell-beauty-health`, `keeping-up-with-the-robots`,
  `hike-with-cats`, `my-cartoon-pet`: desktop and mobile
- `iplayforkeepers`: desktop, for /software/
- `my-cartoon-pet-signin.jpg`: public sign-in screen, for the /software/ case
  study. Authenticated app screens are intentionally not shown.

## Refreshing a screenshot

1. Capture a clean screenshot of the production site at the sizes above.
2. Downscale to 1280 px wide and save as an optimized JPEG (target < 250 KB),
   e.g. `sips -Z 1280 in.png --setProperty format jpeg --setProperty formatOptions 82 --out out.jpg`.
3. Save it here, then confirm the image and alt fields in
   [`lib/projects.ts`](../../../lib/projects.ts) point at it.

Do **not** hotlink screenshots from external sites - always store a local,
optimized asset. Keep `imageAlt` descriptive.

## Why plain optimized assets

This site is a static export with no image optimization server;
`next.config.ts` sets `images.unoptimized` accordingly, so every asset here
must be pre-optimized before it ships.
