/**
 * Centralized site configuration.
 *
 * Change the domain, contact details, or résumé availability here and the
 * whole site (metadata, canonical URLs, structured data, buttons) follows.
 * Nothing else should hard-code the domain.
 */
export const siteConfig = {
  name: "Patrick Hourihan",
  shortName: "PH",
  role: "Software Developer Building AI-Enabled Products",
  location: "Western Massachusetts",
  /* Approx. coordinates for Belchertown, MA — a field-report detail. */
  coordinates: "42.2751° N, 72.4009° W",

  url: "https://patrickhourihan.com",
  // The www host is configured as a redirect to the apex in Cloudflare; see CLOUDFLARE_DEPLOY.md.

  title: "Patrick Hourihan — Software Developer Building AI-Enabled Products",
  description:
    "Patrick Hourihan builds practical software, AI-enabled products, business tools, and production websites using TypeScript, Next.js, Supabase, SQL, APIs, and modern AI development workflows.",

  email: "hikewithcats@gmail.com",

  links: {
    github: "https://github.com/hikewithcats",
    personalSite: "https://poundkeeper.com",
  },

  /**
   * Résumé download.
   * The PDF lives at `public/resume/<file>`. It is intentionally NOT committed
   * yet — until the real file exists, `available` stays false and the UI shows
   * a clearly-disabled button instead of a broken link.
   */
  resume: {
    available: false,
    path: "/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf",
    label: "Download Résumé",
  },

  /** Social share image. Replace the SVG with a 1200×630 PNG for best support. */
  ogImage: "/images/og-image.svg",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Client Work", href: "#client-work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Working With AI", href: "#ai-workflow" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];
