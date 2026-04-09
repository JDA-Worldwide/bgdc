import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageDataQuery, settingsQuery } from "@/sanity/lib/queries";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, webPageSchema } from "@/lib/jsonLd";
import PageBuilder from "@/components/PageBuilder";

interface HomepageData {
  title?: string;
  slug?: string;
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
      <PageBuilder modules={data.modules} />
    </>
  );
}
