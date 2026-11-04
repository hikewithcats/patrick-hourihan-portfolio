/**
 * Project data: software case studies for /software/ and the homepage gallery.
 *
 * Every fact here was verified against the actual repositories, live HTTP
 * checks, and GitHub repo visibility on 2026-06-23, and re-verified for the
 * My Cartoon Pet public-beta launch on 2026-07-22 (see the handoff packet in
 * reference:mycartoonpetupdate/ and the my-cartoon-pet repo itself). Links
 * appear ONLY when verified:
 *   - `liveUrl` is set only when the domain returned HTTP 200.
 *   - `githubUrl` is set only when the GitHub repository is PUBLIC.
 *
 * Nothing here states user counts, revenue, launch dates, performance metrics,
 * test coverage, or production status that was not confirmed.
 */

export type ProjectStatus =
  | "Live in production"
  | "Public beta"
  | "Live interactive prototype"
  | "In development";

export interface Project {
  /** Stable id, also used for the anchor + image filename. */
  id: string;
  name: string;
  /** One-sentence, plain-English description (visible). */
  summary: string;
  /** Verified technology stack, short tags (visible). */
  stack: string[];
  /** Two or three concise "what I built" bullets (visible). */
  build: string[];
  /** The problem the product addresses (case study). */
  problem: string;
  /** Deeper technical implementation details (case study). */
  implementation: string[];
  /**
   * Compact "internal systems" items (case study): the internal tooling
   * behind the product. Each explains the business problem, the technical
   * mechanism, and the skill demonstrated. Keep to three or fewer.
   */
  internalSystems?: { title: string; body: string }[];
  /** Short, varied note on how Patrick worked and what he owned (case study). */
  approach: string;
  /** Honest current limitations (case study, optional). */
  limitations?: string[];
  status: ProjectStatus;
  /** Live site, only when verified (HTTP 200). */
  liveUrl?: string;
  /** GitHub, only when the repo is public. */
  githubUrl?: string;
  /** Primary project image in /public/images/projects/. */
  image: string;
  imageAlt: string;
  /** Optional secondary/detail image shown inside the case study. */
  detailImage?: string;
  detailImageAlt?: string;
  /** If true, the project is omitted from the rendered site. */
  hidden?: boolean;
  /** Internal note explaining a hidden/gated entry. Not rendered. */
  note?: string;
}

/* ---------------------------------------------------------------- *
 *  Selected software projects (ordered)
 * ---------------------------------------------------------------- */
