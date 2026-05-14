"use client";

import { useRef, useEffect } from "react";
import { useIsPreview } from "@/components/global/PreviewContext";
import { gsap } from "@/lib/gsap";

export function useGsap<T extends HTMLElement = HTMLDivElement>(
  animation: (el: T) => void
) {
  const ref = useRef<T>(null);
  const animationRef = useRef(animation);
  const isPreview = useIsPreview();

  useEffect(() => {
    animationRef.current = animation;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || isPreview) return;

    const ctx = gsap.context(() => animationRef.current(el), el);
    return () => ctx.revert();
  }, [isPreview]);

  return ref;
}
