import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { JsonLd, organizationSchema } from "@/lib/jsonLd";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

interface GlobalSettings {
  siteTitle?: string;
  siteUrl?: string;
  logo?: { asset: { _ref: string } };
  defaultSeo?: {
    metaDescription?: string;
  };
  socialLinks?: string[];
}

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    tags: ["globalSettings"],
  });

  const siteTitle = (settings as GlobalSettings | null)?.siteTitle || "Bargersville Economic Development";

  return {
    title: {
      template: `%s | ${siteTitle}`,
      default: siteTitle,
    },
    description:
      (settings as GlobalSettings | null)?.defaultSeo?.metaDescription ||
      "Grow Where Access Meets Opportunity — Bargersville, Indiana",
    metadataBase: new URL(
      (settings as GlobalSettings | null)?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    tags: ["globalSettings"],
  });

  const typedSettings = settings as GlobalSettings | null;
  const siteUrl =
    typedSettings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {typedSettings && (
          <JsonLd
            data={organizationSchema({
              name: typedSettings.siteTitle || "Bargersville Economic Development",
              url: siteUrl,
              logo: typedSettings.logo?.asset ? urlFor(typedSettings.logo).width(600).url() : undefined,
              socialLinks: typedSettings.socialLinks,
            })}
          />
        )}
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && <VisualEditing />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
