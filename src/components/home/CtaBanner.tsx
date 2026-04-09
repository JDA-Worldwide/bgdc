import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface CtaBannerProps {
  callout?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; url: string; isExternal?: boolean };
  backgroundImage?: SanityImageSource;
}

export default function CtaBanner({
  callout = "Let\u2019s Talk",
  heading = "Ready to Take the Next Step?",
  body = "Devoted to the good of our town, Bargersville Economic Development partners with entrepreneurs, business leaders, and community stakeholders to drive long-term economic growth. Through hands-on guidance and practical resources, we help businesses turn what they start here into lasting success\u2014going beyond permits and paperwork to support real growth.",
  cta = { label: "Get in Touch", url: "#get-in-touch" },
  backgroundImage,
}: CtaBannerProps) {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10 md:px-[170px] md:py-section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        {backgroundImage?.asset ? (
          <SanityImage
            image={backgroundImage}
            fill
            sizes="100vw"
            className="object-cover"
            decorative
          />
        ) : (
          <div className="absolute inset-0 bg-brand-surface" />
        )}
      </div>

      <div className="mx-auto max-w-[816px]">
        {callout && (
          <p className="font-accent text-xl italic leading-7 text-brand-blue">
            {callout}
          </p>
        )}
        {heading && (
          <h2 className="mt-8 text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
        )}
        {body && (
          <p className="mt-8 text-base leading-7 text-brand-black">{body}</p>
        )}
        {cta?.url && (
          <div className="mt-8">
            <a
              href={cta.url}
              target={cta.isExternal ? "_blank" : undefined}
              rel={cta.isExternal ? "noopener noreferrer" : undefined}
              className="inline-block rounded-button bg-brand-blue px-5 py-[15px] text-base font-semibold leading-[21px] text-white transition-colors hover:bg-brand-navy-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 active:bg-brand-navy-dark/90"
            >
              {cta.label}
              {cta.isExternal && (
                <span className="sr-only"> (opens in new tab)</span>
              )}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
