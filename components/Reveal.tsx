"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Progressive-enhancement scroll reveal.
 *
 * Renders its children normally. An IntersectionObserver marks the element
 * `data-shown` when it scrolls into view; the CSS in globals.css only applies
 * the hidden-then-revealed transition when JS is present AND the visitor has
 * not requested reduced motion. If JS fails or motion is reduced, the content
 * is fully visible — nothing here is required to read the page.
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      el.setAttribute("data-shown", "");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal=""
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
