interface LinkField {
  label?: string;
  url?: string;
  isExternal?: boolean;
}

interface CtaBannerProps {
  sectionLabel?: string;
  heading?: string;
  description?: string;
  primaryButton?: LinkField;
  secondaryButton?: LinkField;
}

export default function CtaBanner({
  sectionLabel = "Let\u2019s Talk",
  heading = "Ready to explore Bargersville for your next investment?",
  description = "Jane Jankowski and the Bargersville Economic Development team work directly with businesses considering the region. Reach out to start the conversation.",
  primaryButton = { label: "Contact Jane Jankowski", url: "/contact" },
  secondaryButton = { label: "View Available Parcels", url: "/available-land" },
}: CtaBannerProps) {
  return (
    <section className="relative bg-brand-olive overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(192,202,128,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-6 lg:px-8 py-[72px] text-center">
        {sectionLabel && (
          <span className="text-[10.5px] font-semibold uppercase tracking-[2.3px] text-white/65">
            {sectionLabel}
          </span>
        )}

        <h2 className="mt-6 font-display text-3xl sm:text-[38px] font-bold leading-[1.2] text-white">
          {heading}
        </h2>

        {description && (
          <p className="mt-6 text-base leading-[1.65] text-white/72 font-light">
            {description}
          </p>
        )}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryButton?.url && (
            <a
              href={primaryButton.url}
              target={primaryButton.isExternal ? "_blank" : undefined}
              rel={primaryButton.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2.5 rounded-[3px] bg-white px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.65px] text-brand-olive transition-colors hover:bg-white/90"
            >
              {primaryButton.label}
              <svg
                className="size-3.5 shrink-0"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 7h12M8 2l5 5-5 5" />
              </svg>
            </a>
          )}
          {secondaryButton?.url && (
            <a
              href={secondaryButton.url}
              target={secondaryButton.isExternal ? "_blank" : undefined}
              rel={
                secondaryButton.isExternal ? "noopener noreferrer" : undefined
              }
              className="inline-flex items-center rounded-[3px] border border-white/50 px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.65px] text-white transition-colors hover:bg-white/10"
            >
              {secondaryButton.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
