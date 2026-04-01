import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homepageQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, webPageSchema } from "@/lib/jsonLd";
import PageBuilder from "@/components/PageBuilder";
import HeroSection from "@/components/home/HeroSection";
import TickerSection from "@/components/home/TickerSection";
import WhySection from "@/components/home/WhySection";
import LocationSection from "@/components/home/LocationSection";
import GrowthSection from "@/components/home/GrowthSection";
import IncentivesSection from "@/components/home/IncentivesSection";
import CtaBanner from "@/components/home/CtaBanner";

interface PageData {
  title: string;
  slug: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset: { _ref: string } };
  };
  modules?: Array<{ _type: string; _key: string; [key: string]: unknown }>;
}

interface GlobalSettings {
  siteTitle?: string;
  siteUrl?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    sanityFetch<PageData | null>({ query: homepageQuery, tags: ["page"], stega: false }),
    sanityFetch<GlobalSettings | null>({
      query: settingsQuery,
      tags: ["globalSettings"],
      stega: false,
    }),
  ]);

  if (!page) {
    return {
      title:
        "Bargersville Economic Development — Grow Where Access Meets Opportunity",
      description:
        "Bargersville sits at the crossroads of Indiana\u2019s future — where I-69 and SR 144 converge, where Indianapolis is 25 minutes away, and where a community committed to pro-business growth is ready to welcome you.",
    };
  }

  const siteUrl =
    settings?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";
  return buildMetadata(page, siteUrl);
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    sanityFetch<PageData | null>({ query: homepageQuery, tags: ["page"] }),
    sanityFetch<GlobalSettings | null>({
      query: settingsQuery,
      tags: ["globalSettings"],
    }),
  ]);

  // If a "home" page exists in Sanity with modules, render via PageBuilder
  if (page?.modules?.length) {
    const siteUrl =
      settings?.siteUrl ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    return (
      <>
        <JsonLd
          data={webPageSchema({
            title: page.seo?.metaTitle || page.title,
            description: page.seo?.metaDescription,
            url: siteUrl,
            organizationName: settings?.siteTitle,
          })}
        />
        <h1 className="sr-only">{page.title}</h1>
        <PageBuilder modules={page.modules} />
      </>
    );
  }

  // Fallback: render static homepage with default content
  return (
    <>
      <h1 className="sr-only">
        Bargersville Economic Development — Grow Where Access Meets Opportunity
      </h1>
      <HeroSection />
      <TickerSection />
      <WhySection />
      <LocationSection />
      <GrowthSection />
      <IncentivesSection />
      <CtaBanner />
    </>
  );
}