export const softwareProjects: Project[] = [
  {
    id: "my-cartoon-pet",
    name: "My Cartoon Pet",
    summary:
      "AI-enabled SaaS product where users upload a pet photograph, generate cartoon mascot-style artwork, preview designs on merchandise, and manage results through a private gallery.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Postgres",
      "SQL",
      "Row Level Security",
      "Stripe",
      "Vercel",
    ],
    build: [
      "Built and launched the public beta: guided upload and generation flow, pet profiles, private gallery, Stripe subscription billing, and signed-URL private storage on Next.js, Supabase, and Vercel.",
      "Designed the relational data layer: SQL migrations, Row Level Security on every user-owned table, and Postgres functions that enforce ownership and generation quotas atomically.",
      "Built internal founder analytics, scorecards, and reliable webhook-driven automation, working with AI coding assistants through written specs, repository audits, tests, and release gates.",
    ],
    problem:
      "Generating any cartoon is easy. Generating a consistent one a pet owner recognizes as their animal, with private uploads, trustworthy billing, and honest measurement of whether the product is working, is the hard part.",
    implementation: [
      "Three-step upload: authorize, a signed PUT to private storage, then a commit that verifies the stored file and enforces per-plan limits atomically in Postgres.",
      "Server-only generation: an atomic quota-check-and-create SQL function runs before any paid AI call. Failed generations are recorded without consuming quota.",
      "Stripe Checkout and a billing portal, with a signature-verified webhook as the single source of truth for plan status.",
      "An append-only product-events ledger and an email outbox with unique event keys, retries, and a reconciliation pass, so automation never double-sends or silently drops work.",
    ],
    internalSystems: [
      {
        title: "Founder analytics",
        body: "Tracks product events and produces reviewable scorecards for activation, generation success, and quality signals. Built as a server-only analytics layer on an append-only Postgres event ledger.",
      },
      {
        title: "Improvement Graph",
        body: "Connects customer outcomes, activation and quality metrics, countermetrics, data sources, ownership, and review cadence into one measurement and decision framework. Missing data is flagged rather than treated as zero.",
      },
      {
        title: "Reliable automation",
        body: "Reduces duplicate or missed work in billing and email automation. Uses idempotent webhook processing, an email outbox, and reconciliation checks so confirmations send exactly once.",
      },
    ],
    approach:
      "Mid-build I hit a real bug: the database had migrated to a new generation schema while the code still called functions that no longer existed. I traced it against the live database, realigned the API, and added tests that pin app constants to the migration. AI accelerated implementation and analysis; I owned product direction, requirements, acceptance criteria, review, testing decisions, and release gates.",
    limitations: [
      "Public beta with no paying customers yet.",
      "Final generation-quality review is still in progress.",
      "Merchandise previews are live, but ordering and fulfillment are gated for a limited release.",
    ],
    status: "Public beta",
    liveUrl: "https://mycartoonpet.com",
    // Verified live and public (HTTP 200) on 2026-07-22.
    // No GitHub link: repository is private (verified 2026-07-11).
    image: "/images/projects/my-cartoon-pet.jpg",
    imageAlt:
      "My Cartoon Pet public beta homepage: a serif hero reading “Your pet, as a cartoon character,” a “Make my pet's cartoon” call to action, and a real pet photo shown next to its finished cartoon sticker.",
    detailImage: "/images/projects/my-cartoon-pet-signin.jpg",
    detailImageAlt:
      "My Cartoon Pet public beta sign-in screen: a branded “Welcome back” card with empty email and password fields and a Sign in button. No real data is shown.",
  },
  {
    id: "iplayforkeepers",
    name: "IPlayForKeepers",
    summary:
      "Live mobile-first fantasy football prototype for dynasty, keeper, superflex, and best-ball leagues.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "OpenNext",
      "Cloudflare Workers",
    ],
    build: [
      "Built a sixteen-screen demo league with dashboards, standings, rosters, waivers, trades, draft state, chat, and future-pick tracking.",
      "Added deterministic seeded data so the demo renders the same way every time.",
      "Implemented a real best-ball lineup optimizer that selects the highest-scoring legal lineup each week.",
    ],
    problem:
      "Casual fantasy apps don't serve serious dynasty and best-ball leagues that want deep history, real commissioner control, and custom formats on a phone.",
    implementation: [
      "A seeded engine with fictional players, a full schedule, and derived standings, for reproducible demos.",
      "Types mirror a planned backend schema, so the mock layer can later be swapped for live data with minimal churn.",
      "Ships to Cloudflare Workers via OpenNext and Wrangler.",
    ],
    approach:
      "I scoped the product and league rules, structured the sixteen screens and mobile navigation, checked the optimizer's output by hand, and shipped the live prototype.",
    limitations: [
      "Fictional seeded data only.",
      "No production auth, payments, MFL import, live scoring, or real leagues yet.",
      "Prototype, not a finished fantasy hosting service.",
    ],
    status: "Live interactive prototype",
    liveUrl: "https://iplayforkeepers.com",
    githubUrl: "https://github.com/hikewithcats/iplayforkeepers",
    image: "/images/projects/iplayforkeepers.jpg",
    imageAlt:
      "Screenshot of the live IPlayForKeepers site: a dark fantasy-football landing page reading “Fantasy football hosting for leagues that play for keeps,” with a phone mockup of the app.",
  },
  {
    id: "keeping-up-with-the-robots",
    name: "Keeping Up With The Robots",
    summary:
      "Live community website for Western Massachusetts people and small businesses learning how to use AI.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend", "Vercel"],
    build: [
      "Built and deployed a responsive Next.js site with newsletter signup and contact handling.",
      "Integrated Resend through API routes with safe fallback behavior.",
      "Wrote and refined the positioning, structure, and launch copy.",
    ],
    problem:
      "Small businesses and creators in the Pioneer Valley want practical, no-hype guidance on AI, and a local community to learn it with.",
    implementation: [
      "/api/subscribe adds contacts to a Resend audience, with a welcome-email fallback.",
      "/api/contact delivers submissions through Resend, and logs safely in dev when keys are absent.",
      "Custom dark theme on Tailwind CSS v4, responsive with mobile navigation.",
    ],
    approach:
      "This one is more brand than backend. I owned the positioning and copy, wired up Resend, and deployed it live on Vercel.",
    status: "Live in production",
    liveUrl: "https://keepingupwiththerobots.com",
    githubUrl: "https://github.com/hikewithcats/keeping-up-with-the-robots",
    image: "/images/projects/keeping-up-with-the-robots.jpg",
    imageAlt:
      "Screenshot of the live Keeping Up With The Robots site: a dark hero reading “AI is moving fast. Western Mass is keeping up,” with a newsletter signup and a Western Massachusetts signal-grid map.",
  },
];

/* ---------------------------------------------------------------- *
 *  Websites shown in the homepage gallery (ordered)
 *
 *  Real small-business work comes first. `kind` keeps client work clearly
 *  separate from Patrick's own businesses and products. Set `hidden: true`
 *  to remove an entry from the site without deleting it.
 *  Screenshots captured from each live site on 2026-11-04.
 * ---------------------------------------------------------------- */
