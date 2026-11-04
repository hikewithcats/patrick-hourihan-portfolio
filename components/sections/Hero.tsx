import Link from "next/link";
import { BrowserFrame, PhoneFrame } from "@/components/ui/DeviceFrames";
import { PinIcon } from "@/components/ui/icons";
import { showcaseProjects } from "@/lib/projects";
import { quoteHref, siteConfig } from "@/lib/site";

export default function Hero() {
  const browser = showcaseProjects.find((p) => p.id === "cell-beauty-health");
  const phone = showcaseProjects.find((p) => p.id === "zubin-home-valuation");

  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-[var(--spacing-gutter)] pb-12 pt-7 sm:pt-14 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-16">
        <div>
          <h1 id="hero-heading">
            <span className="block font-display text-[1.375rem] font-medium leading-tight tracking-normal text-accent sm:text-2xl">
              {siteConfig.name}
            </span>
            <span className="mt-2.5 block text-[2.375rem] leading-[1.06] sm:text-6xl">
              Modern Websites for Small Businesses. Built to Help You Grow.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-fg-dim sm:mt-6 sm:text-xl">
            I help local businesses and independent professionals build modern,
            affordable websites that make a great first impression and turn
            visitors into customers.
          </p>

          <div id="hero-actions" className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a href={quoteHref} className="btn btn-primary">
              Get a Free Website Quote
            </a>
            <Link href="/#work" className="btn btn-secondary">
              View My Work
            </Link>
          </div>

          <p className="mt-5 flex items-start gap-1.5 text-sm text-fg-dim">
            <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              {siteConfig.location} <span className="text-fg-faint" aria-hidden="true">|</span>{" "}
              {siteConfig.serviceArea}
            </span>
          </p>
        </div>

        {browser && phone && (
          <div className="relative pb-8 pl-[12%] sm:pb-10">
            <BrowserFrame
              src={browser.image}
              alt={browser.imageAlt}
              domain={browser.domain}
              eager
            />
            <PhoneFrame
              src={phone.mobileImage}
              alt={phone.mobileImageAlt}
              eager
              className="absolute bottom-0 left-0 w-[30%]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
