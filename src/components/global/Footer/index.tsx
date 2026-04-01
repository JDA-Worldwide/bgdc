const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Why Bargersville?", href: "/why-bargersville" },
      { label: "Demographics & Community", href: "/demographics" },
      { label: "Growth in Progress", href: "/growth" },
      { label: "Available Land & Parcels", href: "/available-land" },
    ],
  },
  {
    title: "Do Business Here",
    links: [
      { label: "Development Incentives", href: "/incentives" },
      { label: "TIF Districts", href: "/tif-districts" },
      { label: "Zoning Map", href: "/zoning" },
      { label: "Business Attraction", href: "/business-attraction" },
    ],
  },
  {
    title: "Town Resources",
    links: [
      { label: "GIS & Maps", href: "/gis" },
      { label: "Water / Sewer", href: "/water-sewer" },
      { label: "Electric & Transmission", href: "/electric" },
      { label: "Tax Rates", href: "/tax-rates" },
      { label: "Town of Bargersville ↗", href: "https://www.bargersville.in.gov", external: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Footer band gradient */}
      <div
        className="h-1 opacity-40"
        style={{
          background: "linear-gradient(90deg, #B7C7D3 0%, #C0CA80 50%, #76871E 100%)",
        }}
      />

      <footer className="bg-brand-dark">
        <div className="mx-auto max-w-[var(--container-content)] px-6 lg:px-8 pt-16 pb-10">
          {/* Top section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div>
              {/* Brand mark */}
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8">
                  <svg
                    className="size-8"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="16" cy="16" r="14" stroke="#B7C7D3" strokeWidth="1.5" />
                    <circle cx="16" cy="16" r="6" fill="#FFBF3C" />
                    <path d="M16 2v28M2 16h28" stroke="#B7C7D3" strokeWidth="0.5" opacity="0.4" />
                  </svg>
                </div>
                <div className="uppercase leading-[16.8px] text-[10.5px]">
                  <span className="block font-medium tracking-[1.47px] text-brand-steel">
                    Bargersville
                  </span>
                  <span className="block font-semibold tracking-[1.68px] text-white mt-0.5">
                    Economic Development
                  </span>
                </div>
              </div>

              {/* Contact info */}
              <div className="mt-8 space-y-0.5 text-[12.5px] leading-[1.8] text-white/50 font-light">
                <p>24 North Main Street</p>
                <p>PO Box 420</p>
                <p>Bargersville, IN 46106</p>
                <p className="pt-3">317.422.3126</p>
                <p>planning@bargersville.in.gov</p>
                <p className="pt-3">GrowBargersville.com</p>
              </div>
            </div>

            {/* Link columns */}
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[10.5px] font-semibold uppercase tracking-[1.89px] text-white/40">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-[13.5px] leading-[1.6] text-white/62 font-light transition-colors hover:text-white/90"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-white/30">
              &copy; {year} Bargersville Economic Development &middot;{" "}
              <a
                href="https://www.bargersville.in.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                Town of Bargersville, Indiana
              </a>{" "}
              &middot; Site by{" "}
              <a
                href="https://www.jdaworldwide.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                JDA Worldwide
              </a>
            </p>
            <p className="text-[11.5px] text-white/25">
              Grow Where Access Meets Opportunity
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
