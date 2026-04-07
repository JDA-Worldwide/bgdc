"use client";

import CountUp from "react-countup";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/hooks/useGsap";

interface Stat {
  _key?: string;
  number?: number;
  prefix?: string;
  suffix?: string;
  textValue?: string;
  label: string;
}

interface StatsSectionProps {
  heading?: string;
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  { number: 13000, suffix: "+", label: "Residents" },
  { number: 15.1, suffix: "%", label: "Population Growth" },
  { number: 438900, prefix: "$", label: "Median Home Value" },
  {
    textValue: "Top 10",
    label: "Youngest Average Age in Indiana (35.4 years)",
  },
];

function StatItem({ stat }: { stat: Stat }) {
  const hasNumber = stat.number != null && !stat.textValue;
  const isDecimal = hasNumber && !Number.isInteger(stat.number);

  return (
    <div className="flex flex-col items-center gap-3 text-center sm:gap-5">
      <p className="whitespace-nowrap font-heading text-2xl font-bold leading-tight text-brand-sun sm:text-4xl md:text-[60px] md:leading-[55px]">
        {hasNumber ? (
          <CountUp
            end={stat.number!}
            prefix={stat.prefix ?? ""}
            suffix={stat.suffix ?? ""}
            separator=","
            decimals={isDecimal ? 1 : 0}
            duration={2.5}
            enableScrollSpy
            scrollSpyOnce
          />
        ) : (
          <>
            {stat.prefix}
            {stat.textValue}
            {stat.suffix}
          </>
        )}
      </p>
      <p className="font-accent text-sm italic leading-5 text-white sm:text-xl sm:leading-7">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection({
  heading = "Bargersville by the Numbers",
  stats,
}: StatsSectionProps) {
  const resolvedStats = stats?.length ? stats : defaultStats;

  const sectionRef = useGsap<HTMLElement>((el) => {
    gsap.fromTo(
      el.querySelectorAll("[data-stats-animate]"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  });

  return (
    <section ref={sectionRef} className="bg-brand-blue py-16 md:py-section">
      <div className="mx-auto max-w-[var(--container-max)] px-6 sm:px-10 lg:px-gutter">
        {heading && (
          <h2 data-stats-animate className="mb-10 text-center text-2xl font-medium leading-tight text-white sm:text-3xl md:mb-[60px] md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
        )}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-16 md:gap-x-20 lg:grid-cols-4 lg:gap-[150px]">
          {resolvedStats.map((stat, i) => (
            <div key={stat._key ?? i} data-stats-animate>
              <StatItem stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
