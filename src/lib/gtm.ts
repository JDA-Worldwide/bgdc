import { sendGTMEvent } from "@next/third-parties/google";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  sendGTMEvent(payload);
}

export function isPdfUrl(url: string): boolean {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    return /\.pdf$/i.test(pathname);
  } catch {
    return /\.pdf($|\?)/i.test(url);
  }
}

export function fileNameFromUrl(url: string): string {
  try {
    const pathname = new URL(url, window.location.origin).pathname;
    const segment = pathname.split("/").pop();
    return segment || url;
  } catch {
    const segment = url.split("/").pop()?.split("?")[0];
    return segment || url;
  }
}

export interface NavClickParams {
  linkText: string;
  linkUrl: string;
  linkLocation: string;
}

export function trackNavClick({ linkText, linkUrl, linkLocation }: NavClickParams) {
  pushToDataLayer({
    event: "nav_click",
    link_text: linkText,
    link_url: linkUrl,
    link_location: linkLocation,
  });
}

export interface CtaClickParams {
  buttonText: string;
  buttonUrl: string;
  ctaLocation: string;
}

export function trackCtaClick({ buttonText, buttonUrl, ctaLocation }: CtaClickParams) {
  pushToDataLayer({
    event: "cta_click",
    button_text: buttonText,
    button_url: buttonUrl,
    cta_location: ctaLocation,
  });
}

export interface FileDownloadParams {
  fileName: string;
  fileUrl: string;
  linkText: string;
}

export function trackFileDownload({ fileName, fileUrl, linkText }: FileDownloadParams) {
  pushToDataLayer({
    event: "file_download",
    file_name: fileName,
    file_url: fileUrl,
    link_text: linkText,
  });
}

export function trackPageView(pagePath: string) {
  pushToDataLayer({
    event: "page_view",
    page_path: pagePath,
  });
}
