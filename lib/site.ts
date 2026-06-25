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
  /* Approx. coordinates for Belchertown, MA - a field-report detail. */
  coordinates: "42.2751° N, 72.4009° W",

  url: "https://patrickhourihan.com",
  // The www host is configured as a redirect to the apex in Cloudflare; see CLOUDFLARE_DEPLOY.md.

  title: "Patrick Hourihan: Software Developer Building AI-Enabled Products",
  description:
    "Patrick Hourihan builds practical software, AI-enabled products, business tools, and production websites using TypeScript, Next.js, Supabase, SQL, APIs, and modern AI development workflows.",

  email: "patrickmhourihan@gmail.com",

  links: {
    github: "https://github.com/hikewithcats",
    // Main personal site.
    personalSite: "https://poundkeeper.com",
    // Secondary personal web property (not a featured project).
    hikeWithCats: "https://hikewithcats.com",
  },

  /**
   * Résumé download.
   * The PDF lives at `public/resume/<file>` (rendered from `resume/resume.html`).
   * When `available` is true, the hero and contact buttons become active
   * download links; when false they render as a clearly-disabled button.
   */
  resume: {
    available: true,
    path: "/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf",
    label: "Download Résumé",
  },

  /** Social share image - 1200×630 PNG for broad social-platform support. */
  ogImage: "/images/og-image.png",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Projects", href: "#projects" },
  { label: "Client Work", href: "#client-work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];
