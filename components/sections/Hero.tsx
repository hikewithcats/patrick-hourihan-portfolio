import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";
import { ArrowDown, ArrowUpRight, DocIcon, GitHubIcon, MailIcon } from "@/components/ui/icons";

const fieldNotes: { k: string; v: string }[] = [
  { k: "stack", v: "TypeScript · Next.js · Supabase" },
  { k: "focus", v: "AI-enabled products · web apps" },
  { k: "status", v: "Building & open to roles" },
  { k: "region", v: "Western Massachusetts" },
];

export default function Hero() {
  const resumeAvailable = siteConfig.resume.available;

  return (
    <section
      aria-labelledby="hero-name"
      className="relative overflow-hidden border-b border-line"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-[var(--spacing-gutter)] pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.55fr_1fr] lg:items-center lg:gap-16 lg:pb-28">
        {/* Left - the statement */}
        <div>
          <Reveal className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="label label-ember">{siteConfig.role.toUpperCase()}</span>
            <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
            <span className="label">{siteConfig.coordinates}</span>
          </Reveal>

          <Reveal
            as="h1"
            id="hero-name"
            delay={60}
            className="mt-6 text-[clamp(2.9rem,8vw,5.5rem)] leading-[0.98]"
          >
            Patrick Hourihan
          </Reveal>

          <Reveal
            as="p"
            delay={120}
            className="mt-5 max-w-2xl font-display text-2xl text-cream-dim sm:text-3xl"
          >
            Software developer building{" "}
            <span className="text-cream">AI-enabled products</span>. Practical
            tools, real websites, and shipped software.
          </Reveal>

          <Reveal as="p" delay={180} className="mt-6 max-w-2xl text-cream-dim">
            I build practical software, AI-enabled products, business tools, and
            production websites using TypeScript, Next.js, Supabase, SQL, APIs,
            and modern AI development workflows.
          </Reveal>

          <Reveal
            as="p"
            delay={220}
            className="mt-4 max-w-2xl border-l-2 border-moss-dim/60 pl-4 text-sm text-cream-dim"
          >
            More than seven years of client-facing sales and account-management
            experience brought to software development, alongside hands-on work
            defining, building, debugging, and deploying real products.
          </Reveal>

          {/* Primary actions */}
          <Reveal
            delay={280}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-[#180d05] transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              View Projects <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
              <ArrowUpRight className="h-3.5 w-3.5 text-cream-faint" />
            </a>

            {resumeAvailable ? (
              <a
                href={siteConfig.resume.path}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
              >
                <DocIcon className="h-4 w-4" /> {siteConfig.resume.label}
              </a>
            ) : (
              <span
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-line px-5 py-2.5 text-sm font-medium text-cream-faint"
                aria-disabled="true"
                title="Résumé PDF is being finalized and will be available soon."
              >
                <DocIcon className="h-4 w-4" /> {siteConfig.resume.label}
                <span className="text-[0.7rem] uppercase tracking-wider">soon</span>
              </span>
            )}

            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
            >
              <MailIcon className="h-4 w-4" /> Contact Patrick
            </a>
          </Reveal>
        </div>

        {/* Right - field-notes panel */}
        <Reveal
          delay={200}
          className="relative hidden lg:block"
          aria-hidden="true"
        >
          <div className="relative rounded-xl border border-line bg-surface/60 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)]">
            {/* corner ticks */}
            <Corner className="left-2 top-2" />
            <Corner className="right-2 top-2 rotate-90" />
            <Corner className="bottom-2 left-2 -rotate-90" />
            <Corner className="bottom-2 right-2 rotate-180" />

            <div className="flex items-center justify-between">
              <span className="label">Field notes</span>
              <span className="label label-moss">REV 2026.06</span>
            </div>
            <div className="rule mt-3" />
            <dl className="mt-4 space-y-3">
              {fieldNotes.map((row) => (
                <div key={row.k} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3">
                  <dt className="font-mono text-xs uppercase tracking-wider text-cream-faint">
                    {row.k}
                  </dt>
                  <dd className="font-mono text-sm text-cream">{row.v}</dd>
                </div>
              ))}
            </dl>
            <div className="rule mt-5" />
            <p className="mt-4 font-mono text-xs leading-relaxed text-cream-faint">
              <span className="text-moss">$</span> whoami
              <br />
              <span className="text-cream-dim">
                &gt; ai-assisted software developer
              </span>
              <br />
              <span className="text-cream-dim">&gt; define · spec · build · review · ship</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-3 w-3 border-l border-t border-ember-soft/50 ${className}`}
      aria-hidden="true"
    />
  );
}
