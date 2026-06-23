/**
 * Project + client-work data.
 *
 * Every fact here was verified against the actual repositories, live HTTP
 * checks, and GitHub repo visibility on 2026-06-23. Links appear ONLY when
 * verified:
 *   - `liveUrl` is set only when the domain returned HTTP 200.
 *   - `githubUrl` is set only when the GitHub repository is PUBLIC.
 *
 * Nothing here states user counts, revenue, launch dates, performance metrics,
 * test coverage, or production status that was not confirmed.
 */

export type ProjectStatus =
  | "Live in production"
  | "In development"
  | "In development — working prototype"
  | "Draft — awaiting verified URL";

export interface Project {
  /** Stable id, also used for the anchor + image filename. */
  id: string;
  name: string;
  /** One-sentence description. */
  summary: string;
  /** The problem the product addresses. */
  problem: string;
  /** What Patrick built (AI-assisted). */
  built: string;
  /** Verified technology stack — short tags. */
  stack: string[];
  /** Key technical implementation details (case-study bullets). */
  implementation: string[];
  /** How AI-assisted development was used. */
  aiUse: string;
  /** What Patrick personally decided, reviewed, tested, or debugged. */
  ownership: string;
  status: ProjectStatus;
  /** Live site — only when verified (HTTP 200). */
  liveUrl?: string;
  /** GitHub — only when the repo is public. */
  githubUrl?: string;
  /** Branded project image in /public/images/projects/. */
  image: string;
  imageAlt: string;
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
      "An AI-enabled SaaS where pet owners turn a single photo into a clean cartoon mascot, preview it on merch, and publish a public pet profile.",
    problem:
      "The hard part isn't generating an image — it's generating a consistent, on-brand cartoon a pet owner actually recognizes as their animal, while keeping uploads private and billing trustworthy.",
    built:
      "A full SaaS architecture: Supabase authentication, a Postgres schema protected by Row Level Security, private storage buckets, a secure upload authorize → commit flow, an image-generation route with atomic per-user quotas, and Stripe subscriptions with Checkout, a billing portal, and webhook-driven plan state.",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Supabase Auth",
      "Postgres",
      "Row Level Security",
      "Supabase Storage",
      "Stripe",
      "Replicate (img2img)",
      "Vercel",
    ],
    implementation: [
      "Atomic Postgres quota enforcement via a stored procedure that counts pending + completed generations and never refunds failed ones, closing a credit-farming gap.",
      "Signed-URL upload flow (authorize → commit) with per-user storage prefixes, so a user can only read and write objects under their own id.",
      "Stripe webhook handler that verifies signatures and maps subscription status onto each profile's plan, driving access and generation limits.",
      "Row Level Security policies on every user-owned table (uploads, generations, pet profiles), with public-read only for shared theme/tagline catalogs.",
    ],
    aiUse:
      "Used Claude Code and OpenAI Codex to scaffold routes, write migrations, and assemble the generation pipeline from written specifications and acceptance criteria.",
    ownership:
      "Diagnosed a production-breaking mismatch after a schema migration dropped stored procedures the generation route still called; rewrote the generation route against the live schema, authored a write-hardening migration to close a quota-refund exploit, and reviewed every diff and security policy.",
    status: "In development",
    // No live link: mycartoonpet.com does not resolve. No GitHub link: repo is private.
    image: "/images/projects/my-cartoon-pet.svg",
    imageAlt:
      "Branded field-report card for My Cartoon Pet, an AI pet-cartoon SaaS, marked in development.",
  },
  {
    id: "iplayforkeepers",
    name: "IPlayForKeepers",
    summary:
      "A mobile-first fantasy-football platform for dynasty leagues, best-ball formats, league history, and custom competition formats.",
    problem:
      "Casual fantasy apps don't serve serious dynasty and best-ball leagues that want deep history, real commissioner control, and custom formats — all on a phone-first interface.",
    built:
      "A working prototype: sixteen routable league screens — multi-league dashboard, scoreboard, best-ball optimizer, standings, rosters, player pool, FAAB waivers, trades, a slow-draft room, a future-pick ledger, a commissioner center, a custom-format lab, and league chat — driven by a deterministic seeded data engine standing in for the planned backend.",
    stack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "OpenNext",
      "Cloudflare Workers",
    ],
    implementation: [
      "A real best-ball lineup optimizer that auto-selects the highest-scoring legal lineup each week, rather than a static mock.",
      "A deterministic, seeded data engine (375 players, full schedule and derived standings) so every demo renders identically and reproducibly.",
      "TypeScript types that mirror the planned Supabase schema, so the mock engine can later be swapped for a live backend with minimal churn.",
      "A successful Cloudflare Workers build via OpenNext and Wrangler, with the deployment pipeline configured.",
    ],
    aiUse:
      "Scaffolded the multi-screen application and the seeded data engine with AI coding agents, working from a written product specification.",
    ownership:
      "Defined the product scope and league rules, structured the sixteen screens and mobile navigation, validated the best-ball optimizer's output, and confirmed a clean Cloudflare build.",
    status: "In development — working prototype",
    // No live link: iplayforkeepers.com does not resolve. No GitHub link: repo is private.
    image: "/images/projects/iplayforkeepers.svg",
    imageAlt:
      "Branded field-report card for IPlayForKeepers, a dynasty fantasy-football platform, marked as a working prototype.",
  },
  {
    id: "keeping-up-with-the-robots",
    name: "Keeping Up With The Robots",
    summary:
      "A live Western Massachusetts AI newsletter and community site that signs up subscribers and routes contact messages from day one.",
    problem:
      "Small-business owners and creators in the Pioneer Valley want practical, no-hype guidance on AI — and a local community to learn it with.",
    built:
      "A production, responsive marketing site with newsletter signup and contact handling powered by Resend, served through REST-style Next.js API routes and deployed on Vercel.",
    stack: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Resend",
      "Vercel",
    ],
    implementation: [
      "A /api/subscribe route that adds contacts to a Resend audience and falls back to a welcome email when no audience is configured.",
      "A /api/contact route that delivers form submissions through Resend, with a development fallback that logs safely when API keys are absent.",
      "A responsive, custom dark theme built on Tailwind CSS v4 with mobile navigation and accessible forms.",
    ],
    aiUse:
      "Built with AI coding agents against a written project spec; brand copy and structure were drafted, reviewed, and refined by Patrick.",
    ownership:
      "Owned the brand and positioning, wrote and approved the copy, integrated Resend for both flows, and deployed the site to a live domain on Vercel.",
    status: "Live in production",
    liveUrl: "https://keepingupwiththerobots.com",
    githubUrl: "https://github.com/hikewithcats/keeping-up-with-the-robots",
    image: "/images/projects/keeping-up-with-the-robots.svg",
    imageAlt:
      "Branded field-report card for Keeping Up With The Robots, a live Western Massachusetts AI newsletter, marked live in production.",
  },
];

