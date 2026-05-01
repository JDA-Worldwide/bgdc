import type { ComponentType } from "react";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils";
import Hero from "./modules/Hero";
import TextBlock from "./modules/TextBlock";
import CTA from "./modules/CTA";
import FeatureGrid from "./modules/FeatureGrid";
import StatsCounter from "./modules/StatsCounter";
import LogoBar from "./modules/LogoBar";
import ImageGallery from "./modules/ImageGallery";
import VideoEmbed from "./modules/VideoEmbed";
import Testimonials from "./modules/Testimonials";
import FAQ from "./modules/FAQ";
import TeamGrid from "./modules/TeamGrid";
import ContactForm from "./modules/ContactForm";
import ContactInfo from "./modules/ContactInfo";
import DetailedStats from "./modules/DetailedStats";
import ProjectShowcase from "./modules/ProjectShowcase";
import DevelopmentAreaShowcase from "./modules/DevelopmentAreaShowcase";
import IncentiveCards from "./modules/IncentiveCards";
import BusinessIncentive from "./modules/BusinessIncentive";
import MapEmbed from "./modules/MapEmbed";
import ResourceHub from "./modules/ResourceHub";
import HeroSection from "./home/HeroSection";
import TickerSection from "./home/TickerSection";
import WhySection from "./home/WhySection";
import LocationSection from "./home/LocationSection";
import GrowthSection from "./home/GrowthSection";
import IncentivesSection from "./home/IncentivesSection";
import CtaBanner from "./home/CtaBanner";
import StatsSection from "./home/StatsSection";
import StackedPhotosText from "./home/StackedPhotosText";
import ValuePropsSection from "./home/ValuePropsSection";
import MapSection from "./home/MapSection";
import IndustriesSection from "./home/IndustriesSection";
import MomentumSection from "./home/MomentumSection";
import { JsonLd, faqPageSchema } from "@/lib/jsonLd";
import { toPlainText, type PortableTextBlock } from "@portabletext/react";

interface Module {
  _type: string;
  _key: string;
  colorScheme?: "light" | "surface" | "limestone" | "sky" | "dark";
  anchorSlug?: { current?: string };
  [key: string]: unknown;
}

interface FAQModule extends Module {
  items?: Array<{ _key: string; question: string; answer: unknown[] }>;
}

interface GlobalSocialLink {
  platform: string;
  url: string;
}

interface PageBuilderProps {
  modules?: Module[];
  globalSocialLinks?: GlobalSocialLink[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const moduleMap: Record<string, ComponentType<any>> = {
  hero: Hero,
  textBlock: TextBlock,
  cta: CTA,
  featureGrid: FeatureGrid,
  statsCounter: StatsCounter,
  logoBar: LogoBar,
  imageGallery: ImageGallery,
  videoEmbed: VideoEmbed,
  testimonials: Testimonials,
  faq: FAQ,
  teamGrid: TeamGrid,
  contactForm: ContactForm,
  contactInfo: ContactInfo,
  detailedStats: DetailedStats,
  projectShowcase: ProjectShowcase,
  developmentAreaShowcase: DevelopmentAreaShowcase,
  incentiveCards: IncentiveCards,
  businessIncentive: BusinessIncentive,
  mapEmbed: MapEmbed,
  resourceHub: ResourceHub,
  homepageHero: HeroSection,
  partnersTicker: TickerSection,
  whyPillars: WhySection,
  locationMap: LocationSection,
  projectsGrid: GrowthSection,
  incentivesGrid: IncentivesSection,
  ctaBanner: CtaBanner,
  statsBar: StatsSection,
  communitySection: StackedPhotosText,
  valueProps: ValuePropsSection,
  mapSection: MapSection,
  industriesGrid: IndustriesSection,
  momentumSection: MomentumSection,
};

// Scheme fallback for modules whose component hardcodes a background color
// that doesn't come from the colorScheme field.
const moduleDefaultSchemes: Record<string, string> = {
  hero: "scheme-hero",
  homepageHero: "scheme-hero",
};

const fullBleedModules = new Set([
  "hero",
  "cta",
  "homepageHero",
  "partnersTicker",
  "locationMap",
  "ctaBanner",
  "statsBar",
  "communitySection",
  "valueProps",
  "mapSection",
  "industriesGrid",
  "momentumSection",
  "whyPillars",
  "projectsGrid",
  "incentivesGrid",
  "projectShowcase",
  "mapEmbed",
]);

function buildFaqJsonLd(module: FAQModule) {
  if (!module.items?.length) return null;

  const items = module.items.map((item) => ({
    question: item.question,
    answer: toPlainText(item.answer as PortableTextBlock[]),
  }));

  return <JsonLd key={`${module._key}-jsonld`} data={faqPageSchema(items)} />;
}

export default function PageBuilder({ modules, globalSocialLinks }: PageBuilderProps) {
  if (!modules?.length) return null;

  return (
    <>
      {modules.map((module) => {
        const Component = moduleMap[module._type];

        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`No component found for module type: ${module._type}`);
          }
          return null;
        }

        const scheme = stegaClean(module.colorScheme);
        const schemeClass =
          scheme === "dark" ? "scheme-dark" :
          scheme === "surface" ? "scheme-surface" :
          scheme === "limestone" ? "scheme-limestone" :
          scheme === "sky" ? "scheme-sky" :
          moduleDefaultSchemes[module._type] ?? "scheme-default";
        const isFullBleed = fullBleedModules.has(module._type);
        const anchorId = stegaClean(module.anchorSlug?.current) || undefined;

        const extraProps = module._type === "contactInfo" && globalSocialLinks
          ? { globalSocialLinks }
          : {};

        const scrollClass = anchorId ? "scroll-mt-[var(--header-height)]" : undefined;

        if (isFullBleed) {
          return (
            <div key={module._key} id={anchorId} className={cn(schemeClass, scrollClass)}>
              {module._type === "faq" && buildFaqJsonLd(module as FAQModule)}
              <Component {...module} {...extraProps} />
            </div>
          );
        }

        return (
          <div key={module._key} id={anchorId} className={cn(schemeClass, scrollClass)}>
            <section className="mx-auto max-w-container py-section">
              {module._type === "faq" && buildFaqJsonLd(module as FAQModule)}
              <Component {...module} {...extraProps} />
            </section>
          </div>
        );
      })}
    </>
  );
}
