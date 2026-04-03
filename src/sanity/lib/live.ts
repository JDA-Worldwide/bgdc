import { defineLive } from "next-sanity/live";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: process.env.NEXT_PUBLIC_SANITY_BROWSER_TOKEN,
  fetchOptions: {
    revalidate: 60, // fallback TTL if the SSE connection drops
  },
});
