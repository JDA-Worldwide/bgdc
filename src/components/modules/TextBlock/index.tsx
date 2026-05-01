import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import AnimateIn from "@/components/ui/AnimateIn";
import SanityImage from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import { stegaClean } from "@sanity/client/stega";
import type { TextBlockProps } from "./types";

export default function TextBlock({ heading, body, image, imagePlacement = "left" }: TextBlockProps) {
  const placement = stegaClean(imagePlacement);
  if (!body?.length && !heading) return null;

  const hasImage = !!image?.asset;

  if (!hasImage) {
    return (
      <Container>
        <AnimateIn className="mx-auto max-w-4xl">
          {heading && (
            <h2 className="mb-6 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body?.length ? <PortableText value={body} /> : null}
        </AnimateIn>
      </Container>
    );
  }

  return (
    <div className="mx-auto w-full max-w-container px-6 sm:px-10 lg:px-gutter">
      <AnimateIn className="grid grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
        <div
          className={cn(
            "relative aspect-4/3 w-full overflow-hidden rounded order-first",
            placement === "right" && "md:order-last",
          )}
        >
          <SanityImage
            image={image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          {heading && (
            <h2 className="mb-6 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body?.length ? <PortableText value={body} /> : null}
        </div>
      </AnimateIn>
    </div>
  );
}
