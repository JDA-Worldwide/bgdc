import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageDataQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, webPageSchema } from "@/lib/jsonLd";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import CommunitySection from "@/components/home/CommunitySection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import MapSection from "@/components/home/MapSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import MomentumSection from "@/components/home/MomentumSection";
import CtaBanner from "@/components/home/CtaBanner";

interface HomepageData {
  title?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { _ref: string } };
  };
  hero?: Record<string, unknown>;
  stats?: Record<string, unknown>;
  community?: Record<string, unknown>;
  valueProps?: Record<string, unknown>;
  map?: Record<string, unknown>;
  industries?: Record<string, unknown>;
  momentum?: Record<string, unknown>;
  ctaBanner?: Record<string, unknown>;
}

interface GlobalSettings {
  siteTitle?: string;
  siteUrl?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: homepageDataQuery, tags: ["page"] }),
    sanityFetch({ query: settingsQuery, tags: ["globalSettings"] }),
  ]);

  const typedPage = page as HomepageData | null;
  const typedSettings = settings as GlobalSettings | null;
  const siteUrl =
    typedSettings?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  if (!typedPage?.title) {
    return {
      title: "Bargersville Economic Development — Cultivating Long-Term Success",
      description:
        "Rooted in community and built for business, Bargersville offers the location, infrastructure, and support to help your business grow.",
    };
  }

  return buildMetadata({ title: typedPage.title, seo: typedPage.seo }, siteUrl);
}

export default async function HomePage() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: homepageDataQuery, tags: ["page"] }),
    sanityFetch({ query: settingsQuery, tags: ["globalSettings"] }),
  ]);

  const data = (page ?? {}) as HomepageData;
  const typedSettings = settings as GlobalSettings | null;
  const siteUrl =
    typedSettings?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  return (
    <>
      {data.seo && (
        <JsonLd
          data={webPageSchema({
            title: data.seo.metaTitle || data.title || "Bargersville Economic Development",
            description: data.seo.metaDescription,
            url: siteUrl,
            organizationName: typedSettings?.siteTitle,
          })}
        />
      )}
      <h1 className="sr-only">
        Bargersville Economic Development — Cultivating Long-Term Success
      </h1>
      <HeroSection {...(data.hero as Record<string, never>)} />
      <StatsSection {...(data.stats as Record<string, never>)} />
      <CommunitySection {...(data.community as Record<string, never>)} />
      <ValuePropsSection {...(data.valueProps as Record<string, never>)} />
      <MapSection {...(data.map as Record<string, never>)} />
      <IndustriesSection {...(data.industries as Record<string, never>)} />
      <MomentumSection {...(data.momentum as Record<string, never>)} />
      <CtaBanner {...(data.ctaBanner as Record<string, never>)} />
    </>
  );
}
