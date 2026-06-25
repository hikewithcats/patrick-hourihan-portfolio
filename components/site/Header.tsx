"use client";

import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/lib/site";
import { GitHubIcon } from "@/components/ui/icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll and support Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-[var(--spacing-gutter)]">
        <a
          href="#main"
          className="group flex items-center gap-2.5"
          aria-label={`${siteConfig.name}, back to top`}
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface font-mono text-[0.7rem] font-medium tracking-tight text-ember-soft"
          >
            PH
          </span>
          <span className="hidden font-display text-base text-cream sm:inline">
            Patrick Hourihan
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-cream-dim transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream-dim transition-colors hover:text-cream"
            aria-label="Patrick Hourihan on GitHub (opens in a new tab)"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-cream md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-line bg-ink-2 md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-[var(--spacing-gutter)] py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line-soft py-3.5 text-cream-dim transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-cream-dim transition-colors hover:text-cream"
            >
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
