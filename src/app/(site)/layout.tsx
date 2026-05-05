import { draftMode } from "next/headers";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { stegaClean } from "@sanity/client/stega";
import VisualEditingClient from "@/components/global/VisualEditingClient";
import { PreviewProvider } from "@/components/global/PreviewContext";
import { navigationQuery, settingsQuery } from "@/sanity/lib/queries";
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

interface SocialLink {
  platform: string;
  url: string;
}

interface GlobalSettings {
  socialLinks?: SocialLink[];
  address?: string;
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [{ data: navigation }, { data: settings }, { isEnabled: isDraftMode }] = await Promise.all([
    sanityFetch({ query: navigationQuery, tags: ["navigation"] }),
    sanityFetch({ query: settingsQuery, tags: ["globalSettings"] }),
    draftMode(),
  ]);

  const nav = stegaClean(navigation) as NavigationData | null;
  const typedSettings = stegaClean(settings) as GlobalSettings | null;

  return (
    <PreviewProvider isPreview={isDraftMode}>
      <Navigation items={nav?.items} ctaLabel={nav?.ctaLabel} ctaUrl={nav?.ctaUrl} />
      <main id="main-content">{children}</main>
      <Footer socialLinks={typedSettings?.socialLinks} address={typedSettings?.address} />
      {isDraftMode && (
        <>
          <SanityLive />
          <VisualEditingClient />
        </>
      )}
    </PreviewProvider>
  );
}
