import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import type { FeatureGridProps } from "./types";

export default function FeatureGrid({ heading, features }: FeatureGridProps) {
  if (!features?.length) return null;

  return (
    <Container>
      {heading && (
        <AnimateIn>
          <h2 className="mb-12 text-center font-heading text-3xl font-bold sm:text-4xl">
            {heading}
          </h2>
        </AnimateIn>
      )}

      <AnimateIn stagger className="grid gap-8 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature._key}
            className="rounded bg-brand-surface p-6 transition-shadow hover:shadow-md"
          >
            <h3 className="font-heading text-xl font-semibold">
              {feature.title}
            </h3>
            {feature.description && (
              <p className="mt-2 text-brand-muted">{feature.description}</p>
            )}
          </div>
        ))}
      </AnimateIn>
    </Container>
  );
}
