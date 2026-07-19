"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-triggered reveal primitive (plan Part 5.3). Elements rise ~14px and
 * fade in the first time they enter the viewport; `delay` staggers siblings.
 *
 * Contract compliance:
 * - transform/opacity only (styles live in globals.css under [data-reveal]);
 * - the hidden initial state is gated behind BOTH `prefers-reduced-motion:
 *   no-preference` and `scripting: enabled`, so reduced-motion and no-JS
 *   users always see fully-visible content with zero motion;
 * - reveals once and disconnects — content never re-hides on scroll-up.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className = "",
  children,
}: {
  /** Rendered element — use "li" inside lists so semantics hold. */
  as?: ElementType;
  /** Transition delay in ms (stagger). */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-reveal", "in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.setAttribute("data-reveal", "in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      "data-reveal": "",
      className: className || undefined,
      style: delay
        ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
        : undefined,
    },
    children
  );
}
