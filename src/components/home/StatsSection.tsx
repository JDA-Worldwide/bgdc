interface Stat {
  value: string;
  label: string;
}

interface StatsSectionProps {
  heading?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { value: "13,000+", label: "Residents" },
  { value: "15.1%", label: "Population Growth" },
  { value: "$438,900", label: "Median Home Value" },
  { value: "Top 10", label: "Youngest Average Age in Indiana (35.4 years)" },
];

export default function StatsSection({
  heading = "Bargersville by the Numbers",
  stats,
}: StatsSectionProps) {
  const resolvedStats = stats?.length ? stats : defaultStats;

  return (
    <section className="bg-brand-blue px-6 py-16 sm:px-10 md:px-[170px] md:py-section">
      {heading && (
        <h2 className="mb-10 text-center text-2xl font-medium leading-tight text-white sm:text-3xl md:mb-[60px] md:text-[43px] md:leading-[60px]">
          {heading}
        </h2>
      )}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 lg:grid-cols-4 lg:gap-[150px]">
        {resolvedStats.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center gap-3 text-center sm:gap-5">
            <p className="text-2xl font-bold leading-tight text-brand-sun sm:text-4xl md:text-[60px] md:leading-[55px]">
              {stat.value}
            </p>
            <p className="font-accent text-sm italic leading-5 text-white sm:text-xl sm:leading-7">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
