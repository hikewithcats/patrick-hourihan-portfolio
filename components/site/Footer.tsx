import { siteConfig } from "@/lib/site";

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function Footer() {
  const links = [
    { label: siteConfig.phone.display, href: `tel:${siteConfig.phone.e164}` },
    { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Resume (PDF)", href: siteConfig.resume.path, ...external },
    { label: "Software case studies", href: "/software/" },
    { label: "GitHub", href: siteConfig.links.github, ...external },
    { label: "PoundKeeper.com (personal site)", href: siteConfig.links.personalSite, ...external },
  ];

  return (
    <footer className="bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-[var(--spacing-gutter)] py-12 sm:flex-row sm:justify-between">
        <div>
          <p className="font-display text-xl">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-fg-dim">{siteConfig.role}</p>
          <p className="mt-1 text-sm text-fg-dim">
            {siteConfig.location} | {siteConfig.serviceArea}
          </p>
          <p className="mt-5 text-xs text-fg-faint">
            © {new Date().getFullYear()} Patrick Hourihan
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-1 sm:items-end">
            {links.map(({ label, ...props }) => (
              <li key={label}>
                <a {...props} className="inline-block py-2.5 text-[0.9375rem] leading-6 sm:py-1.5 text-fg-dim hover:text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
