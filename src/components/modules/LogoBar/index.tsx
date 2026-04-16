import Container from "@/components/ui/Container";
import SanityImage from "@/components/ui/SanityImage";
import AnimateIn from "@/components/ui/AnimateIn";
import type { LogoBarProps } from "./types";

export default function LogoBar({ heading, logos }: LogoBarProps) {
  if (!logos?.length) return null;

  return (
    <Container>
      {heading && (
        <AnimateIn>
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-brand-text">
            {heading}
          </p>
        </AnimateIn>
      )}
      <AnimateIn stagger className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
        {logos.map((logo, i) => (
          <div
            key={logo.asset?._ref ?? i}
            className="grayscale transition-all hover:grayscale-0"
          >
            <SanityImage
              image={logo}
              width={160}
              height={60}
              className="h-10 w-auto object-contain lg:h-12"
            />
          </div>
        ))}
      </AnimateIn>
    </Container>
  );
}
