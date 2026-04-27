import { draftMode } from "next/headers";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { stegaClean } from "@sanity/client/stega";
import VisualEditingClient from "@/components/global/VisualEditingClient";
import { PreviewProvider } from "@/components/global/PreviewContext";
import { navigationQuery, settingsQuery, footerQuery } from "@/sanity/lib/queries";
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
}

interface FooterData {
  address?: string;
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ data: navigation }, { data: settings }, { data: footer }, { isEnabled: isDraftMode }] =
    await Promise.all([
      sanityFetch({ query: navigationQuery, tags: ["navigation"] }),
      sanityFetch({ query: settingsQuery, tags: ["globalSettings"] }),
      sanityFetch({ query: footerQuery, tags: ["footer"] }),
      draftMode(),
    ]);

  const nav = stegaClean(navigation) as NavigationData | null;
  const typedSettings = stegaClean(settings) as GlobalSettings | null;
  const typedFooter = stegaClean(footer) as FooterData | null;

  return (
    <PreviewProvider isPreview={isDraftMode}>
      <Navigation items={nav?.items} ctaLabel={nav?.ctaLabel} ctaUrl={nav?.ctaUrl} />
      <main id="main-content">{children}</main>
      <Footer socialLinks={typedSettings?.socialLinks} address={typedFooter?.address} />
      {isDraftMode && (
        <>
          <SanityLive />
          <VisualEditingClient />
        </>
      )}
    </PreviewProvider>
  );
}
