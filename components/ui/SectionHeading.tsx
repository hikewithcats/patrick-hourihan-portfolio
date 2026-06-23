import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

/**
 * Editorial section header: a small mono "field-report" label with an index,
 * a large display heading, and optional supporting copy.
 */
export default function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal className="flex items-center gap-3">
        <span className="label label-ember">{index}</span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <span className="label">{label}</span>
      </Reveal>
      <Reveal as="h2" id={id} delay={60} className="mt-5 text-4xl sm:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={120} className="mt-5 text-lg text-cream-dim">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
