import { sanityFetch } from "@/sanity/lib/fetch";
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
  const navigation = await sanityFetch<NavigationData | null>({
    query: navigationQuery,
    tags: ["navigation"],
    stega: false,
  });

  return (
    <>
      <Navigation items={navigation?.items} />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
