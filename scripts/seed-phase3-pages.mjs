/**
 * Seed script for Phase 3 inner pages:
 *   - Ongoing Growth (/ongoing-growth)
 *   - Development Areas (/development-areas)
 *
 * Run: node scripts/seed-phase3-pages.mjs
 * Force overwrite: node scripts/seed-phase3-pages.mjs --force
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

function block(text, style = "normal", marks = []) {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks }],
  };
}

async function main() {
  console.log("\n  Seeding Phase 3 pages (Ongoing Growth + Development Areas)...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set.");
    process.exit(1);
  }

  const seedIds = ["seed-ongoing-growth", "seed-development-areas"];
  const existing = await client.fetch(`count(*[_id in $ids])`, { ids: seedIds });

  if (existing > 0 && !process.argv.includes("--force")) {
    console.log("  Pages already exist. Run with --force to overwrite.\n");
    process.exit(0);
  }

  // -------------------------------------------------------------------------
  // Page: Ongoing Growth (/ongoing-growth)
  // -------------------------------------------------------------------------

  console.log("  Creating 'Ongoing Growth' page...");

  await client.createOrReplace({
    _id: "seed-ongoing-growth",
    _type: "page",
    title: "Ongoing Growth",
    slug: { _type: "slug", current: "ongoing-growth" },
    seo: {
      metaTitle: "Current Development Projects | Bargersville, Indiana Economic Growth",
      metaDescription:
        "Explore the development projects shaping Bargersville, Indiana — including the Downtown Redevelopment Plan, new residential communities, and mixed-use commercial development along SR 135.",
    },
    modules: [
      // 1. Hero
      {
        _key: key(),
        _type: "hero",
        heading: "Bargersville Is Building. There's Room for You.",
        subheading:
          "From downtown redevelopment to new commercial corridors, Bargersville is building with intention. See what's underway.",
      },

      // 2. Intro textBlock
      {
        _key: key(),
        _type: "textBlock",
        body: [
          block(
            "Bargersville is in an active period of growth — and the projects taking shape here reflect something more than development activity. They reflect a community that plans ahead, invests with purpose, and builds for the long term."
          ),
          block(
            "With available land, strong road connectivity along SR 135, and a downtown redevelopment plan already in motion, the conditions are in place for businesses and developers ready to move. Add direct access to the Indiana Railroad for freight and logistics, and Bargersville offers a rare combination: a community on the rise with the infrastructure already in place to support it."
          ),
        ],
      },

      // 3. Project Showcase
      {
        _key: key(),
        _type: "projectShowcase",
        projects: [
          // Project 1: Downtown Bargersville Redevelopment Plan
          {
            _key: key(),
            _type: "object",
            tagLabel: "Major Initiative | Planning & Development",
            title: "Downtown Bargersville Redevelopment Plan",
            status: "In Progress",
            body: [
              block(
                "In May 2025, the Town of Bargersville released its Downtown Redevelopment Plan — one of the most significant investments in the town's history. Developed in partnership with Browning Day, the plan reimagines the downtown core as a vibrant, walkable destination that authentically celebrates Bargersville's railroad and agricultural heritage."
              ),
              block("The plan covers two distinct areas:"),
              block(
                "Area A — ~150 acres of existing downtown, studied at both macro and micro levels"
              ),
              block(
                "Area B — ~1,800 acres of adjacent farmland, studied at the macro level for future commercial development"
              ),
              block(
                "The vision is rooted in a core principle: all roads lead to downtown Bargersville. The redevelopment plan creates space for a diverse mix of retail, specialty shops, restaurants, hospitality, and civic and cultural uses — while improving pedestrian flow, integrating art, and connecting open spaces and trails throughout the district."
              ),
            ],
            highlights: [
              "Authentic celebration of railroad and agricultural history",
              "Diverse retail, specialty shops, restaurants, and entertainment",
              "Improved pedestrian experience and traffic flow",
              "Connectivity of trails and open spaces",
              "Destination experiences and mixed-use development",
              "Integration of art throughout the district",
            ],
            cta: {
              _type: "object",
              label: "View the Full Downtown Redevelopment Plan (PDF)",
              url: "https://cms2.revize.com/revize/bargersville/document_center/Downtown%20Bargersville%20Redevelopment%20Plan%20-%20Final.pdf",
              isExternal: true,
            },
          },

          // Project 2: The Jefferson
          {
            _key: key(),
            _type: "object",
            tagLabel: "Mixed-Use Development",
            title: "The Jefferson",
            status: "In Progress",
            body: [
              block(
                "The Jefferson represents a new chapter in Bargersville's residential and community landscape — bringing thoughtfully designed living and amenities to the heart of the town. This development reflects Bargersville's commitment to offering quality of place alongside quality of opportunity, creating spaces where people genuinely want to live, work, and gather."
              ),
              block(
                "Additional project details, renderings, and specifications are coming soon."
              ),
            ],
            cta: {
              _type: "object",
              label: "Learn More About The Jefferson",
              url: "https://bargersville.in.gov/news_detail_T12_R73.php",
              isExternal: true,
            },
          },

          // Project 3: Bellingham by Lennar
          {
            _key: key(),
            _type: "object",
            tagLabel: "Residential Development",
            title: "Bellingham — New Homes by Lennar",
            status: "Now Selling",
            body: [
              block(
                "Bellingham is a premier new home community in Bargersville, developed by Lennar — one of the nation's most respected homebuilders. As residential demand continues to surge (151 new single-family homes built in Bargersville in 2025; 181 in 2024), communities like Bellingham underscore the depth of the housing market here and the strength of the community's appeal to families and professionals relocating from the greater Indianapolis area."
              ),
            ],
            cta: {
              _type: "object",
              label: "Explore Bellingham at Lennar.com",
              url: "https://www.lennar.com/new-homes/indiana/indianapolis/bargersville/bellingham",
              isExternal: true,
            },
          },

          // Project 4: SR 135 & Smokey Row
          {
            _key: key(),
            _type: "object",
            tagLabel: "Commercial Development",
            title: "SR 135 & Smokey Row Road — Mixed-Use Commercial Development",
            status: "Under Construction",
            body: [
              block(
                "A new mixed-use development is underway at the southeast corner of SR 135 and Smokey Row Road — one of Bargersville's highest-visibility commercial corridors. Confirmed tenants include Ale Emporium, Five Guys, Swig, and First Watch, with a smaller-format Meijer planned nearby."
              ),
              block(
                "This corridor is fast becoming a key retail and dining destination for Bargersville and surrounding Johnson County communities — and a clear signal of the commercial momentum building along SR 135."
              ),
            ],
          },

          // Project 5: Meadowbrook
          {
            _key: key(),
            _type: "object",
            tagLabel: "Coming Soon",
            title: "Meadowbrook",
            status: "Upcoming",
            body: [
              block(
                "Details on the Meadowbrook development are coming soon. Stay connected with Bargersville Economic Development for updates as this project takes shape."
              ),
            ],
          },
        ],
      },

      // 4. CTA
      {
        _key: key(),
        _type: "cta",
        heading: "Interested in Being Part of What's Next?",
        body: "Bargersville Economic Development is your partner from ideation to execution. Whether you're a developer, investor, retailer, or business owner, we're here to help you navigate the landscape — and find the right opportunity.",
        primaryButton: {
          _type: "link",
          label: "Contact Economic Development",
          url: "/get-in-touch",
          isExternal: false,
        },
        secondaryButton: {
          _type: "link",
          label: "Explore Development Areas",
          url: "/development-areas",
          isExternal: false,
        },
        backgroundColor: "primary",
      },
    ],
  });

  console.log("  ✓ Ongoing Growth page created.");

  // -------------------------------------------------------------------------
  // Page: Development Areas (/development-areas)
  // -------------------------------------------------------------------------

  console.log("  Creating 'Development Areas' page...");

  await client.createOrReplace({
    _id: "seed-development-areas",
    _type: "page",
    title: "Development Areas",
    slug: { _type: "slug", current: "development-areas" },
    seo: {
      metaTitle: "Available Land & Development Sites in Bargersville, Indiana",
      metaDescription:
        "Explore available land parcels and key development corridors in Bargersville, Indiana — including the I-69/SR 144 interchange, downtown district, and South SR 135 commercial and industrial zone.",
    },
    modules: [
      // 1. Hero
      {
        _key: key(),
        _type: "hero",
        heading: "Land Ready for What You're Building",
        subheading:
          "Bargersville has room to grow — and the infrastructure to support it. Three distinct development corridors offer opportunities for commercial, industrial, and mixed-use investment. Our team is ready to help you find the right site.",
      },

      // 2. Intro textBlock
      {
        _key: key(),
        _type: "textBlock",
        body: [
          block(
            "Developing in Bargersville gives your business room to expand and plan for future infrastructure as you grow. With strategic parcels across multiple corridors — each with distinct advantages in access, visibility, and use — Bargersville offers serious opportunities for businesses and developers ready to move."
          ),
          block(
            "We'll help you evaluate sites with a clear understanding of zoning, infrastructure, timelines, and growth potential."
          ),
        ],
      },

      // 3. Development Area Showcase
      {
        _key: key(),
        _type: "developmentAreaShowcase",
        areas: [
          // Area 1: I-69 / SR 144
          {
            _key: key(),
            _type: "object",
            areaLabel: "High-Visibility | Interstate Access | Commercial & Industrial",
            title: "I-69 / SR 144 Interchange Corridor",
            body: [
              block(
                "The I-69 / SR 144 interchange is Bargersville's most strategically significant growth corridor. Direct interstate access, high traffic visibility, and strong regional connectivity make this area ideal for businesses prioritizing logistics, distribution, manufacturing, or high-volume commercial presence."
              ),
              block(
                "As I-69 continues to develop northward through Indiana, the value and momentum of this corridor will only increase."
              ),
            ],
            opportunities: [
              "Parcel sizes and acreage — details coming soon",
              "Utility availability (water, sewer, electric) — to be confirmed",
              "Ownership and contact information — to be provided",
            ],
            cta: {
              _type: "object",
              label: "Request Parcel Information",
              url: "/get-in-touch",
              isExternal: false,
            },
          },

          // Area 2: Downtown Bargersville
          {
            _key: key(),
            _type: "object",
            areaLabel: "Placemaking | Retail & Hospitality | Mixed-Use",
            title: "Downtown Bargersville District",
            body: [
              block(
                "Downtown Bargersville is in the middle of a transformation, with a bold redevelopment plan approved and momentum building. For retailers, restaurateurs, service businesses, and mixed-use developers, this is a rare opportunity to be part of building something — not just moving into something that already exists."
              ),
              block(
                "The Downtown Redevelopment Plan envisions a vibrant, walkable core with a diverse mix of uses, authentic character, and the kind of foot traffic that comes from genuine community investment. Businesses that establish here early will benefit from the energy and attention the redevelopment is already generating."
              ),
            ],
            opportunities: [
              "Parcel sizes and acreage — details coming soon",
              "Utility availability and infrastructure status — to be confirmed",
              "Available lots and existing structures — to be provided",
            ],
            cta: {
              _type: "object",
              label: "Request Parcel Information",
              url: "/get-in-touch",
              isExternal: false,
            },
          },

          // Area 3: South SR 135
          {
            _key: key(),
            _type: "object",
            areaLabel: "Industrial | Commercial | Large-Format Development",
            title: "South SR 135 Industrial & Commercial Area",
            body: [
              block(
                "The South SR 135 corridor presents significant opportunity for industrial and commercial development. Large parcels, strong arterial road access, and the capacity to accommodate a wide range of uses — from light industrial and logistics to retail and large-format commercial — make this one of Bargersville's most compelling growth zones."
              ),
              block(
                "Development activity along SR 135 is already accelerating. Businesses that move early in this corridor gain positioning advantage and room to scale on their own timeline."
              ),
            ],
            opportunities: [
              "Parcel sizes and acreage — details coming soon",
              "Utility availability (water, sewer, electric) — to be confirmed",
              "Ownership and contact information — to be provided",
            ],
            cta: {
              _type: "object",
              label: "Request Parcel Information",
              url: "/get-in-touch",
              isExternal: false,
            },
          },
        ],
      },

      // 4. Parcel One-Pagers — textBlock
      {
        _key: key(),
        _type: "textBlock",
        heading: "Need the Full Picture on a Specific Site?",
        body: [
          block(
            "Bargersville Economic Development can provide detailed marketing one-pagers for available parcels across all development areas — including acreage, zoning, utilities, infrastructure access, and contact information. Contact our team to request information on a specific site."
          ),
        ],
      },

      // 5. Site Selection Services — featureGrid
      {
        _key: key(),
        _type: "featureGrid",
        heading: "We'll Help You Navigate the Process",
        features: [
          {
            _key: key(),
            _type: "object",
            icon: "🗺️",
            title: "Site Identification & Parcel Information",
            description:
              "We'll help you identify the right parcels across Bargersville's three development corridors based on your use, size, and timeline requirements.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "📋",
            title: "Zoning & Property Support",
            description:
              "Our team provides clear guidance on zoning designations, permitted uses, and any variance or rezoning processes that may apply to your project.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🏛️",
            title: "Permit Access & Documentation",
            description:
              "We streamline the permitting process and connect you directly with the right municipal contacts to keep your project moving forward.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🤝",
            title: "Connection to Local Leadership",
            description:
              "We introduce you to local leadership, development partners, and community stakeholders who can support your project from day one.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🛰️",
            title: "GIS Resources & Utility Maps",
            description:
              "Access to GIS data, utility infrastructure maps, and parcel information to support your due diligence and site evaluation process.",
          },
        ],
      },

      // 6. CTA
      {
        _key: key(),
        _type: "cta",
        heading: "Contact Our Team",
        body: "Ready to explore a specific site or corridor? Our team is your consistent point of contact — from initial inquiry to final approvals.",
        primaryButton: {
          _type: "link",
          label: "Get in Touch",
          url: "/get-in-touch",
          isExternal: false,
        },
        secondaryButton: {
          _type: "link",
          label: "View Current Projects",
          url: "/ongoing-growth",
          isExternal: false,
        },
        backgroundColor: "primary",
      },
    ],
  });

  console.log("  ✓ Development Areas page created.");

  console.log("\n  Phase 3 pages seeded successfully!\n");
  console.log("  Visit http://localhost:3000/ongoing-growth");
  console.log("  Visit http://localhost:3000/development-areas\n");
}

main().catch((err) => {
  console.error("\n  Seed failed:", err.message, "\n");
  process.exit(1);
});
