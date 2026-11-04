import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { aiWorkflow } from "@/lib/capabilities";

export default function AiWorkflow() {
  return (
    <section
      id="ai-workflow"
      aria-labelledby="ai-heading"
      className="scroll-mt-24 border-b border-line bg-bg-2/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="ai-heading"
          index="03"
          label="How I Build With AI"
          title="AI does the typing. I own the judgment."
          intro="A repeatable process I run on every project. It is the same one that found and fixed real bugs in this work."
        />

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiWorkflow.map((s, i) => (
            <Reveal
              as="li"
              key={s.step}
              delay={i * 40}
              className="rounded-xl border border-line bg-surface/60 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-accent">{s.step}</span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-fg-dim">{s.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.06] p-6 sm:p-8">
          <p className="font-display text-xl text-fg sm:text-2xl">
            AI accelerates the work. Patrick remains responsible for requirements,
            technical decisions, review, testing, and delivery.
          </p>
          <p className="mt-3 text-sm text-fg-dim">
            Prompting is not the skill. Defining the problem, validating what the
            agent produced, and standing behind the result. That is the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
