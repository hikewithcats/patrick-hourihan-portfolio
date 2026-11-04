import Reveal from "@/components/Reveal";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrames";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowUpRight, CheckIcon } from "@/components/ui/icons";
import { visibleShowcase, type ShowcaseProject } from "@/lib/projects";

export default function Work() {
  const clients = visibleShowcase.filter((p) => p.kind === "client");
  const own = visibleShowcase.filter((p) => p.kind === "own");

  return (
    <section id="work" aria-labelledby="work-heading" className="border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="work-heading"
          label="Websites I've Built"
          title="Real websites, live right now"
          intro="Open any of them on your phone and look around. That's what your customers would see."
        />

        <h3 className="label mt-12">Client websites</h3>
        <div className="mt-4 space-y-6">
          {clients.map((project) => (
            <ClientCard key={project.id} project={project} />
          ))}
        </div>

        <h3 className="label mt-14">My own businesses and products</h3>
        <p className="mt-2 max-w-2xl text-fg-dim">
          I also build and run my own projects, so I know what it&apos;s like on
          the owner&apos;s side of a website.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {own.map((project) => (
            <OwnCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientCard({ project }: { project: ShowcaseProject }) {
  return (
    <Reveal
      as="article"
      className="grid overflow-hidden rounded-2xl border border-line bg-surface md:grid-cols-[1.1fr_1fr]"
    >
      <div className="relative bg-bg-2 p-4 pb-8 pr-[16%] sm:p-7 sm:pb-10 sm:pr-[16%]">
        <BrowserFrame src={project.image} alt={project.imageAlt} domain={project.domain} />
        <PhoneFrame
          src={project.mobileImage}
          alt={project.mobileImageAlt}
          className="absolute bottom-4 right-4 w-[25%] sm:bottom-6 sm:right-6"
        />
      </div>
      <Details project={project} className="p-5 sm:p-8" />
    </Reveal>
  );
}

function OwnCard({ project }: { project: ShowcaseProject }) {
  return (
    <Reveal
      as="article"
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface"
    >
      <div className="bg-bg-2 p-4">
        <BrowserFrame src={project.image} alt={project.imageAlt} domain={project.domain} />
      </div>
      <Details project={project} className="flex flex-1 flex-col p-5" pushLink />
    </Reveal>
  );
}

function Details({
  project,
  className,
  pushLink = false,
}: {
  project: ShowcaseProject;
  className: string;
  pushLink?: boolean;
}) {
  return (
    <div className={className}>
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          project.kind === "client" ? "bg-forest text-on-forest" : "bg-bg-2 text-fg-dim"
        }`}
      >
        {project.label}
      </span>
      <h4 className="mt-3 text-2xl sm:text-[1.75rem]">{project.name}</h4>
      <p className="mt-1 text-sm text-fg-faint">{project.business}</p>
      <p className="mt-3 text-fg-dim">{project.summary}</p>

      <p className="mt-4 text-sm font-semibold">What I did</p>
      <ul className="mt-1.5 space-y-1.5 text-[0.9375rem] leading-snug text-fg-dim">
        {project.contribution.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
            {item}
          </li>
        ))}
      </ul>
      {project.note && <p className="mt-3 text-xs text-fg-faint">{project.note}</p>}

      <div className={pushLink ? "mt-auto pt-5" : "mt-5"}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-quiet w-full sm:w-auto"
        >
          Visit the live site
          <ArrowUpRight className="h-4 w-4" />
          <span className="sr-only">: {project.name} (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
