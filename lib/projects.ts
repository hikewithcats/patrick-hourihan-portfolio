/**
 * Project + client-work data.
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
 *  Selected client work
 * ---------------------------------------------------------------- */
export interface ClientProject {
  id: string;
  name: string;
  summary: string;
  /** Patrick's role - web development scope only. */
  role: string[];
  /** Explicit boundary on what Patrick did NOT provide. */
  boundary?: string;
  stack: string[];
  status: ProjectStatus;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  hidden?: boolean;
  note?: string;
}

export const clientProjects: ClientProject[] = [
  {
    id: "cell-beauty-health",
    name: "Cell Beauty Health",
    summary:
      "A responsive marketing website for a science-backed peptide-therapy wellness brand.",
    role: [
      "Requirements gathering and information architecture",
      "Responsive website implementation (Next.js, Tailwind CSS)",
      "Approved-copy integration",
      "Consultation form and platform integration",
      "QA",
      "Deployment coordination",
    ],
    boundary:
      "My role was limited to requirements, site structure, responsive implementation, QA, and deployment coordination. Medical and regulatory content came from the client.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Embedded form (Tally)"],
    status: "Live in production",
    liveUrl: "https://www.cellbeautyhealth.com",
    image: "/images/projects/cell-beauty-health.jpg",
    imageAlt:
      "Screenshot of the live Cell Beauty Health website: an elegant dark hero with the Cell Beauty Health logo over a cellular background and a “Book Your Free Consultation” call to action.",
  },
  {
    id: "zubin-home-valuation",
    name: "Zubin Home Valuation",
    summary:
      "A responsive marketing website for a residential appraisal and home-valuation business serving Buffalo and Western New York.",
    role: [
      "Requirements gathering and information architecture",
      "Responsive website development",
      "Implementation of approved copy",
      "QA",
      "Deployment coordination",
    ],
    boundary:
      "My role was limited to site structure, responsive implementation, QA, and deployment coordination. Appraisal credentials, service details, and business claims came from the client.",
    stack: ["Astro", "Static site"],
    status: "Live in production",
    liveUrl: "https://zubinhomevaluation.com",
    // No source link - client repository is not public, and source is not advertised.
    image: "/images/projects/zubin-home-valuation.jpg",
    imageAlt:
      "Screenshot of the live Zubin Home Valuation website: a professional hero reading “Residential Appraisals and Home Valuation Services in Buffalo & Western New York” with call-to-action buttons.",
    // Verified live (HTTP 200, real content) on 2026-06-25, so shown publicly.
  },
];

/** Only the projects that should render publicly. */
export const visibleSoftwareProjects = softwareProjects.filter((p) => !p.hidden);
export const visibleClientProjects = clientProjects.filter((p) => !p.hidden);
