"use client";

import { useEffect, useState } from "react";
import { quoteHref } from "@/lib/site";

/**
 * Phone-only call to action. Appears once the hero buttons scroll away and
 * steps aside when the quote form arrives, so it never covers the form or footer.
 */
export default function StickyQuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-actions");
    const quote = document.getElementById("quote");
    if (!hero || !quote) return;

    let heroOnScreen = true;
    let quoteReached = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) {
          heroOnScreen = entry.isIntersecting || entry.boundingClientRect.top > 0;
        } else {
          quoteReached = entry.isIntersecting || entry.boundingClientRect.top < 0;
        }
      }
      setVisible(!heroOnScreen && !quoteReached);
    });
    observer.observe(hero);
    observer.observe(quote);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "invisible translate-y-full"
      }`}
    >
      <a href={quoteHref} className="btn btn-primary w-full">
        Get a Free Website Quote
      </a>
    </div>
  );
}
