import SanityImage from "@/components/ui/SanityImage";
import type { SanityImageSource } from "@/components/ui/SanityImage/types";

interface ValueCard {
  icon?: SanityImageSource;
  title: string;
  body: string;
}

interface ValuePropsSectionProps {
  heading?: string;
  cards?: ValueCard[];
}

const defaultCards: ValueCard[] = [
  {
    title: "Strategic Location",
    body: "Bargersville sits at the intersection of I-69 and SR 144\u2014strategically positioned at one of the region\u2019s fastest-growing transportation corridors. Businesses here stay connected to regional and national markets while operating in a calmer, more efficient environment than crowded metro markets.",
  },
  {
    title: "Quality of Place",
    body: "Some communities make you choose between opportunity and quality of life \u2014 Bargersville is not one of them. It\u2019s a tight-knit community with top-rated schools, reliable locally-owned utilities, and a revitalizing downtown that\u2019s drawing people in. This is a place where people don\u2019t just work \u2014 they stay.",
  },
  {
    title: "Pro-Business Government",
    body: "Bargersville Economic Development exists to build momentum for businesses that want to grow with confidence \u2014 offering hands-on guidance, practical resources, and real partnership that goes beyond permits and paperwork. Our municipal leadership is committed to pro-business policies, long-range planning, and thoughtful development that preserves what makes this community worth investing in.",
  },
];

export default function ValuePropsSection({
  heading = "The Right Location.\nThe Right Place.\nThe Right Partner.",
  cards,
}: ValuePropsSectionProps) {
  const resolvedCards = cards?.length ? cards : defaultCards;

  return (
    <section className="bg-brand-blue py-section">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:px-gutter">
        {/* Left heading */}
        <div className="flex-shrink-0 pt-2.5 lg:w-[36%]">
          <h2 className="text-2xl font-medium leading-tight text-white sm:text-3xl md:text-[43px] md:leading-[60px]">
            {heading?.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < (heading?.split("\n").length ?? 1) - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Right cards */}
        <div className="flex flex-1 flex-col gap-10">
          {resolvedCards.map((card) => (
            <div key={card.title} className="flex gap-5 bg-white p-6 sm:gap-[30px] sm:p-10">
              {/* Icon */}
              <div className="hidden h-[55px] w-[65px] flex-shrink-0 sm:block">
                {card.icon?.asset ? (
                  <SanityImage
                    image={card.icon}
                    width={65}
                    height={55}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full rounded bg-brand-sky" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-[30px]">
                <h3 className="text-2xl font-medium leading-[35px] text-brand-blue md:text-[28px]">
                  {card.title}
                </h3>
                <hr className="border-brand-sky" />
                <p className="text-base leading-7 text-brand-blue">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
