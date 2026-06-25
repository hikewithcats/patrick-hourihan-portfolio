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
          intro="Three projects at different stages of the same craft: define the problem, build it, then review, test, and own the result."
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
        {/* 1. Name  2. Status  3. One-sentence description */}
        <h3 className="text-3xl sm:text-4xl">{project.name}</h3>
        <div className="mt-3">
          <StatusPill status={project.status} />
        </div>
        <p className="mt-4 text-lg text-cream-dim">{project.summary}</p>

        {/* 4. Stack */}
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

        {/* 5. What I built */}
        <div className="mt-6">
          <span className="label">What I built</span>
          <ul className="mt-2.5 space-y-2">
            {project.build.map((point, idx) => (
              <li key={idx} className="flex gap-2.5 text-cream-dim">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ember-soft" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* 6. Links */}
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

        {/* 7. Collapsed case study */}
        <details className="group mt-6 rounded-lg border border-line bg-surface/50">
          <summary className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-cream">
            <span className="flex items-center gap-2">
              <ChevronRight className="case-chevron h-4 w-4 text-ember-soft" />
              Case study: build notes and ownership
            </span>
          </summary>
          <div className="space-y-5 border-t border-line px-4 py-5">
            <Field label="Problem" body={project.problem} />
            <div>
              <span className="label label-moss">Under the hood</span>
              <ul className="mt-2.5 space-y-2">
                {project.implementation.map((point, idx) => (
                  <li key={idx} className="flex gap-2.5 text-sm text-cream-dim">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ember-soft" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <Field label="How I worked" body={project.approach} />
            {project.limitations && project.limitations.length > 0 && (
              <div>
                <span className="label">Current limitations</span>
                <ul className="mt-2.5 space-y-2">
                  {project.limitations.map((point, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-cream-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream-faint" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.detailImage && (
              <figure>
                <span className="label">Detail</span>
                <div className="mt-2.5 overflow-hidden rounded-lg border border-line bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.detailImage}
                    alt={project.detailImageAlt ?? ""}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover object-center"
                  />
                </div>
              </figure>
            )}
          </div>
        </details>
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
