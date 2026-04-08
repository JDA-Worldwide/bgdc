/**
 * Seed script for Phase 1 & 2 inner pages:
 *   - Who We Are (/who-we-are)
 *   - Get in Touch (/get-in-touch)
 *
 * Run: node scripts/seed-inner-pages.mjs
 * Force overwrite: node scripts/seed-inner-pages.mjs --force
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

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n  Seeding inner pages (Who We Are + Get in Touch)...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set.");
    console.error("  Make sure .env.local is populated before running this script.\n");
    process.exit(1);
  }

  const seedIds = ["seed-who-we-are", "seed-get-in-touch"];

  const existing = await client.fetch(`count(*[_id in $ids])`, { ids: seedIds });

  if (existing > 0 && !process.argv.includes("--force")) {
    console.log("  Pages already exist. Run with --force to overwrite.\n");
    process.exit(0);
  }

  // -------------------------------------------------------------------------
  // Page: Who We Are (/who-we-are)
  // -------------------------------------------------------------------------

  console.log("  Creating 'Who We Are' page...");

  await client.createOrReplace({
    _id: "seed-who-we-are",
    _type: "page",
    title: "Who We Are",
    slug: { _type: "slug", current: "who-we-are" },
    seo: {
      metaTitle: "About Bargersville, Indiana | Community, Demographics & Quality of Life",
      metaDescription:
        "Learn what makes Bargersville, Indiana one of the fastest-growing communities in the state. Explore demographics, housing, top-rated schools, workforce data, and quality of life.",
    },
    modules: [
      // 1. Hero
      {
        _key: key(),
        _type: "hero",
        heading: "Built on Heritage. Growing with Excellence.",
        subheading:
          "Bargersville is one of the fastest-growing communities in Indiana—but growth here has never been the point. The point is building something that lasts. With roots dating back to 1850 and a community that takes pride in doing things well, Bargersville offers something rare: a place where opportunity and quality of life aren't at odds. They're the same thing.",
      },

      // 2. Our Story — textBlock with heading
      {
        _key: key(),
        _type: "textBlock",
        heading: "A Town with Roots and Room to Run",
        body: [
          block(
            "Some towns grow fast. Bargersville grows well. Rooted in Johnson County since 1850, this community has always measured progress not just in square footage or population counts, but in the quality of what gets built here. The people who shaped Bargersville understood that real growth takes patience, care, and the right conditions. That ethos still drives how the town operates today."
          ),
          block(
            "Long-range planning guides every major decision. Development is thoughtful, not reactive. And the relationships built between local leadership, business owners, and community members are the kind that fuel lasting success."
          ),
          block(
            "By honoring the town's history, long-standing events, and defining moments, Bargersville isn't growing at the expense of its identity—it's building thoughtfully on what has come before. These aren't just qualities that make a good community. They're qualities that make a good investment."
          ),
        ],
      },

      // 3. By the Numbers — detailedStats
      {
        _key: key(),
        _type: "detailedStats",
        heading: "The People Behind the Progress",
        introText:
          "A growing, educated, and engaged population. A housing market that reflects genuine demand and long-term confidence. A community that values quality of life as much as economic vitality. The data tells the story.",
        categories: [
          {
            _key: key(),
            _type: "object",
            categoryName: "Population & Growth",
            stats: [
              { _key: key(), _type: "object", value: "13,000+", label: "Residents and growing" },
              { _key: key(), _type: "object", value: "15.1%", label: "Growth rate, 2020–2024" },
              {
                _key: key(),
                _type: "object",
                value: "#2",
                label: "Fastest-growing community in Johnson County",
              },
              {
                _key: key(),
                _type: "object",
                value: "Top",
                label: "One of the fastest-growing communities in Indiana",
              },
            ],
          },
          {
            _key: key(),
            _type: "object",
            categoryName: "Workforce & Demographics",
            stats: [
              {
                _key: key(),
                _type: "object",
                value: "35.4",
                label: "Average resident age — top 10 youngest in Indiana",
              },
              {
                _key: key(),
                _type: "object",
                value: "58.5%",
                label: "Of residents work in management",
              },
              { _key: key(), _type: "object", value: "16.4%", label: "Work in sales" },
              {
                _key: key(),
                _type: "object",
                value: "11.6%",
                label: "Work in the service industry",
              },
            ],
          },
          {
            _key: key(),
            _type: "object",
            categoryName: "Housing Market",
            stats: [
              {
                _key: key(),
                _type: "object",
                value: "$438,900",
                label: "Median home value",
              },
              {
                _key: key(),
                _type: "object",
                value: "$1,379",
                label: "Median gross rent",
              },
              {
                _key: key(),
                _type: "object",
                value: "151",
                label: "New single-family homes built in 2025",
              },
              {
                _key: key(),
                _type: "object",
                value: "181",
                label: "New single-family homes built in 2024",
              },
            ],
          },
          {
            _key: key(),
            _type: "object",
            categoryName: "Infrastructure & Connectivity",
            stats: [
              {
                _key: key(),
                _type: "object",
                value: "97%",
                label: "Of households have high-speed internet access",
              },
              {
                _key: key(),
                _type: "object",
                value: "Local",
                label: "Locally-owned utilities prioritizing reliability and long-term service",
              },
              {
                _key: key(),
                _type: "object",
                value: "I-69",
                label: "SR 135 and SR 144 provide strong regional road connectivity",
              },
              {
                _key: key(),
                _type: "object",
                value: "Rail",
                label: "Indiana Railroad access for freight and logistics",
              },
            ],
          },
        ],
      },

      // 4. Education & Workforce — textBlock
      {
        _key: key(),
        _type: "textBlock",
        heading: "Top Schools. Real Talent.",
        body: [
          block(
            "Businesses that locate in Bargersville gain access to one of the strongest school ecosystems in the region. Center Grove and Franklin Community Schools are two of Johnson County's top-rated districts—and access to excellent schools is one of the most powerful tools for attracting and retaining the talent that keeps businesses competitive."
          ),
          block(
            "Beyond K-12, proximity to Purdue, IU Indy, and Indiana University provides a steady pipeline of educated, skilled graduates across industries—from technology and engineering to business and healthcare. For companies building teams for the long term, Bargersville's position in this talent corridor is a genuine strategic advantage."
          ),
        ],
      },

      // 5. Community Character — textBlock
      {
        _key: key(),
        _type: "textBlock",
        heading: "A Place Worth Putting Down Roots",
        body: [
          block(
            "The character of a community is hard to quantify—but it shows up in how businesses are welcomed, how neighbors show up for each other, and how residents talk about the place they call home. In Bargersville, that character is unmistakable."
          ),
          block(
            "Tight-knit relationships make it easier for new businesses to build loyal local demand from day one. Community events bring people together year-round. A revitalizing downtown is creating new energy and foot traffic. And locally-owned parks, trails, and green spaces give families and employees a quality of life that keeps them rooted—and reduces turnover."
          ),
          block(
            "In Bargersville, businesses don't just find customers. They find community."
          ),
        ],
      },

      // 6. Awards & Recognition — featureGrid
      {
        _key: key(),
        _type: "featureGrid",
        heading: "Recognized for Excellence",
        features: [
          {
            _key: key(),
            _type: "object",
            icon: "🏆",
            title: "Engineering Excellence Award",
            description: "2021 — Recognized for outstanding infrastructure and engineering achievement.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🛣️",
            title: "Infrastructure Grant: $2M+",
            description:
              "2025 — Secured over $2 million in infrastructure funding for roundabout improvements.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "🌉",
            title: "$1M Community Crossing Grant",
            description: "2023 — Awarded $1 million for community infrastructure improvements.",
          },
          {
            _key: key(),
            _type: "object",
            icon: "💧",
            title: "$600K Stormwater Grant",
            description: "2023 — Received $600,000 for stormwater management infrastructure.",
          },
        ],
      },

      // 7. CTA
      {
        _key: key(),
        _type: "cta",
        heading: "See What's Growing in Bargersville",
        body: "Bargersville is building with intention. Explore the projects shaping the town's future and discover the opportunities waiting for your business.",
        primaryButton: {
          _type: "link",
          label: "View Current Projects",
          url: "/ongoing-growth",
          isExternal: false,
        },
        secondaryButton: {
          _type: "link",
          label: "Contact Economic Development",
          url: "/get-in-touch",
          isExternal: false,
        },
        backgroundColor: "primary",
      },
    ],
  });

  console.log("  ✓ Who We Are page created.");

  // -------------------------------------------------------------------------
  // Page: Get in Touch (/get-in-touch)
  // -------------------------------------------------------------------------

  console.log("  Creating 'Get in Touch' page...");

  await client.createOrReplace({
    _id: "seed-get-in-touch",
    _type: "page",
    title: "Get in Touch",
    slug: { _type: "slug", current: "get-in-touch" },
    seo: {
      metaTitle: "Contact Bargersville Economic Development | Bargersville, Indiana",
      metaDescription:
        "Ready to start a conversation? Contact Bargersville Economic Development for business support, site information, development incentives, and more. We're here to help.",
    },
    modules: [
      // 1. Hero
      {
        _key: key(),
        _type: "hero",
        heading: "Let's Talk About What You're Building",
        subheading:
          "Whether you're exploring Bargersville for the first time or ready to move forward on a specific opportunity, our team is here to help. We'll navigate the process with you, connect you to the right resources, and keep your project moving from the first conversation forward.",
      },

      // 2. Contact Info
      {
        _key: key(),
        _type: "contactInfo",
        heading: "Get in Touch",
        body: "Devoted to the good of our town, Bargersville Economic Development partners with entrepreneurs, business leaders, and community stakeholders to cultivate sustained growth in Bargersville. Reach out — we'd love to hear what you're working on.",
        phone: "(317) 422-5115",
        fax: "(317) 522-5117",
        email: "planning@bargersville.in.gov",
        website: "bargersville.in.gov/business/economic_development",
        socialLinks: [
          {
            _key: key(),
            _type: "object",
            platform: "facebook",
            url: "https://facebook.com/bargersvilletown",
          },
          {
            _key: key(),
            _type: "object",
            platform: "instagram",
            url: "https://instagram.com/bargersvilletown/",
          },
          {
            _key: key(),
            _type: "object",
            platform: "linkedin",
            url: "https://linkedin.com/company/town-of-bargersville/",
          },
        ],
      },

      // 3. Contact Form
      {
        _key: key(),
        _type: "contactForm",
        heading: "Send Us a Message",
        description:
          "Fill out the form below and we'll be in touch soon.",
        recipientEmail: process.env.CONTACT_FORM_RECIPIENT || "planning@bargersville.in.gov",
        successMessage:
          "Thank you for reaching out to Bargersville Economic Development. We'll be in touch within 2 business days.",
        inquiryTypes: [
          "Starting a New Business",
          "Expanding an Existing Business",
          "Site Selection & Land Availability",
          "Development Incentives",
          "Permitting & Zoning",
          "General Inquiry",
        ],
        showNewsletterOptIn: true,
      },

      // 4. Closing Statement — textBlock
      {
        _key: key(),
        _type: "textBlock",
        heading: "We're Invested in Your Success",
        body: [
          block(
            "We're not just who you call for permits — we're here to offer support for whatever your business needs. When you work with Bargersville Economic Development, you gain a partner who will help you navigate the process, connect you with the right people, and stay with you from your first conversation to your first day open."
          ),
        ],
      },
    ],
  });

  console.log("  ✓ Get in Touch page created.");

  // -------------------------------------------------------------------------
  // Done
  // -------------------------------------------------------------------------

  console.log("\n  Inner pages seeded successfully!\n");
  console.log("  Visit http://localhost:3000/who-we-are");
  console.log("  Visit http://localhost:3000/get-in-touch\n");
}

main().catch((err) => {
  console.error("\n  Seed failed:", err.message, "\n");
  process.exit(1);
});
