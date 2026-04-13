"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  /** Animate direct children with a stagger instead of the container as one unit */
  stagger?: boolean;
  /** Additional delay before the animation starts (seconds) */
  delay?: number;
  /** ScrollTrigger start position (default: "top 85%") */
  start?: string;
}

export default function AnimateIn({
  children,
  className,
  stagger = false,
  delay = 0,
  start = "top 85%",
}: AnimateInProps) {
  const ref = useGsap<HTMLDivElement>((el) => {
    if (stagger) {
      const children = el.children;
      if (!children.length) return;
      gsap.fromTo(
        children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.1,
          delay,
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    } else {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay,
          scrollTrigger: {
            trigger: el,
            start,
          },
        }
      );
    }
  });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
