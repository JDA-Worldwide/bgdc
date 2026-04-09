import { draftMode } from "next/headers";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import VisualEditingClient from "@/components/global/VisualEditingClient";
import { navigationQuery } from "@/sanity/lib/queries";
import Navigation from "@/components/global/Navigation";
import Footer from "@/components/global/Footer";

interface NavChild {
  label: string;
  url: string;
  isExternal?: boolean;
}

interface NavItem {
  label: string;
  url: string;
  isExternal?: boolean;
  children?: NavChild[];
}

interface NavigationData {
  ctaLabel?: string;
  ctaUrl?: string;
  items?: NavItem[];
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: navigation } = await sanityFetch({
    query: navigationQuery,
    tags: ["navigation"],
  });

  const nav = navigation as NavigationData | null;

  return (
    <>
      <Navigation items={nav?.items} ctaLabel={nav?.ctaLabel} ctaUrl={nav?.ctaUrl} />
      <main id="main-content">{children}</main>
      <Footer />
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditingClient />}
    </>
  );
}
