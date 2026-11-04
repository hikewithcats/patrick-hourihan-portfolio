import Reveal from "@/components/Reveal";
import { ArrowUpRight, DocIcon, GitHubIcon } from "@/components/ui/icons";
import { aboutSkills, education, experience } from "@/lib/capabilities";
import { siteConfig } from "@/lib/site";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-b border-line bg-bg-2 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-[var(--spacing-gutter)] lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="label label-accent">About Patrick</span>
            {siteConfig.headshot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={siteConfig.headshot}
                alt="Patrick Hourihan"
                width={640}
                height={800}
                loading="lazy"
                className="mt-5 aspect-[4/5] w-44 rounded-2xl object-cover"
              />
            )}
            <h2 id="about-heading" className="mt-4 text-[2.15rem] sm:text-5xl">
              Hi, I&apos;m Patrick.
            </h2>
            <div className="mt-5 space-y-4 text-fg-dim">
              <p>
                I spent more than seven years in outside sales and territory
                management, opening new markets for W.B. Mason and then working
                with surgeons and hospital teams across Florida for
                MicroSurgical Technology. It taught me to listen first, explain
                things plainly, and follow through.
              </p>
              <p>
                Today I put that together with hands-on development. I build
                websites, applications, and business tools, both for clients and
                for my own businesses. I use modern AI-assisted development
                tools to work efficiently, and I test what I build before it
                goes live.
              </p>
              <p>
                When you work with me, you get one person who understands both
                the business side and the technical side.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-8">
            <h3 className="text-sm font-semibold">Skills</h3>
            <dl className="mt-3 space-y-3">
              {aboutSkills.map((group) => (
                <div key={group.title}>
                  <dt className="text-[0.9375rem] font-medium">{group.title}</dt>
                  <dd className="text-[0.9375rem] leading-snug text-fg-dim">{group.items}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal className="self-start rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl">Experience</h3>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <DocIcon className="h-4 w-4" /> View Resume
            </a>
            <a href={siteConfig.resume.path} download className="btn btn-quiet">
              Download PDF
            </a>
          </div>

          <ol className="mt-7 space-y-5 border-l border-line pl-5">
            {experience.map((job) => (
              <li key={`${job.role}-${job.org}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.6rem] top-2 h-2 w-2 rounded-full bg-accent"
                />
                <p className="font-semibold leading-snug">{job.role}</p>
                <p className="text-sm text-fg-faint">
                  {job.org} · {job.dates}
                </p>
                {job.detail && (
                  <p className="mt-1 text-[0.9375rem] leading-snug text-fg-dim">{job.detail}</p>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-line-soft pt-4 text-[0.9375rem] text-fg-dim">
            {education}
          </p>

          <div className="mt-5 border-t border-line-soft pt-4">
            <p className="text-sm font-semibold">Recruiters and hiring managers</p>
            <p className="mt-1 text-[0.9375rem] leading-snug text-fg-dim">
              My resume is above, and the technical detail behind my software
              work is one click away.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] font-medium">
              <a href="/software/" className="linkline py-2.5">
                Software case studies
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2.5 text-fg"
              >
                <GitHubIcon className="h-4 w-4" /> GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-fg-faint" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
