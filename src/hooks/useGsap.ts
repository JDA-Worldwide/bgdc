"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  animation: (el: T) => void
) {
  const ref = useRef<T>(null);

  const stableAnimation = useCallback(animation, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => stableAnimation(el), el);
    return () => ctx.revert();
  }, [stableAnimation]);

  return ref;
}
