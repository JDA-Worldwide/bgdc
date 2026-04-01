import "server-only";
import { draftMode } from "next/headers";
import { client } from "./client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  stega = true,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  stega?: boolean;
}): Promise<T> {
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  } catch {
    // Outside request context (generateStaticParams, build time)
  }

  if (isDraftMode) {
    return client
      .withConfig({
        token: process.env.SANITY_API_TOKEN,
        perspective: "previewDrafts",
        useCdn: false,
        stega: stega ? { enabled: true, studioUrl: "/studio" } : false,
      })
      .fetch<T>(query, params, {
        next: { revalidate: 0 },
      });
  }

  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags.length ? undefined : 60,
      tags,
    },
  });
}
