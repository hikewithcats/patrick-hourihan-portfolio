import Reveal from "@/components/Reveal";
import type { ReactNode } from "react";

/**
 * Section header: a small label, a large display heading, and optional
 * supporting copy. `index` is optional and used on the /software/ page.
 */
export default function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal className="flex items-center gap-3">
        {index && (
          <>
            <span className="label label-accent">{index}</span>
            <span className="h-px w-8 bg-line" aria-hidden="true" />
          </>
        )}
        <span className={index ? "label" : "label label-accent"}>{label}</span>
      </Reveal>
      <Reveal as="h2" id={id} delay={60} className="mt-4 text-[2.15rem] sm:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={120} className="mt-4 text-lg text-fg-dim">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
