import { siteConfig } from "@/lib/site";
import { ArrowUpRight, GitHubIcon } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)] py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-display text-xl text-cream">Patrick Hourihan</p>
            <p className="mt-1 text-sm text-cream-dim">{siteConfig.role}</p>
            <p className="mt-3 font-mono text-xs text-cream-faint">
              {siteConfig.location} · {siteConfig.coordinates}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3 sm:items-end">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
            >
              <GitHubIcon className="h-4 w-4" /> github.com/hikewithcats
              <ArrowUpRight className="h-3 w-3 text-cream-faint" />
            </a>
            <a
              href={siteConfig.links.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cream-dim transition-colors hover:text-cream"
            >
              PoundKeeper.com — personal & creative
              <ArrowUpRight className="h-3 w-3 text-cream-faint" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {siteConfig.email}
            </a>
          </nav>
        </div>

        <div className="rule mt-10" />
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-cream-faint">
            © {new Date().getFullYear()} Patrick Hourihan — End of field report.
          </p>
          <p className="font-mono text-xs text-cream-faint">
            Built with Next.js · Static export · Cloudflare Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
