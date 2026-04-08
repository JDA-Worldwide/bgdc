/**
 * Seed script for Phase 4:
 *   - Business Incentives (/business-incentives)
 *
 * Run: node scripts/seed-phase4-pages.mjs
 * Force overwrite: node scripts/seed-phase4-pages.mjs --force
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

async function main() {
  console.log("\n  Seeding Phase 4 page (Business Incentives)...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set.");
    process.exit(1);
  }

  const seedIds = ["seed-business-incentives"];
  const existing = await client.fetch(`count(*[_id in $ids])`, { ids: seedIds });

  if (existing > 0 && !process.argv.includes("--force")) {
    console.log("  Page already exists. Run with --force to overwrite.\n");
    process.exit(0);
  }

  console.log("  Creating 'Business Incentives' page...");

  await client.createOrReplace({
    _id: "seed-business-incentives",
    _type: "page",
    title: "Business Incentives",
    slug: { _type: "slug", current: "business-incentives" },
    seo: {
      metaTitle: "Business Incentives & Resources | Doing Business in Bargersville, Indiana",
      metaDescription:
        "From development incentives and TIF districts to zoning maps and utility resources — here's everything you need to start or expand your business in Bargersville, Indiana.",
    },
    modules: [
      // 1. Hero
      {
        _key: key(),
        _type: "hero",
        heading: "Everything You Need to Get Moving",
        subheading:
          "We're not just who you call for permits. The Bargersville Economic Development team supports businesses from ideation to execution — providing one-on-one guidance, development support, and access to local resources that make it easier to start, expand, or relocate your business here.",
      },

      // 2. Intro textBlock
      {
        _key: key(),
        _type: "textBlock",
        body: [
          block(
            "Beyond permits and paperwork, we focus on what moves projects forward: clear communication, trusted relationships, and hands-on support at every stage. We navigate zoning and permitting, connect businesses with infrastructure and workforce resources, and serve as a consistent point of contact throughout the development process."
          ),
          block(
            "Our role is to remove barriers, shorten timelines, and help every business in Bargersville thrive."
          ),
        ],
      },

      // 3. Incentive Cards (placeholder — content from client)
      {
        _key: key(),
        _type: "incentiveCards",
        heading: "Development Incentives & Economic Development Tools",
        introText:
          "Bargersville offers a range of economic development tools designed to support businesses at every stage of growth. Our team is hands-on, knows the programs, and will work directly with you to identify what applies to your project.",
        programs: [],
      },

      // 4. TIF Section
      {
        _key: key(),
        _type: "tifSection",
        heading: "Tax Increment Financing (TIF) Districts",
        introText:
          "Tax Increment Financing (TIF) is one of Indiana's most effective economic development tools — directing future property tax revenue growth within a defined area back into infrastructure, development, and public improvements that make investment possible. Bargersville's TIF districts are designed to attract capital investment and enable the kind of sustainable growth that benefits the entire community.",
        howItWorks:
          "When new development increases property values within a TIF district, the additional tax revenue generated — the \"increment\" — goes back into the TIF district to fund infrastructure, site preparation, and development support. For businesses and developers, this can mean critical public investments are already in place, or can be made possible, as part of your project.",
        districts: [],
        cta: {
          _type: "object",
          label: "Contact Us to Learn How TIF May Apply",
          url: "/get-in-touch",
          isExternal: false,
        },
      },

      // 5. Business Attraction & Small Business Support — textBlock
      {
        _key: key(),
        _type: "textBlock",
        heading: "We're Here for Businesses of Every Size",
        body: [
          block("New Business Attraction & Relocation", "h3"),
          block(
            "Our team will walk you through site options, available incentives, and the permitting process — step by step. We connect business owners directly to local leadership, development partners, and community stakeholders, removing barriers and simplifying the path from vision to reality."
          ),
          block("Small Business Support", "h3"),
          block(
            "Local businesses are the backbone of Bargersville's community and economy. We provide resources, referrals, and advocacy to help small businesses launch, operate, and grow right here in town."
          ),
        ],
      },

      // 6. Resource Hub
      {
        _key: key(),
        _type: "resourceHub",
        heading: "Town Resources & Infrastructure",
        introText:
          "The tools you need to plan with confidence — maps, utility data, tax information, and infrastructure details — are available here.",
        resources: [
          {
            _key: key(),
            _type: "object",
            icon: "🗺️",
            title: "Zoning Map",
            description: "Review zoning designations across the Town of Bargersville.",
            linkLabel: "View Zoning Map",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🛰️",
            title: "GIS Portal",
            description: "Geographic data, mapping tools, and parcel information.",
            linkLabel: "Open GIS Portal",
          },
          {
            _key: key(),
            _type: "object",
            icon: "💧",
            title: "Water / Sewer Map",
            description: "Coverage map for water and sewer infrastructure.",
            linkLabel: "View Map",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🌊",
            title: "Stormwater Information",
            description: "Stormwater management requirements and resources.",
            linkLabel: "View Resources",
          },
          {
            _key: key(),
            _type: "object",
            icon: "💰",
            title: "Tax Rates",
            description: "Current tax rate information for Bargersville.",
            linkLabel: "View Tax Rates",
          },
          {
            _key: key(),
            _type: "object",
            icon: "⚡",
            title: "Electric Map / Transmission Lines",
            description: "Electrical infrastructure and capacity map.",
            linkLabel: "View Map",
          },
        ],
      },

      // 7. CTA
      {
        _key: key(),
        _type: "cta",
        heading: "Not Sure Where to Start? That's What We're Here For.",
        body: "Whether you have a fully formed plan or just an idea, Bargersville Economic Development will help you navigate the process and connect you with the right people to keep things moving.",
        primaryButton: {
          _type: "link",
          label: "Contact Our Team",
          url: "/get-in-touch",
          isExternal: false,
        },
        secondaryButton: {
          _type: "link",
          label: "View Development Areas",
          url: "/development-areas",
          isExternal: false,
        },
        backgroundColor: "primary",
      },
    ],
  });

  console.log("  ✓ Business Incentives page created.");
  console.log("\n  Phase 4 page seeded successfully!\n");
  console.log("  Visit http://localhost:3000/business-incentives\n");
}

main().catch((err) => {
  console.error("\n  Seed failed:", err.message, "\n");
  process.exit(1);
});
