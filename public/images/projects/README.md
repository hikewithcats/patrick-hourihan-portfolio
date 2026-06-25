# Project images

Branded, on-brand "field-report" cover images for each project, used by the
project and client-work cards.

## Current assets

| File | Project | Type |
| --- | --- | --- |
| `my-cartoon-pet.jpg` | My Cartoon Pet | Real screenshot - marketing homepage (1280×800) |
| `my-cartoon-pet-signin.jpg` | My Cartoon Pet | Real screenshot - sign-in (case-study detail, 1280×800) |
| `iplayforkeepers.jpg` | IPlayForKeepers | Real screenshot (1280×800) |
| `keeping-up-with-the-robots.jpg` | Keeping Up With The Robots | Real screenshot (1280×800) |
| `cell-beauty-health.jpg` | Cell Beauty Health | Real screenshot (1280×800) |
| `zubin-home-valuation.jpg` | Zubin Home Valuation | Real screenshot (1280×800) |

Every project uses real desktop screenshots, saved as optimized JPEGs. The four
live sites were captured from production; My Cartoon Pet's were captured from a
local production build of the verified branch (marketing homepage + sign-in
only - the authenticated app screens are intentionally not shown, since no real
generation has been run).

## Refreshing a screenshot

1. Capture a clean desktop screenshot (1440×900) of the production site.
2. Downscale to 1280 px wide and save as an optimized JPEG (target < 250 KB),
   e.g. `sips -Z 1280 in.png --setProperty format jpeg --setProperty formatOptions 82 --out out.jpg`.
3. Save it here, then confirm the `image` (and `imageAlt`) fields in
   [`lib/projects.ts`](../../../lib/projects.ts) point at it.

Do **not** hotlink screenshots from external sites - always store a local,
optimized asset. Keep `imageAlt` descriptive.

## Why SVG

SVGs are tiny, crisp at every breakpoint, and load instantly with no image
optimization server (this site is a static export). `next.config.ts` sets
`images.unoptimized` accordingly.
