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
          intro="Before software, I spent years in roles where the job was to understand messy real-world problems, explain complex products clearly, and follow through with clients. That experience carries directly into how I build software: define the problem, write the spec, test the flow, and ship something useful."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Roles */}
          <Reveal>
            <span className="label label-moss">Where I&apos;ve worked</span>
            <ul className="mt-4 border-t border-line">
              {backgroundRoles.map((r) => (
                <li
                  key={`${r.role}-${r.org}`}
                  className="border-b border-line py-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-display text-lg text-cream">{r.role}</span>
                    <span className="text-sm text-cream-dim">{r.org}</span>
                  </div>
                  {r.context && (
                    <p className="mt-1.5 text-sm text-cream-faint">{r.context}</p>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <span className="label label-moss">Education</span>
              <p className="mt-2 text-cream">
                Bachelor of Science in Business Administration
              </p>
              <p className="text-sm text-cream-dim">
                University at Buffalo, SUNY, School of Management
              </p>
              <p className="text-sm text-cream-dim">
                Concentration: Financial Analysis
              </p>
            </div>
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
