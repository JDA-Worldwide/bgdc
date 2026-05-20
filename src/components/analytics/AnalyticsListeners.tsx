"use client";

import { Suspense } from "react";
import FileDownloadListener from "./FileDownloadListener";
import PageViewTracker from "./PageViewTracker";

export default function AnalyticsListeners() {
  return (
    <>
      <FileDownloadListener />
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
