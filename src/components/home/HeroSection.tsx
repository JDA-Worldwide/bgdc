import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface HeroSectionProps {
  callout?: string;
  heading?: string;
  body?: string;
  primaryCta?: { label: string; url: string; isExternal?: boolean };
  secondaryCta?: { label: string; url: string; isExternal?: boolean };
  backgroundImage?: SanityImageSource;
}

export default function HeroSection({
  callout = "Connected & Growing",
  heading = "Cultivating Long-Term Success",
  body = "Rooted in a rich, agricultural history, Bargersville was shaped by people who understood that real growth takes patience, care, and the right conditions. Today, Bargersville grows in opportunity. Because here, progress isn\u2019t rushed\u2014it\u2019s cultivated through community, support, and shared purpose.",
  primaryCta = { label: "Explore Opportunities", url: "#opportunities" },
  secondaryCta = { label: "Get In Touch", url: "#contact" },
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-section md:min-h-[85vh] md:px-16 lg:min-h-[971px] lg:px-[175px]">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {backgroundImage?.asset ? (
          <SanityImage
            image={backgroundImage}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-brand-navy-dark" />
        )}
        <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
      </div>

      {callout && (
        <p className="font-accent text-xl italic leading-7 text-brand-sun">
          {callout}
        </p>
      )}

      <div className="mt-10 flex max-w-[1378px] flex-col gap-8 text-center text-white md:mt-[60px] md:gap-[54px]">
        <h1 className="text-3xl font-medium leading-tight sm:text-5xl md:text-[70px] md:leading-[55px]">
          {heading}
        </h1>
        {body && (
          <p className="text-base leading-relaxed sm:text-lg md:text-[22px] md:leading-[33px]">
            {body}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-[60px] md:mt-[60px]">
        {primaryCta?.url && (
          <a
            href={primaryCta.url}
            target={primaryCta.isExternal ? "_blank" : undefined}
            rel={primaryCta.isExternal ? "noopener noreferrer" : undefined}
            className="rounded-button bg-brand-sky px-5 py-[15px] text-base font-semibold leading-[21px] text-brand-blue transition-colors hover:bg-brand-sky/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue active:bg-brand-sky/70"
          >
            {primaryCta.label}
          </a>
        )}
        {secondaryCta?.url && (
          <a
            href={secondaryCta.url}
            target={secondaryCta.isExternal ? "_blank" : undefined}
            rel={secondaryCta.isExternal ? "noopener noreferrer" : undefined}
            className="rounded-button border border-brand-sky px-5 py-[15px] text-base font-semibold leading-[21px] text-white transition-colors hover:bg-brand-sky/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue active:bg-brand-sky/25"
          >
            {secondaryCta.label}
          </a>
        )}
      </div>
    </section>
  );
}
