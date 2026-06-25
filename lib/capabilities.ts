/**
 * Technical capabilities - verified skills only.
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
    title: "Data & Backend",
    items: [
      "Supabase",
      "Postgres",
      "SQL",
      "Authentication",
      "Private storage",
      "Row Level Security",
    ],
  },
  {
    index: "03",
    title: "Application Integrations",
    items: ["REST APIs", "Next.js API routes", "Webhooks", "Stripe", "Resend"],
  },
  {
    index: "04",
    title: "Development & Delivery",
    items: [
      "Git",
      "GitHub",
      "Vercel",
      "Cloudflare",
      "SiteGround",
      "WordPress",
      "WooCommerce",
    ],
  },
  {
    index: "05",
    title: "AI-Assisted Development",
    items: [
      "Claude Code",
      "OpenAI Codex",
      "ChatGPT",
      "Technical specification writing",
      "Repository auditing",
      "Debugging",
      "Documentation",
      "QA planning",
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

/** Professional background, prior roles connected to software work. */
export const backgroundRoles: { role: string; org: string; context?: string }[] = [
  {
    role: "Software Projects & AI-Assisted Development",
    org: "Current focus",
    context: "The portfolio projects above: defining, building, debugging, and shipping real software.",
  },
  {
    role: "Energy Consultant",
    org: "Trinity Solar",
    context: "Consultative, client-facing role: assessing needs and explaining a technical product to homeowners.",
  },
  {
    role: "Territory Manager",
    org: "MicroSurgical Technology",
    context: "Ophthalmic medical-device sales supporting surgical facilities across Florida, working with surgeons, hospital administrators, and surgical teams on technical product education and account management.",
  },
  {
    role: "Outside Sales Representative",
    org: "W.B. Mason",
    context: "B2B outside sales: opened new markets in Buffalo and Miami, managed a large account base, and handled daily prospecting, pricing, contracts, and customer support.",
  },
  {
    role: "Pound Keeper / Animal Care",
    org: "Belchertown Animal Control",
  },
  {
    role: "Community Work",
    org: "Dakin Humane Society / BARC",
  },
];

export const transferableSkills: string[] = [
  "Requirements discovery",
  "Explaining complex systems",
  "Client and stakeholder communication",
  "Independent follow-through",
  "Debugging messy real-world problems",
  "Turning nontechnical needs into concrete deliverables",
];
