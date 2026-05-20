"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/gtm";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const pagePath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(pagePath);
  }, [pathname, searchParams]);

  return null;
}
