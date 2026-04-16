interface Partner {
  _key?: string;
  name: string;
}

interface TickerSectionProps {
  label?: string;
  partners?: Partner[];
}

const defaultPartners: Partner[] = [
  { name: "Ale Emporium" },
  { name: "First Watch" },
  { name: "Five Guys" },
  { name: "Meijer" },
  { name: "University of Indianapolis" },
  { name: "Johnson County" },
  { name: "Aspire" },
];

export default function TickerSection({
  label = "Businesses & Partners",
  partners,
}: TickerSectionProps) {
  const resolvedPartners = partners?.length ? partners : defaultPartners;

  return (
    <>
      {/* Daylight band gradient */}
      <div
        className="h-1.5"
        style={{
          background:
            "linear-gradient(90deg, #fff 0%, #B7C7D3 30%, #C0CA80 65%, #76871E 100%)",
        }}
      />

      {/* Partners ticker */}
      <div className="border-b border-brand-border bg-brand-surface">
        <div className="mx-auto flex max-w-container items-center gap-6 overflow-x-auto px-6 py-6 sm:px-10 lg:px-gutter">
          {label && (
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[2px] text-brand-text">
              {label}
            </span>
          )}
          <div className="h-5 w-px bg-brand-border shrink-0" />
          <div className="flex items-center gap-8">
            {resolvedPartners.map((partner, i) => (
              <span
                key={partner._key || `partner-${i}`}
                className="shrink-0 text-[13px] font-medium tracking-[0.52px] text-brand-text"
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
