import type { ComponentType, SVGProps } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FlowIcon, RefreshIcon, WindowIcon, WrenchIcon } from "@/components/ui/icons";

const services: {
  title: string;
  body: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  {
    title: "Website Design & Development",
    body: "A modern, mobile-friendly website built around your business's goals, so people can quickly see what you do and how to reach you.",
    Icon: WindowIcon,
  },
  {
    title: "Website Redesign",
    body: "Already have a site that feels dated? I'll upgrade it with better design, performance, and usability.",
    Icon: RefreshIcon,
  },
  {
    title: "Website Maintenance & Support",
    body: "Ongoing updates, troubleshooting, hosting guidance, and improvements, so your site stays current without becoming your job.",
    Icon: WrenchIcon,
  },
  {
    title: "Business Automation & AI Integration",
    body: "Optional, practical tools like intake forms, lead management, and appointment workflows that save you time.",
    Icon: FlowIcon,
  },
];

const audiences = [
  "Contractors",
  "Plumbers",
  "Electricians",
  "Appraisers",
  "Auto repair shops",
  "Medical and wellness",
  "Local service providers",
  "Independent professionals",
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-line bg-bg-2 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
        <SectionHeading
          id="services-heading"
          label="Services"
          title="Everything your website needs, from one person"
          intro="Professional websites that help small businesses look credible, attract customers, and grow, without the complexity or expense of a traditional agency."
        />

        <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2">
          {services.map(({ title, body, Icon }, i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 40}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <Icon className="h-7 w-7 text-accent" />
              <h3 className="mt-3 text-xl sm:text-2xl">{title}</h3>
              <p className="mt-2 text-fg-dim">{body}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10">
          <h3 className="text-sm font-semibold">A good fit for</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <li
                key={audience}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-fg-dim"
              >
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
