import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StatusPill from "@/components/ui/StatusPill";
import { ArrowUpRight, ChevronRight, GitHubIcon } from "@/components/ui/icons";
import { visibleSoftwareProjects, type Project } from "@/lib/projects";

export default function SoftwareProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="projects-heading"
          index="01"
          label="Selected Software Projects"
          title="Products I've defined, built, and debugged"
          intro="Three projects, in different stages of the same craft: turning a real problem into a written spec, building it with AI agents, then reviewing, testing, and owning the result."
        />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {visibleSoftwareProjects.map((project, i) => (
            <ProjectRow key={project.id} project={project} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article
      id={project.id}
      className="scroll-mt-24 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
    >
      {/* Image */}
      <Reveal className={flip ? "lg:order-2" : ""}>
        <figure className="overflow-hidden rounded-xl border border-line bg-surface">
          {/* Static export with unoptimized images; covers are lightweight SVGs,
              so a plain <img> is the correct, dependency-free choice here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover"
          />
        </figure>
      </Reveal>

      {/* Copy */}
      <Reveal delay={80} className={flip ? "lg:order-1" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
        </div>

        <h3 className="mt-4 text-3xl sm:text-4xl">{project.name}</h3>
        <p className="mt-3 text-lg text-cream-dim">{project.summary}</p>

        <dl className="mt-6 space-y-4">
          <Field label="Problem" body={project.problem} />
          <Field label="What I built" body={project.built} />
        </dl>

        {/* Stack */}
        <div className="mt-6">
          <span className="label">Stack</span>
          <ul className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-ink-2/60 px-2.5 py-1 font-mono text-xs text-cream-dim"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Case study */}
        <details className="group mt-6 rounded-lg border border-line bg-surface/50">
          <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-cream">
            <span className="flex items-center gap-2">
              <ChevronRight className="case-chevron h-4 w-4 text-ember-soft" />
              Case study — implementation, AI, and what I owned
            </span>
          </summary>
          <div className="space-y-5 border-t border-line px-4 py-5">
            <div>
              <span className="label label-moss">Key implementation</span>
              <ul className="mt-2.5 space-y-2">
                {project.implementation.map((point, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm text-cream-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-soft" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Field label="AI-assisted development" body={project.aiUse} />
            <Field label="What I decided, reviewed & debugged" body={project.ownership} />
          </div>
        </details>

        {/* Links */}
        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
              >
                Visit live site
                <ArrowUpRight className="h-3.5 w-3.5 text-cream-faint" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
              >
                <GitHubIcon className="h-4 w-4" /> View source
                <ArrowUpRight className="h-3.5 w-3.5 text-cream-faint" />
              </a>
            )}
          </div>
        )}
      </Reveal>
    </article>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <dt className="label">{label}</dt>
      <dd className="mt-1.5 text-cream-dim">{body}</dd>
    </div>
  );
}
