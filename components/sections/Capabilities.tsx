import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { capabilityGroups } from "@/lib/capabilities";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-24 border-b border-line py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="capabilities-heading"
          index="03"
          label="Technical Capabilities"
          title="The tools I actually reach for"
          intro="A working toolkit. Only what I've used to build and ship the projects above."
        />

        <dl className="mt-14 divide-y divide-line border-t border-line">
          {capabilityGroups.map((group) => (
            <Reveal
              as="div"
              key={group.index}
              className="grid gap-3 py-7 md:grid-cols-[0.5fr_1.5fr] md:gap-10"
            >
              <dt className="flex items-baseline gap-3">
                <span className="label label-ember">{group.index}</span>
                <span className="font-display text-xl text-cream">{group.title}</span>
              </dt>
              <dd className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-cream-dim">
                {group.items.map((item, i) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {i > 0 && (
                      <span className="text-cream-faint" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {item}
                  </span>
                ))}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
