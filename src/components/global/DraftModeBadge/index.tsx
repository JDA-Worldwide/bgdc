"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore, useTransition } from "react";

function subscribe() {
  return () => {};
}

export default function DraftModeBadge() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // SSR returns false (not in frame); client snapshot reads the real value.
  const inFrame = useSyncExternalStore(
    subscribe,
    () => window.self !== window.top,
    () => false,
  );

  function exitDraftMode() {
    startTransition(async () => {
      await fetch("/api/draft-mode/disable");
      router.refresh();
    });
  }

  if (inFrame) return null;

  return (
    <div
      className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-brand-charcoal px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
      style={{ zIndex: 10000000 }}
      role="status"
      aria-label="Sanity draft mode is active"
    >
      {/* Pulsing dot indicating live edit mode */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-sun opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-sun" />
      </span>
      <span>Edit Mode</span>
      <button
        onClick={exitDraftMode}
        disabled={isPending}
        aria-label="Exit edit mode"
        className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/40 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          fill="currentColor"
          aria-hidden="true"
          className="h-2.5 w-2.5"
        >
          <path d="M2.22 2.22a.75.75 0 0 1 1.06 0L6 4.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L7.06 6l2.72 2.72a.75.75 0 1 1-1.06 1.06L6 7.06 3.28 9.78a.75.75 0 0 1-1.06-1.06L4.94 6 2.22 3.28a.75.75 0 0 1 0-1.06Z" />
        </svg>
      </button>
    </div>
  );
}
