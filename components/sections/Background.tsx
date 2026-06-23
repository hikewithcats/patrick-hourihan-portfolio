import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { backgroundRoles, transferableSkills } from "@/lib/capabilities";

export default function Background() {
  return (
    <section
      id="background"
      aria-labelledby="background-heading"
      className="scroll-mt-24 border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="background-heading"
          index="05"
          label="Professional Background"
          title="A nontraditional path to software"
          intro="Before software, I spent years in client-facing roles — explaining complex things to real people and following through on what I promised. That is most of the job."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Roles */}
          <Reveal>
            <span className="label label-moss">Where I&apos;ve worked</span>
            <ul className="mt-4 border-t border-line">
              {backgroundRoles.map((r) => (
                <li
                  key={`${r.role}-${r.org}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-4"
                >
                  <span className="font-display text-lg text-cream">{r.role}</span>
                  <span className="text-sm text-cream-dim">{r.org}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-cream-dim">
              More than seven years working directly with clients, business
              owners, and stakeholders.
            </p>
            <p className="mt-3 text-sm text-cream-faint">
              B.S. in Business Management
              <span className="italic"> (exact official degree title pending final confirmation)</span>.
            </p>
          </Reveal>

          {/* Transferable skills */}
          <Reveal delay={80}>
            <span className="label label-moss">What carries over</span>
            <ul className="mt-4 space-y-3">
              {transferableSkills.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-soft"
                    aria-hidden="true"
                  />
                  <span className="text-cream-dim">{skill}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
