import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import type { DetailedStatsProps, StatCategory } from "./types";

const categoryIcons: Record<string, React.ReactNode> = {
  default: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

function getCategoryIcon(name: string): React.ReactNode {
  const lower = name.toLowerCase();
  if (lower.includes("population") || lower.includes("growth")) {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    );
  }
  if (lower.includes("workforce") || lower.includes("demographic")) {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    );
  }
  if (lower.includes("housing") || lower.includes("home")) {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    );
  }
  if (lower.includes("infrastructure") || lower.includes("connect")) {
    return (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    );
  }
  return categoryIcons.default;
}

function CategoryCard({ category, index }: { category: StatCategory; index: number }) {
  // Mobile (1-col): alternate every row — even index = white, odd = surface
  // Desktop (2-col): checkerboard — (row + col) % 2 determines shade
  const mobileLight = index % 2 === 0;
  const desktopLight = (Math.floor(index / 2) + (index % 2)) % 2 === 0;

  return (
    <div className={cn("p-8", mobileLight ? "bg-white" : "bg-brand-surface", desktopLight ? "sm:bg-white" : "sm:bg-brand-surface")}>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-primary/10 text-brand-primary">
          {getCategoryIcon(category.categoryName)}
        </div>
        <h3 className="font-heading text-lg font-medium text-brand-text-heading">
          {category.categoryName}
        </h3>
      </div>

      {category.stats && category.stats.length > 0 ? (
        <ul className="space-y-4">
          {category.stats.map((stat) => (
            <li key={stat._key} className="border-b border-brand-border pb-4 last:border-0 last:pb-0">
              <span className="block font-heading text-2xl font-bold text-brand-primary">
                {stat.value}
              </span>
              <span className="mt-0.5 block text-sm leading-5 text-brand-muted">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-brand-muted italic">Data coming soon</p>
      )}
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
          <div className="mb-10 text-center">
            {heading && (
              <h2
                id="detailed-stats-heading"
                className="mb-4 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]"
              >
                {heading}
              </h2>
            )}
            {introText && (
              <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted">
                {introText}
              </p>
            )}
          </div>
        )}
      </Container>

      {categories && categories.length > 0 && (
        <div className="mx-auto max-w-container px-6 sm:px-10 lg:px-gutter">
          <AnimateIn stagger className="grid grid-cols-1 gap-px bg-brand-border sm:grid-cols-2">
            {categories.map((category, index) => (
              <CategoryCard key={category._key} category={category} index={index} />
            ))}
          </AnimateIn>
        </div>
      )}
    </section>
  );
}
