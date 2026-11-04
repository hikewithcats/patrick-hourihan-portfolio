"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems, quoteHref, siteConfig } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Support Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-[var(--spacing-gutter)]">
        <Link href="/" aria-label={`${siteConfig.name}, home`} className="flex items-center font-display text-lg font-medium whitespace-nowrap">
          {/* The hero already leads with the full name on a phone. */}
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-forest text-base text-on-forest sm:hidden"
          >
            PH
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-7">
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] text-fg-dim transition-colors hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href={quoteHref} className="btn btn-primary !min-h-10 !px-3.5 !py-2 !text-sm">
            Free Quote
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5">
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
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-bg md:hidden"
      >
        <ul className="px-[var(--spacing-gutter)] py-1">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line-soft last:border-0">
              <a href={item.href} onClick={() => setOpen(false)} className="block py-3.5 font-medium">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
