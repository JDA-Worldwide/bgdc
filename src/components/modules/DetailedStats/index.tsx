"use client";

import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import type { DetailedStatsProps, StatCategory, StatItem } from "./types";

function StatsList({ stats }: { stats: StatItem[] }) {
  const ref = useGsap<HTMLUListElement>((el) => {
    const items = el.children;
    if (!items.length) return;
    gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  return (
    <ul ref={ref} className="flex flex-col gap-[40px]">
      {stats.map((stat) => (
        <li key={stat._key} className="flex flex-col gap-[21px]">
          <span className="font-heading text-[60px] leading-[55px] font-bold text-brand-primary">
            {stat.value}
          </span>
          <span className="font-accent text-[20px] leading-7 italic text-brand-charcoal">
            {stat.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CategoryCard({ category }: { category: StatCategory }) {
  return (
    <div className="flex flex-col gap-[30px] bg-white p-10 lg:p-[60px]">
      <AnimateIn>
        <h3 className="font-heading text-xl font-medium leading-[1.4] text-brand-text-heading md:text-[28px] md:leading-[35px]">
          {category.categoryName}
        </h3>
      </AnimateIn>

      <div className="flex flex-col gap-[40px]">
        <div className="h-px w-full bg-brand-sun" aria-hidden="true" />
        {category.stats && category.stats.length > 0 ? (
          <StatsList stats={category.stats} />
        ) : (
          <p className="text-sm italic text-brand-muted">Data coming soon</p>
        )}
      </div>
    </div>
  );
}

export default function DetailedStats({
  heading,
  introText,
  categories,
}: DetailedStatsProps) {
  if (!categories?.length && !heading) return null;

  return (
    <section aria-labelledby={heading ? "detailed-stats-heading" : undefined}>
      <Container>
        {(heading || introText) && (
          <AnimateIn className="mb-10 text-center">
            {heading && (
              <h2
                id="detailed-stats-heading"
                className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]"
              >
                {heading}
              </h2>
            )}
            {introText && (
              <p className="mx-auto max-w-2xl text-base leading-7 text-brand-text">
                {introText}
              </p>
            )}
          </AnimateIn>
        )}
      </Container>

      {categories && categories.length > 0 && (
        <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard key={category._key} category={category} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
