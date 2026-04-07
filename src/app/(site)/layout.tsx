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

  return (
    <>
      <Navigation items={(navigation as NavigationData | null)?.items} />
      <main id="main-content">{children}</main>
      <Footer />
      <SanityLive />
      {(await draftMode()).isEnabled && <VisualEditingClient />}
    </>
  );
}
