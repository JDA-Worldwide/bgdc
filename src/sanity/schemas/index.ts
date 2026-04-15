import type { SchemaTypeDefinition } from "sanity";

// Documents
import globalSettings from "./documents/globalSettings";
import page from "./documents/page";
import blogPost from "./documents/blogPost";
import teamMember from "./documents/teamMember";
import navigation from "./documents/navigation";
import footer from "./documents/footer";
import formSubmission from "./documents/formSubmission";

// Objects
import link from "./objects/link";
import ctaButton from "./objects/ctaButton";
import seo from "./objects/seo";
import textBlock from "./objects/textBlock";
import hero from "./objects/hero";
import cta from "./objects/cta";
import featureGrid from "./objects/featureGrid";
import imageGallery from "./objects/imageGallery";
import videoEmbed from "./objects/videoEmbed";
import statsCounter from "./objects/statsCounter";
import logoBar from "./objects/logoBar";
import testimonials from "./objects/testimonials";
import faq from "./objects/faq";
import teamGrid from "./objects/teamGrid";
import contactForm from "./objects/contactForm";
import homepageHero from "./objects/homepageHero";
import partnersTicker from "./objects/partnersTicker";
import whyPillars from "./objects/whyPillars";
import locationMap from "./objects/locationMap";
import projectsGrid from "./objects/projectsGrid";
import incentivesGrid from "./objects/incentivesGrid";
import ctaBanner from "./objects/ctaBanner";
import pageBuilder from "./objects/pageBuilder";

// New homepage modules
import statsBar from "./objects/statsBar";
import communitySection from "./objects/stackedPhotosText";
import valueProps from "./objects/valueProps";
import mapSection from "./objects/mapSection";
import industriesGrid from "./objects/industriesGrid";
import momentumSection from "./objects/momentumSection";

// Inner page modules
import contactInfo from "./objects/contactInfo";
import detailedStats from "./objects/detailedStats";
import projectShowcase from "./objects/projectShowcase";
import developmentAreaShowcase from "./objects/developmentAreaShowcase";
import incentiveCards from "./objects/incentiveCards";
import tifSection from "./objects/tifSection";
import resourceHub from "./objects/resourceHub";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  globalSettings,
  page,
  blogPost,
  teamMember,
  navigation,
  footer,
  formSubmission,

  // Objects
  link,
  ctaButton,
  seo,
  textBlock,
  hero,
  cta,
  featureGrid,
  imageGallery,
  videoEmbed,
  statsCounter,
  logoBar,
  testimonials,
  faq,
  teamGrid,
  contactForm,
  homepageHero,
  partnersTicker,
  whyPillars,
  locationMap,
  projectsGrid,
  incentivesGrid,
  ctaBanner,
  pageBuilder,

  // New homepage modules
  statsBar,
  communitySection,
  valueProps,
  mapSection,
  industriesGrid,
  momentumSection,

  // Inner page modules
  contactInfo,
  detailedStats,
  projectShowcase,
  developmentAreaShowcase,
  incentiveCards,
  tifSection,
  resourceHub,
];
