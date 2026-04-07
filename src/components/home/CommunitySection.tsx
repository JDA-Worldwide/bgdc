import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface CommunitySectionProps {
  heading?: string;
  leadText?: string;
  body?: string;
  images?: SanityImageSource[];
}

const rotations = ["-rotate-[1.5deg]", "-rotate-[1.7deg]", "rotate-[2.8deg]", "-rotate-[2.9deg]"];

export default function CommunitySection({
  heading = "A Community Built for Business \u2014 and Built to Last",
  leadText = "Nestled in the heart of Johnson County, Bargersville provides a sense of community, hospitality, and possibility moving side by side. With roots dating back to 1850, this once-agricultural town has grown into a vibrant community that blends heritage with opportunity.",
  body = "Today, Bargersville is one of the fastest-growing communities in the state, expanding by over 10,000 residents in the last five years. We are conveniently located between Indianapolis and Bloomington, have access to top school districts in the county, and have acreage to spare\u2014providing growth opportunities for families and businesses alike. Bargersville offers all of this, while preserving the character, relationships, and quality of life that make the community feel like home.",
  images,
}: CommunitySectionProps) {
  return (
    <section className="px-6 py-section sm:px-gutter">
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-[65px]">
        {/* Image collage */}
        <div className="relative hidden w-full max-w-[660px] lg:block">
          <div className="grid grid-cols-2 gap-4">
            {(images && images.length > 0 ? images : Array(4).fill(null)).map((img, i) => (
              <div
                key={i}
                className={`aspect-square overflow-hidden ${rotations[i % rotations.length]} ${i % 2 === 1 ? (i === 1 ? "mt-16" : "mt-10") : ""}`}
              >
                {img?.asset ? (
                  <SanityImage
                    image={img}
                    width={444}
                    height={444}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className={`h-full w-full ${i % 2 === 0 ? "bg-brand-sky" : "bg-brand-limestone"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col gap-[60px] lg:sticky lg:top-8 lg:self-start">
          <h2 className="text-3xl font-medium leading-tight text-brand-blue md:text-[43px] md:leading-[60px]">
            {heading}
          </h2>
          <div className="flex flex-col gap-4 text-brand-charcoal">
            {leadText && (
              <p className="text-lg leading-relaxed md:text-[22px] md:leading-[33px]">
                {leadText}
              </p>
            )}
            {body && (
              <p className="text-base leading-7">{body}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
