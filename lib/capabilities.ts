/**
 * Skills and experience - verified facts only.
 *
 * Deliberately excludes anything unverified (e.g. C#, .NET, ASP.NET,
 * SQL Server, Python, AWS, Docker). Presented as editorial groupings,
 * not a badge grid.
 */
export interface CapabilityGroup {
  index: string;
  title: string;
  items: string[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    index: "01",
    title: "Languages & Frontend",
    items: [
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Responsive design",
    ],
  },
  {
    index: "02",
    title: "SQL & Relational Data",
    items: [
      "SQL",
      "Postgres",
      "Supabase",
      "Relational schema design",
      "Migrations",
      "Row Level Security",
      "SQL functions & RPCs",
      "Analytics queries & scorecards",
    ],
  },
  {
    index: "03",
    title: "APIs & Automation",
    items: [
      "REST APIs",
      "Next.js route handlers",
      "Webhooks",
      "Stripe",
      "Resend",
      "Event processing",
      "Idempotency & reconciliation",
    ],
  },
  {
    index: "04",
    title: "Development & Delivery",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Cloudflare",
      "Testing",
      "Debugging",
      "Release gates",
      "Production verification",
    ],
  },
  {
    index: "05",
    title: "AI-Assisted Engineering",
    items: [
      "Claude Code",
      "OpenAI Codex",
      "ChatGPT",
      "Specification writing",
      "Repository auditing",
      "Prompt engineering",
      "QA planning",
      "Documentation",
    ],
  },
];

/** The six-step AI workflow. */
export const aiWorkflow: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Define the problem",
    body: "Start from the actual user or business problem and who it is for, not a feature list.",
  },
  {
    step: "02",
    title: "Write the spec",
    body: "Convert requirements into a written specification with clear, testable acceptance criteria before any code is generated.",
  },
  {
    step: "03",
    title: "Build with AI agents",
    body: "Drive AI coding agents for implementation, analysis, and documentation against that spec.",
  },
  {
    step: "04",
    title: "Inspect & validate",
    body: "Read the repository changes, question what the agent produced, and validate every technical claim.",
  },
  {
    step: "05",
    title: "Debug for real",
    body: "Debug failures using logs, database state, and real application behavior, not by trusting output blindly.",
  },
  {
    step: "06",
    title: "Test & document risk",
    body: "Test the real user flow across screens, then document what was decided, deferred, and still carries risk.",
  },
];

/** Short skill summary for the homepage About section. */
export const aboutSkills: { title: string; items: string }[] = [
  {
    title: "Websites",
    items: "HTML, CSS, JavaScript, TypeScript, React, Next.js, Astro, WordPress, responsive design",
  },
  {
    title: "Data and integrations",
    items: "SQL, Postgres, Supabase, REST APIs, webhooks, Stripe, Resend",
  },
  {
    title: "Delivery",
    items: "Git, GitHub, Cloudflare, Vercel, testing, debugging, AI-assisted development",
  },
  {
    title: "Working with people",
    items: "Requirements discovery, consultative sales, account management, plain-English communication",
  },
];

/** Professional experience. Facts mirror the resume in resume/. */
export const experience: {
  role: string;
  org: string;
  dates: string;
  detail?: string;
}[] = [
  {
    role: "Website and Software Development",
    org: "Client websites and my own products",
    dates: "Current",
    detail:
      "Defining, building, testing, and launching websites and web applications, working directly with business owners.",
  },
  {
    role: "Energy Consultant",
    org: "Trinity Solar",
    dates: "Nov 2025 to Present",
    detail:
      "Translate technical and financial details of solar projects into plain-English recommendations for homeowners.",
  },
  {
    role: "Territory Manager",
    org: "MicroSurgical Technology",
    dates: "May 2018 to Nov 2020",
    detail:
      "Managed sales and service for 150+ ophthalmic surgical facilities across Florida, with 13% year-over-year growth in the first year and 10% in the second.",
  },
  {
    role: "Outside Sales Representative",
    org: "W.B. Mason",
    dates: "Nov 2013 to Apr 2018",
    detail:
      "Opened the Buffalo and Miami markets, generating $1M+ in annual revenue within 12 months, and managed 400+ B2B accounts.",
  },
  {
    role: "Pound Keeper / Animal Care",
    org: "Belchertown Animal Control",
    dates: "Mar 2025 to Present",
  },
];

export const education =
  "B.S. in Business Administration, University at Buffalo School of Management";
