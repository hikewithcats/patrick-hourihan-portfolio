import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StatusPill from "@/components/ui/StatusPill";
import { ArrowUpRight } from "@/components/ui/icons";
import { visibleClientProjects, type ClientProject } from "@/lib/projects";

export default function ClientWork() {
  return (
    <section
      id="client-work"
      aria-labelledby="client-heading"
      className="scroll-mt-24 border-b border-line bg-ink-2/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="client-heading"
          index="02"
          label="Selected Client Work"
          title="Websites built for real businesses"
          intro="Client engagements where I owned requirements, the responsive build, integrations, and deployment — with an AI-assisted workflow throughout."
        />

        <div className="mt-14 space-y-8">
          {visibleClientProjects.map((project) => (
            <ClientCard key={project.id} project={project} />
          ))}
        </div>

        <Reveal
          as="p"
          className="mt-8 max-w-2xl text-sm text-cream-faint"
        >
          Additional client work is in progress and will be added here as each
          site goes live and is verified.
        </Reveal>
      </div>
    </section>
  );
}

function ClientCard({ project }: { project: ClientProject }) {
  return (
    <Reveal
      as="article"
      className="grid overflow-hidden rounded-xl border border-line bg-surface/60 md:grid-cols-[0.85fr_1fr]"
    >
      <figure className="border-b border-line md:border-b-0 md:border-r">
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
          className="aspect-[16/10] h-full w-full object-cover"
        />
      </figure>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status={project.status} />
          <span className="label">Client website</span>
        </div>

        <h3 className="mt-4 text-2xl sm:text-3xl">{project.name}</h3>
        <p className="mt-2.5 text-cream-dim">{project.summary}</p>

        <div className="mt-5">
          <span className="label label-moss">Patrick&apos;s role</span>
          <ul className="mt-2.5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {project.role.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-cream-dim">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-moss" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {project.boundary && (
          <p className="mt-5 rounded-md border border-line-soft bg-ink-2/60 px-3.5 py-3 text-sm text-cream-faint">
            {project.boundary}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ul className="flex flex-wrap gap-1.5">
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

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-cream-faint"
          >
            Visit {project.name}
            <ArrowUpRight className="h-3.5 w-3.5 text-cream-faint" />
          </a>
        )}
      </div>
    </Reveal>
  );
}
