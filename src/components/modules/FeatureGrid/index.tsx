import Container from "@/components/ui/Container";
import AnimateIn from "@/components/ui/AnimateIn";
import type { FeatureGridProps } from "./types";

export default function FeatureGrid({ heading, features }: FeatureGridProps) {
  if (!features?.length) return null;

  return (
    <Container>
      {heading && (
        <AnimateIn>
          <h2 className="mb-12 text-3xl font-medium leading-tight text-brand-text-heading md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
        </AnimateIn>
      )}

      <AnimateIn stagger className="grid gap-8 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature._key}
            className="flex flex-col gap-[30px] bg-brand-sky p-10"
          >
            <h3 className="text-[23px] font-medium leading-[30px] text-brand-blue">
              {feature.title}
            </h3>
            <hr className="border-brand-blue/20" />
            {feature.description && (
              <p className="text-base leading-7 text-brand-blue">{feature.description}</p>
            )}
          </div>
        ))}
      </AnimateIn>
    </Container>
  );
}
