import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SoftwareProjects from "@/components/sections/SoftwareProjects";
import Capabilities from "@/components/sections/Capabilities";
import AiWorkflow from "@/components/sections/AiWorkflow";
import { DocIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software Case Studies",
  description:
    "Technical case studies, skills, and development process from Patrick Hourihan: Next.js, TypeScript, SQL, Supabase/Postgres, APIs, and AI-assisted development.",
  alternates: { canonical: "/software/" },
};

/** The technical detail for recruiters and hiring managers. */
export default function SoftwarePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-line py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-[var(--spacing-gutter)]">
            <span className="label label-accent">For recruiters and hiring managers</span>
            <h1 className="mt-4 text-[2.5rem] sm:text-6xl">Software case studies</h1>
            <p className="mt-4 max-w-2xl text-lg text-fg-dim">
              The technical side of my work: what I built, how I built it, and
              where each project honestly stands today.
            </p>
            <a
              href={siteConfig.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-6"
            >
              <DocIcon className="h-4 w-4" /> View Resume
            </a>
          </div>
        </section>
        <SoftwareProjects />
        <Capabilities />
        <AiWorkflow />
      </main>
      <Footer />
    </>
  );
}
