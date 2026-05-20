"use client";

import { useEffect } from "react";
import { fileNameFromUrl, isPdfUrl, trackFileDownload } from "@/lib/gtm";

export default function FileDownloadListener() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement).closest("a[href]");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const isDownload = anchor.hasAttribute("download");
      if (!isDownload && !isPdfUrl(href)) return;

      const linkText = anchor.textContent?.trim() || href;
      trackFileDownload({
        fileName: fileNameFromUrl(href),
        fileUrl: href,
        linkText,
      });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
