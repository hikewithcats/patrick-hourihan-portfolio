/**
 * Centralized site configuration.
 *
 * Change the domain, contact details, or résumé availability here and the
 * whole site (metadata, canonical URLs, structured data, buttons) follows.
 * Nothing else should hard-code the domain.
 */
export const siteConfig = {
  name: "Patrick Hourihan",
  role: "Website Design and Development for Small Businesses",
  location: "Northampton, MA",
  serviceArea: "Serving Western Massachusetts & Beyond",

  url: "https://patrickhourihan.com",
  // The www host is configured as a redirect to the apex in Cloudflare; see CLOUDFLARE_DEPLOY.md.

  title: "Patrick Hourihan | Modern Websites for Small Businesses in Western Massachusetts",
  description:
    "Patrick Hourihan builds modern, affordable websites for small businesses and independent professionals in Northampton and Western Massachusetts. Get a free website quote.",

  email: "patrickmhourihan@gmail.com",
  phone: { display: "(716) 515-5734", e164: "+17165155734" },

  links: {
    github: "https://github.com/hikewithcats",
    // Main personal site.
    personalSite: "https://poundkeeper.com",
  },

  /**
   * Optional portrait for the About section, e.g. "/images/patrick.jpg" (4:5).
   * Leave null to render the section without a photo.
   */
  headshot: null as string | null,

  /** Latest verified resume. Rendered from `resume/resume.html`. */
  resume: {
    path: "/resume/Patrick_Hourihan_AI_Junior_Developer_Resume.pdf",
  },

  /** Social share image - 1200x630 PNG for broad social-platform support. */
  ogImage: "/images/og-image.png",
};

export type NavItem = { label: string; href: string };

/** Absolute paths so the nav also works from /software/. */
export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "About", href: "/#about" },
];

export const quoteHref = "/#quote";