export interface ShowcaseProject {
  id: string;
  name: string;
  kind: "client" | "own";
  /** Badge text, e.g. "Client website". */
  label: string;
  /** What the business is, in a few words. */
  business: string;
  summary: string;
  /** Patrick's contribution, in plain language. */
  contribution: string[];
  /** Honest boundary on what Patrick did not provide. */
  note?: string;
  liveUrl: string;
  /** Domain shown in the browser frame. */
  domain: string;
  image: string;
  imageAlt: string;
  mobileImage: string;
  mobileImageAlt: string;
  hidden?: boolean;
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "zubin-home-valuation",
    name: "Zubin Home Valuation",
    kind: "client",
    label: "Client website",
    business: "Residential appraiser, Buffalo and Western New York",
    summary:
      "A local appraiser needed a site that earns trust quickly and makes it easy for homeowners, attorneys, and lenders to get in touch.",
    contribution: [
      "Worked out the requirements and site structure with the owner",
      "Built mobile-friendly pages for services, service area, FAQ, and contact",
      "Put one-tap calling and an appraisal request front and center",
      "Handled testing and launch coordination",
    ],
    note: "Credentials, service details, and business claims came from the client.",
    liveUrl: "https://zubinhomevaluation.com",
    domain: "zubinhomevaluation.com",
    image: "/images/projects/zubin-home-valuation.jpg",
    imageAlt:
      "Zubin Home Valuation website on a desktop: a navy hero reading Residential Appraisals and Home Valuation Services in Buffalo and Western New York, with buttons to request an appraisal or call.",
    mobileImage: "/images/projects/zubin-home-valuation-mobile.jpg",
    mobileImageAlt:
      "Zubin Home Valuation website on a phone, with large buttons to request an appraisal or call.",
  },
  {
    id: "cell-beauty-health",
    name: "Cell Beauty Health",
    kind: "client",
    label: "Client website",
    business: "Peptide therapy and wellness, virtual consultations",
    summary:
      "A wellness brand needed a polished, premium site that explains a complex service clearly and leads visitors to book a free consultation.",
    contribution: [
      "Turned the owner's goals and approved copy into a clear site structure",
      "Built the responsive site and connected the consultation form",
      "Handled testing and launch coordination",
      "Added new service sections and approved copy updates after launch",
    ],
    note: "Medical and regulatory content came from the client.",
    liveUrl: "https://www.cellbeautyhealth.com",
    domain: "cellbeautyhealth.com",
    image: "/images/projects/cell-beauty-health.jpg",
    imageAlt:
      "Cell Beauty Health website on a desktop: the logo over a warm cellular background with a Book Your Free Consultation button.",
    mobileImage: "/images/projects/cell-beauty-health-mobile.jpg",
    mobileImageAlt: "Cell Beauty Health website on a phone.",
  },
  {
    id: "keeping-up-with-the-robots",
    name: "Keeping Up With The Robots",
    kind: "own",
    label: "My own project",
    business: "Local newsletter and community, Western Massachusetts",
    summary:
      "A practical newsletter and community for Western Mass small business owners and creators learning to use AI.",
    contribution: [
      "Wrote the positioning and copy",
      "Designed and built the site",
      "Connected newsletter sign-up and the contact form",
    ],
    liveUrl: "https://keepingupwiththerobots.com",
    domain: "keepingupwiththerobots.com",
    image: "/images/projects/keeping-up-with-the-robots.jpg",
    imageAlt:
      "Keeping Up With The Robots website: a dark hero reading AI is moving fast, Western Mass is keeping up, with a newsletter sign-up and a map of local towns.",
    mobileImage: "/images/projects/keeping-up-with-the-robots-mobile.jpg",
    mobileImageAlt: "Keeping Up With The Robots website on a phone.",
  },
  {
    id: "hike-with-cats",
    name: "Hike With Cats",
    kind: "own",
    label: "My own brand",
    business: "Adventure-cat media and online shop",
    summary:
      "My own brand built around slowing down outdoors, with an online shop for branded apparel and stickers.",
    contribution: [
      "Created the brand",
      "Built and maintain the site on WordPress",
      "Set up the shop and product catalog",
    ],
    liveUrl: "https://hikewithcats.com",
    domain: "hikewithcats.com",
    image: "/images/projects/hike-with-cats.jpg",
    imageAlt:
      "Hike With Cats online shop: a meditating-cat logo above a grid of branded hoodies, stickers, and shirts with prices.",
    mobileImage: "/images/projects/hike-with-cats-mobile.jpg",
    mobileImageAlt: "Hike With Cats online shop on a phone.",
  },
  {
    id: "my-cartoon-pet",
    name: "My Cartoon Pet",
    kind: "own",
    label: "My own product, public beta",
    business: "Custom pet artwork app",
    summary:
      "Pet owners upload a photo, get a cartoon of their pet, and preview it on products. A full web application, not just a website.",
    contribution: [
      "Designed, built, and launched the public beta",
      "Built accounts, a private gallery, and subscription billing",
      "Connected AI image generation",
    ],
    liveUrl: "https://mycartoonpet.com",
    domain: "mycartoonpet.com",
    image: "/images/projects/my-cartoon-pet.jpg",
    imageAlt:
      "My Cartoon Pet website: a hero reading Your pet, as a cartoon character, with a real pet photo shown beside its finished cartoon.",
    mobileImage: "/images/projects/my-cartoon-pet-mobile.jpg",
    mobileImageAlt: "My Cartoon Pet website on a phone.",
  },
];

/** Only the projects that should render publicly. */
export const visibleSoftwareProjects = softwareProjects.filter((p) => !p.hidden);
export const visibleShowcase = showcaseProjects.filter((p) => !p.hidden);
