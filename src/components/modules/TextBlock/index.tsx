import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import AnimateIn from "@/components/ui/AnimateIn";
import SanityImage from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import type { TextBlockProps } from "./types";

export default function TextBlock({ heading, body, image, imagePlacement = "left" }: TextBlockProps) {
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
    <Container>
      <AnimateIn className={cn("grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center")}>
        <div className="relative aspect-4/3 overflow-hidden rounded order-first">
          <SanityImage
            image={image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className={cn(imagePlacement === "right" && "md:order-first")}>
          {heading && (
            <h2 className="mb-6 font-heading text-2xl font-medium text-brand-text-heading sm:text-3xl md:text-[43px] md:leading-[60px]">
              {heading}
            </h2>
          )}
          {body?.length ? <PortableText value={body} /> : null}
        </div>
      </AnimateIn>
    </Container>
  );
}
