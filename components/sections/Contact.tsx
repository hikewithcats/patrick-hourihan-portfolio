import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/site";
import { ArrowUpRight, DocIcon, GitHubIcon, MailIcon } from "@/components/ui/icons";

export default function Contact() {
  const resumeAvailable = siteConfig.resume.available;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="contact-heading"
          index="06"
          label="Contact"
          title="Let's build something practical"
          intro="Open to software-development and AI-focused roles. The fastest way to reach me is email."
        />

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group flex min-w-0 items-center justify-between gap-4 rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-ember-soft/60 sm:p-6"
          >
            <span className="flex min-w-0 items-center gap-4">
              <MailIcon className="h-5 w-5 shrink-0 text-ember-soft" />
              <span className="min-w-0">
                <span className="block label">Email</span>
                <span className="mt-1 block break-words text-cream">{siteConfig.email}</span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-cream-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center justify-between gap-4 rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-ember-soft/60 sm:p-6"
          >
            <span className="flex min-w-0 items-center gap-4">
              <GitHubIcon className="h-5 w-5 shrink-0 text-cream" />
              <span className="min-w-0">
                <span className="block label">GitHub</span>
                <span className="mt-1 block break-words text-cream">github.com/hikewithcats</span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-cream-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </a>
        </Reveal>

        <Reveal delay={80} className="mt-4 flex flex-wrap items-center gap-3">
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
            href={siteConfig.links.personalSite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
          >
            Personal site — PoundKeeper.com
            <ArrowUpRight className="h-3.5 w-3.5 text-cream-faint" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
