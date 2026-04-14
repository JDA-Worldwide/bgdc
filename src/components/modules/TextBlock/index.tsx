import Container from "@/components/ui/Container";
import PortableText from "@/components/ui/PortableText";
import AnimateIn from "@/components/ui/AnimateIn";
import type { TextBlockProps } from "./types";

export default function TextBlock({ heading, body }: TextBlockProps) {
  if (!body?.length && !heading) return null;

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