/* ---------------------------------------------------------------- *
 *  Selected client work
 * ---------------------------------------------------------------- */
export interface ClientProject {
  id: string;
  name: string;
  summary: string;
  /** Patrick's role — web development scope only. */
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
      "Responsive website development (Next.js, Tailwind CSS)",
      "Implementation of approved brand copy",
      "Consultation form and platform integration",
      "Deployment coordination",
      "AI-assisted development workflow throughout",
    ],
    boundary:
      "Patrick's role was web development only — no medical, clinical, or regulatory advice. The consultation form is handled by an embedded third-party provider, and the site intentionally avoids collecting medical history.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Embedded form (Tally)"],
    status: "Live in production",
    liveUrl: "https://www.cellbeautyhealth.com",
    image: "/images/projects/cell-beauty-health.svg",
    imageAlt:
      "Branded field-report card for Cell Beauty Health, a live client marketing website.",
  },
  {
    id: "zubin-home-evaluation",
    name: "Zubin Home Evaluation",
    summary:
      "A client marketing website for a residential home-evaluation business.",
    role: [
      "Requirements gathering and information architecture",
      "Responsive static website development",
      "Implementation of approved copy",
      "Deployment coordination",
    ],
    stack: ["Astro", "Static site"],
    status: "Draft — awaiting verified URL",
    image: "/images/projects/zubin-home-evaluation.svg",
    imageAlt:
      "Branded field-report card for Zubin Home Evaluation, a client website in draft.",
    // Hidden from the public site until a verified live URL and final details are supplied.
    // The data structure exists so the card can be enabled by setting `hidden` to false
    // and adding `liveUrl` once the site launches and clears its pre-launch checklist.
    hidden: true,
    note: "Pre-launch. Astro build is complete but unlaunched, with outstanding licensing/compliance checklist items and no verified production URL. Keep hidden until Patrick confirms a live URL.",
  },
];

/** Only the projects that should render publicly. */
export const visibleSoftwareProjects = softwareProjects.filter((p) => !p.hidden);
export const visibleClientProjects = clientProjects.filter((p) => !p.hidden);
