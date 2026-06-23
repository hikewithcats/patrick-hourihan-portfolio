# Project images

Branded, on-brand "field-report" cover images for each project, used by the
project and client-work cards.

## Current assets

| File | Project | Type |
| --- | --- | --- |
| `my-cartoon-pet.svg` | My Cartoon Pet | Branded treatment |
| `iplayforkeepers.svg` | IPlayForKeepers | Branded treatment |
| `keeping-up-with-the-robots.svg` | Keeping Up With The Robots | Branded treatment |
| `cell-beauty-health.svg` | Cell Beauty Health | Branded treatment |
| `zubin-home-evaluation.svg` | Zubin Home Evaluation (hidden) | Branded treatment |

These are intentional, designed placeholders — **not** empty "preview pending"
boxes and **not** invented UI screenshots. Each encodes the project's name,
status, stack, and a small motif in the site's dark editorial system.

## Swapping in real screenshots

For the two **live** projects (Keeping Up With The Robots, Cell Beauty Health)
a real desktop screenshot will read as more credible. To swap one in:

1. Capture a clean desktop screenshot (≈1200×800, 3:2). Crop consistently.
2. Optimize it (e.g. export a compressed `.webp` or `.png`, target < 250 KB).
3. Save it here, then update the `image` (and `imageAlt`) field for that
   project in [`lib/projects.ts`](../../../lib/projects.ts).

Do **not** hotlink screenshots from external sites — always store a local,
optimized asset. Keep `imageAlt` descriptive.

## Why SVG

SVGs are tiny, crisp at every breakpoint, and load instantly with no image
optimization server (this site is a static export). `next.config.ts` sets
`images.unoptimized` accordingly.
