import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { quoteHref } from "@/lib/site";

const steps = [
  {
    title: "Tell Me About Your Business",
    body: "Fill out a quick form describing what you need. It only takes a couple of minutes.",
  },
  {
    title: "Get a Free Quote",
    body: "I'll review your goals and recommend an approach that fits your business.",
  },
  {
    title: "Let's Build Something Great",
    body: "We agree on the scope, and I design and develop your website.",
  },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="border-b border-line py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading id="process-heading" label="How It Works" title="Three simple steps" />

        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 50} className="flex gap-4 md:block">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest font-display text-xl text-on-forest"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl md:mt-4">{step.title}</h3>
                <p className="mt-2 text-fg-dim">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-col gap-5 rounded-2xl bg-bg-2 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-display text-xl sm:text-2xl">You&apos;ll work directly with me.</p>
            <p className="mt-1.5 text-fg-dim">
              No account managers and no layers to get through. The person you
              talk to is the person building your website.
            </p>
          </div>
          <a href={quoteHref} className="btn btn-primary shrink-0">
            Start with a Free Quote
          </a>
        </Reveal>
      </div>
    </section>
  );
}
