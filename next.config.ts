import type { NextConfig } from "next";

/**
 * Static-export configuration for Cloudflare Pages.
 *
 * - `output: "export"` emits a fully static site into `out/` at build time.
 *   No Node server, database, or runtime is required to host this site.
 * - `images.unoptimized` is required because the static export has no image
 *   optimization server. All project imagery is pre-optimized SVG/raster.
 * - `trailingSlash` produces clean directory-style URLs (e.g. /#projects works
 *   from index.html) that map predictably onto a static host.
 *
 * See CLOUDFLARE_DEPLOY.md for the full deployment story.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
